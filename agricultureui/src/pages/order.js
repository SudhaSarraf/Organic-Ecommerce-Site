import React, { useContext, useEffect, useState } from 'react'
// import Navbar from './navbar'
import { CartContext } from './global/cartContext'
import { auth, db } from './config/config';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Cashout = () => {

    const { totalPrice, totalQnty, shoppingCart} = useContext(CartContext);

    const [ userId, setUserId ] = useState('');
    const [ user, setUser ] = useState('');
    const [ fullName , setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ contact, setContact ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ successMsg, setSuccessMsg ] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate()

    const placeOrder = async(e) =>{
        e.preventDefault();

        if(address === '' || !address) {
            alert('Address is missing');
            return;
          }
          else if(contact === '' || !contact) {
            alert('Contact is missing');
            return;
          }

        let date = new Date();
        let time = new Date().getTime();

        let body = {
            'userId' : userId,
            'fullName': fullName,
            'email': email,
            'contact': contact,
            'address': address,
            'totalPrice': totalPrice,
            'totalQnty': totalQnty,
            'date': date,
            'time': time,
            'shoppingCart': shoppingCart
        }

        if(user){
            var cartData = collection(db,'orderCart');
            await setDoc(doc(cartData, `${user.uid}_${date}`), body).then(()=>{
                setFullName('');
                setEmail('');
                setContact('');
                setAddress('');
                setError('');
                setSuccessMsg('Your is placed successfully.')
                alert('Your is placed successfully.');
                setTimeout(()=>{
                    navigate('/',{replace:true})
                    window.location.reload();
                },100);
            }).catch(err=>{
                setSuccessMsg('');
                setError(err.message);
                alert(err.message);
            });
        }
    }

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            setUser(user);
            if(user !== null){
                var userData = doc(db, 'users', user.uid);
                onSnapshot(userData, (result)=>{
                    console.log(user.uid,'result');
                    setUserId(user.uid);
                    setFullName(result.data().name);
                    setEmail(result.data().email);
                });
            }
            else{
                alert('You need to login first.')
                navigate('/login', { replace:true });
            }
        });
    },[navigate]);

  return (
    <>
        {/* <Navbar/> */}
        <div className='container'>
            <br/>
            <h2>Place Order</h2>
            <br/>
            { successMsg && <div className='success-msg'>{successMsg}</div> }
            <form autoComplete='off' className='form-group' onSubmit={placeOrder}>
                <label htmlFor='name' >Full Name:</label>
                <input type='text' className='form-control' required value={fullName} disabled />
                <br/>

                <label htmlFor='email' >Email:</label>
                <input type='email' className='form-control' required value={email} disabled />
                <br/>

                <label htmlFor='contactNo' >Mobile/Contact No:</label>
                <input type='number' className='form-control' required onChange={(e)=>setContact(e.target.value)} value={contact} placeholder='9876543210/011-11-1111'/>
                <br/>
                
                <label htmlFor='deliveryAddress' >Delivery Address:</label>
                <input type='text' className='form-control' onChange={(e)=>setAddress(e.target.value)} required />
                <br/>
                
                <label htmlFor='priceToPay' >Price To Pay:</label>
                <input type='number' className='form-control' required value={totalPrice} disabled />
                <br/>
                
                <label htmlFor='totalNumberOfProducts' >Total number of products:</label>
                <input type='text' className='form-control' required value={totalQnty} disabled />
                <br/>
                
                <button type='submit' className='btn btn-success btn-md mybtn'>PLACE ORDER</button>
            </form>
            {error && <div></div>}
        </div>
    </>
  )
}

export default Cashout