// import React, { useState } from 'react';
// import { Trophy, Medal, BarChart, Timer, ArrowLeft } from 'lucide-react';
// import { useQuiz } from '../context/QuizContext';

// const ResultScreen = () => {
//   const { state, dispatch } = useQuiz();
//   const { score, answers, selectedCategory } = state;
//   const [activeTab, setActiveTab] = useState('summary');
  
//   if (!selectedCategory) return null;
  
//   const correctAnswers = answers.filter(a => a.isCorrect).length;
//   const totalQuestions = state.questions.length;
//   const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  
//   const averageTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / answers.length;
  
//   // Determine performance level
//   let performanceTitle = "Better Luck Next Time";
//   let performanceColor = "text-red-600";
  
//   if (accuracy >= 90) {
//     performanceTitle = "Quiz Master!";
//     performanceColor = "text-purple-600";
//   } else if (accuracy >= 75) {
//     performanceTitle = "Knowledge Expert";
//     performanceColor = "text-green-600";
//   } else if (accuracy >= 60) {
//     performanceTitle = "Knowledge Seeker";
//     performanceColor = "text-blue-600";
//   } else if (accuracy >= 40) {
//     performanceTitle = "Knowledge Apprentice";
//     performanceColor = "text-yellow-600";
//   }
  
//   const handlePlayAgain = () => {
//     dispatch({ type: 'RESET_GAME' });
//   };

//   const renderSummary = () => (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h3 className={`text-2xl font-bold mb-2 ${performanceColor}`}>{performanceTitle}</h3>
//         <div className="text-xl font-semibold">Final Score: {score}</div>
//       </div>
      
//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-purple-50 p-4 rounded-lg text-center">
//           <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-purple-700">{score}</div>
//           <div className="text-sm text-purple-600">Total Score</div>
//         </div>
        
//         <div className="bg-green-50 p-4 rounded-lg text-center">
//           <Medal className="w-6 h-6 text-green-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-green-700">{accuracy}%</div>
//           <div className="text-sm text-green-600">Accuracy</div>
//         </div>
        
//         <div className="bg-blue-50 p-4 rounded-lg text-center">
//           <BarChart className="w-6 h-6 text-blue-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-blue-700">{correctAnswers}/{totalQuestions}</div>
//           <div className="text-sm text-blue-600">Correct Answers</div>
//         </div>
        
//         <div className="bg-yellow-50 p-4 rounded-lg text-center">
//           <Timer className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
//           <div className="text-2xl font-bold text-yellow-700">{averageTime.toFixed(1)}s</div>
//           <div className="text-sm text-yellow-600">Avg. Time</div>
//         </div>
//       </div>
      
//       <div className="flex justify-center pt-4">
//         <button 
//           onClick={handlePlayAgain}
//           className="bg-purple-600 text-white rounded-full px-6 py-2 transition-all hover:bg-purple-700"
//         >
//           Play Again
//         </button>
//       </div>
//     </div>
//   );

//   const renderDetails = () => (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold mb-3">Question Details</h3>
      
//       <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
//         {state.questions.map((question, idx) => {
//           const answer = answers.find(a => a.questionId === question.id);
//           const isCorrect = answer?.isCorrect;
          
//           return (
//             <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
//               <div className="flex justify-between items-start">
//                 <div className="text-sm font-medium">Question {idx + 1}</div>
//                 <div className={`text-xs px-2 py-1 rounded-full ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
//                   {isCorrect ? 'Correct' : 'Incorrect'}
//                 </div>
//               </div>
              
//               <p className="my-2 text-gray-800">{question.text}</p>
              
//               <div className="text-sm">
//                 <div className="flex justify-between text-gray-600">
//                   <span>Your answer:</span>
//                   <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
//                     {answer ? question.options[answer.selectedOption] : 'No answer'}
//                   </span>
//                 </div>
                
//                 {!isCorrect && (
//                   <div className="flex justify-between text-gray-600 mt-1">
//                     <span>Correct answer:</span>
//                     <span className="text-green-600">{question.options[question.correctAnswer]}</span>
//                   </div>
//                 )}
                
//                 <div className="flex justify-between text-gray-600 mt-1">
//                   <span>Time spent:</span>
//                   <span>{answer?.timeSpent.toFixed(1)}s</span>
//                 </div>
                
//                 <div className="flex justify-between text-gray-600 mt-1">
//                   <span>Points earned:</span>
//                   <span className="font-medium">{answer?.points || 0}</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
      
//       <div className="flex justify-center pt-4">
//         <button 
//           onClick={handlePlayAgain}
//           className="bg-purple-600 text-white rounded-full px-6 py-2 transition-all hover:bg-purple-700"
//         >
//           Play Again
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl mx-auto">
//       <div className="flex items-center mb-6">
//         <button 
//           onClick={handlePlayAgain}
//           className="mr-4 p-2 rounded-full hover:bg-gray-100"
//         >
//           <ArrowLeft className="w-5 h-5" />
//         </button>
//         <h2 className="text-xl font-bold">Quiz Results: {selectedCategory.name}</h2>
//       </div>
      
//       <div className="flex border-b border-gray-200 mb-6">
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === 'summary' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
//           onClick={() => setActiveTab('summary')}
//         >
//           Summary
//         </button>
//         <button
//           className={`px-4 py-2 font-medium ${activeTab === 'details' ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600'}`}
//           onClick={() => setActiveTab('details')}
//         >
//           Question Details
//         </button>
//       </div>
      
//       {activeTab === 'summary' ? renderSummary() : renderDetails()}
//     </div>
//   );
// };

// export default ResultScreen;