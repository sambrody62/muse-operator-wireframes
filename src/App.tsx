import React, { useState } from 'react';
import './App.css';
import IntegratedApp from './IntegratedApp';
import DemoApp from './DemoApp';
import WalkthroughSelector from './components/WalkthroughSelector';

function App() {
  const [mode, setMode] = useState<'demo' | 'integrated' | 'walkthroughs'>('walkthroughs');

  return (
    <div className="App">
      {/* Mode Selector - floating (fixed), centered at top */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex space-x-2">
          <button
            onClick={() => setMode('walkthroughs')}
            className={`px-4 py-2 rounded transition-colors border ${
              mode === 'walkthroughs' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-transparent text-gray-700 hover:bg-gray-200/60 border-gray-300'
            }`}
          >
            PRD Walkthroughs
          </button>
          <button
            onClick={() => setMode('demo')}
            className={`px-4 py-2 rounded transition-colors border ${
              mode === 'demo' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-transparent text-gray-700 hover:bg-gray-200/60 border-gray-300'
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => setMode('integrated')}
            className={`px-4 py-2 rounded transition-colors border ${
              mode === 'integrated' 
                ? 'bg-blue-600 text-white border-blue-700' 
                : 'bg-transparent text-gray-700 hover:bg-gray-200/60 border-gray-300'
            }`}
          >
            Integrated View
          </button>
        </div>
      </div>

      {/* Content */}
      {mode === 'walkthroughs' && <WalkthroughSelector />}
      {mode === 'demo' && <DemoApp />}
      {mode === 'integrated' && <IntegratedApp />}
    </div>
  );
}

export default App;
