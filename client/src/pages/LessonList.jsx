import React from "react";
import { Link } from "react-router-dom";

export default function LessonList() {
  const lessons = [
    { id: 1, title: "The AI Mastery Guide", category: "Basics", time: "5 min" },
    { id: 2, title: "Ocean Tide Protocols", category: "Survival", time: "10 min" },
    { id: 3, title: "Navigating the Realm", category: "Mapping", time: "8 min" },
    { id: 4, title: "Digital Surf Mechanics", category: "Advanced", time: "15 min" },
  ];

  return (
    <div className="lessons-root">
      <style>{`
        .lessons-root {
          padding: 60px 20px;
          max-width: 900px;
          margin: 0 auto;
        }
        .lessons-title {
          font-size: 2.5rem;
          color: #35c9ff;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 40px;
          text-align: center;
        }
        .lesson-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(78, 203, 255, 0.2);
          margin-bottom: 15px;
          padding: 20px;
          border-radius: 8px;
          transition: 0.3s;
          text-decoration: none;
          color: inherit;
        }
        .lesson-item:hover {
          background: rgba(53, 201, 255, 0.1);
          border-color: #35c9ff;
          transform: translateX(10px);
        }
        .lesson-info h3 {
          margin: 0;
          color: #e6f7ff;
        }
        .lesson-meta {
          font-size: 0.75rem;
          color: #ff9f40;
          text-transform: uppercase;
          margin-top: 5px;
          display: block;
        }
        .lesson-stats {
          text-align: right;
          font-size: 0.8rem;
          opacity: 0.6;
        }
      `}</style>

      <h1 className="lessons-title">AI Mastery Library</h1>
      
      <div className="lessons-container">
        {lessons.map((lesson) => (
          <Link to={`/lessons/${lesson.id}`} key={lesson.id} className="lesson-item">
            <div className="lesson-info">
              <span className="lesson-meta">{lesson.category}</span>
              <h3>{lesson.title}</h3>
            </div>
            <div className="lesson-stats">
              <div>{lesson.time}</div>
              <div style={{color: '#35c9ff'}}>READ FILE ></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
