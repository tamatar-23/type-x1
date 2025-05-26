
import { TypingStats } from '@/types/typing';

interface StatsDisplayProps {
  stats: TypingStats;
  timeLeft?: number;
  mode: 'time' | 'words';
}

export function StatsDisplay({ stats, timeLeft, mode }: StatsDisplayProps) {
  return (
    <div className="flex justify-center gap-8 text-sm text-muted-foreground">
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">{stats.wpm}</div>
        <div>WPM</div>
      </div>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-foreground">{stats.accuracy}%</div>
        <div>Accuracy</div>
      </div>
      
      {mode === 'time' && timeLeft !== undefined && (
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">{timeLeft}</div>
          <div>Time</div>
        </div>
      )}
      
      {mode === 'words' && (
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {Math.round(stats.totalTime)}s
          </div>
          <div>Time</div>
        </div>
      )}
    </div>
  );
}
