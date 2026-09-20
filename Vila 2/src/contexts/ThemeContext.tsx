import React, { createContext, useContext, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'vila-theme';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  setIsDark: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getInitialTheme(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark') return true;
  // Primeiro acesso (sem preferência guardada): arranca sempre em modo claro,
  // independentemente da preferência do sistema operativo/navegador.
  return false;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return ctx;
}
