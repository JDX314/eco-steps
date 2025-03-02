import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <Link to="/resourcecenter">
        <div className="menu-card">
          <h2>Resource Center</h2>
          {/* Add additional card content here */}
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
