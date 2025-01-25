import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import AgentDashboard from './components/AgentDashboard';
import AdminPanel from './components/AdminPanel';
import OurFunds from './components/OurFunds';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import './index.css';

function App() {
  const [user, setUser] = useState(null);

  // Check if the user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: decodedToken.id, role: decodedToken.role, agentId: decodedToken.agentId });
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('token'); // Clear invalid token
      }
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} toggleTheme={toggleTheme} />
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Hero />
              <Features />
            </div>
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/distributor" element={<Register />} />
        <Route
          path="/agentdashboard"
          element={user?.role === 'agent' ? <AgentDashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="/our-funds" element={<OurFunds />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;