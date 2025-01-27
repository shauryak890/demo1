import React from 'react';
import {
  Shield,
  Lock,
  Eye,
  FileText,
  UserCheck,
  Key
} from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>Last updated: January 1, 2024</p>
      </section>

      <section className="privacy-content">
        <div className="policy-section">
          <div className="policy-icon">
            <Shield size={24} />
          </div>
          <h2>Data Protection</h2>
          <p>
            We implement robust security measures to protect your personal and financial information.
            All data is encrypted using industry-standard protocols and stored securely.
          </p>
        </div>

        <div className="policy-section">
          <div className="policy-icon">
            <Lock size={24} />
          </div>
          <h2>Information We Collect</h2>
          <ul>
            <li>Personal identification information</li>
            <li>Contact information</li>
            <li>Financial information</li>
            <li>Investment preferences</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="policy-icon">
            <Eye size={24} />
          </div>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To process your investments</li>
            <li>To provide customer support</li>
            <li>To send important updates</li>
            <li>To improve our services</li>
          </ul>
        </div>

        {/* Add more sections as needed */}
      </section>
    </div>
  );
};

export default PrivacyPolicy; 