import type { Exhibition } from '../lib/exhibitions';
import { exhibitionsConfig } from '../config';

interface ExhibitionDetailProps {
  exhibition: Exhibition;
  onBack: () => void;
}

export default function ExhibitionDetail({ exhibition, onBack }: ExhibitionDetailProps) {
  return (
    <section
      style={{
        background: '#000000',
        minHeight: '100vh',
        padding: '2rem 4vw 5rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.72rem',
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#888888',
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem 0',
            font: 'inherit',
            color: 'var(--accent-gold, #c9a84c)',
            cursor: 'none',
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.opacity = '0.7';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.opacity = '1';
          }}
        >
          ← {exhibitionsConfig.detailBackText}
        </button>
        <span>{exhibition.year}</span>
      </div>

      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 36vw) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'start',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: '2rem',
            maxWidth: '560px',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '4 / 5',
              overflow: 'hidden',
              background: '#0a0a0a',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <img
              src={exhibition.image}
              alt={exhibition.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: 0.9,
              }}
            />
          </div>
        </div>

        <div
          style={{
            maxWidth: '62ch',
            paddingTop: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold, #c9a84c)',
              marginBottom: '1.25rem',
            }}
          >
            {exhibition.eyebrow}
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              lineHeight: 1.02,
              fontWeight: 400,
              textTransform: 'uppercase',
              margin: 0,
              color: '#f0f0f0',
            }}
          >
            {exhibition.title}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              lineHeight: 1.8,
              color: '#888888',
              marginTop: '2rem',
              marginBottom: '3rem',
            }}
          >
            {exhibition.intro}
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2.75rem',
            }}
          >
            {exhibition.sections.map((section) => (
              <article key={section.heading}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2vw, 2.1rem)',
                    lineHeight: 1.15,
                    fontWeight: 400,
                    margin: 0,
                    color: '#e0e0e0',
                  }}
                >
                  {section.heading}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.96rem',
                    lineHeight: 1.9,
                    color: '#777777',
                    marginTop: '1rem',
                    marginBottom: 0,
                  }}
                >
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
