import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', light = true }) => {
  return (
    <a
      href="#home"
      className={`inline-flex flex-col items-center select-none group cursor-pointer transition-opacity hover:opacity-90 ${className}`}
    >
      <span
        className={`font-serif tracking-[0.26em] text-lg sm:text-xl font-normal uppercase leading-tight ${
          light ? 'text-white' : 'text-stone-900'
        }`}
      >
        HORIZON
      </span>
      <div className="flex items-center gap-2 w-full mt-0.5">
        <span
          className={`h-[1px] flex-1 ${
            light ? 'bg-white/40' : 'bg-stone-300'
          }`}
        />
        <span
          className={`font-sans text-[8.5px] sm:text-[9.5px] tracking-[0.34em] uppercase font-light pl-[0.17em] ${
            light ? 'text-white/80' : 'text-stone-500'
          }`}
        >
          ESTATE
        </span>
        <span
          className={`h-[1px] flex-1 ${
            light ? 'bg-white/40' : 'bg-stone-300'
          }`}
        />
      </div>
    </a>
  );
};
