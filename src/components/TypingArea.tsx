
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
      if (e.key === 'Tab' && e.shiftKey === false) {
        e.preventDefault();
        window.location.reload();
      }
      
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        window.location.reload();
      }
      
      if (e.key === ' ') {
        e.preventDefault();
        // Only allow space if we're at the end of a word
        const currentChar = text[currentIndex];
        if (currentChar === ' ') {
          // We're already at a space, move to next character
          const newInput = userInput + ' ';
          onInput(newInput);
        } else {
          // Find the next space and move there
          const nextSpaceIndex = text.indexOf(' ', currentIndex);
          if (nextSpaceIndex !== -1) {
            const skippedText = text.slice(currentIndex, nextSpaceIndex);
            const newInput = userInput + skippedText + ' ';
            onInput(newInput);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, text, userInput, onInput]);

  const getCharStyle = (char: Character, index: number) => {
    let baseStyle = "relative text-2xl font-mono font-medium";
    
    if (index === currentIndex) {
      // Current character should be grey (untyped) and not blink
      return `${baseStyle} text-gray-500`;
    }
    
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

  // Split text into words for proper wrapping
  const words = text.split(' ');
  let charIndex = 0;
  const linesOfWords: string[][] = [];
  const wordsPerLine = 12;
  
  for (let i = 0; i < words.length; i += wordsPerLine) {
    linesOfWords.push(words.slice(i, i + wordsPerLine));
  }

  // Find which line contains the current position
  let currentLineIndex = 0;
  let totalChars = 0;
  
  for (let lineIndex = 0; lineIndex < linesOfWords.length; lineIndex++) {
    const lineText = linesOfWords[lineIndex].join(' ') + (lineIndex < linesOfWords.length - 1 ? ' ' : '');
    if (totalChars + lineText.length > currentIndex) {
      currentLineIndex = lineIndex;
      break;
    }
    totalChars += lineText.length;
  }

  // Show 3 lines centered around current line
  const startLine = Math.max(0, currentLineIndex);
  const visibleLines = linesOfWords.slice(startLine, startLine + 3);
  const visibleText = visibleLines.map(line => line.join(' ')).join(' ');
  
  // Calculate the start index for visible text
  let visibleStartIndex = 0;
  for (let i = 0; i < startLine; i++) {
    visibleStartIndex += linesOfWords[i].join(' ').length + (i < linesOfWords.length - 1 ? 1 : 0);
  }

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
        className="font-mono text-2xl leading-relaxed p-8 min-h-[300px] cursor-text focus-within:outline-none"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex flex-wrap overflow-hidden" style={{ height: '200px' }}>
          {visibleCharacters.map((char, index) => (
            <span
              key={index + visibleStartIndex}
              className={`${getCharStyle(char, index + visibleStartIndex)} ${
                index + visibleStartIndex === currentIndex ? 'relative' : ''
              }`}
            >
              {char.char === ' ' ? '\u00A0' : char.char}
              {index + visibleStartIndex === currentIndex && (
                <span className="absolute top-0 left-0 w-0.5 h-full bg-yellow-400 animate-pulse"></span>
              )}
            </span>
          ))}
          {adjustedCurrentIndex === visibleCharacters.length && (
            <span className="w-0.5 h-6 bg-yellow-400 animate-pulse"></span>
          )}
        </div>
      </div>
    </div>
  );
}
