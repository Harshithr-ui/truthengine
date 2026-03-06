import React from 'react';

const Navigation = () => {
  return (
    <nav className="fixed-nav">
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-3 sm:py-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 sm:gap-4 text-white">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
          <h2 className="text-base sm:text-lg md:text-xl font-black leading-tight tracking-[-0.015em] uppercase">Truth Engine</h2>
        </div>
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-9">
          <a className="text-white/90 hover:text-white transition-colors text-xs sm:text-sm font-medium leading-normal tracking-widest uppercase" href="#home">Home</a>
          <a className="text-white/90 hover:text-white transition-colors text-xs sm:text-sm font-medium leading-normal tracking-widest uppercase" href="#analyze">Analyze</a>
          <a className="text-white/90 hover:text-white transition-colors text-xs sm:text-sm font-medium leading-normal tracking-widest uppercase" href="#history">History</a>
        </nav>
      </div>
    </nav>
  );
};

export default Navigation;
