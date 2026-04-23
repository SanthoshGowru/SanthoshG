import { useRef, useEffect, useState } from 'react';
import { manifestoConfig } from '../config';

function typeText(setter: (value: string) => void, text: string, speed: number): Promise<void> {
  return new Promise((resolve) => {
    setter('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setter(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasRunRef = useRef(false);
  const [headingText, setHeadingText] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(false);
  const hasManifestoContent =
    manifestoConfig.headingText || manifestoConfig.bodyText || manifestoConfig.videoPath;

  useEffect(() => {
    if (!hasManifestoContent) return;

    const section = sectionRef.current;
    if (!section) return;

    async function runManifesto() {
      if (hasRunRef.current) return;
      hasRunRef.current = true;
      setCursorVisible(true);
      if (manifestoConfig.headingText) {
        await typeText(setHeadingText, manifestoConfig.headingText, 50);
      }
      if (manifestoConfig.bodyText) {
        await new Promise(r => setTimeout(r, 400));
        await typeText(setBodyText, manifestoConfig.bodyText, 20);
      }
      // Keep cursor blinking for a moment, then hide
      setTimeout(() => setCursorVisible(false), 1500);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runManifesto();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasManifestoContent]);

  if (!hasManifestoContent) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000000',
        padding: '8rem 4vw 10rem',
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
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
      }} />

      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: manifestoConfig.videoPath
            ? 'minmax(0, 1fr) minmax(320px, 44vw)'
            : 'minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '65ch',
          }}
        >
          {manifestoConfig.headingText && (
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                color: '#f0f0f0',
                minHeight: '1.2em',
                display: 'block',
              }}
            >
              {headingText}
              {cursorVisible && headingText.length < (manifestoConfig.headingText?.length || 0) && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.8em',
                  background: 'var(--accent-gold, #c9a84c)',
                  marginLeft: '2px',
                  animation: 'pulse 0.8s ease-in-out infinite',
                  verticalAlign: 'baseline',
                }} />
              )}
            </h2>
          )}
          {manifestoConfig.bodyText && (
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#888888',
                marginTop: '2.5rem',
                minHeight: '3em',
                display: 'block',
              }}
            >
              {bodyText}
              {cursorVisible && bodyText.length < (manifestoConfig.bodyText?.length || 0) && (
                <span style={{
                  display: 'inline-block',
                  width: '2px',
                  height: '0.8em',
                  background: 'var(--accent-gold, #c9a84c)',
                  marginLeft: '2px',
                  animation: 'pulse 0.8s ease-in-out infinite',
                  verticalAlign: 'baseline',
                }} />
              )}
            </p>
          )}
        </div>

        {manifestoConfig.videoPath && (
          <div
            style={{
              width: '100%',
              maxWidth: '720px',
              justifySelf: 'end',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                background: '#0a0a0a',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: 0.85,
                }}
              >
                <source src={manifestoConfig.videoPath} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
