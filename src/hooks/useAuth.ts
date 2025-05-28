
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider, githubProvider } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await createUserDocument(result.user);
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await createUserDocument(result.user);
      return result.user;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const createUserDocument = async (user: User) => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();
      
      try {
        await setDoc(userRef, {
          displayName,
          email,
          photoURL,
          createdAt,
          totalTests: 0,
          bestWPM: 0,
          averageWPM: 0,
          averageAccuracy: 0
        });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
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
