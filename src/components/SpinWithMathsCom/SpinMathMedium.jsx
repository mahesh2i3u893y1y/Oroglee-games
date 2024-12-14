import SpinWithMathsCopy from "./SpinWithMathsCopy";

const SpinMathMedium = () => {
    const generateQuestions = () => {
      const questions = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = `${num1} × ${num2}`;
        const answer = num1 * num2;
        questions.push({ option: question, answer, answered: false });
      }
      return questions;
    };
  
    return <SpinWithMathsCopy level="medium" generateQuestions={generateQuestions} />;
  };

 export default SpinMathMedium  