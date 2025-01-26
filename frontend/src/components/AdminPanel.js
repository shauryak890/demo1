// AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Users, 
  DollarSign, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  RefreshCw,
  UserCheck,
  AlertCircle
} from 'lucide-react';

function AdminPanel() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/admin/agents', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch agents data');
      setLoading(false);
    }
  };

  const handleApproveClient = async (agentId, clientId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/admin/approve-client`,
        { agentId, clientId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Client approved successfully');
      fetchAgents(); // Refresh the data
    } catch (error) {
      toast.error('Failed to approve client');
    }
  };

  const handleRejectClient = async (agentId, clientId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/admin/reject-client`,
        { agentId, clientId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Client rejected');
      fetchAgents(); // Refresh the data
    } catch (error) {
      toast.error('Failed to reject client');
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    
    const hasMatchingClients = agent.clients.some(client => 
      filterStatus === 'pending' ? !client.approved : client.approved
    );
    
    return matchesSearch && hasMatchingClients;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-actions">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-dropdown">
            <Filter size={20} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Leads</option>
              <option value="pending">Pending Approval</option>
              <option value="approved">Approved</option>
            </select>
          </div>
          <button className="refresh-button" onClick={fetchAgents}>
            <RefreshCw size={20} />
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Agents</h3>
            <p>{agents.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <UserCheck size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Clients</h3>
            <p>{agents.reduce((sum, agent) => sum + agent.clients.length, 0)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Payouts</h3>
            <p>${agents.reduce((sum, agent) => sum + agent.monthlyPayout, 0)}</p>
          </div>
        </div>
      </div>

      <div className="agents-grid">
        {filteredAgents.map(agent => (
          <div key={agent._id} className="agent-card">
            <div className="agent-header">
              <h2>{agent.name}</h2>
              <span className="agent-email">{agent.email}</span>
            </div>
            
            <div className="agent-stats">
              <div>
                <span>Total Leads:</span>
                <span>{agent.clients.length}</span>
              </div>
              <div>
                <span>Approved Leads:</span>
                <span>{agent.clients.filter(client => client.approved).length}</span>
              </div>
              <div>
                <span>Pending Leads:</span>
                <span>{agent.clients.filter(client => !client.approved).length}</span>
              </div>
              <div>
                <span>Monthly Payout:</span>
                <span>${agent.monthlyPayout}</span>
              </div>
            </div>

            <div className="client-list">
              <h3>Recent Leads</h3>
              {agent.clients.map(client => (
                <div key={client._id} className="client-item">
                  <div className="client-info">
                    <h4>{client.name}</h4>
                    <p>{client.email}</p>
                    <p>Investment: ${client.capital}</p>
                    <p>Type: {client.investmentType}</p>
                  </div>
                  <div className="client-status">
                    {client.approved ? (
                      <span className="status approved">
                        <CheckCircle size={16} />
                        Approved
                      </span>
                    ) : (
                      <div className="approval-actions">
                        <button
                          className="approve-button"
                          onClick={() => handleApproveClient(agent._id, client._id)}
                        >
                          <CheckCircle size={16} />
                          Approve
                        </button>
                        <button
                          className="reject-button"
                          onClick={() => handleRejectClient(agent._id, client._id)}
                        >
                          <XCircle size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;