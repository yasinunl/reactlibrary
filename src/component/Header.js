import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import '../style/HeaderStyle.css'
import { AuthContext } from '../auth/auth';

const Header = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isLoggedIn, logout } = useContext(AuthContext)
  const [loginButtons, setLoginButtons] = useState(isLoggedIn);

  const handleLoginModalOpen = () => { setIsLoginModalOpen(true); setIsRegisterModalOpen(false); }
  const handleLoginModalClose = () => setIsLoginModalOpen(false);

  const handleRegisterModalOpen = () => { setIsRegisterModalOpen(true); setIsLoginModalOpen(false); }
  const handleRegisterModalClose = () => setIsRegisterModalOpen(false);

  const handleLogout = () => {
    setLoginButtons(false)
    logout();
  }
  const handleLogin = () => {
    setIsLoginModalOpen(false); setIsRegisterModalOpen(false);
    setLoginButtons(true);
  }
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Books</Link>
          </li>
          <li>
            <Link to="/students">Students</Link>
          </li>
          <li>
            <Link to="/borrow-history">Borrow History</Link>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {!loginButtons ? <><button onClick={handleLoginModalOpen}>Login</button>
          <button onClick={handleRegisterModalOpen}>Register</button></> : <button onClick={handleLogout}>Logout</button>}


      </div>
      {isLoginModalOpen && <LoginModal onClose={handleLoginModalClose} onLogin={handleLogin} />}
      {isRegisterModalOpen && <RegisterModal onClose={handleRegisterModalClose} onLogin={handleLogin} />}
    </header>
  );
};

export default Header;
