import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, Home, BookOpen, Settings } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, role, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <BookOpen size={24} />
          <span>DevOpsHub</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {role === 'admin' && <Link to="/admin">Admin Panel</Link>}
          
          {user ? (
            <div className="nav-user">
              <span>{user.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="register-btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};