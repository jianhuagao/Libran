import ThemeContext from '@/context/themeContext';
import { useContext } from 'react';

export function useTheme() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('useContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme, setTheme } = themeContext;

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    setTheme
  };
}
