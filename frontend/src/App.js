import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import Home from './components/Home';
import PrivacyPolicy from './components/PrivacyPolicy';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Check if the user is logged in on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log('Decoded token:', decodedToken);
        setUser({ 
          id: decodedToken.id, 
          role: decodedToken.role, 
          agentId: decodedToken.agentId 
        });
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
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Protected Route component
  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return element;
  };

  // Home Route component to handle conditional redirects
  const HomeRoute = () => {
    const location = useLocation();
    
    // Only redirect if coming from login (initial login redirect)
    if (location.state?.from === '/login') {
      if (user?.role === 'agent') {
        return <Navigate to="/agentdashboard" />;
      } else if (user?.role === 'admin') {
        return <Navigate to="/admin" />;
      }
    }
    
    // Otherwise show home page
    return <Home user={user} />;
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <ToastContainer position="top-right" />
          <Navbar user={user} handleLogout={handleLogout} toggleTheme={toggleTheme} />
          
          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomeRoute />} />
              <Route path="/login" element={
                user ? (
                  <Navigate 
                    to="/" 
                    state={{ from: '/login' }} // Add state to track where we came from
                  />
                ) : (
                  <Login setUser={setUser} />
                )
              } />
              <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
              <Route path="/register/distributor" element={user ? <Navigate to="/" /> : <Register />} />

              {/* Protected routes */}
              <Route
                path="/agentdashboard"
                element={
                  user?.role === 'agent' ? (
                    <AgentDashboard user={user} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  user?.role === 'admin' ? (
                    <AdminPanel />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Other routes */}
              <Route path="/our-funds" element={<OurFunds />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;