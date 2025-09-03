import React from 'react';
import { ChevronLeft, Clock, Tag, User, CheckSquare, MessageSquare } from 'lucide-react';

interface ClickUpWireframeProps {
  onToggleMuse: () => void;
}

const ClickUpWireframe: React.FC<ClickUpWireframeProps> = ({ onToggleMuse }) => {
  return (
    <div className="h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-64 border-r-2 border-gray-800 p-4 bg-gray-50">
        <div className="sketch-border p-3 mb-4">
          <h2 className="font-bold text-lg mb-2">Spaces</h2>
          <div className="space-y-2">
            <div className="wireframe-text w-4/5"></div>
            <div className="wireframe-text w-3/5"></div>
            <div className="wireframe-text w-4/5"></div>
          </div>
        </div>
        
        <div className="sketch-border p-3">
          <h3 className="font-bold mb-2">Lists</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                <div className="w-4 h-4 border-2 border-gray-600 rounded"></div>
                <div className="wireframe-text flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="wireframe-button">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-bold">Task: Implement Muse Operator MVP</h1>
          </div>
          <button 
            onClick={onToggleMuse}
            className="wireframe-button flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Open Muse
          </button>
        </div>

        {/* Task Details */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl">
            {/* Status Bar */}
            <div className="sketch-border p-4 mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full border-2 border-green-600 bg-green-100 mr-2"></div>
                  <span className="font-bold">In Progress</span>
                </div>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Assigned to: Sam B</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Due: Nov 15</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="sketch-border p-4 mb-6">
              <h3 className="font-bold text-lg mb-3">Description</h3>
              <div className="space-y-2">
                <div className="wireframe-text"></div>
                <div className="wireframe-text"></div>
                <div className="wireframe-text w-5/6"></div>
                <div className="wireframe-text w-4/6"></div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 border-2 border-gray-300 rounded">
                <p className="font-mono text-sm">
                  Key Requirements:<br/>
                  - Self-learning data layer (Postgres + pgvector)<br/>
                  - Five domain agents + Traffic Agent<br/>
                  - Chrome Side Panel UI<br/>
                  - ClickUp integration
                </p>
              </div>
            </div>

            {/* Subtasks */}
            <div className="sketch-border p-4 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <CheckSquare className="w-5 h-5 mr-2" />
                Subtasks (3/7)
              </h3>
              <div className="space-y-2">
                {[
                  { done: true, text: "Set up database schema" },
                  { done: true, text: "Configure pgvector extension" },
                  { done: true, text: "Create Traffic Agent base" },
                  { done: false, text: "Implement domain agents" },
                  { done: false, text: "Build Chrome extension" },
                  { done: false, text: "Create Side Panel UI" },
                  { done: false, text: "ClickUp API integration" }
                ].map((task, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2">
                    <div className={`w-5 h-5 border-2 border-gray-600 rounded ${task.done ? 'bg-gray-300' : 'bg-white'}`}>
                      {task.done && <span className="block text-center leading-none">✓</span>}
                    </div>
                    <span className={task.done ? 'line-through text-gray-500' : ''}>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="sketch-border p-4 mb-6">
              <h3 className="font-bold text-lg mb-3 flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {['MVP', 'Backend', 'Frontend', 'AI', 'Database'].map(tag => (
                  <span key={tag} className="px-3 py-1 border-2 border-gray-600 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Activity/Comments */}
            <div className="sketch-border p-4">
              <h3 className="font-bold text-lg mb-3">Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-600 bg-gray-100"></div>
                    <div className="flex-1">
                      <div className="wireframe-text w-1/3 mb-2"></div>
                      <div className="sketch-border p-3 bg-gray-50">
                        <div className="wireframe-text"></div>
                        <div className="wireframe-text w-4/5"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClickUpWireframe;