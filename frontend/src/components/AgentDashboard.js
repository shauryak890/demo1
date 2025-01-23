import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AgentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/agent/A001/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError('Failed to load dashboard data.');
        console.error(err);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Agent Dashboard</h1>
      <h2>Name: {dashboardData.name}</h2>
      <p>Leads Generated: {dashboardData.leadsGenerated}</p>
      <p>Monthly Payout: {dashboardData.monthlyPayout}</p>
      <h3>Clients:</h3>
      <ul>
        {dashboardData.clients.map((client, index) => (
          <li key={index}>
            {client.name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AgentDashboard;
