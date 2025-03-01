import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import fetcher from './services/commonFetcher';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignup = async () => {
    try {
      const firstName = document.querySelector(
        'input[placeholder="First Name"]'
      ).value;
      const lastName = document.querySelector(
        'input[placeholder="Last Name"]'
      ).value;
      const email = document.querySelector('input[placeholder="Email"]').value;
      const password = document.querySelector('input[type="password"]').value;
      const city = document.querySelector('input[placeholder="City"]').value;
      const response = await fetcher.post('/user/register', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        city: city,
      });
      navigate('/login', {
        state: { message: 'Please login using the account you have created' },
      });
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className='signup-container'>
      <div className='signup-form'>
        <img
          src='/images/eco-signup-icon.png'
          alt='Signup Icon'
          className='login-icon'
        />
        <div className='title'>Sign Up</div>
        <input type='text' placeholder='First Name' className='input-field' />
        <input type='text' placeholder='Last Name' className='input-field' />
        <input type='email' placeholder='Email' className='input-field' />
        <div className='password-field'>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='input-field'
          />
          <span className='toggle-password' onClick={togglePasswordVisibility}>
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div className='password-field'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Confirm Password'
            className='input-field'
          />
          <span
            className='toggle-password'
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <input type='text' placeholder='City' className='input-field' />
        <button className='button' onClick={handleSignup}>
          Sign Up
        </button>
        <div className='link-container'>
          {' '}
          Already have an account?{' '}
          <a href='/login' className='link'>
            &nbsp;Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
