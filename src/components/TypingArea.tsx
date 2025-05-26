
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Character } from '@/types/typing';

interface TypingAreaProps {
  text: string;
  characters: Character[];
  currentIndex: number;
  userInput: string;
  onInput: (value: string) => void;
  onSpaceSkip: (currentIndex: number) => void;
  isFinished: boolean;
}

export function TypingArea({ 
  text, 
  characters, 
  currentIndex, 
  userInput, 
  onInput, 
  onSpaceSkip,
  isFinished 
}: TypingAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [isFinished]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        window.location.reload();
      }
      
      if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        window.location.reload();
      }
      
      if (e.key === ' ') {
        e.preventDefault();
        
        // Check if we're in the middle of a word
        const currentChar = text[currentIndex];
        if (currentChar === ' ') {
          // We're at a space, just add it normally
          const newInput = userInput + ' ';
          onInput(newInput);
        } else {
          // We're in the middle of a word, skip to end and mark as incorrect
          onSpaceSkip(currentIndex);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, text, userInput, onInput, onSpaceSkip]);

  const getCharStyle = (char: Character, index: number) => {
    let baseStyle = "relative text-2xl font-mono font-medium";
    
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

  // Split text into words and organize into lines
  const words = text.split(' ');
  const wordsPerLine = 12;
  const lines: string[][] = [];
  
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine));
  }

  // Find which line contains the current position
  let charCount = 0;
  let targetLineIndex = 0;
  
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const lineText = lines[lineIndex].join(' ') + (lineIndex < lines.length - 1 ? ' ' : '');
    if (charCount + lineText.length > currentIndex) {
      targetLineIndex = lineIndex;
      break;
    }
    charCount += lineText.length;
  }

  // Update current line index for smooth transitions
  useEffect(() => {
    if (targetLineIndex !== currentLineIndex) {
      setCurrentLineIndex(targetLineIndex);
    }
  }, [targetLineIndex, currentLineIndex]);

  // Show 3 lines at a time
  const visibleLines = lines.slice(currentLineIndex, currentLineIndex + 3);
  
  // Calculate visible text and character indices
  let visibleStartIndex = 0;
  for (let i = 0; i < currentLineIndex; i++) {
    const lineText = lines[i].join(' ') + (i < lines.length - 1 ? ' ' : '');
    visibleStartIndex += lineText.length;
  }

  const visibleText = visibleLines.map(line => line.join(' ')).join(' ');
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
        className="font-mono text-2xl leading-relaxed p-8 min-h-[200px] cursor-text focus-within:outline-none"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
            style={{ height: '150px' }}
          >
            {visibleLines.map((line, lineIdx) => (
              <div key={currentLineIndex + lineIdx} className="flex flex-wrap mb-2">
                {line.map((word, wordIdx) => {
                  // Calculate start index for this word
                  let wordStartIndex = visibleStartIndex;
                  for (let i = 0; i < lineIdx; i++) {
                    wordStartIndex += visibleLines[i].join(' ').length + 1;
                  }
                  for (let i = 0; i < wordIdx; i++) {
                    wordStartIndex += line[i].length + 1;
                  }
                  
                  return (
                    <span key={`${lineIdx}-${wordIdx}`} className="mr-4">
                      {word.split('').map((char, charIdx) => {
                        const globalIndex = wordStartIndex + charIdx;
                        const character = visibleCharacters[globalIndex - visibleStartIndex];
                        if (!character) return null;
                        
                        return (
                          <span
                            key={globalIndex}
                            className={`${getCharStyle(character, globalIndex)} ${
                              globalIndex === currentIndex ? 'relative' : ''
                            }`}
                          >
                            {char}
                            {globalIndex === currentIndex && (
                              <span className="absolute top-0 left-0 w-0.5 h-6 bg-yellow-400 animate-pulse"></span>
                            )}
                          </span>
                        );
                      })}
                      {/* Add space character */}
                      {wordIdx < line.length - 1 || lineIdx < visibleLines.length - 1 ? (
                        <span
                          className={`${getCharStyle(
                            visibleCharacters[wordStartIndex + word.length - visibleStartIndex] || { char: ' ', status: 'pending' },
                            wordStartIndex + word.length
                          )} ${
                            wordStartIndex + word.length === currentIndex ? 'relative' : ''
                          }`}
                        >
                          {'\u00A0'}
                          {wordStartIndex + word.length === currentIndex && (
                            <span className="absolute top-0 left-0 w-0.5 h-6 bg-yellow-400 animate-pulse"></span>
                          )}
                        </span>
                      ) : null}
                    </span>
                  );
                })}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
