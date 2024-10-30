import React, { useState } from "react";
import "../dashboard.css";
import { Link } from "react-router-dom";

import mangoImage from "./images/mango1.jpg";
import vegetableImage from "./images/capcicum.jpg";
import nutsImage from "./images/nuts-5503121_1280.jpg";
import spicesImage from "./images/spic.jpg"
import oilImage from "./images/oil1.jpg";

function Collections() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (scrollAmount) => {
    const cardWidth = 200; // Width of each circular card
    const container = document.querySelector(".circular-card-container");
    const maxScroll = container.scrollWidth - container.clientWidth;

    let newPosition = scrollPosition + scrollAmount * cardWidth;
    if (newPosition < 0) newPosition = 0;
    if (newPosition > maxScroll) newPosition = maxScroll;

    container.scrollTo({ left: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };

  return (
    <div className="collection">
      <div className="shop-title-container">
        <h1 className="shop-title">Shop</h1>
      </div>

      <div className="scroll-container">
        <div className="scroll-arrow scroll-arrow-left " onClick={() => handleScroll(-1)}>
          &lt;
        </div>
        <div className="circular-card-container">
          <div>
            <div className="circular-card">
              <Link to="/fruits" className="circular-card-link">
                <img src={mangoImage} alt="Fruits" className="card-image" />
              </Link>
            </div>
            <p className="card-category-link">
              <Link to="/fruits" className="category-link">
                Fruits
              </Link>
            </p>
          </div>

          <div>
            <div className="circular-card">
              <Link to="/vegetables" className="circular-card-link">
                <img src={vegetableImage} alt="Vegetables" className="card-image" />
              </Link>
            </div>
            <p className="card-category-link">
              <Link to="/vegetables" className="category-link">
                Vegetables
              </Link>
            </p>
          </div>

          <div>
            <div className="circular-card">
              <Link to="/oils" className="circular-card-link">
                <img src={oilImage} alt="oils" className="card-image" />
              </Link>
            </div>
            <p className="card-category-link">
              <Link to="/oils" className="category-link">
                Oils
              </Link>
            </p>
          </div>

          <div>
            <div className="circular-card">
              <Link to="/nuts" className="circular-card-link">
                <img src={nutsImage} alt="Nuts" className="card-image" />
              </Link>
            </div>
            <p className="card-category-link">
              <Link to="nuts" className="category-link">
                Nuts
              </Link>
            </p>
          </div>

          <div>
            <div className="circular-card">
              <Link to="/spices" className="circular-card-link">
                <img src={spicesImage} alt="Spices" className="card-image" />
              </Link>
            </div>
            <p className="card-category-link">
              <Link to="/spices" className="category-link">
                Spices
              </Link>
            </p>
          </div>

          {/* Add more circular-card divs and category links as needed */}
        </div>
        <div className="scroll-arrow scroll-arrow-right" onClick={() => handleScroll(1)}>
          &gt;
        </div>
      </div>
    </div>
  );
}

export default Collections;
