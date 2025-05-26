import { useState, useCallback, useEffect, useRef } from 'react';
import { TestSettings, TypingStats, Character, TestResult } from '@/types/typing';
import { generateText } from '@/utils/words';

export function useTypingTest(settings: TestSettings) {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.mode === 'time' ? settings.duration : 0);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 0,
    correct: 0,
    incorrect: 0,
    missed: 0,
    totalTime: 0,
    charCount: 0
  });
  const [wpmHistory, setWpmHistory] = useState<{ time: number; wpm: number }[]>([]);
  
  const startTime = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();
  const wpmIntervalRef = useRef<NodeJS.Timeout>();

  const initializeTest = useCallback(() => {
    const wordCount = settings.mode === 'words' ? settings.duration : 200;
    const newText = generateText(wordCount, settings.difficulty);
    setText(newText);
    setCharacters(newText.split('').map(char => ({ char, status: 'pending' })));
    setUserInput('');
    setCurrentIndex(0);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(settings.mode === 'time' ? settings.duration : 0);
    setStats({
      wpm: 0,
      accuracy: 0,
      correct: 0,
      incorrect: 0,
      missed: 0,
      totalTime: 0,
      charCount: 0
    });
    setWpmHistory([]);
  }, [settings]);

  const calculateStats = useCallback((input: string, chars: Character[], elapsedTime: number) => {
    const correct = chars.filter(c => c.status === 'correct').length;
    const incorrect = chars.filter(c => c.status === 'incorrect').length;
    const missed = chars.filter(c => c.status === 'missed').length;
    const totalChars = correct + incorrect + missed;
    
    const accuracy = totalChars > 0 ? (correct / totalChars) * 100 : 0;
    const minutes = elapsedTime / 60;
    const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
    
    return {
      wpm,
      accuracy: Math.round(accuracy),
      correct,
      incorrect,
      missed,
      totalTime: elapsedTime,
      charCount: totalChars
    };
  }, []);

  const finishTest = useCallback(() => {
    console.log('Finishing test...');
    setIsFinished(true);
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
  }, []);

  const startTest = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      startTime.current = Date.now();
      
      if (settings.mode === 'time') {
        intervalRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              finishTest();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      wpmIntervalRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime.current) / 1000;
        const currentStats = calculateStats(userInput, characters, elapsed);
        setWpmHistory(prev => [...prev, { time: elapsed, wpm: currentStats.wpm }]);
      }, 1000);
    }
  }, [isActive, settings.mode, userInput, characters, calculateStats, finishTest]);

  const handleInput = useCallback((input: string) => {
    if (isFinished) return;
    
    if (!isActive && input.length > 0) {
      startTest();
    }

    setUserInput(input);
    
    const newCharacters = [...characters];
    const inputLength = input.length;
    
    // Update character statuses - don't mark as incorrect if input is shorter
    for (let i = 0; i < newCharacters.length; i++) {
      if (i < inputLength) {
        newCharacters[i].status = input[i] === text[i] ? 'correct' : 'incorrect';
      } else {
        newCharacters[i].status = 'pending';
      }
    }
    
    setCharacters(newCharacters);
    setCurrentIndex(inputLength);
    
    // Calculate current stats
    const elapsed = isActive ? (Date.now() - startTime.current) / 1000 : 0;
    const currentStats = calculateStats(input, newCharacters, elapsed);
    setStats(currentStats);
    
    // Check if test is complete
    if (settings.mode === 'words' && inputLength >= text.length) {
      finishTest();
    }
  }, [isFinished, isActive, characters, text, settings.mode, startTest, calculateStats, finishTest]);

  const resetTest = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    initializeTest();
  }, [initializeTest]);

  const getResult = useCallback((): TestResult => {
    const result = {
      id: Date.now().toString(),
      timestamp: new Date(),
      settings,
      wpmHistory,
      ...stats
    };
    console.log('Generated result:', result);
    return result;
  }, [settings, stats, wpmHistory]);

  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (wpmIntervalRef.current) clearInterval(wpmIntervalRef.current);
    };
  }, []);

  return {
    text,
    userInput,
    characters,
    currentIndex,
    isActive,
    isFinished,
    timeLeft,
    stats,
    wpmHistory,
    handleInput,
    resetTest,
    getResult
  };
}
