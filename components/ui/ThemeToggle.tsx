
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SunIcon, MoonIcon } from '../icons/Icons';
import Button from './Button';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={toggleTheme} variant="secondary" size="sm" className="p-2 rounded-full">
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
