// import React, { useState } from 'react';
// import axios from 'axios';
// export default function Register(){
//     const [User,setUser]=useState({name:"",email:"" , passWord:""})
   


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const response = await axios.post('http://localhost:3000/user/register', User);
//           console.log(User)
//           alert("registration validé " +"\n"+ "check your mail"/*+ "\n"+response.status+ "\n"+response.statusText*/);
//           // Optionally, redirect or clear the form
//         } catch (error) {
//           console.error("There was an error registering the user!", error);
          
//         }
//       };

//     return (
//   <div>
//     register
//     <br />
//     <br />   
//     <form onSubmit={handleSubmit}>
//           name
//           <input onChange={(e)/*recuperer l'event*/=>setUser({...User,name:e.target.value}) } 
//           type="text" 
//           value={User.name}/>   
//           <br />
//           email
//           <input
//             onChange={(e) => setUser({ ...User, email: e.target.value })}
//             type="email"
//             value={User.email}
//           />
//           <br />
//           passWord
//           <input
//             onChange={(e) => setUser({ ...User, passWord: e.target.value })}
//             type="password"
//             value={User.passWord}
//           />
//           <br />
//           <button type="submit">submit</button>
//     </form>
//   </div>
    
//     )
// }
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", passWord: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/user/register', user);
      console.log('User registered:', response.data);
      alert("Registration successful! Check your email for confirmation.");
      // Optionally, redirect or clear the form
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error("There was an error registering the user!", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </Form.Group>

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
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
