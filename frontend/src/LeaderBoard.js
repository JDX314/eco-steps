import React, { useEffect, useState } from 'react';
import fetcher from './services/commonFetcher';
import { Link, useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderBoardAPI();
  }, []);

  const fetchLeaderBoardAPI = async () => {
    try {
      const response = await fetcher.get(`/user/leader-board`);
      setLeaderBoard(response.data);
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
        <Link to="/dashboard">Dashboard</Link>
        <button className="link" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="leaderboard-container">
          <h1 className="leaderboard-title">🌿 Leaderboard</h1>
          {leaderBoard.length > 0 ? (
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>CO2e Savings (kg)</th>
                </tr>
              </thead>
              <tbody>
                {leaderBoard.slice(0, 10).map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.users?.first_name + ' ' + data.users?.last_name || 'N/A'}</td>
                    <td>{data.min_score} kg CO2e</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="loading-text">Loading leaderboard...</p>
          )}
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

export default LeaderBoard;