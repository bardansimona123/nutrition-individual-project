import React from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserInfo from './UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = ({ isLoggedIn, userName, onLogout }) => (
  <header className={styles.header}>
    <Logo />
    <Navigation isLoggedIn={isLoggedIn} />
    <UserInfo userName={userName} onLogout={onLogout} />
  </header>
);

export default Header;
