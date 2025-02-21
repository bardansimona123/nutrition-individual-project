import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './RegistrationPage.module.css';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      // Dacă înregistrarea a fost un succes
      navigate('/login'); // Redirectează utilizatorul la pagina de login

    } catch (error) {
      // În cazul unei erori
      setErrorMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className={styles.registrationPage}  autoComplete="off">
      <h2 className={styles.registerTitle}>Register</h2>
      <form onSubmit={handleRegister} className={styles.form}>
        <label className={styles.label} htmlFor="name">Name:</label>
        <div className={styles.inputLine}>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
          autoComplete="off"
        />
        </div>
        <label className={styles.label}>Email *</label>
          <div className={styles.inputLine}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              autoComplete="off"
            />
          </div>
  
          <label className={styles.label}>Password *</label>
          <div className={styles.inputLine}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              autoComplete="off"
            />
          </div>
  
          <div className={styles.buttons}>
            <button type="submit" className={styles.buttonRegister}>
              Register
            </button>
            <button type="button" className={styles.buttonLogin} onClick={() => navigate("/login")}>
              Log in
            </button>
          </div>
      </form>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};

export default RegistrationPage;
