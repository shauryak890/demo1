import React from 'react';

function Header({ user, handleLogout }) {
  return (
    <header>
      <h1>Budget Brilliance</h1>
      {user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;