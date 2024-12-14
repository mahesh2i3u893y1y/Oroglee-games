import SpinWithMathsCopy from "./SpinWithMathsCopy";


const SpinMathEasy = () => {
    const generateQuestions = () => {
      const questions = [];
      for (let i = 0; i < 10; i++) {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const isAddition = Math.random() > 0.5;
        const question = isAddition
          ? `${num1} + ${num2}`
          : `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        const answer = isAddition ? num1 + num2 : Math.max(num1, num2) - Math.min(num1, num2);
        questions.push({ option: question, answer, answered: false });
      }
      return questions;
    };
  
    return <SpinWithMathsCopy level="easy" generateQuestions={generateQuestions} />;
  };

  export default SpinMathEasy