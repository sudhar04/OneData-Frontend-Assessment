export interface Job {
  id: string;
  title: string;
  company: string;
  experience: number;
  description: string;
  skills: string[];
  logo?: string;
}