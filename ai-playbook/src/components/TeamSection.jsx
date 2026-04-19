import { useEffect, useRef, useState } from 'react';

/**
 * TeamSection – "Stalk us before you trust us" section.
 * Desktop: 3D CSS rotating cube with team members on each face.
 * Mobile: Swipeable cards (touch-friendly).
 */

const teamMembers = [
  {
    id: 1,
    name: 'Simran',
    role: 'Third Year AI Engineering Student',
    bio: 'AI Content Creator with 13K+ followers on Instagram. Focused on making AI simple, practical, and accessible through content and real-world applications.',
    emoji: '🤖',
    bg: 'linear-gradient(135deg, #C4AEFF 0%, #9B7FD4 100%)',
    face: 'face-front',
  },
  {
    id: 2,
    name: 'Pranjali',
    role: 'Second Year Computer Science Student',
    bio: 'Business Enthusiast focused on AI-powered solutions. Passionate about startups, strategy, and building scalable businesses by integrating AI.',
    emoji: '⚡',
    bg: 'linear-gradient(135deg, #A8D8B0 0%, #6BAE78 100%)',
    face: 'face-right',
  },
  {
    id: 3,
    name: 'Ishan',
    role: 'Third Year BBA Student',
    bio: 'Community Builder & Event Organizer. Actively organizes and participates in events, bringing people together and building strong, engaging communities.',
    emoji: '📊',
    bg: 'linear-gradient(135deg, #F08070 0%, #E8614D 100%)',
    face: 'face-back',
  },
  {
    id: 4,
    name: 'Arjan',
    role: 'AI/ML Engineer',
    bio: 'Member of ML Nashik & Tech Speaker. Works on machine learning systems and shares knowledge through talks, workshops, and community sessions.',
    emoji: '🎨',
    bg: 'linear-gradient(135deg, #B5EAD7 0%, #52B788 100%)',
    face: 'face-left',
  },
  {
    id: 5,
    name: 'Rohan',
    role: 'Engineer & Builder',
    bio: 'Specialist in RAG (Retrieval-Augmented Generation) Systems. Builds intelligent chatbots and AI-driven applications focused on solving real-world problems.',
    emoji: '🚀',
    bg: 'linear-gradient(135deg, #FFD6A5 0%, #F4A261 100%)',
    face: 'face-top',
  },
];

/* Avatar circle using emoji (placeholder for real images) */
const Avatar = ({ emoji, bg }) => (
  <div
    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg mb-4 border-4 border-white/60"
    style={{
      background: bg,
      boxShadow: '0 0 30px rgba(255,255,255,0.3), 0 8px 24px rgba(0,0,0,0.15)',
    }}
  >
    {emoji}
  </div>
);

/* Individual cube face */
const CubeFace = ({ member }) => (
  <div
    className={`cube-face ${member.face} shadow-2xl`}
    style={{ background: member.bg }}
  >
    <Avatar emoji={member.emoji} bg={member.bg} />
    <h3 className="font-serif text-white text-2xl font-bold mb-1 tracking-tight">
      {member.name}
    </h3>
    <p className="font-sans text-white/90 text-xs font-semibold uppercase tracking-widest mb-3 drop-shadow-lg">
      {member.role}
    </p>
    <p className="font-sans text-white/95 text-sm text-center leading-relaxed max-w-[220px] drop-shadow-md">
      {member.bio}
    </p>
  </div>
);

/* Mobile swipeable card */
const MobileCard = ({ member, active }) => (
  <div
    className="flex-shrink-0 w-72 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl"
    style={{
      background: member.bg,
      transform: active ? 'scale(1.04)' : 'scale(0.94)',
      transition: 'transform 0.3s ease',
    }}
  >
    <div className="text-5xl mb-4">{member.emoji}</div>
    <h3 className="font-serif text-white text-2xl font-bold mb-1">{member.name}</h3>
    <p className="font-sans text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">
      {member.role}
    </p>
    <p className="font-sans text-white/90 text-sm leading-relaxed">{member.bio}</p>
  </div>
);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) sectionRef.current?.classList.add('visible');
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="team"
      className="relative min-h-screen flex flex-col items-center justify-center paper-texture py-24 px-6 overflow-hidden"
    >
      {/* Background accent blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-[#9B7FD4]/12 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 rounded-full bg-[#E8614D]/8 blur-3xl pointer-events-none" />

      <div ref={sectionRef} className="section-fade w-full max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-[#E8614D]/10 border border-[#E8614D]/20 text-[#C44535] font-sans text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-wide">
            The Team
          </div>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#2C2415] mb-4">
            Stalk us before<br />
            <em>you trust us</em> 👀
          </h2>
          <p className="font-sans text-[#7A6B5A] text-lg max-w-xl mx-auto">
            Five real people, one shared obsession — making AI actually useful for everyone.
          </p>
        </div>

        {/* ===== DESKTOP: 3D Cube ===== */}
        <div className="hidden md:flex flex-col items-center">
          <p className="font-sans text-sm text-[#9A8A78] mb-6">
            Hover to pause · Auto-rotating
          </p>
          <div className="scene">
            <div className="cube">
              {teamMembers.map((m) => (
                <CubeFace key={m.id} member={m} />
              ))}
            </div>
          </div>

          {/* Member names legend below cube */}
          <div className="flex gap-4 mt-16 flex-wrap justify-center">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 bg-white/60 border border-[#E5D8C5] rounded-full px-4 py-2 shadow-sm"
              >
                <span className="text-xl">{m.emoji}</span>
                <span className="font-sans text-sm font-medium text-[#2C2415]">{m.name}</span>
                <span className="font-sans text-xs text-[#9A8A78]">— {m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== MOBILE: Swipeable cards ===== */}
        <div className="md:hidden">
          <div
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
            onScroll={(e) => {
              const el = e.currentTarget;
              const cardWidth = 288 + 20; // 72*4 + gap
              const idx = Math.round(el.scrollLeft / cardWidth);
              setActiveCard(idx);
            }}
          >
            {teamMembers.map((m, i) => (
              <div key={m.id} className="snap-center flex-shrink-0">
                <MobileCard member={m} active={activeCard === i} />
              </div>
            ))}
          </div>
          {/* Dots */}
          <div className="flex gap-2 justify-center mt-4">
            {teamMembers.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  activeCard === i ? 'w-5 h-2 bg-[#9B7FD4]' : 'w-2 h-2 bg-[#D4C4A8]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
