export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  tags: string[];
  highlight?: boolean;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}
