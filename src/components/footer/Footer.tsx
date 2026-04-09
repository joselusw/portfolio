import React, { memo } from "react";
import "./Footer.css";

// Constants extracted outside component to prevent re-creation
const CONTACT_LINKS = [
  {
    href: "mailto:jose.gallardo994@gmail.com",
    text: "Contact me",
    ariaLabel: "Send email to José Gallardo",
  },
  {
    href: "https://drive.google.com/file/d/1HrZoTKzEUHFTOgLVE94NA1fRtZUk4nRq/view?usp=sharing",
    text: "Download a copy of my CV",
    ariaLabel: "Download José Gallardo's CV",
  },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/jos%C3%A9gallardo/",
    icon: "fab fa-linkedin",
    className: "linkedin",
    ariaLabel: "Visit José Gallardo's LinkedIn profile",
  },
  {
    href: "https://github.com/JoseluSW",
    icon: "fab fa-github",
    className: "github",
    ariaLabel: "Visit José Gallardo's GitHub profile",
  },
] as const;

interface FooterProps {}

const Footer: React.FC<FooterProps> = memo(() => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-info">
        <h1>José Gallardo</h1>
        <p>Based in Málaga</p>
      </div>

      <div className="footer-contact">
        {CONTACT_LINKS.map((link, index) => (
          <React.Fragment key={link.href}>
            <a
              href={link.href}
              aria-label={link.ariaLabel}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
            >
              · {link.text}
            </a>
            {index < CONTACT_LINKS.length - 1 && <br />}
          </React.Fragment>
        ))}
        <p>And let's get down to work!!</p>
      </div>

      <div className="footer-sns">
        <div className="design-by">Reach me out on social media:</div>
        <div className="sns-links" role="list">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="social-link"
            >
              <i
                className={`${social.icon} ${social.className}`}
                aria-hidden="true"
              ></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
