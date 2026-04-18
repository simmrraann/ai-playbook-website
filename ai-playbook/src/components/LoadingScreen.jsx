import { useEffect, useState } from 'react';

/**
 * LoadingScreen – Shows a warm branded loader for 2 seconds on first visit.
 */
const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 300);
          return 100;
        }
        return p + 2;
      });
    }, 35);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center paper-texture"
      style={{ background: '#F5EBDD' }}
    >
      {/* Robot icon */}
      <div className="robot-bounce mb-6">
        <svg width="72" height="72" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      <h1 className="font-serif text-4xl font-bold text-[#2C2415] mb-2 tracking-tight">
        AI Playbook
      </h1>
      <p className="font-sans text-[#7A6B5A] text-sm mb-10">Warming up the workshop...</p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-[#E5D8C5] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-[#9B7FD4] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-[#B0A090] mt-3">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;
