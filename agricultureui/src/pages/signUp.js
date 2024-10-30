import React, { useEffect, useState } from 'react';
import './signUp.css';


function SignupPage() {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: name,
      userName: userName,
      email: email,
      password: password,
      contact: contact,
      address: address,
      role: 'user'
    };

    // Send the data to the Node.js API
    fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Save Successful') {
        alert(data.message);
        // Show success message
        setMessage("User registered successfully.");
      } else {
        alert(data.error);
        // Show error message
        setMessage("Failed to register user.");
      }
    })
    .catch(error => {
      alert("An error occurred.");
      console.error(error);
      // Show error message
      setMessage("An error occurred.");
    });
  };

  useEffect(()=>{

  },[]);

  return (
    <div className="form_container">
      <h2>Signup</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='my-label' htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='my-label' htmlFor="username">Username:</label>
          <input type="text" id="userName" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='my-label' htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='my-label' htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='my-label' htmlFor="contact">Contact:</label>
          <input type="text" id="contact" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>
        <div className="form-group">
          <label className='my-label' htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <button className='btn btn-success' type="submit" id="signupBtn">Signup</button>
      </form>
      <div id="message" className="message" style={{ display: message ? 'block' : 'none' }}>{message}</div>
    </div>
  );
}

export default SignupPage;
