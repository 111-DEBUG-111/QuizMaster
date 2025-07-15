const BASE_URL = 'https://opentdb.com/api.php';

// Decode HTML entities
const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Convert API response to our Question format
const convertTriviaQuestion = (triviaQuestion, index) => {
  const allOptions = [
    triviaQuestion.correct_answer,
    ...triviaQuestion.incorrect_answers
  ];
  
  // Shuffle options and find the new position of correct answer
  const shuffledOptions = shuffleArray(allOptions);
  const correctAnswerIndex = shuffledOptions.indexOf(triviaQuestion.correct_answer);
  
  return {
    id: `q-${index}`,
    text: decodeHtml(triviaQuestion.question),
    options: shuffledOptions.map(option => decodeHtml(option)),
    correctAnswer: correctAnswerIndex,
    difficulty: triviaQuestion.difficulty
  };
};

export const fetchTriviaQuestions = async (categoryId, numberOfQuestions, difficulty) => {
  try {
    let url = `${BASE_URL}?amount=${numberOfQuestions}&category=${categoryId}&type=multiple`;
    
    if (difficulty && difficulty !== 'any') {
      url += `&difficulty=${difficulty}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.response_code !== 0) {
      switch (data.response_code) {
        case 1:
          throw new Error('No results found. Try reducing the number of questions or changing the difficulty.');
        case 2:
          throw new Error('Invalid parameter. Please try again.');
        case 3:
          throw new Error('Token not found.');
        case 4:
          throw new Error('Token empty.');
        default:
          throw new Error('Failed to fetch questions. Please try again.');
      }
    }
    
    if (!data.results || data.results.length === 0) {
      throw new Error('No questions available for this category and difficulty.');
    }
    
    return data.results.map((question, index) => convertTriviaQuestion(question, index));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error. Please check your connection and try again.');
  }
};