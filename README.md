# Nucleus Operator Wireframes

## 🎯 Project Overview

Interactive wireframe demonstration system for the Nucleus AI platform (formerly Muse), showcasing user story walkthroughs from the Product Requirements Document (PRD). This React TypeScript application provides an immersive, step-by-step visualization of how AI agents interact with ClickUp tasks through a Chrome extension interface.

### Key Features
- **Interactive Walkthroughs**: Step-by-step demonstrations of all PRD user stories
- **ClickUp Integration Simulation**: Realistic mockup of ClickUp task management interface
- **Chrome Extension UI**: Simulated Nucleus side panel with agent interactions
- **Visual Feedback System**: Yellow highlight boxes and auto-scrolling to show live updates
- **Multi-Agent System**: Demonstrations of Scout, Muse, Echo, Atlas, and Beacon AI agents

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser (Chrome recommended)

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd muse-operator-wireframes

# Install dependencies
npm install

# Start the development server
npm start

# Or start on a specific port
PORT=3002 npm start
```

The application will open at `http://localhost:3000` (or your specified port).

## 📁 Project Structure

```
muse-operator-wireframes/
├── src/
│   ├── components/
│   │   ├── InteractiveWalkthrough.tsx    # Main walkthrough controller
│   │   ├── WalkthroughSelector.tsx       # Epic/story selection UI
│   │   ├── WalkthroughMusePanel.tsx      # Nucleus extension panel UI
│   │   └── KnowledgeFactory.tsx          # Knowledge Factory demo page
│   ├── walkthroughs/
│   │   └── PRDWalkthroughs.ts           # All walkthrough definitions
│   ├── DemoClickUpPage.tsx              # ClickUp interface mockup
│   ├── DemoMuseOperatorUI.tsx           # Original Nucleus operator UI
│   └── App.tsx                           # Main application router
├── public/
│   └── [static assets]
└── package.json
```

## 🎭 Core Components

### 1. **WalkthroughSelector** (`src/components/WalkthroughSelector.tsx`)
Entry point for users to select and launch walkthroughs.
- Displays 6 epic categories from the PRD
- Tracks completion progress
- Visual progress indicators

### 2. **InteractiveWalkthrough** (`src/components/InteractiveWalkthrough.tsx`)
Controls the walkthrough experience.
- Step navigation (forward/backward)
- Action execution based on step type
- Data passing to UI components
- Pointer arrows and highlighting

### 3. **DemoClickUpPage** (`src/DemoClickUpPage.tsx`)
Simulated ClickUp task interface.
- Real-time updates with visual feedback
- Yellow box highlighting for changes
- Auto-scrolling to updated sections
- Document uploads, comments, status changes

### 4. **WalkthroughMusePanel** (`src/components/WalkthroughMusePanel.tsx`)
Chrome extension side panel simulation.
- Agent conversations
- Job creation and management
- Sync status indicators
- Error handling demonstrations

### 5. **PRDWalkthroughs** (`src/walkthroughs/PRDWalkthroughs.ts`)
Complete walkthrough definitions aligned with PRD.
- 6 Epics with multiple user stories
- Step-by-step action sequences
- Data payloads for realistic demonstrations

## 📚 Walkthrough Epics

### Epic A: ClickUp Context & Sync
- **A1**: Context Detection - Auto-detects ClickUp task context
- **A2**: Deliverable Sync - Syncs AI-generated content to ClickUp
- **A3**: Sync Failures & Retry - Handles API limits and retry logic

### Epic B: Conversations & Memory
- **B1**: Conversation Continuity - Maintains context across sessions
- **B2**: Context Switching - Manages multiple client contexts
- **B3**: Memory Retrieval - Accesses historical interactions

### Epic C: Traffic & Policies
- **C1**: Smart Routing - Routes requests to appropriate agents
- **C2**: Policy Enforcement - Applies client-specific rules
- **C3**: Load Balancing - Distributes work across agents

### Epic D: Inter-Agent Collaboration
- **D1**: Agent Consults - Agents request help from specialists
- **D2**: Handoffs - Seamless task transfers between agents
- **D3**: Parallel Processing - Multiple agents working simultaneously

### Epic E: Operator UI
- **E1**: Multi-Job Management - Handle multiple active jobs
- **E2**: Real-time Updates - Live progress indicators
- **E3**: Quick Actions - Efficient operator controls

### Epic F: Security & Audit
- **F1**: Data Isolation - Client data separation
- **F2**: Audit Trail - Complete activity logging
- **F3**: Permission Controls - Role-based access

## 🎨 Visual Features

### Yellow Box Highlighting
- 3px solid yellow border (#FBB024)
- Pulsing animation effect
- 4-second duration
- Light yellow background tint

### Auto-Scrolling
- Smooth scroll animations
- Centers changed elements in view
- Sequential scrolling for multiple updates
- Timed delays for user comprehension

### Update Types Supported
- `comment-posted`: New comments with attachments
- `sync-success`: Successful sync with status updates
- `field-update`: Individual field changes (status, progress, etc.)
- `document-upload`: File attachments to tasks
- `error-display`: Error messages with retry options

## 🛠️ Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

## 📝 Adding New Walkthroughs

1. **Define in PRDWalkthroughs.ts**:
```typescript
{
  id: 'unique-story-id',
  epic: 'Epic Category',
  story: 'As an Operator, I want to...',
  acceptance: 'Acceptance criteria',
  steps: [
    {
      id: 'step-1',
      title: 'Step Title',
      description: 'What happens',
      action: 'action-type',
      data: { /* step data */ }
    }
  ]
}
```

2. **Handle Actions in InteractiveWalkthrough.tsx**:
```typescript
case 'your-action':
  setClickUpUpdates([{
    type: 'update-type',
    ...stepData
  }]);
  break;
```

3. **Process Updates in DemoClickUpPage.tsx**:
```typescript
if (update.type === 'your-update-type') {
  // Handle the update
  // Apply visual changes
  // Set highlights
}
```

## 🔄 State Management

### Key State Variables
- `currentStepIndex`: Current position in walkthrough
- `isMuseVisible`: Extension panel visibility
- `clickUpUpdates`: Updates queue for ClickUp interface
- `highlightedFields`: Fields currently highlighted
- `documents`: Uploaded documents list
- `comments`: Posted comments array

## 🎯 Important Notes

### Branding
- All references to "Muse" have been updated to "Nucleus"
- Nucleus AI is the current branding for the AI system
- Chrome extension is called "Nucleus Extension"

### Agent System
- **Scout**: Research and competitive analysis
- **Muse**: Creative ideation and strategy
- **Echo**: Content creation and copywriting
- **Atlas**: Quality assurance and compliance
- **Beacon**: Localization and translation

### Visual Consistency
- Agent colors are consistent across all walkthroughs
- Professional gradient styling (blue to purple)
- Consistent bubble colors per agent role

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
```bash
PORT=3002 npm start  # Use alternate port
```

2. **TypeScript Errors**
```bash
npm run typecheck  # Check for type issues
```

3. **Dependencies Issues**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Deployment

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

### Build Optimization
The production build is optimized and minified:
```bash
npm run build
serve -s build  # Serve production build
```

## 🤝 Contributing

### Code Style
- TypeScript with strict type checking
- React functional components with hooks
- Tailwind CSS for styling
- Clear component separation

### Commit Messages
Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring

## 📄 License

[Specify your license here]

## 🔗 Related Resources

- [PRD Document](link-to-prd)
- [Nucleus Platform](link-to-platform)
- [ClickUp API](https://clickup.com/api)

## 👥 Team

- Product Owner: [Name]
- Development Team: [Names]
- UX/UI Design: [Names]

---

## 🚦 Current Status

- ✅ All Epic A stories implemented
- ✅ Visual feedback system complete
- ✅ Auto-scrolling functionality
- ✅ Yellow highlight boxes
- ✅ Document upload visualization
- ✅ Comment system with attachments
- ✅ Retry logic demonstration
- ✅ Multi-agent interactions

## 📊 Metrics

- **Total Walkthroughs**: 18 user stories
- **Interactive Steps**: 200+ demonstration steps
- **Agent Types**: 5 specialized AI agents
- **Update Types**: 10+ different update actions

---

*Last Updated: January 2025*
*Version: 1.0.0*