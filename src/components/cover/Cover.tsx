import React, { memo } from "react";
import Typewriter from "typewriter-effect";
import "./Cover.css";
import joseluAvatar from "../../assets/joselu.png";

// Constants extracted outside component to prevent re-creation on each render
const PROFESSION_PHRASES = [
  "Senior Full-Stack Developer",
  "AI-Powered Solutions Architect",
  "Cloud-Native Application Builder",
  "DevSecOps & CI/CD Expert",
  "Microservices & Scalable Systems Engineer",
  "React, Node.js & .NET Specialist",
  "Performance Optimization & Security Advocate",
  "Open Source Contributor & Tech Innovator",
] as const;

const TYPEWRITER_OPTIONS = {
  strings: PROFESSION_PHRASES,
  autoStart: true,
  loop: true,
  cursorClassName: "dynamic-text",
  wrapperClassName: "dynamic-text",
} as const;

interface CoverProps {}

const Cover: React.FC<CoverProps> = memo(() => {
  return (
    <section
      className="cover-container"
      role="banner"
      aria-label="Portfolio cover"
    >
      <img
        className="avatar"
        src={joseluAvatar}
        alt="José Luis Gallardo - Senior Full-Stack Developer"
        loading="eager"
        width="300"
        height="300"
      />
      <h1>José Luis Gallardo</h1>
      <p className="subtitle">
        Crafting digital experiences with passion and precision
      </p>
      <div aria-live="polite" aria-atomic="true">
        <Typewriter options={TYPEWRITER_OPTIONS} />
      </div>
    </section>
  );
});

Cover.displayName = "Cover";

export default Cover;
