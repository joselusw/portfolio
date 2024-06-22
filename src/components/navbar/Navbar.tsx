import React from "react";
import "./Navbar.css";
import Icon from "../../assets/logo.png";

const Navbar = ({ isScrolling }) => {
	const toTheTop = () => {
		window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
	};

	return (
		<nav className={`navbar ${isScrolling > 20 ? "scrolling" : null}`}>
			<div className="navbar-div" onClick={toTheTop}>
				<img className="navbar-logo" src={Icon} alt="logo" />
			</div>
		</nav>
	);
};

export default Navbar;
