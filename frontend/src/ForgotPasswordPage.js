import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import fetcher from './services/commonFetcher';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // navigate('/reset-password');
    try {
      const email = document.querySelector('input[placeholder="Email"]').value;
      await fetcher.post('/user/forgot-password', {
        email: email,
      });
      alert(
        'Email has been sent to registered mail ID. Kindly use it for resetting your password'
      );
    } catch (error) {
      alert(error.message || 'Incorrect Data. Please try again.');
    }
  };

  return (
    <div className='forgot-password-container'>
      <div className='forgot-password-form'>
        <img
          src='/images/eco-login-icon.png'
          alt='Forgot Password Icon'
          className='login-icon'
        />
        <div className='title'>Forgot Password</div>
        <p className='forgot-password-message'>
          If you have a valid account with us, please enter the corresponding
          email, and we will send a link to reset your password.
        </p>
        <input type='email' placeholder='Email' className='input-field' />
        <button className='button' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
