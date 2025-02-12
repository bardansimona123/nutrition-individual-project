import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = () => (
  <Link to="/diary" className={styles.logo}>
    <img src="path_to_logo_image.png" alt="SlimMom" />
  </Link>
);

export default Logo;

