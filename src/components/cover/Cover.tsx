import React from "react";
import Typewriter from "typewriter-effect";
import "./Cover.css";

const Cover = () => {
  const phrases = [
    ".NET developer",
    "Virgin Angular developer",
    "Chad React Enjoyer",
    "Full time freak",
  ];

  return (
    <div className="cover-container">
      <img
        className="avatar"
        src="https://avatars.githubusercontent.com/u/11831112?v=4"
      />
      <h1>José Luis Gallardo</h1>
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
