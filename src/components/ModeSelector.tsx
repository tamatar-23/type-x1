
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
    <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
      {/* Mode Toggle */}
      <Button
        variant={settings.mode === 'time' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onSettingsChange({ ...settings, mode: 'time', duration: 30 })}
        disabled={disabled}
        className="px-4"
      >
        Time
      </Button>
      <Button
        variant={settings.mode === 'words' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onSettingsChange({ ...settings, mode: 'words', duration: 50 })}
        disabled={disabled}
        className="px-4"
      >
        Words
      </Button>

      {/* Separator */}
      <div className="w-px h-6 bg-border mx-2" />

      {/* Duration Options */}
      {settings.mode === 'time' ? (
        timeOptions.map((time) => (
          <Button
            key={time}
            variant={settings.duration === time ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSettingsChange({ ...settings, duration: time })}
            disabled={disabled}
            className="px-4"
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
            className="px-4"
          >
            {words}
          </Button>
        ))
      )}
    </div>
  );
}
