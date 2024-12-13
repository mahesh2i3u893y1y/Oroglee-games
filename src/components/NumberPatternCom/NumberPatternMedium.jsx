import NumberPatternCopy from "./NumberPatternCopy";


const num1 =  [5,10,15 , "_"]
const num2 =  [15, 30, "_", "_"]

const num3 =  [12, "_", 36, "_"]
const num4 =[9, "_", "_", 36]

  const correctAnswers = ["20", ["45", "60"], ["24", "48"], ["18", "27"]];

const NumberPatternMedium = () => (
    <NumberPatternCopy
      title="Easy Number Pattern Activity"
      correctAnswers={correctAnswers}
      num1={num1}
      num2={num2}
      num3={num3}
      num4={num4}
    />
  );
  export default NumberPatternMedium