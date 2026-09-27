import type { Job } from "../types/job";

export const jobs: Job[] = [
  {
    id: "job-1",
    logo: "https://logo.clearbit.com/microsoft.com",
    title: "Frontend Developer",
    company: "Microsoft",
    experience: 1,
    skills: ["React", "TypeScript", "JavaScript", "CSS"],
    description:
      "Build responsive and scalable web applications using modern frontend technologies."
  },

  {
    id: "job-2",
    logo: "https://logo.clearbit.com/google.com",
    title: "React Developer",
    company: "Google",
    experience: 2,
    skills: ["React", "TypeScript", "HTML", "CSS"],
    description:
      "Develop reusable React components and create high-quality user experiences."
  },

  {
    id: "job-3",
    logo: "https://logo.clearbit.com/amazon.com",
    title: "UI Developer",
    company: "Amazon",
    experience: 1,
    skills: ["React", "JavaScript", "Tailwind CSS", "Git"],
    description:
      "Create responsive interfaces and collaborate with designers and backend engineers."
  },

  {
    id: "job-4",
    logo: "https://logo.clearbit.com/infosys.com",
    title: "Junior Frontend Engineer",
    company: "Infosys",
    experience: 0,
    skills: ["React", "JavaScript", "HTML", "CSS"],
    description:
      "Work with the frontend team to develop and maintain modern web applications."
  },

  {
    id: "job-5",
    logo: "https://logo.clearbit.com/zoho.com",
    title: "Frontend Engineer",
    company: "Zoho",
    experience: 2,
    skills: ["React", "TypeScript", "REST API", "Git"],
    description:
      "Build performant web interfaces and integrate frontend applications with REST APIs."
  }
];