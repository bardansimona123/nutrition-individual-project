import React, { useState } from 'react';
import axios from 'axios';

const DiaryAddProductForm = ({ addProduct }) => {
  const [title, setTitle] = useState('');
  const [weight, setWeight] = useState('');

  const handleAddProduct = async () => {
    if (title && weight) {
      try {
        // Log pentru a verifica dacă avem titlul corect
        console.log('Searching for product with title:', title);
        
        // Căutăm produsul în baza de date pentru a obține caloriile per 100g
        const token = 'JWT_SECRET';  // Înlocuiește cu token-ul JWT actual

        const response = await axios.get(`http://localhost:5000/api/products?title=${title}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        
        // Log pentru a verifica ce se returnează de la API
        console.log('Response from API:', response.data);

        const product = response.data;

        if (product) {
          // Log pentru a verifica dacă avem produsul
          console.log('Product found:', product);

          // Calculul caloriilor în funcție de greutatea introdusă
          const productCalories = (product.calories * weight) / 100;

          // Creăm obiectul nou de produs
          const newProduct = {
            title: product.title,
            weight: weight,
            calories: productCalories,
          };

          // Trimitem produsul către componenta părinte
          addProduct(newProduct);

          // Resetăm câmpurile input
          setTitle('');
          setWeight('');
        } else {
          console.log('No product found with the given title');
        }
      } catch (error) {
        console.error('Error retrieving product:', error);
        alert('An error occurred while adding the product');
      }
    }
  };

  return (
    <div className="add-product-form">
      <input
        type="text"
        placeholder="Titlu produs"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Greutate"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={handleAddProduct}>Add</button>
    </div>
  );
};

export default DiaryAddProductForm;
