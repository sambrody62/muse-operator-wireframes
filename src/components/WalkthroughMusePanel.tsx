import React, { useState, useEffect, useRef } from 'react';
import { Send, ExternalLink, Info, CheckCircle, ChevronDown, ChevronUp, GitBranch, RefreshCw, Copy, AlertCircle, Clock } from 'lucide-react';

interface WalkthroughMusePanelProps {
  isVisible: boolean;
  currentStep: any;
}

const WalkthroughMusePanel: React.FC<WalkthroughMusePanelProps> = ({ 
  isVisible, 
  currentStep 
}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  // Track the active agent selected by Traffic for C1 so we can glow/attribute output
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const agents = [
    { id: 1, name: 'Scout', role: 'Research', emoji: '🔍' },
    { id: 2, name: 'Muse', role: 'Ideas', emoji: '🧠' },
    { id: 3, name: 'Echo', role: 'Copy', emoji: '✍️' },
    { id: 4, name: 'Atlas', role: 'QA', emoji: '🛡️' },
    { id: 5, name: 'Beacon', role: 'Localization', emoji: '🌍' }
  ];

  // Extract context from current step
  const getContext = () => {
    if (!currentStep?.data) {
      return {
        client: 'Client',
        task: 'Task',
        taskId: 'ID',
        fullTask: 'Task description'
      };
    }
    
    return {
      client: currentStep.data.client_name || currentStep.data.client || 'Client',
      task: currentStep.data.task_title || currentStep.data.task || 'Task',
      taskId: currentStep.data.task_id || currentStep.data.taskId || 'ID',
      fullTask: currentStep.data.description || currentStep.description || 'Task description'
    };
  };

  const context = getContext();

  // Generate messages based on current step
  useEffect(() => {
    if (!currentStep) return;

    // Clear messages when starting a new walkthrough
    if (currentStep.id.endsWith('-1')) {
      setMessages([]);
    }

    // Auto-scroll to bottom when new messages are added
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }

    // Add step-specific messages
    const newMessages: any[] = [];

    // Add messages based on the step action and data
    if (currentStep.action === 'show-context' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Muse',
        content: `👋 Hey there! I see you're working on ${currentStep.data.client_name}'s "${currentStep.data.task_title}".\n\n${currentStep.data.task_type ? `I've detected this is a ${currentStep.data.task_type} project. ` : ''}${currentStep.data.detected_requirements ? currentStep.data.detected_requirements : ''}\n\nI've assembled the perfect agent team for this task. Ready when you are!`
      });
    }

    if (currentStep.action === 'complete-job' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent || 'Echo',
        content: `✅ Job complete! I've generated ${currentStep.data.deliverables?.length || 0} deliverables:\n\n${currentStep.data.deliverables?.map((d: string) => '• ' + d).join('\n') || 'Content ready'}`
      });
    }

    if (currentStep.action === 'start-sync') {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: 'Please sync all deliverables to ClickUp'
      });
      newMessages.push({
        id: Date.now() + 1,
        agent: 'Muse',
        content: '🔄 Got it! Syncing everything to ClickUp now...\n\nPreparing deliverables for upload'
      });
    }

    if (currentStep.action === 'show-comment' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `✅ Successfully posted to ClickUp!\n\n📎 ${currentStep.data.attachments_count} files attached\n🏷️ Fields updated: ${Object.entries(currentStep.data.fields_updated || {}).map(([k, v]) => `${k} → ${v}`).join(', ')}`
      });
    }

    if (currentStep.action === 'show-success' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: currentStep.data.message || '✅ Sync successful!'
      });
    }

    if (currentStep.action === 'show-error' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `⚠️ Sync Error\n\n${currentStep.data.error_message}\n\n🕒 Retry after: ${currentStep.data.retry_after}`
      });
    }

    if (currentStep.action === 'retry-sync' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: 'Please retry the sync'
      });
      newMessages.push({
        id: Date.now() + 1,
        agent: 'Muse',
        content: `🔄 Retrying sync... (Attempt ${currentStep.data.attempt})`
      });
    }

    // Job management messages
    if (currentStep.action === 'open-job-form' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: `I need to create new content for ${currentStep.data.client}'s ${currentStep.data.context}`
      });
      newMessages.push({
        id: Date.now() + 1,
        agent: 'Muse',
        content: `Got it! Let me open the job form with ${currentStep.data.client} details pre-filled. What would you like me to create?`
      });
    }

    if (currentStep.action === 'type-description' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: currentStep.data.description
      });
    }

    if (currentStep.action === 'select-agents' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: `Please use ${currentStep.data.selected.join(', ')} for this job`
      });
      newMessages.push({
        id: Date.now() + 1,
        agent: 'Muse',
        content: `Perfect team selection!\n\n${currentStep.data.scout_role ? `• Scout: ${currentStep.data.scout_role}\n` : ''}${currentStep.data.muse_role ? `• Muse: ${currentStep.data.muse_role}\n` : ''}${currentStep.data.echo_role ? `• Echo: ${currentStep.data.echo_role}` : ''}`
      });
    }

    if (currentStep.action === 'show-job-created' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Muse',
        content: `✅ Job ${currentStep.data.job_id} created!\n\nStatus: ${currentStep.data.status}\nAgents assigned: ${currentStep.data.assigned_agents}\nEstimated time: ${currentStep.data.estimated_time}`
      });
    }

    if (currentStep.action === 'show-agent-working' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent,
        content: `${currentStep.data.action}\n\n🔄 ${currentStep.data.progress}\n💡 Found: ${currentStep.data.finding}`
      });
    }

    if (currentStep.action === 'show-consultation' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.from_agent,
        content: `@${currentStep.data.to_agent} ${currentStep.data.query}`
      });
      newMessages.push({
        id: Date.now() + 1,
        agent: currentStep.data.to_agent,
        content: currentStep.data.response
      });
    }

    if (currentStep.action === 'type-message' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Operator',
        content: currentStep.data.message
      });
    }

    if (currentStep.action === 'show-routing' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Traffic',
        content: `🚦 Routing to: ${currentStep.data.routing_decision}\n${currentStep.data.analysis}`
      });
    }

    // C1: One example per step so each click shows a single agent glow
    if (currentStep.action === 'show-agent-example' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent,
        content: currentStep.data.content
      });
    }

    // Epic C: Traffic & Policies — routing, load, and system status
    // Epic C1: do not render panel messages; explainer handles the narrative
    if (currentStep.id?.startsWith('c1-')) {
      // Skip C1 panel messages entirely
    } else if (currentStep.action === 'create-job-panel' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Muse',
        content: `Opening job panel — "${currentStep.data.job || 'New job'}". Team: ${(currentStep.data.agents_working || []).join(', ')}`
      });
    }

    if (!currentStep.id?.startsWith('c1-') && currentStep.action === 'show-routing-decision' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Traffic',
        content: `Decision logged — Policy: ${currentStep.data.policy_used}. Reason: ${currentStep.data.reason}. Routed to: ${currentStep.data.primary_agent}${currentStep.data.secondary_agent ? ` (backup: ${currentStep.data.secondary_agent})` : ''}.`
      });
      if (currentStep.data.primary_agent) {
        setActiveAgent(currentStep.data.primary_agent);
      }
    }

    if (!currentStep.id?.startsWith('c1-') && currentStep.action === 'show-completion' && currentStep.data) {
      const agentName = activeAgent || 'System';
      newMessages.push({
        id: Date.now(),
        agent: agentName,
        content: currentStep.data.notification ? `${currentStep.data.notification} Deliverables ready: ${currentStep.data.deliverables_ready ? 'Yes' : 'No'}` : `Job complete. Deliverables ready: ${currentStep.data.deliverables_ready ? 'Yes' : 'No'}`
      });
    }

    if (currentStep.action === 'show-high-load' && currentStep.data) {
      const count = currentStep.data.concurrent_requests;
      const who = currentStep.data.client || 'this client';
      newMessages.push({
        id: Date.now(),
        agent: 'Traffic',
        content: `Heads up: ${count} jobs landed for ${who} at once. We’ll keep things stable — routing, concurrency limits, and budgets are active.`
      });
    }

    if (currentStep.action === 'show-capacity-limit' && currentStep.data) {
      const a = currentStep.data.agent;
      const max = currentStep.data.max_concurrent;
      const pos = currentStep.data.queue_position;
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `Paused: ${a} is at capacity (${max}/${max}). I’ve queued this job at #${pos} and will start it as soon as a slot frees up.`
      });
    }

    if (currentStep.action === 'show-budget-exceeded' && currentStep.data) {
      const kind = (currentStep.data.limit_type || '').replace('_', ' ');
      const action = currentStep.data.operator_action_required || 'Please review and adjust.';
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `Paused: This job hit its ${kind || 'budget'}. ${action}`
      });
    }

    if (currentStep.action === 'show-system-status' && currentStep.data) {
      const q = currentStep.data.queue_status ? `Status: you’re ${currentStep.data.queue_status}. ` : '';
      const avail = Object.entries(currentStep.data.agent_availability || {}).map(([k,v]) => `${k} ${v}`).join(', ');
      newMessages.push({
        id: Date.now(),
        agent: 'Traffic',
        content: `${q}Current capacity — ${avail}. These limits keep things stable and predictable.`
      });
    }

    // Epic E (Security & Audit): Access denial and audit visibility
    if (currentStep.action === 'show-access-denial' && currentStep.data) {
      const target = currentStep.data.attempted_access || 'restricted data';
      const code = currentStep.data.error_code || 403;
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `Access denied — Not authorized to view ${target}. Request blocked (${code}). This attempt has been logged.`
      });
    }

    if (currentStep.action === 'show-audit-trail' && currentStep.data) {
      const lines = (currentStep.data.recent_actions || []).slice(0, 5).join('\n');
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: lines ? `Audit log updated:\n${lines}` : 'Audit log updated.'
      });
    }

    if (currentStep.action === 'search-audit-logs' && currentStep.data) {
      const q = currentStep.data.search_query || 'recent activity';
      const results = (currentStep.data.results || []).slice(0, 3).join('\n');
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: results ? `Search: “${q}”\nTop results:\n${results}` : `Search: “${q}” — no results.`
      });
    }

    // Epic D1: Consult without transfer
    if (currentStep.action === 'show-consult-need' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.requesting_agent || 'Muse',
        content: `Need help: ${currentStep.data.need}. Keeping ownership while I consult.`
      });
    }

    if (currentStep.action === 'send-consult' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.from || 'Muse',
        content: `@${currentStep.data.to || 'Scout'} ${currentStep.data.query}`
      });
    }

    if (currentStep.action === 'show-consult-response' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: (currentStep.data.event?.split(' → ')?.[1]?.split(' ')?.[0]) || 'Scout',
        content: currentStep.data.response || 'Response received.'
      });
    }

    if (currentStep.action === 'show-chain-limit' && currentStep.data) {
      // Suppress this message for D1 per request; keep elsewhere if used
      if (!(currentStep.id && currentStep.id.startsWith('d1-'))) {
        newMessages.push({
          id: Date.now(),
          agent: 'System',
          content: `Max consult chain depth reached (depth ${currentStep.data.depth}/${currentStep.data.max_depth}). Further consults blocked.`
        });
      }
    }

    // Epic D2 removed (single-owner model with Traffic Cop routing)

    if (currentStep.action === 'show-muse-ideas' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Muse',
        content: '💡 Creative suggestions:\n\n' + currentStep.data.suggestions.map((s: string) => '• ' + s).join('\n')
      });
    }

    if (currentStep.action === 'show-revised-copy' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Echo',
        content: `Original: "${currentStep.data.original}"\n\nRevised: "${currentStep.data.revised}"\n\nTone: ${currentStep.data.tone_shift}`
      });
    }

    // Epic B: Conversations & Memory actions → thread messages
    if (currentStep.action === 'show-message-live' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `📨 Message #${currentStep.data.sequence_number} delivered in ${currentStep.data.latency || '—'}`
      });
    }

    if (currentStep.action === 'show-agent-response' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent || 'Muse',
        content: currentStep.data.message || 'Responded'
      });
    }

    if (currentStep.action === 'show-duplicate-rejection' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `⛔ ${currentStep.data.rejection_reason}\nOriginal: ${currentStep.data.original_message_id}`
      });
    }

    if (currentStep.action === 'show-conversation-history' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'System',
        content: `📚 Loaded conversation history for ${currentStep.data.client || 'client'}\nPrevious messages: ${currentStep.data.previous_messages || 0}\nLast activity: ${currentStep.data.last_activity || '—'}`
      });
    }

    if (currentStep.action === 'show-context-handoff' && currentStep.data) {
      const persona = currentStep.data.persona || 'copywriter';
      const pinned = currentStep.data.pinned_memory || 'brand tone and preferences';
      const loaded = currentStep.data.messages_loaded ?? 'recent';
      const handoff = currentStep.data.handoff_time || 'just now';
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent || 'Echo',
        content: `Great — I’ve loaded your context. I’ll take the role of ${persona}.\nI’ve pinned: “${pinned}.”\nPulled the last ${loaded} messages (${handoff}).\n\nWould you like me to draft the next section, tighten the latest update, or summarize key decisions to move us forward?`
      });
    }

    // Replace recall with a conversational, action-oriented Echo message
    if (currentStep.action === 'show-agent-recall' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: currentStep.data.agent || 'Echo',
        content: `Picking up from our last discussion — I’ve got the context loaded and we’re aligned. I can: \n\n• Draft the next section\n• Tighten the latest update for clarity\n• Outline next steps and risks\n\nWhich should I do first?`
      });
    }

    // Note: For Epic B2, omit the efficiency system message to avoid gear icon

    // B3: Omit separate threshold notice; combine into a single friendly message below

    if (currentStep.action === 'show-auto-summarize' && currentStep.data) {
      newMessages.push({
        id: Date.now(),
        agent: 'Muse',
        content: `This thread is getting long — I’ve summerized what we are doing to keep me focused. Want me to keep working on the next steps?`
      });
    }

    // B3: No extra message for pinned memory

    // B3: No UI preview message; keep the flow simple

    // For Epic C2, force all messages to appear as System (gear icon)
    const messagesToAdd = currentStep.id?.startsWith('c2-')
      ? newMessages.map(m => ({ ...m, agent: 'System' }))
      : newMessages;

    // Add the new messages
    if (messagesToAdd.length > 0) {
      setMessages(prev => [...prev, ...messagesToAdd]);
    }
  }, [currentStep]);

  const getAgentIcon = (agentName: string) => {
    const iconMap: Record<string, string> = {
      'Muse': '🧠',
      'Scout': '🔍',
      'Echo': '✍️',
      'Atlas': '🛡️',
      'Beacon': '🌍',
      'Traffic': '🚦',
      'System': '⚙️',
      'Operator': '👤'
    };
    return iconMap[agentName] || '🤖';
  };

  const getAgentMessageColor = (agentName: string) => {
    const colorMap: Record<string, string> = {
      'Muse': 'bg-fuchsia-50 border-fuchsia-200',
      'Scout': 'bg-emerald-50 border-emerald-200',
      'Echo': 'bg-blue-50 border-blue-200',
      'Atlas': 'bg-orange-50 border-orange-200',
      'Beacon': 'bg-cyan-50 border-cyan-200',
      'Traffic': 'bg-purple-50 border-purple-200',
      'System': 'bg-slate-50 border-slate-200',
      'Operator': 'bg-gray-50 border-gray-200'
    };
    return colorMap[agentName] || 'bg-white border-gray-200';
  };

  const getAgentGlow = (agentName: string) => {
    const glowMap: Record<string, string> = {
      'Muse': 'animate-pulse shadow-xl shadow-fuchsia-300/60 ring-4 ring-fuchsia-300/40',
      'Scout': 'animate-pulse shadow-xl shadow-emerald-300/60 ring-4 ring-emerald-300/40',
      'Echo': 'animate-pulse shadow-xl shadow-blue-300/60 ring-4 ring-blue-300/40',
      'Atlas': 'animate-pulse shadow-xl shadow-orange-300/60 ring-4 ring-orange-300/40',
      'Beacon': 'animate-pulse shadow-xl shadow-cyan-300/60 ring-4 ring-cyan-300/40'
    };
    return glowMap[agentName] || '';
  };

  // Get the currently active agent based on the last message
  const getTalkingAgent = () => {
    if (messages.length === 0) return null;
    const lastMessage = messages[messages.length - 1];
    return lastMessage.agent !== 'Operator' && lastMessage.agent !== 'System' ? lastMessage.agent : null;
  };

  const talkingAgent = getTalkingAgent();

  if (!isVisible) return null;

  return (
    <div className="w-[25vw] h-screen bg-white text-slate-900 flex flex-col font-inter shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider">Nucleus</div>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-sm font-medium text-slate-800">
                {context.task}
              </span>
            </div>
            <button
              onClick={() => setShowTaskDetails(!showTaskDetails)}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Info className="w-4 h-4 text-slate-500 hover:text-blue-500" />
            </button>
          </div>
          
          {showTaskDetails && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="mb-3">
                <div className="text-sm font-semibold text-blue-700">{context.client}</div>
                <div className="text-xs text-slate-600">Task ID: {context.taskId}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs font-semibold text-slate-700 mb-2">Brief:</div>
                <p className="text-sm text-slate-700 leading-relaxed">{context.fullTask}</p>
              </div>
              <div className="flex items-center gap-2 pt-3 border-t border-blue-200">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-xs text-slate-600 font-medium">Connected • Walkthrough Mode</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Agent Collaboration Graph */}
      <div className={`px-4 border-b border-slate-200 bg-white/60 ${showCollaboration ? 'py-4' : 'py-2'}`}>
        <button 
          onClick={() => setShowCollaboration(!showCollaboration)}
          className={`w-full flex items-center justify-between hover:bg-slate-50 p-2 rounded-lg transition-colors ${showCollaboration ? 'mb-4' : 'mb-1'}`}
        >
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-violet-500" />
            Live Agent Team
          </h2>
          {showCollaboration ? 
            <ChevronUp className="w-4 h-4 text-slate-500" /> : 
            <ChevronDown className="w-4 h-4 text-slate-500" />
          }
        </button>
        
        {showCollaboration && (
          <div className="h-20 bg-slate-50 rounded-xl p-2 border border-slate-200 shadow-sm flex items-center justify-center">
            <div className="flex items-center gap-3">
              {agents.map((agent) => (
                <div key={agent.id} className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shadow-md bg-white border-slate-300 ${
                    talkingAgent === agent.name ? getAgentGlow(agent.name) : ''
                  }`}>
                    <span className="text-sm">{agent.emoji}</span>
                  </div>
                  <div className="mt-0.5">
                    <div className="text-xs font-semibold text-slate-700">{agent.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation Area */}
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
        <div className="flex-1 overflow-y-auto px-4 py-4" ref={scrollContainerRef}>
          <div className="space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-8">
                Step through the walkthrough to see agent interactions
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 group transition-all duration-300 ${
                message.agent === 'Operator' ? 'justify-end' : 'justify-start'
              }`}>
                {message.agent !== 'Operator' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-sm">{getAgentIcon(message.agent)}</span>
                  </div>
                )}
                <div className={`flex-1 max-w-[85%] rounded-xl p-3 border shadow-sm ${getAgentMessageColor(message.agent)}`}>
                  <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                    {message.content}
                  </p>
                </div>
                {message.agent === 'Operator' && (
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <span className="text-sm">{getAgentIcon(message.agent)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Area / Action Buttons */}
      <div className="p-4 border-t border-slate-200 bg-white">
        {currentStep?.action === 'complete-job' ? (
          <button className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Sync to ClickUp
          </button>
        ) : currentStep?.action === 'show-error' ? (
          <button className="w-full px-4 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-medium hover:bg-orange-700 flex items-center justify-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Retry Sync
          </button>
        ) : currentStep?.action === 'show-success' ? (
          <button className="w-full px-4 py-2.5 bg-gray-600 text-white rounded-xl text-sm font-medium hover:bg-gray-700 flex items-center justify-center gap-2 transition-colors">
            <Copy className="w-4 h-4" />
            Copy All Deliverables
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Muse anything..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-700 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalkthroughMusePanel;
