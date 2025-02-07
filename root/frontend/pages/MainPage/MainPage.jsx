import React from 'react';
import Header from '../../components/Header/Header';
import DailyCaloriesForm from '../../components/DailyCaloriesForm/DailyCaloriesForm';
import styles from './MainPage.module.css';

const MainPage = () => (
  <div className={styles.mainPage}>
    <Header />
    <DailyCaloriesForm />
  </div>
);

export default MainPage;
