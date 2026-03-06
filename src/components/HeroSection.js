import React from 'react';

const HeroSection = () => {
  return (
    <section id="home" className="relative flex h-screen w-full flex-col">
      <main className="flex-1 flex items-center px-10 lg:px-20 relative pt-20">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10 drop-shadow-2xl">
          <img 
            alt="white-suited astronaut floating" 
            className="max-h-[85vh] opacity-90 object-contain floating" 
            data-alt="white-suited astronaut floating in cinematic sky" 
            src="/0cc54d61-2171-4b18-982a-6f90f37144ca.png"
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center z-10">
          <div className="md:w-1/2 flex flex-col gap-4 animate-fade-in-up">
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter lowercase drop-shadow-xl">
              a truth<br/>engine
            </h1>
          </div>
          <div className="md:w-1/3 flex flex-col gap-6 mt-10 md:mt-0 drop-shadow-lg slide-in-right" style={{animationDelay: '0.3s'}}>
            <p className="text-white text-lg md:text-xl font-medium leading-relaxed drop-shadow-md">
              Navigate the noise. Find what's real. Submit any headline and our engine cuts through the fog.
            </p>
            <div className="flex gap-4">
              <input 
                className="flex-1 bg-white/20 border border-white/40 text-white placeholder-white/80 rounded-full px-6 py-3 focus:outline-none focus:border-white focus:ring-1 focus:ring-white backdrop-blur-md shadow-lg transition-all" 
                placeholder="Enter a headline..." 
                type="text"
              />
              <button className="flex shrink-0 cursor-pointer items-center justify-center rounded-full h-12 w-12 bg-white text-slate-800 hover:bg-white/90 transition-all hover:scale-110 shadow-lg">
                <span className="material-symbols-outlined">search</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <a href="#analyze" className="scroll-indicator">
        <span className="material-symbols-outlined text-white text-5xl drop-shadow">keyboard_arrow_down</span>
      </a>
    </section>
  );
};

export default HeroSection;
