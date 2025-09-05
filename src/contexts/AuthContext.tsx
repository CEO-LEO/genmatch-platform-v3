'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  userType: 'STUDENT' | 'ELDERLY';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // Check localStorage for user data and token
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (userData && token) {
          // Verify token is still valid (simple check)
          try {
            const parsedUser = JSON.parse(userData);
            // Additional validation could be added here
            if (parsedUser && parsedUser.id && parsedUser.firstName && parsedUser.phone) {
              setUser(parsedUser);
            } else {
              // Invalid user data, clear storage
              localStorage.removeItem('user');
              localStorage.removeItem('token');
            }
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            // Clear corrupted data
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    checkAuth();
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <AuthContext.Provider value={{
        user: null,
        loading: true,
        login: async () => {},
        register: async () => {},
        logout: () => {}
      }}>
        {children}
      </AuthContext.Provider>
    );
  }

  const login = async (phone: string, password: string) => {
    try {
      setLoading(true);
      
      // Use actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
      } else {
        // Surface backend message to UI
        throw new Error(data.error || data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      
      // Mock registration - replace with actual API call
      const mockUser: User = {
        id: 'user_2',
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        userType: userData.userType,
        avatar: ''
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
