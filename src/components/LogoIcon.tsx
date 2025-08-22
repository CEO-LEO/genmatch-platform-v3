import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Main GM Letters */}
      <div className="relative flex items-center justify-center">
        {/* Letter G */}
        <div className="relative">
          <span className="text-3xl md:text-4xl font-bold text-black font-serif drop-shadow-md leading-none">
            G
          </span>
          {/* G curl effect - more prominent */}
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-black rounded-full transform translate-x-1 translate-y-1 opacity-80"></div>
        </div>
        
        {/* Letter M - positioned to overlap G slightly */}
        <div className="relative -ml-2 transform translate-y-1">
          <span className="text-3xl md:text-4xl font-bold text-black font-serif drop-shadow-md leading-none">
            M
          </span>
        </div>
      </div>
      
      {/* Generation Matching Text - better typography */}
      <div className="mt-1 text-center">
        <div className="text-[11px] md:text-xs font-medium text-black italic leading-tight tracking-wide">
          Generation
        </div>
        <div className="text-[11px] md:text-xs font-medium text-black italic leading-tight tracking-wide">
          Matching
        </div>
      </div>
    </div>
  );
};

export default LogoIcon;
