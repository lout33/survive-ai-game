import { GameState, GameFactors, Card, CardEffect, GamePhase, UsedCardTracking } from './types';
import { cards, eventCards, checkDoom, checkStagnation, initialFactors, determinePhase, checkVictory } from './gameData';

// Initialize a new game state
export function initializeGame(): GameState {
  return {
    turn: 1,
    factors: { ...initialFactors },
    currentScreen: 'start',
    currentPhase: 'Infancy',
    phaseStats: {
      Infancy: 0,
      Growth: 0,
      Maturity: 0
    },
    usedEventIds: {
      Infancy: [],
      Growth: [],
      Maturity: []
    },
    usedDecisionIds: {
      Infancy: [],
      Growth: [],
      Maturity: []
    }
  };
}

// Get available cards based on current conditions, phase, and used cards tracking
export function getAvailableCards(
  cardList: Card[], 
  factors: GameFactors, 
  phase: GamePhase, 
  usedIds: string[]
): Card[] {
  // Get all cards matching the phase and condition
  const eligible = cardList.filter(card => 
    (!card.phase || card.phase === phase) && 
    card.condition(factors)
  );
  
  // First, try to find cards that haven't been used yet
  const unused = eligible.filter(card => !usedIds.includes(card.id));
  
  // If there are unused cards, return them
  if (unused.length > 0) {
    return unused;
  }
  
  // If all eligible cards have been used, return all eligible cards
  // (effectively resetting the deck when all cards have been seen)
  return eligible;
}

// Select a random card from available cards and track it as used
export function selectRandomCard(
  availableCards: Card[], 
  phase: GamePhase, 
  usedIds: UsedCardTracking
): Card | undefined {
  if (availableCards.length === 0) {
    return undefined;
  }
  
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  const selectedCard = availableCards[randomIndex];
  
  // Add card ID to used list
  if (selectedCard && !usedIds[phase].includes(selectedCard.id)) {
    usedIds[phase].push(selectedCard.id);
  }
  
  return selectedCard;
}

// Apply feedback loops based on factor interactions
export function applyFeedbackLoops(factors: GameFactors): GameFactors {
  const newFactors = { ...factors };
  
  // Public Awareness affects Governance Structure
  if (newFactors.PublicAwareness > 70) {
    newFactors.GovernanceStructure += 5;
  }
  
  // AI Capability and Alignment Progress affect Reputation
  if (newFactors.AICapability > 70 && newFactors.AlignmentProgress < 50) {
    newFactors.Reputation -= 10;
  }
  
  // Human Capital affects AI Capability
  if (newFactors.HumanCapital > 60) {
    newFactors.AICapability += 5;
  }
  
  // Financial Resources affect Human Capital
  if (newFactors.FinancialResources < 20) {
    newFactors.HumanCapital -= 5;
  }
  
  // Reputation affects Financial Resources
  if (newFactors.Reputation > 70) {
    newFactors.FinancialResources += 5;
  }
  
  // Market Dynamics affects AI Capability
  if (newFactors.MarketDynamics > 60) {
    newFactors.AICapability += 3;
  }
  
  // Governance Structure and Alignment Progress affect Reputation
  if (newFactors.GovernanceStructure > 70 && newFactors.AlignmentProgress < 40) {
    newFactors.Reputation -= 5;
  }
  
  return newFactors;
}

// Update factors based on choice effects, clamping values between 0-100
export function updateFactors(factors: GameFactors, effects: CardEffect): GameFactors {
  const newFactors = { ...factors };
  
  Object.entries(effects).forEach(([key, value]) => {
    if (key in newFactors && typeof value === 'number') {
      const factorKey = key as keyof GameFactors;
      newFactors[factorKey] += value;
    }
  });
  
  // Apply feedback loops
  const factorsWithFeedback = applyFeedbackLoops(newFactors);
  
  // Clamp all values between 0-100
  Object.keys(factorsWithFeedback).forEach(key => {
    const factorKey = key as keyof GameFactors;
    factorsWithFeedback[factorKey] = Math.max(0, Math.min(100, factorsWithFeedback[factorKey]));
  });
  
  return factorsWithFeedback;
}

// Check for any loss conditions
export function checkLossConditions(factors: GameFactors): [boolean, string, GameState['currentScreen']] {
  // Check for doom loss
  const [isDoom, doomReason] = checkDoom(factors);
  if (isDoom) {
    return [true, doomReason, 'doomLoss'];
  }
  
  // Check for other stagnation conditions
  const [isStagnation, stagnationReason] = checkStagnation(factors);
  if (isStagnation) {
    return [true, stagnationReason, 'stagnationLoss'];
  }
  
  return [false, '', 'decision'];
}

// Make a choice and update game state
export function makeChoice(gameState: GameState, choice: 'left' | 'right'): GameState {
  const { factors, currentCard } = gameState;
  
  if (!currentCard) {
    return gameState;
  }
  
  // Get effects and snippet based on choice
  const effects = choice === 'left' ? currentCard.left : currentCard.right;
  const snippetText = choice === 'left' ? currentCard.leftSnippet : currentCard.rightSnippet;
  
  // Update factors based on choice
  const newFactors = updateFactors(factors, effects);
  
  // Create new game state - stay on decision screen but store feedback
  return {
    ...gameState,
    factors: newFactors,
    lastChoice: choice,
    snippetText
  };
}

// Proceed to next turn or end game
export function proceedToNextTurn(gameState: GameState): GameState {
  const { factors, turn, phaseStats, usedEventIds, usedDecisionIds } = gameState;
  
  // Determine the current phase based on turn number
  const currentPhase = determinePhase(turn + 1); // Use next turn to determine phase
  
  // Update phase stats
  const newPhaseStats = { ...phaseStats };
  newPhaseStats[currentPhase] += 1;
  
  // Check for victory (completed 12 turns with victory conditions)
  if (turn >= 12) {
    if (checkVictory(factors, turn)) {
      return {
        ...gameState,
        currentScreen: 'victory',
        currentPhase
      };
    } else {
      return {
        ...gameState,
        currentScreen: 'neutralEnding',
        currentPhase
      };
    }
  }
  
  // Check for loss conditions
  const [isLoss, lossReason, lossScreen] = checkLossConditions(factors);
  if (isLoss) {
    return {
      ...gameState,
      currentScreen: lossScreen,
      lossReason,
      currentPhase
    };
  }
  
  // Get available event cards for the phase
  const availableEvents = getAvailableCards(
    eventCards, 
    factors, 
    currentPhase, 
    usedEventIds[currentPhase]
  );
  
  // Select a random event
  const randomEvent = selectRandomCard(availableEvents, currentPhase, usedEventIds);
  
  // Apply event effects if any
  let factorsAfterEvent = { ...factors };
  let eventCard = null;
  
  if (randomEvent) {
    factorsAfterEvent = updateFactors(factors, randomEvent.left);
    eventCard = randomEvent;
  }
  
  // Get available decision cards for the next turn
  const availableDecisions = getAvailableCards(
    cards, 
    factorsAfterEvent, 
    currentPhase, 
    usedDecisionIds[currentPhase]
  );
  
  const nextCard = selectRandomCard(availableDecisions, currentPhase, usedDecisionIds);
  
  // If no cards available, trigger stagnation loss
  if (!nextCard) {
    return {
      ...gameState,
      currentScreen: 'stagnationLoss',
      lossReason: 'No decisions remain. The future stagnates.',
      currentPhase
    };
  }
  
  // If we have an event, show event screen first, otherwise go straight to decision
  if (eventCard) {
    return {
      ...gameState,
      turn: turn + 1,
      factors: factorsAfterEvent,
      currentCard: nextCard,
      currentScreen: 'event', // New screen type for events
      currentEvent: eventCard, // Store the event card
      currentPhase,
      phaseStats: newPhaseStats
    };
  }
  
  // Continue to next turn without event
  return {
    ...gameState,
    turn: turn + 1,
    factors: factorsAfterEvent,
    currentCard: nextCard,
    currentScreen: 'decision',
    currentPhase,
    phaseStats: newPhaseStats
  };
}

// Start the game from start screen
export function startGame(): GameState {
  const gameState = initializeGame();
  const currentPhase = determinePhase(gameState.turn);
  const availableCards = getAvailableCards(
    cards, 
    gameState.factors, 
    currentPhase, 
    gameState.usedDecisionIds[currentPhase]
  );
  
  const firstCard = selectRandomCard(availableCards, currentPhase, gameState.usedDecisionIds);
  
  if (!firstCard) {
    // This should never happen with the initial factors, but handling edge case
    return {
      ...gameState,
      currentScreen: 'stagnationLoss',
      lossReason: 'No decisions remain. The future stagnates.',
      currentPhase
    };
  }
  
  return {
    ...gameState,
    currentCard: firstCard,
    currentScreen: 'decision',
    currentPhase,
    phaseStats: {
      ...gameState.phaseStats,
      [currentPhase]: 1
    }
  };
} 