import React from 'react';

import { NavLink } from "react-router-dom";
import styles from './Navigation.module.css';

const Navigation = ({ isLoggedIn }) => (
  <div className={styles.navigation}>
    {isLoggedIn ? (
      <>
        <NavLink to="/diary" className={({ isActive }) => isActive ? styles.active : ""}>Diary</NavLink>
        <NavLink to="/calculator" className={({ isActive }) => isActive ? styles.active : ""}>Calculator</NavLink>
      </>
    ) : (
      <>
        <NavLink to="/login" className={({ isActive }) => isActive ? styles.active : ""}>Log In</NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? styles.active : ""}>Registration</NavLink>
      </>
    )}
  </div>
);

export default Navigation;
