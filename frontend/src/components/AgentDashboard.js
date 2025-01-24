// AgentDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function AgentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  // Fetch agent dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          const { agentId } = decoded;

          if (!agentId) {
            setError('No agentId found in user object.');
            return;
          }

          const response = await axios.get(`http://localhost:5000/agent/${agentId}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDashboardData(response.data);
        }
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [token]);

  // Handle lead submission
  const handleSubmitLead = async () => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        const { agentId } = decoded;

        if (!agentId) {
          setError('No agentId found in user object.');
          return;
        }

        const response = await axios.post(
          `http://localhost:5000/agent/${agentId}/submit-lead`,
          newLead,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data.agent);
        setNewLead({ name: '', email: '', phone: '' });
        setError('');
      }
    } catch (err) {
      setError('Failed to submit lead. Please check your input and try again.');
      console.error(err);
    }
  };

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (!dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Agent Dashboard</h1>
      <h2>Name: {dashboardData.name}</h2>
      <p>Leads Generated: {dashboardData.leadsGenerated}</p>
      <p>Monthly Payout: ₹{dashboardData.monthlyPayout.toFixed(2)}</p>

      <h3>Clients:</h3>
      <ul>
        {dashboardData.clients.map((client, index) => (
          <li key={index}>
            {client.name} - {client.email} - {client.phone}
          </li>
        ))}
      </ul>

      <h3>Submit a New Lead</h3>
      <div>
        <input
          type="text"
          placeholder="Client Name"
          value={newLead.name}
          onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <input
          type="email"
          placeholder="Client Email"
          value={newLead.email}
          onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <input
          type="text"
          placeholder="Client Phone"
          value={newLead.phone}
          onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
          style={{ padding: '10px', marginRight: '10px', width: '300px' }}
        />
        <button
          onClick={handleSubmitLead}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Submit Lead
        </button>
      </div>
    </div>
  );
}

export default AgentDashboard;