import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300">
      <div 
        className={`relative flex items-center justify-between rounded-2xl border border-white/10 transition-all duration-300 text-paper px-4 sm:px-6 ${
          isScrolled || isMobileMenuOpen
            ? 'py-2 shadow-lift bg-forest/95 backdrop-blur-xl' 
            : 'py-3 shadow-lg bg-forest/40 backdrop-blur-md'
        }`}
      >
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <img src="/Blur Colors of Shape.png" alt="gapgo Logo" className="w-7 h-7 object-contain flex-shrink-0" />
          <span className="font-display font-bold text-lg tracking-tight font-brand text-white">gapgo</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-paper/70">
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#partners" className="hover:text-white transition-colors">For partners</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons & Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#partner-form" className="hidden sm:inline-flex items-center rounded-full bg-mint text-forest text-sm font-semibold px-4 py-2 hover:opacity-90 transition-opacity">
            Become a Partner
          </a>
          
          <button 
            className="md:hidden p-1.5 text-white/80 hover:text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[calc(100%+8px)] left-0 w-full rounded-2xl bg-forest/95 backdrop-blur-xl border border-white/10 p-4 shadow-xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <a href="#how" onClick={() => setIsMobileMenuOpen(false)} className="text-paper/90 font-medium hover:text-white px-2 py-1">How it works</a>
          <a href="#partners" onClick={() => setIsMobileMenuOpen(false)} className="text-paper/90 font-medium hover:text-white px-2 py-1">For partners</a>
          <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-paper/90 font-medium hover:text-white px-2 py-1">FAQ</a>
          <div className="h-px w-full bg-white/10 my-1"></div>
          <a href="#partner-form" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center rounded-xl bg-mint text-forest text-sm font-semibold px-4 py-3">Become a Partner</a>
        </div>
      )}
    </header>
  );
}
