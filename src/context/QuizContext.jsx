import React, { createContext, useContext, useReducer } from 'react';
import { quizCategories } from '../data/quizData';

// Initial state
const initialState = {
  categories: quizCategories,
  selectedCategory: null,
  questions: [],
  numberOfQuestions: 5,
  isLoading: false,
  error: null,
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  gameOver: false,
  gameStarted: false,
  timer: 15,
};

// Quiz reducer
const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        gameOver: false,
        questions: [],
        error: null,
      };
    case 'SET_NUMBER_OF_QUESTIONS':
      return {
        ...state,
        numberOfQuestions: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'SET_QUESTIONS':
      return {
        ...state,
        questions: action.payload,
        isLoading: false,
        error: null,
      };
    case 'START_GAME':
      return {
        ...state,
        gameStarted: true,
        timer: 15,
      };
    case 'ANSWER_QUESTION': {
      const { selectedOption, timeSpent } = action.payload;
      const currentQuestion = state.questions[state.currentQuestionIndex];
      
      if (!currentQuestion) return state;
      
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
      // Calculate points based on time spent and correctness
      const maxPoints = 100;
      const timeRatio = Math.max(0, 1 - timeSpent / 15);
      const points = isCorrect ? Math.round(maxPoints * (0.3 + 0.7 * timeRatio)) : 0;
      
      const answer = {
        questionId: currentQuestion.id,
        selectedOption,
        timeSpent,
        isCorrect,
        points,
      };
      
      return {
        ...state,
        score: state.score + points,
        answers: [...state.answers, answer],
      };
    }
    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      const isGameOver = nextIndex >= state.questions.length;
      
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        gameOver: isGameOver,
        timer: isGameOver ? 0 : 15,
      };
    }
    case 'UPDATE_TIMER':
      return {
        ...state,
        timer: action.payload,
      };
    case 'END_GAME':
      return {
        ...state,
        gameOver: true,
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        categories: state.categories,
      };
    default:
      return state;
  }
};

// Create context
const QuizContext = createContext({
  state: initialState,
  dispatch: () => null,
});

// Quiz provider component
export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

// Hook for using quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// context/QuizContext.js (or wherever you define state)

// import React, { createContext, useReducer, useEffect, useContext } from 'react';
// import { quizCategories } from '../data/quizData'; // Your async fetcher

// const initialState = {
//   categories: [],
//   selectedCategory: null,
//   questions: [],
//   numberOfQuestions: 10,
//   isLoading: false,
//   error: null,
//   currentQuestionIndex: 0,
//   score: 0,
//   answers: [],
//   gameOver: false,
//   gameStarted: false,
//   timer: 15,
// };

// // const reducer = (state, action) => {
// //   switch (action.type) {
// //     case 'SET_CATEGORIES':
// //       return {
// //         ...state,
// //         categories: action.payload
// //       };
// //     default:
// //       return state;
// //   }
// // };

// // // Quiz reducer
// const reducer = (state, action) => {
//   switch (action.type) {

//     case 'SET_CATEGORIES':
//       return {
//         ...state,
//         categories: action.payload
//       };

//     case 'SELECT_CATEGORY':
//       return {
//         ...state,
//         selectedCategory: action.payload,
//         currentQuestionIndex: 0,
//         score: 0,
//         answers: [],
//         gameOver: false,
//         questions: [],
//         error: null,
//       };
//     case 'SET_NUMBER_OF_QUESTIONS':
//       return {
//         ...state,
//         numberOfQuestions: action.payload,
//       };
//     case 'SET_LOADING':
//       return {
//         ...state,
//         isLoading: action.payload,
//       };
//     case 'SET_ERROR':
//       return {
//         ...state,
//         error: action.payload,
//         isLoading: false,
//       };
//     case 'SET_QUESTIONS':
//       return {
//         ...state,
//         questions: action.payload,
//         isLoading: false,
//         error: null,
//       };
//     case 'START_GAME':
//       return {
//         ...state,
//         gameStarted: true,
//         timer: 15,
//       };
//     case 'ANSWER_QUESTION': {
//       const { selectedOption, timeSpent } = action.payload;
//       const currentQuestion = state.questions[state.currentQuestionIndex];
      
//       if (!currentQuestion) return state;
      
//       const isCorrect = selectedOption === currentQuestion.correctAnswer;
      
//       // Calculate points based on time spent and correctness
//       const maxPoints = 100;
//       const timeRatio = Math.max(0, 1 - timeSpent / 15);
//       const points = isCorrect ? Math.round(maxPoints * (0.7 + 0.3 * timeRatio)) : 0;
      
//       const answer = {
//         questionId: currentQuestion.id,
//         selectedOption,
//         timeSpent,
//         isCorrect,
//         points,
//       };
      
//       return {
//         ...state,
//         score: state.score + points,
//         answers: [...state.answers, answer],
//       };
//     }
//     case 'NEXT_QUESTION': {
//       const nextIndex = state.currentQuestionIndex + 1;
//       const isGameOver = nextIndex >= state.questions.length;
      
//       return {
//         ...state,
//         currentQuestionIndex: nextIndex,
//         gameOver: isGameOver,
//         timer: isGameOver ? 0 : 15,
//       };
//     }
//     case 'UPDATE_TIMER':
//       return {
//         ...state,
//         timer: action.payload,
//       };
//     case 'END_GAME':
//       return {
//         ...state,
//         gameOver: true,
//       };
//     case 'RESET_GAME':
//       return {
//         ...initialState,
//         categories: state.categories,
//       };
//     default:
//       return state;
//   }
// };

// export const QuizContext = createContext();

// export const QuizProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // Fetch and set categories when component mounts
//   useEffect(() => {
//     async function loadCategories() {
//       const categories = await quizCategories();
//       dispatch({ type: 'SET_CATEGORIES', payload: categories });
//     }

//     loadCategories();
//   }, []);

//   return (
//     <QuizContext.Provider value={{ state, dispatch }}>
//       {children}
//     </QuizContext.Provider>
//   );
// };

// // // Hook for using quiz context
// export const useQuiz = () => {
//   const context = useContext(QuizContext);
//   if (!context) {
//     throw new Error('useQuiz must be used within a QuizProvider');
//   }
//   return context;
// };
