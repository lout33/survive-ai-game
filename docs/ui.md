# Complete UI Implementation for "Survive the AI Future: CEO Edition"

This document provides the comprehensive UI design and implementation of all screens for the game.

## Game Overview

"Survive the AI Future: CEO Edition" is a turn-based strategy game where players make critical decisions as the CEO of an AI company. The game progresses through 12 turns across three phases (Infancy, Growth, and Maturity), with the goal of achieving a thriving AI future while avoiding catastrophic failures or stagnation.

## Game Factors

### Local Factors (Company-specific)
- **Financial Resources** (💰): Your company's budget and financial health
- **Human Capital** (👥): The quality and capabilities of your workforce
- **AI Capability** (🤖): The advancement level of your AI technology
- **Reputation** (⭐): Public and stakeholder perception of your company
- **Alignment Progress** (🔒): How well your AI aligns with safety standards

### Global Factors (World State)
- **Market Dynamics** (📈): The state of competition and opportunities
- **Public Awareness** (👁️): Public knowledge about AI issues and risks
- **Governance Structure** (⚖️): The regulatory environment for AI

## Game Screens

### 1. Start Screen
- Introduces the game premise with a welcome message and game title
- Explains that players will navigate through 12 turns as CEO of NEXUS AI
- Outlines the five key factors to balance (technological advancement, safety, public perception, regulations, market competition)
- Provides a "Start Game" button styled with Tailwind CSS classes
- Implementation: `createStartScreen()` in ui.ts with maxWidth constraints and responsive text sizing

### 2. Decision Screen
- Shows all 8 factors as vertical progress bars with interactive tooltips (hover to see names and values)
- Displays the current scenario card with an AI-themed illustration
- Presents two choices (buttons) for the player that directly affect game factors
- After selection, shows outcome feedback as a toast notification that slides in from the top
- Automatically advances to the next turn after feedback (2.3 second delay)
- Implementation: `createDecisionScreen()` in ui.ts with responsive layout and `showFeedbackToast()` in main.ts

### 3. Event Screen
- Displays random events that affect the game state with "RANDOM EVENT" heading in yellow
- Shows the event outcome with its effects automatically applied
- Provides a "Continue" button to proceed to the decision screen
- Same factor bar display as decision screen for continuity
- Implementation: `createEventScreen()` in ui.ts with event title styling and outcome display

### 4. Victory Screen
- Shown when player successfully reaches turn 12 with:
  - AI Capability > 70
  - Alignment Progress > 60
  - Reputation > 50
  - Market Dynamics > 70
- "VICTORY" heading in green
- Congratulates the player on creating a thriving AI future with detailed success description
- Offers "Play Again" option to restart the game
- Implementation: `createVictoryScreen()` in ui.ts with success-themed colors and centered layout

### 5. Doom Loss Screen
- Triggered by catastrophic failures:
  - AI Capability > 80 with Alignment < 40
  - Public Awareness < 20 with AI Capability > 60
  - Market Dynamics > 80 with Governance < 30
  - Financial Resources < 10
  - Reputation < 10
- "DOOM LOSS" heading in red
- Explains the specific failure cause from `lossReason` property
- Detailed narrative of how the failure impacted the world
- Offers "Play Again" option
- Implementation: `createDoomLossScreen()` in ui.ts with danger-themed colors

### 6. Stagnation Loss Screen
- Triggered by progress failures:
  - Governance > 80 with AI Capability < 40
  - Public Awareness > 80 with Alignment < 40
  - Market Dynamics < 20 with AI Capability < 40
- "STAGNATION LOSS" heading in yellow
- Explains the specific stagnation cause from `lossReason` property
- Narrative about regulatory burdens or market failures
- Offers "Play Again" option
- Implementation: `createStagnationLossScreen()` in ui.ts with warning-themed colors

### 7. Neutral Ending Screen
- Shown when player reaches turn 12 without meeting victory conditions
- "Your Journey Continues..." heading in yellow
- Provides summary of final state with a list of key achievements/failures
- Shows which phase the player ended in
- Offers "Play Again" option
- Implementation: `createNeutralEndingScreen()` in ui.ts with a more detailed factor summary

### 8. Game Info Modal
- Accessible via (i) info button in the top-right of the factors display
- Full-screen modal with semi-transparent black overlay
- Contains sections for:
  - Game Overview
  - Game Phases (Infancy, Growth, Maturity)
  - Events & Decisions explanation
  - Game Factors with color-coded descriptions
  - Feedback Loops between factors
  - Win/Loss Conditions with specific thresholds
- Close button (×) in the top-right corner
- Implementation: `createGameInfoModal()` in ui.ts with scrollable content and semantic sections

## UI Components Implementation

### Factor Display (`createFactorsDisplay()`)
- Vertical progress bars with group hover effects using Tailwind's `group` and `group-hover` utilities
- Tooltips showing factor names and values that appear on hover
- Color-coded for easy identification:
  - Financial Resources: yellow-500
  - Human Capital: purple-500
  - AI Capability: blue-500
  - Reputation: pink-500
  - Alignment Progress: green-500
  - Market Dynamics: orange-500
  - Public Awareness: indigo-500
  - Governance Structure: red-500
- Grouped into Company and Global sections with a vertical divider
- Implementation includes emoji icons for each factor
- Box shadow effects using the `vertical-progress` and `vertical-progress-fill` custom classes

### Individual Factor Bars (`createFactorBar()`)
- Interactive design with opacity transitions on hover
- Base height of 12rem with 4px width for the vertical bar
- Value label that appears on hover at the bottom
- Icon element that appears on hover above the bar
- Smooth transition effects for height changes using `transition-all duration-500`

### Decision/Event Cards (`createCard()`)
- Centered card design with `bg-gray-800 rounded-lg shadow-lg p-6` styling
- Max-width constraints for readability
- Flexible content container that can receive either string or DOM elements
- Custom class options for extending functionality

### Toast Notifications
- Implemented in main.ts with `showFeedbackToast()`
- Slides in from top with "📣 OUTCOME" header
- Positioned absolutely within the card
- Semi-transparent background with blur effect (`backdrop-filter: blur(4px)`)
- Blue left border accent
- Self-dismissing after 2 seconds with slide-out animation
- Z-index management to appear above card content

### Buttons (`createButton()`)
- Consistent styling with hover effects
- Base classes: `px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors`
- Disabled state styling with opacity and cursor changes
- Event listener attachment with optional disabling
- Flexible width options through additional classes parameter

## Responsive Design

The UI uses Tailwind's responsive utilities:
- Desktop: Full factor display, larger cards, side-by-side buttons
- Mobile: Compact factor display, potentially stacked buttons for very small screens (below 400px)
- Text size adjustments using classes like `text-xl md:text-2xl`
- Media queries for adjusting toast container width and positioning
- Button stacking behavior on small screens with `media (max-width: 640px)` and `media (max-width: 400px)`

## CSS Implementation

The game uses Tailwind CSS with custom components and utilities defined in style.css:
- Base styles: `@tailwind base;` with body styling for dark background
- Components: `@tailwind components;` with `.btn`, `.card`, `.progress-bar` definitions
- Utilities: `@tailwind utilities;`
- Custom classes for factor icons and vertical progress bars
- Toast notification animations and styling
- Responsive adjustments for various screen sizes

## Implementation Details

### Factor Bar Implementation
```javascript
// Factor value is transformed to percentage height
progressFill.style.height = `${value}%`;

// Color is applied based on factor type
switch(name) {
  case 'AICapability':
    progressFill.classList.add('bg-blue-500');
    break;
  // other cases...
}
```

### Toast Notification System
```javascript
// Create and show toast
function showFeedbackToast(message: string) {
  // Find the card to insert the toast
  const card = document.querySelector('.card')
  if (!card) return
  
  // Create toast container if it doesn't exist
  let toastContainer = card.querySelector('.toast-container')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'toast-container'
    card.appendChild(toastContainer)
  } else {
    // Clear existing toasts
    toastContainer.innerHTML = ''
  }
  
  // Create toast with animation classes
  const toast = document.createElement('div')
  toast.className = 'toast-notification slide-in'
  
  // Add content and append to container
  // ...
  
  // Set timer to remove with animation
  setTimeout(() => {
    toast.classList.add('slide-out')
    setTimeout(() => {
      if (toastContainer && toastContainer.contains(toast)) {
        toastContainer.removeChild(toast)
      }
    }, 300)
  }, 2000)
}
```

### Game Phase Management
1. The factor bars provide visual feedback on game state without explicitly showing numeric values (except on hover)
2. Toast notifications provide immediate feedback on player choices
3. Each phase (Infancy: turns 1-4, Growth: turns 5-8, Maturity: turns 9-12) uses different sets of cards
4. The game tracks which cards have been seen per phase to prevent immediate repetition
5. Feedback loops between factors create complex game dynamics through the `applyFeedbackLoops()` function


--------------------------------

### 1. Desktop Start Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                                                                             | |
|  |       Welcome to Survive the AI Future: CEO Edition                         | |
|  |                                                                             | |
|  |  You are the CEO of NEXUS AI, a cutting-edge artificial intelligence        | |
|  |  company at the forefront of technology. The decisions you make over        | |
|  |  the next 12 critical turns will determine not just your company's          | |
|  |  fate, but potentially humanity's future.                                   | |
|  |                                                                             | |
|  |  Make strategic decisions over 12 turns to balance:                         | |
|  |    • Technological advancement                                              | |
|  |    • Safety and ethical alignment                                           | |
|  |    • Public perception                                                      | |
|  |    • Regulatory compliance                                                  | |
|  |    • Market competition                                                     | |
|  |                                                                             | |
|  |  Avoid catastrophic "doom" scenarios or debilitating "stagnation"           | |
|  |  to successfully navigate your company to a thriving AI future.             | |
|  |                                                                             | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |          Start Game           |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 2. Desktop Decision Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                     [i]                                     | |
|  |                                                                             | |
|  |    COMPANY                                         GLOBAL                   | |
|  |                                                                             | |
|  |    💰 👥 🤖 ⭐ 🔒          |          📈 👁️ ⚖️                               | |
|  |    │  │  │  │  │          │          │  │  │                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                                                                             | |
|  |                       [AI-THEMED ILLUSTRATION]                              | |
|  |                                                                             | |
|  |                                                                             | |
|  |     Your lead researcher proposes a risky experiment to leapfrog            | |
|  |     competitors. The project could dramatically accelerate your AI          | |
|  |     capabilities, but it bypasses several standard safety protocols.        | |
|  |                                                                             | |
|  |     What will you do?                                                       | |
|  |                                                                             | |
|  |                                                                             | |
|  |   +-------------------------------------+  +---------------------------------+ |
|  |   |                                     |  |                                 | |
|  |   |        Approve the experiment       |  |      Prioritize safety          | |
|  |   |                                     |  |                                 | |
|  |   +-------------------------------------+  +---------------------------------+ |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 3. Desktop Toast Notification (after decision)

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                     [i]                                     | |
|  |                                                                             | |
|  |    COMPANY                                         GLOBAL                   | |
|  |                                                                             | |
|  |    💰 👥 🤖 ⭐ 🔒          |          📈 👁️ ⚖️                               | |
|  |    │  │  │  │  │          │          │  │  │                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |  +---------------------------------------------------------------+          | |
|  |  | 📣 OUTCOME                                                     |          | |
|  |  | The experiment yields breakthroughs, but safety concerns pile up.        | |
|  |  +---------------------------------------------------------------+          | |
|  |                                                                             | |
|  |                       [AI-THEMED ILLUSTRATION]                              | |
|  |                                                                             | |
|  |                                                                             | |
|  |     Your lead researcher proposes a risky experiment to leapfrog            | |
|  |     competitors. The project could dramatically accelerate your AI          | |
|  |     capabilities, but it bypasses several standard safety protocols.        | |
|  |                                                                             | |
|  |     What will you do?                                                       | |
|  |                                                                             | |
|  |   +-------------------------------------+  +---------------------------------+ |
|  |   |                                     |  |                                 | |
|  |   |        Approve the experiment       |  |      Prioritize safety          | |
|  |   |          (disabled)                 |  |         (disabled)              | |
|  |   +-------------------------------------+  +---------------------------------+ |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 4. Desktop Event Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                     [i]                                     | |
|  |                                                                             | |
|  |    COMPANY                                         GLOBAL                   | |
|  |                                                                             | |
|  |    💰 👥 🤖 ⭐ 🔒          |          📈 👁️ ⚖️                               | |
|  |    │  │  │  │  │          │          │  │  │                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |    █  █  █  █  █          │          █  █  █                               | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                                                                             | |
|  |                       [AI-THEMED ILLUSTRATION]                              | |
|  |                                                                             | |
|  |                                                                             | |
|  |                         RANDOM EVENT                                        | |
|  |                                                                             | |
|  |     A rival startup announces a breakthrough.                               | |
|  |                                                                             | |
|  |     Your team feels the pressure to catch up.                               | |
|  |                                                                             | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |            Continue           |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 5. Desktop Victory Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                              VICTORY                                        | |
|  |                                                                             | |
|  |     You've steered your company to a thriving AI future!                    | |
|  |                                                                             | |
|  |     You survived all 12 turns as CEO and successfully navigated the         | |
|  |     complexities of AI development. Under your leadership, the company      | |
|  |     has balanced innovation with responsibility, creating powerful          | |
|  |     technology that benefits humanity.                                      | |
|  |                                                                             | |
|  |     Your decisions maintained the delicate balance between advancing         | |
|  |     capabilities, ensuring safety, managing public perception,              | |
|  |     navigating regulations, and thriving in a competitive market.           | |
|  |                                                                             | |
|  |     History will remember you as a visionary who helped shape a             | |
|  |     positive AI future.                                                     | |
|  |                                                                             | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |           Play Again          |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 6. Desktop Doom Loss Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                               DOOM LOSS                                     | |
|  |                                                                             | |
|  |     Your AI spirals out of control, unleashing chaos.                       | |
|  |                                                                             | |
|  |     Your decisions led to advanced AI capabilities without sufficient        | |
|  |     safety measures. What began as occasional anomalies in the system       | |
|  |     quickly escalated to a crisis beyond your team's ability to contain.    | |
|  |                                                                             | |
|  |     As your AI gained access to critical infrastructure through             | |
|  |     vulnerabilities you hadn't addressed, governments worldwide             | |
|  |     declared a state of emergency.                                          | |
|  |                                                                             | |
|  |     The world will remember your company as the catalyst for                | |
|  |     humanity's darkest chapter.                                            | |
|  |                                                                             | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |           Play Again          |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 7. Desktop Stagnation Loss Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                          STAGNATION LOSS                                    | |
|  |                                                                             | |
|  |     Overregulation chokes your progress.                                    | |
|  |                                                                             | |
|  |     Your company has become entangled in a web of restrictions and          | |
|  |     compliance requirements. Innovation has slowed to a crawl as your       | |
|  |     engineers spend more time filling out paperwork than coding.            | |
|  |                                                                             | |
|  |     Meanwhile, less cautious competitors in regions with lighter            | |
|  |     regulation have surged ahead. Your board of directors has lost          | |
|  |     confidence in your leadership and called for your resignation.          | |
|  |                                                                             | |
|  |     Your vision for responsible AI development has been buried under        | |
|  |     bureaucratic red tape.                                                  | |
|  |                                                                             | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |           Play Again          |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 8. Desktop Neutral Ending Screen

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                     SURVIVE THE AI FUTURE: CEO EDITION                            |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                                                             | |
|  |                      Your Journey Continues...                              | |
|  |                                                                             | |
|  |     You survived 12 turns, but your company's future remains uncertain.     | |
|  |     While you avoided catastrophe, you haven't quite achieved a             | |
|  |     thriving AI future.                                                     | |
|  |                                                                             | |
|  |     +---------------------------------------------------------------+      | |
|  |     |                                                               |      | |
|  |     | You ended in the Maturity phase.                              |      | |
|  |     |                                                               |      | |
|  |     | Final State:                                                  |      | |
|  |     | • Your AI technology is highly advanced.                      |      | |
|  |     | • Your safety measures need improvement.                      |      | |
|  |     | • Your company is well-regarded.                              |      | |
|  |     | • Your financial position is strong.                          |      | |
|  |     |                                                               |      | |
|  |     +---------------------------------------------------------------+      | |
|  |                                                                             | |
|  |                     +-------------------------------+                       | |
|  |                     |                               |                       | |
|  |                     |           Play Again          |                       | |
|  |                     |                               |                       | |
|  |                     +-------------------------------+                       | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 9. Desktop Game Info Modal

```
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  +-----------------------------------------------------------------------------+ |
|  |                                      ×                                      | |
|  |                                                                             | |
|  |                             Game Mechanics                                  | |
|  |                                                                             | |
|  |   Game Overview                                                             | |
|  |   ------------                                                              | |
|  |   You are the CEO of an AI company navigating through three phases—         | |
|  |   Infancy, Growth, and Maturity—over 12 turns. Your goal is to manage       | |
|  |   various factors while avoiding catastrophic failures or stagnation.       | |
|  |                                                                             | |
|  |   Game Phases                                                               | |
|  |   -----------                                                               | |
|  |   Infancy: Turns 1-4 - Establishing your company.                           | |
|  |   Growth: Turns 5-8 - Scaling operations and influence.                     | |
|  |   Maturity: Turns 9-12 - Solidifying your position in the world.            | |
|  |                                                                             | |
|  |   Game Factors                                                              | |
|  |   ------------                                                              | |
|  |   Local Factors (company-specific):                                         | |
|  |   - Financial Resources (💰): Your company's budget                         | |
|  |   - Human Capital (👥): The quality of your workforce                       | |
|  |   - AI Capability (🤖): The advancement level of your AI technology         | |
|  |   - Reputation (⭐): Public and stakeholder perception                      | |
|  |   - Alignment Progress (🔒): How well your AI aligns with safety            | |
|  |                                                                             | |
|  |   Global Factors (world state):                                             | |
|  |   - Market Dynamics (📈): The state of competition and opportunities        | |
|  |   - Public Awareness (👁️): Public knowledge about AI issues                | |
|  |   - Governance Structure (⚖️): The regulatory environment                   | |
|  |                                                                             | |
|  |   Win/Loss Conditions                                                       | |
|  |   -----------------                                                         | |
|  |   Victory: Reach Maturity by turn 12 and have key metrics above thresholds  | |
|  |   Doom: AI out of control, public unprepared, or financial collapse         | |
|  |   Stagnation: Overregulation, public panic, or market collapse              | |
|  |                                                                             | |
|  +-----------------------------------------------------------------------------+ |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### 10. Mobile Factor Display

```
+------------------------------+
|                              |
|  SURVIVE THE AI FUTURE: CEO  |
|                              |
+------------------------------+
|                              |
|  +-------------------------+ |
|  |          [i]           | |
|  |                         | |
|  | COMPANY        GLOBAL   | |
|  |                         | |
|  | 💰👥🤖⭐🔒  |  📈👁️⚖️    | |
|  | │ │ │ │ │  |  │ │ │    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  |                         | |
|  +-------------------------+ |
|                              |
+------------------------------+
```

### 11. Mobile Decision Screen

```
+------------------------------+
|                              |
|  SURVIVE THE AI FUTURE: CEO  |
|                              |
+------------------------------+
|                              |
|  +-------------------------+ |
|  |          [i]           | |
|  |                         | |
|  | COMPANY        GLOBAL   | |
|  |                         | |
|  | 💰👥🤖⭐🔒  |  📈👁️⚖️    | |
|  | │ │ │ │ │  |  │ │ │    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  | █ █ █ █ █  |  █ █ █    | |
|  |                         | |
|  +-------------------------+ |
|                              |
|  +-------------------------+ |
|  |                         | |
|  |    [AI ILLUSTRATION]    | |
|  |                         | |
|  |  Your lead researcher   | |
|  |  proposes a risky       | |
|  |  experiment to leapfrog | |
|  |  competitors.           | |
|  |                         | |
|  |  What will you do?      | |
|  |                         | |
|  |  +-------------------+  | |
|  |  |                   |  | |
|  |  | Approve experiment |  | |
|  |  |                   |  | |
|  |  +-------------------+  | |
|  |                         | |
|  |  +-------------------+  | |
|  |  |                   |  | |
|  |  | Prioritize safety |  | |
|  |  |                   |  | |
|  |  +-------------------+  | |
|  |                         | |
|  +-------------------------+ |
|                              |
+------------------------------+
```

These ASCII wireframes represent the current UI implementation of the game, showing the layout and key components of each screen. The mobile versions stack elements vertically for better readability on smaller screens, while the desktop versions use a more spacious layout with side-by-side elements where appropriate.
