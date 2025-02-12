import React from 'react';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import styles from './CalculatorPage.module.css';  // presupunând că ai fi creat un fișier CSS pentru stiluri

const CalculatorPage = () => (
  <div className={styles.calculatorPage}>
    <DailyCaloriesForm />
  </div>
);

export default CalculatorPage;
