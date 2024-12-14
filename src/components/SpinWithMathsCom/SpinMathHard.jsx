import SpinWithMathsCopy from "./SpinWithMathsCopy";

const SpinMathHard = () => {
    const generateQuestions = () => {
      const questions = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const answer = num1 * num2;
        const question = `${answer} ÷ ${num2}`;
        questions.push({ option: question, answer: num1, answered: false });
      }
      return questions;
    };
  
    return <SpinWithMathsCopy level="hard" generateQuestions={generateQuestions} />;
  };
  
  export default SpinMathHard