import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Main GM Letters */}
      <div className="relative flex items-center">
        {/* Letter G */}
        <div className="relative">
          <span className="text-4xl font-bold text-black font-serif drop-shadow-sm">
            G
          </span>
          {/* G curl effect */}
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-black rounded-full transform translate-x-1 translate-y-1"></div>
        </div>
        
        {/* Letter M */}
        <div className="relative -ml-2">
          <span className="text-4xl font-bold text-black font-serif drop-shadow-sm">
            M
          </span>
        </div>
      </div>
      
      {/* Generation Matching Text */}
      <div className="mt-1 text-xs text-black font-medium italic leading-tight">
        <div>Generation</div>
        <div>Matching</div>
      </div>
    </div>
  );
};

export default LogoIcon;
