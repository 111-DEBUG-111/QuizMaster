import React from 'react';
import { Trophy } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const ScoreBoard = () => {
  const { state } = useQuiz();
  const { score, answers } = state;
  
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const totalAnswers = answers.length;
  const percentage = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  
  let performanceMessage = "Let's start the quiz!";
  let performanceColor = "text-purple-600";
  
  if (totalAnswers > 0) {
    if (percentage >= 60) {
      performanceMessage = "Excellent!";
      performanceColor = "text-green-600";
    } else if (percentage >= 40) {
      performanceMessage = "Good job!";
      performanceColor = "text-blue-600";
    } else if (percentage >= 20) {
      performanceMessage = "Keep practicing!";
      performanceColor = "text-yellow-600";
    } else {
      performanceMessage = "Try again!";
      performanceColor = "text-red-600";
    }
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Score</h3>
        <div className="flex items-center">
          <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
          <span className="text-xl font-bold text-purple-700">{score}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Correct</span>
          <span className="font-medium text-green-600">{correctAnswers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-medium">{totalAnswers}</span>
        </div>
        
        {totalAnswers > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-600">Accuracy</span>
              <span className="font-medium">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className={`text-center mt-2 font-semibold ${performanceColor}`}>
              {performanceMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;