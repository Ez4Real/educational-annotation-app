import './index.css';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { signOutUser } from '../../config/auth.ts';
import Header from '../../Components/Header/index.jsx';
import { QuizProvider } from '../../Contexts/QuizContext.js';

const Main = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await signOutUser();
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); 
  };

  return (
    <div className="Main">
        <Header 
          onLogout={handleLogout} 
          isOpen={isOpen} 
          toggleMenu={toggleMenu}
          />
        <div className={`content ${isOpen ? 'content-shift' : ''}`}>
          <QuizProvider>
            <Outlet />
          </QuizProvider>
        </div>
      </div>
  );
};

export default Main;