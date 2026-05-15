const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Mock Database
const users = [];
const adminCredentials = {
  username: 'Ananya',
  password: 'Anya@123'
};

// Courses Database
const courses = [
  { id: 1, name: 'Computer Networks', price: 999, duration: '3-4 months', level: 'Beginner', certificate: true, link: 'https://www.coursera.org/learn/computer-networking', overview: 'Learn fundamentals of computer networking, OSI model, TCP/IP' },
  { id: 2, name: 'Linux Fundamentals', price: 899, duration: '2-3 months', level: 'Beginner', certificate: true, link: 'https://www.linux.com/training/', overview: 'Master Linux commands, file systems, and shell scripting' },
  { id: 3, name: 'GitHub Actions & Copilot', price: 499, duration: '1-2 months', level: 'Intermediate', certificate: true, link: 'https://github.com/features/actions', overview: 'Automate workflows with GitHub Actions and AI-powered Copilot' },
  { id: 4, name: 'AWS Services (EC2, IAM, S3, Lambda)', price: 1600, duration: '4-5 months', level: 'Intermediate', certificate: true, link: 'https://aws.amazon.com/training/', overview: 'Complete AWS cloud services mastery' },
  { id: 5, name: 'CI/CD Pipeline & Jenkins', price: 799, duration: '2-3 months', level: 'Intermediate', certificate: true, link: 'https://www.jenkins.io/doc/', overview: 'Learn continuous integration and deployment with Jenkins' },
  { id: 6, name: 'Docker (Dockerfile, Docker-compose)', price: 399, duration: '1-2 months', level: 'Beginner', certificate: true, link: 'https://docs.docker.com/', overview: 'Containerization with Docker and Docker Compose' },
  { id: 7, name: 'Kubernetes', price: 899, duration: '3-4 months', level: 'Advanced', certificate: true, link: 'https://kubernetes.io/docs/', overview: 'Orchestrate containers with Kubernetes' },
  { id: 8, name: 'Python Programming', price: 599, duration: '2-3 months', level: 'Beginner', certificate: true, link: 'https://www.python.org/about/gettingstarted/', overview: 'Python basics to advanced concepts' },
  { id: 9, name: 'Prometheus & Grafana', price: 699, duration: '1-2 months', level: 'Intermediate', certificate: true, link: 'https://prometheus.io/docs/prometheus/latest/getting_started/', overview: 'Monitoring and visualization of DevOps infrastructure' },
  { id: 10, name: 'Terraform', price: 499, duration: '2-3 months', level: 'Intermediate', certificate: true, link: 'https://www.terraform.io/docs', overview: 'Infrastructure as Code with Terraform' }
];

// Routes

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === adminCredentials.username && password === adminCredentials.password) {
    const token = jwt.sign({ role: 'admin', username }, process.env.JWT_SECRET || 'devopshub-secret', { expiresIn: '24h' });
    res.json({ success: true, token, role: 'admin' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashedPassword, name, enrolledCourses: [] };
  users.push(user);
  
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'devopshub-secret', { expiresIn: '24h' });
  res.json({ success: true, token, user: { id: user.id, email, name } });
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'devopshub-secret', { expiresIn: '24h' });
  res.json({ success: true, token, user: { id: user.id, email, name: user.name } });
});

// Get All Courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Get Single Course
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Admin: Update Course
app.put('/api/admin/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (course) {
    Object.assign(course, req.body);
    res.json({ success: true, course });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// AI Chatbot Endpoint
app.post('/api/chatbot', (req, res) => {
  const { message } = req.body;
  
  const responses = {
    'hello': 'Hello! Welcome to DevOpsHub. How can I help you today?',
    'courses': 'We offer 10 amazing courses covering all DevOps concepts. Check our courses page!',
    'help': 'I can help you with information about courses, pricing, duration, and more!',
    'pricing': 'Our courses range from ₹399 to ₹1600. Which course interests you?',
    'default': 'I can help you with DevOps courses. Ask me about courses, pricing, or duration!'
  };
  
  const reply = responses[message.toLowerCase()] || responses['default'];
  res.json({ reply, timestamp: new Date() });
});

// Get User Profile
app.get('/api/users/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'devopshub-secret');
    const user = users.find(u => u.id === decoded.id);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));