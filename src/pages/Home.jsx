import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: 'Hoodie zip Supreme',
      price: 70000,
      image: '/poleron.jfif'
    },
    {
      id: 2,
      name: 'Gorro New ERA',
      price: 40000,
      image: '/gorro.jpg'
    },
    {
      id: 3,
      name: 'Supreme-Maradona-Tee-Black',
      price: 75000,
      image: '/Supreme-Maradona-Tee-Black.avif'
    },
    {
      id: 4,
      name: 'supreme-x-umbro-snap-sleeve-jacket-black',
      price: 80000,
      image: '/supreme-x-umbro-snap-sleeve-jacket-black-ss23j57-black_1.jpg'
    }
  ];

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh', width: '100%' }}>
      <Header showOffer={true} />
      
      <div style={{ backgroundColor: '#000000', padding: '0', margin: '0' }}>
        {/* Sección Hero - FORZAR LAYOUT HORIZONTAL */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#f2f2f2',
          padding: '40px',
          borderRadius: '10px',
          margin: '20px',
          gap: '40px',
          width: 'calc(100% - 40px)',
          boxSizing: 'border-box'
        }}>
          <div style={{
            flex: '1',
            maxWidth: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '20px', 
              color: '#000',
              fontFamily: "'Poppins', sans-serif"
            }}>
              Supreme
            </h1>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.6', 
              marginBottom: '20px', 
              color: '#000',
              fontFamily: "'Poppins', sans-serif"
            }}>
              En abril de 1994, Supreme abrió sus puertas en Lafayette Street, en el centro de Manhattan, 
              y se convirtió en el hogar de la cultura skate de la ciudad de Nueva York. En su núcleo había 
              un grupo de chicos del vecindario, skaters de Nueva York y artistas locales que se convirtieron 
              en el personal y los clientes de la tienda.
            </p>
            <button 
              onClick={() => navigate('/productos')}
              style={{
                padding: '12px 30px',
                background: 'white',
                border: '2px solid black',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px',
                width: 'fit-content',
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Ver productos
            </button>
          </div>

          <div style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '50%'
          }}>
            <img 
              src="/Supreme_Manhattan_NYC_Photo_Gabby-Jones_137.jpg" 
              alt="Imagen principal"
              style={{ 
                width: '100%', 
                maxWidth: '500px', 
                height: 'auto',
                borderRadius: '10px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Título DESTACADO */}
        <h1 style={{ 
          textAlign: 'center',
          color: '#ffffff',
          margin: '40px 0 20px 0',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          width: '100%',
          fontFamily: "'Poppins', sans-serif"
        }}>
          DESTACADO
        </h1>

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          margin: '20px',
          padding: '20px',
          width: 'calc(100% - 40px)'
        }}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;