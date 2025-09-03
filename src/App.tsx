import React, { useState } from 'react';
import './App.css';
import WireframeLayout from './components/WireframeLayout';
import ClickUpWireframe from './wireframes/ClickUpWireframe';
import MuseOperatorWireframe from './wireframes/MuseOperatorWireframe';
import KnowledgeFactoryWireframe from './wireframes/KnowledgeFactoryWireframe';
import LandingWireframe from './wireframes/LandingWireframe';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'clickup' | 'knowledge'>('landing');
  const [showMusePanel, setShowMusePanel] = useState(false);

  return (
    <WireframeLayout>
      <div className="flex h-screen bg-gray-50">
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${showMusePanel ? 'mr-96' : ''}`}>
          {currentView === 'landing' && (
            <LandingWireframe 
              onNavigate={setCurrentView}
              onToggleMuse={() => setShowMusePanel(!showMusePanel)}
            />
          )}
          {currentView === 'clickup' && (
            <ClickUpWireframe onToggleMuse={() => setShowMusePanel(!showMusePanel)} />
          )}
          {currentView === 'knowledge' && (
            <KnowledgeFactoryWireframe onBack={() => setCurrentView('landing')} />
          )}
        </div>

        {/* Muse Operator Side Panel */}
        {showMusePanel && (
          <div className="fixed right-0 top-0 h-full w-96 border-l-4 border-gray-800 bg-white shadow-2xl">
            <MuseOperatorWireframe onClose={() => setShowMusePanel(false)} />
          </div>
        )}
      </div>
    </WireframeLayout>
  );
}

export default App;
