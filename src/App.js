import React, { useState } from 'react';
import CreateProduct from './components/CreateProduct';
import ProductList from './components/ProductList';
import './App.css';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleProductCreated = () => {
        // Forzar recarga de la lista de productos
        setRefreshKey(oldKey => oldKey + 1);
    };

    return (
        <div className="App">
            <header style={styles.header}>
                <h1>🛍️ Mi Tienda de Ropa</h1>
            </header>
            
            <main style={styles.main}>
                <CreateProduct onProductCreated={handleProductCreated} />
                <ProductList key={refreshKey} />
            </main>
        </div>
    );
}

const styles = {
    header: {
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
    },
    main: {
        padding: '20px'
    }
};

export default App;