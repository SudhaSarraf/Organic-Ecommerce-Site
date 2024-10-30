import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ user, setUser ] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();

    // Send the data to the Node.js API
    await fetch(`http://localhost:4000/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`).then(response => response.json()).then(async data => {
      if (data.message === 'Login Successfull') {
        await fetch(`http://localhost:4000/login/userInfo?email=${encodeURIComponent(email)}`).then(response=>response.json()).then(userInfo=>{
          console.log(userInfo.output[0],'userInfo')
          if(userInfo) {
            localStorage.setItem("userInfo", JSON.stringify(userInfo.output[0]))
            if(userInfo.output[0]) navigate('/',{replace:true});
            window.location.reload();
          }
          else localStorage.removeItem("userInfo")
          // Login successful 
          alert(data.message);
        })
        
        // Redirect to the dashboard or any other page
      } else {
        // Login failed
        console.log('login failed');
        alert(data.error);
      }
    }).catch(error => {
      localStorage.removeItem("userInfo")
      alert(error.message);
      // Handle any errors
      console.log(error.message);
    });
  };

  useEffect(()=>{
    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if(userData && userData.role){
      let userRole = userData.role;
      if(userRole !== '') setUser(userRole);
      localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);
      if(userData) navigate('/',{replace:true});
      else {
        localStorage.removeItem('userInfo');
        alert('error occured')
      }
    }
    else{
      localStorage.removeItem('userInfo');
    }

  },[])

  return (
    
    <div>
      {
        <div className="form_container">
          <h2>Login</h2>
          <form id="form-group loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='my-label' htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className='my-label' htmlFor="password">Password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" id="loginBtn">Login</button>
          </form>
          {/* <div id="message" className="message">{message}</div> */}
        </div>
      }
      
    </div>
  );
}

export default LoginPage;
