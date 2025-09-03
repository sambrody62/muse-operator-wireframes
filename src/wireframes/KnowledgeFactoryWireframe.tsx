import React from 'react';
import { ArrowLeft, Database, Cpu, Activity, TrendingUp, RefreshCw } from 'lucide-react';

interface KnowledgeFactoryWireframeProps {
  onBack: () => void;
}

const KnowledgeFactoryWireframe: React.FC<KnowledgeFactoryWireframeProps> = ({ onBack }) => {
  return (
    <div className="h-full bg-white overflow-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-800 p-6 bg-gray-50">
        <div className="flex items-center mb-4">
          <button onClick={onBack} className="wireframe-button mr-4">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-3xl font-bold flex items-center">
            <Database className="w-8 h-8 mr-3" />
            Knowledge Factory
          </h1>
        </div>
        <p className="text-gray-600">Self-learning data layer visualization</p>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Vectors Stored', value: '1.2M', icon: Database },
            { label: 'Queries/sec', value: '847', icon: Activity },
            { label: 'Learning Rate', value: '94%', icon: TrendingUp },
            { label: 'Active Agents', value: '5/5', icon: Cpu },
          ].map((stat, i) => (
            <div key={i} className="sketch-border p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-5 h-5 text-gray-600" />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Data Flow Visualization */}
        <div className="sketch-border p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Data Flow Pipeline</h2>
          <svg viewBox="0 0 800 300" className="w-full">
            {/* Input Sources */}
            <g>
              <rect x="20" y="50" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="80" y="85" textAnchor="middle" fontSize="14">ClickUp</text>
              
              <rect x="20" y="130" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="80" y="165" textAnchor="middle" fontSize="14">User Input</text>
              
              <rect x="20" y="210" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="80" y="245" textAnchor="middle" fontSize="14">Agent Data</text>
            </g>

            {/* Processing */}
            <g>
              <rect x="240" y="100" width="140" height="100" fill="none" stroke="#333" strokeWidth="3" />
              <text x="310" y="135" textAnchor="middle" fontWeight="bold">Vectorization</text>
              <text x="310" y="155" textAnchor="middle" fontSize="12">Processing</text>
              <text x="310" y="175" textAnchor="middle" fontSize="12">& Embedding</text>
            </g>

            {/* Storage */}
            <g>
              <ellipse cx="500" cy="150" rx="70" ry="40" fill="none" stroke="#333" strokeWidth="3" />
              <text x="500" y="145" textAnchor="middle" fontWeight="bold">pgvector</text>
              <text x="500" y="165" textAnchor="middle" fontSize="12">Storage</text>
            </g>

            {/* Output */}
            <g>
              <rect x="640" y="50" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="700" y="85" textAnchor="middle" fontSize="14">Query Results</text>
              
              <rect x="640" y="130" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="700" y="165" textAnchor="middle" fontSize="14">Insights</text>
              
              <rect x="640" y="210" width="120" height="60" fill="none" stroke="#333" strokeWidth="2" />
              <text x="700" y="245" textAnchor="middle" fontSize="14">Predictions</text>
            </g>

            {/* Arrows */}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#333" />
              </marker>
            </defs>
            
            <line x1="140" y1="80" x2="240" y2="130" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="140" y1="160" x2="240" y2="150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="140" y1="240" x2="240" y2="170" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            
            <line x1="380" y1="150" x2="430" y2="150" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            
            <line x1="570" y1="130" x2="640" y2="80" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="570" y1="150" x2="640" y2="160" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="570" y1="170" x2="640" y2="240" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)" />
          </svg>
        </div>

        {/* Learning Progress */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="sketch-border p-4">
            <h3 className="font-bold mb-4">Recent Learning Events</h3>
            <div className="space-y-3">
              {[
                { event: 'New pattern detected', time: '2 min ago', type: 'success' },
                { event: 'Vector space optimized', time: '15 min ago', type: 'info' },
                { event: 'Query performance improved', time: '1 hour ago', type: 'success' },
                { event: 'Data clustering updated', time: '3 hours ago', type: 'info' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 border-b border-gray-300">
                  <div>
                    <div className="font-semibold text-sm">{item.event}</div>
                    <div className="text-xs text-gray-500">{item.time}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    item.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-border p-4">
            <h3 className="font-bold mb-4">Vector Space Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Dimension Utilization</span>
                  <span className="text-sm font-bold">87%</span>
                </div>
                <div className="w-full h-4 border-2 border-gray-600 rounded">
                  <div className="h-full bg-gray-400" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Clustering Efficiency</span>
                  <span className="text-sm font-bold">92%</span>
                </div>
                <div className="w-full h-4 border-2 border-gray-600 rounded">
                  <div className="h-full bg-gray-400" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Query Accuracy</span>
                  <span className="text-sm font-bold">96%</span>
                </div>
                <div className="w-full h-4 border-2 border-gray-600 rounded">
                  <div className="h-full bg-gray-400" style={{ width: '96%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="sketch-border p-4 flex items-center justify-between bg-gray-50">
          <div className="flex space-x-3">
            <button className="wireframe-button flex items-center">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
            <button className="wireframe-button">Export Metrics</button>
            <button className="wireframe-button">Configure Pipeline</button>
          </div>
          <div className="text-sm text-gray-600">
            Last updated: <span className="font-bold">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeFactoryWireframe;