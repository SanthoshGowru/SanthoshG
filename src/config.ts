export interface SiteConfig {
  language: string
  siteTitle: string
  siteDescription: string
}

export interface NavigationLink {
  label: string
  href: string
}

export interface NavigationConfig {
  brandName: string
  links: NavigationLink[]
}

export interface HeroConfig {
  titleLines: string[]
  subtitle: string
}

export interface ManifestoConfig {
  headingText: string
  bodyText: string
  videoPath: string
}

export interface ExhibitionArticleSection {
  heading: string
  body: string
}

export interface ExhibitionItem {
  slug: string
  title: string
  image: string
  year: string
  eyebrow: string
  intro: string
  sections: ExhibitionArticleSection[]
}

export interface ExhibitionsConfig {
  sectionLabel: string
  countLabel: string
  detailBackText: string
  items: ExhibitionItem[]
}

export interface PavilionVideoItem {
  src: string
  caption: string
}

export interface PavilionsConfig {
  sectionLabel: string
  videos: PavilionVideoItem[]
}

export interface FooterConfig {
  visitLabel: string
  visitLines: string[]
  connectLabel: string
  connectLinks: { label: string; href: string }[]
  brandName: string
  rightsText: string
  coordinatesText: string
}

export const siteConfig: SiteConfig = {
  language: "en",
  siteTitle: "Santhosh Gowru | Data Engineer",
  siteDescription: "Data Engineer with 4+ years experience architecting ETL pipelines, Spark processing, Kafka streaming, and cloud data infrastructure across AWS and Azure.",
}

export const navigationConfig: NavigationConfig = {
  brandName: "SG",
  links: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
}

export const heroConfig: HeroConfig = {
  titleLines: ["SANTHOSH", "GOWRU"],
  subtitle: "DATA ENGINEER — BUILDING DATA UNIVERSES",
}

export const manifestoConfig: ManifestoConfig = {
  headingText: "Engineering Data Gravity",
  bodyText: "I architect data systems that process millions of records daily — from ETL pipelines in Apache Spark to real-time streams in Kafka. With 4+ years building scalable data infrastructure across AWS and Azure, I transform raw data into strategic intelligence. Every dataset has a story; I build the pipelines that tell it.",
  videoPath: "/videos/about-video.mp4",
}

export const exhibitionsConfig: ExhibitionsConfig = {
  sectionLabel: "Career Trajectory",
  countLabel: "3 Positions",
  detailBackText: "Back to Trajectory",
  items: [
    {
      slug: "berkshire-hathaway",
      title: "Berkshire Hathaway",
      image: "/images/hero-hover-1.jpg",
      year: "2024–Present",
      eyebrow: "Data Engineer",
      intro: "Designed and implemented robust ETL pipelines processing 500k records daily, leveraging Apache Spark, Kafka, Snowflake, and dbt to drive enterprise-wide data transformation.",
      sections: [
        {
          heading: "ETL Pipeline Architecture",
          body: "Designed and implemented robust ETL pipelines to process 500,000 records daily, improving data availability and accuracy across business units. This led to more efficient decision-making processes and faster reporting cycles. The pipelines handled diverse data sources including transactional databases, API endpoints, and flat files, orchestrating complex transformations while maintaining data integrity and audit trails.",
        },
        {
          heading: "Spark Performance Optimization",
          body: "Leveraged Apache Spark for distributed data processing, optimizing the performance of batch jobs by reducing execution time by 30%. Implemented advanced partitioning strategies, broadcast joins for small lookup tables, and tuned executor memory allocation. These optimizations ensured faster and more reliable data delivery for critical business reporting.",
        },
        {
          heading: "Real-Time Data Ingestion",
          body: "Implemented and maintained real-time data ingestion pipelines using Apache Kafka, significantly reducing data latency from hours to seconds. This enhanced the responsiveness of real-time analytics applications, enabling business stakeholders to make decisions based on the most current data available. Built Kafka Connect integrations with multiple source systems.",
        },
        {
          heading: "Snowflake Migration & dbt Automation",
          body: "Utilized Snowflake for scalable cloud data warehousing, migrating critical datasets from legacy systems and achieving a 40% reduction in storage costs while increasing query performance. Automated data transformation processes using dbt (Data Build Tool), eliminating manual reporting tasks and achieving a 95% automation rate in recurring data transformations.",
        },
      ],
    },
    {
      slug: "draxo-infotech",
      title: "Draxo Infotech",
      image: "/images/hero-hover-2.jpg",
      year: "2022–2023",
      eyebrow: "Data Engineer",
      intro: "Engineered automated data pipelines in AWS Glue handling 10TB monthly, led Snowflake migration with star schema design, and established CI/CD pipelines using Terraform and Docker.",
      sections: [
        {
          heading: "AWS Glue Pipeline Engineering",
          body: "Engineered and maintained automated data pipelines in AWS Glue, successfully handling over 10 TB of data monthly. Implemented efficient ETL jobs using PySpark that processed diverse data formats including JSON, Parquet, and CSV. The pipeline architecture resulted in a 40% improvement in data processing efficiency and reliability, with automated error handling and retry mechanisms.",
        },
        {
          heading: "Snowflake Migration & Data Modeling",
          body: "Led the migration from on-premise systems to Snowflake, optimizing data storage, performance, and cost-efficiency by reducing storage overheads by 15%. Designed and implemented star schema data models in Snowflake, enabling faster and more efficient query execution and improving report generation times by 35%, allowing the team to generate insights more quickly.",
        },
        {
          heading: "SQL Optimization & CI/CD",
          body: "Streamlined data workflows by optimizing complex SQL queries, cutting processing time by 50% through strategic indexing, query rewriting, and materialized views. Established CI/CD pipelines using Terraform and Docker for seamless deployment and management of data engineering environments, reducing manual errors by 70% and increasing deployment efficiency across the team.",
        },
      ],
    },
    {
      slug: "bright-mind-technologies",
      title: "Bright Mind Technologies",
      image: "/images/hero-hover-3.jpg",
      year: "2020–2021",
      eyebrow: "Data Analyst",
      intro: "Conducted in-depth business data analysis using SQL and Excel, developed automated Tableau dashboards, and delivered data-driven recommendations that saved $200K annually.",
      sections: [
        {
          heading: "Business Intelligence & Analysis",
          body: "Conducted in-depth analysis of business data using SQL and Excel, uncovering key trends that led to a 10% improvement in customer retention. Developed and automated dashboard reports using Tableau, reducing report generation time from 3 hours to 30 minutes, saving significant time for the analytics team and providing real-time insights to stakeholders.",
        },
        {
          heading: "A/B Testing & Database Optimization",
          body: "Managed and analyzed the results of A/B testing for various marketing campaigns, improving conversion rates by 20% and contributing to a more targeted and effective marketing strategy. Optimized PostgreSQL database performance, reducing query processing times by 25% through index optimization and query refactoring, ensuring smoother and faster access to business-critical data.",
        },
        {
          heading: "Strategic Impact",
          body: "Delivered data-driven recommendations to management based on detailed analysis, leading to process optimizations that saved the company approximately $200K annually. Identified inefficiencies in resource allocation and supply chain operations through comprehensive data modeling and statistical analysis, directly contributing to the organization's bottom line.",
        },
      ],
    },
  ],
}

export const pavilionsConfig: PavilionsConfig = {
  sectionLabel: "Technical Constellation",
  videos: [
    {
      src: "/videos/pavilion-video.mp4",
      caption: "Skills in orbital motion",
    },
  ],
}

export const footerConfig: FooterConfig = {
  visitLabel: "Location",
  visitLines: ["San Antonio, Texas", "Open to Remote & Relocation"],
  connectLabel: "Connect",
  connectLinks: [
    { label: "santhoshgowru8@gmail.com", href: "mailto:santhoshgowru8@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/santhoshgowru/" },
    { label: "+1 (210)-951-0208", href: "tel:+12109510208" },
  ],
  brandName: "SANTHOSH",
  rightsText: "© 2025 Santhosh Gowru. All rights reserved.",
  coordinatesText: "29.4241° N, 98.4936° W",
}