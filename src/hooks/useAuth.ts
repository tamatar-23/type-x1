
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '@/lib/firebase';
import { firestoreService } from '@/services/firestore';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign-in...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google sign-in successful:', result.user);
      
      // Create user document in Firestore
      try {
        await firestoreService.createUserProfile(result.user.uid, {
          displayName: result.user.displayName || '',
          email: result.user.email || '',
          photoURL: result.user.photoURL || ''
        });
      } catch (docError: any) {
        console.warn('Failed to create user document (continuing anyway):', docError);
      }
      
      navigate('/user');
      return result.user;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Domain not authorized. Please add this domain to Firebase authorized domains.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by browser. Please allow popups and try again.');
      } else {
        throw new Error(`Authentication failed: ${error.message}`);
      }
    }
  };

  const signInWithGithub = async () => {
    try {
      console.log('Attempting GitHub sign-in...');
      const result = await signInWithPopup(auth, githubProvider);
      console.log('GitHub sign-in successful:', result.user);
      
      // Create user document in Firestore
      try {
        await firestoreService.createUserProfile(result.user.uid, {
          displayName: result.user.displayName || '',
          email: result.user.email || '',
          photoURL: result.user.photoURL || ''
        });
      } catch (docError: any) {
        console.warn('Failed to create user document (continuing anyway):', docError);
      }
      
      navigate('/user');
      return result.user;
    } catch (error: any) {
      console.error('Error signing in with GitHub:', error);
      
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error('Domain not authorized. Please add this domain to Firebase authorized domains.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Popup was blocked by browser. Please allow popups and try again.');
      } else {
        throw new Error(`Authentication failed: ${error.message}`);
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithGithub,
    signOut
  };
}
