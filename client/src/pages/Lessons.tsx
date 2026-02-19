import React from 'react';
import { lessons } from '../data/lessonsData';

const Lessons: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-cyan-400">Survival Training Modules</h1>
        
        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-[#112240] p-6 rounded-lg border border-cyan-900/50 hover:border-cyan-400 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-white">{lesson.title}</h2>
                <span className="px-3 py-1 bg-cyan-900/30 text-cyan-400 text-xs rounded-full border border-cyan-400/30">
                  {lesson.category}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              <div className="prose prose-invert max-w-none text-gray-300">
                {lesson.content}
              </div>
              <button className="mt-6 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded transition-colors">
                Complete Module
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
