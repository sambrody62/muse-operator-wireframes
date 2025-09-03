import React from 'react';
import { ChevronRight, Grid, MessageSquare, Database } from 'lucide-react';

interface LandingWireframeProps {
  onNavigate: (view: 'clickup' | 'knowledge') => void;
  onToggleMuse: () => void;
}

const LandingWireframe: React.FC<LandingWireframeProps> = ({ onNavigate, onToggleMuse }) => {
  return (
    <div className="h-full bg-white p-8">
      {/* Header */}
      <div className="sketch-border p-6 mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ textDecoration: 'underline wavy' }}>
          Muse Operator System - Wireframe View
        </h1>
        <div className="wireframe-text w-3/4"></div>
        <div className="wireframe-text w-1/2"></div>
      </div>

      {/* Main Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* ClickUp Integration Card */}
        <div 
          className="sketch-border p-6 hover:bg-gray-50 cursor-pointer"
          onClick={() => onNavigate('clickup')}
        >
          <div className="flex items-center mb-4">
            <Grid className="w-8 h-8 mr-3" />
            <h2 className="text-xl font-bold">ClickUp Task View</h2>
          </div>
          <div className="space-y-2 mb-4">
            <div className="wireframe-text"></div>
            <div className="wireframe-text w-4/5"></div>
            <div className="wireframe-text w-3/5"></div>
          </div>
          <button className="wireframe-button flex items-center">
            Open ClickUp <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Muse Operator Card */}
        <div 
          className="sketch-border p-6 hover:bg-gray-50 cursor-pointer"
          onClick={onToggleMuse}
        >
          <div className="flex items-center mb-4">
            <MessageSquare className="w-8 h-8 mr-3" />
            <h2 className="text-xl font-bold">Muse Operator Panel</h2>
          </div>
          <div className="space-y-2 mb-4">
            <div className="wireframe-text"></div>
            <div className="wireframe-text w-4/5"></div>
            <div className="wireframe-text w-2/3"></div>
          </div>
          <button className="wireframe-button flex items-center">
            Launch Muse <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>

        {/* Knowledge Factory Card */}
        <div 
          className="sketch-border p-6 hover:bg-gray-50 cursor-pointer"
          onClick={() => onNavigate('knowledge')}
        >
          <div className="flex items-center mb-4">
            <Database className="w-8 h-8 mr-3" />
            <h2 className="text-xl font-bold">Knowledge Factory</h2>
          </div>
          <div className="space-y-2 mb-4">
            <div className="wireframe-text"></div>
            <div className="wireframe-text w-5/6"></div>
            <div className="wireframe-text w-2/3"></div>
          </div>
          <button className="wireframe-button flex items-center">
            View Data <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>

      {/* System Architecture Sketch */}
      <div className="sketch-border p-6">
        <h3 className="text-lg font-bold mb-4">System Architecture</h3>
        <svg viewBox="0 0 800 400" className="w-full h-64">
          {/* Traffic Agent (center) */}
          <rect x="350" y="150" width="100" height="100" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="400" y="205" textAnchor="middle" className="font-bold">Traffic</text>
          <text x="400" y="225" textAnchor="middle">Agent</text>
          
          {/* Domain Agents */}
          <rect x="100" y="50" width="80" height="80" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="140" y="95" textAnchor="middle" fontSize="14">Agent 1</text>
          
          <rect x="250" y="20" width="80" height="80" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="290" y="65" textAnchor="middle" fontSize="14">Agent 2</text>
          
          <rect x="470" y="20" width="80" height="80" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="510" y="65" textAnchor="middle" fontSize="14">Agent 3</text>
          
          <rect x="620" y="50" width="80" height="80" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="660" y="95" textAnchor="middle" fontSize="14">Agent 4</text>
          
          <rect x="550" y="150" width="80" height="80" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="590" y="195" textAnchor="middle" fontSize="14">Agent 5</text>
          
          {/* Connections */}
          <line x1="180" y1="90" x2="350" y2="180" stroke="#333" strokeWidth="1" strokeDasharray="5,5" className="sketch-line" />
          <line x1="290" y1="100" x2="380" y2="150" stroke="#333" strokeWidth="1" strokeDasharray="5,5" className="sketch-line" />
          <line x1="470" y1="100" x2="420" y2="150" stroke="#333" strokeWidth="1" strokeDasharray="5,5" className="sketch-line" />
          <line x1="620" y1="90" x2="450" y2="180" stroke="#333" strokeWidth="1" strokeDasharray="5,5" className="sketch-line" />
          <line x1="550" y1="190" x2="450" y2="190" stroke="#333" strokeWidth="1" strokeDasharray="5,5" className="sketch-line" />
          
          {/* Database */}
          <ellipse cx="400" cy="330" rx="80" ry="30" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <ellipse cx="400" cy="310" rx="80" ry="30" fill="none" stroke="#333" strokeWidth="2" className="sketch-line" />
          <text x="400" y="335" textAnchor="middle" fontSize="14">Muse DB</text>
          
          {/* Connection to DB */}
          <line x1="400" y1="250" x2="400" y2="280" stroke="#333" strokeWidth="2" strokeDasharray="5,5" className="sketch-line" />
        </svg>
      </div>
    </div>
  );
};

export default LandingWireframe;