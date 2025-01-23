import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f2f2f2', marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
        Home
      </Link>
      <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
        Login
      </Link>
      <Link to="/register" style={{ marginRight: '10px', textDecoration: 'none', color: '#007BFF' }}>
        Register
      </Link>
    </nav>
  );
}

export default Navbar;