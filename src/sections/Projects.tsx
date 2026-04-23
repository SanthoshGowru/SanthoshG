import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
}

const PROJECTS: Project[] = [
  {
    title: 'Real-Time Pipeline Monitor',
    subtitle: 'Streaming Data Infrastructure',
    description:
      'Built an end-to-end real-time data pipeline monitoring platform using Apache Kafka and Spark Streaming. The system tracks throughput, latency, and partition health across 50+ Kafka topics, providing instant anomaly detection and alerting to prevent data loss and SLA breaches.',
    image: '/images/project-pipeline.png',
    techStack: ['Kafka', 'Spark Streaming', 'Python', 'Grafana', 'PostgreSQL'],
    metrics: [
      { label: 'Topics Monitored', value: '50+' },
      { label: 'Latency Reduced', value: '85%' },
      { label: 'Uptime Achieved', value: '99.9%' },
    ],
  },
  {
    title: 'Cloud Cost Analytics Platform',
    subtitle: 'FinOps & Cost Optimization',
    description:
      'Designed a cloud cost intelligence platform that aggregates spend data from AWS and Snowflake, identifies optimization opportunities, and forecasts future costs using ML models. The platform drove a 40% reduction in monthly cloud spend by surfacing idle resources and recommending right-sizing strategies.',
    image: '/images/project-cloud-cost.png',
    techStack: ['AWS', 'Snowflake', 'dbt', 'Python', 'Tableau'],
    metrics: [
      { label: 'Cost Reduction', value: '40%' },
      { label: 'Monthly Savings', value: '$85K' },
      { label: 'Resources Optimized', value: '200+' },
    ],
  },
  {
    title: 'ETL Performance Dashboard',
    subtitle: 'Pipeline Orchestration & Analytics',
    description:
      'Developed a comprehensive ETL performance tracking system using Apache Airflow and custom instrumentation. The dashboard provides real-time visibility into pipeline execution times, failure rates, data volumes processed, and DAG dependencies — enabling the team to proactively identify bottlenecks and optimize job scheduling.',
    image: '/images/project-etl.png',
    techStack: ['Airflow', 'AWS Glue', 'PySpark', 'Redshift', 'Docker'],
    metrics: [
      { label: 'Pipelines Tracked', value: '120+' },
      { label: 'Processing Speed', value: '+50%' },
      { label: 'Failure Rate', value: '<1%' },
    ],
  },
  {
    title: 'Data Quality Governance Hub',
    subtitle: 'Enterprise Data Quality & Lineage',
    description:
      'Architected an enterprise data quality governance platform that enforces schema validation, tracks data lineage, and monitors quality scores across all data assets. Integrated with dbt tests and Great Expectations to automate quality checks across 500+ datasets, ensuring GDPR/CCPA compliance and data trustworthiness.',
    image: '/images/project-data-quality.png',
    techStack: ['dbt', 'Great Expectations', 'Snowflake', 'Terraform', 'Python'],
    metrics: [
      { label: 'Datasets Governed', value: '500+' },
      { label: 'Quality Score', value: '99.2%' },
      { label: 'Compliance', value: 'GDPR' },
    ],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0,
        background: '#0a0a0a',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        transition: 'border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(201, 168, 76, 0.25)' : 'rgba(255, 255, 255, 0.05)',
        boxShadow: isHovered ? '0 20px 60px rgba(201, 168, 76, 0.06)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        ref={imageRef}
        style={{
          width: '100%',
          aspectRatio: '16 / 10',
          overflow: 'hidden',
          position: 'relative',
          background: '#050505',
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            opacity: isHovered ? 1 : 0.8,
          }}
        />
        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '40%',
            background: 'linear-gradient(transparent, #0a0a0a)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem 1.75rem 2rem' }}>
        {/* Subtitle / Eyebrow */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent-gold, #c9a84c)',
            marginBottom: '0.5rem',
          }}
        >
          {project.subtitle}
        </p>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: '#f0f0f0',
            marginBottom: '1rem',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            lineHeight: 1.7,
            color: '#777777',
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: 'var(--accent-gold, #c9a84c)',
                  lineHeight: 1,
                  marginBottom: '0.3rem',
                }}
              >
                {metric.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  color: '#555555',
                  textTransform: 'uppercase',
                }}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                fontWeight: 400,
                letterSpacing: '0.05em',
                padding: '0.3rem 0.75rem',
                background: 'rgba(201, 168, 76, 0.06)',
                border: '1px solid rgba(201, 168, 76, 0.12)',
                borderRadius: '20px',
                color: 'rgba(201, 168, 76, 0.7)',
                textTransform: 'uppercase',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              header,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
            );
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      style={{
        background: '#000000',
        padding: '6rem 4vw 8rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Subtle top gradient divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
        }}
      />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          ref={headerRef}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '3.5rem',
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
            }}
          >
            Featured Projects
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 400,
              color: '#555555',
              letterSpacing: '0.05em',
            }}
          >
            {PROJECTS.length} Projects
          </span>
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
