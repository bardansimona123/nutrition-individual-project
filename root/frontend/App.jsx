import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setToken } from './redux/authSlice';
import { jwtDecode } from 'jwt-decode';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import DiaryPage from './pages/DiaryPage/DiaryPage';
import CalculatorPage from './pages/CalculatorPage/CalculatorPage';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth); // Folosește Redux pentru token și user

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Stored Token:", storedToken);
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        dispatch(setToken(storedToken));
        dispatch(setUser(decodedToken.name || decodedToken.username || 'User'));
      } catch (error) {
        console.error('Invalid token', error);
        dispatch(setError('Invalid token'));
      }
    }
  }, [dispatch]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token); // Salvează token-ul în localStorage
    const decodedToken = jwtDecode(token);
    dispatch(setToken(token)); // Setează token-ul în Redux
    dispatch(setUser(decodedToken.name || decodedToken.username || 'User')); // Setează utilizatorul în Redux
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Înlătură token-ul din localStorage
    dispatch(setToken(null)); // Înlătură token-ul din Redux
    dispatch(setUser(null)); // Înlătură utilizatorul din Redux
  };

  return (
    <Router>
      <Header isLoggedIn={!!token} userName={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/diary" element={token ? <DiaryPage /> : <LoginPage />} />
        <Route path="/calculator" element={token ? <CalculatorPage /> : <LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;