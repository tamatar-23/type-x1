
import { TestResult } from '@/types/typing';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Clock, Zap } from 'lucide-react';

interface ResultsDisplayProps {
  result: TestResult;
  onRestart: () => void;
}

export function ResultsDisplay({ result, onRestart }: ResultsDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Main Stats */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold" style={{ color: 'var(--theme-title)' }}>
          Test Complete!
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Zap className="h-8 w-8" style={{ color: 'var(--theme-stats)' }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: 'var(--theme-stats)' }}>
              {result.wpm}
            </div>
            <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
              WPM
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Target className="h-8 w-8" style={{ color: 'var(--theme-stats)' }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: 'var(--theme-stats)' }}>
              {result.accuracy}%
            </div>
            <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
              Accuracy
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Clock className="h-8 w-8" style={{ color: 'var(--theme-stats)' }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: 'var(--theme-stats)' }}>
              {Math.round(result.totalTime)}s
            </div>
            <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
              Time
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Trophy className="h-8 w-8" style={{ color: 'var(--theme-stats)' }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: 'var(--theme-stats)' }}>
              {result.charCount}
            </div>
            <div className="text-sm opacity-75" style={{ color: 'var(--theme-stats)' }}>
              Characters
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-2xl font-bold text-green-500">{result.correct}</div>
          <div className="text-sm" style={{ color: 'var(--theme-stats)' }}>Correct</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-500">{result.incorrect}</div>
          <div className="text-sm" style={{ color: 'var(--theme-stats)' }}>Incorrect</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-500">{result.missed}</div>
          <div className="text-sm" style={{ color: 'var(--theme-stats)' }}>Missed</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} size="lg">
          Try Again
        </Button>
      </div>
    </div>
  );
}
