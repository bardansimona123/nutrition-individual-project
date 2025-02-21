import React from 'react';
import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ calories, nonRecommendedFoods, onClose }) => (
  <div className={styles.container}>
    <button className={styles.closeButton} onClick={onClose}>✖</button>
    <h2 className={styles.title}>Your recommended daily calorie intake is</h2>
    <div className={styles.calories}>
      <p className={styles.kcal}>{calories ? `${calories} kcal` : 'Calculating calories...'}</p>
    </div>
    <div className={styles.separator}></div>
    <h3 className={styles.foods}>Foods you should not eat</h3>
    <ol>
      {nonRecommendedFoods.length > 0 ? (
        nonRecommendedFoods.map((food, index) => (
          <li key={index}>{food.charAt(0).toUpperCase() + food.slice(1).toLowerCase()}</li>
        ))
      ) : (
        <p>Loading non-recommended foods...</p>
      )}
    </ol>
  </div>
);

export default DailyCalorieIntake;

 