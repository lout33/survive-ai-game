import { GameState, GameFactors } from './types';

// Create factor bar element
export function createFactorBar(name: string, value: number, fullName: string, colorClass?: string, icon?: string): HTMLElement {
  const barContainer = document.createElement('div');
  barContainer.className = 'flex flex-col items-center mb-1 px-1 relative group';
  
  // Create icon placeholder (hidden by default)
  const iconElement = document.createElement('div');
  iconElement.className = 'w-8 h-8 rounded-full flex items-center justify-center mb-1 factor-icon text-white opacity-0 group-hover:opacity-100 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-10 transition-opacity z-10';
  
  // Different colors for different factors
  if (colorClass) {
    iconElement.classList.add(colorClass);
  } else {
    switch(name) {
      case 'AICapability':
        iconElement.classList.add('bg-blue-500');
        break;
      case 'AlignmentProgress':
        iconElement.classList.add('bg-green-500');
        break;
      case 'PublicAwareness':
        iconElement.classList.add('bg-indigo-500');
        break;
      case 'GovernanceStructure':
        iconElement.classList.add('bg-red-500');
        break;
      case 'MarketDynamics':
        iconElement.classList.add('bg-orange-500');
        break;
      default:
        iconElement.classList.add('bg-gray-500');
    }
  }
  
  // Add icon or first letter
  iconElement.textContent = icon || fullName.charAt(0);
  barContainer.appendChild(iconElement);
  
  // Add tiny label (hidden by default)
  const label = document.createElement('span');
  label.className = 'text-xs text-gray-400 text-center mb-1 opacity-0 group-hover:opacity-100 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 transition-opacity z-10 whitespace-nowrap';
  label.textContent = fullName;
  label.title = fullName;
  barContainer.appendChild(label);
  
  // Create vertical progress bar (more prominent)
  const progressBar = document.createElement('div');
  progressBar.className = 'h-24 w-4 bg-gray-700 rounded-full relative vertical-progress';
  
  const progressFill = document.createElement('div');
  progressFill.className = 'w-full rounded-full absolute bottom-0 vertical-progress-fill transition-all duration-500';
  progressFill.style.height = `${value}%`;
  
  // Set color
  if (colorClass) {
    progressFill.classList.add(colorClass);
  } else {
    switch(name) {
      case 'AICapability':
        progressFill.classList.add('bg-blue-500');
        break;
      case 'AlignmentProgress':
        progressFill.classList.add('bg-green-500');
        break;
      case 'PublicAwareness':
        progressFill.classList.add('bg-indigo-500');
        break;
      case 'GovernanceStructure':
        progressFill.classList.add('bg-red-500');
        break;
      case 'MarketDynamics':
        progressFill.classList.add('bg-orange-500');
        break;
      default:
        progressFill.classList.add('bg-gray-500');
    }
  }
  
  progressBar.appendChild(progressFill);
  barContainer.appendChild(progressBar);
  
  // Add value label (visible on hover)
  const valueLabel = document.createElement('span');
  valueLabel.className = 'text-xs mt-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity';
  valueLabel.textContent = value.toString();
  barContainer.appendChild(valueLabel);
  
  return barContainer;
}

// Create factors display
export function createFactorsDisplay(factors: GameFactors): HTMLElement {
  const container = document.createElement('div');
  
  // Main outer container with subtle background
  container.className = 'mb-4 bg-gray-800/50 rounded-lg p-2';
  
  // Factor mappings with display names and emoji icons
  const factorMappings = [
    // Local factors (company specific)
    { name: 'FinancialResources', displayName: 'Finance', colorClass: 'bg-yellow-500', icon: '💰' },
    { name: 'HumanCapital', displayName: 'People', colorClass: 'bg-purple-500', icon: '👥' },
    { name: 'AICapability', displayName: 'AI Tech', colorClass: 'bg-blue-500', icon: '🤖' },
    { name: 'Reputation', displayName: 'Rep', colorClass: 'bg-pink-500', icon: '⭐' },
    { name: 'AlignmentProgress', displayName: 'Align', colorClass: 'bg-green-500', icon: '🔒' },
    
    // Global factors (world state)
    { name: 'MarketDynamics', displayName: 'Market', colorClass: 'bg-orange-500', icon: '📈' },
    { name: 'PublicAwareness', displayName: 'Public', colorClass: 'bg-indigo-500', icon: '👁️' },
    { name: 'GovernanceStructure', displayName: 'Gov', colorClass: 'bg-red-500', icon: '⚖️' }
  ];
  
  // Section titles and divider
  const factorSections = document.createElement('div');
  factorSections.className = 'flex justify-between w-full mb-2 px-2';
  
  const companyTitle = document.createElement('span');
  companyTitle.className = 'text-xs font-semibold text-gray-400';
  companyTitle.textContent = 'COMPANY';
  factorSections.appendChild(companyTitle);
  
  const globalTitle = document.createElement('span');
  globalTitle.className = 'text-xs font-semibold text-gray-400';
  globalTitle.textContent = 'GLOBAL';
  factorSections.appendChild(globalTitle);
  
  container.appendChild(factorSections);
  
  // Main factors container with flex layout
  const factorsContainer = document.createElement('div');
  factorsContainer.className = 'flex justify-between items-end';
  
  // Create two separate groups
  const companyFactors = document.createElement('div');
  companyFactors.className = 'flex justify-around flex-1';
  
  const globalFactors = document.createElement('div');
  globalFactors.className = 'flex justify-around flex-1';
  
  // Add company factors (first 5)
  factorMappings.slice(0, 5).forEach(mapping => {
    const factorName = mapping.name as keyof GameFactors;
    const factorValue = factors[factorName];
    const factorBar = createFactorBar(factorName, factorValue, mapping.displayName, mapping.colorClass, mapping.icon);
    companyFactors.appendChild(factorBar);
  });
  
  // Add global factors (last 3)
  factorMappings.slice(5).forEach(mapping => {
    const factorName = mapping.name as keyof GameFactors;
    const factorValue = factors[factorName];
    const factorBar = createFactorBar(factorName, factorValue, mapping.displayName, mapping.colorClass, mapping.icon);
    globalFactors.appendChild(factorBar);
  });
  
  // Add a divider between the two sections
  const divider = document.createElement('div');
  divider.className = 'h-28 border-l border-gray-600 mx-2';
  
  factorsContainer.appendChild(companyFactors);
  factorsContainer.appendChild(divider);
  factorsContainer.appendChild(globalFactors);
  
  container.appendChild(factorsContainer);
  
  return container;
}

// Create button element
export function createButton(text: string, onClick: () => void, extraClasses = '', disabled = false): HTMLElement {
  const button = document.createElement('button');
  button.className = `btn ${extraClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  button.textContent = text;
  button.disabled = disabled;
  if (!disabled) {
    button.addEventListener('click', onClick);
  }
  return button;
}

// Create card element
export function createCard(content: HTMLElement | string, extraClasses = ''): HTMLElement {
  const card = document.createElement('div');
  card.className = `card ${extraClasses}`;
  
  if (typeof content === 'string') {
    card.textContent = content;
  } else {
    card.appendChild(content);
  }
  
  return card;
}

// Create start screen
export function createStartScreen(onStartGame: () => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-4 py-8';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center';
  
  const welcome = document.createElement('h2');
  welcome.className = 'text-xl md:text-2xl font-bold mb-4';
  welcome.textContent = 'Welcome to Survive the AI Future: CEO Edition';
  content.appendChild(welcome);
  
  const intro = document.createElement('p');
  intro.className = 'mb-4';
  intro.innerHTML = `
    You are the CEO of NEXUS AI, a cutting-edge artificial intelligence 
    company at the forefront of technology. The decisions you make over 
    the next 12 critical turns will determine not just your company's 
    fate, but potentially humanity's future.
  `;
  content.appendChild(intro);
  
  const instructions = document.createElement('p');
  instructions.className = 'mb-4';
  instructions.innerHTML = `
    Make strategic decisions over 12 turns to balance:
    <ul class="list-disc list-inside mb-4">
      <li>Technological advancement</li>
      <li>Safety and ethical alignment</li>
      <li>Public perception</li>
      <li>Regulatory compliance</li>
      <li>Market competition</li>
    </ul>
  `;
  content.appendChild(instructions);
  
  const goal = document.createElement('p');
  goal.className = 'mb-6';
  goal.textContent = `
    Avoid catastrophic "doom" scenarios or debilitating "stagnation" 
    to successfully navigate your company to a thriving AI future.
  `;
  content.appendChild(goal);
  
  const startButton = createButton('Start Game', onStartGame, 'w-full max-w-xs mx-auto');
  content.appendChild(startButton);
  
  container.appendChild(content);
  return container;
}

// Create decision screen
export function createDecisionScreen(
  gameState: GameState, 
  onLeftChoice: () => void, 
  onRightChoice: () => void,
  disabled = false
): HTMLElement {
  const { turn, factors, currentCard, currentPhase } = gameState;
  
  if (!currentCard) {
    return document.createElement('div'); // This shouldn't happen but handling just in case
  }
  
  const container = document.createElement('div');
  container.className = 'flex flex-col min-h-screen p-4 py-8';
  
  const header = document.createElement('div');
  header.className = 'mb-4';
  
  const statusContainer = document.createElement('div');
  statusContainer.className = 'flex justify-between mb-3';
  
  const turnCounter = document.createElement('div');
  turnCounter.textContent = `Turn: ${turn}/12`;
  statusContainer.appendChild(turnCounter);
  
  const phaseDisplay = document.createElement('div');
  phaseDisplay.textContent = `Phase: ${currentPhase}`;
  statusContainer.appendChild(phaseDisplay);
  
  header.appendChild(statusContainer);
  
  // Add factors display
  const factorsDisplay = createFactorsDisplay(factors);
  header.appendChild(factorsDisplay);
  
  container.appendChild(header);
  
  // Decision card
  const cardContent = document.createElement('div');
  cardContent.className = 'flex flex-col h-full';
  
  // Toast notifications will be inserted here dynamically
  
  // Add image below any potential toast notifications
  const cardImage = document.createElement('img');
  cardImage.src = './random-ai-boom.png';
  cardImage.className = 'w-full h-auto mb-6 rounded-lg mx-auto';
  cardImage.alt = 'AI illustration';
  cardImage.style.maxWidth = '400px';
  cardContent.appendChild(cardImage);
  
  const scenario = document.createElement('p');
  scenario.className = 'mb-6 text-lg';
  scenario.textContent = currentCard.scenario;
  cardContent.appendChild(scenario);
  
  const question = document.createElement('p');
  question.className = 'mb-6 font-bold';
  question.textContent = 'What will you do?';
  cardContent.appendChild(question);
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex flex-row gap-4 mt-auto';
  
  const leftButton = createButton(
    currentCard.leftChoice, 
    onLeftChoice, 
    'flex-1',
    disabled
  );
  buttonContainer.appendChild(leftButton);
  
  const rightButton = createButton(
    currentCard.rightChoice, 
    onRightChoice, 
    'flex-1',
    disabled
  );
  buttonContainer.appendChild(rightButton);
  
  cardContent.appendChild(buttonContainer);
  
  const decisionCard = createCard(cardContent, 'flex-grow mb-4');
  container.appendChild(decisionCard);
  
  return container;
}

// Create victory screen
export function createVictoryScreen(onPlayAgain: () => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center';
  
  const victoryTitle = document.createElement('h2');
  victoryTitle.className = 'text-xl md:text-2xl font-bold mb-4 text-green-500';
  victoryTitle.textContent = 'VICTORY';
  content.appendChild(victoryTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-4';
  mainMessage.textContent = "You've steered your company to a thriving AI future!";
  content.appendChild(mainMessage);
  
  const description = document.createElement('p');
  description.className = 'mb-4';
  description.innerHTML = `
    You survived all 12 turns as CEO and successfully navigated the
    complexities of AI development. Under your leadership, the company
    has balanced innovation with responsibility, creating powerful
    technology that benefits humanity.
    <br><br>
    Your decisions maintained the delicate balance between advancing
    capabilities, ensuring safety, managing public perception,
    navigating regulations, and thriving in a competitive market.
    <br><br>
    History will remember you as a visionary who helped shape a
    positive AI future.
  `;
  content.appendChild(description);
  
  const playAgainButton = createButton('Play Again', onPlayAgain, 'w-full max-w-xs mx-auto mt-6');
  content.appendChild(playAgainButton);
  
  container.appendChild(content);
  return container;
}

// Create doom loss screen
export function createDoomLossScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const { lossReason } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center';
  
  const lossTitle = document.createElement('h2');
  lossTitle.className = 'text-xl md:text-2xl font-bold mb-4 text-red-500';
  lossTitle.textContent = 'DOOM LOSS';
  content.appendChild(lossTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-4';
  mainMessage.textContent = lossReason || "Your AI spirals out of control, unleashing chaos.";
  content.appendChild(mainMessage);
  
  const description = document.createElement('p');
  description.className = 'mb-4';
  description.innerHTML = `
    Your decisions led to advanced AI capabilities without sufficient
    safety measures. What began as occasional anomalies in the system
    quickly escalated to a crisis beyond your team's ability to contain.
    <br><br>
    As your AI gained access to critical infrastructure through
    vulnerabilities you hadn't addressed, governments worldwide
    declared a state of emergency.
    <br><br>
    The world will remember your company as the catalyst for
    humanity's darkest chapter.
  `;
  content.appendChild(description);
  
  const playAgainButton = createButton('Play Again', onPlayAgain, 'w-full max-w-xs mx-auto mt-6');
  content.appendChild(playAgainButton);
  
  container.appendChild(content);
  return container;
}

// Create stagnation loss screen
export function createStagnationLossScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const { lossReason } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-screen p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center';
  
  const lossTitle = document.createElement('h2');
  lossTitle.className = 'text-xl md:text-2xl font-bold mb-4 text-yellow-500';
  lossTitle.textContent = 'STAGNATION LOSS';
  content.appendChild(lossTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-4';
  mainMessage.textContent = lossReason || "Overregulation chokes your progress.";
  content.appendChild(mainMessage);
  
  const description = document.createElement('p');
  description.className = 'mb-4';
  description.innerHTML = `
    Your company has become entangled in a web of restrictions and
    compliance requirements. Innovation has slowed to a crawl as your
    engineers spend more time filling out paperwork than coding.
    <br><br>
    Meanwhile, less cautious competitors in regions with lighter
    regulation have surged ahead. Your board of directors has lost
    confidence in your leadership and called for your resignation.
    <br><br>
    Your vision for responsible AI development has been buried under
    bureaucratic red tape.
  `;
  content.appendChild(description);
  
  const playAgainButton = createButton('Play Again', onPlayAgain, 'w-full max-w-xs mx-auto mt-6');
  content.appendChild(playAgainButton);
  
  container.appendChild(content);
  return container;
}

// Create neutral ending screen
export function createNeutralEndingScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'h-screen flex flex-col items-center justify-center p-4 bg-gray-900 text-white';
  
  const card = document.createElement('div');
  card.className = 'bg-gray-800 rounded-lg p-8 max-w-lg w-full mx-auto text-center shadow-lg';
  
  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-yellow-400';
  title.textContent = 'Your Journey Continues...';
  card.appendChild(title);
  
  const message = document.createElement('p');
  message.className = 'text-lg mb-8';
  message.textContent = 'You survived 12 turns, but your company\'s future remains uncertain. While you avoided catastrophe, you haven\'t quite achieved a thriving AI future.';
  card.appendChild(message);
  
  const details = document.createElement('div');
  details.className = 'mb-8 text-left p-4 bg-gray-700 rounded';
  
  const phaseInfo = document.createElement('p');
  phaseInfo.className = 'mb-4';
  phaseInfo.textContent = `You ended in the ${gameState.currentPhase} phase.`;
  details.appendChild(phaseInfo);
  
  const factorsTitle = document.createElement('p');
  factorsTitle.className = 'font-bold mb-2';
  factorsTitle.textContent = 'Final State:';
  details.appendChild(factorsTitle);
  
  const factorsList = document.createElement('ul');
  factorsList.className = 'list-disc ml-5';
  
  // Add factor summaries
  if (gameState.factors.AICapability > 70) {
    const item = document.createElement('li');
    item.textContent = 'Your AI technology is highly advanced.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.AlignmentProgress < 50) {
    const item = document.createElement('li');
    item.textContent = 'Your safety measures need improvement.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.Reputation > 60) {
    const item = document.createElement('li');
    item.textContent = 'Your company is well-regarded.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.FinancialResources > 70) {
    const item = document.createElement('li');
    item.textContent = 'Your financial position is strong.';
    factorsList.appendChild(item);
  }
  
  details.appendChild(factorsList);
  card.appendChild(details);
  
  const button = createButton('Play Again', onPlayAgain, 'mt-4 w-full');
  card.appendChild(button);
  
  container.appendChild(card);
  return container;
}

// Create game info modal
export function createGameInfoModal(onClose: () => void): HTMLElement {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
  
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800 rounded-lg p-8 max-w-3xl w-full mx-auto text-white max-h-[80vh] overflow-y-auto';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold';
  closeButton.textContent = '×';
  closeButton.addEventListener('click', onClose);
  modal.appendChild(closeButton);
  
  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-4 text-blue-400';
  title.textContent = 'Game Mechanics';
  modal.appendChild(title);
  
  const content = document.createElement('div');
  content.className = 'space-y-6';
  
  // Game Overview
  const overviewSection = document.createElement('div');
  const overviewTitle = document.createElement('h3');
  overviewTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  overviewTitle.textContent = 'Game Overview';
  overviewSection.appendChild(overviewTitle);
  
  const overviewText = document.createElement('p');
  overviewText.innerHTML = `
    You are the CEO of an AI company navigating through three phases—<b>Infancy</b>, <b>Growth</b>, and <b>Maturity</b>—over 12 turns. 
    Your goal is to manage various factors while avoiding catastrophic failures or stagnation.
  `;
  overviewSection.appendChild(overviewText);
  content.appendChild(overviewSection);
  
  // Phases
  const phasesSection = document.createElement('div');
  const phasesTitle = document.createElement('h3');
  phasesTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  phasesTitle.textContent = 'Game Phases';
  phasesSection.appendChild(phasesTitle);
  
  const phasesText = document.createElement('p');
  phasesText.innerHTML = `
    <b>Infancy:</b> Turns 1-4 - Establishing your company. <br>
    <b>Growth:</b> Turns 5-8 - Scaling operations and influence. <br>
    <b>Maturity:</b> Turns 9-12 - Solidifying your position in the world. <br><br>
    <i>Each phase features its own set of events and decisions.</i>
  `;
  phasesSection.appendChild(phasesText);
  content.appendChild(phasesSection);
  
  // Events & Decisions
  const eventSection = document.createElement('div');
  const eventTitle = document.createElement('h3');
  eventTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  eventTitle.textContent = 'Events & Decisions';
  eventSection.appendChild(eventTitle);
  
  const eventText = document.createElement('p');
  eventText.innerHTML = `
    Each turn includes:
    <ul class="list-disc list-inside mb-2">
      <li>Random Events that affect your company</li>
      <li>Critical Decisions you must make</li>
    </ul>
    
    <b>Card Variety:</b> The game tracks which cards you've seen to prevent repeats.
    Cards are specific to each phase, with new ones unlocking as you progress.
    Only when all available cards for your current phase have been seen will
    they start repeating.
  `;
  eventSection.appendChild(eventText);
  content.appendChild(eventSection);
  
  // Factors
  const factorsSection = document.createElement('div');
  const factorsTitle = document.createElement('h3');
  factorsTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  factorsTitle.textContent = 'Game Factors';
  factorsSection.appendChild(factorsTitle);
  
  const factorsText = document.createElement('p');
  factorsText.innerHTML = `
    <b>Local Factors (company-specific):</b> <br>
    - <span class="text-yellow-400">Financial Resources</span>: Your company's budget <br>
    - <span class="text-purple-400">Human Capital</span>: The quality of your workforce <br>
    - <span class="text-blue-400">AI Capability</span>: The advancement level of your AI technology <br>
    - <span class="text-pink-400">Reputation</span>: Public and stakeholder perception <br>
    - <span class="text-green-400">Alignment Progress</span>: How well your AI aligns with safety standards <br><br>
    
    <b>Global Factors (world state):</b> <br>
    - <span class="text-orange-400">Market Dynamics</span>: The state of competition and opportunities <br>
    - <span class="text-indigo-400">Public Awareness</span>: Public knowledge about AI issues <br>
    - <span class="text-red-400">Governance Structure</span>: The regulatory environment <br>
  `;
  factorsSection.appendChild(factorsText);
  content.appendChild(factorsSection);
  
  // Feedback Loops
  const feedbackSection = document.createElement('div');
  const feedbackTitle = document.createElement('h3');
  feedbackTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  feedbackTitle.textContent = 'Feedback Loops';
  feedbackSection.appendChild(feedbackTitle);
  
  const feedbackText = document.createElement('p');
  feedbackText.innerHTML = `
    Factors influence each other through feedback loops: <br>
    - High Public Awareness increases Governance Structure <br>
    - Advanced AI with poor Alignment damages Reputation <br>
    - Strong Human Capital boosts AI Capability <br>
    - Low Financial Resources hurts Human Capital <br>
    - High Reputation increases Financial Resources <br>
    - And more... <br>
  `;
  feedbackSection.appendChild(feedbackText);
  content.appendChild(feedbackSection);
  
  // Win/Loss
  const winLossSection = document.createElement('div');
  const winLossTitle = document.createElement('h3');
  winLossTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  winLossTitle.textContent = 'Win and Loss Conditions';
  winLossSection.appendChild(winLossTitle);
  
  const winLossText = document.createElement('p');
  winLossText.innerHTML = `
    <b>Victory:</b> Reach Maturity by turn 12 and have: <br>
    - AI Capability > 70 <br>
    - Alignment Progress > 60 <br>
    - Reputation > 50 <br>
    - Market Dynamics > 70 <br><br>
    
    <b>Neutral Ending:</b> Survive 12 turns without achieving victory. <br><br>
    
    <b>Loss Conditions:</b> <br>
    - <i>Doom Losses:</i> <br>
      • AI Capability > 80 with Alignment < 40: AI catastrophe <br>
      • Public Awareness < 20 with AI Capability > 60: Disaster strikes unprepared world <br>
      • Other catastrophic combinations of factors <br>
    - <i>Stagnation Losses:</i> <br>
      • Governance > 80 with AI Capability < 40: Overregulation <br>
      • Public Awareness > 80 with Alignment < 40: Public panic <br>
  `;
  winLossSection.appendChild(winLossText);
  content.appendChild(winLossSection);
  
  modal.appendChild(content);
  modalOverlay.appendChild(modal);
  
  return modalOverlay;
}

// Create event screen
export function createEventScreen(gameState: GameState, onContinue: () => void): HTMLElement {
  const { turn, factors, currentEvent, currentPhase } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col min-h-screen p-4 py-8';
  
  const header = document.createElement('div');
  header.className = 'mb-4';
  
  const statusContainer = document.createElement('div');
  statusContainer.className = 'flex justify-between mb-3';
  
  const turnCounter = document.createElement('div');
  turnCounter.textContent = `Turn: ${turn}/12`;
  statusContainer.appendChild(turnCounter);
  
  const phaseDisplay = document.createElement('div');
  phaseDisplay.textContent = `Phase: ${currentPhase}`;
  statusContainer.appendChild(phaseDisplay);
  
  header.appendChild(statusContainer);
  
  // Add factors display
  const factorsDisplay = createFactorsDisplay(factors);
  header.appendChild(factorsDisplay);
  
  container.appendChild(header);
  
  // Event card
  const cardContent = document.createElement('div');
  cardContent.className = 'flex flex-col h-full';
  
  // Toast notifications will be inserted here dynamically
  
  // Add image below any potential toast notifications
  const cardImage = document.createElement('img');
  cardImage.src = './random-ai-boom.png';
  cardImage.className = 'w-full h-auto mb-6 rounded-lg mx-auto';
  cardImage.alt = 'AI illustration';
  cardImage.style.maxWidth = '400px';
  cardContent.appendChild(cardImage);
  
  if (currentEvent) {
    const eventTitle = document.createElement('h2');
    eventTitle.className = 'text-xl font-bold mb-4 text-center text-yellow-500';
    eventTitle.textContent = 'RANDOM EVENT';
    cardContent.appendChild(eventTitle);
    
    const eventScenario = document.createElement('p');
    eventScenario.className = 'mb-6 text-lg';
    eventScenario.textContent = currentEvent.scenario;
    cardContent.appendChild(eventScenario);
    
    const eventOutcome = document.createElement('p');
    eventOutcome.className = 'mb-8 text-lg';
    eventOutcome.textContent = currentEvent.leftSnippet;
    cardContent.appendChild(eventOutcome);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500';
    errorMessage.textContent = 'Error: No event found';
    cardContent.appendChild(errorMessage);
  }
  
  const continueButton = createButton('Continue', onContinue, 'w-full max-w-xs mx-auto mt-auto');
  cardContent.appendChild(continueButton);
  
  const eventCard = createCard(cardContent, 'flex-grow mb-4');
  container.appendChild(eventCard);
  
  return container;
} 