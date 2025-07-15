import React, { useEffect, useRef } from 'react';
import { useQuiz } from '../context/QuizContext';

const Timer = () => {
  const { state, dispatch } = useQuiz();
  const { timer, gameOver, gameStarted } = state;
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameOver && timer > 0) {
      timerRef.current = window.setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER', payload: timer - 1 });
      }, 1000);
    }

    if (timer === 0 && !gameOver && gameStarted) {
      // Time's up, auto-submit with no answer
      dispatch({ 
        type: 'ANSWER_QUESTION', 
        payload: { selectedOption: -1, timeSpent: 15 } 
      });
      dispatch({ type: 'NEXT_QUESTION' });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timer, gameOver, gameStarted, dispatch]);

  // Calculate percentage for the progress bar
  const percentage = (timer / 15) * 100;
  
  // Determine color based on time remaining
  let barColor = 'bg-green-500';
  if (percentage < 60) barColor = 'bg-yellow-500';
  if (percentage < 30) barColor = 'bg-red-500';

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">Time Remaining</span>
        <span className="text-gray-700 font-bold">{timer}s</span>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Timer;