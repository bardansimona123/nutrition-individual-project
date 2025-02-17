import React from 'react';

const DiaryProductsListItem = ({ product, removeProduct }) => {
  return (
    <div className="product-item">
      <span>{product.title}</span>
      <span>{product.weight}g</span>
      <span>{product.calories} cal</span>
      <button onClick={() => removeProduct(product.title)}>X</button>
    </div>
  );
};

export default DiaryProductsListItem;
