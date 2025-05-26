
import { Button } from '@/components/ui/button';
import { TestSettings } from '@/types/typing';

interface ModeSelectorProps {
  settings: TestSettings;
  onSettingsChange: (settings: TestSettings) => void;
  disabled?: boolean;
}

export function ModeSelector({ settings, onSettingsChange, disabled }: ModeSelectorProps) {
  const timeOptions = [15, 30, 60];
  const wordOptions = [10, 50, 100];

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-4">
        <Button
          variant={settings.mode === 'time' ? 'default' : 'outline'}
          onClick={() => onSettingsChange({ ...settings, mode: 'time', duration: 30 })}
          disabled={disabled}
        >
          Time
        </Button>
        <Button
          variant={settings.mode === 'words' ? 'default' : 'outline'}
          onClick={() => onSettingsChange({ ...settings, mode: 'words', duration: 50 })}
          disabled={disabled}
        >
          Words
        </Button>
      </div>

      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
        {settings.mode === 'time' ? (
          timeOptions.map((time) => (
            <Button
              key={time}
              variant={settings.duration === time ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSettingsChange({ ...settings, duration: time })}
              disabled={disabled}
              className="px-6"
            >
              {time}s
            </Button>
          ))
        ) : (
          wordOptions.map((words) => (
            <Button
              key={words}
              variant={settings.duration === words ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onSettingsChange({ ...settings, duration: words })}
              disabled={disabled}
              className="px-6"
            >
              {words}
            </Button>
          ))
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={settings.difficulty === 'easy' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSettingsChange({ ...settings, difficulty: 'easy' })}
          disabled={disabled}
        >
          Easy
        </Button>
        <Button
          variant={settings.difficulty === 'hard' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSettingsChange({ ...settings, difficulty: 'hard' })}
          disabled={disabled}
        >
          Hard
        </Button>
      </div>
    </div>
  );
}
