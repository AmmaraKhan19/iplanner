import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// const dotenv = require('dotenv');
// dotenv.config();

const Signup = () => {
  const backend = "http://localhost:5000"
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch API to create account
    const {name, email, password} = credentials;
    const response = await fetch(`${backend}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password }),
    });
    const user = await response.json();

    if (user.success) {
      // save the auth-token and redirect
      localStorage.setItem('token', user.authtoken);
      navigate("/");
    }
    else {
      alert("Wrong credentials")
    }
  }

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={8} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup