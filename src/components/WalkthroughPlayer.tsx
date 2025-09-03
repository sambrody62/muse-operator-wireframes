import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, RotateCcw, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { UserStoryWalkthrough, WalkthroughStep } from '../walkthroughs/PRDWalkthroughs';

interface WalkthroughPlayerProps {
  walkthrough: UserStoryWalkthrough;
  onClose: () => void;
  onStepChange?: (step: WalkthroughStep, index: number) => void;
}

const WalkthroughPlayer: React.FC<WalkthroughPlayerProps> = ({ 
  walkthrough, 
  onClose,
  onStepChange 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentStep = walkthrough.steps[currentStepIndex];
  const stepDuration = currentStep?.duration || 4000;

  // Auto-advance through steps
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const timer = setTimeout(() => {
      if (currentStepIndex < walkthrough.steps.length - 1) {
        nextStep();
      } else {
        setIsPlaying(false);
      }
    }, stepDuration);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(100, prev + (100 / (stepDuration / 100))));
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [currentStepIndex, isPlaying, isPaused, stepDuration, walkthrough.steps.length]);

  // Notify parent of step changes
  useEffect(() => {
    if (onStepChange && currentStep) {
      onStepChange(currentStep, currentStepIndex);
    }
  }, [currentStepIndex, currentStep, onStepChange]);

  const nextStep = () => {
    if (currentStepIndex < walkthrough.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setProgress(0);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const restart = () => {
    setCurrentStepIndex(0);
    setProgress(0);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPaused(!isPaused);
    } else {
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto">
      {/* Main Player Card */}
      <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold opacity-90">{walkthrough.epic}</span>
              <span className="text-xs opacity-75">•</span>
              <span className="text-xs opacity-75">Story {walkthrough.id.split('-')[0].toUpperCase()}</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h3 className="text-lg font-bold">{walkthrough.story}</h3>
        </div>

        {/* Current Step Content */}
        <div className="p-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl font-bold text-gray-800">
                {currentStep?.title}
              </h4>
              <span className="text-sm text-gray-500">
                Step {currentStepIndex + 1} of {walkthrough.steps.length}
              </span>
            </div>
            <p className="text-gray-600">
              {currentStep?.description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {walkthrough.steps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentStepIndex(index);
                  setProgress(0);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStepIndex 
                    ? 'w-8 bg-blue-600' 
                    : index < currentStepIndex
                    ? 'bg-blue-400'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {isPlaying && !isPaused ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={nextStep}
                disabled={currentStepIndex === walkthrough.steps.length - 1}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={restart}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                title="Restart"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  setCurrentStepIndex(walkthrough.steps.length - 1);
                  setProgress(100);
                  setIsPlaying(false);
                }}
                className="p-2 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                title="Skip to End"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Acceptance Criteria Footer */}
        <div className="bg-gray-50 border-t-2 border-gray-200 px-6 py-3">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Acceptance:</span> {walkthrough.acceptance}
          </p>
        </div>
      </div>

      {/* Action Indicator (if step has an action) */}
      {currentStep?.action && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
            Action: {currentStep.action.replace(/-/g, ' ')}
          </div>
        </div>
      )}

      {/* Pointer (if step has pointer coordinates) */}
      {currentStep?.pointer && (
        <div 
          className="fixed pointer-events-none"
          style={{
            left: `${currentStep.pointer.x}%`,
            top: `${currentStep.pointer.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            <div className="absolute w-8 h-8 bg-yellow-400 rounded-full animate-ping" />
            <div className="relative w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap font-semibold">
              Look here!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalkthroughPlayer;