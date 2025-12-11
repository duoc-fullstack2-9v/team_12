import React, { useState } from 'react';
import { createProduct } from '../services/productService';

function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '',
        description: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                ...formData,
                price: parseInt(formData.price) // Convertir a número
            };
            
            const newProduct = await createProduct(productData);
            setMessage('¡Producto creado exitosamente!');
            
            // Limpiar formulario
            setFormData({
                name: '',
                price: '',
                image: '',
                description: ''
            });
            
            console.log('Producto creado:', newProduct);
        } catch (error) {
            setMessage('Error al crear el producto');
        }
    };

    return (
        <div className="create-product">
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del producto"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="text"
                    name="image"
                    placeholder="URL de la imagen"
                    value={formData.image}
                    onChange={handleChange}
                />
                
                <textarea
                    name="description"
                    placeholder="Descripción"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                />
                
                <button type="submit">Crear Producto</button>
            </form>
            
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default CreateProduct;