import React from 'react';

function CTA() {
  return (
    <section className="cta">
      <div className="cta-content">
        <h2>Ready to start investing?</h2>
        <p>Join thousands of satisfied investors who have trusted us with their financial future.</p>
        <div className="cta-buttons">
          <a href="/open-account" className="btn btn-primary btn-large">Open an Account</a>
          <a href="/contact-advisor" className="btn btn-outline btn-large">
            Contact an Advisor
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTA;