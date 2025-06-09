
import { doc, setDoc, getDoc, updateDoc, collection, addDoc, query, where, orderBy, limit, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TestResult } from '@/types/typing';

export interface UserStats {
  totalTests: number;
  bestWPM: number;
  averageWPM: number;
  averageAccuracy: number;
  totalTime: number;
  lastTestDate?: Date;
}

export interface FirestoreTestResult extends Omit<TestResult, 'id' | 'timestamp'> {
  userId: string;
  createdAt: any; // Firestore timestamp
}

export const firestoreService = {
  // Create or update user profile
  async createUserProfile(userId: string, userData: {
    displayName?: string;
    email?: string;
    photoURL?: string;
  }) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          ...userData,
          createdAt: serverTimestamp(),
          totalTests: 0,
          bestWPM: 0,
          averageWPM: 0,
          averageAccuracy: 0,
          totalTime: 0
        });
        console.log('User profile created successfully');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  // Save test result
  async saveTestResult(userId: string, result: TestResult) {
    try {
      // Save the test result with simpler structure
      const testData = {
        userId,
        wpm: result.wpm,
        accuracy: result.accuracy,
        correct: result.correct,
        incorrect: result.incorrect,
        missed: result.missed,
        totalTime: result.totalTime,
        charCount: result.charCount,
        settings: result.settings,
        wpmHistory: result.wpmHistory,
        createdAt: serverTimestamp()
      };

      const testRef = await addDoc(collection(db, 'testResults'), testData);
      console.log('Test result saved with ID:', testRef.id);

      // Update user stats
      await this.updateUserStats(userId, result);
      
      return testRef.id;
    } catch (error) {
      console.error('Error saving test result:', error);
      throw error;
    }
  },

  // Update user statistics
  async updateUserStats(userId: string, newResult: TestResult) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const currentStats = userSnap.data() as UserStats;
        
        const totalTests = (currentStats.totalTests || 0) + 1;
        const totalTime = (currentStats.totalTime || 0) + newResult.totalTime;
        const bestWPM = Math.max(currentStats.bestWPM || 0, newResult.wpm);
        
        // Calculate new average WPM
        const averageWPM = Math.round(
          ((currentStats.averageWPM || 0) * (totalTests - 1) + newResult.wpm) / totalTests
        );
        
        // Calculate new average accuracy
        const averageAccuracy = Math.round(
          ((currentStats.averageAccuracy || 0) * (totalTests - 1) + newResult.accuracy) / totalTests
        );

        await updateDoc(userRef, {
          totalTests,
          bestWPM,
          averageWPM,
          averageAccuracy,
          totalTime,
          lastTestDate: serverTimestamp()
        });
        
        console.log('User stats updated successfully');
      }
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  },

  // Get user statistics
  async getUserStats(userId: string): Promise<UserStats | null> {
    try {
      console.log('Fetching user stats for:', userId);
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        console.log('User stats found:', data);
        return {
          totalTests: data.totalTests || 0,
          bestWPM: data.bestWPM || 0,
          averageWPM: data.averageWPM || 0,
          averageAccuracy: data.averageAccuracy || 0,
          totalTime: data.totalTime || 0,
          lastTestDate: data.lastTestDate?.toDate()
        };
      } else {
        console.log('No user document found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  },

  // Get recent test results - simplified query
  async getRecentTests(userId: string, limitCount: number = 10): Promise<(FirestoreTestResult & { id: string })[]> {
    try {
      console.log('Fetching recent tests for user:', userId);
      
      // Use only userId filter first, then sort in memory if needed
      const testsQuery = query(
        collection(db, 'testResults'),
        where('userId', '==', userId),
        limit(limitCount * 2) // Get more to account for sorting
      );
      
      const querySnapshot = await getDocs(testsQuery);
      const tests: (FirestoreTestResult & { id: string })[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tests.push({
          id: doc.id,
          userId: data.userId,
          wpm: data.wpm,
          accuracy: data.accuracy,
          correct: data.correct,
          incorrect: data.incorrect,
          missed: data.missed,
          totalTime: data.totalTime,
          charCount: data.charCount,
          settings: data.settings,
          wpmHistory: data.wpmHistory,
          createdAt: data.createdAt
        });
      });
      
      // Sort by createdAt in memory and limit
      const sortedTests = tests
        .sort((a, b) => {
          if (!a.createdAt || !b.createdAt) return 0;
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        })
        .slice(0, limitCount);
      
      console.log('Recent tests found:', sortedTests.length);
      return sortedTests;
    } catch (error) {
      console.error('Error fetching recent tests:', error);
      throw error;
    }
  }
};
