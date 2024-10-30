import React, {useContext, useEffect, useState} from "react";
import { CartContext } from "../components/global/cartContext";
import './cart.css';
import {Link, useNavigate} from 'react-router-dom';
import Icon from 'react-icons-kit';
import {ic_add} from 'react-icons-kit/md/ic_add';
import {ic_remove} from 'react-icons-kit/md/ic_remove';
import {iosTrashOutline} from 'react-icons-kit/ionicons/iosTrashOutline';


const Cart = () =>{
    const {shoppingCart, dispatch, totalPrice, totalQnty } = useContext(CartContext);
    console.log(shoppingCart, "dispatch, totalPrice, totalQnty,",'value check')
    const [userInfo , setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo'))) 
    const navigate = useNavigate();

    const  getOrderMain = () =>{    
        console.log('clicked');   
        navigate('/order',{replace:true});
    }

    useEffect(()=>{
        // console.log(user.data(),'user');
        let x = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(x);
        if(!userInfo){
            navigate('/login', {replace: true});
            alert('you are not logged in')
        }
    },[navigate]);

    return(
        <>
            {shoppingCart.length !== 0 && <h1>Cart</h1>}
            <div className="cart-container">
                {
                    shoppingCart.length === 0 && <>
                        <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                        <div><Link to='/'>Return to Home Page</Link></div>
                    </>
                }

                {
                    shoppingCart && shoppingCart.map(cart =>(
                        // console.log(cart,'cart data')
                        <div className="cart-card" key={cart.id}>
                            <div className="cart-img">
                                <img style={{width:'100px', height:'100px'}} src={'http://localhost:4000/images/'+cart.files} alt="Product" />
                            </div>

                            
                            {/* display product name */}
                            <div className="cart-name">{cart.name}</div>
                            {/* display product price  */}
                            <div className="cart-price-original">Rs.{cart.price}.00</div>
                            <div className="inc" onClick={()=>dispatch({type:'INC', id:cart.id, cart})}>
                                <Icon icon={ic_add}></Icon>
                            </div>

                            <div className="quantity">{cart.qty}</div>
                            <div className="dec" onClick={()=>dispatch({type:'DEC', id:cart.id, cart})}>
                                <Icon icon={ic_remove} size={24}></Icon>
                            </div>

                            <div className="cart-price">
                                Rs.{cart.TotalProductPrice}.00
                            </div>

                            <button className="delete-btn" onClick={()=> dispatch({type:'DELETE', id:cart.id, cart})}>
                                <Icon icon={iosTrashOutline}></Icon>
                            </button>
                        </div>
                    ))
                }
                {
                    shoppingCart.length>0 && <div className="cart-summary">
                        <div className="cart-summary-heading">
                            Cart-Summary
                        </div>
                        <div className="cart-summary-price">
                            <span>Total Price</span>
                            <span>{totalPrice}</span>
                        </div>
                        <div className="cart-summary-price">
                            <span>Total Qnty</span>
                            <span>{totalQnty}</span>
                        </div>
                        {/* <Link className='cashout_link'> */}
                            <button className='btn btn success btn-md' onClick={()=>getOrderMain()} style={{marginTop: 5 + 'px'}}>
                                Cash on Delivery
                            </button>
                        {/* </Link> */}
                    </div>
                }

            </div>
        </>
    )
}
export default Cart;