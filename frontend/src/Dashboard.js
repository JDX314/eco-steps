import React, { useEffect, useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import EcoChallenges from './EcoChallenges'; // Import EcoChallenges Component
import fetcher from './services/commonFetcher';

const Dashboard = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const [greenPoints, setGreenPoinst] = useState({});
  const [userData, setUserData] = useState({});
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetcher.get(`/user/profile`);

      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchLeaderBoardData = async () => {
    try {
      const response = await fetcher.get(`/user/leader-board`);
      setLeaderBoardData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchGreenPoints();
    fetchUserProfile();
    fetchLeaderBoardData();
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const navigateToGreenEvents = () => {
    navigate('/green-events');
  };

  const navigateToCarbonFootprints = () => {
    navigate('/carbon-footprints');
  };

  const navigateToEchoChallenge = () => {
    navigate('/echo-challenge');
  };

  const navigateToLeaderBoard = () => {
    navigate('/leader-board');
  };

  const fetchGreenPoints = async () => {
    try {
      const response = await fetcher.get(`/user/green-points`);
      setGreenPoinst(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="link" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="breadcrumb">Home / Dashboard</div>
        <h1>Hello {userData.first_name} {userData.last_name}</h1>
        <h1>Welcome to Your Dashboard!</h1>
        <p>Here you can access all your personal information and settings.</p>
        <div className="cards">
          <div className="card">
            <div className="card-icon">🌿</div>
            <div className="card-title">Eco Challenges</div>
            <div className="card-text">Complete daily sustainability challenges and earn GreenPoints!</div>
            <Link to="/eco-challenges">
              <button className="button">Go to Eco Challenges</button>
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">📈</div>
            <div className="card-title">Carbon Footprint</div>
            <div className="card-text">Find your carbon footprint here.</div>
            <Link to="/carbon-footprint-calculator">
              <button className="button">Calculate</button>
            </Link>
          </div>
          <div className="card">
            <div className="card-icon">📅</div>
            <div className="card-title">Green Events in your city</div>
            <div className="card-text">Find local Green Events in {userData.city}</div>
            <Link to="/green-events">
              <button className="button">Find Events</button>
            </Link>            
          </div>
          <div className="card">
            <div className="card-icon">📚</div>
            <div className="card-title">Resource Center</div>
            <div className="card-text">Find the sustainability articles and tips.</div>
            <Link to="/ResourceCenter">
              <button className="button">Click here</button>
            </Link>             
          </div>
          <div className="card">
            <div className="card-icon">🏆</div>
            <div className="card-title">Green Points</div>
            <div className="card-text">{greenPoints !== null ? `${greenPoints.total_points} GP` : '0 GP$'}</div>
            <Link to="/green-points">
              <button className="button">See Points History</button>
            </Link> 
          </div>
          <div className="card">
            <div className="card-icon">🔔</div>
            <div className="card-title">Leader Board</div>
            {leaderBoardData.length > 0 && (
              <div className='card-text'>
                {leaderBoardData[0].users.first_name}{' '}
                {leaderBoardData[0].users.last_name}
              </div>
            )}
            {leaderBoardData.length > 1 && (
              <div className='card-text'>
                {leaderBoardData[1].users.first_name}{' '}
                {leaderBoardData[1].users.last_name}
              </div>
            )}
            <Link to="/leader-board">
              <button className="button">See more...</button>
            </Link>  
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={confirmLogout}>Yes</button>
              <button className="modal-button" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
