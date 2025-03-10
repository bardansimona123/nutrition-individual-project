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
    
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <div className={styles.diaryPage}>
      <div className={styles.diaryHeader}>
        <h2>{formattedDate}</h2>
        <svg onClick={() => setShowCalendar(!showCalendar)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 9H13V11H15V9Z" fill="#9B9FAA"/>
<path d="M11 9H9V11H11V9Z" fill="#9B9FAA"/>
<path d="M7.00002 9H5V11H7.00002V9Z" fill="#9B9FAA"/>
<path d="M17 2.00001H16V0H14V2.00001H6.00001V0H4V2.00001H3.00001C1.89001 2.00001 1.01003 2.90001 1.01003 4.00003L1 18C1 19.1 1.89001 20 3.00001 20H17C18.1 20 19 19.1 19 18V3.99998C19 2.90001 18.1 2.00001 17 2.00001ZM17 18H3.00001V6.99998H17V18Z" fill="#9B9FAA"/>
</svg>
      </div>

      {showCalendar && (
        <div className={styles.modalOverlay} onClick={() => setShowCalendar(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowCalendar(false)}>✖</button>
            <DiaryDateCalendar setSelectedDate={setSelectedDate} closeModal={() => setShowCalendar(false)} />
          </div>
        </div>
      )}
      
      <DiaryAddProductForm addProduct={addProduct} />
      <DiaryProductsList products={products} removeProduct={removeProduct} />
    </div>
  );
};

export default DiaryPage;
