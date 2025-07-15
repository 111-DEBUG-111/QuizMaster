// Type definitions for reference (not enforced in JavaScript)

// Question interface
export const createQuestion = (id, text, options, correctAnswer, difficulty, explanation) => ({
  id,
  text,
  options,
  correctAnswer,
  difficulty,
  explanation
});

// Category interface
export const createCategory = (id, name, icon, description, apiId) => ({
  id,
  name,
  icon,
  description,
  apiId
});

// Quiz settings interface
export const createQuizSettings = (categoryId, numberOfQuestions, difficulty) => ({
  categoryId,
  numberOfQuestions,
  difficulty
});

// User interface
export const createUser = (id, username, email, totalScore, gamesPlayed, averageScore, bestScore, createdAt, lastPlayed) => ({
  id,
  username,
  email,
  totalScore,
  gamesPlayed,
  averageScore,
  bestScore,
  createdAt,
  lastPlayed
});

// Game result interface
export const createGameResult = (id, userId, categoryId, categoryName, score, totalQuestions, correctAnswers, accuracy, averageTime, difficulty, playedAt) => ({
  id,
  userId,
  categoryId,
  categoryName,
  score,
  totalQuestions,
  correctAnswers,
  accuracy,
  averageTime,
  difficulty,
  playedAt
});

// Auth state interface
export const createAuthState = (user, isAuthenticated, isLoading, error) => ({
  user,
  isAuthenticated,
  isLoading,
  error
});