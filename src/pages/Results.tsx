
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TestResult } from '@/types/typing';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    console.log('Results page loaded');
    const storedResult = sessionStorage.getItem('lastResult');
    console.log('Stored result:', storedResult);
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        console.log('Parsed result:', parsedResult);
        setResult(parsedResult);
      } catch (error) {
        console.error('Error parsing result:', error);
        navigate('/');
      }
    } else {
      console.log('No stored result found, redirecting to home');
      navigate('/');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div>Loading results...</div>
      </div>
    );
  }

  const retryTest = () => {
    sessionStorage.removeItem('lastResult');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <Link to="/" className="text-2xl font-bold text-yellow-400">
          TypeFlow
        </Link>
        <Button onClick={retryTest} variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white">
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </header>

      {/* Results Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Stats */}
          <div className="flex justify-center items-start gap-16 mb-12">
            <div className="text-center">
              <div className="text-6xl font-bold text-yellow-400 mb-2">{result.wpm}</div>
              <div className="text-gray-400 text-lg">wpm</div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl font-bold text-yellow-400 mb-2">{result.accuracy}%</div>
              <div className="text-gray-400 text-lg">acc</div>
            </div>
          </div>

          {/* Secondary Stats */}
          <div className="flex justify-center items-center gap-12 mb-12 text-gray-400">
            <div className="text-center">
              <div className="text-sm mb-1">test type</div>
              <div className="text-white">
                {result.settings.mode === 'time' ? `time ${result.settings.duration}` : `words ${result.settings.duration}`}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm mb-1">raw</div>
              <div className="text-white">{Math.round(result.wpm * 1.2)}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm mb-1">characters</div>
              <div className="text-white">{result.correct}/{result.incorrect}/{result.missed}/{result.charCount}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm mb-1">consistency</div>
              <div className="text-white">{Math.round(result.accuracy * 0.9)}%</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm mb-1">time</div>
              <div className="text-white">{Math.round(result.totalTime)}s</div>
            </div>
          </div>

          {/* WPM Chart */}
          {result.wpmHistory && result.wpmHistory.length > 1 && (
            <div className="bg-gray-900/50 rounded-lg p-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={result.wpmHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="time" 
                      tickFormatter={(value) => `${Math.round(value)}s`}
                      stroke="#9CA3AF"
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      labelFormatter={(value) => `Time: ${Math.round(Number(value))}s`}
                      formatter={(value) => [`${value} WPM`, 'WPM']}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '6px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wpm" 
                      stroke="#FCD34D" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: '#FCD34D' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex justify-center gap-4 mt-12">
            <Button onClick={retryTest} variant="outline" className="bg-transparent border-gray-600 text-gray-400 hover:text-white hover:border-white">
              Next Test
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
