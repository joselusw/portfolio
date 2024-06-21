import React from "react";
import "./Technologies.css";

const Technologies = () => {
  return (
    <div className="experience-container">
      <div className="experience-title">
        <h2>Cool stuff I've participated:</h2>
      </div>
      <div className="blog-slider">
        <div className="blog-slider__wrp swiper-wrapper">
          <div className="blog-slider__item swiper-slide">
            <div className="blog-slider__img">
              <img
                src="https://www.verisk.com/494d70/contentassets/faca0466a4ed4d7eadc22dcaa8ac2083/verisk_main-nav-logo-5.png"
                alt=""
              />
            </div>
            <div className="blog-slider__content">
              <span className="blog-slider__code">26 December 2019</span>
              <div className="blog-slider__title">Lorem Ipsum Dolor</div>
              <div className="blog-slider__text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Recusandae voluptate repellendus magni illo ea animi?{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
