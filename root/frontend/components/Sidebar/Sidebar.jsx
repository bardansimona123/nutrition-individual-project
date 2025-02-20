import React, { useState } from 'react';
// import DailyCaloriesForm from '../DailyCaloriesForm/DailyCaloriesForm';
// import DailyCalorieIntake from '../DailyCalorieIntake/DailyCalorieIntake';
// import DiaryProductsList from '../DiaryComponents/DiaryProductsList';
import styles from './Sidebar.module.css';

// const Sidebar = () => {
//   const [calories, setCalories] = useState(null);
//   const [nonRecommendedFoods, setNonRecommendedFoods] = useState([]);
//   const [consumedCalories, setConsumedCalories] = useState(0);
//   const [products, setProducts] = useState([]);

// ;

const Sidebar = ({ calories, consumedCalories, nonRecommendedFoods }) => {
  const leftCalories = calories ? calories - consumedCalories : 0;
  const percentage = calories ? Math.round((consumedCalories / calories) * 100) : 0;

  return (
    <div className={styles.sidebar}>
  <div className={styles.summary}>
    <h3>Summary for {new Date().toLocaleDateString()}</h3>
    <ul>
      <li className={styles.item}>
        <span className={styles.label}>Left:</span>
        <span className={styles.value}>{leftCalories > 0 ? leftCalories : 0} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>Consumed:</span>
        <span className={styles.value}>{consumedCalories} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>Daily Rate:</span>
        <span className={styles.value}>{calories ? calories : '000'} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>n%:</span>
        <span className={styles.value}>{percentage}%</span>
      </li>
    </ul>
  </div>

  {/* Non-recommended Foods */}
  <div className={styles.nonRecommended}>
    <h3>Food not recommended</h3>
    <ul>
      {nonRecommendedFoods.length > 0 ? (
        nonRecommendedFoods.map((food, index) => (
          <li key={index}>
            {food.charAt(0).toUpperCase() + food.slice(1).toLowerCase()}
          </li>
        ))
      ) : (
        <p>Your diet will be displayed here</p>
      )}
    </ul>
  </div>
</div>

  );
};

export default Sidebar;
