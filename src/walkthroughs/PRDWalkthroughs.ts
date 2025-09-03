// Walkthrough Scripts for Muse V1 PRD User Stories
// Each epic contains multiple user stories with step-by-step walkthroughs

export interface WalkthroughStep {
  id: string;
  title: string;
  description: string;
  highlight?: string; // Element to highlight
  pointer?: { x: number; y: number }; // Where to point (percentage)
  action?: string; // What action to simulate
  duration?: number; // How long to show (ms) - not used in interactive mode
  data?: any; // Optional data for the action
}

export interface UserStoryWalkthrough {
  id: string;
  epic: string;
  story: string;
  acceptance: string;
  steps: WalkthroughStep[];
}

// EPIC A - ClickUp Context & Sync
export const epicA_Walkthroughs: UserStoryWalkthrough[] = [
  {
    id: 'a1-detect-context',
    epic: 'ClickUp Context & Sync',
    story: 'As an Operator on a ClickUp task page, I want client/task auto-detected so my job is pre-filled.',
    acceptance: 'Given a supported URL, when extension calls /context/resolve, system returns {client_id, clickup_task_id, confidence≥0.99}',
    steps: [
      {
        id: 'a1-1',
        title: 'Navigate to ClickUp Task',
        description: 'You\'re on task EC-3021: "Q1 Social Media Campaign" for EcoBottle Co. This task needs content created across 6 platforms.',
        highlight: 'clickup-page',
        data: { 
          taskId: 'EC-3021', 
          taskName: 'Q1 Social Media Campaign',
          client: 'EcoBottle Co',
          status: 'In Progress',
          description: 'Create engaging social media content for our sustainable water bottle launch targeting eco-conscious millennials'
        }
      },
      {
        id: 'a1-2',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon in your Chrome toolbar to open the operator panel',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'a1-3',
        title: 'Nucleus Recognizes Your Task',
        description: 'Nucleus instantly understands you\'re working on EcoBottle\'s social media campaign and prepares the agent team',
        highlight: 'muse-header',
        action: 'show-context',
        data: {
          client_id: 'ecobottle',
          client_name: 'EcoBottle Co',
          task_id: 'EC-3021',
          task_title: 'Q1 Social Media Campaign',
          confidence: 0.99,
          url_pattern: 'clickup.com/t/EC-3021',
          task_type: 'Social Media Content',
          detected_requirements: 'Multi-platform campaign (Instagram, Twitter, LinkedIn, TikTok)'
        }
      },
      {
        id: 'a1-4',
        title: 'Ready to Create Content',
        description: 'Scout, Muse, and Echo are automatically configured for social media content creation. The job details are pre-filled and ready!',
        highlight: 'agent-team',
        data: {
          prefilled: true,
          client_name: 'EcoBottle Co',
          task_title: 'Q1 Social Media Campaign'
        }
      }
    ]
  },
  {
    id: 'a2-deliverables-sync',
    epic: 'ClickUp Context & Sync',
    story: 'As an Operator, I want outputs synced to the task with a link back to Muse.',
    acceptance: 'Given a job SUCCEEDED, when sync runs, post comment + attachments, update fields/status',
    steps: [
      {
        id: 'a2-1',
        title: 'Navigate to ClickUp Task',
        description: 'You\'re on task EC-3021: "Q1 Social Media Campaign" for EcoBottle Co. The agents have been working on content.',
        highlight: 'clickup-page',
        data: { 
          taskId: 'EC-3021', 
          taskName: 'Q1 Social Media Campaign',
          client: 'EcoBottle Co',
          status: 'In Progress',
          job_status: 'Content creation complete'
        }
      },
      {
        id: 'a2-2',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon to view your completed deliverables',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'a2-3',
        title: 'Nucleus Shows Job in Progress',
        description: 'Nucleus recognizes your task and shows the agents have been working on your social media campaign',
        highlight: 'muse-header',
        action: 'show-context',
        data: {
          client_id: 'ecobottle',
          client_name: 'EcoBottle Co',
          task_id: 'EC-3021',
          task_title: 'Q1 Social Media Campaign',
          confidence: 0.99,
          job_status: 'Content creation in progress',
          agents_active: ['Scout', 'Muse', 'Echo']
        }
      },
      {
        id: 'a2-4',
        title: 'Scout Reports Research Complete',
        description: 'Scout has analyzed competitor campaigns and sustainability trends',
        highlight: 'agent-scout',
        action: 'show-agent-working',
        data: {
          agent: 'Scout',
          action: 'Research phase complete',
          progress: 'Analyzed 47 competitor posts',
          finding: 'Sustainability messaging drives 3x engagement'
        }
      },
      {
        id: 'a2-5',
        title: 'Muse Shares Creative Strategy',
        description: 'Muse presents creative concepts based on Scout\'s research',
        highlight: 'agent-muse',
        action: 'show-muse-ideas',
        data: {
          agent: 'Muse',
          suggestions: [
            'Ocean-themed visual storytelling',
            'User-generated content campaign #MyEcoBottle',
            'Influencer partnership with eco-advocates',
            'Before/after plastic reduction visuals'
          ]
        }
      },
      {
        id: 'a2-6',
        title: 'Echo Delivers Final Content',
        description: 'Echo has crafted all social media content based on the strategy',
        highlight: 'agent-echo',
        action: 'complete-job',
        data: {
          agent: 'Echo',
          deliverables: [
            '3 Instagram carousel posts with ocean conservation theme',
            '6 Twitter threads on sustainability facts',
            '4 LinkedIn articles targeting B2B eco-conscious buyers',
            '5 TikTok scripts with trending eco-challenges'
          ],
          job_id: 'job_20240115_3021'
        }
      },
      {
        id: 'a2-7',
        title: 'Review Before Syncing',
        description: 'Atlas performs quality check on all deliverables',
        highlight: 'agent-atlas',
        action: 'show-consultation',
        data: {
          from_agent: 'Atlas',
          to_agent: 'Echo',
          query: 'Verified all content meets brand guidelines?',
          response: 'Confirmed. All 18 pieces align with EcoBottle\'s tone and sustainability mission'
        }
      },
      {
        id: 'a2-8',
        title: 'Request Sync to ClickUp',
        description: 'Tell the agent team to sync all deliverables with your ClickUp task',
        highlight: 'sync-button',
        action: 'start-sync',
        pointer: { x: 85, y: 60 },
        data: {
          sync_type: 'deliverables',
          target: 'ClickUp Task EC-3021',
          total_files: 18
        }
      },
      {
        id: 'a2-9',
        title: 'ClickUp Updates Live',
        description: 'Watch as ClickUp updates: new comment appears, attachments added, status changes',
        highlight: 'clickup-updates',
        action: 'show-comment',
        data: {
          comment: '✨ Nucleus AI completed content generation for Q1 Social Media Campaign',
          attachments_count: 3,
          fields_updated: { 
            'Status': 'Review',
            'Completion': '100%',
            'AI Assist': 'Complete'
          },
          muse_link: 'nucleus.ai/jobs/job_20240115_3021',
          clickup_visual_changes: {
            status_badge: 'In Progress → Review',
            progress_bar: '60% → 100%',
            new_comment_badge: '+1',
            attachments_section: '+3 files',
            activity_feed: 'Nucleus AI added 3 files',
            documents_uploaded: [
              'Social_Media_Content_Pack.pdf',
              'Content_Calendar_Q1.xlsx',
              'Brand_Guidelines.pdf'
            ]
          }
        }
      },
      {
        id: 'a2-10',
        title: 'ClickUp Task Complete',
        description: 'ClickUp task shows all updates: status is "Ready for Review", 3 files attached, comment with Nucleus link visible',
        highlight: 'clickup-complete',
        action: 'show-success',
        data: {
          status: 'success',
          message: '✅ Successfully synced 3 deliverables to EC-3021',
          clickup_url: 'clickup.com/t/EC-3021#comments',
          time_saved: '6 hours of content creation',
          final_clickup_state: {
            task_status: 'Review',
            attachments: '3 files visible in attachments section',
            latest_comment: 'Nucleus AI delivery with link',
            custom_fields: 'All updated',
            assignee_notified: true,
            clickup_ui_shows: {
              status_dropdown: 'Review (purple badge)',
              attachments_tab: '3 documents listed',
              activity_stream: 'Status changed to Review',
              progress: '100% complete'
            }
          }
        }
      }
    ]
  },
  {
    id: 'a3-sync-failures',
    epic: 'ClickUp Context & Sync',
    story: 'As an Operator, I want to see sync failures and can retry.',
    acceptance: 'Show error banner with retry button, track attempts',
    steps: [
      {
        id: 'a3-1',
        title: 'Navigate to ClickUp Task',
        description: 'You\'re on task TS-1247: "Q4 Competitive Analysis" for TechStart Inc. Scout has completed the analysis.',
        highlight: 'clickup-page',
        data: { 
          taskId: 'TS-1247', 
          taskName: 'Q4 Competitive Analysis',
          client: 'TechStart Inc',
          status: 'In Progress',
          job_status: 'Analysis complete, ready to sync'
        }
      },
      {
        id: 'a3-2',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon to view the completed competitive analysis',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'a3-3',
        title: 'Nucleus Shows Analysis Ready',
        description: 'Nucleus recognizes your task and shows Scout has completed the competitive analysis',
        highlight: 'muse-header',
        action: 'show-context',
        data: {
          client_id: 'techstart',
          client_name: 'TechStart Inc',
          task_id: 'TS-1247',
          task_title: 'Q4 Competitive Analysis',
          confidence: 0.98,
          job_status: 'Analysis complete',
          agents_active: ['Scout']
        }
      },
      {
        id: 'a3-4',
        title: 'Scout Shows Analysis Complete',
        description: 'Scout has completed deep competitive research with valuable insights',
        highlight: 'agent-scout',
        action: 'show-agent-working',
        data: {
          agent: 'Scout',
          action: 'Competitive analysis complete',
          progress: 'Analyzed 15 competitors',
          finding: 'TechStart leads in AI features but lags in UX'
        }
      },
      {
        id: 'a3-5',
        title: 'View Deliverables Ready',
        description: 'Scout has generated comprehensive competitive intelligence reports',
        highlight: 'agent-scout',
        action: 'complete-job',
        data: {
          agent: 'Scout',
          deliverables: [
            'Executive Summary - Competitive Landscape',
            'Feature Comparison Matrix (15 competitors)',
            'Pricing Strategy Analysis',
            'Market Positioning Recommendations',
            'SWOT Analysis Document'
          ],
          job_id: 'job_20240115_1247'
        }
      },
      {
        id: 'a3-6',
        title: 'Request Sync',
        description: 'Tell the agent team to sync the competitive analysis to ClickUp',
        highlight: 'sync-button',
        action: 'start-sync',
        pointer: { x: 85, y: 60 },
        data: {
          sync_type: 'deliverables',
          target: 'ClickUp Task TS-1247',
          total_files: 5
        }
      },
      {
        id: 'a3-7',
        title: 'Sync Error - Rate Limit',
        description: 'ClickUp API is temporarily unavailable. ClickUp task shows sync pending indicator',
        highlight: 'sync-status',
        action: 'show-error',
        data: {
          error_code: 429,
          error_message: 'ClickUp API rate limit exceeded - too many requests',
          retry_after: '60 seconds',
          details: 'Your organization has hit the hourly API limit',
          clickup_visual_state: {
            status_badge: 'In Progress (unchanged)',
            sync_indicator: '⚠️ Sync pending',
            activity_log: 'Muse AI sync failed - retrying...',
            attachments: 'None yet'
          }
        }
      },
      {
        id: 'a3-8',
        title: 'System Shows Retry Options',
        description: 'Muse provides clear error information and automatic retry countdown',
        highlight: 'error-banner',
        action: 'show-error',
        pointer: { x: 85, y: 70 },
        data: {
          error_code: 429,
          error_message: 'Will retry automatically in 60 seconds',
          retry_after: 'Countdown: 60s',
          attempt: 1,
          max_attempts: 3
        }
      },
      {
        id: 'a3-9',
        title: 'Manual Retry Available',
        description: 'You can wait for auto-retry or click Retry Now after the cooldown',
        highlight: 'retry-button',
        pointer: { x: 85, y: 60 },
        action: 'show-error',
        data: {
          error_message: 'Ready to retry',
          retry_after: 'Now',
          can_retry: true
        }
      },
      {
        id: 'a3-10',
        title: 'Request Retry',
        description: 'Tell the agents to retry the sync',
        highlight: 'retry-button',
        action: 'retry-sync',
        pointer: { x: 85, y: 60 },
        data: {
          attempt: 2,
          status: 'retrying',
          message: 'Retrying sync to ClickUp...'
        }
      },
      {
        id: 'a3-11',
        title: 'ClickUp Updated After Retry',
        description: 'Success! ClickUp task shows all competitive analysis documents, status updated, comment added',
        highlight: 'clickup-success',
        action: 'show-success',
        data: {
          status: 'success',
          message: '✅ Sync successful on attempt 2 of 3',
          clickup_url: 'clickup.com/t/TS-1247#comments',
          files_synced: 3,
          retry_attempt: 2,
          clickup_visual_changes: {
            status_badge: 'In Progress → Review',
            new_comment: '📊 Competitive analysis by Scout AI',
            attachments_added: [
              'Competitive_Landscape_Analysis.pdf',
              'Feature_Comparison_Matrix.xlsx',
              'Market_Positioning_Report.pdf'
            ],
            custom_fields: {
              'Analysis Status': 'Complete',
              'AI Confidence': '98%'
            },
            activity_log: 'Nucleus AI synced after retry (2/3)',
            clickup_ui_shows: {
              status_dropdown: 'Review (purple badge)',
              attachments_tab: '3 documents visible with thumbnails',
              activity_stream: 'Status changed to Review by Nucleus AI',
              document_preview: 'Competitive_Landscape_Analysis.pdf (2.3 MB)',
              progress_bar: '100% complete'
            }
          }
        }
      }
    ]
  }
];

// EPIC B - Conversations & Memory
export const epicB_Walkthroughs: UserStoryWalkthrough[] = [
  {
    id: 'b1-persist-thread',
    epic: 'Conversations & Memory',
    story: 'As an Operator, I want all human/agent messages saved and ordered.',
    acceptance: 'Messages get sequential numbers, appear live within a second, duplicates rejected',
    steps: [
      {
        id: 'b1-0',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon in your Chrome toolbar to open the operator panel',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'b1-1',
        title: 'Start Conversation',
        description: 'You send a message to the agents about FinanceFlow\'s annual report. The message gets assigned a sequential ID',
        highlight: 'message-input',
        // Point directly to the right-side panel input
        pointer: { x: 92, y: 92 },
        action: 'type-message',
        data: {
          message: 'I need help creating content for FinanceFlow\'s annual report',
          message_id: 'msg_001',
          timestamp: '2024-01-15T10:30:00Z'
        }
      },
      {
        id: 'b1-2',
        title: 'Message Appears Live',
        description: 'Your message appears in the conversation thread instantly with message ID #001',
        highlight: 'conversation-thread',
        action: 'show-message-live',
        data: {
          message_id: 'msg_001',
          sequence_number: 1,
          latency: '0.3 seconds',
          status: 'delivered'
        }
      },
      {
        id: 'b1-3',
        title: 'Agent Response Ordered',
        description: 'Muse responds with message #002. All messages maintain strict ordering even under high load',
        highlight: 'agent-response',
        action: 'show-agent-response',
        data: {
          agent: 'Muse',
          message: 'I\'ll help you with FinanceFlow\'s annual report. What specific content do you need?',
          message_id: 'msg_002',
          sequence_number: 2,
          latency: '0.8 seconds'
        }
      },
      {
        id: 'b1-4',
        title: 'Duplicate Prevention',
        description: 'You accidentally send the same message twice. System rejects the duplicate, keeping thread clean',
        highlight: 'duplicate-rejected',
        action: 'show-duplicate-rejection',
        data: {
          attempted_message: 'I need help creating content for FinanceFlow\'s annual report',
          rejection_reason: 'Duplicate message detected',
          original_message_id: 'msg_001',
          thread_remains_clean: true
        }
      }
    ]
  },
  {
    id: 'b2-provide-context',
    epic: 'Conversations & Memory',
    story: 'As an Operator, I want agents to recall prior conversation context so they don\'t repeat questions.',
    acceptance: 'Job starts with persona, pinned memory, last 50 messages within 200ms for 95% of jobs',
    steps: [
      {
        id: 'b2-0',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon in your Chrome toolbar to open the operator panel',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'b2-1',
        title: 'Continue Previous Discussion',
        description: 'You return to a conversation about GreenTech\'s sustainability report from yesterday',
        highlight: 'conversation-history',
        action: 'show-conversation-history',
        data: {
          client: 'GreenTech Solutions',
          previous_messages: 47,
          last_activity: '23 hours ago',
          topic: 'Q4 Sustainability Report'
        }
      },
      {
        id: 'b2-2',
        title: 'Agent Loads Context',
        description: 'Echo loads context in 180ms: persona (copywriter), pinned memory (brand tone guide), last 50 messages',
        highlight: 'context-loading',
        action: 'show-context-handoff',
        data: {
          agent: 'Echo',
          persona: 'Professional copywriter specializing in sustainability',
          pinned_memory: 'GreenTech prefers data-driven, optimistic tone',
          messages_loaded: 50,
          handoff_time: '180ms'
        }
      },
      {
        id: 'b2-3',
        title: 'Agent Remembers Details',
        description: 'Echo references yesterday\'s discussion: "Continuing from where we left off on the carbon metrics..."',
        highlight: 'agent-memory',
        action: 'show-agent-recall',
        data: {
          agent: 'Echo',
          recalled_context: 'Carbon reduction target was 20%, achieved 23%',
          no_repeated_questions: true,
          seamless_continuation: true
        }
      },
      {
        id: 'b2-4',
        title: 'Context Speeds Work',
        description: 'Because Echo had full context, the report update completes 3x faster without re-asking questions',
        highlight: 'efficiency-gain',
        action: 'show-time-saved',
        data: {
          time_without_context: '45 minutes',
          time_with_context: '15 minutes',
          questions_avoided: 8,
          context_hit_rate: '95%'
        }
      }
    ]
  },
  {
    id: 'b3-auto-summarize',
    epic: 'Conversations & Memory',
    story: 'As an Operator, I want long conversations summarized so agents keep focus.',
    acceptance: 'Auto-summarize at thresholds (50 msgs/6k tokens/15 min), mask sensitive data, display summary',
    steps: [
      {
        id: 'b3-0',
        title: 'Activate Nucleus Extension',
        description: 'Click the Nucleus extension icon in your Chrome toolbar to open the operator panel',
        highlight: 'chrome-extension',
        pointer: { x: 95, y: 5 },
        action: 'open-muse'
      },
      {
        id: 'b3-1',
        title: 'Long Conversation Detected',
        description: 'Your RetailMax holiday campaign discussion has reached 52 messages over 18 minutes',
        highlight: 'conversation-stats',
        action: 'show-conversation-threshold',
        data: {
          client: 'RetailMax',
          message_count: 52,
          token_count: 6243,
          duration: '18 minutes',
          threshold_triggered: 'message_count > 50'
        }
      },
      {
        id: 'b3-2',
        title: 'Auto-Summary Triggered',
        description: 'System automatically generates summary, masking sensitive data like API keys and personal info',
        highlight: 'summary-generation',
        action: 'show-auto-summarize',
        data: {
          summary_type: 'Automatic',
          sensitive_data_masked: ['API_KEY_****', 'phone: ***-***-3456'],
          summary_length: '3 paragraphs',
          processing_time: '2.1 seconds'
        }
      },
      {
        id: 'b3-3',
        title: 'Summary Pinned to Memory',
        description: 'Key decisions and brand preferences are pinned: "RetailMax prefers Gen Z tone, sustainable messaging, holiday themes"',
        highlight: 'pinned-memory',
        action: 'show-pinned-memory',
        data: {
          pinned_items: [
            'Brand tone: Gen Z casual with emojis',
            'Key themes: Sustainability, holiday gifting',
            'Content formats: Instagram Reels, TikTok',
            'Approved hashtags: #RetailMaxCore #SustainableHoliday'
          ],
          memory_retention: 'Permanent until manually cleared'
        }
      },
      {
        id: 'b3-4',
        title: 'Summary Displayed in UI',
        description: 'Operator sees concise summary at top of conversation, agents use it for context without reading all 52 messages',
        highlight: 'summary-display',
        action: 'show-summary-ui',
        data: {
          display_location: 'Top of conversation thread',
          summary_preview: 'RetailMax holiday campaign: Created 15 Instagram posts with Gen Z tone...',
          messages_archived: 52,
          ui_performance: 'Thread loads 5x faster'
        }
      }
    ]
  }
];

// EPIC C - Traffic & Policies  
export const epicC_Walkthroughs: UserStoryWalkthrough[] = [
  {
    id: 'c1-route-work',
    epic: 'Traffic & Policies',
    story: 'As an Operator, I want jobs routed transparently so I know why an agent was chosen.',
    acceptance: 'Routing decision logged with policy and reason, 95% under 200ms',
    steps: [
      {
        id: 'c1-1',
        title: 'Open Nucleus Side Panel',
        description: 'Working on CloudTech\'s product launch. Open Nucleus panel — it docks to the right side of your browser',
        highlight: 'chrome-extension',
        action: 'open-side-panel',
        data: {
          panel_width: '400px',
          position: 'right',
          client: 'CloudTech'
        }
      },
      {
        id: 'c1-3a',
        title: 'Agent Example — Scout',
        description: 'Each agent glows when posting; bubbles are color‑coded with icons.',
        action: 'show-agent-example',
        data: { agent: 'Scout', content: 'Found 3 competitor launches worth referencing.' }
      },
      {
        id: 'c1-3b',
        title: 'Agent Example — Muse',
        description: 'Each agent glows when posting; bubbles are color‑coded with icons.',
        action: 'show-agent-example',
        data: { agent: 'Muse', content: 'Here are two concept directions to explore next.' }
      },
      {
        id: 'c1-3c',
        title: 'Agent Example — Echo',
        description: 'Each agent glows when posting; bubbles are color‑coded with icons.',
        action: 'show-agent-example',
        data: { agent: 'Echo', content: 'Drafted the launch announcement headline + lead.' }
      },
      {
        id: 'c1-3d',
        title: 'Agent Example — Atlas',
        description: 'Each agent glows when posting; bubbles are color‑coded with icons.',
        action: 'show-agent-example',
        data: { agent: 'Atlas', content: 'QA check passed: tone, claims, brand terms.' }
      },
      {
        id: 'c1-3e',
        title: 'Agent Example — Beacon',
        description: 'Each agent glows when posting; bubbles are color‑coded with icons.',
        action: 'show-agent-example',
        data: { agent: 'Beacon', content: 'Localized the announcement for ES and DE.' }
      }
    ]
  },
  {
    id: 'c2-concurrency-budgets',
    epic: 'Traffic & Policies',
    story: 'As an Operator, I want the system to stay stable under load.',
    acceptance: 'Enforce max concurrent jobs per agent, token/time/cost limits with clear errors',
    steps: [
      {
        id: 'c2-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel for live system updates',
        highlight: 'chrome-extension',
        action: 'open-side-panel',
        data: {
          panel_width: '400px',
          position: 'right',
          client: 'SportsBrand'
        }
      },
      {
        id: 'c2-1',
        title: 'High Load Detected',
        description: 'Black Friday surge: 15 operators submit jobs simultaneously for SportsBrand\'s campaign',
        highlight: 'system-load',
        action: 'show-high-load',
        data: {
          concurrent_requests: 15,
          client: 'SportsBrand',
          campaign: 'Black Friday Flash Sale',
          system_load: '87%'
        }
      },
      {
        id: 'c2-2',
        title: 'Agent Reaches Capacity',
        description: 'Echo hits max capacity: "Echo at 10/10 concurrent jobs - new job queued (position #3)"',
        highlight: 'agent-capacity',
        action: 'show-capacity-limit',
        data: {
          agent: 'Echo',
          current_jobs: 10,
          max_concurrent: 10,
          queue_position: 3,
          error_code: 'AGENT_AT_CAPACITY',
          estimated_wait: '2-3 minutes'
        }
      },
      {
        id: 'c2-3',
        title: 'Token Budget Exceeded',
        description: 'Job stopped mid-process: "Token budget exceeded (50,001/50,000) - job paused for review"',
        highlight: 'budget-warning',
        action: 'show-budget-exceeded',
        data: {
          limit_type: 'token_budget',
          tokens_used: 50001,
          token_limit: 50000,
          error_code: 'TOKEN_BUDGET_EXCEEDED',
          job_status: 'PAUSED',
          operator_action_required: 'Approve additional tokens or reduce scope'
        }
      },
      {
        id: 'c2-4',
        title: 'Clear Error Display',
        description: 'System shows clear status: queue positions, wait times, and budget remaining for transparency',
        highlight: 'status-display',
        action: 'show-system-status',
        data: {
          queue_status: 'Position #3 of 5',
          budgets_remaining: {
            tokens: '12,450/50,000',
            time: '8min/15min',
            cost: '$3.20/$10.00'
          },
          agent_availability: {
            Scout: '3/5 capacity',
            Muse: '7/10 capacity',
            Echo: '10/10 capacity (queue: 5)',
            Atlas: '2/5 capacity',
            Beacon: '1/3 capacity'
          }
        }
      }
    ]
  }
];

// EPIC D - Inter-Agent Collaboration
export const epicD_Walkthroughs: UserStoryWalkthrough[] = [
  {
    id: 'd1-consult-without-transfer',
    epic: 'Inter-Agent Collaboration',
    story: 'As an agent, I want to ask another agent for help without giving up ownership of my job.',
    acceptance: 'Consult provides answer within 2s for 95% cases, logs who/what/why, max chain depth 3',
    steps: [
      {
        id: 'd1-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel',
        highlight: 'chrome-extension',
        action: 'open-side-panel'
      },
      {
        id: 'd1-1',
        title: 'Muse Needs Research Help',
        description: 'Muse is creating content for TechCorp but needs market data. Decides to consult Scout',
        highlight: 'agent-muse',
        action: 'show-consult-need',
        data: {
          requesting_agent: 'Muse',
          task: 'TechCorp product launch content',
          need: 'Market research on AI assistant competitors',
          ownership: 'Muse retains job ownership'
        }
      },
      {
        id: 'd1-2',
        title: 'Consult Request Sent',
        description: 'Muse asks Scout: "What are the top 3 AI assistant competitors and their key features?"',
        highlight: 'consult-arrow',
        action: 'send-consult',
        data: {
          from: 'Muse',
          to: 'Scout',
          query: 'What are the top 3 AI assistant competitors and their key features?',
          capability_used: 'market_research',
          consult_id: 'consult_2024_001'
        }
      },
      {
        id: 'd1-3',
        title: 'Scout Responds Quickly',
        description: 'Scout returns analysis in 1.8 seconds without taking over the job',
        highlight: 'consult-response',
        action: 'show-consult-response',
        data: {
          response_time: '1.8 seconds',
          response: '1. GPT-4: Advanced reasoning\n2. Claude: Long context\n3. Gemini: Multimodal',
          ownership_unchanged: true,
          logged: true
        }
      },
      {
        id: 'd1-4',
        title: 'Chain Depth Enforced',
        description: 'Scout consults Atlas for verification, who consults Beacon. System prevents 4th level consult',
        highlight: 'chain-limit',
        action: 'show-chain-limit',
        data: {
          chain: ['Muse → Scout → Atlas → Beacon'],
          depth: 3,
          max_depth: 3,
          fourth_consult_blocked: true,
          error: 'Max consult chain depth reached'
        }
      }
    ]
  },
  
];

// EPIC E - Operator UI
/* Removed Epic E (Operator UI) per product simplification */
// export const epicE_Walkthroughs: UserStoryWalkthrough[] = [
/*  {
    id: 'e1-see-five-agents',
    epic: 'Operator UI',
    story: 'As an Operator, I want to see all five agents and know which is active.',
    acceptance: 'Grid shows all five agents, active one emphasized, queue depth + timers visible',
    steps: [
      {
        id: 'e1-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel',
        highlight: 'chrome-extension',
        action: 'open-side-panel'
      },
      {
        id: 'e1-1',
        title: 'Access Job History',
        description: 'You need to find that brilliant campaign from last month. Click "History" to see all past jobs',
        highlight: 'history-button',
        action: 'open-history',
        data: {
          total_jobs: 284,
          date_range: 'Last 90 days',
          clients_served: 12
        }
      },
      {
        id: 'e1-2',
        title: 'Active Agent Emphasized',
        description: 'Echo glows with animated border, showing it\'s processing. Queue shows "2 pending"',
        highlight: 'agent-echo-active',
        action: 'show-active-agent',
        data: {
          agent: 'Echo',
          status: 'Processing',
          queue_depth: 2,
          current_task: 'Writing product descriptions',
          time_elapsed: '1:34'
        }
      },
      {
        id: 'e1-3',
        title: 'Queue Depth Visible',
        description: 'Each agent shows queue depth: Scout (0), Muse (1), Echo (2), Atlas (0), Beacon (0)',
        highlight: 'queue-indicators',
        action: 'show-queue-depth',
        data: {
          Scout: { queue: 0, status: 'Available' },
          Muse: { queue: 1, status: 'Working' },
          Echo: { queue: 2, status: 'Busy' },
          Atlas: { queue: 0, status: 'Available' },
          Beacon: { queue: 0, status: 'Available' }
        }
      },
      {
        id: 'e1-4',
        title: 'Timers Show Progress',
        description: 'Echo\'s timer shows 1:34 elapsed, estimated 2:30 remaining based on similar jobs',
        highlight: 'timer-display',
        action: 'show-timers',
        data: {
          elapsed_time: '1:34',
          estimated_remaining: '2:30',
          progress_percentage: 62,
          historical_average: '3:45 for similar tasks'
        }
      }
    ]
  },
  {
    id: 'e2-collaboration-graph',
    epic: 'Operator UI',
    story: 'As an Operator, I want to see when agents consult or handoff tasks.',
    acceptance: 'Edge animates in graph, event appears in timeline with latency + summary',
    steps: [
      {
        id: 'e2-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel',
        highlight: 'chrome-extension',
        action: 'open-side-panel'
      },
      {
        id: 'e2-1',
        title: 'Collaboration Graph Active',
        description: 'Watch as Muse consults Scout. Animated edge appears between their nodes in the graph',
        highlight: 'collaboration-graph',
        action: 'show-graph-animation',
        data: {
          from_agent: 'Muse',
          to_agent: 'Scout',
          edge_animation: 'Glowing arrow',
          consult_type: 'Research request'
        }
      },
      {
        id: 'e2-2',
        title: 'Timeline Event Logged',
        description: 'Timeline shows: "14:32:15 - Muse → Scout consult (1.2s): Competitor analysis requested"',
        highlight: 'timeline-entry',
        action: 'show-timeline-event',
        data: {
          timestamp: '14:32:15',
          event: 'Muse → Scout consult',
          latency: '1.2 seconds',
          summary: 'Competitor analysis requested'
        }
      },
      {
        id: 'e2-3',
        title: 'Handoff Visualization',
        description: 'Echo hands off to Atlas for QA. Node ownership transfers visually with color change',
        highlight: 'handoff-animation',
        action: 'show-handoff',
        data: {
          from: 'Echo',
          to: 'Atlas',
          ownership_visual: 'Echo dims, Atlas brightens',
          task_transferred: 'Content quality review'
        }
      },
      {
        id: 'e2-4',
        title: 'Performance Metrics',
        description: 'Timeline summary: "5 consults, 2 handoffs, avg latency 1.8s, total collaboration time 12s"',
        highlight: 'timeline-metrics',
        action: 'show-metrics',
        data: {
          total_consults: 5,
          total_handoffs: 2,
          average_latency: '1.8 seconds',
          total_collab_time: '12 seconds',
          efficiency_score: '94%'
        }
      }
    ]
  },
  {
    id: 'e3-conversation-pane',
    epic: 'Operator UI',
    story: 'As an Operator, I want a live thread of messages so I can follow the conversation without delay.',
    acceptance: 'Thread updates within 1s, search returns top results in <300ms for 95% of searches',
    steps: [
      {
        id: 'e3-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel',
        highlight: 'chrome-extension',
        action: 'open-side-panel'
      },
      {
        id: 'e3-1',
        title: 'Live Message Thread',
        description: 'You type "Make it more technical" and see your message appear instantly in the thread',
        highlight: 'conversation-thread',
        action: 'send-message',
        data: {
          message: 'Make it more technical',
          appears_in: '0.4 seconds',
          message_id: 'msg_089',
          thread_position: 'Bottom'
        }
      },
      {
        id: 'e3-2',
        title: 'Agent Response Live',
        description: 'Echo\'s response appears in 0.8s: "Adjusting technical depth. Adding API specs and architecture details"',
        highlight: 'agent-response-live',
        action: 'show-live-response',
        data: {
          agent: 'Echo',
          response_time: '0.8 seconds',
          message: 'Adjusting technical depth. Adding API specs and architecture details',
          typing_indicator: 'Showed for 0.6s'
        }
      },
      {
        id: 'e3-3',
        title: 'Search Conversation',
        description: 'Type "API" in search. Top 5 messages about API discussions appear in 280ms',
        highlight: 'conversation-search',
        action: 'search-thread',
        data: {
          search_term: 'API',
          results_count: 5,
          search_time: '280ms',
          highlights: 'Search term highlighted in yellow'
        }
      },
      {
        id: 'e3-4',
        title: 'Auto-Scroll & Updates',
        description: 'As agents collaborate, thread auto-scrolls. New messages push older ones up smoothly',
        highlight: 'auto-scroll',
        action: 'show-auto-scroll',
        data: {
          behavior: 'Smooth scroll to bottom',
          pause_on_hover: true,
          unread_indicator: 'Shows "3 new messages" if scrolled up',
          performance: 'No lag with 500+ messages'
        }
      }
    ]
  }
*/
// ];

// EPIC E - Security & Audit  
export const epicE_Walkthroughs: UserStoryWalkthrough[] = [
  {
    id: 'e1-enforce-rls-rbac',
    epic: 'Security & Audit',
    story: 'As an Admin, I need to guarantee that each client\'s data is isolated from others and that every action is tracked.',
    acceptance: 'Access denied for other client data, all actions logged with user/time/reason, searchable audit logs',
    steps: [
      {
        id: 'e1-0',
        title: 'Open Nucleus Side Panel',
        description: 'Click the Nucleus extension icon to open the operator panel',
        highlight: 'chrome-extension',
        action: 'open-side-panel'
      },
      {
        id: 'e1-1',
        title: 'Complex Request Arrives',
        description: 'HealthTech asks: "Need HIPAA-compliant copy for patient portal, plus ensure it\'s accessible (WCAG 2.1)"',
        highlight: 'message-input',
        action: 'receive-request',
        data: {
          request: 'HIPAA-compliant copy for patient portal with WCAG 2.1 accessibility',
          complexity: 'High',
          requirements: ['HIPAA compliance', 'Accessibility', 'Medical accuracy']
        }
      },
      {
        id: 'e1-2',
        title: 'Attempt Cross-Client Access',
        description: 'Operator tries to access BioMed data via direct URL. System blocks: "Access Denied - Not authorized"',
        highlight: 'access-denied',
        action: 'show-access-denial',
        data: {
          attempted_access: 'BioMed client data',
          result: 'ACCESS_DENIED',
          error_code: 403,
          audit_logged: true,
          log_entry: 'Unauthorized access attempt by Sarah Chen'
        }
      }
    ]
  }
];

// Combine all walkthroughs for easy export
export const walkthroughCategories = [
  {
    id: 'epic-a',
    name: 'ClickUp Context & Sync',
    description: 'Auto-detection, deliverable sync, and error handling',
    walkthroughs: epicA_Walkthroughs
  },
  {
    id: 'epic-b',
    name: 'Conversations & Memory',
    description: 'Persist ordered threads, provide context, and auto-summarize',
    walkthroughs: epicB_Walkthroughs
  },
  {
    id: 'epic-c',
    name: 'Traffic & Policies',
    description: 'Route work transparently, manage concurrency and budgets',
    walkthroughs: epicC_Walkthroughs
  },
  {
    id: 'epic-d',
    name: 'Inter-Agent Collaboration',
    description: 'Consult without transfer',
    walkthroughs: epicD_Walkthroughs
  },
  {
    id: 'epic-e',
    name: 'Security & Audit',
    description: 'Enforce RLS/RBAC, maintain audit trails',
    walkthroughs: epicE_Walkthroughs
  }
];
