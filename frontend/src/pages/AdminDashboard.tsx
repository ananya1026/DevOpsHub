import React from 'react';
import { AdminPanel } from '../components/AdminPanel';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <AdminPanel />
    </div>
  );
};