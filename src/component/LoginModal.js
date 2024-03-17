import React, { useContext, useRef } from 'react';
import '../style/HeaderStyle.css'
import { loginData } from '../service/LoginService';
import { AuthContext } from '../auth/auth';

const LoginModal = ({ onClose, onLogin }) => {
  const email = useRef(null);
  const password = useRef(null);
  const { login } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    const loginFetch = async () => {
      const token = await loginData({ "email": email.current.value, "password": password.current.value });
      if(token == null) return;
      login(token);
      onLogin();
    }
    loginFetch();
  };

  return (
    <div className="modal login-modal open">
      <div className="login-modal-dialog">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" ref={email} required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" ref={password} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;