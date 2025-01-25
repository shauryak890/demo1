import React, { useEffect } from 'react';

function Footer() {
  useEffect(() => {
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
      const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        console.log(`Subscribed with email: ${email}`);
        alert('Thank you for subscribing!');
        e.target.reset();
      };

      subscribeForm.addEventListener('submit', handleSubmit);

      // Cleanup event listener on component unmount
      return () => {
        subscribeForm.removeEventListener('submit', handleSubmit);
      };
    }
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2023 Budget Brilliance. All rights reserved.</p>
        <form id="subscribe-form" className="subscribe-form">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;