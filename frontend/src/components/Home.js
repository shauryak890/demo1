import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Shield,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  Target,
  HandshakeIcon,
  Coins,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  LayoutDashboard,
  Settings
} from 'lucide-react';

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleBecomeAgent = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/auth/become-agent',
        {},
        {
          headers: { 
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setShowModal(true);
        // Clear the token to force re-login
        localStorage.removeItem('token');
        
        setTimeout(() => {
          setShowModal(false);
          navigate('/login'); // Redirect to login instead of reload
        }, 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to become an agent');
    }
  };

  return (
    <div className="home-container">
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
      <section className="why-choose-us">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={32} />
            </div>
            <h3>Secure Investment</h3>
            <p>Your investments are protected by robust security measures and backed by industry-leading safeguards.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h3>High Returns</h3>
            <p>Consistently high returns on your investments through carefully selected and managed portfolios.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Expert Team</h3>
            <p>Our team of experienced financial experts is dedicated to helping you achieve your investment goals.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Award Winning</h3>
            <p>Recognized for excellence in financial services and customer satisfaction across the industry.</p>
          </div>
        </div>
      </section>

      {/* Only show Join Us section if user is not an agent */}
      {(!user || user.role !== 'agent') && (
        <section className="join-us">
          <h2>Join Our Team</h2>
          <div className="join-us-grid">
            <div className="join-us-card">
              <div className="join-us-icon">
                <Briefcase size={32} />
              </div>
              <h3>Flexible Work</h3>
              <p>Work on your own schedule and from anywhere</p>
            </div>

            <div className="join-us-card">
              <div className="join-us-icon">
                <Coins size={32} />
              </div>
              <h3>High Commission</h3>
              <p>Earn attractive commissions on every successful referral</p>
            </div>

            <div className="join-us-card">
              <div className="join-us-icon">
                <Target size={32} />
              </div>
              <h3>Growth Opportunity</h3>
              <p>Unlimited earning potential with performance bonuses</p>
            </div>
          </div>

          <button className="become-agent-button" onClick={handleBecomeAgent}>
            Register as Distributor
            <ArrowRight size={20} />
          </button>
        </section>
      )}

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <HandshakeIcon size={48} />
            <h2>Welcome to the Team!</h2>
            <p>You are now a registered agent. Please log in again to access your dashboard.</p>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Budget Brilliance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;