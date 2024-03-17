import React, { useContext, useRef } from 'react';
import '../style/HeaderStyle.css'
import { registerData } from '../service/RegisterService';
import { AuthContext } from '../auth/auth';

const RegisterModal = ({ onClose, onLogin }) => {
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const password1 = useRef(null);
  const {login} = useContext(AuthContext);
  
  const handleRegister = (event) => {
    event.preventDefault(); // Prevent form submission (optional)
    if(password.current.value != password1.current.value ) throw("Passwords are not same")
    const fetchData = async() => {
      const token = await registerData({"firstName": firstName.current.value , "lastName":lastName.current.value 
      , "email":email.current.value ,"password": password.current.value });
      console.log(token);
      login(token)

    }
    fetchData();
    onLogin();
  };

  return (
    <div className="modal register-modal open">
      <div className="login-modal-dialog">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" ref={firstName} required />
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id="lastName" ref={lastName} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" ref={email} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={password} required />
        <label htmlFor="password1">Password Repeat:</label>
        <input type="password" id="password1" ref={password1} required />
        <button type="submit">Register</button>
      </form>
      <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RegisterModal;