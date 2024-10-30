import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Icon} from 'react-icons-kit';
import {cart} from 'react-icons-kit/entypo/cart'
import { CartContext } from "./cartContext";

const Nav=()=>{
    //const userData = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const {totalQnty} = useContext(CartContext);


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
        
    },[]);

    const logoutUser = () => {
        const shouldLogout = window.confirm("Are you sure you want to logout?");
        if (shouldLogout) {
            localStorage.removeItem('userInfo');
            // navigate('/login',{replace:true})
            window.location.reload();
        }
    }

    return(
        <div>
            <ul className="nav-ul">
                
                {userInfo.length <= 0 && <div>
                    <li><Link to='/signup'>SignUp</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </div>}
                {userInfo.length > 0 && 
                    <div>
                        <li><Link to='/'>Home</Link></li>
                        { userInfo[4] === 'admin' && <li><Link to='/products'>Add Products</Link></li>} 
                        <li><Link to='/details'>Products</Link></li>

                        { userInfo[4] === 'admin' && <li><Link to='/vlogs'>Add Vlog</Link></li>}
                        <li><Link to='/blog'>Vlogs</Link></li>
                        <li><button className="btn btn-danger" onClick={()=>logoutUser()}>Logout</button></li>
                        {/* <button type="button" className="btn btn-secondary btn-sm-me-1" onClick={()=>{navigate('/myCart', {replace:true})}}>My Cart</button> */}
                        <span className="cart-icon"><Link to='/cartProducts'><Icon icon={cart}/></Link></span>
                        <span className="no-of-products me-2" style={{color:'red', fontWeight:'bold'}}>{totalQnty}</span>
                        
                    </div>
                }
               
            </ul>
        </div>
    )
}

export default Nav;