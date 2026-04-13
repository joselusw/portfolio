export interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  period: string;
  technologies: string[];
  achievements: string[];
  link?: string;
  logoUrl?: string;
  isCurrent?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issued: string;
  credentialUrl?: string;
}

export interface TechSkill {
  category: string;
  skills: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Portfolio {
  name: string;
  title: string;
  bio: string;
  birthDate?: string;
  location?: string;
  email: string;
  photoUrl?: string;
  social: SocialLink[];
  jobs: Job[];
  certifications: Certification[];
  technologies: TechSkill[];
}

// Placeholder portfolio data
export const PORTFOLIO_DATA: Portfolio = {
  name: "Joselu Gallardo",
  title: "Senior Full-Stack Developer",
  bio: "Crafting digital experiences with passion and precision",
  birthDate: "1994-07-27",
  location: "Málaga, Spain",
  email: "jose.gallardo994@gmail.com",
  photoUrl: "assets/joselu.png",
  social: [
    { name: "GitHub", url: "https://github.com/joselusw", icon: "github" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/joselugallardo/",
      icon: "linkedin",
    },
    { name: "CV", url: "assets/CV.pdf", icon: "cv" },
    { name: "Email", url: "mailto:jose.gallardo994@gmail.com", icon: "mail" },
  ],
  jobs: [
    {
      id: "job-1",
      company: "ProSolution",
      title: "Junior .NET Engineer",
      description:
        "Started my career working with C#, ASP.NET, and SQL Server, gaining valuable experience in enterprise application development.",
      period: "2017 — 2020",
      technologies: ["C#", "ASP.NET", "SQL Server", ".NET Framework"],
      achievements: [
        "Started my career working with C#, ASP.NET, and SQL Server",
        "Gained valuable experience in enterprise application development",
        "Collaborated in the full software development lifecycle",
      ],
      logoUrl: "assets/prosolution.png",
      isCurrent: false,
    },
    {
      id: "job-2",
      company: "Verisk Business Solutions",
      title: "Senior .NET Engineer",
      description:
        "Engineering scalable microservices with C#, Docker, and Kubernetes, focusing on cloud-native architectures and high-availability deployments on AWS.",
      period: "2020 — Present",
      technologies: [
        ".NET",
        "Docker",
        "AWS",
        "Microservices",
        "Microfrontends",
      ],
      achievements: [
        "Developing and maintaining enterprise-scale applications",
        "Architecting cloud-native microservices on Azure",
        "Leading a team of developers to deliver high-quality software solutions",
      ],
      logoUrl: "https://www.verisksequel.com/media/4yygxqsr/verisk_logo.svg",
      isCurrent: true,
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Developer",
      issuer: "A Cloud Guru",
      issued: "2024",
    },
    {
      id: "cert-2",
      name: "Frontend Master",
      issuer: "Lemoncoders",
      issued: "2021",
    },
    {
      id: "cert-3",
      name: "Técnico Superior en Apps Multiplataforma",
      issuer: "I.E.S Portada Alta",
      issued: "2017",
    },
    {
      id: "cert-4",
      name: "Técnico en Sistemas Microinformáticos y Redes",
      issuer: "I.E.S Pedro Espinosa",
      issued: "2014",
    },
  ],
  technologies: [
    {
      category: "Frontend",
      skills: [
        "Angular 19",
        "TypeScript",
        "HTML5",
        "CSS3/SCSS",
        "TailwindCSS",
        "JavaScript ES6+",
      ],
    },
    {
      category: "Animation & Interaction",
      skills: [
        "GSAP",
        "Framer Motion",
        "CSS Animations",
        "WebGL (Three.js)",
        "SVG",
      ],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "GitHub Actions", "Webpack", "Vite"],
    },
    {
      category: "Performance & SEO",
      skills: [
        "Lighthouse",
        "Web Vitals",
        "SSG/SSR",
        "Image Optimization",
        "SEO Fundamentals",
      ],
    },
  ],
};
