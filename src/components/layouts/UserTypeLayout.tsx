'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

interface UserTypeLayoutProps {
  children: ReactNode;
  allowedUserTypes?: ('STUDENT' | 'ELDERLY')[];
  requireAuth?: boolean;
  showNavigation?: boolean;
  className?: string;
}

export default function UserTypeLayout({
  children,
  allowedUserTypes = ['STUDENT', 'ELDERLY'],
  requireAuth = true,
  showNavigation = true,
  className = ''
}: UserTypeLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        router.push('/login');
        return;
      }

      if (user && allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.userType as any)) {
        // Redirect to dashboard if user type is not allowed
        router.push('/dashboard');
        return;
      }
    }
  }, [user, loading, requireAuth, allowedUserTypes, router]);

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner.LoadingSpinnerPage />;
  }

  // Show loading spinner while redirecting
  if (requireAuth && !user) {
    return <LoadingSpinner.LoadingSpinnerPage text="กำลังเปลี่ยนเส้นทาง..." />;
  }

  // Show loading spinner if user type is not allowed
  if (user && allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.userType as any)) {
    return <LoadingSpinner.LoadingSpinnerPage text="กำลังเปลี่ยนเส้นทาง..." />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 ${className}`}>
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      {showNavigation && <Navigation />}

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* User Type Indicator (Development Only) */}
      {process.env.NODE_ENV === 'development' && user && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="glass-card p-3 text-center">
            <div className="text-xs text-white/60 mb-1">User Type</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              user.userType === 'STUDENT' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
            }`}>
              {user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Specific layout components for different user types
export function StudentLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}

export function ElderlyLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}

export function PublicLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={[]}
      requireAuth={false}
      showNavigation={false}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}

export function AuthLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={[]}
      requireAuth={true}
      showNavigation={false}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}

// Layout with custom navigation visibility
export function CustomNavigationLayout({ 
  children, 
  showNav = true, 
  className = '' 
}: { 
  children: ReactNode; 
  showNav?: boolean; 
  className?: string; 
}) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={showNav}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}

// Layout for specific pages that need different user type handling
export function TaskManagementLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      <div className="container-custom py-6">
        {children}
      </div>
    </UserTypeLayout>
  );
}

export function ProfileLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      <div className="container-custom py-6">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </UserTypeLayout>
  );
}

export function DashboardLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      <div className="container-custom py-6">
        {children}
      </div>
    </UserTypeLayout>
  );
}

export function FormLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      <div className="container-custom py-6">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>
    </UserTypeLayout>
  );
}

export function ListLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={true}
      className={className}
    >
      <div className="container-custom py-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </UserTypeLayout>
  );
}

export function ModalLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <UserTypeLayout
      allowedUserTypes={['STUDENT', 'ELDERLY']}
      requireAuth={true}
      showNavigation={false}
      className={className}
    >
      {children}
    </UserTypeLayout>
  );
}
