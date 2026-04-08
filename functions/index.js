const { setGlobalOptions } = require('firebase-functions');
const { onRequest }        = require('firebase-functions/https');
const { defineSecret }     = require('firebase-functions/params');
const admin                = require('firebase-admin');
const crypto               = require('crypto');

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();
const db = admin.firestore();

// Secrets de ePayco (guardados en Firebase Secret Manager)
const EPAYCO_CLIENT_ID   = defineSecret('EPAYCO_CLIENT_ID');
const EPAYCO_PRIVATE_KEY = defineSecret('EPAYCO_PRIVATE_KEY');

/**
 * Webhook de confirmación de ePayco.
 * ePayco hace POST a esta URL después de procesar un pago.
 * Verifica la firma MD5 antes de actualizar la orden en Firestore.
 * Docs: https://docs.epayco.co/tools/confirmacion-de-pago
 */
exports.epaycoWebhook = onRequest(
  { secrets: [EPAYCO_CLIENT_ID, EPAYCO_PRIVATE_KEY] },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const data = req.body;

    const {
      x_ref_payco,
      x_transaction_id,
      x_amount,
      x_currency_code,
      x_signature,
      x_response,
      x_extra1: orderNumber,
    } = data;

    // Verificar firma de ePayco — rechaza cualquier llamada no legítima
    // Firma = MD5(P_CUST_ID_CLIENTE^P_KEY^x_ref_payco^x_transaction_id^x_amount^x_currency_code)
    const clientId  = EPAYCO_CLIENT_ID.value();
    const secretKey = EPAYCO_PRIVATE_KEY.value();

    if (!clientId || !secretKey) {
      console.error('ePayco webhook: secrets no configurados');
      res.status(500).send('Server misconfiguration');
      return;
    }

    const raw               = `${clientId}^${secretKey}^${x_ref_payco}^${x_transaction_id}^${x_amount}^${x_currency_code}`;
    const expectedSignature = crypto.createHash('md5').update(raw).digest('hex');

    if (expectedSignature !== x_signature) {
      console.error('ePayco webhook: firma inválida — posible intento de fraude');
      res.status(400).send('Invalid signature');
      return;
    }

    if (!orderNumber) {
      console.error('ePayco webhook: sin número de orden (x_extra1)');
      res.status(200).send('OK');
      return;
    }

    // Mapear respuesta de ePayco a estado interno
    let status = 'pending';
    const r = (x_response || '').toLowerCase();
    if (r === 'aceptada' || r === 'accepted') {
      status = 'paid';
    } else if (r === 'rechazada' || r === 'rejected' || r === 'failed') {
      status = 'rejected';
    }

    try {
      const ordersRef = db.collection('orders');
      const snapshot  = await ordersRef.where('orderNumber', '==', orderNumber).get();

      if (snapshot.empty) {
        console.warn(`ePayco webhook: orden no encontrada: ${orderNumber}`);
        res.status(200).send('OK');
        return;
      }

      const orderDoc = snapshot.docs[0];
      await orderDoc.ref.update({
        status,
        epaycoRefPayco:      x_ref_payco      || null,
        epaycoTransactionId: x_transaction_id || null,
        epaycoResponse:      x_response       || null,
        updatedAt:           admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`ePayco webhook: orden ${orderNumber} actualizada a '${status}'`);
      res.status(200).send('OK');
    } catch (err) {
      console.error('ePayco webhook error:', err);
      res.status(500).send('Internal Server Error');
    }
  }
);
