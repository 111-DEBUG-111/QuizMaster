import React, { useState } from 'react';
import { Settings, Play, ArrowLeft } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { fetchTriviaQuestions } from '../services/triviaApi';

const QuizSetup = ({ onBack }) => {
  const { state, dispatch } = useQuiz();
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('any');
  
  const { selectedCategory, isLoading, error } = state;
  
  if (!selectedCategory) return null;
  
  const handleStartQuiz = async () => {
    if (!selectedCategory) return;
    
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_NUMBER_OF_QUESTIONS', payload: numberOfQuestions });
    
    try {
      const questions = await fetchTriviaQuestions(
        selectedCategory.apiId,
        numberOfQuestions,
        difficulty === 'any' ? undefined : difficulty
      );
      
      dispatch({ type: 'SET_QUESTIONS', payload: questions });
      dispatch({ type: 'START_GAME' });
    } catch (err) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: err instanceof Error ? err.message : 'Failed to load questions' 
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Quiz Setup</h1>
        </header>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center mb-6">
            <Settings className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Configure Your Quiz</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Category</h3>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="font-medium text-purple-800">{selectedCategory.name}</div>
                <div className="text-sm text-purple-600">{selectedCategory.description}</div>
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Number of Questions
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNumberOfQuestions(num)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      numberOfQuestions === num
                        ? 'border-purple-500 bg-purple-100 text-purple-700'
                        : 'border-gray-300 bg-white hover:border-purple-300'
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>5</span>
                  <span className="font-medium">{numberOfQuestions} questions</span>
                  <span>50</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { value: 'any', label: 'Any', color: 'purple' },
                  { value: 'easy', label: 'Easy', color: 'green' },
                  { value: 'medium', label: 'Medium', color: 'yellow' },
                  { value: 'hard', label: 'Hard', color: 'red' }
                ].map((diff) => (
                  <button
                    key={diff.value}
                    onClick={() => setDifficulty(diff.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      difficulty === diff.value
                        ? `border-${diff.color}-500 bg-${diff.color}-100 text-${diff.color}-700`
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}
            
            <div className="pt-4">
              <button
                onClick={handleStartQuiz}
                disabled={isLoading}
                className="w-full bg-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading Questions...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Quiz
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">Quiz Rules</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Each question has a 15-second time limit</li>
            <li>• Faster answers earn more points (up to 100 points per question)</li>
            <li>• Wrong answers score zero points</li>
            <li>• You cannot go back to previous questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;