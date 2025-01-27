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
  Wallet
} from 'lucide-react';

function Navbar({ user, handleLogout, toggleTheme }) {
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(
    localStorage.getItem('theme') === 'dark'
  );

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toggleTheme();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Wallet size={24} />
          <span>Budget Brilliance</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/privacy" className="nav-link">Privacy</Link>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            <div className="user-actions">
              <span className="user-role">
                {user.role === 'admin' ? 'Admin' : user.role === 'agent' ? 'Agent' : 'User'}
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