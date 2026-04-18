import { useState, useEffect, useRef, useMemo } from 'react';
import './index.css';

/* ================================================================
   ROBOT CURSOR — lerp-easing cute robot that follows the mouse
   ================================================================ */
const RobotCursor = () => {
  const robotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
      if (robotRef.current) {
        robotRef.current.style.left = `${pos.current.x}px`;
        robotRef.current.style.top = `${pos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <div ref={robotRef} className="robot-cursor robot-bounce"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <line x1="26" y1="6" x2="26" y2="12" stroke="#9B7FD4" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="26" cy="5" r="3" fill="#C4AEFF"/>
        <rect x="12" y="12" width="28" height="22" rx="9" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="2"/>
        <circle cx="20" cy="22" r="4" fill="#9B7FD4"/>
        <circle cx="32" cy="22" r="4" fill="#9B7FD4"/>
        <circle cx="21.5" cy="21" r="1.5" fill="white"/>
        <circle cx="33.5" cy="21" r="1.5" fill="white"/>
        <path d="M20 28 Q26 32 32 28" stroke="#9B7FD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <rect x="17" y="34" width="18" height="12" rx="5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="2"/>
        <circle cx="26" cy="40" r="2.5" fill="#C4AEFF"/>
        <rect x="7" y="35" width="9" height="5" rx="2.5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="1.5"/>
        <rect x="36" y="35" width="9" height="5" rx="2.5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="1.5"/>
      </svg>
    </div>
  );
};

/* ================================================================
   STAR PARTICLES — twinkling dots in background
   ================================================================ */
const StarParticles = () => {
  const particles = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
      color: i % 3 === 0 ? '#9B7FD4' : i % 3 === 1 ? '#E8614D' : '#D4C4A8',
    })), []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} style={{
          position: 'absolute', left: p.left, top: p.top,
          width: p.size, height: p.size, borderRadius: '50%',
          backgroundColor: p.color, opacity: 0.2,
          animation: `twinkle ${p.duration} ease-in-out infinite ${p.delay}`,
        }}/>
      ))}
    </div>
  );
};

/* ================================================================
   LOADING SCREEN — branded progress bar
   ================================================================ */
const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 300); return 100; }
        return p + 2;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center paper-texture">
      <div className="robot-bounce mb-6">
        <svg width="72" height="72" viewBox="0 0 52 52" fill="none">
          <line x1="26" y1="6" x2="26" y2="12" stroke="#9B7FD4" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="26" cy="5" r="3" fill="#C4AEFF"/>
          <rect x="12" y="12" width="28" height="22" rx="9" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="2"/>
          <circle cx="20" cy="22" r="4" fill="#9B7FD4"/>
          <circle cx="32" cy="22" r="4" fill="#9B7FD4"/>
          <circle cx="21.5" cy="21" r="1.5" fill="white"/>
          <circle cx="33.5" cy="21" r="1.5" fill="white"/>
          <path d="M20 28 Q26 32 32 28" stroke="#9B7FD4" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <rect x="17" y="34" width="18" height="12" rx="5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="2"/>
          <circle cx="26" cy="40" r="2.5" fill="#C4AEFF"/>
          <rect x="7" y="35" width="9" height="5" rx="2.5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="1.5"/>
          <rect x="36" y="35" width="9" height="5" rx="2.5" fill="#EFE6D8" stroke="#9B7FD4" strokeWidth="1.5"/>
        </svg>
      </div>
      <h1 className="font-serif text-4xl font-bold text-[#2C2415] mb-2 tracking-tight">AI Playbook</h1>
      <p className="font-sans text-[#7A6B5A] text-sm mb-10">Warming up the workshop...</p>
      <div className="w-64 h-2 bg-[#E5D8C5] rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-[#9B7FD4] transition-all duration-100" style={{ width: `${progress}%` }}/>
      </div>
      <p className="text-xs text-[#B0A090] mt-3">{progress}%</p>
    </div>
  );
};

/* ================================================================
   NAVBAR — sticky, scroll-aware, mobile hamburger
   ================================================================ */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollTo = (id) => { document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const navLinks = [{ href: '#hero', label: 'Home' }, { href: '#team', label: 'Team' }, { href: '#register', label: 'Register' }];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#F5EBDD]/95 backdrop-blur-sm shadow-md shadow-[#D4C4A8]/40' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo('#hero')} className="font-serif text-xl font-bold text-[#2C2415] tracking-tight hover:text-[#9B7FD4] transition-colors">
          AI Playbook ✦
        </button>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-sans text-sm font-medium text-[#5A4A38] hover:text-[#9B7FD4] transition-colors">{l.label}</button>
          ))}
          <button onClick={() => scrollTo('#register')} className="btn-hover bg-[#E8614D] text-white font-sans text-sm font-semibold px-5 py-2 rounded-full shadow-md shadow-[#E8614D]/30">
            Join Now →
          </button>
        </div>
        <button className="md:hidden text-[#2C2415]" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            {menuOpen
              ? <><line x1="5" y1="5" x2="21" y2="21"/><line x1="21" y1="5" x2="5" y2="21"/></>
              : <><line x1="3" y1="8" x2="23" y2="8"/><line x1="3" y1="14" x2="23" y2="14"/><line x1="3" y1="20" x2="23" y2="20"/></>}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#F5EBDD]/98 backdrop-blur-sm border-t border-[#E5D8C5] px-6 py-4 flex flex-col gap-4 fade-down">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="font-sans text-base font-medium text-[#5A4A38] text-left hover:text-[#9B7FD4] transition-colors">{l.label}</button>
          ))}
          <button onClick={() => scrollTo('#register')} className="btn-hover bg-[#E8614D] text-white font-sans text-sm font-semibold px-5 py-2 rounded-full w-fit shadow-md">Join Now →</button>
        </div>
      )}
    </nav>
  );
};

/* ================================================================
   HERO SECTION — full screen + floating hand-drawn crowd SVGs
   ================================================================ */
const PersonLaptop = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="18" y1="50" x2="8" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="42" y1="50" x2="52" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="10" y="58" width="40" height="24" rx="3" fill="none" stroke="white" strokeWidth="2"/>
    <rect x="13" y="61" width="34" height="16" rx="2" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="22" cy="69" r="2" fill="white" opacity="0.6"/>
    <circle cx="30" cy="69" r="2" fill="white" opacity="0.6"/>
    <circle cx="38" cy="69" r="2" fill="white" opacity="0.6"/>
    <path d="M24 22 Q30 27 36 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="25" cy="16" r="2" fill="white"/><circle cx="35" cy="16" r="2" fill="white"/>
  </g>
);
const PersonThinking = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke="white" strokeWidth="2.5"/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 48 Q10 42 14 36" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="14" cy="34" r="2.5" fill="white" opacity="0.7"/>
    <circle cx="10" cy="28" r="2" fill="white" opacity="0.5"/>
    <circle cx="8" cy="22" r="1.5" fill="white" opacity="0.3"/>
    <line x1="42" y1="50" x2="48" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="25" cy="17" r="2" fill="white"/><circle cx="35" cy="17" r="2" fill="white"/>
    <path d="M25 24 Q30 22 35 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </g>
);
const PersonSmiling = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke="white" strokeWidth="2.5"/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 46 Q8 36 6 28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M42 46 Q52 36 54 28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M22 22 Q30 30 38 22" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="25" cy="15" r="2.5" fill="white"/><circle cx="35" cy="15" r="2.5" fill="white"/>
    <circle cx="22" cy="22" r="3" fill="white" opacity="0.3"/><circle cx="38" cy="22" r="3" fill="white" opacity="0.3"/>
  </g>
);
const PersonPhone = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke="white" strokeWidth="2.5"/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 46 Q12 38 14 28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="8" y="18" width="10" height="16" rx="2" fill="none" stroke="white" strokeWidth="2"/>
    <circle cx="13" cy="31" r="1" fill="white"/>
    <line x1="42" y1="50" x2="46" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="25" cy="16" r="2" fill="white"/><circle cx="35" cy="16" r="2" fill="white"/>
    <path d="M24 23 Q30 27 36 23" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </g>
);
const PersonNote = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke="white" strokeWidth="2.5"/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="32" y="44" width="18" height="22" rx="2" fill="none" stroke="white" strokeWidth="2"/>
    <line x1="35" y1="50" x2="47" y2="50" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="35" y1="55" x2="47" y2="55" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="35" y1="60" x2="43" y2="60" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M42 48 Q48 44 50 42" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="25" cy="16" r="2" fill="white"/><circle cx="35" cy="16" r="2" fill="white"/>
    <path d="M24 22 Q30 26 36 22" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const HeroSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sectionRef.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center paper-texture overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#9B7FD4]/10 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-[#E8614D]/8 blur-3xl pointer-events-none"/>
      <div ref={sectionRef} className="section-fade relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-4">
        <div className="inline-flex items-center gap-2 bg-[#9B7FD4]/15 border border-[#9B7FD4]/30 text-[#6B4FAA] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[#9B7FD4] animate-pulse inline-block"/> Live Workshop
        </div>
        <h1 className="font-serif text-6xl md:text-8xl font-bold text-[#2C2415] leading-none tracking-tight mb-4">AI Playbook</h1>
        <p className="font-serif italic text-xl md:text-2xl text-[#7A6B5A] mb-4 max-w-lg">"Build smarter. Learn faster. Grow together."</p>
        <p className="font-sans text-[#9A8A78] text-base md:text-lg max-w-md mb-10">
          A hands-on workshop where students, builders, and curious minds learn to use AI — not just talk about it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button onClick={() => document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hover bg-[#E8614D] text-white font-sans font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#E8614D]/35">
            Join the Workshop ✦
          </button>
          <button onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hover border-2 border-[#9B7FD4] text-[#6B4FAA] font-sans font-semibold text-base px-8 py-3.5 rounded-full">
            Meet the Team →
          </button>
        </div>
        <div className="flex gap-10 mt-12 text-center">
          {[['100+', 'Seats'], ['5', 'Mentors'], ['1 Day', 'Intensive']].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-2xl font-bold text-[#2C2415]">{num}</p>
              <p className="font-sans text-xs text-[#9A8A78] uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hand-drawn floating crowd */}
      <div className="w-full relative mt-6" style={{ height: '160px' }}>
        <div className="absolute bottom-0 left-0 right-0 h-32 rounded-tl-[60%] rounded-tr-[60%]"
          style={{ background: 'linear-gradient(180deg, #9B7FD4 0%, #6B4FAA 100%)' }}/>
        <svg className="absolute bottom-0 w-full" style={{ height: '160px' }}
          viewBox="0 0 900 160" preserveAspectRatio="xMidYMax meet">
          <g opacity="0.5" transform="translate(0,20) scale(0.72)">
            <PersonSmiling x={60}/><PersonLaptop x={160}/><PersonThinking x={270}/>
            <PersonPhone x={390}/><PersonNote x={490}/><PersonSmiling x={600}/>
            <PersonLaptop x={700}/><PersonThinking x={810}/><PersonPhone x={920}/>
          </g>
          {[
            [PersonLaptop,20,'float-1'],[PersonSmiling,100,'float-2'],[PersonThinking,185,'float-3'],
            [PersonPhone,270,'float-1'],[PersonNote,355,'float-2'],[PersonLaptop,440,'float-3'],
            [PersonSmiling,530,'float-1'],[PersonThinking,615,'float-2'],[PersonPhone,700,'float-3'],
            [PersonNote,785,'float-1'],[PersonLaptop,850,'float-2'],
          ].map(([Comp, x, cls], i) => (
            <g key={i} className={cls} transform="translate(0,44)"><Comp x={x}/></g>
          ))}
        </svg>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="font-sans text-xs text-[#7A6B5A]">scroll</span>
        <svg width="16" height="20" fill="none" stroke="#7A6B5A" strokeWidth="2">
          <path d="M8 2 L8 18 M3 13 L8 18 L13 13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

/* ================================================================
   TEAM SECTION — 3D CSS cube (desktop) + swipeable cards (mobile)
   ================================================================ */
const TEAM = [
  { id:1, name:'Simran',   role:'Third Year Engineering (AI & DS)', bio:'Founder of AIJugaad. Builds AI automation for small businesses. Obsessed with making tech feel human.', emoji:'🤖', bg:'linear-gradient(135deg,#C4AEFF,#9B7FD4)', face:'face-front' },
  { id:2, name:'Ishan',    role:'BBA Student',                      bio:'The business brain behind the playbook. Turns AI ideas into real-world strategies that actually work.',  emoji:'📊', bg:'linear-gradient(135deg,#F08070,#E8614D)', face:'face-right' },
  { id:3, name:'Pranjali', role:'Second Year Engineering',          bio:'Execution wizard and tool master. If there is a workflow to automate, Pranjali has already done it.',    emoji:'⚡', bg:'linear-gradient(135deg,#A8D8B0,#6BAE78)', face:'face-back'  },
  { id:4, name:'Rohit',    role:'Engineer & Builder',               bio:'Full-stack builder with a love for shipping fast. Turns crazy ideas into working products overnight.',    emoji:'🚀', bg:'linear-gradient(135deg,#FFD6A5,#F4A261)', face:'face-left'  },
  { id:5, name:'Arjan',    role:'Creative Strategist',              bio:'Design thinker meets growth hacker. Makes sure every product looks as good as it works.',               emoji:'🎨', bg:'linear-gradient(135deg,#B5EAD7,#52B788)', face:'face-top'   },
];

const TeamSection = () => {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sectionRef.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="team" className="relative min-h-screen flex flex-col items-center justify-center paper-texture py-24 px-6 overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#9B7FD4]/12 blur-3xl pointer-events-none"/>
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-[#E8614D]/8 blur-3xl pointer-events-none"/>
      <div ref={sectionRef} className="section-fade w-full max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#E8614D]/10 border border-[#E8614D]/20 text-[#C44535] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">The Team</div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#2C2415] mb-4">
            Stalk us before<br/><em>you trust us</em> 👀
          </h2>
          <p className="font-sans text-[#7A6B5A] text-lg max-w-xl mx-auto">Five real people, one shared obsession — making AI actually useful for everyone.</p>
        </div>

        {/* Desktop: 3D cube */}
        <div className="hidden md:flex flex-col items-center">
          <p className="font-sans text-sm text-[#9A8A78] mb-6">Hover to pause · Auto-rotating</p>
          <div className="scene">
            <div className="cube">
              {TEAM.map((m) => (
                <div key={m.id} className={`cube-face ${m.face} shadow-2xl`} style={{ background: m.bg }}>
                  <div className="text-5xl mb-4">{m.emoji}</div>
                  <h3 className="font-serif text-white text-2xl font-bold mb-1">{m.name}</h3>
                  <p className="font-sans text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">{m.role}</p>
                  <p className="font-sans text-white/90 text-sm text-center leading-relaxed max-w-[220px]">{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4 mt-16 flex-wrap justify-center">
            {TEAM.map((m) => (
              <div key={m.id} className="flex items-center gap-2 bg-white/60 border border-[#E5D8C5] rounded-full px-4 py-2 shadow-sm">
                <span className="text-xl">{m.emoji}</span>
                <span className="font-sans text-sm font-medium text-[#2C2415]">{m.name}</span>
                <span className="font-sans text-xs text-[#9A8A78]">— {m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: swipeable cards */}
        <div className="md:hidden">
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth:'none' }}
            onScroll={(e) => setActiveCard(Math.round(e.currentTarget.scrollLeft / 308))}>
            {TEAM.map((m, i) => (
              <div key={m.id} className="snap-center flex-shrink-0">
                <div className="w-72 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl"
                  style={{ background: m.bg, transform: activeCard===i ? 'scale(1.04)' : 'scale(0.94)', transition:'transform 0.3s ease' }}>
                  <div className="text-5xl mb-4">{m.emoji}</div>
                  <h3 className="font-serif text-white text-2xl font-bold mb-1">{m.name}</h3>
                  <p className="font-sans text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">{m.role}</p>
                  <p className="font-sans text-white/90 text-sm leading-relaxed">{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-center mt-4">
            {TEAM.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${activeCard===i ? 'w-5 h-2 bg-[#9B7FD4]' : 'w-2 h-2 bg-[#D4C4A8]'}`}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================================================================
   REGISTER SECTION — pulsing envelope → modal form + footer
   ================================================================ */
const EnvelopeSVG = ({ isOpen }) => (
  <svg viewBox="0 0 340 240" fill="none" className="w-full h-full">
    <rect x="10" y="60" width="320" height="170" rx="16" fill="#E8614D"/>
    <path d="M10 60 L170 20 L330 60 Z" fill="#C44535" opacity="0.6"/>
    <path d="M10 230 L165 140 M330 230 L175 140" stroke="#C44535" strokeWidth="2" opacity="0.4"/>
    <path d="M10 60 L170 155 L330 60" fill="#F08070"
      style={{ transformOrigin:'170px 60px', transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0)', transition:'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }}/>
    <path d="M155 105 C155 97 163 92 170 100 C177 92 185 97 185 105 C185 115 170 124 170 124 C170 124 155 115 155 105 Z" fill="white" opacity="0.9"/>
    <rect x="10" y="210" width="320" height="20" fill="#C44535" opacity="0.3"/>
  </svg>
);

const FormField = ({ label, type='text', name, value, onChange, required, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-sans text-sm font-semibold text-[#2C2415]">
      {label} {required && <span className="text-[#E8614D]">*</span>}
    </label>
    {type === 'textarea' ? (
      <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3}
        className="w-full rounded-2xl border-2 border-[#E5D8C5] bg-[#FAF6F1] px-4 py-3 font-sans text-sm text-[#2C2415] placeholder-[#C0B0A0] resize-none focus:outline-none focus:border-[#9B7FD4] transition-colors"/>
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="w-full rounded-2xl border-2 border-[#E5D8C5] bg-[#FAF6F1] px-4 py-3 font-sans text-sm text-[#2C2415] placeholder-[#C0B0A0] focus:outline-none focus:border-[#9B7FD4] transition-colors"/>
    )}
  </div>
);

const RegistrationModal = ({ onClose }) => {
  const [form, setForm] = useState({ name:'', mobile:'', email:'', goal:'' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-enter bg-[#FAF6F1] rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#E8614D] via-[#F08070] to-[#9B7FD4]"/>
        <div className="p-8">
          <button onClick={onClose} className="absolute top-5 right-5 text-[#9A8A78] hover:text-[#2C2415] transition-colors">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="5" x2="17" y2="17"/><line x1="17" y1="5" x2="5" y2="17"/>
            </svg>
          </button>
          {submitted ? (
            <div className="flex flex-col items-center text-center py-6">
              <div className="text-7xl mb-4">🚀</div>
              <h3 className="font-serif text-3xl font-bold text-[#2C2415] mb-2">You're in!</h3>
              <p className="font-sans text-[#7A6B5A] mb-6">We'll send all the details to <strong>{form.email}</strong>. See you at the workshop!</p>
              <button onClick={onClose} className="btn-hover bg-[#9B7FD4] text-white font-sans font-semibold px-8 py-3 rounded-full">Can't wait! ✦</button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-serif text-3xl font-bold text-[#2C2415] mb-1">Save your spot 💌</h3>
                <p className="font-sans text-[#7A6B5A] text-sm">Limited seats. Fill this out and we'll see you there.</p>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <FormField label="Your Name" name="name" value={form.name} onChange={handleChange} required placeholder="What do we call you?"/>
                <FormField label="Mobile Number" name="mobile" type="tel" value={form.mobile} onChange={handleChange} required placeholder="+91 98765 43210"/>
                <FormField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com"/>
                <FormField label="What do you want to learn or build?" name="goal" type="textarea" value={form.goal} onChange={handleChange} placeholder="Tell us! No wrong answers..."/>
                <button type="submit" disabled={loading}
                  className="btn-hover mt-2 bg-[#E8614D] text-white font-sans font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#E8614D]/30 flex items-center justify-center gap-2 disabled:opacity-70">
                  {loading
                    ? <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                        </svg>
                        Registering...
                      </span>
                    : 'Register Now 🚀'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RegisterSection = () => {
  const sectionRef = useRef(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) sectionRef.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  const handleEnvelopeClick = () => { setEnvelopeOpen(true); setTimeout(() => setShowModal(true), 600); };
  const handleModalClose = () => { setShowModal(false); setEnvelopeOpen(false); };
  return (
    <>
      <section id="register" className="relative min-h-screen flex flex-col paper-texture overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#E8614D]/8 blur-3xl"/>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#9B7FD4]/10 blur-3xl"/>
        </div>
        <div ref={sectionRef} className="section-fade flex-1 flex flex-col items-center justify-center px-6 py-24 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block bg-[#E8614D]/10 border border-[#E8614D]/20 text-[#C44535] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">Register</div>
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#2C2415] mb-4">Ready to play? 🎮</h2>
            <p className="font-sans text-[#7A6B5A] text-lg max-w-md mx-auto">Click the envelope below and lock in your seat. Free, fun, and it just might change how you think about AI.</p>
          </div>

          <button onClick={handleEnvelopeClick}
            className={`relative w-72 h-52 focus:outline-none rounded-2xl ${!envelopeOpen ? 'envelope-pulse' : ''}`}
            aria-label="Open envelope to register">
            <EnvelopeSVG isOpen={envelopeOpen}/>
            {!envelopeOpen && (
              <div className="absolute inset-x-0 -bottom-10 flex justify-center">
                <span className="font-sans text-sm text-[#9A8A78] animate-bounce">tap to open ↓</span>
              </div>
            )}
          </button>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-2xl w-full">
            {[['📅','Date','Coming Soon'],['📍','Location','Nashik, Maharashtra'],['🎟️','Entry','Free (Limited Seats)']].map(([icon, label, val]) => (
              <div key={label} className="bg-white/60 border border-[#E5D8C5] rounded-2xl p-5 text-center shadow-sm">
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-sans text-xs text-[#9A8A78] uppercase tracking-widest mb-1">{label}</p>
                <p className="font-serif text-base font-semibold text-[#2C2415]">{val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-[#2C2415] text-[#EFE6D8] py-10 px-6">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-2xl font-bold mb-1">AI Playbook ✦</p>
              <p className="font-sans text-sm text-[#B0A090]">AI Playbook Community</p>
            </div>
            <div className="flex gap-4 items-center">
              <a href="https://instagram.com/simranbuildss" target="_blank" rel="noopener noreferrer"
                className="btn-hover flex items-center gap-2 bg-white/10 hover:bg-[#9B7FD4]/30 border border-white/20 text-white font-sans text-sm font-medium px-4 py-2.5 rounded-full transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                className="btn-hover flex items-center gap-2 bg-white/10 hover:bg-[#25D366]/30 border border-white/20 text-white font-sans text-sm font-medium px-4 py-2.5 rounded-full transition-colors">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-6 pt-6 border-t border-white/10 text-center">
            <p className="font-sans text-xs text-[#7A6B5A]">© 2025 AI Playbook · Built with ♥ in Nashik</p>
          </div>
        </footer>
      </section>
      {showModal && <RegistrationModal onClose={handleModalClose}/>}
    </>
  );
};

/* ================================================================
   APP ROOT
   ================================================================ */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)}/>}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <StarParticles/>
        <RobotCursor/>
        <Navbar/>
        <main>
          <HeroSection/>
          <TeamSection/>
          <RegisterSection/>
        </main>
      </div>
    </>
  );
}