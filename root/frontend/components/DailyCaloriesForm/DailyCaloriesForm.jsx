import React, { useState } from 'react';
import styles from './DailyCaloriesForm.module.css';

const DailyCaloriesForm = () => {
  const [calories, setCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Daily calories:', calories);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="calories">Daily Calories:</label>
      <input
        type="number"
        id="calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DailyCaloriesForm;
