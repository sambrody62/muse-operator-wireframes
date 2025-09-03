import React from 'react';

interface WireframeLayoutProps {
  children: React.ReactNode;
}

const WireframeLayout: React.FC<WireframeLayoutProps> = ({ children }) => {
  return (
    <div className="font-sketch relative">
      <style>{`
        .sketch-border {
          border: 2px solid #333;
          border-radius: 3px;
          position: relative;
        }
        
        .sketch-border::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          border: 2px solid #333;
          border-radius: 3px;
          opacity: 0.1;
          transform: rotate(0.2deg);
        }
        
        .wireframe-text {
          background: linear-gradient(90deg, #ddd 40%, #eee 50%, #ddd 60%);
          height: 12px;
          margin: 4px 0;
          border-radius: 2px;
        }
        
        .wireframe-button {
          border: 2px solid #333;
          background: white;
          padding: 8px 16px;
          border-radius: 3px;
          cursor: pointer;
          font-weight: bold;
          position: relative;
          transition: all 0.1s;
        }
        
        .wireframe-button:hover {
          transform: translate(1px, 1px);
        }
        
        .wireframe-button::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: -2px;
          bottom: -2px;
          background: #333;
          z-index: -1;
          border-radius: 3px;
        }
        
        @keyframes sketch-draw {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }
        
        .sketch-line {
          stroke-dasharray: 1000;
          animation: sketch-draw 0.5s ease-in-out forwards;
        }
      `}</style>
      {children}
    </div>
  );
};

export default WireframeLayout;