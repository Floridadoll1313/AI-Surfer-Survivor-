import React from 'react';
import { lessons } from '../data/lessonsData';

const Lessons: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-cyan-900/50 pb-8">
          <h1 className="text-4xl font-bold mb-4 text-cyan-400">Survival Training</h1>
          <p className="text-gray-400 text-lg">Master the waves and the AI with these essential modules.</p>
        </header>

        <div className="grid gap-8">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id} 
              className="group bg-[#112240] p-8 rounded-xl border border-cyan-900/30 hover:border-cyan-400/50 transition-all duration-300 shadow-xl"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
                  Module {lesson.id}
                </span>
                <span className="bg-cyan-900/30 text-cyan-300 px-3 py-1 rounded-full text-xs">
                  {lesson.difficulty || 'Intermediate'}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {lesson.title}
              </h2>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                {lesson.description}
              </p>
              
              <div className="bg-[#0a192f]/50 p-6 rounded-lg border border-cyan-900/20 text-gray-300 italic">
                {lesson.content}
              </div>

              <button className="mt-8 w-full bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white py-3 rounded-lg font-semibold transition-all duration-300">
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
