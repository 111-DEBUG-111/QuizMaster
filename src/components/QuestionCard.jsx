import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const QuestionCard = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());
  const [isAnswered, setIsAnswered] = useState(false);
  const { state } = useQuiz();

  useEffect(() => {
    // Reset when a new question is shown
    setSelectedOption(null);
    setIsAnswered(false);
    setStartTime(Date.now());
  }, [question]);

  const handleOptionSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    const timeSpent = (Date.now() - startTime) / 1000;
    onAnswer(optionIndex, timeSpent);
  };

  const getOptionStyles = (index) => {
    if (!isAnswered) {
      return selectedOption === index 
        ? 'bg-purple-200 border-purple-400' 
        : 'bg-white hover:bg-purple-50 border-gray-300';
    }

    if (index === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-800';
    }
    
    if (selectedOption === index && index !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-800';
    }
    
    return 'bg-white border-gray-300 opacity-70';
  };

  const difficultyBadge = () => {
    switch(question.difficulty) {
      case 'easy':
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Easy</span>;
      case 'medium':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Medium</span>;
      case 'hard':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Hard</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">Question {state.currentQuestionIndex + 1}/{state.questions.length}</div>
        {difficultyBadge()}
      </div>
      
      <h3 className="text-xl font-semibold mb-6 text-gray-800">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={isAnswered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex justify-between items-center ${getOptionStyles(index)}`}
          >
            <span>{option}</span>
            {isAnswered && index === question.correctAnswer && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
            {isAnswered && selectedOption === index && index !== question.correctAnswer && (
              <XCircle className="w-5 h-5 text-red-600" />
            )}
          </button>
        ))}
      </div>
      
      {isAnswered && question.explanation && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;