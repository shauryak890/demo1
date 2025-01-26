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
  Settings
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
          <PiggyBank size={24} />
          <span>Budget Brilliance</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <Home size={18} />
            <span>Home</span>
          </Link>

          <Link to="/our-funds" className={`nav-link ${location.pathname === '/our-funds' ? 'active' : ''}`}>
            <BarChart3 size={18} />
            <span>Our Funds</span>
          </Link>

          {user?.role === 'agent' && (
            <Link to="/agentdashboard" className={`nav-link ${location.pathname === '/agentdashboard' ? 'active' : ''}`}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
              <Settings size={18} />
              <span>Admin Panel</span>
            </Link>
          )}

          <Link to="/about-us" className={`nav-link ${location.pathname === '/about-us' ? 'active' : ''}`}>
            <Info size={18} />
            <span>About Us</span>
          </Link>

          <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
            <Phone size={18} />
            <span>Contact</span>
          </Link>
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