import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import logo from '../../../images/logo.png';
import slim from '../../../images/Slim.jpg';
import mom from '../../../images/mom.jpg';

const Logo = () => (
  <Link to="/diary" className={styles.logo}>
    <img src={logo} alt="SlimMom Logo" className={styles.logoImage} />
    <div className={styles.logoText}>
      <img src={slim} alt="Slim" className={styles.slim} />
      <img src={mom} alt="Mom" className={styles.mom} />
    </div>
  </Link>
);

export default Logo;

