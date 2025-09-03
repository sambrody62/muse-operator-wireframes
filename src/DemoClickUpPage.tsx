import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Star, Plus, Calendar, Clock, Tag, Link, Paperclip, Smile, CheckCircle2, FileText } from 'lucide-react';

interface DemoClickUpPageProps {
  updates?: any[];
}

const DemoClickUpPage: React.FC<DemoClickUpPageProps> = ({ updates = [] }) => {
  const [taskTitle] = useState('Social Media Strategy Launch');
  const [status, setStatus] = useState('TO DO');
  const [priority, setPriority] = useState('High');
  const [progress, setProgress] = useState(0);
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [highlightedFields, setHighlightedFields] = useState<Set<string>>(new Set());
  const [documents, setDocuments] = useState<Array<{id: string, name: string, icon: string, addedBy: string, addedAt: number}>>([]);
  const [comments, setComments] = useState<Array<{id: string, author: string, text: string, timestamp: string, hasAttachments: boolean}>>([]);
  const description = 'Develop comprehensive social media strategy for eco-friendly water bottle launch targeting millennials and Gen Z. Deliverables include platform strategy, content calendar, influencer partnerships, community building approach, and budget allocation across 6-week campaign timeline.';

  // Process updates from demo
  useEffect(() => {
    if (updates && updates.length > 0) {
      updates.forEach((update, index) => {
        // Add delay for each update to scroll sequentially
        setTimeout(() => {
          // Handle different update types
          if (update.type === 'comment-posted') {
            // Scroll to comments section first
            setTimeout(() => {
              const commentsElement = document.getElementById('comments-section');
              if (commentsElement) {
                commentsElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });
              }
            }, 100);
            
            // Then scroll to documents section if there are attachments
            if ((update.documents_uploaded && update.documents_uploaded.length > 0) || (update.attachments && update.attachments > 0)) {
              setTimeout(() => {
                const docsElement = document.getElementById('documents-section');
                if (docsElement) {
                  docsElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                }
              }, 1500);
            }
            
            // Add the comment
            if (update.comment) {
              setComments(prev => [...prev, {
                id: `comment-${Date.now()}`,
                author: 'Nucleus AI',
                text: update.comment,
                timestamp: 'just now',
                hasAttachments: (update.attachments && update.attachments > 0) || (update.documents_uploaded && update.documents_uploaded.length > 0)
              }]);
            }
            
            // Handle comment posted with attachments
            if (update.documents_uploaded && update.documents_uploaded.length > 0) {
              // Use actual document names from the walkthrough
              const newDocs = update.documents_uploaded.map((docName: string, i: number) => ({
                id: `doc-${Date.now()}-${i}`,
                name: docName,
                icon: '📄',
                addedBy: 'Nucleus AI',
                addedAt: Date.now()
              }));
              setDocuments(prev => [...prev, ...newDocs]);
            } else if (update.attachments && update.attachments > 0) {
              // Fallback to generic documents if specific names not provided
              const newDocs: Array<{id: string, name: string, icon: string, addedBy: string, addedAt: number}> = [];
              for (let i = 0; i < Math.min(update.attachments, 6); i++) {
                const docNames = [
                  'Instagram_Content_Pack.pdf',
                  'Twitter_Thread_Templates.pdf', 
                  'LinkedIn_Posts.pdf',
                  'TikTok_Scripts.pdf',
                  'Content_Calendar.xlsx',
                  'Brand_Guidelines.pdf'
                ];
                if (docNames[i]) {
                  newDocs.push({
                    id: `doc-${Date.now()}-${i}`,
                    name: docNames[i],
                    icon: '📄',
                    addedBy: 'Nucleus AI',
                    addedAt: Date.now()
                  });
                }
              }
              setDocuments(prev => [...prev, ...newDocs]);
            }
            
            // Update status if fields were updated
            if (update.fields_updated) {
              // Handle both array and object formats
              const fieldsArray = Array.isArray(update.fields_updated) 
                ? update.fields_updated 
                : Object.keys(update.fields_updated);
              
              if (fieldsArray.some((field: string) => field.toLowerCase().includes('status'))) {
                setStatus('REVIEW');
              }
              
              if (fieldsArray.some((field: string) => field.toLowerCase().includes('progress') || field.toLowerCase().includes('completion'))) {
                setProgress(100);
              }
            }
            
            // Highlight documents section
            setHighlightedFields(prev => {
              const newSet = new Set(prev);
              newSet.add('document');
              newSet.add('comment');
              return newSet;
            });
            setTimeout(() => {
              setHighlightedFields(prev => {
                const newSet = new Set(prev);
                newSet.delete('document');
                newSet.delete('comment');
                return newSet;
              });
            }, 4000);
            
            return; // Exit early for comment-posted type
          }
          
          if (update.type === 'sync-success') {
            // Scroll to status section first
            setTimeout(() => {
              const statusElement = document.getElementById('status-section');
              if (statusElement) {
                statusElement.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });
              }
            }, 100);
            
            // Then scroll to documents section if there are attachments
            if (update.attachments_added && update.attachments_added.length > 0) {
              setTimeout(() => {
                const docsElement = document.getElementById('documents-section');
                if (docsElement) {
                  docsElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                }
              }, 1500);
            }
            
            // Then scroll to comments if there's a comment
            if (update.clickup_visual_changes && update.clickup_visual_changes.new_comment) {
              setTimeout(() => {
                const commentsElement = document.getElementById('comments-section');
                if (commentsElement) {
                  commentsElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center'
                  });
                }
              }, 2500);
            }
            
            // Handle sync success
            if (update.status) {
              setStatus(update.status === 'success' || update.status === 'completed' ? 'REVIEW' : 'IN PROGRESS');
            }
            setProgress(100);
            
            // Add a success comment if there's a visual change with a comment
            if (update.clickup_visual_changes && update.clickup_visual_changes.new_comment) {
              setComments(prev => [...prev, {
                id: `comment-${Date.now()}`,
                author: 'Nucleus AI',
                text: update.clickup_visual_changes.new_comment,
                timestamp: 'just now',
                hasAttachments: update.attachments_added && update.attachments_added.length > 0
              }]);
            }
            
            // Add attachments if provided
            if (update.attachments_added && update.attachments_added.length > 0) {
              const newDocs = update.attachments_added.map((docName: string, i: number) => ({
                id: `doc-${Date.now()}-${i}`,
                name: docName,
                icon: '📄',
                addedBy: 'Nucleus AI',
                addedAt: Date.now()
              }));
              setDocuments(prev => [...prev, ...newDocs]);
              
              // Also highlight documents section
              setHighlightedFields(prev => {
                const newSet = new Set(prev);
                newSet.add('document');
                newSet.add('comment');
                return newSet;
              });
            }
            
            // Highlight status section
            setHighlightedFields(prev => {
              const newSet = new Set(prev);
              newSet.add('status');
              return newSet;
            });
            setTimeout(() => {
              setHighlightedFields(prev => {
                const newSet = new Set(prev);
                newSet.delete('status');
                newSet.delete('document');
                newSet.delete('comment');
                return newSet;
              });
            }, 4000);
            
            return; // Exit early for sync-success type
          }
          
          // Original field-based update logic
          if (!update.field) return;
          
          // Scroll to the element before updating
          const scrollToElement = () => {
            let targetId = '';
            
            // Map update fields to element IDs
            switch (update.field) {
              case 'status':
                targetId = 'status-section';
                break;
              case 'document':
                targetId = 'documents-section';
                break;
              case 'subtask-1':
              case 'subtask-2':
              case 'subtask-3':
              case 'subtask-4':
              case 'subtask-5':
              case 'subtask-6':
                targetId = 'subtasks-section';
                break;
              case 'progress':
                targetId = 'progress-section';
                break;
              case 'priority':
                targetId = 'priority-section';
                break;
            }
            
            if (targetId) {
              const element = document.getElementById(targetId);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center'
                });
              }
            }
          };
          
          // Scroll first, then apply update after a short delay
          scrollToElement();
          
          setTimeout(() => {
            // Highlight the field
            setHighlightedFields(prev => {
              const newSet = new Set(prev);
              newSet.add(update.field);
              return newSet;
            });
            setTimeout(() => {
              setHighlightedFields(prev => {
                const newSet = new Set(prev);
                newSet.delete(update.field);
                return newSet;
              });
            }, 4000);

            // Apply the update
            switch (update.field) {
              case 'status':
                setStatus(update.value);
                break;
              case 'progress':
                setProgress(update.value);
                break;
              case 'priority':
                setPriority(update.value);
                break;
              case 'subtask-1':
              case 'subtask-2':
              case 'subtask-3':
                // Do not display or store subtasks in interactive demo
                break;
              case 'document':
                // Add a new document with the correct agent attribution
                let addedBy = 'Muse AI';
                if (update.value.includes('Market Research')) {
                  addedBy = 'Scout';
                } else if (update.value.includes('Campaign Strategy')) {
                  addedBy = 'Muse';
                } else if (update.value.includes('Influencer Outreach')) {
                  addedBy = 'Echo';
                } else if (update.value.includes('Content')) {
                  addedBy = 'Echo';
                } else if (update.value.includes('Compliance')) {
                  addedBy = 'Atlas';
                }
                
                setDocuments(prev => [...prev, {
                  id: `doc-${Date.now()}`,
                  name: update.value,
                  icon: '📄',
                  addedBy: addedBy,
                  addedAt: Date.now()
                }]);
                break;
            }
          }, 800); // Delay after scroll to apply update
        }, index * 500); // Stagger updates
      });
    }
  }, [updates]);

  const getFieldClass = (fieldName: string) => {
    return highlightedFields.has(fieldName) ? 'highlight-yellow-box' : '';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <style>{`
        @keyframes yellow-pulse {
          0% { 
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.8);
            border-color: rgb(251, 191, 36);
          }
          50% { 
            box-shadow: 0 0 0 8px rgba(251, 191, 36, 0.3);
            border-color: rgb(251, 191, 36);
          }
          100% { 
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
            border-color: rgb(251, 191, 36);
          }
        }
        
        .highlight-yellow-box {
          border: 3px solid rgb(251, 191, 36) !important;
          animation: yellow-pulse 2s infinite;
          position: relative;
          background-color: rgba(254, 243, 199, 0.1);
        }
        
        .highlight-yellow-box::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 1px solid rgba(251, 191, 36, 0.5);
          border-radius: inherit;
          pointer-events: none;
        }
      `}</style>
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">EcoBottle Co</h2>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer">
              <span className="text-sm text-gray-600">Tasks</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <div className="pl-4">
              <div className="p-2 bg-blue-50 rounded">
                <span className="text-sm text-blue-600 font-medium">Social Media Strategy Launch</span>
              </div>
              {/* Subtasks hidden in sidebar for interactive demo */}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
                Share
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <Star className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="bg-green-600 text-white px-1.5 py-0.5 rounded text-xs mr-2">EC</span>
            <span>EcoBottle Co</span>
            <span className="mx-2">/</span>
            <span>Marketing</span>
            <span className="mx-2">/</span>
            <span>Q4 Campaign</span>
          </div>

          {/* Task ID */}
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-sm text-gray-500">Task</span>
            <span className="text-sm font-mono text-gray-600">EC-3021</span>
            <button className="text-purple-600 text-sm hover:underline flex items-center">
              <span className="mr-1">🤖</span> Ask AI
            </button>
          </div>

          {/* Task Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold">{taskTitle}</h1>
          </div>

          {/* AI Summary */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <span className="text-purple-600">🧠</span>
              <div className="flex-1">
                <span className="text-sm text-gray-600">
                  Muse AI is actively assisting with this task
                </span>
              </div>
            </div>
          </div>

          {/* Subtasks Progress */}
          {/* Subtasks Progress hidden, keep anchor for scrolling */}
          <div id="subtasks-section" className="hidden" />

          {/* Task Details */}
          <div className="space-y-4 mb-6">
            {/* Status */}
            <div id="status-section" className={`flex items-center transition-all duration-300 ${getFieldClass('status')}`} data-field="status">
              <div className="w-32 text-sm text-gray-600">Status</div>
              <div className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-300 ${
                status === 'IN PROGRESS' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {status}
              </div>
            </div>

            {/* Assignees */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Assignees</div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">SC</div>
                <span className="text-sm text-gray-700">Sarah Chen</span>
              </div>
            </div>

            {/* Dates */}
            <div className={`flex items-center ${getFieldClass('task-dates')}`} data-field="task-dates">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Dates
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-gray-500 hover:text-gray-700">Nov 1</button>
                <span className="text-gray-400">→</span>
                <button className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-sm">Dec 15</button>
              </div>
            </div>

            {/* Priority */}
            <div id="priority-section" className={`flex items-center ${getFieldClass('priority')}`} data-field="priority">
              <div className="w-32 text-sm text-gray-600">Priority</div>
              <div className={`px-2 py-1 rounded text-sm font-medium ${
                priority === 'High' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {priority}
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                Tags
              </div>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">Marketing</span>
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs">Q4 Launch</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs">Social Media</span>
              </div>
            </div>

            {/* Track Time */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600">Track Time</div>
              <button className="text-sm text-gray-400 hover:text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                Add time
              </button>
            </div>

            {/* Relationships */}
            <div className="flex items-center">
              <div className="w-32 text-sm text-gray-600 flex items-center">
                <Link className="w-4 h-4 mr-1" />
                Relationships
              </div>
              <div className="text-sm text-gray-400">Empty</div>
            </div>
          </div>

          {/* Description */}
          <div className={`mb-6 ${getFieldClass('task-description')}`} data-field="task-description">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Description</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-3">
              <p className="text-sm text-gray-700">{description}</p>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Fields</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Create a Field on this location
            </button>
          </div>

          {/* Checklists */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Checklists</h3>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <Plus className="w-4 h-4 mr-1" />
              Create checklist
            </button>
          </div>

          {/* Documents */}
          <div id="documents-section" className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              Documents
            </h3>
            {documents.length > 0 ? (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div 
                    key={doc.id} 
                    className={`flex items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-all duration-300 ${
                      Date.now() - doc.addedAt < 4000 ? 'highlight-yellow-box' : ''
                    }`}
                  >
                    <span className="text-xl mr-3">{doc.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">{doc.name}</p>
                      <p className="text-xs text-gray-500">Added by {doc.addedBy}</p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">No documents yet</p>
              </div>
            )}
          </div>

          {/* Attachments */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Attachments</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-sm text-gray-500">
                Drop your files here to <button className="text-purple-600 hover:underline">upload</button>
              </p>
            </div>
          </div>

          {/* Comments */}
          <div id="comments-section" className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <button className="px-3 py-1 bg-gray-100 rounded text-sm font-medium">Comments</button>
              <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded text-sm">Activity</button>
            </div>
            
            {/* Display posted comments */}
            {comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {comments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`border border-gray-200 rounded-lg p-3 ${
                      Date.now() - parseInt(comment.id.split('-')[1]) < 4000 ? 'highlight-yellow-box' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        N
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>
                        {comment.hasAttachments && (
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Paperclip className="w-3 h-3 mr-1" />
                            <span>Files attached</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Comment input */}
            <div className={`border border-gray-200 rounded-lg p-3 ${getFieldClass('comment')}`}>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  S
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Smile className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Paperclip className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    <button className="px-4 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm font-medium">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Activity */}
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Activity</h3>
          <button className="text-sm text-gray-500 hover:text-gray-700">▼ Show more</button>
        </div>
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-gray-400">•</span>
              <div>
                <p>Muse AI started assisting with task</p>
                <p className="text-xs text-gray-400 mt-1">Just now</p>
              </div>
            </div>
          </div>
          {status === 'IN PROGRESS' && (
            <div className="text-sm text-gray-600 animate-slide-in">
              <div className="flex items-start space-x-2">
                <span className="text-gray-400">•</span>
                <div>
                  <p>Status changed to IN PROGRESS</p>
                  <p className="text-xs text-gray-400 mt-1">A few seconds ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoClickUpPage;
