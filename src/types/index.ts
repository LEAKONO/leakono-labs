export interface TechNode {
  id: string;
  label: string;
  group: 'language' | 'cloud' | 'database' | 'backend' | 'frontend' | 'data' | 'devops';
  connections: string[];
  proficiency: number;
}

export interface ArchNode {
  id: string;
  label: string;
  type: 'source' | 'ingestion' | 'storage' | 'transform' | 'warehouse' | 'consumption';
  tech: string;
  details: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'data' | 'software';
  stack: string[];
  architecture: ArchNode[];
  metrics: Metric[];
  githubUrl: string;
  status: 'production' | 'active' | 'archived';
  description: string;
}

export interface Metric {
  label: string;
  value: string;
  unit: string;
}

export interface PipelineLayer {
  id: string;
  name: string;
  label: string;
  description: string;
  technologies: string[];
  challenge: string;
  scaling: string;
  color: string;
}

export interface SoftwareProject {
  id: string;
  title: string;
  tagline: string;
  stack: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  auth: string[];
  githubUrl: string;
  features: string[];
}

export interface SystemTopic {
  id: string;
  title: string;
  category: string;
  description: string;
  keyPoints: string[];
}