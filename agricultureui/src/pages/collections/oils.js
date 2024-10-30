import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import '../getProduct.css';
import { CartContext } from "../../components/global/cartContext";
import { useNavigate } from "react-router-dom";

function DisplayOils() {
    const [allProducts, setAllProducts] = useState([]);
    const [oilProducts, setOilProducts] = useState([]);
    const {dispatch} = useContext(CartContext);
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('http://localhost:4000/product/all');
            setAllProducts(response.data.output);

            // Filter products to get only 'oils' category
            const oils = response.data.output.filter(product => product.category === 'oils');
            setOilProducts(oils);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        let auth = JSON.parse(localStorage.getItem('userInfo'));
        if(auth){
            let y = Object.values(auth);
            setUserInfo(y);
        }
        else{
        localStorage.removeItem('userInfo');
        navigate('/login',{replace:true})
        }
      },[navigate]);

    return (
        <>
            <div className="product-container">
                {/* <h>Fruit Category</h>
                <br></br> */}
                {oilProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            style={{ width: '60%', height: 'auto', maxHeight: '40%' }}
                            src={'http://localhost:4000/images/' + product.files}
                            alt="oils"
                        />
                        <h2 className="para">{product.name}</h2>
                        <p>
                            <b>Category: </b>
                            {product.category}
                        </p>
                        <p>
                            <b>Price: </b>
                            {product.price}
                        </p>
                        {userInfo[4] === 'user' && <button className='btn btn-success addCart-btn' onClick={()=>{dispatch({type:'ADD_TO_CART', id:product.id, product})}}>Add to cart </button>}
                        {/* Additional product details */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default DisplayOils;
