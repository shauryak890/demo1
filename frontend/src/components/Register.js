import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

function Register() {
  const location = useLocation();
  const isDistributor = location.pathname === '/register/distributor';

  console.log('Current Path:', location.pathname); // Debug: Log the current path
  console.log('Is Distributor:', isDistributor); // Debug: Log the value of isDistributor

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: isDistributor ? 'agent' : 'user', // Default role based on the registration type
  });

  console.log('Form Data:', formData); // Debug: Log the form data

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      console.log('Signup successful:', response.data);
      setError('');
      // Redirect or show success message
    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'An error occurred during signup.');
    }
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <h2 className="title">Register {isDistributor ? 'as Distributor' : ''}</h2>

        {isDistributor && (
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '5px', marginBottom: '20px' }}>
            <h2>Why Join as a Distributor?</h2>
            <ul>
              <li>Work from home and earn money.</li>
              <li>Flexible working hours.</li>
              <li>Access to exclusive training and resources.</li>
              <li>Be part of a growing community.</li>
            </ul>
          </div>
        )}

        {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label className="label" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          {!isDistributor && (
            <div className="inputGroup">
              <label className="label" htmlFor="role">Role</label>
              <select
                id="role"
                className="input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="user">User</option>
              </select>
            </div>
          )}
          {isDistributor && (
            <input
              type="hidden"
              name="role"
              value="agent" // Force the role to be "agent" for distributor registration
            />
          )}
          <button type="submit" className="button">Register</button>
        </form>
        <p className="linkText">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;