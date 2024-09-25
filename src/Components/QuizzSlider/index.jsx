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

  const copyAccessKey = (accessKey) => {
    navigator.clipboard.writeText(accessKey)
      .then(() => alert('Access key copied to clipboard!'))
      .catch(err => console.error('Failed to copy access key:', err));
  };

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
              <div className={`slider-card ${activeQuizId === id ? 'card-active' : ''}`}>
                <div onClick={() => chooseDocument(id)} className="card-content">
                  <p className="card-filename">{quiz.filename}</p>
                  <p className="slider-card-date">
                    {new Date(quiz.joinedAt.seconds * 1000).toLocaleDateString()}
                  </p>
                  {userData.role === 'student' 
                    ? (
                      <p className={`quiz-score ${quiz.attempted ? getScoreColor(quiz.score) : ''}`}>
                        {quiz.attempted ? <>Score: {quiz.score}%</> : <>Not attempted</>}
                      </p>
                    ) 
                    : null
                  }
                </div>
                {userData.role === 'teacher' &&<button className="copy-button" onClick={() => copyAccessKey(quizData[id].access_key)}>
                  Copy Access Key
                </button>}
              </div>

            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default QuizzSlider;