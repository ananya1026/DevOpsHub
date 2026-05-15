import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import './Home.css';

export const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data.slice(0, 6));
    } catch (err) {
      console.error('Failed to fetch courses');
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Master DevOps & Cloud Technologies</h1>
          <p>Learn from industry experts and build real-world projects</p>
          <button
            className="btn-hero"
            onClick={() => navigate('/register')}
          >
            Get Started <ArrowRight size={20} />
          </button>
        </div>
        <div className="hero-visual">
          <div className="floating-card">DevOps</div>
          <div className="floating-card delay-1">Cloud</div>
          <div className="floating-card delay-2">CI/CD</div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="section-header">
          <h2>Featured Courses</h2>
          <p>Explore our most popular DevOps courses</p>
        </div>

        <div className="courses-grid">
          {courses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={(id) => navigate(`/course/${id}`)}
            />
          ))}
        </div>

        <div className="section-footer">
          <button className="btn-explore" onClick={() => navigate('/dashboard')}>
            View All Courses →
          </button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose DevOpsHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Content</h3>
            <p>Learn from basics to advanced DevOps concepts</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Certification</h3>
            <p>Get recognized certificates upon completion</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Industry Ready</h3>
            <p>Skill up for real-world DevOps jobs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Expert Support</h3>
            <p>Learn from industry professionals</p>
          </div>
        </div>
      </section>
    </div>
  );
};