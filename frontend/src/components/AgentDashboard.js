// AgentDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Send, Phone, Mail, User, Briefcase, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

function AgentDashboard({ user }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    investmentType: 'mutual_funds',
    capital: '',
    notes: ''
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Authentication token not found');
        return;
      }

      // Debug logs
      console.log('User:', user);
      console.log('Token:', token);
      console.log('Agent ID:', user?.agentId);

      if (!user?.agentId) {
        toast.error('Agent ID not found. Please log out and log in again.');
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/agent/${user.agentId}/dashboard`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Dashboard Response:', response.data);
      setDashboardData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error(error.response?.data?.message || 'Failed to load dashboard data');
      setError(error.response?.data?.message || 'Failed to load dashboard data');
      setLoading(false);
    }
  };

  const handleSubmitLead = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!user?.agentId || !token) {
        toast.error('Authentication required');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/agent/${user.agentId}/submit-lead`,
        newLead,
        {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        }
      );

      setDashboardData(response.data);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        investmentType: 'mutual_funds',
        capital: '',
        notes: ''
      });
      toast.success('Lead submitted successfully');
    } catch (err) {
      console.error('Lead submission error:', err);
      toast.error('Failed to submit lead. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Agent Dashboard</h1>
        <div className="date-display">{new Date().toLocaleDateString()}</div>
      </div>

      {dashboardData && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Clients</h3>
                <p>{dashboardData.totalClients || 0}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Investments</h3>
                <p>{formatCurrency(dashboardData.totalInvestments || 0)}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h3>Monthly Commission</h3>
                <p>{formatCurrency(dashboardData.monthlyCommission || 0)}</p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="chart-container">
              <h2>Commission History</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.commissionHistory || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="recent-activities-container">
              <h2>Recent Activities</h2>
              <div className="activities-list">
                {dashboardData.recentActivities?.length > 0 ? (
                  dashboardData.recentActivities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-date">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                      <div className="activity-description">
                        {activity.description}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No recent activities</p>
                )}
              </div>
            </div>
          </div>

          <div className="lead-form-container">
            <h2>Submit New Lead</h2>
            <form onSubmit={handleSubmitLead} className="lead-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <User size={16} />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    required
                    placeholder="Enter client's full name"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Mail size={16} />
                    Email
                  </label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    required
                    placeholder="Enter client's email"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Phone size={16} />
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    required
                    placeholder="Enter client's phone"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <Briefcase size={16} />
                    Investment Type
                  </label>
                  <select
                    value={newLead.investmentType}
                    onChange={(e) => setNewLead({ ...newLead, investmentType: e.target.value })}
                    required
                  >
                    <option value="mutual_funds">Mutual Funds</option>
                    <option value="stocks">Stocks</option>
                    <option value="bonds">Bonds</option>
                    <option value="real_estate">Real Estate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <PiggyBank size={16} />
                    Investment Capital
                  </label>
                  <input
                    type="number"
                    value={newLead.capital}
                    onChange={(e) => setNewLead({ ...newLead, capital: e.target.value })}
                    required
                    placeholder="Enter investment amount"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Additional Notes</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                    placeholder="Enter any additional notes"
                    rows="3"
                  />
                </div>
              </div>

              <button type="submit" className="submit-button">
                <Send size={16} />
                Submit Lead
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default AgentDashboard;