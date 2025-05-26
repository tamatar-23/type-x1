
import { useRef, useEffect } from 'react';
import { Character } from '@/types/typing';

interface TypingAreaProps {
  text: string;
  characters: Character[];
  currentIndex: number;
  userInput: string;
  onInput: (value: string) => void;
  isFinished: boolean;
}

export function TypingArea({ text, characters, currentIndex, userInput, onInput, isFinished }: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [isFinished]);

  const getCharStyle = (char: Character, index: number) => {
    const baseStyle = "relative";
    
    switch (char.status) {
      case 'correct':
        return `${baseStyle} text-green-500`;
      case 'incorrect':
        return `${baseStyle} text-red-500 bg-red-500/20`;
      case 'missed':
        return `${baseStyle} text-muted-foreground`;
      default:
        return `${baseStyle} text-muted-foreground`;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <input
        ref={inputRef}
        type="text"
        value={userInput}
        onChange={(e) => onInput(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-default"
        disabled={isFinished}
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      />
      
      <div 
        className="font-atkinson text-2xl leading-relaxed p-8 border-2 border-border rounded-lg bg-card min-h-[200px] focus-within:border-primary transition-colors cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap">
          {characters.map((char, index) => (
            <span
              key={index}
              className={`${getCharStyle(char, index)} ${
                index === currentIndex ? 'border-l-2 border-primary animate-caret-blink' : ''
              }`}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
            </span>
          ))}
          {currentIndex === characters.length && (
            <span className="border-l-2 border-primary animate-caret-blink ml-1"></span>
          )}
        </div>
      </div>
    </div>
  );
}
