// import React,{useState} from "react";
// import axios from 'axios';


// function Login(){
//     const [User,setUser]=useState({email:"" , passWord:""})
   
//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await axios.post('http://localhost:3000/user/login', User);
//           console.log('user')
//           console.log(User)
//           alert("logged");
//           // Optionally, redirect or clear the form
//         } catch (error) {
          
//           console.error("cannot login!", error);
          
//         }
//       };

//     return (
//         <div>
//             login
//             <br />
//             <br />
//             <form onSubmit={handleSubmit}>
            
//                 email
//                 <input
//                 onChange={(e) => setUser({ ...User, email: e.target.value })}
//                 type="email"
//                 value={User.email}
//                 />
//                 <br />
//                 password
//                 <input
//                 onChange={(e) => setUser({ ...User, passWord: e.target.value })}
//                 type="password"
//                 value={User.passWord}
//                 />
//                 <br />
//                 <button type="submit">submit</button>
//             </form>
//             vous n'avez pas un compte?
//             <br />
//             <button type="button" >
//                Click here to sign up
//            </button>
//         </div>
    
//     )
// }
// export default Login 
import React, { useState } from "react";
import axios from 'axios';
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", passWord: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/user/login', user);
      console.log(response.data); // Assuming response.data contains user data or token
      const token =response.data.token
      console.log("🚀 ~ handleSubmit ~ token:", token)
      alert("Logged in successfully!");
      // Redirect to user account or any other route
      navigate.push('/user/userInfo'); 
    } catch (error) {
      console.error("Error logging in!", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.passWord}
            onChange={(e) => setUser({ ...user, passWord: e.target.value })}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      <div className="mt-3">
        <p>Don't have an account?</p>
        <Button as={Link} to="/register" variant="secondary">
          Click here to sign up
        </Button>
      </div>
    </Container>
  );
};

export default Login;
