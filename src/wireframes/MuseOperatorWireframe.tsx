import React, { useState } from 'react';
import { X, Send, Bot, User, Settings, History, Zap } from 'lucide-react';

interface MuseOperatorWireframeProps {
  onClose: () => void;
}

const MuseOperatorWireframe: React.FC<MuseOperatorWireframeProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'agents' | 'history'>('chat');

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b-2 border-gray-800 p-4 flex items-center justify-between bg-gray-50">
        <div className="flex items-center">
          <Bot className="w-6 h-6 mr-2" />
          <h2 className="text-xl font-bold">Muse Operator</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-gray-800 flex">
        {['chat', 'agents', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 p-3 font-bold capitalize ${
              activeTab === tab ? 'bg-white border-b-4 border-blue-500' : 'bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && (
          <div className="h-full flex flex-col">
            {/* Agent Status */}
            <div className="p-3 bg-yellow-50 border-b-2 border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                  <span className="text-sm font-bold">Active: Traffic Agent</span>
                </div>
                <span className="text-xs text-gray-600">Routing to: Domain Agent 3</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* User message */}
              <div className="flex justify-end">
                <div className="max-w-[70%] sketch-border p-3 bg-blue-50">
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm font-bold">You</span>
                  </div>
                  <div className="space-y-1">
                    <div className="wireframe-text"></div>
                    <div className="wireframe-text w-4/5"></div>
                  </div>
                </div>
              </div>

              {/* Bot message */}
              <div className="flex justify-start">
                <div className="max-w-[70%] sketch-border p-3 bg-gray-50">
                  <div className="flex items-center mb-2">
                    <Bot className="w-4 h-4 mr-2" />
                    <span className="text-sm font-bold">Muse</span>
                  </div>
                  <div className="space-y-1">
                    <div className="wireframe-text"></div>
                    <div className="wireframe-text"></div>
                    <div className="wireframe-text w-3/5"></div>
                  </div>
                  <div className="mt-3 p-2 bg-white border-2 border-gray-300 rounded">
                    <span className="text-xs text-gray-600">Processing with Domain Agent...</span>
                  </div>
                </div>
              </div>

              {/* System message */}
              <div className="text-center py-2">
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Agent handoff: Traffic → Domain Agent 3
                </span>
              </div>

              {/* More messages */}
              {[1, 2].map(i => (
                <div key={i} className="flex justify-start">
                  <div className="max-w-[70%] sketch-border p-3 bg-gray-50">
                    <div className="space-y-1">
                      <div className="wireframe-text"></div>
                      <div className="wireframe-text w-5/6"></div>
                      <div className="wireframe-text w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t-2 border-gray-800 p-4">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className="flex-1 p-3 border-2 border-gray-600 rounded font-sketch"
                />
                <button className="wireframe-button">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="p-4">
            <h3 className="font-bold text-lg mb-4">Active Agents</h3>
            <div className="space-y-3">
              {[
                { name: 'Traffic Agent', status: 'active', tasks: 142 },
                { name: 'Research Agent', status: 'idle', tasks: 38 },
                { name: 'Code Agent', status: 'processing', tasks: 67 },
                { name: 'Data Agent', status: 'idle', tasks: 23 },
                { name: 'Testing Agent', status: 'idle', tasks: 19 },
                { name: 'Docs Agent', status: 'idle', tasks: 45 },
              ].map(agent => (
                <div key={agent.name} className="sketch-border p-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      agent.status === 'active' ? 'bg-green-500' : 
                      agent.status === 'processing' ? 'bg-yellow-500' : 
                      'bg-gray-300'
                    }`}></div>
                    <div>
                      <div className="font-bold">{agent.name}</div>
                      <div className="text-xs text-gray-600">Tasks: {agent.tasks}</div>
                    </div>
                  </div>
                  <button className="text-sm px-2 py-1 border-2 border-gray-400 rounded">
                    Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-4">
            <h3 className="font-bold text-lg mb-4 flex items-center">
              <History className="w-5 h-5 mr-2" />
              Conversation History
            </h3>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="sketch-border p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-sm">Session #{i}</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="space-y-1">
                    <div className="wireframe-text"></div>
                    <div className="wireframe-text w-4/5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-800 p-3 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Connected to Muse v1.0</span>
          <button className="flex items-center hover:text-gray-800">
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MuseOperatorWireframe;