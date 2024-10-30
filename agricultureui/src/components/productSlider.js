import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ProductSlider.css";
import { CartContext } from '../components/global/cartContext';
import { useNavigate } from 'react-router-dom';

function SliderProductSlider() {
  const [productDetails, setProductDetails] = useState([]);
  const { dispatch } = useContext(CartContext);
  const [userInfo, setUserInfo] = useState([]);
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product/all");
      setProductDetails(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };

  const productsPerPage = 4; // Number of products to display on each page
  const totalProducts = productDetails.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const scrollRight = () => {
    setCurrentIndex((currentIndex + 1) % totalPages);
  };

  const scrollLeft = () => {
    setCurrentIndex((currentIndex - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    let auth = JSON.parse(localStorage.getItem('userInfo'));
    if (auth) {
      let y = Object.values(auth);
      setUserInfo(y);
    } else {
      localStorage.removeItem('userInfo');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="slider-product-slider-container">
        <div className="h2slider">
            <h2 className="h2new">New Arrivals</h2>
        </div>
      
      <div className="slider-card-carousel">
        <div className="sleft">
            <div className="slider-carousel-arrow slider-arrow-left" onClick={scrollLeft}>
            &lt;
            </div>
        </div>
        
        <div className="slider-product-card-container">
          <div
            className="slider-product-card-wrapper"
            style={{ transform: `translateX(-${currentIndex * (220 * productsPerPage)}px)` }}
          >
            {productDetails.map((product) => (
              <div key={product.id} className="slider-product-card">
                <div className="slider-product-image">
                  <img src={`http://localhost:4000/images/${product.files}`} alt={product.name} />
                </div>
                <div className="slider-product-info">
                  <h3 className="slider-product-name">{product.name}</h3>
                  <p className="slider-product-category">
                    <b>Category:</b> {product.category}
                  </p>
                  <p className="slider-product-price">
                    <b>Price:</b> {product.price}
                  </p>
                  {userInfo[4] === 'user' && <button className='slider-add-to-cart-btn' onClick={() => { dispatch({ type: 'ADD_TO_CART', id: product.id, product }) }}>Add to cart</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sright">
            <div className="slider-carousel-arrow slider-arrow-right" onClick={scrollRight}>
            &gt;
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default SliderProductSlider;
