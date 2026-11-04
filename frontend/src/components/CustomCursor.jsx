import { useEffect, useRef, useState } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });

  // Update mouse position ref
  useEffect(() => {
    mouseRef.current = { x, y };
  }, [x, y]);

  // Smooth cursor trailing animation loop (runs once on mount)
  useEffect(() => {
    let animFrame;
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;

    const animate = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setRingPos({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(animate);
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Performant event delegation for hover styling
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-hover]');
      if (target) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [data-hover]');
      if (target) {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Only render on desktop
  if (typeof window !== 'undefined' && window.innerWidth <= 768) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{ left: x, top: y }}
      />
      <div
        className={`cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{ left: ringPos.x, top: ringPos.y }}
      />
    </>
  );
};

export default CustomCursor;

