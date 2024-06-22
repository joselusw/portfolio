import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <h1>José Gallardo</h1>
        <p>Based in Málaga</p>
      </div>
      <div className="footer-contact">
        <a href="mailto:jose.gallardo994@gmail.com">· Contact me</a>
        <br />
        <a href="https://drive.google.com/file/d/1HrZoTKzEUHFTOgLVE94NA1fRtZUk4nRq/view?usp=sharing">
          · Download a copy of my CV
        </a>
        <p>And let's get down to work!!</p>
      </div>
      <div className="footer-sns">
        <div className="design-by">Reach me out on social media:</div>
        <div className="sns-links">
          <a
            href="https://www.linkedin.com/in/jos%C3%A9gallardo/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-linkedin linkedin"></i>
          </a>
          <a
            href="https://github.com/JoseluSW"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github github"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
