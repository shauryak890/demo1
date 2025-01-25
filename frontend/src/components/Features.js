import React from 'react';
import '../index.css'; // Adjust the path based on your directory structure

function Features() {
  return (
    <section id="why-choose-us" className="features">
      <div className="features-header">
        <h2>Why Choose Us</h2>
        <p className="subtitle">A better way to invest</p>
        <p>We offer a range of mutual funds designed to meet diverse investment needs and risk appetites.</p>
      </div>
      <div className="feature-cards">
        <div className="feature-card">
          <i>📊</i>
          <h3>Expert Fund Management</h3>
          <p>Our team of experienced professionals manages your investments with care and expertise.</p>
        </div>
        <div className="feature-card">
          <i>📈</i>
          <h3>Diversified Portfolio</h3>
          <p>Spread your risk across various sectors and asset classes for balanced growth.</p>
        </div>
        <div className="feature-card">
          <i>💵</i>
          <h3>Transparent Fees</h3>
          <p>Clear and competitive fee structure with no hidden charges.</p>
        </div>
        <div className="feature-card">
          <i>🚀</i>
          <h3>Easy Online Access</h3>
          <p>Monitor and manage your investments anytime, anywhere through our user-friendly platform.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;