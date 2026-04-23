import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [headerRef.current, item1Ref.current, item2Ref.current].filter(Boolean);

    items.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '6rem 4vw 6rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Subtle top gradient divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          ref={headerRef}
          style={{
            marginBottom: '3rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold, #c9a84c)',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Education
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
          }}
        >
          <div
            ref={item1Ref}
            style={{
              opacity: 0,
              padding: '2rem',
              background: '#0a0a0a',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'border-color 0.4s ease, background 0.4s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
              (e.currentTarget as HTMLElement).style.background = '#0f0f0f';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.background = '#0a0a0a';
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#f0f0f0',
                marginBottom: '0.75rem',
              }}
            >
              Master of Information Technology Management
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#888888',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}
            >
              Webster University, San Antonio
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-gold, #c9a84c)',
                letterSpacing: '0.05em',
                opacity: 0.7,
              }}
            >
              Sep 2023 – May 2025
            </p>
          </div>

          <div
            ref={item2Ref}
            style={{
              opacity: 0,
              padding: '2rem',
              background: '#0a0a0a',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'border-color 0.4s ease, background 0.4s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
              (e.currentTarget as HTMLElement).style.background = '#0f0f0f';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.background = '#0a0a0a';
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                fontWeight: 600,
                lineHeight: 1.2,
                color: '#f0f0f0',
                marginBottom: '0.75rem',
              }}
            >
              Bachelor of Computer Science and Engineering
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                color: '#888888',
                lineHeight: 1.6,
                marginBottom: '0.5rem',
              }}
            >
              Jawaharlal Nehru Technological University, Hyderabad
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-gold, #c9a84c)',
                letterSpacing: '0.05em',
                opacity: 0.7,
              }}
            >
              Jul 2017 – Sep 2021
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
