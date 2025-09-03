import React from 'react';
import { Sparkles } from 'lucide-react';

interface ChromeExtensionButtonProps {
  onClick: () => void;
  isActive: boolean;
}

const ChromeExtensionButton: React.FC<ChromeExtensionButtonProps> = ({ onClick, isActive }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Instruction text removed; button pulses until clicked */}
      
      <button
        onClick={onClick}
        className={`
          relative p-3 rounded-xl transition-all duration-300 transform
          ${isActive 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 scale-110 shadow-2xl' 
            : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl hover:scale-105'
          }
        `}
      >
        <Sparkles 
          className={`w-6 h-6 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-purple-600'
          }`}
        />
        
        {/* Glowing animation when not active */}
        {!isActive && (
          <>
            {/* Pulsing glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur-md animate-pulse -z-10"></div>
            
            {/* Rotating glow ring */}
            <div className="absolute inset-[-8px] rounded-xl animate-spin-slow">
              <div className="h-full w-full rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-75 blur-md"></div>
            </div>
            
            {/* Notification dot */}
            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
            </span>
          </>
        )}
        
        {/* Active state glow */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-40 -z-10"></div>
        )}
      </button>
      
      {/* Tooltip removed */}
    </div>
  );
};

export default ChromeExtensionButton;
