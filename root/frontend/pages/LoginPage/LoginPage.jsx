import React from 'react';
import styles from './LoginPage.module.css';

const LoginPage = () => (
  <div className={styles.loginPage}>
    <h2>Login</h2>
    <form>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" required />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginPage;
