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
    return <Home />;
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} toggleTheme={toggleTheme} />
      <Header user={user} handleLogout={handleLogout} />
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

        {/* Protected routes */}
        <Route
          path="/agentdashboard"
          element={
            <ProtectedRoute
              element={<AgentDashboard user={user} />}
              allowedRoles={['agent']}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={<AdminPanel />}
              allowedRoles={['admin']}
            />
          }
        />

        {/* Other routes */}
        <Route path="/our-funds" element={<OurFunds />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;