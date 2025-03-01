import React, { useState } from 'react';
import './App.css';
import { useNavigate, Link } from 'react-router-dom';
import fetcher from './services/commonFetcher';

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
    const [loginData, setLoginData] = useState({
      email: "",
      pwd: "",
    });

    const handleChangeName = (event) => {      
      setLoginData({
        ...loginData,
        [event.target.name]: event.target.value, // Update respective field
      });
    
    };

    const handleLogin = async () => {
      try {
        const email = document.querySelector('input[placeholder="Email"]').value;
        const password = document.querySelector('input[type="password"]').value;
        const response = await fetcher.post('/user/login', {
          email: email,
          password: password,
        });
  
        localStorage.setItem('access-token', response.data.token);
        navigate('/dashboard', {
          state: { message: 'Please login using the account you have created' },
        });
      } catch (error) {
        alert(error.message || 'Login failed. Please try again.');
      }
    };

  return (
    <div className="login-container">
      <div className="login-form">
        <img src="/images/eco-login-icon.png" alt="Login Icon" className="login-icon" />
        <div className="title">Login</div>
        <input type="text" placeholder="Email" className="input-field" name="email" onChange={handleChangeName}/>
        <input type="password" placeholder="Password" className="input-field" name="pwd" onChange={handleChangeName}/>
        <button className="button" onClick={handleLogin} disabled={loading}>
        {loading ? "Posting..." : "Login"}</button>
        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
        <div className="link-container">
          <Link to="/forgot-password" className="link">Forgot Password?</Link>
          <span className="separator">|</span>
          <Link to="/signup" className="link">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
