import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, handleLogout, toggleTheme }) {
  return (
    <nav style={{ 
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
      fontFamily: 'Inter, sans-serif', // Use Inter font
    }}>
      {/* Left Section: Logo and Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Company Logo */}
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000d1b' }}>
          Company Logo
        </div>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#000d1b' }}>
            Home
          </Link>
          <Link to="/our-funds" style={{ textDecoration: 'none', color: '#000d1b' }}>
            Our Funds
          </Link>
          <Link to="/about-us" style={{ textDecoration: 'none', color: '#000d1b' }}>
            About Us
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none', color: '#000d1b' }}>
            Contact
          </Link>
        </div>
      </div>

      {/* Right Section: Dark Mode Toggle and Auth Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {/* Dark Mode Toggle */}
        <label className="switch">
          <input type="checkbox" className="input" onChange={toggleTheme} />
          <span className="slider"></span>
        </label>

        {/* Show Login and Register buttons only if the user is not logged in */}
        {!user && (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#007BFF' }}>
              Login
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: '#007BFF' }}>
              Register
            </Link>
          </>
        )}

        {/* Show Logout button only if the user is logged in */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              padding: '5px 10px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#dc3545',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;