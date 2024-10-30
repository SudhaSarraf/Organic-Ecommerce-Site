import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../components/global/cartContext';

const OrderMain = () => {
  const {totalPrice, totalQnty, shoppingCart} = useContext(CartContext);
  const [full_name, setFullName] = useState('');
  // const[user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const[mobileNumber, setMobileNumber] = useState('');
  const[address, setAddress] = useState('');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('clicked');

    if(address === '' || !address){
        alert('Address is missing');
        return;
    }
    else if(mobileNumber === '' || !mobileNumber){
        alert('Mobile Number is missing');
        return;
    }

    let body= {
        'full_name':full_name,
        'email':email,
        'mobile':mobileNumber,
        'address': address,
        'price_to_pay': totalPrice,
        'total_products': totalQnty,
        'shoppingCart': shoppingCart
    }
    if(userInfo){
        console.log('Form Data:', body);
        fetch('http://localhost:4000/order',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        })
        .then(response =>response.json())
        .then(data =>{
          console.log(data);
          if(data.message === 'Your Order is placed Successfully'){
            alert(data.message);
            
          }else{
            alert(data.error);
          }

          setFullName('');
          setEmail('');
          setMobileNumber('');
          setAddress('');
          setTimeout(()=>{
              navigate('/',{replace:true});
              window.location.reload();
          },100);  
        }).catch(err=>{
            alert('an error occured');
            // console.log(error.message);
            // console.error('Error:', error);
        });

    }

  };
  useEffect(()=>{
    // console.log(user.data(),'user');
    let x = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(x);
    if(!userInfo){
        navigate('/login', {replace: true});
        alert('you are not logged in')
    }
    else{
        console.log(x,'localstorage data');
        setFullName(x.displayName);
        setEmail(x.email);
        // setMobileNumber(x.mobile);
    }
},[navigate]);

  return (
    <div>
      <h1>Place Your Order</h1>
      <div className='form_container'>
        <form className='form-group' onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name:</label>
            <input className='form-control' type="text" id="full_name" name="full_name" value={full_name} disabled required/>

            <label htmlFor="email">Email:</label>
            <input className='form-control' type="email" id="email"  name="email" value={email} disabled required/>

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input className='form-control' type="tel" id="mobile" name="mobile" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)} required />

            <label htmlFor="deliveryAddress">Delivery Address:</label>
            <textarea className='form-control' id="address" name="address" rows="4" value={address} onChange={(e)=>setAddress(e.target.value)} required
            ></textarea>

            <label htmlFor="priceToPay">Price to Pay:</label>
            <input className='form-control' type="number" id="price_to_pay" name="price_to_pay" step="0.01" value={totalPrice} disabled required/>

            <label htmlFor="totalProducts">Total Number of Products:</label>
            <input className='form-control' type="number" id="total_products" name="total_products" value={totalQnty} disabled required/>

            <button type="submit">Place Order</button>
        </form>
      </div>
        
    </div>
  );
};

export default OrderMain;
