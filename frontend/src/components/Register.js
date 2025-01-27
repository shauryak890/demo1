import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

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

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // First verify the API is accessible
      const baseUrl = process.env.REACT_APP_API_BASE_URL;
      console.log('Base URL:', baseUrl);

      try {
        const healthCheck = await axios.get(baseUrl);
        console.log('API Health Check:', healthCheck.data);
      } catch (healthError) {
        console.error('API Health Check Failed:', healthError);
        throw new Error('API is not accessible');
      }

      const apiUrl = `${baseUrl}/auth/register`;
      console.log('Registration URL:', apiUrl);

      const registerData = {
        name: formData.name,
        email: formData.email.trim(),
        password: formData.password,
        role: isDistributor ? 'agent' : 'user'
      };

      console.log('Registration Data:', registerData);

      const response = await axios({
        method: 'POST',
        url: apiUrl,
        data: registerData,
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      console.log('Registration Response:', response.data);

      if (response.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      } else {
        throw new Error(response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });

      let errorMessage;
      if (error.message === 'API is not accessible') {
        errorMessage = 'Service is currently unavailable. Please try again later.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network.';
      } else if (error.response?.status === 404) {
        errorMessage = 'Registration service is currently unavailable.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = 'Registration failed. Please try again later.';
      }

      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Register {isDistributor ? 'as Distributor' : ''}</h2>

        {isDistributor && (
          <div className="distributor-info">
            <h2>Why Join as a Distributor?</h2>
            <ul>
              <li>Work from home and earn money</li>
              <li>Flexible working hours</li>
              <li>Access to exclusive training and resources</li>
              <li>Be part of a growing community</li>
            </ul>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input-field"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="input-field"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="terms-group">
            <input
              type="checkbox"
              id="terms"
              className="terms-checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <label className="terms-label" htmlFor="terms">
              I accept the terms and conditions
            </label>
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>

        <p className="auth-link">
          Already have an account?<a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
