import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { firebaseAuthService } from '../services/firebaseAuthService';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true for initial auth check
  error: null,
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext({
  state: initialState,
  dispatch: () => null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = firebaseAuthService.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const user = await firebaseAuthService.login(email, password);
      // The onAuthStateChanged listener will handle the success dispatch
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  const signup = async (username, email, password) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
      const user = await firebaseAuthService.signup(username, email, password);
      // The onAuthStateChanged listener will handle the success dispatch
    } catch (error) {
      dispatch({ 
        type: 'SIGNUP_FAILURE', 
        payload: error instanceof Error ? error.message : 'Signup failed' 
      });
    }
  };

  const logout = async () => {
    try {
      await firebaseAuthService.logout();
      // The onAuthStateChanged listener will handle the logout dispatch
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};