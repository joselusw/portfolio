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

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  role: string;
  stack: string[];
  metrics: ProjectMetric[];
  link?: string;
  featured?: boolean;
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
  projects: Project[];
  certifications: Certification[];
  technologies: TechSkill[];
}

// Placeholder portfolio data — replace with real content before shipping.
export const PORTFOLIO_DATA: Portfolio = {
  name: "Joselu Gallardo",
  title: "Senior Full-Stack Developer",
  bio: "The best way to predict the future is to build it with .NET and AI",
  birthDate: "1994-07-27",
  location: "Málaga",
  email: "jose.gallardo994@gmail.com",
  photoUrl: "./assets/joselu.png",
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
        "Built and maintained enterprise reporting and CRUD modules serving internal business workflows.",
        "Reduced common request round-trips by introducing stored-procedure-based data access.",
        "Collaborated with a cross-functional team on features from design through deployment.",
      ],
      logoUrl: "assets/prosolution.svg",
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
        "Designed and shipped cloud-native microservices on AWS, containerized with Docker and orchestrated with Kubernetes.",
        "Improved p95 response times by 40%+ by moving latency-sensitive paths to async, event-driven flows.",
        "Adopted a microfrontend architecture that cut cross-team delivery conflicts and release coordination overhead.",
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
  projects: [
    {
      id: "project-1",
      title: "AI-augmented support assistant",
      description:
        "An LLM-powered triage assistant that reads incoming tickets, drafts responses, and routes complex cases to the right team using semantic retrieval over the knowledge base.",
      year: "2025",
      role: "Full-stack lead",
      stack: [".NET", "Semantic Kernel", "Angular", "RAG", "Azure"],
      metrics: [
        { label: "Resolution time", value: "-38%" },
        { label: "Auto-resolved", value: "31%" },
        { label: "CSAT", value: "+9pts" },
      ],
    },
    {
      id: "project-2",
      title: "Real-time trading dashboard",
      description:
        "A low-latency microfrontend platform streaming market data over WebSockets, with order-of-magnitude faster load times and a charting layer rebuilt for sub-60ms interactions.",
      year: "2024",
      role: "Senior engineer",
      stack: [".NET", "AWS", "Kubernetes", "Angular", "WebSockets"],
      metrics: [
        { label: "p95 latency", value: "-42%" },
        { label: "Bundle size", value: "-55%" },
        { label: "Uptime", value: "99.98%" },
      ],
    },
    {
      id: "project-3",
      title: "Enterprise claims platform",
      description:
        "Migrated a monolith into domain-driven microservices, introduced blue/green deployments, and cut monthly incident count while enabling weekly release cadence.",
      year: "2023",
      role: "Platform engineer",
      stack: ["C#", "Docker", "Terraform", "AWS", "OpenTelemetry"],
      metrics: [
        { label: "Release cadence", value: "2×/wk" },
        { label: "Incidents", value: "-60%" },
        { label: "Deploy time", value: "18m → 4m" },
      ],
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
