import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate, useLocation } from 'react-router-dom';
import fetcher from './services/commonFetcher';

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    const otpParam = params.get('otp');

    if (emailParam) {
      setEmail(emailParam);
    }

    if (otpParam) {
      setOtp(otpParam);
    }
  }, [location.search]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async () => {
    try {
      const password = document.querySelector(
        'input[placeholder="New Password"]'
      ).value;
      const confirmPassword = document.querySelector(
        'input[placeholder="Confirm New Password"]'
      ).value;

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      const response = await fetcher.post('/user/reset-password', {
        email: email,
        otp: otp,
        password: password,
      });

      navigate('/login', {
        state: {
          message:
            'Password reset successful. Please login with your new password.',
        },
      });
    } catch (error) {
      console.error('Password reset failed:', error);
      alert(error.message || 'Password reset failed. Please try again.');
    }
  };

  return (
    <div className='reset-password-container'>
      <div className='reset-password-form'>
        <img
          src='/images/eco-login-icon.png'
          alt='Reset Password Icon'
          className='login-icon'
        />
        <div className='title'>Reset Password</div>
        <input
          type='email'
          placeholder='Email'
          className='input-field'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
        <div className='password-field'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='New Password'
            className='input-field'
          />
          <span className='toggle-password' onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className='password-field'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm New Password'
            className='input-field'
          />
          <span
            className='toggle-password'
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <button className='button' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
