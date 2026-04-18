import { useState, useEffect } from 'react';

/**
 * Navbar – Sticky top navigation with scroll-aware background.
 * Links smooth-scroll to each section.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#team', label: 'Team' },
    { href: '#register', label: 'Register' },
  ];

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5EBDD]/95 backdrop-blur-sm shadow-md shadow-[#D4C4A8]/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="font-serif text-xl font-bold text-[#2C2415] tracking-tight hover:text-[#9B7FD4] transition-colors"
        >
          AI Playbook ✦
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-sans text-sm font-medium text-[#5A4A38] hover:text-[#9B7FD4] transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#register')}
            className="btn-hover bg-[#E8614D] text-white font-sans text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-[#E8614D]/30"
          >
            Join Now →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#2C2415] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="5" y1="5" x2="21" y2="21"/>
                <line x1="21" y1="5" x2="5" y2="21"/>
              </>
            ) : (
              <>
                <line x1="3" y1="8" x2="23" y2="8"/>
                <line x1="3" y1="14" x2="23" y2="14"/>
                <line x1="3" y1="20" x2="23" y2="20"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#F5EBDD]/98 backdrop-blur-sm border-t border-[#E5D8C5] px-6 py-4 flex flex-col gap-4 fade-down">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="font-sans text-base font-medium text-[#5A4A38] text-left hover:text-[#9B7FD4] transition-colors"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#register')}
            className="btn-hover bg-[#E8614D] text-white font-sans text-sm font-semibold px-5 py-2 rounded-full w-fit shadow-md"
          >
            Join Now →
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
