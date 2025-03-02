import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import fetcher from './services/commonFetcher';

const EcoChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [saved, setSaved] = useState(true);
  const [total_points, setTotalPoints] = useState(null);
  const [responses, setResponses] = useState({
    transportation: false,
    energy_consuption: false,
    diet: false,
    household_size: false,
    waste_generated: false,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleResponseChange = (challenge, value) => {
    setResponses({ ...responses, [challenge]: value === 'yes' });
  };

  const handleSubmit = async () => {
    setTotalPoints(null)
    const total_points = Object.values(responses).filter(Boolean).length * 5;
    setTotalPoints(total_points)
    await fetcher.post('/user/eco-challenge', {
      ...responses,
      total_points,
    });
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="link" onClick={() => setShowLogoutModal(true)}>Logout</button>
      </div>
      <div className="main-content">
        <h1 className='leaderboard-title'>🌿 Eco Challenges</h1>           
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="challenge">
            <p>Transportation: Can you go car-free for a day by walking, biking, or using public transport instead?</p>
            <label>
              <input
                type="radio"
                name="transportation"
                value="yes"
                checked={responses.transportation}
                onChange={() => handleResponseChange('transportation', 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="transportation"
                value="no"
                checked={!responses.transportation}
                onChange={() => handleResponseChange('transportation', 'no')}
              />
              No
            </label>
          </div>

          <div className="challenge">
            <p>Energy Consumption: Can you reduce your electricity usage by turning off all unnecessary lights and appliances for an entire day?</p>
            <label>
              <input
                type="radio"
                name="energy_consuption"
                value="yes"
                checked={responses.energy_consuption}
                onChange={() => handleResponseChange('energy_consuption', 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="energy_consuption"
                value="no"
                checked={!responses.energy_consuption}
                onChange={() => handleResponseChange('energy_consuption', 'no')}
              />
              No
            </label>
          </div>

          <div className="challenge">
            <p>Diet: Can you eat entirely plant-based meals for a day to lower your carbon footprint?</p>
            <label>
              <input
                type="radio"
                name="diet"
                value="yes"
                checked={responses.diet}
                onChange={() => handleResponseChange('diet', 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="diet"
                value="no"
                checked={!responses.diet}
                onChange={() => handleResponseChange('diet', 'no')}
              />
              No
            </label>
          </div>

          <div className="challenge">
            <p>Household Size: Can you implement one shared resource (e.g., communal laundry loads or meal prepping together) to reduce energy and waste in your household?</p>
            <label>
              <input
                type="radio"
                name="household_size"
                value="yes"
                checked={responses.household_size}
                onChange={() => handleResponseChange('household_size', 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="household_size"
                value="no"
                checked={!responses.household_size}
                onChange={() => handleResponseChange('household_size', 'no')}
              />
              No
            </label>
          </div>

          <div className="challenge">
            <p>Waste Generated: Can you go a full day without producing any single-use plastic waste?</p>
            <label>
              <input
                type="radio"
                name="waste_generated"
                value="yes"
                checked={responses.waste_generated}
                onChange={() => handleResponseChange('waste_generated', 'yes')}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="waste_generated"
                value="no"
                checked={!responses.waste_generated}
                onChange={() => handleResponseChange('waste_generated', 'no')}
              />
              No
            </label>
          </div>
          <button type="submit" className="carbon-btn-submit">Submit</button>
          {total_points >= 0 && (
          <div className="carbon-footprint-result">
            <h2>Your Green Points: {total_points}</h2>
          </div>
        )}
        </form>
      </div>

      {showLogoutModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="modal-buttons">
              <button className="modal-button" onClick={() => navigate('/login')}>Yes</button>
              <button className="modal-button" onClick={() => setShowLogoutModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoChallenges;
