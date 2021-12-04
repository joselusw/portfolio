import React from "react";
import { Slide } from "react-awesome-reveal";
import "./Info.css";

const Info: React.FunctionComponent = () => {
  return (
    <div className="info-container">
      <div className="info-title">
        <h1>Some tech I like to use:</h1>
      </div>
      <div className="info">
        <Slide direction="up">
          <div className="tech">
            <img
              alt="Csharp"
              src="https://img.icons8.com/color/48/000000/c-sharp-logo.png"
            />
          </div>
          <div className="tech">
            <img
              alt="Angular"
              src="https://img.icons8.com/color/48/000000/angularjs.png"
            />
          </div>
          <div className="tech">
            <img
              alt="React"
              src="https://img.icons8.com/color/48/000000/react-native.png"
            />
          </div>
          <div className="tech">
            <img
              alt="JavaScript"
              src="https://img.icons8.com/color/48/000000/javascript--v1.png"
            />
          </div>
          <div className="tech">
            <img
              alt="TypeScript"
              src="https://img.icons8.com/color/48/000000/typescript.png"
            />
          </div>
          <div className="tech">
            <img
              alt="html"
              src="https://img.icons8.com/color/48/000000/html-5--v1.png"
            />
          </div>
          <div className="tech">
            <img
              alt="css"
              src="https://img.icons8.com/color/48/000000/css3.png"
            />
          </div>
          <div className="tech">
            <img
              alt="aws"
              src="https://img.icons8.com/color/48/000000/amazon-web-services.png"
            />
          </div>
          <div className="tech">
            <img
              alt="docker"
              src="https://img.icons8.com/color/48/000000/docker.png"
            />
          </div>
          <div className="tech">
            <img
              alt="sass"
              src="https://img.icons8.com/color/48/000000/sass.png"
            />
          </div>
          <div className="tech">
            <img
              alt="mssql"
              src="https://img.icons8.com/color/48/000000/microsoft-sql-server.png"
            />
          </div>
          <div className="tech">
            <img
              alt="webpack"
              src="https://img.icons8.com/color/48/000000/webpack.png"
            />
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default Info;
