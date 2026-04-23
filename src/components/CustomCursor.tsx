import { useRef, useEffect } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    const handleMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]') ||
        target.closest('.exhibition-item') ||
        target.tagName === 'VIDEO'
      ) {
        isHoveringRef.current = true;
      } else {
        isHoveringRef.current = false;
      }
    };

    const handleLeave = () => {
      isVisibleRef.current = false;
      cursor.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);

    function animate() {
      // Inner dot — fast follow
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.2;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.2;

      // Outer ring — slower, silkier follow
      ringPosRef.current.x += (targetRef.current.x - ringPosRef.current.x) * 0.08;
      ringPosRef.current.y += (targetRef.current.y - ringPosRef.current.y) * 0.08;

      const dotSize = isHoveringRef.current ? 6 : 4;
      const ringSize = isHoveringRef.current ? 48 : 28;
      const ringBorderWidth = isHoveringRef.current ? 1.5 : 1;

      if (cursor) {
        cursor.style.transform = `translate(${posRef.current.x - dotSize / 2}px, ${posRef.current.y - dotSize / 2}px)`;
        cursor.style.width = `${dotSize}px`;
        cursor.style.height = `${dotSize}px`;
      }
      if (ring) {
        ring.style.transform = `translate(${ringPosRef.current.x - ringSize / 2}px, ${ringPosRef.current.y - ringSize / 2}px)`;
        ring.style.width = `${ringSize}px`;
        ring.style.height = `${ringSize}px`;
        ring.style.borderWidth = `${ringBorderWidth}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#c9a84c',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.3s ease, height 0.3s ease',
          willChange: 'transform',
          opacity: 0,
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 168, 76, 0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-width 0.3s ease',
          willChange: 'transform',
          opacity: 0,
        }}
      />
    </>
  );
}
