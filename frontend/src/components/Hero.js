import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register'); // Redirect to the register page
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Invest in Your Future</h1>
        <p>Discover a world of mutual funds tailored to your financial goals. Let us help you build a prosperous future through smart, diversified investments.</p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('why-choose-us').scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;