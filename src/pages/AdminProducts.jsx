import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import productsData from '../data/products.json'; // Importar el JSON

const AdminProducts = () => {
  const navigate = useNavigate();
  
  // Cargar productos desde el JSON
  const [products, setProducts] = useState(productsData);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // CREATE - Crear nuevo producto
  const handleCreate = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: formData.name,
      price: parseInt(formData.price),
      image: formData.image,
      description: formData.description
    };

    setProducts([...products, newProduct]);
    resetForm();
    alert('Producto creado exitosamente!');
  };

  // UPDATE - Actualizar producto
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedProducts = products.map(product =>
      product.id === currentProduct.id
        ? { ...product, ...formData, price: parseInt(formData.price) }
        : product
    );

    setProducts(updatedProducts);
    resetForm();
    alert('Producto actualizado exitosamente!');
  };

  // DELETE - Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      const filteredProducts = products.filter(product => product.id !== id);
      setProducts(filteredProducts);
      alert('Producto eliminado exitosamente!');
    }
  };

  // Preparar formulario para editar
  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description
    });
    window.scrollTo(0, 0);
  };

  // Resetear formulario
  const resetForm = () => {
    setFormData({ name: '', price: '', image: '', description: '' });
    setIsEditing(false);
    setCurrentProduct(null);
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
          Mantenedor de Productos
        </h1>

        {/* FORMULARIO */}
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          marginBottom: '40px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>
            {isEditing ? 'Editar Producto' : 'Crear Nuevo Producto'}
          </h2>

          <form onSubmit={isEditing ? handleUpdate : handleCreate}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Nombre del Producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Precio *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                URL de la Imagen *
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="/ruta-de-la-imagen.jpg"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Descripción *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
              </button>

              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#666',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABLA */}
        <div style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          overflowX: 'auto'
        }}>
          <h2 style={{ marginBottom: '20px' }}>
            Lista de Productos ({products.length})
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  ID
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  Imagen
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  Nombre
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  Precio
                </th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  Descripción
                </th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{product.id}</td>
                  <td style={{ padding: '12px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '5px'
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>{product.name}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>
                    ${product.price.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', maxWidth: '200px' }}>
                    {product.description}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginRight: '5px',
                        fontSize: '14px'
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '12px 30px',
              backgroundColor: '#fff',
              color: '#000',
              border: '2px solid #fff',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
