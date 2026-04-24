import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { heroConfig, navigationConfig } from '../config';

const FLOATING_SKILLS = [
  'Azure', 'Databricks', 'Kafka', 'Fabric', 'PySpark', 'Snowflake', 'ADF', 'dbt'
];

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasHeroContent =
    navigationConfig.brandName ||
    navigationConfig.links.length > 0 ||
    heroConfig.titleLines.length > 0 ||
    heroConfig.subtitle;

  useEffect(() => {
    if (!hasHeroContent) return;

    const tl = gsap.timeline({ delay: 0.5 });
    if (navRef.current) {
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' },
        '-=0.5'
      );
    }
    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
    }
    if (skillsRef.current) {
      const skillNodes = skillsRef.current.querySelectorAll('.floating-skill');
      tl.fromTo(
        skillNodes,
        { opacity: 0, scale: 0, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );
    }
    if (scrollRef.current) {
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      );
    }

    // Floating animation for skill nodes
    if (skillsRef.current) {
      const skillNodes = skillsRef.current.querySelectorAll('.floating-skill');
      skillNodes.forEach((node, i) => {
        gsap.to(node, {
          y: `+=${Math.sin(i * 0.8) * 8}`,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    }

    return () => { tl.kill(); };
  }, [hasHeroContent]);

  if (!hasHeroContent) {
    return null;
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1,
      }}
    >
      <nav
        ref={navRef}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2rem 4vw',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-inverse)',
          opacity: 0,
        }}
      >
        {navigationConfig.brandName ? (
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'var(--accent-gold, #c9a84c)',
          }}>
            {navigationConfig.brandName}
          </span>
        ) : <span />}
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {navigationConfig.links.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              style={{
                color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--accent-gold, #c9a84c)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Floating Skill Nodes */}
      <div
        ref={skillsRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {FLOATING_SKILLS.map((skill, i) => {
          const positions = [
            { left: '8%', top: '20%' },
            { left: '85%', top: '15%' },
            { left: '5%', top: '55%' },
            { left: '90%', top: '45%' },
            { left: '15%', top: '75%' },
            { left: '80%', top: '70%' },
            { left: '92%', top: '80%' },
            { left: '3%', top: '35%' },
          ];
          const pos = positions[i];
          const colors = [
            '#c9a84c', '#e8d48b', '#c9a84c', '#e8d48b',
            '#c9a84c', '#e8d48b', '#4A90D9', '#c9a84c',
          ];
          return (
            <div
              key={skill}
              className="floating-skill"
              style={{
                position: 'absolute',
                left: pos.left,
                top: pos.top,
                padding: '0.4rem 1rem',
                background: `rgba(201, 168, 76, 0.06)`,
                border: `1px solid ${colors[i]}25`,
                borderRadius: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: colors[i],
                backdropFilter: 'blur(8px)',
                opacity: 0,
                textShadow: `0 0 15px ${colors[i]}30`,
              }}
            >
              {skill}
            </div>
          );
        })}
      </div>

      <div
        style={{
          padding: '0 4vw 13vh',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {heroConfig.titleLines.length > 0 && (
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--text-inverse)',
              margin: 0,
              opacity: 0,
              textWrap: 'balance',
              textShadow: '0 0 80px rgba(201, 168, 76, 0.08)',
            }}
          >
            {heroConfig.titleLines.map((line, index) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < heroConfig.titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>
        )}
        {heroConfig.subtitle && (
          <p
            ref={subRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
              fontWeight: 400,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold, #c9a84c)',
              marginTop: '1.5rem',
              opacity: 0,
            }}
          >
            {heroConfig.subtitle}
          </p>
        )}

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          style={{
            marginTop: '4rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            Scroll to explore
          </span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(180deg, var(--accent-gold, #c9a84c), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
