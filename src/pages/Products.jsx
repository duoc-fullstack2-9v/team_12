import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/styleProductos.css';

const Products = () => {
  // Todos los productos de tu página productos.html
  const allProducts = [
    {
      id: 5,
      name: 'Supreme/Chicago Varsity Jacket',
      price: 100000,
      image: '/1.avif'
    },
    {
      id: 6,
      name: 'Supreme/Umbro Puffer Jacket',
      price: 80000,
      image: '/2.avif'
    },
    {
      id: 7,
      name: 'Zip-off Quilted Bomber Jacket',
      price: 75000,
      image: '/3.avif'
    },
    {
      id: 8,
      name: 'Overlock Hooded Sweatshirt',
      price: 65000,
      image: '/4.avif'
    },
    {
      id: 9,
      name: 'Dangerous Mesh Short',
      price: 30000,
      image: '/5.avif'
    },
    {
      id: 10,
      name: 'Floral Soccer Jersey',
      price: 45000,
      image: '/6.avif'
    },
    {
      id: 11,
      name: 'Split L football Top',
      price: 30000,
      image: '/7.avif'
    },
    {
      id: 12,
      name: 'Floral Soccer Short',
      price: 30000,
      image: '/8.avif'
    },
    {
      id: 13,
      name: 'Supreme/Humbro Leather Track Pant',
      price: 45000,
      image: '/9.avif'
    },
    {
      id: 14,
      name: 'Supreme/Humbro Gradiant Track Jacket',
      price: 50000,
      image: '/10.avif'
    },
    {
      id: 15,
      name: 'Supreme/Wu-Tang Clan GORE-TEX Cap',
      price: 80000,
      image: '/11.avif'
    },
    {
      id: 16,
      name: 'Supreme/Mitchel Varsity Jacket',
      price: 30000,
      image: '/12.avif'
    }
  ];

  return (
    <div>
      <Header showOffer={true} />

      <main className="productos-main">
        <h1>PRODUCTOS</h1>
        
        <div className="productos-grid">
          {allProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              variant="page" 
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;