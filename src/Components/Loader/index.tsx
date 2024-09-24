import React from 'react';
import styles from './index.module.css';

const CircularLoader: React.FC = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles['loader']}></div>
    </div>
  );
};

export default CircularLoader;