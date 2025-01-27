import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  HelpCircle
} from 'lucide-react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-container">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help and answer any question you might have</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <Mail size={24} />
            <h3>Email Us</h3>
            <p>support@budgetbrilliance.com</p>
            <p>info@budgetbrilliance.com</p>
          </div>
          <div className="info-card">
            <Phone size={24} />
            <h3>Call Us</h3>
            <p>+91 123-456-7890</p>
            <p>+91 098-765-4321</p>
          </div>
          <div className="info-card">
            <MapPin size={24} />
            <h3>Visit Us</h3>
            <p>123 Financial District</p>
            <p>Mumbai, Maharashtra 400001</p>
          </div>
          <div className="info-card">
            <Clock size={24} />
            <h3>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 2:00 PM</p>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <h2>Send us a Message</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="Your email"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="Message subject"
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Your message"
                rows="5"
              />
            </div>
            <button type="submit" className="submit-button">
              <Send size={16} />
              Send Message
            </button>
          </form>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <HelpCircle size={20} />
            <h3>How do I start investing?</h3>
            <p>Sign up for an account, complete your KYC, and you can start investing in minutes.</p>
          </div>
          <div className="faq-item">
            <MessageSquare size={20} />
            <h3>What support do you offer?</h3>
            <p>We provide 24/7 customer support through email, phone, and chat.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;