import React, { useState } from "react";
import DiaryDateCalendar from "../../components/DiaryComponents/DiaryDateCalendar";
import DiaryAddProductForm from '../../components/DiaryComponents/DiaryAddProductForm';
import DiaryProductsList from "../../components/DiaryComponents/DiaryProductsList";
import styles from "./DiaryPage.module.css";

const DiaryPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, { ...product, date: selectedDate }]);
  };

  const removeProduct = (title) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.title !== title)
    );
  };

  // Formatăm data curentă
  const formattedDate = selectedDate.toLocaleDateString('ro-RO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.diaryPage}>
      <div className={styles.diaryHeader}>
        <h2>{formattedDate}</h2>
        <svg
          onClick={() => setShowCalendar(!showCalendar)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={styles.calendarIcon}
        >
          <path
            fill="currentColor"
            d="M20 3h-16c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2h16c1.1 0 1.99-.9 1.99-2L21 5c0-1.1-.89-2-1.99-2zm-4 14h-8v-2h8v2zm0-4h-8v-2h8v2zm-10-6h12V5H6v2z"
          ></path>
        </svg>
      </div>

      {showCalendar && <DiaryDateCalendar setSelectedDate={setSelectedDate} />}
      
      <DiaryAddProductForm addProduct={addProduct} />
      <DiaryProductsList products={products} removeProduct={removeProduct} />
    </div>
  );
};

export default DiaryPage;
