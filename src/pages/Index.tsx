
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { TypingArea } from '@/components/TypingArea';
import { ModeSelector } from '@/components/ModeSelector';
import { StatsDisplay } from '@/components/StatsDisplay';
import { useTypingTest } from '@/hooks/useTypingTest';
import { TestSettings } from '@/types/typing';

const Index = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<TestSettings>({
    mode: 'time',
    duration: 30,
    difficulty: 'easy'
  });

  const {
    text,
    userInput,
    characters,
    currentIndex,
    isActive,
    isFinished,
    timeLeft,
    stats,
    handleInput,
    resetTest,
    getResult
  } = useTypingTest(settings);

  const handleRestart = () => {
    resetTest();
  };

  const handleViewResults = () => {
    const result = getResult();
    // Store result in sessionStorage for the results page
    sessionStorage.setItem('lastResult', JSON.stringify(result));
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-border">
        <Link to="/" className="text-2xl font-bold">
          TypeFlow
        </Link>
        <Link to="/user">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Mode Selector */}
          {!isActive && !isFinished && (
            <ModeSelector
              settings={settings}
              onSettingsChange={setSettings}
              disabled={isActive}
            />
          )}

          {/* Stats Display */}
          {(isActive || isFinished) && (
            <StatsDisplay
              stats={stats}
              timeLeft={timeLeft}
              mode={settings.mode}
            />
          )}

          {/* Typing Area */}
          <TypingArea
            text={text}
            characters={characters}
            currentIndex={currentIndex}
            userInput={userInput}
            onInput={handleInput}
            isFinished={isFinished}
          />

          {/* Action Buttons */}
          {isFinished && (
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} variant="outline">
                Try Again
              </Button>
              <Button onClick={handleViewResults}>
                View Results
              </Button>
            </div>
          )}

          {(isActive || isFinished) && !isFinished && (
            <div className="flex justify-center">
              <Button onClick={handleRestart} variant="outline">
                Restart
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-6">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        <ThemeToggle />
      </footer>
    </div>
  );
};

export default Index;
