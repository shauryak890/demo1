import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Budget Brilliance</h1>
      <p>We provide the best financial products to help you achieve your goals.</p>

      <h2>Featured Products</h2>
      <ul>
        <li>Mutual Funds</li>
        <li>Stocks</li>
        <li>Insurance</li>
      </ul>

      <button
        onClick={() => navigate('/register')}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        Become a Distributor
      </button>
    </div>
  );
}

export default Home;