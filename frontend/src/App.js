import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import Dashboard from './Dashboard';
import ProfilePage from './ProfilePage';
import CarbonFootprintCalculator from './CarbonFootprintCalculator'; // Import the new component
import GreenEvents from './GreenEvents'; // Import the new component
import EcoChallenges from './EcoChallenges'; // Import the new component
import LeaderBoard from './LeaderBoard'; // Import the new component
import GreenPoints from './GreenPoints';
import ResourceCenter from './ResourceCenter'; // Import the new component

const Home = () => {
  return (
    <div className="container">
      <img src="/images/logo.png" alt="Green Steps Logo" className="logo" />
      <div className="title">Green Steps</div>
      <div className="tagline">Take small steps for a greener planet!</div>
      <Link to="/login">
        <button className="button">Get Started</button>
      </Link>
      <div className="cards">
        <div className="card">
          <div className="card-icon">🌿</div>
          <div className="card-title">Eco Challenges</div>
          <div className="card-text">Complete daily sustainability challenges and earn GreenPoints!</div>
        </div>
        <div className="card">
          <div className="card-icon">📈</div>
          <div className="card-title">Carbon Footprint</div>
          <div className="card-text">Monitor your carbon footprint and make eco-friendly choices.</div>
        </div>
        <div className="card">
          <div className="card-icon">📅</div>
          <div className="card-title">Green Events in your city</div>
          <div className="card-text">Find local cleanups and sustainability workshops.</div>
        </div>
        <div className="card">
          <div className="card-icon">📚</div>
          <div className="card-title">Resource Center</div>
          <div className="card-text">Learn about sustainability with curated articles and tips.</div>
        </div>
        <div className="card">
          <div className="card-icon">🏆</div>
          <div class="card-text">Earn GreenPoints for completing challenges and receive eco awards!</div>
        </div>
        <div className="card">
          <div className="card-icon">🔔</div>
          <div className="card-title">Leader Board</div>
          <div className="card-text">Stay updated on new challenges and see top eco-champions!</div>
        </div>
      </div>
    </div>
  );
};

const LoginPageWithMessage = () => {
  const location = useLocation();
  const message = location.state?.message || '';
  return (
    <>
      {message && <div className="login-message">{message}</div>}
      <LoginPage />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPageWithMessage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/carbon-footprint-calculator" element={<CarbonFootprintCalculator />} />
        <Route path="/green-events" element={<GreenEvents />} />
        <Route path="/leader-board" element={<LeaderBoard />} />
        <Route path="/green-points" element={<GreenPoints />} />
        <Route path="/eco-challenges" element={<EcoChallenges />} /> {/* Updated route */}
        <Route path="/resource-center" element={<ResourceCenter />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;