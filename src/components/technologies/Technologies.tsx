import React from "react";
import "./Technologies.css";
import ProSolutionLogo from "../../assets/prosolution-logo.png";

const Technologies = () => {
  return (
    <div className="experience-container">
      <div className="experience-title">
        <h2>Cool stuff I've participated</h2>
      </div>

      <div className="cards-container">
        {/* Previous Company - ProSolution */}
        <div className="material-card previous-company">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="logo-container">
              <img
                src={ProSolutionLogo}
                alt="ProSolution Logo"
                className="company-logo"
              />
            </div>
            <div className="card-details">
              <div className="job-title">
                <span className="period">2017 - 2020</span>
                <h3>Junior .NET Engineer</h3>
              </div>
              <div className="job-description">
                <p>
                  At ProSolution, I started my career as a Junior .NET Engineer,
                  working with C#, ASP.NET, and SQL Server. I gained valuable
                  experience in enterprise application development.
                </p>
              </div>
            </div>
          </div>
          <div className="card-accent"></div>
        </div>

        {/* Current Company - Verisk */}
        <div className="material-card current-company">
          <div className="card-background"></div>
          <div className="card-content">
            <div className="logo-container">
              <img
                src="https://www.verisk.com/49600d/contentassets/87d1b64b5c9a48f09ef33019baa650d3/verisk-analytics-logo-right.png"
                alt="Verisk Analytics Logo"
                className="company-logo"
              />
            </div>
            <div className="card-details">
              <div className="job-title">
                <span className="period">2020 - Current</span>
                <h3>Senior .NET Engineer</h3>
              </div>
              <div className="job-description">
                <p>
                  I am currently working at Verisk as a Senior .NET Engineer. My
                  main responsibilities include developing and maintaining
                  applications using C#, ASP.NET, and Angular.
                </p>
              </div>
            </div>
          </div>
          <div className="card-accent"></div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
