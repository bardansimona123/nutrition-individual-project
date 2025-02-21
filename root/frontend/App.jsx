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
import Sidebar from "./components/Sidebar/Sidebar";
import PageLayout from "./components/PageLayout/PageLayout";
import banana from './images/banana.png';
import strawberry from './images/strawberry.png';
import frunze from './images/frunze.png';
import vector from './images/vector.png';
import styles from "./App.module.css";

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

  const [calories, setCalories] = useState(0);
  const [nonRecommendedFoods, setNonRecommendedFoods] = useState([]);
  const [products, setProducts] = useState([]);

  const handleSetCalories = (newCalories, restrictedFoods) => {
    setCalories(newCalories);
    setNonRecommendedFoods(restrictedFoods);
  };
  
  const handleAddProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  
  const imagesRightContent = (
    <div className={styles.imagesContainer}>
      <img className={styles.bananaImg} src={banana} alt="Banana" />
      <img className={styles.strawberryImg} src={strawberry} alt="Strawberry" />
      <img className={styles.frunzeImg} src={frunze} alt="Leaves" />
      <img className={styles.vectorImg} src={vector} alt="Decoration" />
    </div>
  );

  return (
    <Router>
      <Header isLoggedIn={!!token} userName={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PageLayout rightContent={imagesRightContent}><MainPage /></PageLayout>} />
        <Route path="/login" element={<PageLayout rightContent={imagesRightContent}><LoginPage onLogin={handleLogin} /></PageLayout>} />
        <Route path="/register" element={<PageLayout rightContent={imagesRightContent}><RegistrationPage /></PageLayout>} />
        <Route path="/calculator" element={token ? (<PageLayout rightContent={<Sidebar calories={calories} 
            consumedCalories={products.reduce((sum, p) => sum + p.calories, 0)} 
            nonRecommendedFoods={nonRecommendedFoods} />} >
            <CalculatorPage onCalculate={handleSetCalories} /></PageLayout>) : <LoginPage />} />

        <Route path="/diary" element={token ? (<PageLayout rightContent={<Sidebar calories={calories} 
            consumedCalories={products.reduce((sum, p) => sum + p.calories, 0)} 
            nonRecommendedFoods={nonRecommendedFoods} />}><DiaryPage onAddProduct={handleAddProduct} />
            </PageLayout>) : <LoginPage />} />

      </Routes>
    </Router>
  );
  
}

export default App;