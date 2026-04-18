import { useEffect, useRef } from 'react';

/**
 * HeroSection – Full-screen landing section.
 * Features title, subtitle, CTA button, and a crowd of floating sketch people.
 */

/* ---------- Individual Person SVG components ---------- */
const CROWD_COLOR = '#2a2a2a';
const STROKE_WIDTH = 3;

const PersonLaptop = ({ x = 0, style = {} }) => (
  <g transform={`translate(${x}, 0)`} style={style}>
    {/* Head */}
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Body */}
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Arms with laptop */}
    <line x1="18" y1="50" x2="8" y2="60" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <line x1="42" y1="50" x2="52" y2="60" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Laptop */}
    <rect x="10" y="58" width="40" height="24" rx="3" fill="none" stroke={CROWD_COLOR} strokeWidth={2.5}/>
    <rect x="13" y="61" width="34" height="16" rx="2" fill="none" stroke={CROWD_COLOR} strokeWidth="2"/>
    {/* Screen glow dots */}
    <circle cx="22" cy="69" r="2" fill={CROWD_COLOR} opacity="0.5"/>
    <circle cx="30" cy="69" r="2" fill={CROWD_COLOR} opacity="0.5"/>
    <circle cx="38" cy="69" r="2" fill={CROWD_COLOR} opacity="0.5"/>
    {/* Smile */}
    <path d="M24 22 Q30 27 36 22" fill="none" stroke={CROWD_COLOR} strokeWidth="2.5" strokeLinecap="round"/>
    {/* Eyes */}
    <circle cx="25" cy="16" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="16" r="2" fill={CROWD_COLOR}/>
  </g>
);

const PersonThinking = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Thinking arm */}
    <path d="M18 48 Q10 42 14 36" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <circle cx="14" cy="34" r="2.5" fill={CROWD_COLOR} opacity="0.6"/>
    <circle cx="10" cy="28" r="2" fill={CROWD_COLOR} opacity="0.4"/>
    <circle cx="8" cy="22" r="1.5" fill={CROWD_COLOR} opacity="0.25"/>
    {/* Other arm down */}
    <line x1="42" y1="50" x2="48" y2="62" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Face: one eyebrow raised */}
    <path d="M24 12 Q27 10 30 12" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="25" cy="17" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="17" r="2" fill={CROWD_COLOR}/>
    <path d="M25 24 Q30 22 35 24" fill="none" stroke={CROWD_COLOR} strokeWidth="1.5" strokeLinecap="round"/>
  </g>
);

const PersonSmiling = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Raised arms */}
    <path d="M18 46 Q8 36 6 28" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <path d="M42 46 Q52 36 54 28" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Big smile */}
    <path d="M22 22 Q30 30 38 22" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <circle cx="25" cy="15" r="2.5" fill={CROWD_COLOR}/>
    <circle cx="35" cy="15" r="2.5" fill={CROWD_COLOR}/>
    {/* Cheeks */}
    <circle cx="22" cy="22" r="3" fill={CROWD_COLOR} opacity="0.2"/>
    <circle cx="38" cy="22" r="3" fill={CROWD_COLOR} opacity="0.2"/>
  </g>
);

const PersonPhone = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Phone arm */}
    <path d="M18 46 Q12 38 14 28" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <rect x="8" y="18" width="10" height="16" rx="2" fill="none" stroke={CROWD_COLOR} strokeWidth="2"/>
    <circle cx="13" cy="31" r="1" fill={CROWD_COLOR}/>
    {/* Other arm */}
    <line x1="42" y1="50" x2="46" y2="60" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <circle cx="25" cy="16" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="16" r="2" fill={CROWD_COLOR}/>
    <path d="M24 23 Q30 27 36 23" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const PersonNote = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Notepad */}
    <rect x="32" y="44" width="18" height="22" rx="2" fill="none" stroke={CROWD_COLOR} strokeWidth="2"/>
    <line x1="35" y1="50" x2="47" y2="50" stroke={CROWD_COLOR} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="35" y1="55" x2="47" y2="55" stroke={CROWD_COLOR} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="35" y1="60" x2="43" y2="60" stroke={CROWD_COLOR} strokeWidth="1.5" strokeLinecap="round"/>
    {/* Pen arm */}
    <path d="M42 48 Q48 44 50 42" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="25" cy="16" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="16" r="2" fill={CROWD_COLOR}/>
    <path d="M24 22 Q30 26 36 22" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const PersonWaving = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Waving arm (up) */}
    <path d="M42 46 Q50 30 54 20" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <path d="M54 20 Q56 18 58 22" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Other arm down */}
    <line x1="18" y1="50" x2="16" y2="62" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Happy face */}
    <circle cx="25" cy="15" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="15" r="2" fill={CROWD_COLOR}/>
    <path d="M25 22 Q30 28 35 22" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const PersonCelebrating = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Arms up in celebration */}
    <path d="M18 46 L8 22" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <path d="M42 46 L52 22" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Excited eyes */}
    <circle cx="24" cy="14" r="2.5" fill={CROWD_COLOR}/>
    <circle cx="36" cy="14" r="2.5" fill={CROWD_COLOR}/>
    {/* Open mouth smile */}
    <path d="M24 24 Q30 32 36 24" fill="none" stroke={CROWD_COLOR} strokeWidth={2.5} strokeLinecap="round"/>
  </g>
);

const PersonSitting = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="12" r="11" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M20 50 Q20 35 30 32 Q40 35 40 50" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Sitting legs */}
    <line x1="20" y1="50" x2="18" y2="65" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <line x1="40" y1="50" x2="42" y2="65" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Arms on sides */}
    <line x1="20" y1="42" x2="10" y2="50" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <line x1="40" y1="42" x2="50" y2="50" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Relaxed face */}
    <circle cx="25" cy="10" r="1.8" fill={CROWD_COLOR}/>
    <circle cx="35" cy="10" r="1.8" fill={CROWD_COLOR}/>
    <path d="M26 15 Q30 18 34 15" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const PersonHands = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Arms by chest */}
    <path d="M18 50 Q14 48 12 55" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    <path d="M42 50 Q46 48 48 55" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Thumbs up fingers */}
    <circle cx="12" cy="58" r="2.5" fill={CROWD_COLOR} opacity="0.7"/>
    <circle cx="48" cy="58" r="2.5" fill={CROWD_COLOR} opacity="0.7"/>
    {/* Contemplative face */}
    <circle cx="25" cy="16" r="2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="16" r="2" fill={CROWD_COLOR}/>
    <path d="M25 24 Q30 22 35 24" fill="none" stroke={CROWD_COLOR} strokeWidth="2" strokeLinecap="round"/>
  </g>
);

const PersonReading = ({ x = 0 }) => (
  <g transform={`translate(${x}, 0)`}>
    <circle cx="30" cy="18" r="12" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH}/>
    <path d="M18 60 Q18 42 30 38 Q42 42 42 60" fill="none" stroke={CROWD_COLOR} strokeWidth={STROKE_WIDTH} strokeLinecap="round"/>
    {/* Book */}
    <path d="M12 44 Q12 48 14 60" fill="none" stroke={CROWD_COLOR} strokeWidth={2.5} strokeLinecap="round"/>
    <path d="M48 44 Q48 48 46 60" fill="none" stroke={CROWD_COLOR} strokeWidth={2.5} strokeLinecap="round"/>
    <rect x="14" y="44" width="32" height="18" rx="2" fill="none" stroke={CROWD_COLOR} strokeWidth="2"/>
    <line x1="30" y1="44" x2="30" y2="62" stroke={CROWD_COLOR} strokeWidth="1.5"/>
    {/* Focused eyes */}
    <circle cx="25" cy="16" r="2.2" fill={CROWD_COLOR}/>
    <circle cx="35" cy="16" r="2.2" fill={CROWD_COLOR}/>
    <path d="M25 24 Q30 25 35 24" fill="none" stroke={CROWD_COLOR} strokeWidth="1.8" strokeLinecap="round"/>
  </g>
);

/* ---------- Main Hero ---------- */
const HeroSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Intersection observer for section fade
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToRegister = () => {
    document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center paper-texture overflow-hidden"
    >
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#9B7FD4]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-[#E8614D]/8 blur-3xl pointer-events-none" />

      {/* Hero text content */}
      <div
        ref={sectionRef}
        className="section-fade relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-4"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#9B7FD4]/15 border border-[#9B7FD4]/30 text-[#6B4FAA] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[#9B7FD4] animate-pulse inline-block"/>
          Live Workshop
        </div>

        <h1 className="font-serif text-6xl md:text-8xl font-bold text-[#2C2415] leading-none tracking-tight mb-4">
          AI Playbook
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-[#7A6B5A] mb-4 max-w-lg">
          "Build smarter. Learn faster. Grow together."
        </p>
        <p className="font-sans text-[#9A8A78] text-base md:text-lg max-w-md mb-10">
          A hands-on workshop where students, builders, and curious minds learn to use AI — not just talk about it.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={scrollToRegister}
            className="btn-hover bg-[#E8614D] text-white font-sans font-semibold text-base px-8 py-3.5 rounded-full shadow-lg shadow-[#E8614D]/35"
          >
            Join the Workshop ✦
          </button>
          <button
            onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-hover border-2 border-[#9B7FD4] text-[#6B4FAA] font-sans font-semibold text-base px-8 py-3.5 rounded-full"
          >
            Meet the Team →
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-12 text-center">
          {[['100+', 'Seats'], ['5', 'Mentors'], ['1 Day', 'Intensive']].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-2xl font-bold text-[#2C2415]">{num}</p>
              <p className="font-sans text-xs text-[#9A8A78] uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Crowd of hand-drawn people */}
      <div className="w-full relative mt-6" style={{ height: '160px' }}>
        {/* Purple wave behind crowd */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 rounded-tl-[60%] rounded-tr-[60%]"
          style={{ background: 'linear-gradient(180deg, #9B7FD4 0%, #6B4FAA 100%)' }}
        />

        {/* SVG crowd */}
        <svg
          className="absolute bottom-0 w-full"
          style={{ height: '160px' }}
          viewBox="0 0 900 160"
          preserveAspectRatio="xMidYMax meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back row (smaller, faded - distant crowd) */}
          <g opacity="0.35" transform="translate(0, 20) scale(0.65)">
            <PersonWaving x={30} />
            <PersonSmiling x={120} />
            <PersonLaptop x={210} />
            <PersonThinking x={310} />
            <PersonCelebrating x={410} />
            <PersonPhone x={510} />
            <PersonNote x={600} />
            <PersonSitting x={700} />
            <PersonHands x={800} />
            <PersonReading x={900} />
            <PersonWaving x={1000} />
            <PersonSmiling x={1100} />
          </g>

          {/* Mid row (medium opacity - middle ground) */}
          <g opacity="0.6" transform="translate(0, 28) scale(0.82)">
            <PersonSmiling x={40} />
            <PersonPhone x={140} />
            <PersonNote x={240} />
            <PersonLaptop x={340} />
            <PersonThinking x={440} />
            <PersonCelebrating x={540} />
            <PersonReading x={640} />
            <PersonWaving x={740} />
            <PersonSitting x={830} />
            <PersonHands x={920} />
          </g>

          {/* Front row (full opacity - closest to viewer) */}
          <g className="float-1" transform="translate(0, 44)">
            <PersonLaptop x={20} />
          </g>
          <g className="float-2" transform="translate(0, 44)">
            <PersonSmiling x={100} />
          </g>
          <g className="float-3" transform="translate(0, 44)">
            <PersonThinking x={185} />
          </g>
          <g className="float-1" transform="translate(0, 44)">
            <PersonPhone x={270} />
          </g>
          <g className="float-2" transform="translate(0, 44)">
            <PersonNote x={355} />
          </g>
          <g className="float-3" transform="translate(0, 44)">
            <PersonCelebrating x={440} />
          </g>
          <g className="float-1" transform="translate(0, 44)">
            <PersonWaving x={530} />
          </g>
          <g className="float-2" transform="translate(0, 44)">
            <PersonReading x={615} />
          </g>
          <g className="float-3" transform="translate(0, 44)">
            <PersonHands x={700} />
          </g>
          <g className="float-1" transform="translate(0, 44)">
            <PersonSitting x={785} />
          </g>
          <g className="float-2" transform="translate(0, 44)">
            <PersonSmiling x={850} />
          </g>
        </svg>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
        <span className="font-sans text-xs text-[#7A6B5A]">scroll</span>
        <svg width="16" height="20" fill="none" stroke="#7A6B5A" strokeWidth="2">
          <path d="M8 2 L8 18 M3 13 L8 18 L13 13" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
