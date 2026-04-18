import { useEffect, useRef, useState } from 'react';

/**
 * RobotCursor – A playful robot that smoothly follows the mouse with natural walking animation.
 * Features:
 * - Smooth easing (not snapping)
 * - Walks in direction of movement (left/right flip)
 * - Idle animations (blinking, breathing, swaying)
 * - Natural lag/delay for organic feel
 */
const RobotCursor = () => {
  const robotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const lastPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const idleTimeoutRef = useRef(null);
  
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState('right'); // 'left' or 'right'
  const [isIdle, setIsIdle] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      // Determine direction based on cursor movement
      if (newX > target.current.x) {
        setDirection('right');
      } else if (newX < target.current.x) {
        setDirection('left');
      }
      
      target.current = { x: newX, y: newY };
      if (!visible) setVisible(true);
      
      // Set moving state
      setIsMoving(true);
      setIsIdle(false);
      
      // Clear previous idle timeout
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      
      // Set idle state after cursor stops moving for 1.5 seconds
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
        setIsMoving(false);
      }, 1500);
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3); // Smooth easing function

    const animate = () => {
      // Use easing for smoother acceleration/deceleration (0.08 for lag/natural feel)
      const easeAmount = easeOutCubic(0.08);
      pos.current.x = lerp(pos.current.x, target.current.x, easeAmount);
      pos.current.y = lerp(pos.current.y, target.current.y, easeAmount);

      if (robotRef.current) {
        robotRef.current.style.left = `${pos.current.x}px`;
        robotRef.current.style.top = `${pos.current.y}px`;
      }
      
      lastPos.current = { x: pos.current.x, y: pos.current.y };
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [visible]);

  return (
    <div
      ref={robotRef}
      className="robot-cursor"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
        transform: `translate(-50%, -50%) scaleX(${direction === 'left' ? -1 : 1})`,
      }}
    >
      {/* Cute soft robot SVG — warm sand aesthetic with animations */}
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isIdle ? 'robot-idle' : isMoving ? 'robot-walking' : ''}
      >
        {/* Antenna - subtle sway when idle */}
        <line
          x1="26"
          y1="6"
          x2="26"
          y2="12"
          stroke="#9B7FD4"
          strokeWidth="2.5"
          strokeLinecap="round"
          className={isIdle ? 'antenna-sway' : ''}
          style={{ transformOrigin: '26px 6px' }}
        />
        <circle cx="26" cy="5" r="3" fill="#C4AEFF"/>

        {/* Head */}
        <rect
          x="12"
          y="12"
          width="28"
          height="22"
          rx="9"
          fill="#EFE6D8"
          stroke="#9B7FD4"
          strokeWidth="2"
          className={isIdle ? 'robot-breathe' : ''}
        />

        {/* Eyes - blink when idle, look forward when walking */}
        <g className={isIdle ? 'eyes-blink' : ''}>
          <circle cx="20" cy="22" r="4" fill="#9B7FD4"/>
          <circle cx="32" cy="22" r="4" fill="#9B7FD4"/>
          <circle cx="21.5" cy="21" r="1.5" fill="white"/>
          <circle cx="33.5" cy="21" r="1.5" fill="white"/>
        </g>

        {/* Smile */}
        <path
          d="M20 28 Q26 32 32 28"
          stroke="#9B7FD4"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Body - lean when walking */}
        <rect
          x="17"
          y="34"
          width="18"
          height="12"
          rx="5"
          fill="#EFE6D8"
          stroke="#9B7FD4"
          strokeWidth="2"
          className={isMoving ? 'robot-lean' : ''}
          style={{ transformOrigin: '26px 40px' }}
        />

        {/* Chest dot - pulse when idle */}
        <circle
          cx="26"
          cy="40"
          r="2.5"
          fill="#C4AEFF"
          className={isIdle ? 'chest-pulse' : ''}
        />

        {/* Arms - swing when walking, relax when idle */}
        <rect
          x="7"
          y="35"
          width="9"
          height="5"
          rx="2.5"
          fill="#EFE6D8"
          stroke="#9B7FD4"
          strokeWidth="1.5"
          className={isMoving ? 'arm-left-swing' : isIdle ? 'arm-relax' : ''}
          style={{ transformOrigin: '7px 37.5px' }}
        />
        <rect
          x="36"
          y="35"
          width="9"
          height="5"
          rx="2.5"
          fill="#EFE6D8"
          stroke="#9B7FD4"
          strokeWidth="1.5"
          className={isMoving ? 'arm-right-swing' : isIdle ? 'arm-relax' : ''}
          style={{ transformOrigin: '45px 37.5px' }}
        />
      </svg>
    </div>
  );
};

export default RobotCursor;
