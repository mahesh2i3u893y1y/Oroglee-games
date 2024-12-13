
import NumberPatternCopy from "./NumberPatternCopy";
const correctAnswers = ["12", ["4", "0"], ["10", "20"], ["4", "6"]];

const num1 = [3, 6, 9, "_"]
const num2 = [12, 8, "_", "_"]
const num3 = [5, "_", 15, "_"]
const num4 = [2, "_", "_", 8]

const NumberPatternHard = () => (
    <NumberPatternCopy
        title="Easy Number Pattern Activity"
        correctAnswers={correctAnswers}
        num1={num1}
        num2={num2}
        num3={num3}
        num4={num4}
    />
);
export default NumberPatternHard