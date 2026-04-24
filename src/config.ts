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
  siteTitle: "Santhosh Shetty | Senior Data Engineer",
  siteDescription: "Senior Data Engineer with 5+ years building enterprise data pipelines across healthcare and technology sectors on Microsoft Azure, Fabric, Databricks, Snowflake, and Kafka.",
}

export const navigationConfig: NavigationConfig = {
  brandName: "SS",
  links: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
}

export const heroConfig: HeroConfig = {
  titleLines: ["SANTHOSH", "SHETTY"],
  subtitle: "SENIOR DATA ENGINEER — ARCHITECTING ENTERPRISE DATA ECOSYSTEMS",
}

export const manifestoConfig: ManifestoConfig = {
  headingText: "Engineering Data at Scale",
  bodyText: "5+ years building and maintaining enterprise data pipelines across healthcare (Elevance Health) and technology (Hexaware, Intex) sectors on Microsoft Azure and Microsoft Fabric. From raw ingestion to BI-ready data — ADF, Databricks, PySpark, Delta Lake, dbt, and Snowflake. I build real-time streaming pipelines with Kafka and Azure Event Hubs, cutting data latency from hours to minutes. Every pipeline I build powers better decisions.",
  videoPath: "/videos/about-video.mp4",
}

export const exhibitionsConfig: ExhibitionsConfig = {
  sectionLabel: "Career Trajectory",
  countLabel: "3 Positions",
  detailBackText: "Back to Trajectory",
  items: [
    {
      slug: "elevance-health",
      title: "Elevance Health",
      image: "/images/hero-hover-1.jpg",
      year: "2024–Present",
      eyebrow: "Senior Data Engineer",
      intro: "Built ADF and Microsoft Fabric Lakehouse pipelines ingesting 500K+ daily records, designed Medallion Architecture on ADLS Gen2, and led Snowflake migration reducing storage costs by 40%.",
      sections: [
        {
          heading: "ADF & Microsoft Fabric Pipelines",
          body: "Built ADF and Microsoft Fabric Lakehouse pipelines ingesting 500K+ daily records, improving data availability by 45%. Used Microsoft Fabric Dataflows Gen2 to cut transformation time and deliver self-service analytics to 150+ business users via Power BI dashboards. The pipeline architecture ensures governed, reliable data access for both BI and ML workloads across the enterprise.",
        },
        {
          heading: "Medallion Architecture & Azure Synapse",
          body: "Designed Medallion Architecture (Bronze/Silver/Gold) on ADLS Gen2 and Azure Synapse, enabling governed data access for BI and ML workloads. This layered approach ensures raw data is progressively refined, validated, and enriched — providing business teams with trustworthy, analytics-ready datasets while maintaining full data lineage and audit trails.",
        },
        {
          heading: "Real-Time Streaming with Kafka & Event Hubs",
          body: "Built real-time ingestion pipelines using Kafka and Azure Event Hubs, cutting data latency from hours to minutes. Optimized PySpark batch jobs on Azure Databricks with Delta Lake, reducing execution time by 30% and meeting SLA requirements. These streaming capabilities enabled live analytics and reporting for critical healthcare operations.",
        },
        {
          heading: "Snowflake Migration & dbt Automation",
          body: "Led Snowflake migration from on-premise systems, reducing storage costs by 40% through clustering keys and materialized views. Automated transformation workflows with dbt — modular models, unit tests, documentation — achieving 95% automation of recurring tasks. Implemented GDPR and CCPA data governance: PII masking, RBAC, and audit logging across all Azure data assets.",
        },
      ],
    },
    {
      slug: "hexaware-technologies",
      title: "Hexaware Technologies",
      image: "/images/hero-hover-2.jpg",
      year: "2022–2023",
      eyebrow: "Data Engineer",
      intro: "Designed ADF pipelines processing 10+ TB monthly, built PySpark pipelines on Azure Databricks for feature engineering, and led Oracle/SQL Server to Snowflake migration.",
      sections: [
        {
          heading: "ADF Pipeline Engineering & Azure Databricks",
          body: "Designed and maintained ADF pipelines processing 10+ TB monthly, improving efficiency by 40% through error handling, retry logic, and alerting. Built PySpark pipelines on Azure Databricks for feature engineering, supporting ML model training on Azure Machine Learning. These pipelines handled diverse data formats and complex transformations with enterprise-grade reliability.",
        },
        {
          heading: "Hybrid Cloud & Snowflake Migration",
          body: "Contributed to AWS Glue ETL jobs and S3 data lake ingestion in a hybrid Azure/AWS environment. Led Oracle and SQL Server to Snowflake migration, reducing storage overhead by 15%. Set up CI/CD pipelines with Terraform and Docker on Azure DevOps, cutting deployment errors by 70% and enabling reproducible, auditable infrastructure deployments.",
        },
        {
          heading: "Workflow Orchestration & Data Quality",
          body: "Configured Apache Airflow DAGs for multi-step workflow orchestration with SLA monitoring and failure alerting. Enforced data quality using Great Expectations, maintaining 99%+ accuracy across all production datasets. Built comprehensive monitoring dashboards to track pipeline health, data freshness, and processing throughput in real time.",
        },
      ],
    },
    {
      slug: "intex-technologies",
      title: "Intex Technologies",
      image: "/images/hero-hover-3.jpg",
      year: "2020–2021",
      eyebrow: "Data Analyst",
      intro: "Analyzed customer behavior using SQL and Python, built automated Power BI dashboards for C-level stakeholders, and developed a churn prediction model achieving 82% accuracy.",
      sections: [
        {
          heading: "Customer Analytics & Power BI",
          body: "Analyzed customer behavior using SQL and Python (Pandas, NumPy, Matplotlib), driving a 10% improvement in retention rates. Built and automated Power BI dashboards, cutting report generation from 3 hours to 30 minutes for C-level stakeholders. These insights provided leadership with actionable, real-time visibility into customer trends and business performance.",
        },
        {
          heading: "Machine Learning & A/B Testing",
          body: "Built a customer churn prediction model using scikit-learn (logistic regression, random forest), achieving 82% accuracy. Ran A/B testing for marketing campaigns using t-tests and chi-square analysis, improving conversion rates by 20%. These data science initiatives contributed directly to more targeted marketing strategies and higher customer lifetime value.",
        },
        {
          heading: "Database Optimization & Cost Savings",
          body: "Optimized PostgreSQL schemas and indexing, reducing query execution time by 25%. Identified process inefficiencies through data analysis, delivering approximately $200K in annual savings. The combination of technical optimization and business-focused analytics established a culture of data-driven decision-making across the organization.",
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
    { label: "santhoshshettyde@gmail.com", href: "mailto:santhoshshettyde@gmail.com" },
    { label: "LinkedIn", href: "https://linkedin.com/in/santhoshshetty" },
    { label: "+1 (726)-256-2641", href: "tel:+17262562641" },
  ],
  brandName: "SANTHOSH",
  rightsText: "© 2025 Santhosh Shetty. All rights reserved.",
  coordinatesText: "29.4241° N, 98.4936° W",
}