import NumberPatternCopy from "./NumberPatternCopy";
const correctAnswers = ["4", ["30", "40"], ["22", "44"], ["100", "150"]];

const num1 = [1, 2, 3, "_"]
const num2 = [10, 20, "_", "_"]

const num3 = [11, "_", 33, "_"]
const num4 = [50, "_", "_", 200] 

const NumberPatternEasy = () => (
    <NumberPatternCopy
      title="Easy Number Pattern Activity"
      correctAnswers={correctAnswers}
      num1={num1}
      num2={num2}
      num3={num3}
      num4={num4}
    />
  );
  export default NumberPatternEasy