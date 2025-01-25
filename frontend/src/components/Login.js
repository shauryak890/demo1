import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setUser({ id: response.data.id, role: response.data.role, agentId: response.data.agentId });
      navigate(response.data.role === 'admin' ? '/admin' : '/agentdashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.');
    }
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <h2 className="title">Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="form" onSubmit={handleLogin}>
          <div className="inputGroup">
            <label className="label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputGroup">
            <label className="label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="button">Login</button>
        </form>
        <p className="linkText">
          Don't have an account? <a href="/register" className="link">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;