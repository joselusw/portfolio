import React from "react";
import "./Technologies.css";

const Technologies = () => {
  return (
    <div className="experience-container">
      <div className="experience-title">
        <h2>Cool stuff I've made:</h2>
      </div>

      <div className="card-container">
        <div className="card">
          <div className="card-image">
            <img
              src="https://s3-symbol-logo.tradingview.com/verisk-analytics--600.png"
              alt="Avatar"
            ></img>
          </div>
          <div className="container">
            <h4>
              <b>Sequel Business Solutions</b>
            </h4>
            <p>Full Stack .NET developer</p>
            <p>2020 - Currently</p>
          </div>
        </div>

        <div className="card">
          <div className="card-image">
            <img
              src="https://ambergreen.eu/wp-content/uploads/2018/12/ambergreen_logo.png"
              alt="Avatar"
            ></img>
          </div>
          <div className="container">
            <h4>
              <b>Ambergreen S.L.</b>
            </h4>
            <p>.NET developer</p>
            <p>2017 - 2020</p>
          </div>
        </div>

        <div className="card">
          <div className="card-image">
            <img
              src="https://play-lh.googleusercontent.com/TB17CFQI5FY-Mwil7yda0GPTM-0pmj-IpaMu8fO0lQC09JCal_PkC3OYExZ2vGS3vQ=s180-rw"
              alt="Avatar"
            ></img>
          </div>
          <div className="container">
            <h4>
              <b>Math Duel</b>
            </h4>
            <p>Designer and developer</p>
            <p>2017</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
