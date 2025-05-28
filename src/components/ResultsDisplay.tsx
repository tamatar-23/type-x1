
import { TestResult } from '@/types/typing';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Clock, Zap } from 'lucide-react';

interface ResultsDisplayProps {
  result: TestResult;
  onRestart: () => void;
}

export function ResultsDisplay({ result, onRestart }: ResultsDisplayProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Main WPM and Accuracy on left, Graph placeholder on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Left side - WPM and Accuracy */}
        <div className="space-y-6">
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

        {/* Right side - Graph placeholder */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div 
            className="h-64 rounded-lg border-2 border-dashed flex items-center justify-center"
            style={{ borderColor: 'var(--theme-stats)', opacity: 0.3 }}
          >
            <div className="text-center" style={{ color: 'var(--theme-stats)' }}>
              <div className="text-lg font-medium mb-2">Performance Graph</div>
              <div className="text-sm opacity-75">Coming Soon</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - Test info and detailed stats */}
      <div className="space-y-6">
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

        {/* Additional stats */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="flex justify-center mb-2">
                <Clock className="h-6 w-6" style={{ color: 'var(--theme-stats)' }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {Math.round(result.totalTime)}s
              </div>
              <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
                time
              </div>
            </div>
            
            <div className="text-center p-4">
              <div className="flex justify-center mb-2">
                <Trophy className="h-6 w-6" style={{ color: 'var(--theme-stats)' }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: 'var(--theme-stats)' }}>
                {result.charCount}
              </div>
              <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
                characters
              </div>
            </div>

            <div className="text-center p-4">
              <div className="flex justify-center mb-2">
                <Target className="h-6 w-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500">{result.correct}</div>
              <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>correct</div>
            </div>

            <div className="text-center p-4">
              <div className="flex justify-center mb-2">
                <Target className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-500">{result.incorrect}</div>
              <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>incorrect</div>
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
