import React from "react";
import "./Education.css";

const Education = () => {
  return (
    <div className="education-container">
      <div className="education-desc">
        <h3>Know me better</h3>
        <p>
          Heya! I am a 29-year-old Full-Stack .NET Developer with over 7 years
          of experience in designing, developing, and maintaining robust web
          applications.
        </p>
        <br />
        <p>
          Based in Málaga, Spain, I enjoy both frontend and backend
          technologies, including C#, ASP.NET, Angular, React, and SQL.
        </p>
        <br />
        <p>
          Passionate about clean code, open-source contributions, and delivering
          end-to-end solutions that drive business success. I am currently
          seeking my next career step to leverage my expertise in a dynamic and
          innovative environment.
        </p>
      </div>
      <div className="education-desc">
        <h3>Education & Certifications</h3>
        <ul className="certifications">
          <li className="certification-item">
            <span className="certification-title">AWS Certified Developer</span>{" "}
            <span className="certification-provider">A Cloud Guru</span>
            <span className="certification-graduation">Graduation: 2024</span>
          </li>
          <li className="certification-item">
            <span className="certification-title">Frontend Master</span>
            <span className="certification-provider">Lemoncoders</span>
            <span className="certification-graduation">Graduation: 2021</span>
          </li>
          <li className="certification-item">
            <span className="certification-title">
              Técnico Superior en Apps Multiplataforma
            </span>
            <span className="certification-provider">I.E.S Portada Alta</span>
            <span className="certification-graduation">Graduation: 2017</span>
          </li>
          <li className="certification-item">
            <span className="certification-title">
              Técnico en Sistemas Microinformáticos y Redes
            </span>
            <span className="certification-provider">I.E.S Pedro Espinosa</span>
            <span className="certification-graduation">Graduation: 2014</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Education;
