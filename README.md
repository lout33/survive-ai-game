# Survive the AI Future: CEO Edition

A turn-based strategy game where you play as the CEO of an AI company making critical decisions that affect the future of AI development and potentially humanity.

## Game Overview

In this game, you will:
- Make strategic decisions over 12 turns
- Progress through three phases: Infancy (Turns 1-4), Growth (Turns 5-8), and Maturity (Turns 9-12)
- Manage multiple factors divided into company-specific and global factors
- Apply feedback loops that simulate realistic interactions between different aspects
- Experience random events and make critical decisions that change with each playthrough
- Avoid triggering catastrophic "doom" scenarios or debilitating "stagnation" losses
- Try to guide your company to a thriving AI future

## Game Mechanics

### Factors
The game tracks eight factors, each ranging from 0 to 100:

- **Local Factors** (specific to your company):
  - **Financial Resources**: Your company's budget
  - **Human Capital**: The quality of your workforce
  - **AI Capability**: The advancement level of your AI technology
  - **Reputation**: Public and stakeholder perception of your company
  - **Alignment Progress**: How well your AI aligns with safety and ethical standards

- **Global Factors** (affecting the game world):
  - **Market Dynamics**: The state of competition and market opportunities
  - **Public Awareness**: Public knowledge and concern about AI issues
  - **Governance Structure**: The regulatory environment

### Phases
The game progresses through three phases based on turn number:
- **Infancy**: Turns 1-4
- **Growth**: Turns 5-8
- **Maturity**: Turns 9-12

Each phase features its own set of challenges, opportunities, and cards.

### Events & Decisions
Each turn includes:
- **Random Events** that affect your company's status
- **Critical Decisions** you must make

The game features a card tracking system that prevents repetitive scenarios:
- Each phase has its own deck of event and decision cards
- The game tracks which cards you've already seen
- Cards won't repeat until all eligible cards in the current phase have been shown
- As you progress through phases, you'll encounter completely new scenarios

## How to Play

1. Click "Start Game" to begin
2. Each turn, you'll experience a random event and be presented with a decision scenario
3. Choose the option you think is best (left or right)
4. After each decision, you'll see feedback on the outcome
5. Continue for 12 turns, trying to maintain a balance of all factors
6. Click the "?" button in the top right corner for more information about game mechanics

## Win Conditions

- **Victory**: Reach the Maturity phase with strong factor values:
  - `AI Capability > 70`
  - `Alignment Progress > 60`
  - `Reputation > 50`
  - `Market Dynamics > 70`

- **Neutral Ending**: Survive 12 turns without achieving victory
  
- **Loss Conditions**:
  - **Doom Losses**: Various catastrophic failures based on factor combinations:
    - `AI Capability > 80` and `Alignment Progress < 40`: AI spirals out of control
    - `Public Awareness < 20` and `AI Capability > 60`: Disaster strikes unprepared world
    - `Market Dynamics > 80` and `Governance Structure < 30`: Cutthroat competition triggers crisis
  - **Stagnation Losses**:
    - `GovernanceStructure > 80` and `AICapability < 40`: Overregulation chokes progress
    - `PublicAwareness > 80` and `AlignmentProgress < 40`: Public panic stalls development
    - Other scenarios that prevent your company from thriving

## Development

This game is built with:
- Vite
- TypeScript
- Tailwind CSS

### Running the Game

To run the game locally:

```bash
# Install dependencies
nvm use 18 && npm install

# Start development server
nvm use 18 && npm run dev
```

### Building for Production

```bash
# Build for production
nvm use 18 && npm run build

# Preview production build
nvm use 18 && npm run preview
```

## Credits

Based on the concept of "Survive the AI Future: CEO Edition" from the game design document.

## License

MIT 