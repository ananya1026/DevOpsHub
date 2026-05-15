export interface Course {
  id: number;
  name: string;
  price: number;
  duration: string;
  level: string;
  certificate: boolean;
  link: string;
  overview: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  enrolledCourses?: number[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  role: 'user' | 'admin' | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  adminLogin: (username: string, password: string) => Promise<void>;
}