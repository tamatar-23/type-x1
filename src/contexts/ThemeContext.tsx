
import { createContext, useContext, useEffect, useState } from 'react';
import { themes, Theme } from '@/config/themes';

interface ThemeContextType {
  currentTheme: string;
  themeConfig: Theme;
  setTheme: (themeName: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('typeflow-theme') || 'light';
  });

  const themeConfig = themes[currentTheme] || themes.light;

  const setTheme = (themeName: string) => {
    setCurrentTheme(themeName);
    localStorage.setItem('typeflow-theme', themeName);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-background', themeConfig.background);
    root.style.setProperty('--theme-title', themeConfig.title);
    root.style.setProperty('--theme-typebox', themeConfig.typeBoxText);
    root.style.setProperty('--theme-stats', themeConfig.stats || themeConfig.title);
  }, [themeConfig]);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeConfig, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
}
