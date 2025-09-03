import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import DemoClickUpPage from '../DemoClickUpPage';
import WalkthroughMusePanel from './WalkthroughMusePanel';
import { UserStoryWalkthrough, WalkthroughStep } from '../walkthroughs/PRDWalkthroughs';

interface InteractiveWalkthroughProps {
  walkthrough: UserStoryWalkthrough;
  onClose: () => void;
}

const InteractiveWalkthrough: React.FC<InteractiveWalkthroughProps> = ({ 
  walkthrough, 
  onClose 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMuseVisible, setIsMuseVisible] = useState(false);
  const [clickUpUpdates, setClickUpUpdates] = useState<any[]>([]);
  const [highlightElement, setHighlightElement] = useState<string>('');
  
  const currentStep = walkthrough.steps[currentStepIndex];

  // Apply step actions
  useEffect(() => {
    if (!currentStep) return;

    // Use step data if available for more realistic content
    const stepData = currentStep.data || {};

    // Handle different step actions
    switch (currentStep.action) {
      case 'show-context':
        // Show context detection with actual data from step
        setClickUpUpdates([{
          type: 'context-detected',
          client: stepData.client_id || 'EcoBottle Co',
          task: stepData.task_id || 'EC-3021',
          confidence: stepData.confidence || 0.99,
          client_name: stepData.client_name,
          task_title: stepData.task_title
        }]);
        break;
      
      case 'show-muse':
      case 'open-muse':
      case 'launch-muse':
      case 'open-side-panel':
        setIsMuseVisible(true);
        break;
      
      case 'hide-muse':
      case 'close-muse':
        setIsMuseVisible(false);
        break;
      
      case 'complete-job':
        setClickUpUpdates([{
          type: 'job-complete',
          agent: stepData.agent || 'Echo',
          deliverables: stepData.deliverables || ['Content created'],
          job_id: stepData.job_id
        }]);
        break;
      
      case 'start-sync':
        setClickUpUpdates([{
          type: 'sync-in-progress',
          target: stepData.target,
          sync_type: stepData.sync_type
        }]);
        break;
      
      case 'show-error':
        setClickUpUpdates([{
          type: 'sync-error',
          error: stepData.error_message || 'Sync failed',
          error_code: stepData.error_code,
          retry_after: stepData.retry_after
        }]);
        break;
      
      case 'show-comment':
        setClickUpUpdates([{
          type: 'comment-posted',
          comment: stepData.comment,
          attachments: stepData.attachments_count,
          fields_updated: stepData.fields_updated,
          muse_link: stepData.muse_link,
          clickup_visual_changes: stepData.clickup_visual_changes,
          documents_uploaded: stepData.clickup_visual_changes?.documents_uploaded
        }]);
        break;
      
      case 'show-success':
        setClickUpUpdates([{
          type: 'sync-success',
          message: stepData.message,
          status: stepData.status,
          clickup_url: stepData.clickup_url,
          clickup_visual_changes: stepData.clickup_visual_changes,
          attachments_added: stepData.clickup_visual_changes?.attachments_added
        }]);
        break;
      
      case 'retry-sync':
        setClickUpUpdates([{
          type: 'retry-success',
          attempt: stepData.attempt,
          status: stepData.status,
          message: stepData.message
        }]);
        break;
      
      // Job management actions
      case 'open-job-form':
        setClickUpUpdates([{
          type: 'show-job-form',
          client: stepData.client,
          context: stepData.context
        }]);
        break;
      
      case 'type-description':
      case 'select-agents':
      case 'show-job-created':
      case 'show-job-active':
      case 'show-agent-working':
      case 'show-consultation':
      case 'show-deliverable':
      case 'type-message':
      case 'show-routing':
      case 'show-muse-ideas':
      case 'show-revised-copy':
        // These actions update the Muse UI with specific data
        setClickUpUpdates([{
          type: currentStep.action,
          ...stepData
        }]);
        break;
      
      default:
        // For any other action, pass through the data
        if (stepData && Object.keys(stepData).length > 0) {
          setClickUpUpdates([{
            type: currentStep.action || 'update',
            ...stepData
          }]);
        }
        break;
    }

    // Set highlight element
    if (currentStep.highlight) {
      setHighlightElement(currentStep.highlight);
    } else {
      setHighlightElement('');
    }
  }, [currentStep]);

  const nextStep = () => {
    if (currentStepIndex < walkthrough.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="h-screen bg-gray-100 overflow-hidden relative">
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
      {/* Main UI - ClickUp Page */}
      <div className="w-full h-full">
        <DemoClickUpPage updates={clickUpUpdates} />
      </div>

      {/* Muse Operator Side Panel */}
      {isMuseVisible && (
        <div className="absolute top-0 right-0 h-full z-40 animate-slide-in-right">
          <WalkthroughMusePanel 
            isVisible={isMuseVisible}
            currentStep={currentStep}
          />
        </div>
      )}

      {/* Highlight Overlay */}
      {highlightElement && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {/* Dimmed background */}
            <div className="absolute inset-0 bg-black/30" />
            
            {/* Highlighted area (would be dynamically positioned based on element) */}
            <div 
              className="absolute bg-transparent border-4 border-yellow-400 rounded-lg animate-pulse"
              style={getHighlightStyle(highlightElement)}
            >
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-yellow-300 rounded-lg" />
            </div>
          </div>
        </div>
      )}

      {/* Step Information Bubble */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-lg shadow-2xl border-2 border-gray-800 max-w-lg">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-500">
                Step {currentStepIndex + 1} of {walkthrough.steps.length}
              </span>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {currentStep?.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentStep?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center space-x-4">
          {/* Previous Arrow */}
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`group flex items-center justify-center w-16 h-16 rounded-full transition-all ${
              currentStepIndex === 0 
                ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                : 'bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl cursor-pointer'
            } border-2 border-gray-800`}
          >
            <ChevronLeft className={`w-8 h-8 ${
              currentStepIndex === 0 ? 'text-gray-500' : 'text-gray-800 group-hover:text-blue-600'
            }`} />
          </button>

          {/* Step Indicator */}
          <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-gray-800">
            <div className="flex items-center space-x-2">
              {walkthrough.steps.map((_, index) => (
                <div
                  key={index}
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
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextStep}
            disabled={currentStepIndex === walkthrough.steps.length - 1}
            className={`group flex items-center justify-center w-16 h-16 rounded-full transition-all ${
              currentStepIndex === walkthrough.steps.length - 1
                ? 'bg-gray-300 cursor-not-allowed opacity-50' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer animate-pulse'
            } border-2 border-gray-800`}
          >
            <ChevronRight className={`w-8 h-8 text-white ${
              currentStepIndex === walkthrough.steps.length - 1 ? '' : 'group-hover:translate-x-1'
            } transition-transform`} />
          </button>
        </div>
      </div>

      {/* Pointer Arrow (if step has pointer coordinates) */}
      {currentStep?.pointer && (
        <div 
          className="absolute z-40"
          style={{
            left: `${currentStep.pointer.x}%`,
            top: `${currentStep.pointer.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            {/* Animated circle */}
            <div className="absolute w-12 h-12 bg-yellow-400 rounded-full animate-ping opacity-75" />
            
            {/* Arrow pointing to element */}
            <svg className="w-24 h-24 -mt-12 -ml-12" viewBox="0 0 100 100">
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#FBBF24"
                  />
                </marker>
              </defs>
              <line
                x1="20"
                y1="20"
                x2="50"
                y2="50"
                stroke="#FBBF24"
                strokeWidth="3"
                markerEnd="url(#arrowhead)"
                className="animate-pulse"
              />
            </svg>
            
            {/* Label */}
            <div className="absolute top-0 left-0 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
              Look here!
            </div>
          </div>
        </div>
      )}

      {/* Story Context Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">{walkthrough.epic}</h4>
              <p className="text-sm opacity-90">{walkthrough.story}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-75">Acceptance Criteria:</p>
              <p className="text-xs max-w-md">{walkthrough.acceptance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get highlight styles based on element ID
function getHighlightStyle(elementId: string): React.CSSProperties {
  const styles: { [key: string]: React.CSSProperties } = {
    'chrome-extension': {
      top: '10px',
      right: '10px',
      width: '60px',
      height: '60px'
    },
    'clickup-page': {
      top: '80px',
      left: '20px',
      right: '420px',
      bottom: '100px'
    },
    'muse-header': {
      top: '10px',
      right: '420px',
      width: '300px',
      height: '80px'
    },
    'context-bar': {
      top: '100px',
      right: '420px',
      width: '350px',
      height: '60px'
    },
    'agent-echo': {
      top: '200px',
      right: '50px',
      width: '320px',
      height: '120px'
    },
    'sync-button': {
      top: '350px',
      right: '100px',
      width: '200px',
      height: '50px'
    },
    'sync-status': {
      top: '420px',
      right: '50px',
      width: '320px',
      height: '80px'
    },
    'message-input': {
      bottom: '120px',
      right: '50px',
      width: '320px',
      height: '60px'
    },
    'agent-grid': {
      top: '150px',
      right: '50px',
      width: '320px',
      height: '400px'
    }
  };

  return styles[elementId] || {
    top: '50%',
    left: '50%',
    width: '200px',
    height: '100px',
    transform: 'translate(-50%, -50%)'
  };
}

export default InteractiveWalkthrough;