
export interface Theme {
  label: string;
  background: string;
  title: string;
  typeBoxText: string;
  stats?: string;
}

export const themes: Record<string, Theme> = {
  superUser: {
    label: 'Super User',
    background: '#262A33',
    title: '#3FFA5',
    typeBoxText: '#526777'
  },
  darkMagic: {
    label: 'Dark Magic',
    background: '#091F2C',
    title: '#A20688',
    typeBoxText: '#91E401'
  },
  bento: {
    label: 'Bento',
    background: '#2D390D',
    title: '#FF7A90',
    typeBoxText: '#4A7680',
    stats: '#FF7A90'
  },
  futureFunk: {
    label: 'Future Funk',
    background: '#2E1A47',
    title: '#fff',
    typeBoxText: '#C18FFF',
    stats: '#fff'
  },
  aether: {
    label: 'Aether',
    background: '#101820',
    title: '#EEDAEA',
    typeBoxText: '#CF68D0',
    stats: '#EEDAEA'
  },
  serika: {
    label: 'Serika',
    background: '#323437',
    title: '#E2B714',
    typeBoxText: '#D1D0C5'
  },
  matrix: {
    label: 'Matrix',
    background: '#0D1117',
    title: '#00FF41',
    typeBoxText: '#008F11'
  },
  retrowave: {
    label: 'Retrowave',
    background: '#1A0B2E',
    title: '#FF6B9D',
    typeBoxText: '#16213E'
  },
  ocean: {
    label: 'Ocean',
    background: '#0F3460',
    title: '#16537E',
    typeBoxText: '#E8F4FD'
  },
  volcano: {
    label: 'Volcano',
    background: '#2C0703',
    title: '#FF4500',
    typeBoxText: '#FF8C00'
  }
};

export const themeOptions = Object.entries(themes).map(([value, theme]) => ({
  value,
  label: theme.label
}));
