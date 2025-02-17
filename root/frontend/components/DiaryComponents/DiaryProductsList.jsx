import React from 'react';
import DiaryProductsListItem from './DiaryProductsListItem';

const DiaryProductsList = ({ products, removeProduct }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <DiaryProductsListItem
          key={index}
          product={product}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  );
};

export default DiaryProductsList;

