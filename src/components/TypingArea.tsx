
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.key === 'Enter' || (e.key === 'Tab' && e.shiftKey === false)) {
          window.location.reload();
        }
      }
      
      if (e.key === ' ') {
        e.preventDefault();
        // Find the next space character and move cursor there
        const nextSpaceIndex = text.indexOf(' ', currentIndex);
        if (nextSpaceIndex !== -1) {
          const newInput = userInput + text.slice(currentIndex, nextSpaceIndex + 1);
          onInput(newInput);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, text, userInput, onInput]);

  const getCharStyle = (char: Character, index: number) => {
    let baseStyle = "relative text-2xl font-atkinson font-medium";
    
    switch (char.status) {
      case 'correct':
        return `${baseStyle} text-white`;
      case 'incorrect':
        return `${baseStyle} text-red-500 bg-red-500/20`;
      case 'missed':
        return `${baseStyle} text-gray-500`;
      default:
        return `${baseStyle} text-gray-500`;
    }
  };

  // Split text into lines for 3-line display
  const words = text.split(' ');
  const currentWordIndex = text.slice(0, currentIndex).split(' ').length - 1;
  const wordsPerLine = 15; // Approximate words per line
  const currentLineStart = Math.floor(currentWordIndex / wordsPerLine) * wordsPerLine;
  const visibleWords = words.slice(currentLineStart, currentLineStart + wordsPerLine * 3);
  const visibleText = visibleWords.join(' ');
  const visibleStartIndex = words.slice(0, currentLineStart).join(' ').length + (currentLineStart > 0 ? 1 : 0);
  const adjustedCurrentIndex = Math.max(0, currentIndex - visibleStartIndex);
  const visibleCharacters = characters.slice(visibleStartIndex, visibleStartIndex + visibleText.length);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
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
        className="font-atkinson text-3xl leading-relaxed p-8 min-h-[300px] cursor-text focus-within:outline-none"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap overflow-hidden" style={{ height: '200px' }}>
          {visibleCharacters.map((char, index) => (
            <span
              key={index + visibleStartIndex}
              className={`${getCharStyle(char, index)} ${
                index === adjustedCurrentIndex ? 'border-l-4 border-yellow-400 animate-caret-blink' : ''
              }`}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
            </span>
          ))}
          {adjustedCurrentIndex === visibleCharacters.length && (
            <span className="border-l-4 border-yellow-400 animate-caret-blink ml-1"></span>
          )}
        </div>
      </div>
    </div>
  );
}
