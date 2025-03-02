import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import fetcher from './services/commonFetcher';
import axios from 'axios';

const ProfilePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetcher.get(`/user/profile`);
        const data = response.data;
        setUserData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          password: '',
          confirmPassword: '',
          city: data.city || '',
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(
          typeof error === 'string' ? error : 'Failed to fetch profile data'
        );
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      if (userData.password !== userData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      await fetcher.patch('/user/profile', {
        first_name: userData.firstName,
        last_name: userData.lastName,
        ...(userData.password ? { password: userData.password } : {}),
        city: userData.city,
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(
        typeof error === 'string'
          ? error
          : 'Failed to update profile. Please try again.'
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear the token to match what's used in the fetcher
    localStorage.removeItem('token');
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (loading) {
    return <div className='loading'>Loading profile data...</div>;
  }

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <Link to='/profile'>Profile</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <button className='link' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='main-content'>
        <div className='breadcrumb'>Dashboard / Profile</div>
        {error && <div className='error-message'>{error}</div>}
        <div className='signup-form'>
          <img
            src='/images/eco-login-icon.png'
            alt='Profile Icon'
            className='login-icon'
          />
          <div className='title'>Profile</div>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            className='input-field'
            value={userData.firstName}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            className='input-field'
            value={userData.lastName}
            onChange={handleInputChange}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='input-field'
            value={userData.email}
            onChange={handleInputChange}
          />
          {/* <div className='password-field'>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              placeholder='Password'
              className='input-field'
              value={userData.password}
              onChange={handleInputChange}
            />
            <span
              className='toggle-password'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>
          <div className='password-field'>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              placeholder='Confirm Password'
              className='input-field'
              value={userData.confirmPassword}
              onChange={handleInputChange}
            />
            <span
              className='toggle-password'
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div> */}
          <input
            type='text'
            name='city'
            placeholder='City'
            className='input-field'
            value={userData.city}
            onChange={handleInputChange}
          />
          <button className='button' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      {showLogoutModal && (
        <div className='confirmation-modal'>
          <div className='modal-content'>
            <p>Are you sure you want to log out?</p>
            <div className='modal-buttons'>
              <button className='modal-button' onClick={confirmLogout}>
                Yes
              </button>
              <button className='modal-button' onClick={cancelLogout}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
