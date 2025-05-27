
import { useEffect, useState } from 'react';

export function Keyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys(prev => new Set(prev).add(e.key.toLowerCase()));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key.toLowerCase());
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const keyRows = [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  const getKeyStyle = (key: string) => {
    const isPressed = pressedKeys.has(key) || pressedKeys.has(key.toLowerCase());
    return {
      backgroundColor: isPressed ? 'var(--theme-key-pressed)' : 'var(--theme-key-bg)',
      color: 'var(--theme-key-text)',
      transform: isPressed ? 'scale(0.95)' : 'scale(1)',
      transition: 'all 0.1s ease'
    };
  };

  return (
    <div 
      className="w-full max-w-4xl mx-auto mt-8 p-4 rounded-lg"
      style={{ backgroundColor: 'var(--theme-keyboard-bg)' }}
    >
      {/* First row */}
      <div className="flex gap-1 mb-2 justify-center">
        {keyRows[0].map((key) => (
          <div
            key={key}
            className="w-10 h-10 flex items-center justify-center rounded text-sm font-medium border"
            style={getKeyStyle(key)}
          >
            {key}
          </div>
        ))}
        <div
          className="w-20 h-10 flex items-center justify-center rounded text-sm font-medium border ml-1"
          style={getKeyStyle('backspace')}
        >
          ⌫
        </div>
      </div>

      {/* Second row */}
      <div className="flex gap-1 mb-2 justify-center">
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('tab')}
        >
          Tab
        </div>
        {keyRows[1].map((key) => (
          <div
            key={key}
            className="w-10 h-10 flex items-center justify-center rounded text-sm font-medium border"
            style={getKeyStyle(key)}
          >
            {key}
          </div>
        ))}
      </div>

      {/* Third row */}
      <div className="flex gap-1 mb-2 justify-center">
        <div
          className="w-20 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('capslock')}
        >
          Caps
        </div>
        {keyRows[2].map((key) => (
          <div
            key={key}
            className="w-10 h-10 flex items-center justify-center rounded text-sm font-medium border"
            style={getKeyStyle(key)}
          >
            {key}
          </div>
        ))}
        <div
          className="w-24 h-10 flex items-center justify-center rounded text-sm font-medium border ml-1"
          style={getKeyStyle('enter')}
        >
          Enter
        </div>
      </div>

      {/* Fourth row */}
      <div className="flex gap-1 mb-2 justify-center">
        <div
          className="w-24 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('shift')}
        >
          Shift
        </div>
        {keyRows[3].map((key) => (
          <div
            key={key}
            className="w-10 h-10 flex items-center justify-center rounded text-sm font-medium border"
            style={getKeyStyle(key)}
          >
            {key}
          </div>
        ))}
        <div
          className="w-28 h-10 flex items-center justify-center rounded text-sm font-medium border ml-1"
          style={getKeyStyle('shift')}
        >
          Shift
        </div>
      </div>

      {/* Space bar row */}
      <div className="flex gap-1 justify-center">
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('control')}
        >
          Ctrl
        </div>
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('meta')}
        >
          ⌘
        </div>
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('alt')}
        >
          Alt
        </div>
        <div
          className="flex-1 max-w-80 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle(' ')}
        >
        </div>
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('alt')}
        >
          Alt
        </div>
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('meta')}
        >
          ⌘
        </div>
        <div
          className="w-16 h-10 flex items-center justify-center rounded text-sm font-medium border"
          style={getKeyStyle('control')}
        >
          Ctrl
        </div>
      </div>
    </div>
  );
}
