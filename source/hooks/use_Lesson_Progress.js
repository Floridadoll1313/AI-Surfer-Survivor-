// src/hooks/useLessonProgress.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lessonProgress';

export function useLessonProgress() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCompleted(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }, [completed]);

  function markComplete(id) {
    setCompleted(prev =>
      prev.includes(id) ? prev : [...prev, id]
    );
  }

  function isComplete(id) {
    return completed.includes(id);
  }

  return { completed, markComplete, isComplete };
}