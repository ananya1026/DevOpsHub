import React from 'react';
import { Course } from '../types';
import { BookOpen, Clock, Award, ExternalLink } from 'lucide-react';
import './CourseCard.css';

interface CourseCardProps {
  course: Course;
  onViewDetails: (id: number) => void;
  onEnroll?: (id: number) => void;
  isEnrolled?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewDetails,
  onEnroll,
  isEnrolled,
}) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <BookOpen size={32} className="course-icon" />
        <span className={`level-badge ${course.level.toLowerCase()}`}>
          {course.level}
        </span>
      </div>

      <h3>{course.name}</h3>
      <p className="overview">{course.overview.substring(0, 80)}...</p>

      <div className="course-meta">
        <div className="meta-item">
          <Clock size={16} />
          <span>{course.duration}</span>
        </div>
        <div className="meta-item">
          <Award size={16} />
          <span>Certificate</span>
        </div>
      </div>

      <div className="course-footer">
        <div className="price">₹{course.price}</div>
        <div className="actions">
          <button
            className="btn-details"
            onClick={() => onViewDetails(course.id)}
          >
            View Details
          </button>
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-visit"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {onEnroll && (
        <button
          className={`btn-enroll ${isEnrolled ? 'enrolled' : ''}`}
          onClick={() => onEnroll(course.id)}
          disabled={isEnrolled}
        >
          {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
        </button>
      )}
    </div>
  );
};