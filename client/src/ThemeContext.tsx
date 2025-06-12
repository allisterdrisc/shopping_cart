import { createContext, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light') ? 'dark' : 'light');
  };

  return (
    <ThemeContext value={{theme, toggleTheme}}>
      <div className={theme}>{children}</div>
    </ThemeContext>
  );
};