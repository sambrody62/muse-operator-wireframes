import React, { useState, useEffect } from 'react';
import { X, Info, ChevronRight, ChevronLeft } from 'lucide-react';

interface DemoExplainerBubbleProps {
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  isVisible: boolean;
  onClose?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const DemoExplainerBubble: React.FC<DemoExplainerBubbleProps> = ({
  title,
  description,
  step,
  totalSteps,
  isVisible,
  onClose,
  onNext,
  onPrev
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Slight delay for smooth entrance
      setTimeout(() => setShow(true), 100);
    } else {
      setShow(false);
    }
  }, [isVisible]);

  if (!show) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isMinimized ? 'w-16' : 'w-96'
      }`}
    >
      {/* Main Bubble */}
      <div
        className={`bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl transition-all duration-300 ${
          isMinimized ? 'p-4' : 'p-6'
        }`}
      >
        {!isMinimized ? (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg">
                  <Info className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium opacity-90">
                  Step {step} of {totalSteps}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  title="Minimize"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                {onClose && (
                  <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-sm leading-relaxed opacity-95">
                {description}
              </p>
            </div>

            {/* Navigation Controls */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={onPrev}
                disabled={step <= 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
                  step <= 1
                    ? 'border-white/30 text-white/40 cursor-not-allowed'
                    : 'border-white/70 hover:bg-white/10 text-white'
                }`}
                title="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="bg-white/15 px-3 py-1 rounded-full text-xs font-medium">
                {step} / {totalSteps}
              </div>
              <button
                onClick={onNext}
                disabled={step >= totalSteps}
                className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
                  step >= totalSteps
                    ? 'border-white/30 text-white/40 cursor-not-allowed'
                    : 'border-white/70 hover:bg-white/10 text-white'
                }`}
                title="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          /* Minimized State */
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center justify-center w-full h-full"
            title="Expand"
          >
            <Info className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
};

export default DemoExplainerBubble;
