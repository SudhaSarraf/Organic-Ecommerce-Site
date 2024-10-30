import React,{useState, useEffect} from "react";

import "./dashboard.css";
import Collections from "./collections/collection";
import ImageSlider from "../components/imageSlider";
import ProductSlider from "../components/productSlider";
import SliderPage from "../components/reviews";


function Dashboard() {
  const [products, setProducts] = useState([]);



  return (
    <div className="Dashboard">
      <ImageSlider/>
      <ProductSlider products={products} />
        <div className="welcomeMessage">
          <h1>Welcome to Green Harvest</h1>
          <p>At Green Harvest, we work with local farmers and producers to bring you peak-quality, high-integrity organic fruits and vegetables. Same Day</p>
        </div>
      <Collections />
      <SliderPage/>
    </div>
  );
}

export default Dashboard;
