import React from 'react';
import { lessons } from '../data/lessonsData';

const Lessons: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Survival Training</h1>
        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-[#112240] p-6 rounded-lg border border-cyan-900/50">
              <h2 className="text-2xl font-semibold text-white mb-2">{lesson.title}</h2>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              <div className="text-gray-300">{lesson.content}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
