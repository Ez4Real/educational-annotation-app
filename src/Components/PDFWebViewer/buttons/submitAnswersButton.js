import assessmentImg from '../../../assets/images/assessment.png';
import { UserService } from '../../../services/DatabaseService.ts';

export function getSubmitAnswersButton(userData, currentDoc, setQuizRefs, annotationManager) {
  return {
    type: 'actionButton',
    className: "row",
    img: assessmentImg,
    onClick: async () => {
      const fields = annotationManager.getFieldManager().getFields().reverse();
      const answerTextFields = fields.filter(
        field => field.type === 'Tx' && field.name.startsWith('answer_')
      ); 

      const correctAnswers = currentDoc.qa
      let correctCount = 0;

      answerTextFields.forEach((answer, index) => {
        console.log('Given: ', answer.getValue().toLowerCase());
        console.log('Correct: ', correctAnswers[index].answer);
        
        if (answer.getValue().toLowerCase() === correctAnswers[index].answer) {
          correctCount++;
        }
      });
      
      const scorePercentage = ((correctCount / correctAnswers.length) * 100).toFixed(1);
      console.log(scorePercentage);
      

      const quizFieldPath = `quizzes.${currentDoc.docId}`;
      await UserService.update(
        userData.docId,
        { [`${quizFieldPath}.attempted`]: true,
          [`${quizFieldPath}.score`]: scorePercentage }
      );

      const updatedUser = await UserService.getOneByUid(userData.uid);
      setQuizRefs(updatedUser.quizzes)



    },
    dataElement: 'alertButton',
    label: 'Assessment'
  };
}