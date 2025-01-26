import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Invest in Your Future</h1>
          <p>
            Discover a world of mutual funds tailored to your financial goals. Let us help you 
            build a prosperous future through smart, diversified investments.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started
            </Link>
            <Link to="/our-funds" className="btn btn-secondary btn-large">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features">
        <div className="features-header">
          <h2 className="subtitle">WHY CHOOSE US</h2>
          <h2>A better way to invest</h2>
          <p>
            We offer a range of mutual funds designed to meet diverse investment 
            needs and risk appetites
          </p>
        </div>
        <div className="feature-cards">
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Expert Management</h3>
            <p>Professional fund managers with proven track records</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Investment</h3>
            <p>Your investments are protected by robust security measures</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-sync"></i>
            <h3>Diversification</h3>
            <p>Spread your risk across multiple investment options</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;