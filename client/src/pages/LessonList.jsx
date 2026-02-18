// src/pages/LessonList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useLessonProgress } from '../hooks/useLessonProgress';

export default function LessonList() {
  const { isComplete } = useLessonProgress();

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Lessons</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {lessons.map(lesson => (
          <li key={lesson.id} style={{ marginBottom: '10px' }}>
            <Link
              to={`/lessons/${lesson.id}`}
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              {lesson.title}
            </Link>
            {isComplete(lesson.id) && (
              <span style={{ marginLeft: 8, color: 'green' }}>✔</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}