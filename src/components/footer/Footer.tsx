import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-info">
				<h1>Your Name</h1>
				<p>Based in Your City</p>
			</div>
			<div className="footer-contact">
				<h3>Contact me</h3>
				<p>And let's get down to work</p>
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
