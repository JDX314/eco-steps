import React, { useEffect, useState } from 'react';
import fetcher from './services/commonFetcher';
import { Link } from 'react-router-dom';

const GreenPoints = () => {
  const [greenPoints, setGreenPoints] = useState([]);

  useEffect(() => {
    fetchGreenPointsAPI();
  }, []);

  const fetchGreenPointsAPI = async () => {
    try {
      const response = await fetcher.get(`/user/green-points/history`);
      setGreenPoints(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    
    <div className="dashboard-container">
        <div className="sidebar">
            <Link to="/profile">Profile</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/eco-challenges">Eco Challenges</Link>
            <Link to="/carbon-footprint-calculator">Carbon Footprint</Link>
            <Link to="/green-events">Green Events</Link>
            <button className="link" onClick={handleLogout}>Logout</button>
        </div>
        <div className="main-content">
        <div className='leaderboard-container'>
      <h1 className='leaderboard-title'>🌿 Green Points History</h1>
      {greenPoints.length > 0 ? (
        <table className='leaderboard-table'>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Green Points</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {greenPoints.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.total_points}</td>
              <td>{new Date(data.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p className='loading-text'>Loading green points...</p>
      )}
    </div>
        </div>
    </div>
  );
};

export default GreenPoints;
