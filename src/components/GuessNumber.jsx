import { useState } from 'react';

const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userGuess = parseInt(guess);

    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number');
      return;
    }

    if (userGuess === targetNumber) {
      setMessage(`Correct! Attempts: ${attempts + 1}`);
    } else if (userGuess > targetNumber) {
      setMessage('Too high!');
    } else {
      setMessage('Too low!');
    }
    setAttempts(attempts + 1);
  };

  // Function to restart the game
  const handleRestart = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1); // Generate a new target number
    setAttempts(0); // Reset attempts
    setGuess(''); // Clear the guess input
    setMessage(''); // Clear the message
  };

  // Handle input change for guess
  const handleInputChange = (e) => {
    setGuess(e.target.value); // Update guess state with the input value
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl mb-4">Guess the Number Game</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={guess}  // Ensure the input value is controlled by the guess state
            onChange={handleInputChange} // Ensure the state is updated on input change
            className="p-2 rounded-md border mb-4 text-black mx-4"
            
            placeholder="Enter a number between 1 and 100"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Submit Guess</button>
        </form>
        <p className="mt-4">{message}</p>
        <p>Attempts: {attempts}</p>
        <button 
          onClick={handleRestart} 
          className="mt-4 bg-green-500 text-white p-2 rounded-md">
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default GuessNumber;
