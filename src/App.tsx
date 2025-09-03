import React, { useState } from 'react';
import './App.css';
import IntegratedApp from './IntegratedApp';
import DemoApp from './DemoApp';
import WalkthroughSelector from './components/WalkthroughSelector';

function App() {
  const [mode, setMode] = useState<'demo' | 'integrated' | 'walkthroughs'>('walkthroughs');

  return (
    <div className="App">
      {/* Mode Selector */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2 flex space-x-2">
        <button
          onClick={() => setMode('walkthroughs')}
          className={`px-4 py-2 rounded transition-colors ${
            mode === 'walkthroughs' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          PRD Walkthroughs
        </button>
        <button
          onClick={() => setMode('demo')}
          className={`px-4 py-2 rounded transition-colors ${
            mode === 'demo' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Interactive Demo
        </button>
        <button
          onClick={() => setMode('integrated')}
          className={`px-4 py-2 rounded transition-colors ${
            mode === 'integrated' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Integrated View
        </button>
      </div>

      {/* Content */}
      {mode === 'walkthroughs' && <WalkthroughSelector />}
      {mode === 'demo' && <DemoApp />}
      {mode === 'integrated' && <IntegratedApp />}
    </div>
  );
}

export default App;