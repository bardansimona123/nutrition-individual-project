import React from 'react';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import styles from './MainPage.module.css';

const MainPage = () => (
  <div className={styles.mainPage}>
    <DailyCaloriesForm />
  </div>
);

export default MainPage;
