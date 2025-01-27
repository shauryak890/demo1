import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Info, 
  Phone, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Moon,
  Sun,
  LayoutDashboard,
  PiggyBank,
  Settings,
  Wallet,
  User
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Navbar({ user, handleLogout }) {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Wallet size={24} />
          <span>Budget Brilliance</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            <Home size={18} />
            Home
          </Link>
          {user?.role === 'agent' && (
            <Link to="/agentdashboard" className="nav-link">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">
              <Settings size={18} />
              Admin Panel
            </Link>
          )}
          <Link to="/about" className="nav-link">
            <Info size={18} />
            About Us
          </Link>
          <Link to="/contact" className="nav-link">
            <Phone size={18} />
            Contact
          </Link>
        </div>

        <div className="nav-actions">
          <button 
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {user ? (
            <div className="user-actions">
              <span className={`user-role ${user.role}`}>
                {user.role === 'admin' ? (
                  <>
                    <Settings size={16} />
                    Admin
                  </>
                ) : user.role === 'agent' ? (
                  <>
                    <LayoutDashboard size={16} />
                    Agent
                  </>
                ) : (
                  <>
                    <User size={16} />
                    User
                  </>
                )}
              </span>
              <button className="nav-button logout" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-button login">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="nav-button register">
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;