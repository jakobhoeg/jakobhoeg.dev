export interface WorkCardProps {
  id: number;
  title: string;
  company: string;
  logoSrc: string;
  description: string;
  type: string;
  location?: string;
  timeframe: string;
}

export interface ProjectCardProps {
  id: number;
  title: string;
  videoUrl?: string;
  videoAlt?: string;
  description: string;
  showcaseUrl?: string;
  githubUrl?: string;
  skills: string[];
}
