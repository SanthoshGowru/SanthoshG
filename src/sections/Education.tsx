import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATIONS = [
  { title: 'Microsoft Fabric Data Engineer Associate (DP-700)', status: 'In Progress', year: '2025' },
  { title: 'Azure Certified Machine Learning Specialty', status: 'Certified', year: '2025' },
  { title: 'Microsoft Power Platform Functional Consultant (PL-200)', status: 'Certified', year: '2024' },
  { title: 'Microsoft Power BI Data Analyst (PL-300)', status: 'Certified', year: '2024' },
  { title: 'Azure Certified Cloud Practitioner', status: 'Certified', year: '2023' },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const certHeaderRef = useRef<HTMLDivElement>(null);
  const certGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = [headerRef.current, item1Ref.current, item2Ref.current, certHeaderRef.current, certGridRef.current].filter(Boolean);

    items.forEach((item, i) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.12,
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
              MS — Information Technology Management
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
              Webster University, San Antonio, TX
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
              BE — Computer Science
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
              Jawaharlal Nehru Technological University, Hyderabad, India
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

        {/* Certifications Section */}
        <div
          ref={certHeaderRef}
          style={{
            marginTop: '5rem',
            marginBottom: '2rem',
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
            }}
          >
            Microsoft Certifications
          </span>
        </div>

        <div
          ref={certGridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            opacity: 0,
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              style={{
                padding: '1.25rem 1.5rem',
                background: '#0a0a0a',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                transition: 'border-color 0.4s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#f0f0f0',
                  lineHeight: 1.4,
                  marginBottom: '0.25rem',
                }}>
                  {cert.title}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#555555',
                  letterSpacing: '0.05em',
                }}>
                  {cert.year}
                </p>
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.6rem',
                borderRadius: '12px',
                flexShrink: 0,
                background: cert.status === 'Certified'
                  ? 'rgba(201, 168, 76, 0.1)'
                  : 'rgba(74, 144, 217, 0.1)',
                color: cert.status === 'Certified'
                  ? '#c9a84c'
                  : '#4A90D9',
                border: `1px solid ${cert.status === 'Certified'
                  ? 'rgba(201, 168, 76, 0.2)'
                  : 'rgba(74, 144, 217, 0.2)'}`,
              }}>
                {cert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
