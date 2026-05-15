import React, { useEffect, useState } from 'react';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../types';
import axios from 'axios';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);

  useEffect(() => {
    fetchCourses();
    loadEnrolledCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses');
    }
  };

  const loadEnrolledCourses = () => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolledCourses(enrolled);
  };

  const handleEnroll = (courseId: number) => {
    const updated = [...enrolledCourses, courseId];
    setEnrolledCourses(updated);
    localStorage.setItem('enrolledCourses', JSON.stringify(updated));
  };

  return (
    <div className="dashboard">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={(id) => alert(`Course ${id} details`)}
            onEnroll={handleEnroll}
            isEnrolled={enrolledCourses.includes(course.id)}
          />
        ))}
      </div>
    </div>
  );
};