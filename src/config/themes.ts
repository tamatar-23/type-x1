
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
  vantaBlack: {
    label: 'Vanta Black',
    background: '#2B2B2B',
    title: '#FFFFFF',
    typeBoxText: '#D4D4D4',
    stats: '#FFFFFF',
    keyboardBackground: 'transparent',
    keyBackground: '#404040',
    keyText: '#FFFFFF',
    keyPressed: '#606060',
    isDark: true
  },
  lightGray: {
    label: 'Light Gray',
    background: '#FFFFFF',
    title: '#2B2B2B',
    typeBoxText: '#2B2B2B',
    stats: '#2B2B2B',
    keyboardBackground: 'transparent',
    keyBackground: '#E5E5E5',
    keyText: '#2B2B2B',
    keyPressed: '#B8B8B8',
    isDark: false
  },
  lightBlue: {
    label: 'Light Blue',
    background: '#E3F2FD',
    title: '#1565C0',
    typeBoxText: '#1976D2',
    stats: '#1565C0',
    keyboardBackground: 'transparent',
    keyBackground: '#BBDEFB',
    keyText: '#1565C0',
    keyPressed: '#90CAF9',
    isDark: false
  },
  lightPink: {
    label: 'Light Pink',
    background: '#FCE4EC',
    title: '#AD1457',
    typeBoxText: '#C2185B',
    stats: '#AD1457',
    keyboardBackground: 'transparent',
    keyBackground: '#F8BBD9',
    keyText: '#AD1457',
    keyPressed: '#F48FB1',
    isDark: false
  },
  forestGreen: {
    label: 'Forest Green',
    background: '#E8F5E8',
    title: '#2E7D32',
    typeBoxText: '#388E3C',
    stats: '#2E7D32',
    keyboardBackground: 'transparent',
    keyBackground: '#C8E6C9',
    keyText: '#2E7D32',
    keyPressed: '#A5D6A7',
    isDark: false
  },
  oceanDark: {
    label: 'Ocean Dark',
    background: '#0F172A',
    title: '#38BDF8',
    typeBoxText: '#CBD5E1',
    stats: '#38BDF8',
    keyboardBackground: 'transparent',
    keyBackground: '#1E293B',
    keyText: '#94A3B8',
    keyPressed: '#475569',
    isDark: true
  },
  purpleHaze: {
    label: 'Purple Haze',
    background: '#1A0B2E',
    title: '#A855F7',
    typeBoxText: '#C4B5FD',
    stats: '#A855F7',
    keyboardBackground: 'transparent',
    keyBackground: '#2D1B69',
    keyText: '#DDD6FE',
    keyPressed: '#4C1D95',
    isDark: true
  },
  sunsetOrange: {
    label: 'Sunset Orange',
    background: '#FFF7ED',
    title: '#EA580C',
    typeBoxText: '#FB923C',
    stats: '#EA580C',
    keyboardBackground: 'transparent',
    keyBackground: '#FED7AA',
    keyText: '#EA580C',
    keyPressed: '#FDC893',
    isDark: false
  },
  mintFresh: {
    label: 'Mint Fresh',
    background: '#F0FDF4',
    title: '#059669',
    typeBoxText: '#10B981',
    stats: '#059669',
    keyboardBackground: 'transparent',
    keyBackground: '#BBF7D0',
    keyText: '#059669',
    keyPressed: '#A7F3D0',
    isDark: false
  },
  cyberpunkNeon: {
    label: 'Cyberpunk Neon',
    background: '#0C0C0C',
    title: '#00FF9F',
    typeBoxText: '#00FFFF',
    stats: '#00FF9F',
    keyboardBackground: 'transparent',
    keyBackground: '#1A1A1A',
    keyText: '#00FFFF',
    keyPressed: '#333333',
    isDark: true
  },
  rosePetals: {
    label: 'Rose Petals',
    background: '#FFF1F2',
    title: '#E11D48',
    typeBoxText: '#F43F5E',
    stats: '#E11D48',
    keyboardBackground: 'transparent',
    keyBackground: '#FECDD3',
    keyText: '#E11D48',
    keyPressed: '#FDA4AF',
    isDark: false
  },
  twilightPurple: {
    label: 'Twilight Purple',
    background: '#1E1B4B',
    title: '#C084FC',
    typeBoxText: '#DDD6FE',
    stats: '#C084FC',
    keyboardBackground: 'transparent',
    keyBackground: '#312E81',
    keyText: '#DDD6FE',
    keyPressed: '#4338CA',
    isDark: true
  }
};

export const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.label
}));
