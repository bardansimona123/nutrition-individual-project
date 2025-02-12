
import React from 'react';
import styles from './DailyCalorieIntake.module.css';

const DailyCalorieIntake = ({ calories, nonRecommendedFoods }) => (
  <div className={styles.container}>
    <h2>Your recommended daily calorie intake is</h2>
    <div className={styles.calories}>
      <p>{calories ? `${calories} kcal` : 'Calculating calories...'}</p>
    </div>
    <div className={styles.separator}></div>
    <h3>Foods you should not eat</h3>
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
 