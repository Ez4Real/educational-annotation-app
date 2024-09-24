import './index.css'
import React, { useState, useEffect } from 'react';
import { QuizService, UserService } from '../../services/DatabaseService.ts';

const TeacherGrades = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const quizList = await QuizService.getAll();
        setQuizzes(quizList);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (!selectedQuiz) return;

    const fetchGrades = async () => {
      try {
        const students = await UserService.getAll();
        const quizData = await QuizService.getDocumentById(selectedQuiz);

        const grades = students.map((student) => {
          const studentQuiz = student.quizzes?.[quizData.docId];

          return {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            status: studentQuiz
              ? studentQuiz.attempted
                ? `Score: ${studentQuiz.score}%`
                : 'Not attempted'
              : 'Not added',
            score: studentQuiz?.score || null,
            attempted: studentQuiz?.attempted || false,
          };
        });

        setStudentGrades(grades);
      } catch (error) {
        console.error('Error fetching student grades:', error);
      }
    };

    fetchGrades();
  }, [selectedQuiz]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'high-score';
    if (score >= 50) return 'medium-score';
    return 'low-score';
  };

  return (
    <div className="grades-page">
      <h1>Student Grades</h1>
      <div className="quiz-selection">
        <select 
          id="quizSelect"
          className="quiz-select"
          value={selectedQuiz}
          onChange={(e) => setSelectedQuiz(e.target.value)}
        >
          <option value="">--Select Quiz--</option>
          {quizzes.map((quiz) => (
            <option key={quiz.id} value={quiz.id}>
              {quiz.filename}
            </option>
          ))}
        </select>
      </div>

      {studentGrades.length > 0 ? (
        <table className="grades-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Score (%)</th>
              <th>Attempted</th>
            </tr>
          </thead>
          <tbody>
            {studentGrades.map((grade, index) => (
              <tr key={index}>
                <td>{grade.firstName}</td>
                <td>{grade.lastName}</td>
                <td>{grade.email}</td>
                <td className={
                    grade.score !== null ? `${getScoreColor(grade.score)}` : ''
                }>
                  {grade.score !== null ? grade.score : 'N/A'}
                </td>
                <td>
                  {grade.attempted
                    ?<span className="check-icon">✔</span>
                    : <span className="cross-icon">✘</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No grades available for the selected quiz.</p>
      )}
    </div>
  );
};

export default TeacherGrades;