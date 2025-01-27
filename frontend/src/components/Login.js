import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Auth.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const loginData = {
        email: email.trim(),
        password: password.trim()
      };

      // Debug logs
      console.log('Making login request to:', `${process.env.REACT_APP_API_BASE_URL}/auth/login`);
      console.log('With data:', loginData);

      const response = await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        data: loginData,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        validateStatus: (status) => {
          return status < 500; // Resolve only if status is less than 500
        }
      });

      console.log('Response:', response);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setUser({
          id: response.data.id,
          role: response.data.role,
          email: response.data.email,
          agentId: response.data.agentId
        });
        toast.success('Login successful!');
        navigate('/', { state: { from: '/login' } });
      } else {
        const errorMsg = response.data.error || 'Login failed';
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error('Login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        data: error.response?.data
      });
      
      const errorMessage = error.response?.data?.error || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h2 className="auth-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account?<a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
