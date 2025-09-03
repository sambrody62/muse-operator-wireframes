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
  // Highlight overlays/arrows removed per simplified UX
  
  const currentStep = walkthrough.steps[currentStepIndex];

  // Panel visibility is controlled by walkthrough steps (e.g., 'open-muse').

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

    // No highlight element handling
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

      {/* Highlight overlay removed */}

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

      {/* Bottom Controls: Epic details with in-box blue arrows and progress */}
      <div className="absolute bottom-4 left-4 z-50">
        <div className="bg-blue-50 rounded-xl border border-blue-200 shadow-lg p-4 max-w-xl">
          <div className="text-xs font-semibold text-blue-700">{walkthrough.epic}</div>
          <div className="text-sm font-medium text-slate-800 mt-0.5">{walkthrough.story}</div>
          <div className="text-xs text-slate-600 mt-2">
            <span className="font-semibold">Acceptance:</span> {walkthrough.acceptance}
          </div>

          <div className="mt-3 flex items-center justify-between">
            {/* Previous Arrow (blue) */}
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                currentStepIndex === 0 
                  ? 'bg-blue-300 cursor-not-allowed opacity-60' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg cursor-pointer'
              } border-2 border-blue-800`}
              aria-label="Previous step"
            >
              <ChevronLeft className={`w-6 h-6 text-white ${
                currentStepIndex === 0 ? '' : 'group-hover:-translate-x-0.5'
              } transition-transform`} />
            </button>

            {/* Step Indicator (dots) */}
            <div className="bg-white/90 px-4 py-2 rounded-full shadow border border-blue-200">
              <div className="flex items-center space-x-1">
                {walkthrough.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentStepIndex 
                        ? 'w-6 bg-blue-600' 
                        : index < currentStepIndex
                        ? 'w-2 bg-blue-400'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next Arrow (blue) */}
            <button
              onClick={nextStep}
              disabled={currentStepIndex === walkthrough.steps.length - 1}
              className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                currentStepIndex === walkthrough.steps.length - 1
                  ? 'bg-blue-300 cursor-not-allowed opacity-60' 
                  : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg cursor-pointer'
              } border-2 border-blue-800`}
              aria-label="Next step"
            >
              <ChevronRight className={`w-6 h-6 text-white ${
                currentStepIndex === walkthrough.steps.length - 1 ? '' : 'group-hover:translate-x-0.5'
              } transition-transform`} />
            </button>
          </div>
        </div>
      </div>

      {/* Pointer arrow removed */}

      {/* Removed full-width story context bar */}
    </div>
  );
};

export default InteractiveWalkthrough;
