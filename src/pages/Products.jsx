import { useEffect, useState } from "react";
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import '../styles/styleProductos.css';
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://100.29.84.13:8080/api/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header showOffer={true} />

      <main className="productos-main">
        <h1>PRODUCTOS</h1>

        <div className="productos-grid">
          {products.map(product => (
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
