import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResourceCenter = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/resources'); // Adjust the API endpoint as needed
      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleLogout = () => {
    // Implement logout functionality here
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="link" onClick={handleLogout}>Logout</button>
      </div>
      <div className="main-content">
        <div className="breadcrumb">Home / Resource Center</div>
        <h1>Resource Center</h1>
        <p>Find valuable resources to help you live a more sustainable life!</p>
        {resources.length > 0 ? (
          <table className="resources-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.title}</td>
                  <td>{resource.description}</td>
                  <td><a href={resource.link} target="_blank" rel="noopener noreferrer">Visit</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading resources...</p>
        )}
      </div>
    </div>
  );
};

export default ResourceCenter;