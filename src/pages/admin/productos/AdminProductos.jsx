// AdminProductos.jsx - CRUD de productos de la tienda
import { useState, useEffect, useRef } from 'react';
import { LuPlus, LuShoppingBag, LuUpload, LuX, LuImage } from 'react-icons/lu';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../../services/productsService';
import { uploadProductImage, deleteProductImage } from '../../../services/storageService';
import { STATIC_PRODUCTS } from '../../../data/products';
import { formatPrice } from '../../../utils/formatters';
import '../dashboard/Dashboard.css';
import './AdminProductos.css';

const EMPTY_FORM = {
  name: '', subtitle: '', description: '', price: '', inStock: true,
};

const AdminProductos = () => {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [form, setForm]           = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(null);

  // Estado de imagen
  const [imageFile, setImageFile]       = useState(null);   // File obj
  const [imagePreview, setImagePreview] = useState('');     // URL local preview
  const [existingUrl, setExistingUrl]   = useState('');     // URL ya guardada en Firestore
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging]     = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    try   { setProducts(await getProducts()); }
    catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ── Manejo de imagen ──────────────────────────────────
  const applyFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => applyFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    applyFile(e.dataTransfer.files[0]);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setExistingUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Editar producto ───────────────────────────────────
  const handleEdit = (product) => {
    setForm({
      name:        product.name        || '',
      subtitle:    product.subtitle    || '',
      description: product.description || '',
      price:       product.price       || '',
      inStock:     product.inStock !== false,
    });
    setEditingId(product.id);
    setExistingUrl(product.imageUrl || '');
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Guardar ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return alert('Nombre y precio son obligatorios');

    setSaving(true);
    setUploadProgress(0);

    try {
      let finalImageUrl = existingUrl;

      // Si hay un archivo nuevo, subirlo a Storage
      if (imageFile) {
        finalImageUrl = await uploadProductImage(imageFile, (pct) => setUploadProgress(pct));
      }

      const payload = { ...form, price: Number(form.price), imageUrl: finalImageUrl };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      cancelEdit();
      await load();
    } catch (err) {
      alert(err.message || 'Error guardando producto');
    } finally {
      setSaving(false);
      setUploadProgress(0);
    }
  };

  // ── Eliminar ──────────────────────────────────────────
  const handleDelete = async (product) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    setDeleting(product.id);
    try {
      await deleteProduct(product.id);
      // Eliminar imagen de Storage si existe
      if (product.imageUrl) await deleteProductImage(product.imageUrl);
      setProducts(prev => prev.filter(p => p.id !== product.id));
    } catch {
      alert('Error eliminando producto');
    } finally {
      setDeleting(null);
    }
  };

  // ── Seed inicial ──────────────────────────────────────
  const handleSeedInitial = async () => {
    if (!window.confirm('¿Cargar los 3 productos iniciales a Firestore?')) return;
    setSaving(true);
    try {
      for (const p of STATIC_PRODUCTS) {
        await createProduct({
          name: p.name, subtitle: p.subtitle,
          description: p.description, price: p.price,
          imageUrl: '', inStock: true,
        });
      }
      await load();
    } catch { alert('Error cargando productos iniciales'); }
    finally { setSaving(false); }
  };

  const cancelEdit = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
    setImageFile(null);
    setImagePreview('');
    setExistingUrl('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Imagen a mostrar en la zona de upload
  const displayImage = imagePreview || existingUrl;

  return (
    <div className="admin-productos">
      <div className="admin-productos-header">
        <h1 className="admin-page-title">Productos</h1>
        <div className="admin-productos-actions">
          {products.length === 0 && (
            <button className="admin-seed-btn" onClick={handleSeedInitial} disabled={saving}>
              <LuShoppingBag size={14} /> Cargar productos iniciales
            </button>
          )}
          <button
            className="admin-add-btn"
            onClick={() => { cancelEdit(); setShowForm(prev => !prev); }}
          >
            <LuPlus size={14} />
            {showForm && !editingId ? 'Cancelar' : 'Nuevo producto'}
          </button>
        </div>
      </div>

      {/* ── Formulario ── */}
      {showForm && (
        <div className="ap-form-card">
          <h2 className="ap-form-title">{editingId ? 'Editar producto' : 'Nuevo producto'}</h2>
          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-form-grid">

              {/* Imagen — ocupa columna completa */}
              <div className="ap-field ap-field--full">
                <label>Imagen del producto</label>

                {/* Input oculto */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {displayImage ? (
                  /* Preview de la imagen */
                  <div className="ap-img-preview">
                    <img src={displayImage} alt="Preview" className="ap-img-preview-img" />
                    <div className="ap-img-preview-overlay">
                      <button type="button" className="ap-img-change-btn" onClick={() => fileInputRef.current?.click()}>
                        <LuUpload size={14} /> Cambiar imagen
                      </button>
                      <button type="button" className="ap-img-remove-btn" onClick={handleRemoveImage}>
                        <LuX size={14} /> Quitar
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Zona de carga */
                  <div
                    className={`ap-upload-zone ${isDragging ? 'ap-upload-zone--drag' : ''}`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <LuImage size={32} className="ap-upload-icon" />
                    <p className="ap-upload-text">
                      <strong>Haz clic o arrastra una imagen</strong>
                    </p>
                    <p className="ap-upload-hint">JPG, PNG o WebP · máx. 5 MB</p>
                  </div>
                )}

                {/* Barra de progreso */}
                {saving && imageFile && (
                  <div className="ap-upload-progress">
                    <div className="ap-upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
                    <span className="ap-upload-progress-label">{uploadProgress}%</span>
                  </div>
                )}
              </div>

              {/* Nombre */}
              <div className="ap-field">
                <label>Nombre *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="PRUSHOT" required />
              </div>

              {/* Subtítulo */}
              <div className="ap-field">
                <label>Subtítulo</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Energía, Deseo y Vitalidad" />
              </div>

              {/* Descripción */}
              <div className="ap-field ap-field--full">
                <label>Descripción</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Descripción del producto..." />
              </div>

              {/* Precio */}
              <div className="ap-field">
                <label>Precio (COP) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="120000" required min={0} />
              </div>

              {/* En stock */}
              <div className="ap-field ap-field--checkbox">
                <label>
                  <input name="inStock" type="checkbox" checked={form.inStock} onChange={handleChange} />
                  En stock
                </label>
              </div>
            </div>

            <div className="ap-form-footer">
              <button type="button" className="ap-cancel-btn" onClick={cancelEdit}>Cancelar</button>
              <button type="submit" className="ap-save-btn" disabled={saving}>
                {saving
                  ? (imageFile ? `Subiendo imagen… ${uploadProgress}%` : 'Guardando…')
                  : editingId ? 'Actualizar' : 'Crear producto'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Lista de productos ── */}
      {loading ? (
        <div className="admin-loading">Cargando productos...</div>
      ) : products.length === 0 ? (
        <p className="admin-empty">No hay productos en Firestore. Carga los iniciales o crea uno nuevo.</p>
      ) : (
        <div className="ap-product-grid">
          {products.map(product => (
            <div key={product.id} className={`ap-product-card ${!product.inStock ? 'ap-product-card--oos' : ''}`}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="ap-product-img" />
              ) : (
                <div className="ap-product-img-placeholder">
                  <LuShoppingBag size={36} />
                </div>
              )}
              <div className="ap-product-info">
                <div className="ap-product-top">
                  <h3 className="ap-product-name">{product.name}</h3>
                  <span className={`admin-badge ${product.inStock ? 'admin-badge--status-paid' : 'admin-badge--status-cancelled'}`}>
                    {product.inStock ? 'En stock' : 'Sin stock'}
                  </span>
                </div>
                <p className="ap-product-subtitle">{product.subtitle}</p>
                <p className="ap-product-desc">{product.description}</p>
                <div className="ap-product-footer">
                  <span className="ap-product-price">{formatPrice(product.price)}</span>
                  <div className="ap-product-btns">
                    <button className="ap-edit-btn" onClick={() => handleEdit(product)}>Editar</button>
                    <button
                      className="ap-delete-btn"
                      onClick={() => handleDelete(product)}
                      disabled={deleting === product.id}
                    >
                      {deleting === product.id ? '…' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProductos;
