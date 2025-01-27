import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Users, 
  DollarSign,
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  Check,
  X
} from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

function AdminPanel() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved
  const [monthlyGrowth, setMonthlyGrowth] = useState(0);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/admin/agents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAgents(response.data);

      // Calculate monthly growth (example calculation)
      const growth = calculateMonthlyGrowth(response.data);
      setMonthlyGrowth(growth);

      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch agents data');
      setLoading(false);
    }
  };

  const calculateMonthlyGrowth = (agentsData) => {
    // This is a placeholder calculation - adjust according to your needs
    const currentMonth = agentsData.reduce((sum, agent) => sum + agent.monthlyPayout, 0);
    const lastMonth = currentMonth * 0.9; // Example: assuming 10% growth
    return Math.round(((currentMonth - lastMonth) / lastMonth) * 100);
  };

  const handleApproveClient = async (agentId, clientId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/admin/approve-client`,
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
        `${process.env.REACT_APP_API_BASE_URL}/admin/reject-client`,
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
        <div className="admin-controls">
          <div className="search-filter-group">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search agents..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <Filter size={20} />
              <select onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All Agents</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          <button className="refresh-button" onClick={fetchAgents}>
            <RefreshCw size={20} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="admin-overview">
        <div className="admin-stats">
          <div className="stat-card">
            <Users size={24} />
            <div className="stat-info">
              <h3>Total Agents</h3>
              <p>{agents.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <DollarSign size={24} />
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p>{formatCurrency(agents.reduce((sum, agent) => sum + agent.monthlyPayout, 0))}</p>
            </div>
          </div>
          <div className="stat-card">
            <TrendingUp size={24} />
            <div className="stat-info">
              <h3>Monthly Growth</h3>
              <p>{monthlyGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="responsive-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Clients</th>
              <th>Revenue</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>
                  <span className={`status-badge ${agent.status}`}>
                    {agent.status}
                  </span>
                </td>
                <td>{agent.clients.length}</td>
                <td>{formatCurrency(agent.monthlyPayout)}</td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-button approve"
                      onClick={() => handleApproveClient(agent._id, agent.clients[0]._id)}
                    >
                      <Check size={16} />
                    </button>
                    <button 
                      className="action-button reject"
                      onClick={() => handleRejectClient(agent._id, agent.clients[0]._id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
