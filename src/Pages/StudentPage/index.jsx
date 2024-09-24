import './index.css'
import React, { useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext.js';
import { useQuiz } from '../../Contexts/QuizContext.js';
import JoinQuizModal from '../../Components/JoinQuizModal';
import PDFWebViewer from '../../Components/PDFWebViewer';
import QuizzesSlider from '../../Components/QuizzSlider/index.jsx';
import { UserService, QuizService } from '../../services/DatabaseService.ts';
import { Timestamp } from 'firebase/firestore';

const StudentPage = () => {
  const { userData } = useAuth();
  const { quizRefs, currentDoc, setQuizRefs, setCurrentDoc } = useQuiz();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const toggleModal = () => {
    setShowModal(!showModal);
    setError('');
    setSuccess('')
  };

  const joinQuizSubmit = async (accessKey) => {
    const quiz = await QuizService.getOneByAccessKey(accessKey);
    if (!quiz) {
      return setError('Wrong Access Key')
    }
    if (!quizRefs[quiz.docId]) {
      const newQuizRef = {
        attempted: false,
        filename: quiz.filename,
        joinedAt: Timestamp.now(),
      }
      await UserService.update(userData.docId, { [`quizzes.${quiz.docId}`]: newQuizRef });
      setQuizRefs({...quizRefs, [quiz.docId]: newQuizRef});
      setSuccess('Joined the quiz successfully');
    } else {
      setSuccess('You already joined this quiz!');
    }
    setCurrentDoc(quiz);
    setTimeout(toggleModal, 1000);
  }

  return (
    <div>
      <div className='panel'>
        <div className='panelBtnContainer'>
          <button className='btn' onClick={toggleModal}>Join Quiz</button>
        </div>
        <QuizzesSlider quizRefs={quizRefs} setDocument={setCurrentDoc} />
      </div>
      {quizRefs[currentDoc?.docId]?.attempted && (
        <div className="score-display-container">
          <div className="score-card">
            <h1 className="score-text">
              📘 {currentDoc.filename} 📘 
            </h1>
            <p className={`score-value ${quizRefs[currentDoc.docId].score >= 80 ? 'high-score' : quizRefs[currentDoc.docId].score >= 50 ? 'medium-score' : 'low-score'}`}>
              Your Score: <span>{quizRefs[currentDoc.docId].score}%</span>
            </p>
            <p className="score-feedback">
              {quizRefs[currentDoc.docId].score >= 80 && "Excellent performance! Keep it up! 🎯"}
              {quizRefs[currentDoc.docId].score >= 50 && quizRefs[currentDoc.docId].score < 80 && "Good job! You’re getting there! 📈"}
              {quizRefs[currentDoc.docId].score < 50 && "Keep practicing, you’ll improve! 💪"}
            </p>
          </div>
        </div>
      )}
      { showModal &&
        <JoinQuizModal
          onClose={toggleModal}
          onSubmit={joinQuizSubmit}
          error={error}
          success={success}
        />}
      { currentDoc && !quizRefs[currentDoc.docId].attempted
        && <PDFWebViewer />
      }
    </div>
  );
};

export default StudentPage;