import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const location = useLocation();
  const isDistributor = location.pathname === '/register/distributor';
  const navigate = useNavigate();

  console.log('Current Path:', location.pathname); // Debug: Log the current path
  console.log('Is Distributor:', isDistributor); // Debug: Log the value of isDistributor

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: isDistributor ? 'agent' : 'user', // Default role based on the registration type
  });

  console.log('Form Data:', formData); // Debug: Log the form data

  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const termsContent = {
    sections: [
      {
        title: "1. Account Terms & Conditions",
        content: [
          "By creating an account, you agree to comply with these terms and conditions.",
          "You must be at least 18 years old to use our services.",
          "You must provide accurate and complete information during registration.",
          "You are responsible for maintaining the security of your account credentials.",
          "You agree to notify us immediately of any unauthorized access to your account."
        ]
      },
      {
        title: "2. Investment Terms",
        content: [
          "All investments carry inherent risks, and past performance is not indicative of future results.",
          "You acknowledge that you understand the risks associated with investments.",
          "Minimum investment amounts may apply to certain investment products.",
          "Investment decisions are made at your own discretion.",
          "We do not guarantee any returns on investments."
        ]
      },
      {
        title: "3. Privacy & Data Protection",
        content: [
          "We collect and process your personal information in accordance with our Privacy Policy.",
          "Your data is protected using industry-standard security measures.",
          "We may share your information with regulatory authorities when required by law.",
          "You have the right to access and update your personal information."
        ]
      }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      console.log('Signup successful:', response.data);
      setError('');
      toast.success('Registration successful! Please login.');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (err) {
      console.error('Signup error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'An error occurred during signup.');
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
              onChange={handleChange}
              name="name"
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
              onChange={handleChange}
              name="email"
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
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input"
              placeholder="Enter your password again"
              value={formData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
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
                onChange={handleChange}
                name="role"
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
          <div className="terms-section">
            <div className="terms-header">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <span className="checkbox-label">
                  I accept the terms and conditions
                </span>
              </label>
              <button
                type="button"
                className="terms-toggle"
                onClick={() => setShowTerms(!showTerms)}
              >
                {showTerms ? 'Hide Terms' : 'View Terms'}
              </button>
            </div>

            {showTerms && (
              <div className="terms-modal">
                <div className="terms-modal-content">
                  <div className="terms-modal-header">
                    <h3>Terms and Conditions</h3>
                    <button
                      type="button"
                      className="close-button"
                      onClick={() => setShowTerms(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="terms-modal-body">
                    {termsContent.sections.map((section, index) => (
                      <div key={index} className="terms-section-content">
                        <h4>{section.title}</h4>
                        <ul>
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
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