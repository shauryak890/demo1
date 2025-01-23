import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');

  // Fetch all agents' data
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/agents');
        setAgents(response.data);
      } catch (err) {
        setError('Failed to fetch agents data.');
        console.error('Error:', err.message);
      }
    };
    fetchAgents();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Admin Panel</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Agents Overview</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Agent ID</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Leads Generated</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Monthly Payout (₹)</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Clients</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.agentId}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{agent.agentId}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{agent.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{agent.leadsGenerated}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{agent.monthlyPayout.toFixed(2)}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <ul>
                  {agent.clients.map((client, index) => (
                    <li key={index}>
                      {client.name} - {client.email} - {client.phone}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;