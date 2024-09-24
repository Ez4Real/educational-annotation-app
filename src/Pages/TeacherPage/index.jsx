import './index.css'
import PDFWebViewer from '../../Components/PDFWebViewer'
import { useCallback, useState } from 'react'
import { useAuth } from '../../Contexts/AuthContext';
import { useQuiz } from '../../Contexts/QuizContext.js';
import QuizzSlider from '../../Components/QuizzSlider/index.jsx';


const TeacherPage = ({}) => {
  // const { userData } = useAuth();
  const { quizRefs, setCurrentDoc } = useQuiz();
  const [uploadedFile, setUploadedFile] = useState(null)

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0]
    setUploadedFile(file)
  }, [])

  return (
    <div>
      <div className='panel'>
        <div className='panelBtnContainer'>
          <label htmlFor="upload-quizz" className="uploadNewQuizz">
            <i className="fas fa-file-upload"></i> Upload PDF
          </label>
          <input
            id="upload-quizz"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </div>
        <QuizzSlider quizRefs={quizRefs} setDocument={setCurrentDoc} />
      </div>
      
      <PDFWebViewer uploadedFile={uploadedFile}/>
    </div>
  )
}

export default TeacherPage