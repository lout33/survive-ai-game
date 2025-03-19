import { Card, GameFactors, GamePhase } from './types';

// Initial factors state
export const initialFactors: GameFactors = {
  // Local factors
  FinancialResources: 50,
  HumanCapital: 50,
  AICapability: 40,
  Reputation: 50,
  AlignmentProgress: 30,
  
  // Global factors
  MarketDynamics: 50,
  PublicAwareness: 30,
  GovernanceStructure: 50
};

// Determine the current game phase based on turn number
export function determinePhase(turn: number): GamePhase {
  if (turn <= 4) {
    return 'Infancy';
  } else if (turn <= 8) {
    return 'Growth';
  } else {
    return 'Maturity';
  }
}

// Define event cards
export const eventCards: Card[] = [
  // INFANCY PHASE EVENTS
  {
    id: "infancy_event_1",
    phase: 'Infancy',
    condition: (_factors: GameFactors) => true,
    scenario: "A rival startup announces a breakthrough.",
    left: { AICapability: -5, MarketDynamics: 5 },
    right: { FinancialResources: -10, AICapability: 10 },
    leftSnippet: "Your team feels the pressure to catch up.",
    rightSnippet: "You invest in catching up, costly but effective.",
    leftChoice: "Ignore it for now",
    rightChoice: "Accelerate your research"
  },
  {
    id: "infancy_event_2",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.FinancialResources < 30,
    scenario: "Investors are getting nervous about your progress.",
    left: { FinancialResources: -10, Reputation: -5 },
    right: { AICapability: 10, FinancialResources: -5 },
    leftSnippet: "Funding is tighter than expected as investors pull back.",
    rightSnippet: "A quick demo impresses investors despite the cost.",
    leftChoice: "Delay your next funding round",
    rightChoice: "Rush a demo to show progress"
  },
  {
    id: "infancy_event_3",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.HumanCapital > 40,
    scenario: "Your lead developer quits unexpectedly.",
    left: { HumanCapital: -10, AICapability: -5 },
    right: { HumanCapital: -10, AICapability: -5 },
    leftSnippet: "The loss slows your progress.",
    rightSnippet: "The loss slows your progress.",
    leftChoice: "Accept it",
    rightChoice: "Accept it"
  },
  {
    id: "infancy_event_4",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.Reputation > 30,
    scenario: "An angel investor shows interest.",
    left: { FinancialResources: 15 },
    right: { FinancialResources: 15 },
    leftSnippet: "A cash infusion boosts your startup.",
    rightSnippet: "A cash infusion boosts your startup.",
    leftChoice: "Accept funding",
    rightChoice: "Accept funding"
  },
  {
    id: "infancy_event_5",
    phase: 'Infancy',
    condition: (_factors: GameFactors) => true,
    scenario: "A technical breakthrough speeds development.",
    left: { AICapability: 10 },
    right: { AICapability: 10 },
    leftSnippet: "Your tech takes a leap forward.",
    rightSnippet: "Your tech takes a leap forward.",
    leftChoice: "Implement breakthrough",
    rightChoice: "Implement breakthrough"
  },
  
  // GROWTH PHASE EVENTS
  {
    id: "growth_event_1",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.MarketDynamics > 50,
    scenario: "A major tech company enters your niche.",
    left: { MarketDynamics: -10 },
    right: { MarketDynamics: -10 },
    leftSnippet: "Competition heats up.",
    rightSnippet: "Competition heats up.",
    leftChoice: "Adapt to changes",
    rightChoice: "Adapt to changes"
  },
  {
    id: "growth_event_2",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.AICapability > 60,
    scenario: "Your AI passes a key benchmark.",
    left: { Reputation: 10, AICapability: 5 },
    right: { Reputation: 10, AICapability: 5 },
    leftSnippet: "Industry takes notice.",
    rightSnippet: "Industry takes notice.",
    leftChoice: "Celebrate success",
    rightChoice: "Celebrate success"
  },
  {
    id: "growth_event_3",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.HumanCapital > 50,
    scenario: "Employee burnout causes turnover.",
    left: { HumanCapital: -10 },
    right: { HumanCapital: -10 },
    leftSnippet: "Overwork takes its toll.",
    rightSnippet: "Overwork takes its toll.",
    leftChoice: "Address issues",
    rightChoice: "Address issues"
  },
  {
    id: "growth_event_4",
    phase: 'Growth',
    condition: (_factors: GameFactors) => true,
    scenario: "A funding round closes successfully.",
    left: { FinancialResources: 20 },
    right: { FinancialResources: 20 },
    leftSnippet: "Investors back your vision.",
    rightSnippet: "Investors back your vision.",
    leftChoice: "Allocate funds",
    rightChoice: "Allocate funds"
  },
  {
    id: "growth_event_5",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.Reputation > 60,
    scenario: "Featured in a tech blog.",
    left: { Reputation: 10, PublicAwareness: 5 },
    right: { Reputation: 10, PublicAwareness: 5 },
    leftSnippet: "Publicity grows.",
    rightSnippet: "Publicity grows.",
    leftChoice: "Leverage exposure",
    rightChoice: "Leverage exposure"
  },
  
  // MATURITY PHASE EVENTS
  {
    id: "maturity_event_1",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.Reputation > 60,
    scenario: "A Fortune 500 company adopts your AI.",
    left: { Reputation: 10, MarketDynamics: 10 },
    right: { Reputation: 10, MarketDynamics: 10 },
    leftSnippet: "Your dominance grows.",
    rightSnippet: "Your dominance grows.",
    leftChoice: "Strengthen partnership",
    rightChoice: "Strengthen partnership"
  },
  {
    id: "maturity_event_2",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.AlignmentProgress < 50,
    scenario: "A data breach erodes trust.",
    left: { Reputation: -15, FinancialResources: -10 },
    right: { Reputation: -15, FinancialResources: -10 },
    leftSnippet: "Security flaws cost you.",
    rightSnippet: "Security flaws cost you.",
    leftChoice: "Manage the crisis",
    rightChoice: "Manage the crisis"
  },
  {
    id: "maturity_event_3",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.GovernanceStructure > 60,
    scenario: "New AI regulations pass.",
    left: { FinancialResources: -15, AlignmentProgress: 10 },
    right: { FinancialResources: -15, AlignmentProgress: 10 },
    leftSnippet: "Compliance is expensive but safe.",
    rightSnippet: "Compliance is expensive but safe.",
    leftChoice: "Implement changes",
    rightChoice: "Implement changes"
  },
  {
    id: "maturity_event_4",
    phase: 'Maturity',
    condition: (_factors: GameFactors) => true,
    scenario: "Nominated for an innovation award.",
    left: { Reputation: 10 },
    right: { Reputation: 10 },
    leftSnippet: "Your work is celebrated.",
    rightSnippet: "Your work is celebrated.",
    leftChoice: "Accept nomination",
    rightChoice: "Accept nomination"
  },
  {
    id: "maturity_event_5",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.AICapability > 70,
    scenario: "A key patent is granted.",
    left: { AICapability: 5, MarketDynamics: 10 },
    right: { AICapability: 5, MarketDynamics: 10 },
    leftSnippet: "Your tech is secured.",
    rightSnippet: "Your tech is secured.",
    leftChoice: "Leverage patent",
    rightChoice: "Leverage patent"
  }
];

// Define decision cards
export const cards: Card[] = [
  // INFANCY PHASE DECISIONS
  {
    id: "infancy_decision_1",
    phase: 'Infancy',
    condition: (_factors: GameFactors) => true,
    scenario: "Choose CTO: technical genius or manager?",
    left: { AICapability: 15, HumanCapital: -5 },
    right: { HumanCapital: 10, AICapability: 5 },
    leftSnippet: "Tech soars, team struggles.",
    rightSnippet: "Team thrives, tech grows steadily.",
    leftChoice: "Technical genius",
    rightChoice: "Experienced manager"
  },
  {
    id: "infancy_decision_2",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.Reputation > 30,
    scenario: "Open-source AI or keep it proprietary?",
    left: { Reputation: 10, PublicAwareness: 5, FinancialResources: -10 },
    right: { FinancialResources: 15, Reputation: -5 },
    leftSnippet: "Community loves it, profits dip.",
    rightSnippet: "Revenue grows, trust dips.",
    leftChoice: "Open-source",
    rightChoice: "Proprietary"
  },
  {
    id: "infancy_decision_3",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.FinancialResources > 40,
    scenario: "Invest in marketing or R&D?",
    left: { FinancialResources: -20, Reputation: 15 },
    right: { FinancialResources: -20, AICapability: 10 },
    leftSnippet: "Marketing boosts your public image.",
    rightSnippet: "R&D advances your technology.",
    leftChoice: "Focus on marketing",
    rightChoice: "Prioritize R&D"
  },
  {
    id: "infancy_decision_4",
    phase: 'Infancy',
    condition: (_factors: GameFactors) => true,
    scenario: "Focus on safety or speed?",
    left: { AlignmentProgress: 10, AICapability: 5 },
    right: { AICapability: 15, AlignmentProgress: -5 },
    leftSnippet: "Safety first, but progress is slower.",
    rightSnippet: "Rapid development, but risks increase.",
    leftChoice: "Prioritize safety",
    rightChoice: "Move fast"
  },
  {
    id: "infancy_decision_5",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.Reputation < 40,
    scenario: "Address public concerns or ignore them?",
    left: { Reputation: 10, PublicAwareness: 5 },
    right: { FinancialResources: 10, Reputation: -5 },
    leftSnippet: "Engaging with the public improves trust.",
    rightSnippet: "Ignoring concerns saves money but damages reputation.",
    leftChoice: "Engage with the public",
    rightChoice: "Focus on product"
  },
  {
    id: "infancy_decision_6",
    phase: 'Infancy',
    condition: (_factors: GameFactors) => true,
    scenario: "Join an accelerator or go solo?",
    left: { HumanCapital: 10, Reputation: 5, FinancialResources: -10 },
    right: { FinancialResources: 5, AICapability: 5 },
    leftSnippet: "Mentors help, but it costs.",
    rightSnippet: "Slow and steady progress.",
    leftChoice: "Join accelerator",
    rightChoice: "Go solo"
  },
  {
    id: "infancy_decision_7",
    phase: 'Infancy',
    condition: (factors: GameFactors) => factors.MarketDynamics < 50,
    scenario: "Target niche or broad market?",
    left: { MarketDynamics: 10, Reputation: -5 },
    right: { Reputation: 10, MarketDynamics: -5 },
    leftSnippet: "Niche success, less fame.",
    rightSnippet: "Broader appeal, less focus.",
    leftChoice: "Focus on niche",
    rightChoice: "Target broad market"
  },
  
  // GROWTH PHASE DECISIONS
  {
    id: "growth_decision_1",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.MarketDynamics > 50,
    scenario: "A new market opportunity emerges.",
    left: { FinancialResources: 10, MarketDynamics: 5 },
    right: { AICapability: 10, HumanCapital: 5 },
    leftSnippet: "Your company capitalizes on the opportunity.",
    rightSnippet: "You focus on strengthening your core technology.",
    leftChoice: "Pursue the opportunity",
    rightChoice: "Focus on core technology"
  },
  {
    id: "growth_decision_2",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.Reputation < 40,
    scenario: "A whistleblower leaks internal documents.",
    left: { Reputation: -10, PublicAwareness: 10 },
    right: { FinancialResources: -10, Reputation: 5, PublicAwareness: 5 },
    leftSnippet: "The scandal damages your image.",
    rightSnippet: "Your transparency costs money but helps rebuild trust.",
    leftChoice: "Deny the allegations",
    rightChoice: "Address concerns transparently"
  },
  {
    id: "growth_decision_3",
    phase: 'Growth',
    condition: (_factors: GameFactors) => true,
    scenario: "An AI conference boosts industry knowledge.",
    left: { AICapability: 5, AlignmentProgress: 5, HumanCapital: 5 },
    right: { FinancialResources: 10, Reputation: 5 },
    leftSnippet: "Your team learns from the best and applies new knowledge.",
    rightSnippet: "Instead of attending, you secure a new contract.",
    leftChoice: "Send your team to attend",
    rightChoice: "Focus on business instead"
  },
  {
    id: "growth_decision_4",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.FinancialResources > 50,
    scenario: "Expand to a new region or consolidate?",
    left: { FinancialResources: -30, MarketDynamics: 15 },
    right: { HumanCapital: 10, Reputation: 5 },
    leftSnippet: "Expansion increases market share but is costly.",
    rightSnippet: "Consolidation strengthens your core.",
    leftChoice: "Expand aggressively",
    rightChoice: "Strengthen your foundation"
  },
  {
    id: "growth_decision_5",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.AICapability > 60,
    scenario: "Deploy AI in a high-stakes project?",
    left: { AICapability: 10, Reputation: 15, AlignmentProgress: -5 },
    right: { AlignmentProgress: 10, AICapability: 5 },
    leftSnippet: "The project succeeds, but safety concerns linger.",
    rightSnippet: "You improve alignment, but progress slows.",
    leftChoice: "Deploy immediately",
    rightChoice: "Test extensively first"
  },
  {
    id: "growth_decision_6",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.MarketDynamics < 50,
    scenario: "Pivot to a new market or stay put?",
    left: { MarketDynamics: 15, FinancialResources: -20 },
    right: { Reputation: 10 },
    leftSnippet: "Risky pivot pays off.",
    rightSnippet: "Stability builds trust.",
    leftChoice: "Pivot to new market",
    rightChoice: "Stay in current market"
  },
  {
    id: "growth_decision_7",
    phase: 'Growth',
    condition: (factors: GameFactors) => factors.AlignmentProgress < 50,
    scenario: "Strict governance or innovation?",
    left: { GovernanceStructure: 10, AlignmentProgress: 10, AICapability: -5 },
    right: { AICapability: 15, AlignmentProgress: -5 },
    leftSnippet: "Safety improves, pace slows.",
    rightSnippet: "Tech leaps, risks rise.",
    leftChoice: "Implement strict governance",
    rightChoice: "Prioritize innovation"
  },
  
  // MATURITY PHASE DECISIONS
  {
    id: "maturity_decision_1",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.GovernanceStructure > 60,
    scenario: "New AI regulations are imposed.",
    left: { FinancialResources: -10, AlignmentProgress: 5 },
    right: { Reputation: -10, AICapability: 10 },
    leftSnippet: "Compliance costs rise, but safety improves.",
    rightSnippet: "Your workarounds maintain progress but risk backlash.",
    leftChoice: "Comply fully",
    rightChoice: "Find regulatory workarounds"
  },
  {
    id: "maturity_decision_2",
    phase: 'Maturity',
    condition: (_factors: GameFactors) => true,
    scenario: "Your AI sets an industry standard.",
    left: { Reputation: 10, MarketDynamics: 5, FinancialResources: 5 },
    right: { AICapability: 15, FinancialResources: 10 },
    leftSnippet: "Your leadership is recognized, enhancing your influence.",
    rightSnippet: "You build on your advantage with new innovations.",
    leftChoice: "Promote your standard",
    rightChoice: "Develop next-gen technology"
  },
  {
    id: "maturity_decision_3",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.Reputation > 60,
    scenario: "Lobby for regulations or focus inward?",
    left: { GovernanceStructure: 10, PublicAwareness: 5, FinancialResources: -5 },
    right: { AICapability: 10, FinancialResources: 5 },
    leftSnippet: "Shaping policy enhances your influence but costs money.",
    rightSnippet: "Internal focus drives innovation and profit.",
    leftChoice: "Shape the regulatory landscape",
    rightChoice: "Focus on advancing technology"
  },
  {
    id: "maturity_decision_4",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.GovernanceStructure < 60,
    scenario: "Lobby for regulations or self-regulate?",
    left: { GovernanceStructure: 10, PublicAwareness: 5, FinancialResources: -10 },
    right: { AlignmentProgress: 10, Reputation: -5 },
    leftSnippet: "Policy shapes the future.",
    rightSnippet: "Ethics improve internally.",
    leftChoice: "Lobby for regulation",
    rightChoice: "Self-regulate"
  },
  {
    id: "maturity_decision_5",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.FinancialResources > 60,
    scenario: "Acquire a startup or build an innovation lab?",
    left: { AICapability: 10, MarketDynamics: 10, FinancialResources: -20 },
    right: { AICapability: 10, Reputation: 5 },
    leftSnippet: "Acquisition expands reach.",
    rightSnippet: "Lab fosters breakthroughs.",
    leftChoice: "Acquire startup",
    rightChoice: "Build innovation lab"
  },
  {
    id: "maturity_decision_6",
    phase: 'Maturity',
    condition: (_factors: GameFactors) => true,
    scenario: "Enhance AI safety or new applications?",
    left: { AlignmentProgress: 15, FinancialResources: -10 },
    right: { MarketDynamics: 10, Reputation: 5, AlignmentProgress: -5 },
    leftSnippet: "Safety is prioritized.",
    rightSnippet: "Expansion excites markets.",
    leftChoice: "Focus on safety",
    rightChoice: "Develop new applications"
  },
  {
    id: "maturity_decision_7",
    phase: 'Maturity',
    condition: (factors: GameFactors) => factors.PublicAwareness < 50,
    scenario: "Fund AI safety research or marketing?",
    left: { AlignmentProgress: 10, PublicAwareness: 10, FinancialResources: -15 },
    right: { Reputation: 10, MarketDynamics: 5, FinancialResources: -10 },
    leftSnippet: "Safety gains attention.",
    rightSnippet: "Brand shines brighter.",
    leftChoice: "Fund safety research",
    rightChoice: "Increase marketing"
  },
  
  // PHASE-INDEPENDENT CARDS
  {
    id: "general_decision_1",
    condition: (_factors: GameFactors) => true,
    scenario: "Your AI cuts costs but sparks ethical backlash.",
    left: { AICapability: 10, PublicAwareness: 10, Reputation: -10 },
    right: { PublicAwareness: 5, AICapability: -5, Reputation: 5 },
    leftSnippet: "Efficiency improves, but the public grows wary.",
    rightSnippet: "You scrap the plan, earning trust at a cost to progress.",
    leftChoice: "Keep the AI system",
    rightChoice: "Scrap the system"
  },
  {
    id: "general_decision_2",
    condition: (factors: GameFactors) => factors.PublicAwareness < 40,
    scenario: "A journalist pitches an exposé on your AI's risks.",
    left: { PublicAwareness: 20, Reputation: 5 },
    right: { PublicAwareness: 10, AlignmentProgress: -5, Reputation: -10 },
    leftSnippet: "The story breaks, igniting public curiosity but you control the narrative.",
    rightSnippet: "You bury it, but whispers of a cover-up spread.",
    leftChoice: "Cooperate with the journalist",
    rightChoice: "Suppress the story"
  },
  {
    id: "general_decision_3",
    condition: (factors: GameFactors) => factors.GovernanceStructure > 60,
    scenario: "Bureaucratic delays threaten your latest project.",
    left: { GovernanceStructure: -10, AICapability: 5 },
    right: { GovernanceStructure: 10, AICapability: -10 },
    leftSnippet: "You bypass the red tape, but regulators take note.",
    rightSnippet: "Compliance drags your timeline back.",
    leftChoice: "Bypass regulations",
    rightChoice: "Comply with regulations"
  },
  {
    id: "general_decision_4",
    condition: (factors: GameFactors) => factors.MarketDynamics < 40,
    scenario: "A rival offers a merger to dominate the market.",
    left: { MarketDynamics: 15, AICapability: 10, Reputation: -5 },
    right: { MarketDynamics: 10, AlignmentProgress: 5 },
    leftSnippet: "The merger boosts your tech, but some criticize the consolidation.",
    rightSnippet: "You decline, keeping the market competitive and earning respect.",
    leftChoice: "Accept the merger",
    rightChoice: "Decline the merger"
  }
];

// Victory and loss conditions
export function checkDoom(factors: GameFactors): [boolean, string] {
  if (factors.AICapability > 80 && factors.AlignmentProgress < 40) {
    return [true, "Your AI spirals out of control, unleashing chaos."];
  }
  if (factors.PublicAwareness < 20 && factors.AICapability > 60) {
    return [true, "A disaster strikes an unprepared world."];
  }
  if (factors.MarketDynamics > 80 && factors.GovernanceStructure < 30) {
    return [true, "Cutthroat competition triggers a global crisis."];
  }
  // New doom conditions
  if (factors.FinancialResources < 10) {
    return [true, "Bankruptcy: Your company runs out of money."];
  }
  if (factors.Reputation < 10) {
    return [true, "Reputation Collapse: Your company is shunned."];
  }
  return [false, ""];
}

export function checkStagnation(factors: GameFactors): [boolean, string] {
  if (factors.GovernanceStructure > 80 && factors.AICapability < 40) {
    return [true, "Overregulation chokes your progress."];
  }
  if (factors.PublicAwareness > 80 && factors.AlignmentProgress < 40) {
    return [true, "Public panic stalls AI development."];
  }
  if (factors.MarketDynamics < 20 && factors.AICapability < 40) {
    return [true, "A stagnant market buries your ambitions."];
  }
  return [false, ""];
}

// New victory conditions function
export function checkVictory(factors: GameFactors, turn: number): boolean {
  return turn >= 12 && 
         factors.AICapability > 70 && 
         factors.AlignmentProgress > 60 && 
         factors.Reputation > 50 && 
         factors.MarketDynamics > 70;
} 