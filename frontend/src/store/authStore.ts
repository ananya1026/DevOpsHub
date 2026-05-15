import create from 'zustand';
import axios from 'axios';
import { AuthState, User } from '../types';

const API_URL = 'http://localhost:5000/api';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  role: (localStorage.getItem('role') as 'user' | 'admin') || null,
  
  login: async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      set({ user: res.data.user, token: res.data.token, role: 'user' });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'user');
    } catch (err) {
      throw new Error('Login failed');
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { email, password, name });
      set({ user: res.data.user, token: res.data.token, role: 'user' });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'user');
    } catch (err) {
      throw new Error('Registration failed');
    }
  },
  
  adminLogin: async (username: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/admin/login`, { username, password });
      set({ token: res.data.token, role: 'admin' });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
    } catch (err) {
      throw new Error('Admin login failed');
    }
  },
  
  logout: () => {
    set({ user: null, token: null, role: null });
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },
}));