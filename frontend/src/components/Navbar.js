import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
        Home
      </Link>

      {/* Show Login and Register buttons only if the user is not logged in */}
      {!user && (
        <>
          <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
            Login
          </Link>
          <Link to="/register" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
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
    </nav>
  );
}

export default Navbar;