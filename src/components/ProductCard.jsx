import { useCart } from '../context/CartContext';

const ProductCard = ({ product, variant = 'default' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} agregado al carrito!`);
  };

  // Variante para la página de productos (más detallada)
  if (variant === 'page') {
    return (
      <div style={{
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        padding: '20px',
        textAlign: 'center',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            width: '100%',
            maxWidth: '250px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '5px',
            marginBottom: '15px'
          }}
        />
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: 'white',
          border: '1px solid #666',
          padding: '8px 16px',
          fontSize: '12px',
          color: '#ff0000',
          textDecoration: 'underline',
          cursor: 'pointer',
          marginBottom: '10px',
          display: 'inline-block'
        }}>
          {product.name}
        </h2>
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginBottom: '8px'
        }}>
          Precio
        </div>
        <div style={{
          fontSize: '14px',
          color: '#000',
          fontWeight: 'bold',
          marginBottom: '15px'
        }}>
          ${product.price.toLocaleString()}
        </div>
        <button 
          onClick={handleAddToCart}
          style={{
            backgroundColor: 'white',
            border: '1px solid #666',
            padding: '6px 12px',
            fontSize: '11px',
            color: '#000',
            cursor: 'pointer',
            width: '80px'
          }}
        >
          Agregar al carro
        </button>
      </div>
    );
  }

  // Variante por defecto (para la página principal)
  return (
    <div style={{
      background: '#f9f9f9',
      textAlign: 'center',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.3s'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          maxWidth: '250px',
          height: '250px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '15px'
        }}
      />
      <h3 style={{
        color: '#007BFF',
        fontSize: '1rem',
        margin: '10px 0 5px',
        minHeight: '40px'
      }}>
        {product.name}
      </h3>
      <p style={{
        fontSize: '0.9rem',
        color: '#555',
        margin: '5px 0'
      }}>
        Precio
      </p>
      <span style={{
        fontWeight: 'bold',
        fontSize: '1.2rem',
        color: '#000',
        margin: '10px 0'
      }}>
        ${product.price.toLocaleString()}
      </span>
      <button 
        onClick={handleAddToCart}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;