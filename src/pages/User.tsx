
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, Clock, Target, Keyboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { firestoreService, UserStats } from '@/services/firestore';
import { FirestoreTestResult } from '@/services/firestore';

const User = () => {
  const { user, loading, signInWithGoogle, signInWithGithub, signOut } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [recentTests, setRecentTests] = useState<(FirestoreTestResult & { id: string })[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data when authenticated
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      
      setDataLoading(true);
      setError(null);
      
      try {
        const [stats, tests] = await Promise.all([
          firestoreService.getUserStats(user.uid),
          firestoreService.getRecentTests(user.uid, 10)
        ]);
        
        setUserStats(stats);
        setRecentTests(tests);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--theme-background)' }}>
        <div className="text-lg" style={{ color: 'var(--theme-stats)' }}>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)', color: 'var(--theme-typebox)' }}>
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--theme-stats)' }}>
            <ArrowLeft className="h-4 w-4" />
            Back to Test
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--theme-title)' }}>User Profile</h1>
          <div></div>
        </header>

        {/* Guest Mode Message */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(180, 180, 180, 0.1)' }}>
              <Keyboard className="h-12 w-12" style={{ color: 'var(--theme-stats)' }} />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold" style={{ color: 'var(--theme-title)' }}>Guest Mode</h2>
              <p className="text-lg" style={{ color: 'var(--theme-stats)' }}>
                You're currently using Type.TMTR as a guest. Your test results are not being saved.
              </p>
              <p style={{ color: 'var(--theme-stats)' }}>
                Create an account to track your progress, view detailed statistics, and see your improvement over time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" onClick={signInWithGoogle}>
                Sign Up with Google
              </Button>
              <Button variant="outline" size="lg" onClick={signInWithGithub}>
                Sign Up with GitHub
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // This is shown for logged-in users
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-background)', color: 'var(--theme-typebox)' }}>
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ color: 'var(--theme-stats)' }}>
          <ArrowLeft className="h-4 w-4" />
          Back to Test
        </Link>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--theme-title)' }}>
          Welcome, {user.displayName}
        </h1>
        <Button variant="outline" size="sm" onClick={signOut}>
          Sign Out
        </Button>
      </header>

      {/* User Stats */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-8">
            {user.photoURL && (
              <img 
                src={user.photoURL} 
                alt={user.displayName || 'User'} 
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--theme-title)' }}>
                {user.displayName}
              </h2>
              <p style={{ color: 'var(--theme-stats)' }}>{user.email}</p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center py-4 text-red-500">
              {error}
            </div>
          )}

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--theme-stats)' }}>
                  <TrendingUp className="h-4 w-4" />
                  Average WPM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--theme-title)' }}>
                  {userStats?.averageWPM || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--theme-stats)' }}>
                  {userStats?.totalTests ? `${userStats.totalTests} tests` : 'No tests yet'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--theme-stats)' }}>
                  <Target className="h-4 w-4" />
                  Average Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--theme-title)' }}>
                  {userStats?.averageAccuracy || 0}%
                </div>
                <div className="text-xs" style={{ color: 'var(--theme-stats)' }}>
                  {userStats?.totalTests ? `${userStats.totalTests} tests` : 'No tests yet'}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--theme-stats)' }}>
                  <Clock className="h-4 w-4" />
                  Total Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--theme-title)' }}>
                  {userStats?.totalTime ? formatTime(userStats.totalTime) : '0h'}
                </div>
                <div className="text-xs" style={{ color: 'var(--theme-stats)' }}>
                  {userStats?.totalTests || 0} tests completed
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--theme-stats)' }}>
                  <Keyboard className="h-4 w-4" />
                  Best WPM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold" style={{ color: 'var(--theme-title)' }}>
                  {userStats?.bestWPM || 0}
                </div>
                <div className="text-xs" style={{ color: 'var(--theme-stats)' }}>
                  {userStats?.totalTests ? 'Personal best' : 'No tests yet'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests Table */}
          <Card>
            <CardHeader>
              <CardTitle style={{ color: 'var(--theme-title)' }}>Recent Tests</CardTitle>
            </CardHeader>
            <CardContent>
              {recentTests.length > 0 ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-5 gap-4 pb-2 border-b border-border text-sm font-medium" style={{ color: 'var(--theme-stats)' }}>
                    <div>Date</div>
                    <div>WPM</div>
                    <div>Accuracy</div>
                    <div>Mode</div>
                    <div>Time</div>
                  </div>
                  {recentTests.map((test) => (
                    <div key={test.id} className="grid grid-cols-5 gap-4 py-2 text-sm" style={{ color: 'var(--theme-typebox)' }}>
                      <div>{formatDate(test.createdAt)}</div>
                      <div className="font-medium">{test.wpm}</div>
                      <div>{test.accuracy}%</div>
                      <div>{test.settings.mode} {test.settings.duration}</div>
                      <div>{Math.round(test.totalTime)}s</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8" style={{ color: 'var(--theme-stats)' }}>
                  <Keyboard className="mx-auto h-12 w-12 mb-4" />
                  <p>Your test history will appear here once you complete some tests</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default User;
