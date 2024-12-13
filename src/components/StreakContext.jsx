/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const StreakContext = createContext();

export const StreakProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount((prevCount) => (prevCount < 31 ? prevCount + 1 : prevCount));
  };

  return (
    <StreakContext.Provider
      value={{
        streak,
        setStreak,
        points,
        setPoints,
        clickCount,
        setClickCount,
        handleButtonClick,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
};







