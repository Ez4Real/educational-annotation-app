import { v4 as uuidv4 } from 'uuid';
import distributeImg from '../../../assets/images/distribute.png';
import { QuizService, UserService } from '../../../services/DatabaseService.ts';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../../config/firebase'
import { Timestamp } from 'firebase/firestore';

const generateAccessKey = () => {
    return uuidv4();
};

export function getDistributeButton(
    annotationManager,
    documentViewer,
    Color,
    userId,
    quizRefs,
    setQuizRefs
  ) {
  return {
    type: 'actionButton',
    className: "row",
    img: distributeImg,
    onClick: async () => {
      try {
        const fileName = promptForFileName();
        if (!fileName) {
          alert('File name is required.');
          return;
        }

        const qaMap = generateQaMap(annotationManager, Color);

        const accessKey = generateAccessKey();
        const quizData = await QuizService.create({ access_key: accessKey, qa: qaMap, filename: fileName });

        const pdfBlob = await generatePdfBlob(documentViewer, annotationManager);
        const pdfUrl = await savePdfToStorage(getDownloadURL, pdfBlob, quizData.id);

        await QuizService.update(quizData.id, { pdfUrl });
        
        if (!quizRefs[quizData.id]) {
          const quiz = await QuizService.getDocumentById(quizData.id)
          const newQuizRef = {
            filename: quiz.filename,
            joinedAt: Timestamp.now(),
          }
          await UserService.update(userId, { [`quizzes.${quiz.docId}`]: newQuizRef });
          setQuizRefs({...quizRefs, [quiz.docId]: newQuizRef});
        }

        alert('Quiz distributed successfully!');
      } catch (error) {
        console.error('Error distributing quiz:', error);
        alert('Failed to distribute quiz. Please try again.');
      }
    },
    dataElement: 'alertButton',
    label: 'Distribute'
  };
}


function promptForFileName() {
  const fileName = window.prompt('Please enter a file name for the quiz:');
  if (!fileName || fileName.trim() === '') {
    return null; 
  }
  return fileName.trim();
}


function generateQaMap(annotationManager, Color) {
  const fields = annotationManager.getFieldManager().getFields().reverse();

  const questionFields = fields.filter(field => field.name.startsWith('question_'));
  const answerFields = fields.filter(field => field.name.startsWith('answer_'));

  const qaMap = [];
  for (let i = 0; i < questionFields.length; i++) {
    const questionField = questionFields[i];
    const answerField = answerFields.find(answer => answer.name === `answer_${questionField.name.split('_')[1]}`);

    qaMap.push({
      question: questionField ? questionField.getValue() : '',
      answer: answerField ? answerField.getValue().toLowerCase() : ''
    });

    questionField.flags.set('ReadOnly', true);
    questionField.font.fillColor = new Color(255, 0, 0, 1);

    if (answerField) {
      answerField.setValue('');
    }
  }

  return qaMap;
}


async function generatePdfBlob(documentViewer, annotationManager) {
  const doc = documentViewer.getDocument();
  const xfdfString = await annotationManager.exportAnnotations();
  const data = await doc.getFileData({ xfdfString });
  return new Blob([new Uint8Array(data)], { type: 'application/pdf' });
}


async function savePdfToStorage(getDownloadURL, pdfBlob, quizId) {
  const storageRef = ref(storage, `/pdfs/${quizId}.pdf`);
  const snapshot = await uploadBytes(storageRef, pdfBlob);
  return getDownloadURL(snapshot.ref);
}