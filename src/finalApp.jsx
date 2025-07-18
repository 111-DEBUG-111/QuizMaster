import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import QuizSetup from './pages/QuizSetup';
import { useQuiz } from './context/QuizContext';

// Main app content with authentication
const AuthenticatedApp = () => {
  const { state: authState } = useAuth();
  const [currentView, setCurrentView] = React.useState('home');
  const [authMode, setAuthMode] = React.useState('login');

  // Show loading screen while checking authentication
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QuizWhiz...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, show auth form
  if (!authState.isAuthenticated) {
    return (
      <AuthForm 
        mode={authMode} 
        onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} 
      />
    );
  }

  // If authenticated, show main app with header
  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {currentView === 'home' && <AppContainer />}
        </div>
      </main>
    </div>
  );
};

// App container with routing based on game state
const AppContainer = () => {
  const { state, dispatch } = useQuiz();
  const { gameStarted, selectedCategory, questions } = state;
  
  // Show different screens based on state
  if (gameStarted && selectedCategory && questions.length > 0) {
    return <QuizPage />;
  }
  
  if (selectedCategory && !gameStarted) {
    return <QuizSetup onBack={() => {
      // Reset the quiz state instead of reloading
      dispatch({ type: 'RESET_GAME' });
    }} />;
  }
  
  return <HomePage />;
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          <AuthenticatedApp />
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;