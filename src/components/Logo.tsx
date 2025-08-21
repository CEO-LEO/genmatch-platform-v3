import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'gradient';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'white':
        return 'text-white';
      case 'gradient':
        return 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Logo Icon */}
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        {/* Background Circle with Glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20 rounded-full backdrop-blur-sm border border-white/30 shadow-lg"></div>
        
        {/* GM Letters */}
        <div className="relative z-10 font-bold text-2xl leading-none">
          <span className="text-purple-600">G</span>
          <span className="text-pink-500">M</span>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Text */}
      <div className="flex flex-col">
        <span className={`font-bold ${textSizes[size]} ${getVariantClasses()} leading-tight`}>
          Generation
        </span>
        <span className={`font-semibold ${textSizes[size]} ${getVariantClasses()} leading-tight`}>
          Matching
        </span>
      </div>
    </div>
  );
};

export default Logo;
