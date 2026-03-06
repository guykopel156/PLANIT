import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

import type { User } from '../types/user';

const LOCAL_STORAGE_USER_KEY = 'planit_user';
const LOCAL_STORAGE_TOKEN_KEY = 'planit_access_token';

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

function isUser(value: unknown): value is User {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate._id === 'string' &&
    typeof candidate.name === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.createdAt === 'string' &&
    typeof candidate.updatedAt === 'string'
  );
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function hydrateAuthState(): AuthState {
  const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  const storedToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (storedUser && storedToken) {
    const parsed: unknown = JSON.parse(storedUser);

    if (isUser(parsed)) {
      return {
        user: parsed,
        accessToken: storedToken,
      };
    }
  }

  return { user: null, accessToken: null };
}

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [authState, setAuthState] = useState<AuthState>(hydrateAuthState);

  useEffect(() => {
    if (authState.user && authState.accessToken) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(authState.user));
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, authState.accessToken);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }
  }, [authState]);

  const login = useCallback((user: User, token: string): void => {
    setAuthState({ user, accessToken: token });
  }, []);

  const logout = useCallback((): void => {
    setAuthState({ user: null, accessToken: null });
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user: authState.user,
    accessToken: authState.accessToken,
    isAuthenticated: authState.user !== null && authState.accessToken !== null,
    login,
    logout,
  }), [authState, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
