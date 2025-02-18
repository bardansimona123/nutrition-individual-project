import React, { useState } from 'react';
import styles from './UserInfo.module.css';

const UserInfo = ({ userName, onLogout }) => {
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const handleLogout = () => {
    setShowExitConfirmation(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowExitConfirmation(false);
  };

  const cancelLogout = () => {
    setShowExitConfirmation(false);
  };
  console.log(userName); // Verifică valoarea lui userName

  return (
    <div className={styles.userInfo}>
      {userName ? <span>{userName}</span> : null}
      
      {userName && (
        <>
          <svg width="2" height="32" viewBox="0 0 2 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.separatorSvg}>
            <path d="M1 0L0.999999 32" stroke="#E0E0E0" strokeWidth="2"/>
          </svg>
          <button onClick={handleLogout}>Exit</button>
        </>
      )}
  
      {showExitConfirmation && (
        <div className={styles.exitConfirmation}>
          <p>Are you sure you want to log out?</p>
          <button onClick={confirmLogout}>Yes</button>
          <button onClick={cancelLogout}>No</button>
        </div>
      )}
    </div>
  );  
};

export default UserInfo;
