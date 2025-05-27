
export interface Theme {
  label: string;
  background: string;
  title: string;
  typeBoxText: string;
  stats: string;
  isDark?: boolean;
}

export const themes: Record<string, Theme> = {
  light: {
    label: 'Light',
    background: '#FFFFFF',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    isDark: false
  },
  lightGray: {
    label: 'Light Gray',
    background: '#D4D4D4',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    isDark: false
  },
  mediumGray: {
    label: 'Medium Gray',
    background: '#B3B3B3',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    isDark: false
  },
  dark: {
    label: 'Dark',
    background: '#2B2B2B',
    title: '#FFFFFF',
    typeBoxText: '#D4D4D4',
    stats: '#FFFFFF',
    isDark: true
  },
  darkGray: {
    label: 'Dark Gray',
    background: '#1A1A1A',
    title: '#FFFFFF',
    typeBoxText: '#D4D4D4',
    stats: '#FFFFFF',
    isDark: true
  },
  vantaBlack: {
    label: 'Vanta Black',
    background: '#0A0A0A',
    title: '#FFFFFF',
    typeBoxText: '#B3B3B3',
    stats: '#FFFFFF',
    isDark: true
  }
};

export const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.label
}));
