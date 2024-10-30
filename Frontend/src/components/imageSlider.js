import React from "react";
import { useNavigate } from 'react-router-dom';
import "../pages/dashboard.css"; // Make sure the path is correct
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import mangoImage from "../pages/collections/images/fruits.jpg";
import vegetableImage from "../pages/collections/images/vegetables.jpg";
import nutsImage from "../pages/collections/images/nuts.jpg";
import spicesImage from "../pages/collections/images/spices.jpg";
// import oilsImage from "../pages/collections/images/oil1.jpg";


function ImageSlider() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const navigate = useNavigate();

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={mangoImage} alt="Slider 1" />
          <div className="slide-content left">
            <h1 className="left">Every bite is a celebration of nature's goodness.</h1>
            <button type="button" class="btn btn-success" onClick={()=>{navigate('/fruits', {replace:true})}}>Shop All</button>
          </div>
        </div>
        <div className="slide">
          <img src={vegetableImage} alt="Slider 2" />
          <div className="slide-content left">
            <h1 className="left">From farm to table, a journey of pure, organic delight.</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/vegetables', {replace:true})}}>Browse </button>
          </div>
        </div>
        <div className="slide">
          <img src={nutsImage} alt="Slider 3" />
          <div className="slide-content right">
            <h1 className="right">Taste the Original</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/nuts', {replace:true})}}>Shop Now</button>
          </div>
        </div>
        <div className="slide">
          <img src={spicesImage} alt="Slider 4" />
          <div className="slide-content right">
            <h1 className="right">Dive into a world of aroma and taste with nature's finest spices.</h1>
            <button type="button" class="btn btn-success " onClick={()=>{navigate('/spices', {replace:true})}}>Browse Product</button>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
}

export default ImageSlider;
