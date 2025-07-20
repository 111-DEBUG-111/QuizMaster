import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import QuizSetup from './pages/QuizSetup';
import ResultsPage from './pages/ResultsPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { state } = useAuth();
  
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QuizWhiz...</p>
        </div>
      </div>
    );
  }
  
  return state.isAuthenticated ? children : <Navigate to="/auth" replace />;
};

// Auth Route component (redirect if already authenticated)
const AuthRoute = ({ children }) => {
  const { state } = useAuth();
  
  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading QuizWhiz...</p>
        </div>
      </div>
    );
  }
  
  return state.isAuthenticated ? <Navigate to="/" replace /> : children;
};

// Main app content with routing
const AppContent = () => {
  return (
    <Routes>

      <Route 
        path="/auth" 
        element={
          <AuthRoute>
            <AuthForm />
          </AuthRoute>
        } 
      />

      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <HomePage />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/quiz-setup/:categoryId" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <QuizSetup />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/quiz/:categoryId" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <QuizPage />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/results" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <ResultsPage />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                  <ProfilePage />
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <AppContent />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;