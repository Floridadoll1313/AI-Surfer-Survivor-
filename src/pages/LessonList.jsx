// src/pages/LessonList.jsx
import { Link } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useLessonProgress } from '../hooks/useLessonProgress';

export default function LessonList() {
  const { isComplete } = useLessonProgress();

  return (
    <div>
      <h1>Lessons</h1>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            <Link to={`/lessons/${lesson.id}`}>
              {lesson.title}
            </Link>
            {isComplete(lesson.id) && (
              <span style={{ marginLeft: 8, color: 'green' }}>
                ✔
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}