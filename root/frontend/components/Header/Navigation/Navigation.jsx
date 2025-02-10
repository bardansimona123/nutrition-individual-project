import React from 'react';
import styles from './Navigation.module.css';

const Navigation = ({ isLoggedIn }) => (
  <div className={styles.navigation}>
    {isLoggedIn ? (
      <>
        <a href="/diary">Diary</a>
        <a href="/calculator">Calculator</a>
      </>
    ) : (
      <>
        <a href="/login">Log In</a>
        <a href="/register">Registration</a>
      </>
    )}
  </div>
);

export default Navigation;
