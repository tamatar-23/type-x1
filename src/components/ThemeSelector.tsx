
import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useThemeContext } from '@/contexts/ThemeContext';
import { themeOptions, themes } from '@/config/themes';

export function ThemeSelector() {
  const { currentTheme, setTheme } = useThemeContext();
  const [open, setOpen] = useState(false);

  const currentThemeLabel = themes[currentTheme]?.label || 'Theme';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-2 hover:bg-white/10 border border-white/20"
          style={{ color: 'var(--theme-stats)' }}
        >
          <Palette className="h-4 w-4" />
          <span className="text-sm font-medium">{currentThemeLabel}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Theme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {themeOptions.map((option) => {
            const theme = themes[option.value];
            return (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
                className={`
                  p-3 rounded-lg border-2 transition-all text-left hover:scale-105
                  ${currentTheme === option.value 
                    ? 'border-blue-400 bg-blue-400/10 shadow-lg' 
                    : 'border-gray-600 hover:border-gray-400'
                  }
                `}
                style={{
                  backgroundColor: `${theme.background}20`,
                  borderColor: currentTheme === option.value ? '#60A5FA' : undefined
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.background }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.title }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.typeBoxText }}
                  />
                </div>
                <div className="text-sm font-medium text-foreground">{option.label}</div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
