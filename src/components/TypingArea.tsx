
import React, { useEffect, useRef, useState } from 'react';
import { Character } from '@/types/typing';
import { MousePointer } from 'lucide-react';

interface TypingAreaProps {
  characters: Character[];
  currentIndex: number;
  isActive: boolean;
  onActivate: () => void;
  onKeyPress: (key: string) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  characters,
  currentIndex,
  isActive,
  onActivate,
  onKeyPress
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    if (!isActive) {
      setShowCursor(true);
      return;
    }

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [isActive]);

  // Handle keyboard input
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for most keys
      if (e.key.length === 1 || e.key === 'Backspace') {
        e.preventDefault();
        onKeyPress(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onKeyPress]);

  // Auto-focus on mount
  useEffect(() => {
    if (containerRef.current && !isActive) {
      containerRef.current.focus();
    }
  }, []);

  const getCharacterClass = (char: Character, index: number) => {
    if (index === currentIndex && isActive) {
      return 'bg-current bg-opacity-20 relative';
    }

    switch (char.status) {
      case 'correct':
        return 'text-current opacity-60';
      case 'incorrect':
        return 'text-red-400 bg-red-400 bg-opacity-20';
      case 'missed':
        return 'text-red-400 underline';
      default:
        return 'text-current opacity-40';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <div
        ref={containerRef}
        className={`
          relative text-2xl leading-relaxed p-8 rounded-lg border-2 transition-all duration-200 
          ${isActive 
            ? 'border-current border-opacity-20' 
            : 'border-current border-opacity-10 cursor-pointer hover:border-opacity-20'
          }
          focus:outline-none font-medium
        `}
        style={{ 
          minHeight: '200px',
          color: 'var(--theme-typebox)',
          fontFamily: 'Atkinson Hyperlegible, sans-serif',
          backgroundColor: 'transparent'
        }}
        tabIndex={0}
        onClick={onActivate}
      >
        <div className="flex flex-wrap">
          {characters.map((char, index) => (
            <span
              key={index}
              className={`relative ${getCharacterClass(char, index)}`}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
              {index === currentIndex && isActive && showCursor && (
                <span
                  className="absolute inset-0 w-0.5 animate-pulse"
                  style={{
                    backgroundColor: 'var(--theme-cursor)',
                    left: '0',
                    top: '2px',
                    height: 'calc(100% - 4px)'
                  }}
                />
              )}
            </span>
          ))}
        </div>
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <div className="text-center" style={{ color: 'var(--theme-typebox)' }}>
              <MousePointer className="mx-auto mb-2 h-6 w-6" />
              <div className="font-bold text-lg">Click to focus</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
