import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Cover from "./components/cover/Cover";
import Navbar from "./components/navbar/Navbar";
import Education from "./components/education/Education";
import Technologies from "./components/technologies/Technologies";
import Info from "./components/info/Info";
import Footer from "./components/footer/Footer";

function App() {
  const [scrollHeight, setScrollHeight] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScrollHeight(position);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
