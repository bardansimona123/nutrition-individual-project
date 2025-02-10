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

  return (
    <div className={styles.userInfo}>
      {userName ? <span>{userName}</span> : null}
      {userName && (
        <>
          <div className={styles.separator} />
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
