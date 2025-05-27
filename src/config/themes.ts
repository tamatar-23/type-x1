
export interface Theme {
  label: string;
  background: string;
  title: string;
  typeBoxText: string;
  stats: string;
  keyboardBackground: string;
  keyBackground: string;
  keyText: string;
  keyPressed: string;
  isDark?: boolean;
}

export const themes: Record<string, Theme> = {
  lightGray: {
    label: 'Light Gray',
    background: '#D4D4D4',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    keyboardBackground: '#B3B3B3',
    keyBackground: '#FFFFFF',
    keyText: '#2B2B2B',
    keyPressed: '#A0A0A0',
    isDark: false
  },
  mediumGray: {
    label: 'Medium Gray',
    background: '#B3B3B3',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    keyboardBackground: '#9A9A9A',
    keyBackground: '#D4D4D4',
    keyText: '#2B2B2B',
    keyPressed: '#808080',
    isDark: false
  },
  white: {
    label: 'White',
    background: '#FFFFFF',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    keyboardBackground: '#F0F0F0',
    keyBackground: '#E0E0E0',
    keyText: '#2B2B2B',
    keyPressed: '#C0C0C0',
    isDark: false
  },
  dark: {
    label: 'Dark',
    background: '#2B2B2B',
    title: '#FFFFFF',
    typeBoxText: '#D4D4D4',
    stats: '#FFFFFF',
    keyboardBackground: '#1A1A1A',
    keyBackground: '#404040',
    keyText: '#FFFFFF',
    keyPressed: '#606060',
    isDark: true
  }
};

export const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.label
}));
