import React, { memo, useMemo } from "react";
import "./Education.css";

// Utility function to calculate age dynamically
const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

// Constants extracted outside component to prevent re-creation
const EDUCATION_CONTENT = {
  title: "Know me better",
} as const;

const CERTIFICATIONS = [
  {
    id: "aws-developer",
    title: "AWS Certified Developer",
    provider: "A Cloud Guru",
    graduation: "2024",
  },
  {
    id: "frontend-master",
    title: "Frontend Master",
    provider: "Lemoncoders",
    graduation: "2021",
  },
  {
    id: "superior-apps",
    title: "Técnico Superior en Apps Multiplataforma",
    provider: "I.E.S Portada Alta",
    graduation: "2017",
  },
  {
    id: "sistemas-redes",
    title: "Técnico en Sistemas Microinformáticos y Redes",
    provider: "I.E.S Pedro Espinosa",
    graduation: "2014",
  },
] as const;

interface EducationProps {}

const Education: React.FC<EducationProps> = memo(() => {
  const age = useMemo(() => calculateAge("1994-07-27"), []);

  const paragraphs = useMemo(
    () => [
      `Heya! I am a ${age}-year-old Full-Stack .NET Developer with over 7 years of experience in designing, developing, and maintaining robust web applications.`,
      "Based in Málaga, Spain, I enjoy both frontend and backend technologies, including C#, ASP.NET, Angular, React, and SQL.",
      "Passionate about clean code, open-source contributions, and delivering end-to-end solutions that drive business success. I am currently seeking my next career step to leverage my expertise in a dynamic and innovative environment.",
      "Beyond traditional development, I'm fascinated by the intersection of AI and full-stack development. I love finding ways to make applications more adaptive and user-centric.",
    ],
    [age],
  );

  return (
    <section className="education-container" aria-labelledby="education-title">
      <div className="education-desc">
        <h3 id="education-title">{EDUCATION_CONTENT.title}</h3>
        {paragraphs.map((paragraph, index) => (
          <p key={`para-${index}`}>{paragraph}</p>
        ))}
      </div>

      <div className="education-desc">
        <h3>Education & Certifications</h3>
        <ul
          className="certifications"
          role="list"
          aria-label="Professional certifications"
        >
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id} className="certification-item">
              <span className="certification-title">{cert.title}</span>
              <span className="certification-provider">{cert.provider}</span>
              <span className="certification-graduation">
                Graduation: {cert.graduation}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

Education.displayName = "Education";

export default Education;
