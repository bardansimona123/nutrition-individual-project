import React, { useState } from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserInfo from './UserInfo/UserInfo';
import styles from './Header.module.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName('John Doe');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  return (
    <header className={styles.header}>
      <Logo />
      <Navigation isLoggedIn={isLoggedIn} />
      <UserInfo userName={userName} onLogout={handleLogout} />
    </header>
  );
};

export default Header;

