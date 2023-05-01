import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const backend = "http://localhost:5000";
     let navigate = useNavigate();
     
     const [credentials, setcredentials] = useState({email: "", password: ""});
     const handleSubmit = async (e) => {
          e.preventDefault();
          // Fetch API for login
          const response = await fetch(`${backend}/api/auth/login`, {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const user = await response.json();
          if (user.success){
               // save the auth-token and redirect
               localStorage.setItem('token', user.authtoken);
               navigate("/");
          }
          else{
               alert("Wrong credentials")
          }
     }

     const onchange = (e) => {
          setcredentials({ ...credentials, [e.target.name]: e.target.value });
     }
     return (
          // user login form
          <div className="container">
               <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                         <label htmlFor="email" className="form-label">Email address</label>
                         <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onchange} required />
                    </div>
                    <div className="mb-3">
                         <label htmlFor="password" className="form-label">Password</label>
                         <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onchange} minLength={8} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
               </form>
          </div>
     )
}

export default Login