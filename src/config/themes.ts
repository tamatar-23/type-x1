
export interface Theme {
  label: string;
  background: string;
  title: string;
  typeBoxText: string;
  stats?: string;
}

export const themes: Record<string, Theme> = {
  light: {
    label: 'Light',
    background: '#FFFFFF',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B'
  },
  lightGray: {
    label: 'Light Gray',
    background: '#D4D4D4',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B'
  },
  mediumGray: {
    label: 'Medium Gray',
    background: '#B3B3B3',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B'
  },
  dark: {
    label: 'Dark',
    background: '#2B2B2B',
    title: '#FFFFFF',
    typeBoxText: '#D4D4D4'
  }
};

export const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.label
}));
