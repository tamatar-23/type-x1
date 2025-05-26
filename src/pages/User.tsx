
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Target, Keyboard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const User = () => {
  // In a real app, this would check if user is logged in
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="flex justify-between items-center p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Test
          </Link>
          <h1 className="text-2xl font-bold">User Profile</h1>
          <div></div>
        </header>

        {/* Guest Mode Message */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center">
              <Keyboard className="h-12 w-12 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Guest Mode</h2>
              <p className="text-muted-foreground text-lg">
                You're currently using TypeFlow as a guest. Your test results are not being saved.
              </p>
              <p className="text-muted-foreground">
                Create an account to track your progress, view detailed statistics, and see your improvement over time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg">
                Sign Up
              </Button>
              <Button variant="outline" size="lg">
                Log In
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // This would be shown for logged-in users
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Test
        </Link>
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button variant="outline" size="sm">
          Sign Out
        </Button>
      </header>

      {/* User Stats */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Average WPM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85</div>
                <div className="text-xs text-green-500">+5 from last week</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Average Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94%</div>
                <div className="text-xs text-green-500">+2% from last week</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Total Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24h</div>
                <div className="text-xs text-muted-foreground">423 tests completed</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  Best WPM
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <div className="text-xs text-muted-foreground">Personal record</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tests Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Keyboard className="mx-auto h-12 w-12 mb-4" />
                <p>Your test history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default User;
