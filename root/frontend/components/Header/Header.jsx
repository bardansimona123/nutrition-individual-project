import React from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserInfo from './UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <Navigation />
    <UserInfo />
  </header>
);

export default Header;
