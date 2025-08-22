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
          <span className="text-xl md:text-2xl font-bold text-black font-serif drop-shadow-sm leading-none">
            G
          </span>
          {/* G curl effect - smaller */}
          <div className="absolute bottom-0 right-0 w-1 h-1 bg-black rounded-full transform translate-x-0.5 translate-y-0.5 opacity-80"></div>
        </div>
        
        {/* Letter M - positioned closer */}
        <div className="relative -ml-1 transform translate-y-0.5">
          <span className="text-xl md:text-2xl font-bold text-black font-serif drop-shadow-sm leading-none">
            M
          </span>
        </div>
      </div>
      
      {/* Generation Matching Text - smaller */}
      <div className="mt-0.5 text-center">
        <div className="text-[9px] md:text-[10px] font-medium text-black italic leading-tight tracking-wide">
          Generation
        </div>
        <div className="text-[9px] md:text-[10px] font-medium text-black italic leading-tight tracking-wide">
          Matching
        </div>
      </div>
    </div>
  );
};

export default LogoIcon;
