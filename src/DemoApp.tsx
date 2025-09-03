import React, { useState } from 'react';
import './App.css';
import ChromeExtensionButton from './ChromeExtensionButton';
import DemoClickUpPage from './DemoClickUpPage';
import DemoMuseOperatorUI from './DemoMuseOperatorUI';
import DemoExplainerBubble from './DemoExplainerBubble';
import DemoEndOverlay from './DemoEndOverlay';
import KnowledgeFactoryPage from './KnowledgeFactoryPage';
import { demoScript } from './DemoScriptV2';

function DemoApp() {
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showExplainer, setShowExplainer] = useState(true);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [showKnowledgeFactory, setShowKnowledgeFactory] = useState(false);
  const [navNextTick, setNavNextTick] = useState(0);
  const [navPrevTick, setNavPrevTick] = useState(0);

  const handleExtensionClick = () => {
    setIsMuseVisible(!isMuseVisible);
    if (!isMuseVisible) {
      // Start showing explainer immediately when panel opens
      setShowExplainer(true);
    } else {
      setShowExplainer(false);
    }
  };

  const handleClickUpUpdate = (updates: any[]) => {
    setClickUpUpdates(updates);
    // Clear updates after they've been processed
    setTimeout(() => setClickUpUpdates([]), 100);
  };

  const handleSceneChange = (sceneIndex: number) => {
    setCurrentSceneIndex(sceneIndex);
    
    // Check if we've reached the last scene
    if (sceneIndex === demoScript.length - 1) {
      // Show overlay after a delay when last scene starts
      setTimeout(() => {
        setShowEndOverlay(true);
      }, 15000); // Show after 15 seconds (adjust based on last scene duration)
    }
  };

  const currentScene = demoScript[currentSceneIndex];

  // If showing Knowledge Factory page, render that instead
  if (showKnowledgeFactory) {
    return <KnowledgeFactoryPage onBack={() => setShowKnowledgeFactory(false)} />;
  }

  return (
    <div className="relative h-screen bg-gray-100 overflow-hidden">
      {/* Chrome Extension Button */}
      <ChromeExtensionButton 
        onClick={handleExtensionClick}
        isActive={isMuseVisible}
      />

      {/* ClickUp Page - Always full width */}
      <div className="w-full h-full">
        <DemoClickUpPage updates={clickUpUpdates} />
      </div>

      {/* Muse Operator UI - Overlay */}
      <div className={`absolute top-0 right-0 h-full transition-all duration-500 ${
        isMuseVisible ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <DemoMuseOperatorUI 
          isVisible={isMuseVisible}
          onClickUpUpdate={handleClickUpUpdate}
          onSceneChange={handleSceneChange}
          speechComplete={false}
          onSpeechHandled={() => {}}
          requestNext={navNextTick}
          requestPrev={navPrevTick}
          autoAdvance={false}
        />
      </div>

      {/* Explainer Bubble */}
      {currentScene?.explainer && (
        <DemoExplainerBubble
          title={currentScene.explainer.title}
          description={currentScene.explainer.description}
          step={currentSceneIndex + 1}
          totalSteps={demoScript.length}
          isVisible={showExplainer && isMuseVisible}
          onClose={() => setShowExplainer(false)}
          onNext={() => setNavNextTick(t => t + 1)}
          onPrev={() => setNavPrevTick(t => t + 1)}
        />
      )}
      
      {/* End of Demo Overlay */}
      <DemoEndOverlay 
        isVisible={showEndOverlay}
        onClose={() => setShowEndOverlay(false)}
        onLearnMore={() => {
          setShowEndOverlay(false);
          setShowKnowledgeFactory(true);
        }}
      />
    </div>
  );
}

export default DemoApp;
