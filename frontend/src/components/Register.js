// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

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
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Register {isDistributor ? 'as Distributor' : ''}</h1>

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

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '300px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '300px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '300px' }}
        />
        {!isDistributor && (
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={{ display: 'block', marginBottom: '10px', padding: '10px', width: '320px' }}
          >
            <option value="user">User</option>
          </select>
        )}
        {isDistributor && (
          <input
            type="hidden"
            name="role"
            value="agent" // Force the role to be "agent" for distributor registration
          />
        )}
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;