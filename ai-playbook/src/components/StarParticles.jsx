import { useMemo } from 'react';

/**
 * StarParticles – Subtle twinkling dot particles scattered across the page.
 * Purely decorative, adds warmth and life to the sand background.
 */
const StarParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
      color: i % 3 === 0 ? '#9B7FD4' : i % 3 === 1 ? '#E8614D' : '#D4C4A8',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            backgroundColor: p.color,
            opacity: 0.2,
            animation: `twinkle ${p.duration} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}
    </div>
  );
};

export default StarParticles;
