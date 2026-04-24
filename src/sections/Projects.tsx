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
    title: 'Azure Fabric Lakehouse Platform',
    subtitle: 'Enterprise Data Architecture',
    description:
      'Built an end-to-end Microsoft Fabric Lakehouse platform at Elevance Health, ingesting 500K+ daily records via ADF pipelines. Designed Medallion Architecture (Bronze/Silver/Gold) on ADLS Gen2 and Azure Synapse, delivering self-service analytics to 150+ business users via Power BI dashboards with Dataflows Gen2.',
    image: '/images/project-pipeline.png',
    techStack: ['Microsoft Fabric', 'ADF', 'Azure Synapse', 'ADLS Gen2', 'Power BI'],
    metrics: [
      { label: 'Daily Records', value: '500K+' },
      { label: 'Data Availability', value: '+45%' },
      { label: 'Business Users', value: '150+' },
    ],
  },
  {
    title: 'Real-Time Streaming Pipeline',
    subtitle: 'Kafka & Azure Event Hubs',
    description:
      'Designed and deployed real-time data ingestion pipelines using Apache Kafka and Azure Event Hubs for healthcare analytics at Elevance Health. Optimized PySpark batch jobs on Azure Databricks with Delta Lake, reducing execution time by 30% and cutting data latency from hours to minutes for live reporting.',
    image: '/images/project-cloud-cost.png',
    techStack: ['Kafka', 'Event Hubs', 'Databricks', 'PySpark', 'Delta Lake'],
    metrics: [
      { label: 'Latency Cut', value: 'Hrs→Min' },
      { label: 'Execution Time', value: '-30%' },
      { label: 'SLA Compliance', value: '100%' },
    ],
  },
  {
    title: 'Snowflake Migration & FinOps',
    subtitle: 'Cloud Cost Optimization',
    description:
      'Led enterprise Snowflake migration from on-premise systems and legacy Oracle/SQL Server databases. Implemented clustering keys, materialized views, and star schema design to reduce storage costs by 40% while increasing query performance. Automated 95% of transformation workflows using dbt with modular models and documentation.',
    image: '/images/project-etl.png',
    techStack: ['Snowflake', 'dbt', 'Terraform', 'Azure DevOps', 'Docker'],
    metrics: [
      { label: 'Cost Reduction', value: '40%' },
      { label: 'Automation Rate', value: '95%' },
      { label: 'Deploy Errors', value: '-70%' },
    ],
  },
  {
    title: 'Data Governance & Compliance Hub',
    subtitle: 'GDPR/CCPA Enterprise Compliance',
    description:
      'Architected a comprehensive data governance platform enforcing GDPR and CCPA compliance across all Azure data assets. Implemented PII masking, RBAC, and audit logging. Integrated Great Expectations for automated quality checks maintaining 99%+ accuracy across production datasets, with data lineage tracking and schema validation.',
    image: '/images/project-data-quality.png',
    techStack: ['Great Expectations', 'Azure ML', 'dbt', 'Python', 'ADLS Gen2'],
    metrics: [
      { label: 'Data Accuracy', value: '99%+' },
      { label: 'Compliance', value: 'GDPR' },
      { label: 'Datasets Governed', value: '500+' },
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
