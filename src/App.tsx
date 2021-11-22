import React, { useState, useEffect } from "react";
import "./App.css";
import Cover from "./components/cover/Cover";
import Navbar from "./components/navbar/Navbar";
import Education from "./components/education/Education";
import Technologies from "./components/technologies/Technologies";
import Info from "./components/info/Info";
import Footer from "./components/footer/Footer";

function App() {
	const [scrollHeight, setScrollHeight] = useState(0);

	const handleScroll = () => {
		const position = window.pageYOffset;
		setScrollHeight(position);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, [scrollHeight]);

	return (
		<div className="App">
			<Navbar isScrolling={scrollHeight} />
			<Cover />
			<Education />
			<Technologies />
			<Info />
			<Footer />
		</div>
	);
}

export default App;
