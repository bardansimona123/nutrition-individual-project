import React, { useState } from 'react';
import styles from './Sidebar.module.css';


const Sidebar = ({ calories, consumedCalories, nonRecommendedFoods }) => {
  const leftCalories = calories ? calories - consumedCalories : 0;
  const percentage = calories ? Math.round((consumedCalories / calories) * 100) : 0;

  return (
    <div className={styles.sidebar}>
  <div className={styles.summary}>
    <h3 className={styles.localdate}>Summary for {new Date().toLocaleDateString()}</h3>
    <ul>
      <li className={styles.item}>
        <span className={styles.label}>Left</span>
        <span className={styles.value}>{leftCalories > 0 ? leftCalories : 0} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>Consumed</span>
        <span className={styles.value}>{consumedCalories} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>Daily Rate</span>
        <span className={styles.value}>{calories ? calories : '000'} kcal</span>
      </li>
      <li className={styles.item}>
        <span className={styles.label}>n%</span>
        <span className={styles.value}>{percentage}%</span>
      </li>
    </ul>
  </div>

  {/* Non-recommended Foods */}
  <div className={styles.nonRecommended}>
    <h3 className={styles.nonfood}>Food not recommended</h3>
    <ul>
      {nonRecommendedFoods.length > 0 ? (
        nonRecommendedFoods.map((food, index) => (
          <li key={index}>
            {food.charAt(0).toUpperCase() + food.slice(1).toLowerCase()}
          </li>
        ))
      ) : (
        <p className={styles.nonproducts}>Your diet will be displayed here</p>
      )}
    </ul>
  </div>
</div>

  );
};

export default Sidebar;
