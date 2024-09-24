import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const { userData } = useAuth();
  const [quizRefs, setQuizRefs] = useState(userData.quizzes || []);
  const [currentDoc, setCurrentDoc] = useState(null)

  return (
    <QuizContext.Provider value={{ quizRefs, setQuizRefs, currentDoc, setCurrentDoc }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);