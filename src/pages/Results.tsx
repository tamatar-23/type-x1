
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TestResult } from '@/types/typing';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('lastResult');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) {
    return <div>Loading...</div>;
  }

  const retryTest = () => {
    sessionStorage.removeItem('lastResult');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Test
        </Link>
        <h1 className="text-2xl font-bold">Test Results</h1>
        <Button onClick={retryTest} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </header>

      {/* Results Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">WPM</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.wpm}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.accuracy}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{Math.round(result.totalTime)}s</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.charCount}</div>
              </CardContent>
            </Card>
          </div>

          {/* WPM Chart */}
          {result.wpmHistory.length > 1 && (
            <Card>
              <CardHeader>
                <CardTitle>WPM Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.wpmHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="time" 
                        tickFormatter={(value) => `${Math.round(value)}s`}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => `Time: ${Math.round(Number(value))}s`}
                        formatter={(value) => [`${value} WPM`, 'WPM']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="wpm" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-green-500">{result.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct Characters</div>
                </div>
                
                <div className="text-center p-4 bg-red-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-red-500">{result.incorrect}</div>
                  <div className="text-sm text-muted-foreground">Incorrect Characters</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-500">{result.missed}</div>
                  <div className="text-sm text-muted-foreground">Missed Characters</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Test Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Mode:</span>
                  <span className="bg-muted px-2 py-1 rounded">
                    {result.settings.mode === 'time' ? `${result.settings.duration}s` : `${result.settings.duration} words`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Difficulty:</span>
                  <span className="bg-muted px-2 py-1 rounded capitalize">
                    {result.settings.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Date:</span>
                  <span className="bg-muted px-2 py-1 rounded">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Results;
