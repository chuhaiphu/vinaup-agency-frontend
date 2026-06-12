import { generateErrorMessage } from '@vinaup/utils';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: string;
}

interface AuthContextType {
  getUser: () => User | null;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser: User;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, initialUser, onLogout }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser);

  const logout = async () => {
    setUser(null);
    try {
      await onLogout();
      // Set a key in localStorage to notify other tabs about the logout event
      window.localStorage.setItem('ONLOGOUT_EVENT', Date.now().toString());
    } catch (error) {
      alert(generateErrorMessage(error, 'Logout failed'));
    }
  };

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'ONLOGOUT_EVENT') {
        setUser(null);
      }
    };
    // Listen for storage events to handle logout across multiple tabs
    // Every time anything happen in localStorage, handleStorageEvent will be called
    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  return <AuthContext value={{ getUser: () => user, logout }}>{children}</AuthContext>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
