import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

export const ThemeButton = () => {
  const themeContext = useContext(ThemeContext);
  const { theme, toggleTheme } = themeContext;

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};