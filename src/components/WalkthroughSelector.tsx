import React, { useState } from 'react';
import { Play, BookOpen, Target, Check, ChevronRight, Grid, MessageSquare, Shield, Zap, Users, Database } from 'lucide-react';
import { walkthroughCategories, UserStoryWalkthrough } from '../walkthroughs/PRDWalkthroughs';
import InteractiveWalkthrough from './InteractiveWalkthrough';

const epicIcons: { [key: string]: React.ReactNode } = {
  'epic-a': <Database className="w-6 h-6" />,
  'epic-b': <MessageSquare className="w-6 h-6" />,
  'epic-c': <Zap className="w-6 h-6" />,
  'epic-d': <Users className="w-6 h-6" />,
  'epic-e': <Shield className="w-6 h-6" />
};

const WalkthroughSelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWalkthrough, setSelectedWalkthrough] = useState<UserStoryWalkthrough | null>(null);
  const [completedWalkthroughs, setCompletedWalkthroughs] = useState<Set<string>>(new Set());

  const handleWalkthroughComplete = (walkthroughId: string) => {
    setCompletedWalkthroughs(prev => new Set(prev).add(walkthroughId));
  };

  const getCompletionStats = (categoryId: string) => {
    const category = walkthroughCategories.find(c => c.id === categoryId);
    if (!category) return { completed: 0, total: 0 };
    
    const completed = category.walkthroughs.filter(w => completedWalkthroughs.has(w.id)).length;
    return { completed, total: category.walkthroughs.length };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto relative">
        {/* Header (bottom-center) — show only on main PRD selector screen */}
        {!selectedCategory && !selectedWalkthrough && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 text-center z-50 w-full px-4 pointer-events-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Nucleus PRD UX walkthrough
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Interactive demonstrations of all user stories from the Product Requirements Document.
              Select an epic below to explore the walkthroughs for each user story.
            </p>
          </div>
        )}

        {/* Category Grid */}
        {!selectedCategory && (
          <div className="mt-[10vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {walkthroughCategories.map(category => {
              const stats = getCompletionStats(category.id);
              const isComplete = stats.completed === stats.total && stats.total > 0;
              
              return (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500 relative overflow-hidden group"
                >
                  {/* Completion Badge */}
                  {isComplete && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white rounded-full p-2">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg">
                        {epicIcons[category.id]}
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {category.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all"
                              style={{ width: `${(stats.completed / Math.max(stats.total, 1)) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {stats.completed}/{stats.total}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="font-semibold">View Walkthroughs</span>
                      <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Story List for Selected Category */}
        {selectedCategory && !selectedWalkthrough && (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
              Back to Categories
            </button>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {walkthroughCategories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <div className="flex items-center space-x-2">
                    {epicIcons[selectedCategory]}
                    <span className="text-sm text-gray-600">
                      {getCompletionStats(selectedCategory).completed} of{' '}
                      {getCompletionStats(selectedCategory).total} completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {walkthroughCategories
                  .find(c => c.id === selectedCategory)
                  ?.walkthroughs.map(walkthrough => {
                    const isCompleted = completedWalkthroughs.has(walkthrough.id);
                    
                    return (
                      <div
                        key={walkthrough.id}
                        className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer group"
                        onClick={() => setSelectedWalkthrough(walkthrough)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              {isCompleted && (
                                <div className="bg-green-500 text-white rounded-full p-1 mr-2">
                                  <Check className="w-4 h-4" />
                                </div>
                              )}
                              <span className="text-sm font-semibold text-gray-500">
                                Story {walkthrough.id.split('-')[0].toUpperCase()}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {walkthrough.story}
                            </h3>
                            
                            <div className="bg-gray-50 rounded p-3 mb-3">
                              <p className="text-sm text-gray-600">
                                <span className="font-semibold">Acceptance:</span> {walkthrough.acceptance}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {walkthrough.steps.length} steps • ~{Math.ceil(walkthrough.steps.reduce((acc, step) => acc + (step.duration || 4000), 0) / 1000 / 60)} min
                              </span>
                              
                              <button className="flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform">
                                <Play className="w-4 h-4 mr-1" />
                                Start Walkthrough
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* Walkthrough Player - Full Screen Overlay */}
        {selectedWalkthrough && (
          <div className="fixed inset-0 z-50">
            <InteractiveWalkthrough
              walkthrough={selectedWalkthrough}
              onClose={() => {
                handleWalkthroughComplete(selectedWalkthrough.id);
                setSelectedWalkthrough(null);
              }}
            />
          </div>
        )}

        {/* Overall Progress removed */}
      </div>
    </div>
  );
};

export default WalkthroughSelector;
