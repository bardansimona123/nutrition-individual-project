import React, { useState } from 'react';
import styles from "./DiaryAddProductForm.module.css";


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

        const response = await fetch(`http://localhost:5000/api/products?title=${title}`, {
          method: 'GET',  // specifică metoda GET
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
    <div className={styles.addProductForm}>
      <div className={styles.inputGroup}>
        <label className={styles.leftLabel}>Enter product name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.largeInput}
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.rightLabel}>Grams</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.smallInput}
        />
      </div>

      <button className={styles.addButton} onClick={handleAddProduct}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4_363)">
            <path d="M18.72 12.96H12.96V18.72H11.04V12.96H5.28003V11.04H11.04V5.28003H12.96V11.04H18.72V12.96Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_4_363">
              <rect width="23.04" height="23.04" fill="white" transform="translate(0.47998 0.47998)"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default DiaryAddProductForm;
