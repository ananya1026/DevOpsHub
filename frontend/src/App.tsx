import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Chatbot } from './components/Chatbot';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { useAuthStore } from './store/authStore';
import './App.css';

function App() {
  const { token, role } = useAuthStore();

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    return token ? element : <Navigate to="/login" />;
  };

  const AdminRoute = ({ element }: { element: React.ReactNode }) => {
    return token && role === 'admin' ? element : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/admin"
          element={<AdminRoute element={<AdminDashboard />} />}
        />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;