import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import axios from 'axios';
import { Edit2, Save, X } from 'lucide-react';
import './AdminPanel.css';

export const AdminPanel: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Course>>({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses');
    }
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setEditData(course);
  };

  const handleSave = async () => {
    if (editingId) {
      try {
        await axios.put(
          `http://localhost:5000/api/admin/courses/${editingId}`,
          editData
        );
        fetchCourses();
        setEditingId(null);
      } catch (err) {
        console.error('Failed to update course');
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard - Manage Courses</h2>

      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} className={editingId === course.id ? 'editing' : ''}>
              <td>
                {editingId === course.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                ) : (
                  course.name
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: parseInt(e.target.value) })
                    }
                  />
                ) : (
                  `₹${course.price}`
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <input
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({ ...editData, duration: e.target.value })
                    }
                  />
                ) : (
                  course.duration
                )}
              </td>
              <td>
                {editingId === course.id ? (
                  <select
                    value={editData.level}
                    onChange={(e) =>
                      setEditData({ ...editData, level: e.target.value })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                ) : (
                  course.level
                )}
              </td>
              <td>{course.certificate ? '✓' : '✗'}</td>
              <td>
                {editingId === course.id ? (
                  <>
                    <button
                      className="btn-save"
                      onClick={handleSave}
                    >
                      <Save size={16} />
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => setEditingId(null)}
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit2 size={16} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};