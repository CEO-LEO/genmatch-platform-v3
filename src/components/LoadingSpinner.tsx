import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'custom';
  customColor?: string;
  text?: string;
  showText?: boolean;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  customColor,
  text = 'กำลังโหลด...',
  showText = true,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-pink-500',
    secondary: 'border-purple-500',
    white: 'border-white',
    custom: ''
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const getBorderColor = () => {
    if (color === 'custom' && customColor) {
      return customColor;
    }
    return colorClasses[color];
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner */}
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-white/20 border-t-current ${getBorderColor()}`}
        style={color === 'custom' && customColor ? { borderTopColor: customColor } : {}}
      />
      
      {/* Loading Text */}
      {showText && text && (
        <p className={`mt-3 text-white/70 ${textSizes[size]} text-center`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Variant components for common use cases
export function LoadingSpinnerFullScreen({ text = 'กำลังโหลด...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" color="primary" text={text} />
      </div>
    </div>
  );
}

export function LoadingSpinnerCard({ text = 'กำลังโหลด...' }: { text?: string }) {
  return (
    <div className="glass-card p-12 text-center">
      <LoadingSpinner size="lg" color="primary" text={text} />
    </div>
  );
}

export function LoadingSpinnerInline({ size = 'sm', color = 'primary' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; color?: 'primary' | 'secondary' | 'white' | 'custom' }) {
  return (
    <LoadingSpinner size={size} color={color} showText={false} />
  );
}

export function LoadingSpinnerButton({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <LoadingSpinner size={size} color="white" showText={false} />
  );
}

export function LoadingSpinnerPage({ text = 'กำลังโหลดหน้า...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <div className="w-12 h-12 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">GenMatch</h2>
        <LoadingSpinner size="lg" color="primary" text={text} />
      </div>
    </div>
  );
}

export function LoadingSpinnerTable({ text = 'กำลังโหลดข้อมูล...' }: { text?: string }) {
  return (
    <div className="glass-card p-8 text-center">
      <LoadingSpinner size="md" color="primary" text={text} />
    </div>
  );
}

export function LoadingSpinnerModal({ text = 'กำลังประมวลผล...' }: { text?: string }) {
  return (
    <div className="glass-card p-6 text-center">
      <LoadingSpinner size="lg" color="primary" text={text} />
    </div>
  );
}

export function LoadingSpinnerOverlay({ text = 'กำลังโหลด...', show = true }: { text?: string; show?: boolean }) {
  if (!show) return null;
  
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
      <div className="glass-card p-6 text-center">
        <LoadingSpinner size="md" color="primary" text={text} />
      </div>
    </div>
  );
}

export function LoadingSpinnerSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-white/10 rounded animate-pulse"
          style={{
            width: `${Math.random() * 40 + 60}%`
          }}
        />
      ))}
    </div>
  );
}

export function LoadingSpinnerDots({ size = 'md', color = 'primary' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; color?: 'primary' | 'secondary' | 'white' | 'custom' }) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const colorClasses = {
    primary: 'bg-pink-500',
    secondary: 'bg-purple-500',
    white: 'bg-white',
    custom: ''
  };

  const getBgColor = () => {
    if (color === 'custom') {
      return '';
    }
    return colorClasses[color];
  };

  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} ${getBgColor()} rounded-full animate-bounce`}
          style={{
            animationDelay: `${index * 0.1}s`,
            backgroundColor: color === 'custom' ? 'currentColor' : undefined
          }}
        />
      ))}
    </div>
  );
}

export function LoadingSpinnerRings({ size = 'md', color = 'primary' }: { size?: 'sm' | 'md' | 'lg' | 'xl'; color?: 'primary' | 'secondary' | 'white' | 'custom' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-pink-500',
    secondary: 'border-purple-500',
    white: 'border-white',
    custom: ''
  };

  const getBorderColor = () => {
    if (color === 'custom') {
      return '';
    }
    return colorClasses[color];
  };

  return (
    <div className={`${sizeClasses[size]} relative`}>
      <div
        className={`absolute inset-0 rounded-full border-2 border-white/20 ${getBorderColor()}`}
        style={{
          borderTopColor: color === 'custom' ? 'currentColor' : undefined
        }}
      />
      <div
        className={`absolute inset-1 rounded-full border-2 border-white/20 ${getBorderColor()}`}
        style={{
          borderTopColor: color === 'custom' ? 'currentColor' : undefined,
          animationDelay: '0.2s'
        }}
      />
      <div
        className={`absolute inset-2 rounded-full border-2 border-white/20 ${getBorderColor()} animate-spin`}
        style={{
          borderTopColor: color === 'custom' ? 'currentColor' : undefined,
          animationDelay: '0.4s'
        }}
      />
    </div>
  );
}
