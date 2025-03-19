// Game state types
export type Factor = {
  name: string;
  value: number;
  displayName: string;
}

export type GameFactors = {
  // Local factors (company specific)
  FinancialResources: number;
  HumanCapital: number;
  AICapability: number;
  Reputation: number;
  AlignmentProgress: number;
  
  // Global factors (world state)
  MarketDynamics: number;
  PublicAwareness: number;
  GovernanceStructure: number;
}

export type GamePhase = 'Infancy' | 'Growth' | 'Maturity';

export type CardEffect = Partial<GameFactors>;

export type Card = {
  id: string;  // Unique identifier for tracking
  phase?: GamePhase;
  condition: (factors: GameFactors) => boolean;
  scenario: string;
  left: CardEffect;
  right: CardEffect;
  leftSnippet: string;
  rightSnippet: string;
  leftChoice: string;
  rightChoice: string;
}

export type UsedCardTracking = {
  Infancy: string[];
  Growth: string[];
  Maturity: string[];
};

export type GameScreen = 
  | 'start'
  | 'decision'
  | 'event'
  | 'feedback'
  | 'victory'
  | 'doomLoss'
  | 'stagnationLoss'
  | 'neutralEnding';

export type GameState = {
  turn: number;
  factors: GameFactors;
  currentScreen: GameScreen;
  currentCard?: Card;
  currentEvent?: Card;
  lastChoice?: 'left' | 'right';
  snippetText?: string;
  lossReason?: string;
  currentPhase: GamePhase;
  phaseStats: {
    Infancy: number;
    Growth: number;
    Maturity: number;
  };
  usedEventIds: UsedCardTracking;
  usedDecisionIds: UsedCardTracking;
} 