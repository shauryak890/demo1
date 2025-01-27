import React from 'react';
import {
  Users,
  Target,
  Award,
  TrendingUp,
  Shield,
  Clock,
  Building,
  Globe,
  Gem,
  Heart,
  Lightbulb
} from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Budget Brilliance</h1>
        <p>Empowering Your Financial Journey</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <div className="about-icon">
            <Building size={32} />
          </div>
          <h2>Our Vision</h2>
          <p>
            At Budget Brilliance, we envision a world where financial prosperity is accessible to all. 
            Our platform combines cutting-edge technology with expert financial guidance to help you make 
            informed investment decisions and secure your financial future.
          </p>
        </div>

        <div className="about-stats">
          <div className="stat-item">
            <Users size={24} />
            <h3>Community</h3>
            <p>Thriving Investor Network</p>
          </div>
          <div className="stat-item">
            <TrendingUp size={24} />
            <h3>Performance</h3>
            <p>Market-Leading Returns</p>
          </div>
          <div className="stat-item">
            <Globe size={24} />
            <h3>Reach</h3>
            <p>Nationwide Presence</p>
          </div>
          <div className="stat-item">
            <Clock size={24} />
            <h3>Support</h3>
            <p>Always Available</p>
          </div>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <Shield size={32} />
            <h3>Trust & Security</h3>
            <p>Your investments are protected by state-of-the-art security systems and regulatory compliance.</p>
          </div>
          <div className="value-card">
            <Gem size={32} />
            <h3>Excellence</h3>
            <p>Committed to delivering superior investment solutions and exceptional service.</p>
          </div>
          <div className="value-card">
            <Heart size={32} />
            <h3>Client First</h3>
            <p>Your success is our priority - we're dedicated to your financial growth.</p>
          </div>
          <div className="value-card">
            <Lightbulb size={32} />
            <h3>Innovation</h3>
            <p>Continuously evolving our platform to provide cutting-edge investment solutions.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Leadership & Expertise</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-icon">
              <Users size={32} />
            </div>
            <h3>Executive Leadership</h3>
            <p>Seasoned financial experts with decades of combined experience</p>
          </div>
          <div className="team-member">
            <div className="member-icon">
              <Target size={32} />
            </div>
            <h3>Investment Team</h3>
            <p>Expert analysts and portfolio managers</p>
          </div>
          <div className="team-member">
            <div className="member-icon">
              <Award size={32} />
            </div>
            <h3>Support Team</h3>
            <p>Dedicated customer success professionals</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;