import React, { useState } from 'react';

function NutritionApp() {
  const [productName, setProductName] = useState('');
  const [grams, setGrams] = useState('');
  const [addedProducts, setAddedProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setProductName(query);

    if (query) {
      const filteredProducts = databaseProducts.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.categories.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleAddProduct = () => {
    const foundProduct = databaseProducts.find(
      (product) => product.title.toLowerCase() === productName.toLowerCase()
    );

    if (foundProduct && grams) {
      const caloriesPerGram = foundProduct.calories / 100;
      const totalCalories = caloriesPerGram * parseInt(grams);

      setAddedProducts([
        ...addedProducts,
        {
          name: foundProduct.title,
          grams: parseInt(grams),
          calories: totalCalories,
        },
      ]);
    } else {
      alert('Produsul nu a fost găsit sau gramajul nu este valid');
    }

    setProductName('');
    setGrams('');
    setSuggestions([]);
  };

  const handleDeleteProduct = (index) => {
    const newProductsList = addedProducts.filter((_, i) => i !== index);
    setAddedProducts(newProductsList);
  };

  const handleSuggestionClick = (product) => {
    setProductName(product.title);
    setSuggestions([]);
  };

  return (

    <div>
      
      {/* Titlul cu data curentă */}
      <div>
        <h2>Data curentă: {selectedDate}</h2>
        
        {/* SVG cu calendar pentru setarea datei */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{ marginLeft: '10px' }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Enter product name"
          value={productName}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Enter grams"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
        />
        <button onClick={handleAddProduct}>+</button>
      </div>
      {suggestions.length > 0 && (
        <div>
          <ul>
            {suggestions.map((product) => (
              <li key={product._id} onClick={() => handleSuggestionClick(product)}>
                {product.title} ({product.categories})
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2>Products List</h2>
        <ul>
          {addedProducts.map((product, index) => (
            <li key={index}>
              <span>{product.name} - {product.grams}g</span>
              <span> - {product.calories.toFixed(2)} kcal</span>
              <button onClick={() => handleDeleteProduct(index)}>
                <svg width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.293 4.293a1 1 0 0 1 1.414 0L8 6.586l2.293-2.293a1 1 0 0 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 1 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 0-1.414z"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NutritionApp;
