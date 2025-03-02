import React, { useEffect ,useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './App.css'; // Import the main CSS file
import fetcher from './services/commonFetcher';

const CarbonFootprintCalculator = () => {
  const [userData, setUserData] = useState({
    transportation: '',
    energy: '',
    diet: '',
    householdSize: '',
    waste: '',
  });

  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [carbonScore, setCarbonScore] = useState(null);
  const [error, setError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCarbonFootprint = async () => {
      try {
        setLoading(true);
        const response = await fetcher.get(`/user/carbon-footprint`);
        if(response.data.length === 0) {
          setLoading(false);
          return;
        }
        setUserData({
          transportation: response.data[0].transportation || '',
          energy: response.data[0].energy_consuption || '',
          diet: response.data[0].diet || '',
          householdSize: response.data[0].household_size || '',
          waste: response.data[0].waste_generated || '',
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching carbon footprint:', error);
        setError(
          typeof error === 'string' ? error : 'Failed to fetch carbon footprint data'
        );
        setLoading(false);
      }
    }
    fetchCarbonFootprint();
  },[navigate])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const activityData = {
      energy: parseFloat(userData.energy),
    };

    const apiKey = '7E7T83P1ZH1EH0Z72BSKJREEZG'; // Replace with your Climatiq API key
    const url = 'https://api.climatiq.io/data/v1/estimate';

    try {
      setLoading(true);
      const response = await axios.post(
        url,
        {
          emission_factor: {
            activity_id: 'electricity-supply_grid-source_residual_mix',
            data_version: '20.20',
          },
          parameters: {
            energy: activityData.energy,
            energy_unit: 'kWh',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      setCarbonFootprint(response.data);
      setError(null);

      // Calculate the carbon score based on the emission in kg CO2e
      const score = calculateCarbonScore(response.data.co2e);
      setCarbonScore(score);
      console.log(score, response.data.co2e)
      const payload = {
        transportation: userData.transportation,
        energy_consuption: userData.energy,
        diet: userData.diet,
        household_size: userData.householdSize,
        waste_generated: userData.waste,
        carbon_emission: response.data.co2e,
        carbon_footprint_score: score.toLowerCase(),
        category: 'electricity',
        comments: 'Carbon footprint calculated',
      }
      await fetcher.post('/user/carbon-footprint', payload);
      setLoading(false);
       } catch (error) {
      console.error('Error fetching carbon footprint data:', error);
      setError('Failed to fetch carbon footprint data. Please check the API URL and key.');
    }
  };

  const calculateCarbonScore = (co2e) => {
    // Example scoring logic based on CO2e emissions
    if (co2e < 100) {
      return 'Low';
    } else if (co2e < 500) {
      return 'Moderate';
    } else {
      return 'High';
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

  if (loading) {
    return <div className='loading'>Loading carbon footprint data...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="link" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <h1 className='leaderboard-title'>🌿 Calculate Your Carbon Footprint</h1>
        <form onSubmit={handleSubmit} className="carbon-form-container">
          <div className="carbon-form-group">
            <label>Transportation (km per week):</label>
            <input
              type="text"
              name="transportation"
              value={userData.transportation}
              onChange={handleChange}
              className="carbon-form-control"
            />
          </div>
          <div className="carbon-form-group">
            <label>Energy Consumption (kWh per month):</label>
            <input
              type="text"
              name="energy"
              value={userData.energy}
              onChange={handleChange}
              className="carbon-form-control"
            />
          </div>
          <div className="carbon-form-group">
            <label htmlFor="diet">Diet (e.g., vegan, vegetarian, omnivore):</label>
            <select
              id="diet"
              name="diet"
              value={userData.diet}
              onChange={handleChange}
              className="carbon-form-control"
            >
              <option value="">Select your diet</option>
              <option value="vegan">Vegan</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="omnivore">Omnivore</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="keto">Keto</option>
            </select>
          </div>
          <div className="carbon-form-group">
            <label>Household Size:</label>
            <input
              type="text"
              name="householdSize"
              value={userData.householdSize}
              onChange={handleChange}
              className="carbon-form-control"
            />
          </div>
          <div className="carbon-form-group">
            <label>Waste Generated (kg per week):</label>
            <input
              type="text"
              name="waste"
              value={userData.waste}
              onChange={handleChange}
              className="carbon-form-control"
            />
          </div>
          <button type="submit" className="carbon-btn-submit">Calculate</button>
        </form>

        {carbonFootprint && (
          <div className="carbon-footprint-result">
            <h2>Your Carbon Footprint</h2>
            <p>Total Emissions: {carbonFootprint.co2e} kg CO2e</p>
            <p>Carbon Score: {carbonScore}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

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
    </div>
  );
};

export default CarbonFootprintCalculator;
