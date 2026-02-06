import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import ChromeExtensionButton from './ChromeExtensionButton';
import DemoClickUpPage from './DemoClickUpPage';
import DemoMuseOperatorUI from './DemoMuseOperatorUI';
import DemoExplainerBubble from './DemoExplainerBubble';
import DemoEndOverlay from './DemoEndOverlay';
import KnowledgeFactoryPage from './KnowledgeFactoryPage';
import { demoScript } from './DemoScriptV2';
import { useTextToSpeech } from './hooks/useTextToSpeech';

// ElevenLabs API key from environment variable
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY || '';
const ELEVENLABS_VOICE_ID = process.env.REACT_APP_ELEVENLABS_VOICE_ID;
const ELEVENLABS_MODEL = process.env.REACT_APP_ELEVENLABS_MODEL;

function DemoApp() {
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [showExplainer, setShowExplainer] = useState(true);
  const [showEndOverlay, setShowEndOverlay] = useState(false);
  const [showKnowledgeFactory, setShowKnowledgeFactory] = useState(false);
  const [navNextTick, setNavNextTick] = useState(0);
  const [navPrevTick, setNavPrevTick] = useState(0);
  const [speechComplete, setSpeechComplete] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);

  // Track which scene we last narrated to prevent duplicates
  const lastNarratedSceneRef = useRef<number>(-1);
  // Track if user has clicked the extension button (to prevent auto-play on page load)
  const hasUserClickedRef = useRef<boolean>(false);

  // Initialize TTS hook
  const { speak, stop, isPlaying, isLoading } = useTextToSpeech(
    ELEVENLABS_API_KEY,
    () => setSpeechComplete(true) // Called when speech ends
  );

  // Speak narration for a scene (only if not already narrated)
  const speakSceneNarration = useCallback((sceneIndex: number, force: boolean = false) => {
    // Skip if user hasn't clicked the button yet
    if (!hasUserClickedRef.current) {
      return;
    }

    // Skip if we already narrated this scene (unless forced)
    if (!force && lastNarratedSceneRef.current === sceneIndex) {
      return;
    }

    const scene = demoScript[sceneIndex];
    if (scene?.explainer?.description && narrationEnabled) {
      lastNarratedSceneRef.current = sceneIndex;
      setSpeechComplete(false);
      speak(scene.explainer.description, {
        voiceId: ELEVENLABS_VOICE_ID,
        model: ELEVENLABS_MODEL,
      });
    }
  }, [speak, narrationEnabled]);

  // Speak narration when Muse panel becomes visible (first scene only on initial open)
  useEffect(() => {
    if (isMuseVisible && currentSceneIndex === 0 && lastNarratedSceneRef.current === -1 && hasUserClickedRef.current) {
      // Small delay to let the panel animation complete
      const timer = setTimeout(() => {
        speakSceneNarration(0);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isMuseVisible, currentSceneIndex, speakSceneNarration]);

  // Handle speech completion
  const handleSpeechHandled = useCallback(() => {
    setSpeechComplete(false);
  }, []);

  const handleExtensionClick = () => {
    const wasVisible = isMuseVisible;
    setIsMuseVisible(!isMuseVisible);

    if (!wasVisible) {
      // Opening the panel
      hasUserClickedRef.current = true;
      setShowExplainer(true);

      // Start narration for first scene when button is clicked
      if (currentSceneIndex === 0 && lastNarratedSceneRef.current === -1) {
        setTimeout(() => {
          speakSceneNarration(0);
        }, 500);
      }
    } else {
      // Closing the panel
      setShowExplainer(false);
      stop(); // Stop any playing narration
    }
  };

  const handleClickUpUpdate = (updates: any[]) => {
    setClickUpUpdates(updates);
    // Clear updates after they've been processed
    setTimeout(() => setClickUpUpdates([]), 100);
  };

  const handleSceneChange = (sceneIndex: number) => {
    setCurrentSceneIndex(sceneIndex);

    // Speak narration for the new scene
    speakSceneNarration(sceneIndex);

    // Check if we've reached the last scene
    if (sceneIndex === demoScript.length - 1) {
      // Show overlay after a delay when last scene starts
      setTimeout(() => {
        setShowEndOverlay(true);
      }, 15000); // Show after 15 seconds (adjust based on last scene duration)
    }
  };

  // Toggle narration on/off
  const toggleNarration = () => {
    if (narrationEnabled) {
      stop();
    }
    setNarrationEnabled(!narrationEnabled);
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
          speechComplete={speechComplete}
          onSpeechHandled={handleSpeechHandled}
          requestNext={navNextTick}
          requestPrev={navPrevTick}
          autoAdvance={narrationEnabled}
        />
      </div>

      {/* Narration Toggle */}
      {isMuseVisible && (
        <button
          onClick={toggleNarration}
          className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            narrationEnabled
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title={narrationEnabled ? 'Disable narration' : 'Enable narration'}
        >
          {isLoading ? (
            <span className="animate-spin">⏳</span>
          ) : isPlaying ? (
            <span>🔊</span>
          ) : (
            <span>🔇</span>
          )}
          <span className="text-sm font-medium">
            {narrationEnabled ? 'Narration On' : 'Narration Off'}
          </span>
        </button>
      )}

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
