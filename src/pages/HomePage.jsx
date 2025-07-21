import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import { useQuiz } from '../context/QuizContext';

const HomePage = () => {
  const { state } = useQuiz();
  const navigate = useNavigate();
  
  const handleCategorySelect = (category) => {
    navigate(`/quiz-setup/${category.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BrainCircuit className="w-12 h-12 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-800">QuizMaster</h1>
          </div>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge your knowledge with exciting quizzes across various categories. 
            Answer questions quickly to earn more points!
          </p>
        </header>
        
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose a Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onSelect={handleCategorySelect} 
              />
            ))}
          </div>
        </section>
        
        <section className="mt-16">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">How to Play</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 text-xl font-bold mb-3">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose a Category</h3>
                <p className="text-gray-600">Select from a variety of categories that interest you.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 text-xl font-bold mb-3">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Answer Questions</h3>
                <p className="text-gray-600">Answer questions before time runs out. Faster answers earn more points!</p>
              </div>
              
              <div className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 text-xl font-bold mb-3">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Track Your Progress</h3>
                <p className="text-gray-600">See your score and review your performance at the end.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;