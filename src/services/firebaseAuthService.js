import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Convert Firebase user to our User type
const convertFirebaseUser = (firebaseUser) => {
  return {
    id: firebaseUser.uid,
    username: firebaseUser.displayName || 'Anonymous',
    email: firebaseUser.email || '',
    totalScore: 0,
    gamesPlayed: 0,
    averageScore: 0,
    bestScore: 0,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
    lastPlayed: undefined
  };
};

export const firebaseAuthService = {
  // Sign up new user
  signup: async (username, email, password) => {
    try {
      // Validate input
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update the user's display name
      await updateProfile(firebaseUser, {
        displayName: username
      });

      return convertFirebaseUser(firebaseUser);
    } catch (error) {
      // Handle Firebase-specific errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          throw new Error('An account with this email already exists');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address');
        case 'auth/weak-password':
          throw new Error('Password should be at least 6 characters');
        default:
          throw new Error(error.message || 'Failed to create account');
      }
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      return convertFirebaseUser(firebaseUser);
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          throw new Error('Invalid email or password');
        case 'auth/invalid-email':
          throw new Error('Please enter a valid email address');
        case 'auth/too-many-requests':
          throw new Error('Too many failed attempts. Please try again later');
        default:
          throw new Error(error.message || 'Failed to sign in');
      }
    }
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error(error.message || 'Failed to sign out');
    }
  },

  // Get current user
  getCurrentUser: () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        if (firebaseUser) {
          try {
            const user = convertFirebaseUser(firebaseUser);
            resolve(user);
          } catch (error) {
            console.error('Error converting Firebase user:', error);
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });
    });
  },

  // Listen to auth state changes
  onAuthStateChanged: (callback) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        try {
          const user = convertFirebaseUser(firebaseUser);
          callback(user);
        } catch (error) {
          console.error('Error in auth state change:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
};