
import { TestResult } from '@/types/typing';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Clock, Zap } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ResultsDisplayProps {
  result: TestResult;
  onRestart: () => void;
}

const chartConfig = {
  wpm: {
    label: "WPM",
    color: "var(--theme-title)",
  },
}

export function ResultsDisplay({ result, onRestart }: ResultsDisplayProps) {
  console.log('ResultsDisplay - WPM History:', result.wpmHistory);
  console.log('ResultsDisplay - Full result:', result);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Main WPM and Accuracy on left, Graph on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left side - WPM and Accuracy */}
        <div className="space-y-6 px-4">
          <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-left">
              <div className="text-sm opacity-75 mb-2" style={{ color: 'var(--theme-stats)' }}>
                wpm
              </div>
              <div className="text-6xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {result.wpm}
              </div>
            </div>
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-left">
              <div className="text-sm opacity-75 mb-2" style={{ color: 'var(--theme-stats)' }}>
                acc
              </div>
              <div className="text-6xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {result.accuracy}%
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Graph */}
        <div className="animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
          {result.wpmHistory && result.wpmHistory.length > 1 ? (
            <ChartContainer config={chartConfig} className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.wpmHistory}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="var(--theme-stats)" 
                    opacity={0.3} 
                  />
                  <XAxis 
                    dataKey="time" 
                    tickFormatter={(value) => `${Math.round(value)}s`}
                    stroke="var(--theme-stats)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--theme-stats)"
                    fontSize={12}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    labelFormatter={(value) => `Time: ${Math.round(Number(value))}s`}
                    formatter={(value) => [`${value} WPM`, 'WPM']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wpm" 
                    stroke="var(--theme-title)" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: 'var(--theme-title)' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div 
              className="h-64 rounded-lg border-2 border-dashed flex items-center justify-center"
              style={{ borderColor: 'var(--theme-stats)', opacity: 0.3 }}
            >
              <div className="text-center" style={{ color: 'var(--theme-stats)' }}>
                <div className="text-lg font-medium mb-2">Performance Graph</div>
                <div className="text-sm opacity-75">Insufficient data</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section - Test info and detailed stats */}
      <div className="space-y-6 px-4">
        {/* Test type and other info */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <div className="text-sm opacity-75 mb-1" style={{ color: 'var(--theme-stats)' }}>
                test type
              </div>
              <div className="font-medium" style={{ color: 'var(--theme-stats)' }}>
                words {result.totalTime}s
              </div>
              <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
                english
              </div>
            </div>
            
            <div>
              <div className="text-sm opacity-75 mb-1" style={{ color: 'var(--theme-stats)' }}>
                raw
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {Math.round((result.charCount / 5) / (result.totalTime / 60))}
              </div>
            </div>
            
            <div>
              <div className="text-sm opacity-75 mb-1" style={{ color: 'var(--theme-stats)' }}>
                characters
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {result.correct}/{result.incorrect}/{result.missed}/0
              </div>
            </div>
            
            <div>
              <div className="text-sm opacity-75 mb-1" style={{ color: 'var(--theme-stats)' }}>
                consistency
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {Math.round(result.accuracy)}%
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button onClick={onRestart} size="lg" className="px-8">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
