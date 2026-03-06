import React, { useEffect } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AnalysisSection from './components/AnalysisSection';
import HistorySection from './components/HistorySection';

function App() {
  useEffect(() => {
    // Background Effects
    const bgTop = document.createElement('div');
    bgTop.className = 'fixed inset-0 -z-30';
    bgTop.style.background = 'linear-gradient(180deg, #7aafc0 0%, #a8c8d8 35%, #d4a0a8 70%, #e8c0b8 100%)';
    document.body.prepend(bgTop);

    const bgImage = document.createElement('div');
    bgImage.className = 'fixed inset-0 -z-20 bg-cover bg-center mix-blend-overlay opacity-50';
    bgImage.style.backgroundImage = 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCKfYw9p9w_V-5uyVF6onNErWwPsdkiG46MrkuSFx_fRjJlJZ7zHdPMK49LTczEU2GMidMzGo0Td_8bncNSKZys0lj_9WA9qCDAJ8CRTeHmF0lq1XPKKTMH10asB00wP7hE4yw8TnuOmoV08MC62NQOTHC-43Vdh5tqL0t5qHjNN-QZ4hKFCFJOYA5I2ayvrU3SEAR2NF-_-Nre3tjPWZ_9liEUtdPxpvHcXUvTRKkgTDg_k7SuMalYM9SBelaqgBUkwZr-2-WUvgiZ")';
    document.body.appendChild(bgImage);

    const vignette = document.createElement('div');
    vignette.className = 'fixed inset-0 -z-10';
    vignette.style.background = 'radial-gradient(circle, transparent 60%, rgba(0,0,0,0.08) 100%)';
    vignette.style.pointerEvents = 'none';
    document.body.appendChild(vignette);

    const noise = document.createElement('div');
    noise.className = 'fixed inset-0 -z-10 opacity-30 mix-blend-overlay pointer-events-none noise-overlay';
    document.body.appendChild(noise);

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Hide scroll indicator on scroll
    const handleScroll = () => {
      const scrollIndicator = document.querySelector('.scroll-indicator');
      if (window.scrollY > 100 && scrollIndicator) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
      } else if (scrollIndicator) {
        scrollIndicator.style.opacity = '0.8';
        scrollIndicator.style.pointerEvents = 'auto';
      }

      // Parallax effect
      const parallaxElements = document.querySelectorAll('.floating');
      const scrolled = window.scrollY;
      parallaxElements.forEach((el) => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <AnalysisSection />
      <HistorySection />
    </div>
  );
}

export default App;
