import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GreenEvents = () => {
  const [events, setEvents] = useState([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);

  useEffect(() => {
    const checkGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapsLoaded(true);
      } else {
        setTimeout(checkGoogleMaps, 1000); // Retry every second
      }
    };

    checkGoogleMaps();
  }, []);

  useEffect(() => {
    if (mapsLoaded) {
      const fetchGreenEvents = async () => {
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        const request = {
          query: 'green events',
          location: new window.google.maps.LatLng(43.65107, -79.347015),
          radius: 5000,
        };

        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setEvents(results);
          }
        });
      };

      fetchGreenEvents();
    }
  }, [mapsLoaded]);

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
        <h1 className='leaderboard-title'>🌿 Green Events in Your City</h1>        
        <p>Find local Green Events in your city and participate in sustainable activities!</p>
        {mapsLoaded ? (
          <table className="events-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.place_id}>
                  <td>{event.name}</td>
                  <td>{event.formatted_address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading green events...</p>
        )}
      </div>
    </div>
  );
};

export default GreenEvents;