// src/pages/LessonPage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import { useLessonProgress } from '../hooks/useLessonProgress';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markComplete, isComplete } = useLessonProgress();

  const index = lessons.findIndex(l => l.id === id);
  const lesson = lessons[index];

  if (!lesson) return <div>Lesson not found.</div>;

  const nextLesson = lessons[index + 1];

  function handleComplete() {
    markComplete(lesson.id);
    if (nextLesson) {
      navigate(`/lessons/${nextLesson.id}`);
    }
  }

  return (
    <div>
      <h1>{lesson.title}</h1>

      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {lesson.content}
      </pre>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleComplete}>
          {isComplete(lesson.id) ? 'Completed' : 'Mark complete'}
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/lessons">Back to all lessons</Link>
      </div>
    </div>
  );
}