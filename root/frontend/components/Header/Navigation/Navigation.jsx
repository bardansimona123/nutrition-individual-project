import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = ({ isLoggedIn }) => (
  <div className={styles.navigation}>
    {isLoggedIn ? (
      <>
        <Link to="/diary">Diary</Link>
        <Link to="/calculator">Calculator</Link>
      </>
    ) : (
      <>
        <Link to="/login">Log In</Link>
        <Link to="/register">Registration</Link>
      </>
    )}
  </div>
);

export default Navigation;
