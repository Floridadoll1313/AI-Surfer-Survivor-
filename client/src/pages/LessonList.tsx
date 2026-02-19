import React from "react";
import { useParams, Link } from "react-router-dom";

export default function LessonPage() {
  const { id } = useParams();

  // This is a placeholder for your content. In a real app, you might fetch this from a file or database.
  const lessonData: Record<string, { title: string; content: string }> = {
    "1": { 
      title: "The AI Mastery Guide", 
      content: "Welcome to the digital wilderness. To master the island, you must first understand the AI pulse..." 
    },
    "2": { 
      title: "Ocean Tide Protocols", 
      content: "The tide is not just water; it is a stream of data. Survival requires synchronizing your biometric frequency..." 
    }
  };

  const currentLesson = lessonData[id || "1"] || { title: "File Not Found", content: "Signal lost..." };

  return (
    <div className="lesson-page-root">
      <style>{`
        .lesson-page-root {
          padding: 60px 20px;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .back-link {
          color: #35c9ff;
          text-decoration: none;
          font-size: 0.9rem;
          display: block;
          margin-bottom: 30px;
        }
        .lesson-header {
          border-bottom: 1px solid rgba(78, 203, 255, 0.3);
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .lesson-title {
          font-size: 2.2rem;
          color: #e6f7ff;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .lesson-content {
          font-size: 1.1rem;
          color: rgba(230, 247, 255, 0.8);
          white-space: pre-wrap;
        }
      `}</style>

      <Link to="/lessons" className="back-link">
        {"< BACK TO LIBRARY"}
      </Link>

      <header className="lesson-header">
        <h1 className="lesson-title">{currentLesson.title}</h1>
      </header>

      <article className="lesson-content">
        {currentLesson.content}
      </article>
    </div>
  );
}
