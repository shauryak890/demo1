// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Our Platform</h1>
      <p>Join us today and start your journey!</p>

      <div style={{ marginTop: '20px' }}>
        <Link to="/register">
          <button style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Register
          </button>
        </Link>
        <Link to="/register/distributor">
          <button style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Register as Distributor
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;