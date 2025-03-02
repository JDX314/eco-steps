import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResourceCenter = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      // Replace this with your actual API call if needed
      const data = [
        {
          title: 'United Nations Sustainable Development Goals (SDGs)',
          description: "The UN's SDGs provide a comprehensive framework to achieve a better and more sustainable future, addressing global challenges such as poverty, inequality, and climate change.",
          link: 'https://www.un.org/sustainabledevelopment/'
        },
        {
          title: 'Center for Biological Diversity – 12 Ways to Live More Sustainably',
          description: 'This guide offers practical tips on reducing environmental impact, including minimizing plastic use, choosing organic products, and conserving water.',
          link: 'https://www.biologicaldiversity.org/programs/population_and_sustainability/sustainability/live_more_sustainably.html'
        },
        {
          title: 'Digital Culture Network – 10 Ways to Make Your Website More Sustainable',
          description: 'This article provides actionable steps to reduce your digital carbon footprint, such as optimizing images and improving website efficiency.',
          link: 'https://www.artscouncil.org.uk/digital-culture-network/10-ways-make-your-website-more-sustainable'
        },
        {
          title: 'European Enterprise Network – 5 Ways to Make Your Business More Sustainable Today',
          description: 'This article explores practical strategies to help small and medium-sized enterprises integrate sustainability into their business plans.',
          link: 'https://een.ec.europa.eu/news/5-ways-make-your-business-more-sustainable-today'
        },
        {
          title: "The Guardian – 'Everyone has an impact': How to Start Reducing Your Environmental Footprint",
          description: 'This article emphasizes simple actions individuals can take to reduce their environmental footprint, such as walking or cycling for errands, reducing food waste, and being mindful of consumption habits.',
          link: 'https://www.theguardian.com/environment/2020/jan/20/how-to-reduce-your-environmental-footprint'
        }
      ];
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
        <h1 className='leaderboard-title'>🌿 Resource Center</h1>               
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