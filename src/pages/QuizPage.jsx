import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import { BrainCircuit, ArrowLeft } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const QuizPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { selectedCategory, currentQuestionIndex, gameOver, gameStarted } = state;
  
  useEffect(() => {
    // If no game is started or category doesn't match, redirect
    if (!gameStarted || !selectedCategory || selectedCategory.id !== categoryId) {
      navigate('/');
    }
  }, [gameStarted, selectedCategory, categoryId, navigate]);
  
  // Handle case where no category is selected or game is over
  if (!selectedCategory || gameOver) {
    navigate('/results');
    return null;
  }
  
  const currentQuestion = state.questions[currentQuestionIndex];
  
  const handleAnswer = (selectedOption, timeSpent) => {
    dispatch({ 
      type: 'ANSWER_QUESTION', 
      payload: { selectedOption, timeSpent } 
    });
    
    // Use setTimeout to show the correct answer for a moment before proceeding
    setTimeout(() => {
      dispatch({ type: 'NEXT_QUESTION' });
    }, 1500);
  };
  
  const handleBackToHome = () => {
    navigate('/');
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <button 
            onClick={handleBackToHome}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center">
            <BrainCircuit className="w-8 h-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">QuizWhiz</h1>
          </div>
          
          <div className="w-20">
            {/* Empty div for layout balance */}
          </div>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                {selectedCategory.name} Quiz
              </h2>
              
              <Timer />
              
              {currentQuestion && (
                <QuestionCard 
                  question={currentQuestion} 
                  onAnswer={handleAnswer} 
                />
              )}
            </div>
          </div>
          
          <div className="md:w-1/4">
            <ScoreBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;