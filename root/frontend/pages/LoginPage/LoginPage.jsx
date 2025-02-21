import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importă axios
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Login attempt");
    e.preventDefault();

    try {
      console.log("Sending request...");
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log("Response received:", response);
      // Dacă autentificarea a avut succes
      const token = response.data.token;
      localStorage.setItem('token', token); // Salvează token-ul JWT în localStorage sau în context global
      console.log("Redirecting to /calculator...");
      // Redirectează utilizatorul către pagina principală sau dashboard
      navigate('/calculator'); // Exemplu de redirecționare după logare

    } catch (error) {
      // În cazul unei erori (ex: credențiale incorecte)
      setErrorMessage(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className={styles.loginPage} autoComplete="off">
      <h2 className={styles.loginTitle}>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
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
          <button type="submit" className={styles.buttonLogin}>
            Log in
          </button>
          <button type="button" className={styles.buttonRegister} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </form>

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>
  );
};

export default LoginPage;
