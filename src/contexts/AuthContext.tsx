'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'STUDENT' | 'ELDERLY';
  studentId?: string;
  university?: string;
  address: string;
  avatar?: string;
  rating?: number;
  totalHours?: number;
  completedTasks?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'STUDENT' | 'ELDERLY';
  studentId?: string;
  university?: string;
  address: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  refreshUser: () => Promise<void>;
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

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check for stored token
      const token = localStorage.getItem('genmatch_token');
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await fetch('/api/auth/check-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('genmatch_token');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('genmatch_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { user: userData, token } = await response.json();
        
        // Store token
        localStorage.setItem('genmatch_token', token);
        
        // Set user
        setUser(userData);
        
        return true;
      } else {
        const error = await response.json();
        console.error('Login failed:', error.message);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { user: userData, token } = await response.json();
        
        // Store token
        localStorage.setItem('genmatch_token', token);
        
        // Set user
        setUser(userData);
        
        return true;
      } else {
        const error = await response.json();
        console.error('Registration failed:', error.message);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Call logout API if needed
      const token = localStorage.getItem('genmatch_token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local state
      localStorage.removeItem('genmatch_token');
      setUser(null);
    }
  };

  const updateUser = async (data: Partial<User>): Promise<void> => {
    try {
      const token = localStorage.getItem('genmatch_token');
      if (!token) throw new Error('No token found');

      const response = await fetch('/api/auth/update-user', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('genmatch_token');
      if (!token) return;

      const response = await fetch('/api/auth/check-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  // Mock data for development (remove in production)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !user && !loading) {
      // Auto-login with mock user for development
      const mockUser: User = {
        id: '1',
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        phone: '0812345678',
        userType: 'STUDENT',
        studentId: '6400000001',
        university: 'มหาวิทยาลัยมหิดล',
        address: 'กรุงเทพมหานคร',
        avatar: '',
        rating: 4.8,
        totalHours: 25,
        completedTasks: 8,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      };
      
      // Simulate API delay
      setTimeout(() => {
        setUser(mockUser);
        localStorage.setItem('genmatch_token', 'mock_token_123');
      }, 1000);
    }
  }, [user, loading]);

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for checking if user is authenticated
export function useIsAuthenticated(): boolean {
  const { user } = useAuth();
  return !!user;
}

// Hook for checking user type
export function useUserType(): 'STUDENT' | 'ELDERLY' | null {
  const { user } = useAuth();
  return user?.userType || null;
}

// Hook for checking if user is student
export function useIsStudent(): boolean {
  const { user } = useAuth();
  return user?.userType === 'STUDENT';
}

// Hook for checking if user is elderly
export function useIsElderly(): boolean {
  const { user } = useAuth();
  return user?.userType === 'ELDERLY';
}

// Hook for getting user permissions
export function useUserPermissions() {
  const { user } = useAuth();
  
  if (!user) return { canCreateTask: false, canAcceptTask: false, canEditProfile: false };
  
  return {
    canCreateTask: user.userType === 'ELDERLY',
    canAcceptTask: user.userType === 'STUDENT',
    canEditProfile: true,
    canViewStatistics: true,
    canViewAchievements: true,
  };
}

// Hook for getting user stats
export function useUserStats() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return {
    totalHours: user.totalHours || 0,
    completedTasks: user.completedTasks || 0,
    rating: user.rating || 0,
    memberSince: new Date(user.createdAt).getFullYear(),
  };
}
