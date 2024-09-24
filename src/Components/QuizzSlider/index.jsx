import './index.css'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from 'react';
import { QuizService } from '../../services/DatabaseService.ts';
import { useAuth } from '../../Contexts/AuthContext.js';
import Slider from 'react-slick';


const getScoreColor = (score) => {
  if (score >= 80) return 'high-score';
  if (score >= 50) return 'medium-score';
  return 'low-score';
};

const QuizzSlider = ({ quizRefs, setDocument }) => {
  const { userData } = useAuth();
  const [quizData, setQuizData] = useState({});
  const [activeQuizId, setActiveQuizId] = useState(null);
  
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchQuizData = async () => {
      const fetchedData = {};

      for (let quizId of Object.keys(quizRefs)) {
        try {
          const quizDoc = await QuizService.getDocumentById(quizId);
          fetchedData[quizId] = quizDoc;
        } catch (error) {
          console.error(`Error fetching quiz data for ${quizId}:`, error);
        }
      }

      setQuizData(fetchedData);
    };

    fetchQuizData();
  }, [quizRefs]);

  const chooseDocument = (id) => {
    setActiveQuizId(id);
    setDocument(quizData[id])
  }

  if (!quizRefs || Object.keys(quizRefs).length === 0) {
    return (
      <div className='slider-container empty-quizz'>
        <p>No quizzes added.</p>
      </div>
    )
  }

  const sortedQuizRefs = Object.keys(quizRefs).sort((a, b) => {
    const joinedAtA = quizRefs[a].joinedAt.seconds;
    const joinedAtB = quizRefs[b].joinedAt.seconds;
    return joinedAtB - joinedAtA;
  });

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sortedQuizRefs.map((id) => {
          const quiz = quizRefs[id];
          return (
            <div key={id} className={'slider-card-container'}>
              <div className={`slider-card ${activeQuizId === id ? 'card-active' : ''}`} onClick={() => chooseDocument(id)}>
                <p className='card-filename m-0'>{quiz.filename}</p>
                <p className='slider-card-date'>
                  {new Date(quiz.joinedAt.seconds * 1000).toLocaleDateString()}
                </p>
                <p className={`m-0 ${quiz.attempted ? getScoreColor(quiz.score) : ''}`}>
                  {userData.role === 'student' && quiz.attempted ? <>Score: {quiz.score}%</> : <>Not attempted</>}
                </p>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default QuizzSlider;