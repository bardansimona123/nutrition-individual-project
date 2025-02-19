import React from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserInfo from './UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = ({ isLoggedIn, userName, onLogout }) => (
  <header className={styles.header}>
    <Logo />
    <svg width="2" height="32" viewBox="0 0 2 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 0L0.999999 32" stroke="#E0E0E0" strokeWidth="2"/>
    </svg>
    <Navigation isLoggedIn={isLoggedIn} />
    <UserInfo userName={userName} onLogout={onLogout} />
  </header>
);

export default Header;
