import { useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

interface IThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'theme';

let currentTheme: Theme = localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
const listeners = new Set<() => void>();

function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(STORAGE_KEY, theme);
}

applyTheme(currentTheme);

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return (): void => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Theme {
  return currentTheme;
}

function emitChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function resetThemeForTest(): void {
  currentTheme = 'light';
  applyTheme(currentTheme);
  emitChange();
}

export function useTheme(): IThemeStore {
  const theme = useSyncExternalStore(subscribe, getSnapshot);

  const toggleTheme = useCallback((): void => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    emitChange();
  }, []);

  return { theme, toggleTheme };
}
