import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import '../styles/Hero.css';
import '../styles/WhyChooseUs.css';
import '../styles/Footer.css';

function Home() {
  return (
    <div className="homepage">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <img src="/path/to/logo.png" alt="Company Logo" />
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/our-funds">Our Funds</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Invest in Your Future</h1>
          <p>
            Discover a world of mutual funds tailored to your financial goals. Let us help you
            build a prosperous future through smart, diversified investments.
          </p>
          <div className="hero-buttons">
            <Link to="/get-started" className="btn btn-primary btn-large">
              Get Started
            </Link>
            <Link to="/learn-more" className="btn btn-outline btn-large">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>WHY CHOOSE US</h2>
        <p className="subtitle">A better way to invest</p>
        <div className="features">
          <div className="feature">
            <h3>Expert Fund Management</h3>
            <p>Our team of experienced professionals manages your investments with care and expertise.</p>
          </div>
          <div className="feature">
            <h3>Diversified Portfolio</h3>
            <p>Spread your risk across various sectors and asset classes for balanced growth.</p>
          </div>
          <div className="feature">
            <h3>Transparent Fees</h3>
            <p>Clear and competitive fee structure with no hidden charges.</p>
          </div>
          <div className="feature">
            <h3>Easy Online Access</h3>
            <p>Monitor and manage your investments anytime, anywhere through our user-friendly platform.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2023 Budget Brilliance. All rights reserved.</p>
          <div className="subscribe-form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;