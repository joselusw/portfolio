import React from "react";
import Typewriter from "typewriter-effect";
import "./Cover.css";
import joseluAvatar from "../../assets/joselu.png";

const Cover = () => {
  const phrases = [
    "Senior Full-Stack Developer",
    "AI-Powered Solutions Architect",
    "Cloud-Native Application Builder",
    "DevSecOps & CI/CD Expert",
    "Microservices & Scalable Systems Engineer",
    "React, Node.js & .NET Specialist",
    "Performance Optimization & Security Advocate",
    "Open Source Contributor & Tech Innovator",
  ];

  return (
    <div className="cover-container">
      <img className="avatar" src={joseluAvatar} alt="José Luis Gallardo" />
      <h1>José Luis Gallardo</h1>
      <p className="subtitle">
        Crafting digital experiences with passion and precision
      </p>
      <Typewriter
        options={{
          strings: phrases,
          autoStart: true,
          loop: true,
          cursorClassName: "dynamic-text",
          wrapperClassName: "dynamic-text",
        }}
      />
    </div>
  );
};

export default Cover;
