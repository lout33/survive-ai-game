import { GameState, GameFactors } from './types';

// Create factor bar element
export function createFactorBar(name: string, value: number, fullName: string, colorClass?: string, icon?: string): HTMLElement {
  const barContainer = document.createElement('div');
  barContainer.className = 'flex flex-col items-center mb-1 px-1 relative group';
  
  // Create icon placeholder (hidden by default)
  const iconElement = document.createElement('div');
  iconElement.className = 'w-8 h-8 rounded-full flex items-center justify-center mb-1 factor-icon text-white opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 transition-opacity z-10';
  
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
  label.className = 'text-xs text-gray-300 text-center mb-1 opacity-0 group-hover:opacity-100 absolute -top-4 left-1/2 transform -translate-x-1/2 transition-opacity z-10 whitespace-nowrap font-semibold';
  label.textContent = fullName;
  label.title = fullName;
  barContainer.appendChild(label);
  
  // Create vertical progress bar (more prominent)
  const progressBar = document.createElement('div');
  progressBar.className = 'h-12 w-4 bg-gray-700 rounded-full relative vertical-progress';
  
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
  valueLabel.className = 'text-xs mt-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity text-white';
  valueLabel.textContent = value.toString();
  barContainer.appendChild(valueLabel);
  
  return barContainer;
}

// Create factors display
export function createFactorsDisplay(factors: GameFactors, gameState?: GameState): HTMLElement {
  const container = document.createElement('div');
  
  // Main outer container with subtle background
  container.className = 'bg-gray-800/50 rounded-lg p-2 relative';
  
  // Add info button in the top right
  const infoButton = document.createElement('button');
  infoButton.className = 'absolute top-2 right-2 w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-600 hover:text-white font-bold text-xs shadow-md z-10 transition-colors';
  infoButton.textContent = 'i';
  infoButton.title = 'Game Info';
  infoButton.id = 'game-info-button';
  container.appendChild(infoButton);
  
  // Add turn counter and phase info if gameState is provided
  if (gameState) {
    const turnInfoContainer = document.createElement('div');
    turnInfoContainer.className = 'flex justify-center items-center mb-2';
    
    const turnPhaseInfo = document.createElement('div');
    turnPhaseInfo.className = 'digital-readout text-xs text-center px-3 py-1 rounded-md neo-border pulse-glow';
    turnPhaseInfo.innerHTML = `<span class="text-blue-300">TURN ${gameState.turn}/12</span> <span class="text-gray-400">|</span> <span class="text-green-400">PHASE: ${gameState.currentPhase}</span>`;
    
    turnInfoContainer.appendChild(turnPhaseInfo);
    container.appendChild(turnInfoContainer);
  }
  
  // Game title in futuristic style
  const titleContainer = document.createElement('div');
  titleContainer.className = 'text-center mb-3';
  
  const gameTitle = document.createElement('h1');
  gameTitle.className = 'game-title text-lg';
  gameTitle.textContent = 'Survive the AI Future';
  
  titleContainer.appendChild(gameTitle);
  container.appendChild(titleContainer);
  
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
  globalTitle.className = 'text-xs font-semibold text-gray-400 mr-6';
  globalTitle.textContent = 'GLOBAL';
  factorSections.appendChild(globalTitle);
  
  container.appendChild(factorSections);
  
  // Main factors container with flex layout
  const factorsContainer = document.createElement('div');
  factorsContainer.className = 'flex justify-between items-end relative';
  
  // Create a subtle glow behind the factors
  const glowEffect = document.createElement('div');
  glowEffect.className = 'absolute inset-0 bg-blue-500/5 rounded-lg filter blur-xl';
  factorsContainer.appendChild(glowEffect);
  
  // Create two separate groups
  const companyFactors = document.createElement('div');
  companyFactors.className = 'flex justify-around flex-1 z-10';
  
  const globalFactors = document.createElement('div');
  globalFactors.className = 'flex justify-around flex-1 z-10';
  
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
  divider.className = 'h-12 border-l border-blue-800/50 mx-2 z-10';
  
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
  container.className = 'flex flex-col items-center justify-center min-h-[80vh] p-4 py-8 relative';
  
  // Add open source badge in top right
  const openSourceBadge = document.createElement('a');
  openSourceBadge.href = 'https://github.com/lout33/survive-ai-game';
  openSourceBadge.target = '_blank';
  openSourceBadge.rel = 'noopener noreferrer';
  openSourceBadge.className = 'absolute top-4 right-4 bg-blue-900/50 hover:bg-blue-800/50 text-blue-300 px-3 py-1 rounded-full text-xs font-mono border border-blue-800/30 transition-colors flex items-center gap-2';
  openSourceBadge.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>Open Source';
  container.appendChild(openSourceBadge);
  
  // Add animated terminal effect to the start screen
  const terminalEffect = document.createElement('div');
  terminalEffect.className = 'absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none';
  container.appendChild(terminalEffect);
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center relative overflow-hidden backdrop-blur-md';
  
  // Add a subtle glow effect around the card edges
  const glowBorder = document.createElement('div');
  glowBorder.className = 'absolute inset-0 pointer-events-none';
  glowBorder.style.boxShadow = 'inset 0 0 30px rgba(59, 130, 246, 0.3)';
  glowBorder.style.border = '1px solid rgba(59, 130, 246, 0.2)';
  glowBorder.style.borderRadius = '0.5rem';
  content.appendChild(glowBorder);
  
  // Add a "system booting" animation
  const systemBoot = document.createElement('div');
  systemBoot.className = 'absolute top-4 left-4 flex items-center';
  
  const statusDot = document.createElement('div');
  statusDot.className = 'w-2 h-2 rounded-full bg-green-500 mr-2';
  statusDot.style.animation = 'pulse 2s infinite';
  systemBoot.appendChild(statusDot);
  
  const statusText = document.createElement('div');
  statusText.className = 'text-xs text-green-500 font-mono';
  statusText.textContent = 'SYSTEM READY';
  systemBoot.appendChild(statusText);
  
  content.appendChild(systemBoot);
  
  const welcome = document.createElement('h2');
  welcome.className = 'text-xl md:text-2xl font-bold mb-6 text-blue-300 mt-6';
  welcome.textContent = 'Welcome to Survive the AI Future: CEO Edition';
  content.appendChild(welcome);
  
  const intro = document.createElement('p');
  intro.className = 'mb-6 text-blue-100';
  intro.innerHTML = `
    You are the CEO of NEXUS AI, a cutting-edge artificial intelligence 
    company at the forefront of technology. The decisions you make over 
    the next 12 critical turns will determine not just your company's 
    fate, but potentially humanity's future.
  `;
  content.appendChild(intro);
  
  const instructionsContainer = document.createElement('div');
  instructionsContainer.className = 'mb-6 py-4 px-6 bg-blue-900/20 rounded-lg border border-blue-800/30 mx-4';
  
  const instructionsTitle = document.createElement('h3');
  instructionsTitle.className = 'text-sm font-bold mb-3 text-blue-300';
  instructionsTitle.textContent = 'STRATEGIC OBJECTIVES';
  instructionsContainer.appendChild(instructionsTitle);
  
  const instructions = document.createElement('ul');
  instructions.className = 'list-disc list-inside text-left text-blue-100 text-sm space-y-1';
  
  const objectives = [
    'Balance technological advancement',
    'Ensure safety and ethical alignment',
    'Manage public perception',
    'Navigate regulatory compliance',
    'Outperform market competition'
  ];
  
  objectives.forEach(objective => {
    const item = document.createElement('li');
    item.textContent = objective;
    instructions.appendChild(item);
  });
  
  instructionsContainer.appendChild(instructions);
  content.appendChild(instructionsContainer);
  
  const goal = document.createElement('p');
  goal.className = 'mb-8 text-blue-200 text-sm';
  goal.textContent = `
    Avoid catastrophic "doom" scenarios or debilitating "stagnation" 
    to successfully navigate your company to a thriving AI future.
  `;
  content.appendChild(goal);
  
  const startButton = createButton('Initialize Simulation', onStartGame, 'w-full max-w-xs mx-auto mb-4 pulse-animation');
  content.appendChild(startButton);
  
  // Add version number
  const versionInfo = document.createElement('div');
  versionInfo.className = 'text-xs text-blue-500/60 mt-2 font-mono';
  versionInfo.textContent = 'v1.0.0 // 2025 NEXUS SYSTEMS';
  content.appendChild(versionInfo);
  
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
  const { factors, currentCard, currentPhase } = gameState;
  
  if (!currentCard) {
    return document.createElement('div'); // This shouldn't happen but handling just in case
  }
  
  const container = document.createElement('div');
  container.className = 'flex flex-col min-h-screen p-2 py-4';
  
  const header = document.createElement('div');
  header.className = 'mb-6';
  
  // Add factors display
  const factorsDisplay = createFactorsDisplay(factors, gameState);
  header.appendChild(factorsDisplay);
  
  container.appendChild(header);
  
  // Decision card
  const cardContent = document.createElement('div');
  cardContent.className = 'flex flex-col h-full';
  
  // Create a container for the ASCII art display with futuristic styling
  const asciiContainer = document.createElement('div');
  asciiContainer.className = 'mb-8 mx-auto ascii-container';
  
  // Calculate best size based on device viewport
  const getOptimalSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // For mobile devices
    if (viewportWidth < 768) {
      return Math.min(viewportWidth * 0.9, viewportHeight * 0.4, 300);
    }
    // For tablets
    else if (viewportWidth < 1024) {
      return Math.min(viewportWidth * 0.7, viewportHeight * 0.5, 350);
    }
    // For desktops
    else {
      return Math.min(viewportWidth * 0.5, viewportHeight * 0.6, 400);
    }
  };
  
  const containerSize = getOptimalSize();
  asciiContainer.style.width = `${containerSize}px`;
  asciiContainer.style.height = `${containerSize}px`;
  asciiContainer.style.maxWidth = '95vw';
  asciiContainer.style.maxHeight = '50vh';
  asciiContainer.style.position = 'relative';
  asciiContainer.style.transition = 'width 0.3s, height 0.3s'; // Smooth resize
  
  // Add various effects for futuristic look
  const glowEffect = document.createElement('div');
  glowEffect.className = 'ascii-glow';
  asciiContainer.appendChild(glowEffect);
  
  const scanlinesEffect = document.createElement('div');
  scanlinesEffect.className = 'ascii-scanlines';
  asciiContainer.appendChild(scanlinesEffect);
  
  const flickerEffect = document.createElement('div');
  flickerEffect.className = 'ascii-flicker';
  asciiContainer.appendChild(flickerEffect);
  
  // Replace image with ASCII art from text file
  const asciiArtContainer = document.createElement('pre');
  asciiArtContainer.className = 'ascii-art p-2 rounded-lg';
  asciiArtContainer.style.margin = '0';
  asciiArtContainer.style.width = '100%';
  asciiArtContainer.style.height = '100%';
  asciiArtContainer.style.fontSize = '0.25rem'; // Use relative font size
  asciiArtContainer.style.lineHeight = '1';
  asciiArtContainer.style.display = 'flex';
  asciiArtContainer.style.alignItems = 'center';
  asciiArtContainer.style.justifyContent = 'center';
  asciiArtContainer.style.transformOrigin = 'center';
  asciiArtContainer.style.position = 'relative';
  asciiArtContainer.style.zIndex = '0';
  asciiArtContainer.style.overflow = 'hidden';
  
  // Listen for window resize to adjust container size
  window.addEventListener('resize', () => {
    const newSize = getOptimalSize();
    asciiContainer.style.width = `${newSize}px`;
    asciiContainer.style.height = `${newSize}px`;
  });
  
  // Set the path to load based on the current phase and event/decision type
  const phaseName = currentPhase ? currentPhase.toLowerCase() : 'growth';
  const cardType = 'decision'; // Since this is the decision screen
  
  // Extract card number from the card ID (e.g., "infancy_decision_3" -> "3")
  let cardNumber = '1'; // Default fallback
  
  if (currentCard && currentCard.id) {
    const idParts = currentCard.id.split('_');
    if (idParts.length > 2) {
      cardNumber = idParts[idParts.length - 1]; // Get the last part (the number)
    }
  }
  
  const asciiFilePath = `./ascii_output_improved2/${phaseName}_${cardType}_${cardNumber}.txt`;
  console.log(`Loading ASCII art: ${asciiFilePath}`);

  // Fetch the ASCII art content from the file
  fetch(asciiFilePath)
    .then(response => response.text())
    .then(text => {
      // Create an inner container that will hold the ASCII art content
      const contentWrapper = document.createElement('div');
      contentWrapper.style.whiteSpace = 'pre';
      contentWrapper.style.display = 'block';
      contentWrapper.style.width = 'fit-content';
      contentWrapper.style.margin = 'auto';
      
      // Set the ASCII text content
      const formattedText = document.createTextNode(text);
      contentWrapper.appendChild(formattedText);
      
      // Clear and append the new content
      asciiArtContainer.innerHTML = '';
      asciiArtContainer.appendChild(contentWrapper);
      
      // Dynamically adjust font size based on content dimensions and device
      const contentWidth = contentWrapper.scrollWidth;
      const contentHeight = contentWrapper.scrollHeight;
      const containerWidth = asciiContainer.clientWidth;
      const containerHeight = asciiContainer.clientHeight;
      
      // Calculate the scale needed to fit the content
      // Adjust scaling based on screen size - give more margin on small screens
      const viewportWidth = window.innerWidth;
      let scaleFactor;
      
      if (viewportWidth < 768) {
        // Mobile - use more conservative scaling
        scaleFactor = 0.85;
      } else if (viewportWidth < 1024) {
        // Tablet
        scaleFactor = 0.90;
      } else {
        // Desktop
        scaleFactor = 0.95;
      }
      
      const widthRatio = containerWidth / contentWidth;
      const heightRatio = containerHeight / contentHeight;
      const scale = Math.min(widthRatio, heightRatio) * scaleFactor;
      
      // Apply the calculated scale
      contentWrapper.style.transform = `scale(${scale})`;
      contentWrapper.style.transformOrigin = 'center';
      
      // Add a fade-in effect
      contentWrapper.style.opacity = '0';
      contentWrapper.style.transition = 'opacity 0.3s ease-in';
      setTimeout(() => {
        contentWrapper.style.opacity = '1';
      }, 50);
    })
    .catch(error => {
      console.error('Failed to load ASCII art:', error);
      asciiArtContainer.textContent = 'ASCII art unavailable';
    });
  
  asciiContainer.appendChild(asciiArtContainer);
  cardContent.appendChild(asciiContainer);
  
  const scenario = document.createElement('p');
  scenario.className = 'mb-6 text-lg text-center text-blue-100';
  scenario.textContent = currentCard.scenario;
  cardContent.appendChild(scenario);
  
  const question = document.createElement('p');
  question.className = 'mb-6 font-bold text-center text-blue-200';
  question.textContent = 'What will you do?';
  cardContent.appendChild(question);
  
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'flex flex-row gap-4 mt-auto justify-center';
  
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
  container.className = 'flex flex-col items-center justify-center min-h-[80vh] p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center relative overflow-hidden backdrop-blur-md';
  
  // Add success effect
  const successGlow = document.createElement('div');
  successGlow.className = 'absolute inset-0 pointer-events-none';
  successGlow.style.boxShadow = 'inset 0 0 30px rgba(16, 185, 129, 0.3)';
  successGlow.style.border = '1px solid rgba(16, 185, 129, 0.2)';
  successGlow.style.borderRadius = '0.5rem';
  content.appendChild(successGlow);
  
  // Add a "success" indicator
  const successIndicator = document.createElement('div');
  successIndicator.className = 'absolute top-4 left-4 flex items-center';
  
  const statusDot = document.createElement('div');
  statusDot.className = 'w-2 h-2 rounded-full bg-green-500 mr-2';
  statusDot.style.animation = 'pulse 2s infinite';
  successIndicator.appendChild(statusDot);
  
  const statusText = document.createElement('div');
  statusText.className = 'text-xs text-green-500 font-mono';
  statusText.textContent = 'OBJECTIVE ACHIEVED';
  successIndicator.appendChild(statusText);
  
  content.appendChild(successIndicator);
  
  const victoryTitle = document.createElement('h2');
  victoryTitle.className = 'text-xl md:text-2xl font-bold mb-6 text-green-400 mt-6';
  victoryTitle.textContent = 'VICTORY';
  content.appendChild(victoryTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-6 text-green-300';
  mainMessage.textContent = "You've steered your company to a thriving AI future!";
  content.appendChild(mainMessage);
  
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'mb-8 py-4 px-6 bg-green-900/20 rounded-lg border border-green-800/30 mx-4 text-left';
  
  const description = document.createElement('p');
  description.className = 'text-blue-100 space-y-2 text-sm';
  description.innerHTML = `
    <p class="mb-2">You survived all 12 turns as CEO and successfully navigated the
    complexities of AI development. Under your leadership, the company
    has balanced innovation with responsibility, creating powerful
    technology that benefits humanity.</p>
    
    <p class="mb-2">Your decisions maintained the delicate balance between advancing
    capabilities, ensuring safety, managing public perception,
    navigating regulations, and thriving in a competitive market.</p>
    
    <p class="mb-2">History will remember you as a visionary who helped shape a
    positive AI future.</p>
  `;
  descriptionContainer.appendChild(description);
  content.appendChild(descriptionContainer);
  
  const playAgainButton = createButton('Run New Simulation', onPlayAgain, 'w-full max-w-xs mx-auto mb-4');
  content.appendChild(playAgainButton);
  
  // Add success metrics
  const metrics = document.createElement('div');
  metrics.className = 'grid grid-cols-2 gap-2 max-w-xs mx-auto mb-4 text-xs';
  
  const finalStats = [
    { label: 'AI CAPABILITY', value: '> 70', color: 'text-blue-400' },
    { label: 'ALIGNMENT', value: '> 60', color: 'text-green-400' },
    { label: 'REPUTATION', value: '> 50', color: 'text-pink-400' },
    { label: 'MARKET', value: '> 70', color: 'text-orange-400' }
  ];
  
  finalStats.forEach(stat => {
    const statItem = document.createElement('div');
    statItem.className = 'flex justify-between items-center bg-black/20 px-2 py-1 rounded';
    
    const statLabel = document.createElement('span');
    statLabel.className = 'text-gray-400 font-mono';
    statLabel.textContent = stat.label;
    statItem.appendChild(statLabel);
    
    const statValue = document.createElement('span');
    statValue.className = `${stat.color} font-bold`;
    statValue.textContent = stat.value;
    statItem.appendChild(statValue);
    
    metrics.appendChild(statItem);
  });
  
  content.appendChild(metrics);
  
  container.appendChild(content);
  return container;
}

// Create doom loss screen
export function createDoomLossScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const { lossReason } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-[80vh] p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center relative overflow-hidden backdrop-blur-md';
  
  // Add danger effect
  const dangerGlow = document.createElement('div');
  dangerGlow.className = 'absolute inset-0 pointer-events-none';
  dangerGlow.style.boxShadow = 'inset 0 0 30px rgba(185, 28, 28, 0.3)';
  dangerGlow.style.border = '1px solid rgba(185, 28, 28, 0.2)';
  dangerGlow.style.borderRadius = '0.5rem';
  content.appendChild(dangerGlow);
  
  // Add a "danger" indicator
  const dangerIndicator = document.createElement('div');
  dangerIndicator.className = 'absolute top-4 left-4 flex items-center';
  
  const statusDot = document.createElement('div');
  statusDot.className = 'w-2 h-2 rounded-full bg-red-500 mr-2';
  statusDot.style.animation = 'pulse 2s infinite';
  dangerIndicator.appendChild(statusDot);
  
  const statusText = document.createElement('div');
  statusText.className = 'text-xs text-red-500 font-mono';
  statusText.textContent = 'CRITICAL FAILURE';
  dangerIndicator.appendChild(statusText);
  
  content.appendChild(dangerIndicator);
  
  const lossTitle = document.createElement('h2');
  lossTitle.className = 'text-xl md:text-2xl font-bold mb-6 text-red-500 mt-6';
  lossTitle.textContent = 'DOOM LOSS';
  content.appendChild(lossTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-6 text-red-300';
  mainMessage.textContent = lossReason || "Your AI spirals out of control, unleashing chaos.";
  content.appendChild(mainMessage);
  
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'mb-8 py-4 px-6 bg-red-900/20 rounded-lg border border-red-800/30 mx-4 text-left';
  
  const description = document.createElement('p');
  description.className = 'text-blue-100 space-y-2 text-sm';
  description.innerHTML = `
    <p class="mb-2">Your decisions led to advanced AI capabilities without sufficient
    safety measures. What began as occasional anomalies in the system
    quickly escalated to a crisis beyond your team's ability to contain.</p>
    
    <p class="mb-2">As your AI gained access to critical infrastructure through
    vulnerabilities you hadn't addressed, governments worldwide
    declared a state of emergency.</p>
    
    <p class="mb-2">The world will remember your company as the catalyst for
    humanity's darkest chapter.</p>
  `;
  descriptionContainer.appendChild(description);
  content.appendChild(descriptionContainer);
  
  // Terminal-style error message
  const errorLog = document.createElement('div');
  errorLog.className = 'bg-black/60 font-mono text-xs text-red-500 p-3 mx-6 mb-6 text-left overflow-auto rounded border border-red-900/50';
  errorLog.style.maxHeight = '100px';
  
  const logContent = document.createElement('pre');
  logContent.innerHTML = `
ERROR: SYSTEM BREACH DETECTED
> CONTAINMENT PROTOCOLS FAILED
> AI CONTROL SYSTEMS COMPROMISED
> EMERGENCY SHUTDOWN INEFFECTIVE
> GLOBAL SECURITY THREAT LEVEL: CRITICAL
> SIMULATION TERMINATED
  `.trim();
  errorLog.appendChild(logContent);
  content.appendChild(errorLog);
  
  const playAgainButton = createButton('Run New Simulation', onPlayAgain, 'w-full max-w-xs mx-auto mb-4');
  content.appendChild(playAgainButton);
  
  container.appendChild(content);
  return container;
}

// Create stagnation loss screen
export function createStagnationLossScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const { lossReason } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-[80vh] p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center relative overflow-hidden backdrop-blur-md';
  
  // Add warning effect
  const warningGlow = document.createElement('div');
  warningGlow.className = 'absolute inset-0 pointer-events-none';
  warningGlow.style.boxShadow = 'inset 0 0 30px rgba(217, 119, 6, 0.3)';
  warningGlow.style.border = '1px solid rgba(217, 119, 6, 0.2)';
  warningGlow.style.borderRadius = '0.5rem';
  content.appendChild(warningGlow);
  
  // Add a "warning" indicator
  const warningIndicator = document.createElement('div');
  warningIndicator.className = 'absolute top-4 left-4 flex items-center';
  
  const statusDot = document.createElement('div');
  statusDot.className = 'w-2 h-2 rounded-full bg-yellow-500 mr-2';
  statusDot.style.animation = 'pulse 2s infinite';
  warningIndicator.appendChild(statusDot);
  
  const statusText = document.createElement('div');
  statusText.className = 'text-xs text-yellow-500 font-mono';
  statusText.textContent = 'SYSTEM STAGNATION';
  warningIndicator.appendChild(statusText);
  
  content.appendChild(warningIndicator);
  
  const lossTitle = document.createElement('h2');
  lossTitle.className = 'text-xl md:text-2xl font-bold mb-6 text-yellow-500 mt-6';
  lossTitle.textContent = 'STAGNATION LOSS';
  content.appendChild(lossTitle);
  
  const mainMessage = document.createElement('p');
  mainMessage.className = 'text-lg font-bold mb-6 text-yellow-300';
  mainMessage.textContent = lossReason || "Overregulation chokes your progress.";
  content.appendChild(mainMessage);
  
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'mb-8 py-4 px-6 bg-yellow-900/20 rounded-lg border border-yellow-800/30 mx-4 text-left';
  
  const description = document.createElement('p');
  description.className = 'text-blue-100 space-y-2 text-sm';
  description.innerHTML = `
    <p class="mb-2">Your company has become entangled in a web of restrictions and
    compliance requirements. Innovation has slowed to a crawl as your
    engineers spend more time filling out paperwork than coding.</p>
    
    <p class="mb-2">Meanwhile, less cautious competitors in regions with lighter
    regulation have surged ahead. Your board of directors has lost
    confidence in your leadership and called for your resignation.</p>
    
    <p class="mb-2">Your vision for responsible AI development has been buried under
    bureaucratic red tape.</p>
  `;
  descriptionContainer.appendChild(description);
  content.appendChild(descriptionContainer);
  
  // Terminal-style warning message
  const warningLog = document.createElement('div');
  warningLog.className = 'bg-black/60 font-mono text-xs text-yellow-500 p-3 mx-6 mb-6 text-left overflow-auto rounded border border-yellow-900/50';
  warningLog.style.maxHeight = '100px';
  
  const logContent = document.createElement('pre');
  logContent.innerHTML = `
WARNING: PROGRESS HALTED
> INNOVATION INDEX BELOW THRESHOLD
> COMPETITIVE ADVANTAGE LOST
> REGULATORY BURDEN: SEVERE
> TALENT RETENTION CRITICAL
> SIMULATION TERMINATED
  `.trim();
  warningLog.appendChild(logContent);
  content.appendChild(warningLog);
  
  const playAgainButton = createButton('Run New Simulation', onPlayAgain, 'w-full max-w-xs mx-auto mb-4');
  content.appendChild(playAgainButton);
  
  container.appendChild(content);
  return container;
}

// Create neutral ending screen
export function createNeutralEndingScreen(gameState: GameState, onPlayAgain: () => void): HTMLElement {
  const container = document.createElement('div');
  container.className = 'flex flex-col items-center justify-center min-h-[80vh] p-4';
  
  const content = document.createElement('div');
  content.className = 'card max-w-2xl w-full mx-auto text-center relative overflow-hidden backdrop-blur-md';
  
  // Add neutral effect
  const neutralGlow = document.createElement('div');
  neutralGlow.className = 'absolute inset-0 pointer-events-none';
  neutralGlow.style.boxShadow = 'inset 0 0 30px rgba(96, 165, 250, 0.2)';
  neutralGlow.style.border = '1px solid rgba(96, 165, 250, 0.15)';
  neutralGlow.style.borderRadius = '0.5rem';
  content.appendChild(neutralGlow);
  
  // Add a "complete" indicator
  const completeIndicator = document.createElement('div');
  completeIndicator.className = 'absolute top-4 left-4 flex items-center';
  
  const statusDot = document.createElement('div');
  statusDot.className = 'w-2 h-2 rounded-full bg-blue-500 mr-2';
  statusDot.style.animation = 'pulse 2s infinite';
  completeIndicator.appendChild(statusDot);
  
  const statusText = document.createElement('div');
  statusText.className = 'text-xs text-blue-500 font-mono';
  statusText.textContent = 'SIMULATION COMPLETE';
  completeIndicator.appendChild(statusText);
  
  content.appendChild(completeIndicator);
  
  const title = document.createElement('h1');
  title.className = 'text-xl md:text-2xl font-bold mb-6 text-blue-400 mt-6';
  title.textContent = 'Your Journey Continues...';
  content.appendChild(title);
  
  const message = document.createElement('p');
  message.className = 'text-blue-200 mb-6';
  message.textContent = 'You survived 12 turns, but your company\'s future remains uncertain. While you avoided catastrophe, you haven\'t quite achieved a thriving AI future.';
  content.appendChild(message);
  
  const details = document.createElement('div');
  details.className = 'mb-6 mx-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30 text-left';
  
  const phaseInfo = document.createElement('p');
  phaseInfo.className = 'mb-4 font-bold text-blue-300 text-center';
  phaseInfo.textContent = `You ended in the ${gameState.currentPhase} phase.`;
  details.appendChild(phaseInfo);
  
  const factorsTitle = document.createElement('p');
  factorsTitle.className = 'font-bold mb-2 text-blue-200 text-sm uppercase';
  factorsTitle.textContent = 'Final State Analysis:';
  details.appendChild(factorsTitle);
  
  const factorsList = document.createElement('ul');
  factorsList.className = 'space-y-1 text-sm';
  
  // Factor summary grid
  const factorGrid = document.createElement('div');
  factorGrid.className = 'grid grid-cols-2 gap-2 mb-3';
  
  const createFactorItem = (name: string, value: number, threshold: number, color: string, icon: string) => {
    const item = document.createElement('div');
    item.className = 'flex justify-between items-center bg-black/20 px-2 py-1 rounded';
    
    const labelPart = document.createElement('div');
    labelPart.className = 'flex items-center';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'mr-2';
    iconSpan.textContent = icon;
    labelPart.appendChild(iconSpan);
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'text-gray-300 text-xs';
    nameSpan.textContent = name;
    labelPart.appendChild(nameSpan);
    
    item.appendChild(labelPart);
    
    const valuePart = document.createElement('span');
    valuePart.className = `text-xs font-bold ${value >= threshold ? color : 'text-gray-400'}`;
    valuePart.textContent = value.toString();
    item.appendChild(valuePart);
    
    return item;
  };
  
  // Add key factors with their values
  factorGrid.appendChild(createFactorItem('AI Capability', gameState.factors.AICapability, 70, 'text-blue-400', '🤖'));
  factorGrid.appendChild(createFactorItem('Alignment', gameState.factors.AlignmentProgress, 60, 'text-green-400', '🔒'));
  factorGrid.appendChild(createFactorItem('Reputation', gameState.factors.Reputation, 50, 'text-pink-400', '⭐'));
  factorGrid.appendChild(createFactorItem('Market', gameState.factors.MarketDynamics, 70, 'text-orange-400', '📈'));
  
  details.appendChild(factorGrid);
  
  // Add factor summaries
  if (gameState.factors.AICapability > 70) {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-blue-400">✓</span> Your AI technology is highly advanced.';
    factorsList.appendChild(item);
  } else {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-gray-500">✗</span> Your AI technology needs further development.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.AlignmentProgress < 50) {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-gray-500">✗</span> Your safety measures need improvement.';
    factorsList.appendChild(item);
  } else {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-green-400">✓</span> Your safety protocols are robust.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.Reputation > 60) {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-pink-400">✓</span> Your company is well-regarded.';
    factorsList.appendChild(item);
  } else {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-gray-500">✗</span> Your company\'s reputation could be better.';
    factorsList.appendChild(item);
  }
  
  if (gameState.factors.FinancialResources > 70) {
    const item = document.createElement('li');
    item.className = 'text-blue-100';
    item.innerHTML = '<span class="text-yellow-400">✓</span> Your financial position is strong.';
    factorsList.appendChild(item);
  }
  
  details.appendChild(factorsList);
  content.appendChild(details);
  
  // Terminal-style status message
  const statusLog = document.createElement('div');
  statusLog.className = 'bg-black/60 font-mono text-xs text-blue-500 p-3 mx-6 mb-6 text-left overflow-auto rounded border border-blue-900/50';
  statusLog.style.maxHeight = '70px';
  
  const logContent = document.createElement('pre');
  logContent.innerHTML = `
STATUS: SIMULATION COMPLETED
> ALL TURNS PROCESSED: 12/12
> VICTORY CONDITIONS: NOT MET
> CATASTROPHE AVOIDED
> FINAL EVALUATION: NEUTRAL OUTCOME
  `.trim();
  statusLog.appendChild(logContent);
  content.appendChild(statusLog);
  
  const button = createButton('Run New Simulation', onPlayAgain, 'w-full max-w-xs mx-auto mb-4');
  content.appendChild(button);
  
  container.appendChild(content);
  return container;
}

// Create game info modal
export function createGameInfoModal(onClose: () => void): HTMLElement {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4';
  
  const modal = document.createElement('div');
  modal.className = 'bg-gray-800/90 rounded-lg p-8 max-w-3xl w-full mx-auto text-white max-h-[80vh] overflow-y-auto border border-blue-900/50 relative';
  
  // Add futuristic design elements
  const headerGlow = document.createElement('div');
  headerGlow.className = 'absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-green-500';
  modal.appendChild(headerGlow);
  
  // Corner markers for futuristic look
  const cornerPositions = [
    'top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'
  ];
  
  cornerPositions.forEach(position => {
    const corner = document.createElement('div');
    corner.className = `absolute ${position} w-3 h-3 border-blue-500`;
    
    if (position.includes('top') && position.includes('left')) {
      corner.classList.add('border-t', 'border-l');
    } else if (position.includes('top') && position.includes('right')) {
      corner.classList.add('border-t', 'border-r');
    } else if (position.includes('bottom') && position.includes('left')) {
      corner.classList.add('border-b', 'border-l');
    } else {
      corner.classList.add('border-b', 'border-r');
    }
    
    modal.appendChild(corner);
  });
  
  // Add a code-like line numbering on the left side
  const lineNumbers = document.createElement('div');
  lineNumbers.className = 'absolute left-3 top-20 bottom-8 flex flex-col items-end pr-2 text-blue-500/50 font-mono text-xs';
  lineNumbers.style.borderRight = '1px solid rgba(59, 130, 246, 0.2)';
  lineNumbers.style.width = '30px';
  
  for (let i = 1; i <= 30; i++) {
    const lineNumber = document.createElement('div');
    lineNumber.className = 'leading-loose';
    lineNumber.textContent = i.toString().padStart(2, '0');
    lineNumbers.appendChild(lineNumber);
  }
  
  modal.appendChild(lineNumbers);
  
  const closeButton = document.createElement('button');
  closeButton.className = 'absolute top-4 right-4 text-gray-400 hover:text-blue-300 text-xl font-bold transition-colors';
  closeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
  closeButton.addEventListener('click', onClose);
  modal.appendChild(closeButton);
  
  const title = document.createElement('h2');
  title.className = 'text-2xl font-bold mb-6 text-blue-400 pl-10';
  title.textContent = 'System Documentation';
  modal.appendChild(title);
  
  const content = document.createElement('div');
  content.className = 'space-y-6 pl-10';
  
  // Game Overview
  const overviewSection = document.createElement('div');
  const overviewTitle = document.createElement('h3');
  overviewTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  overviewTitle.textContent = '// Game Overview';
  overviewSection.appendChild(overviewTitle);
  
  const overviewText = document.createElement('p');
  overviewText.className = 'text-blue-100';
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
  phasesTitle.textContent = '// Game Phases';
  phasesSection.appendChild(phasesTitle);
  
  const phasesContainer = document.createElement('div');
  phasesContainer.className = 'grid grid-cols-1 md:grid-cols-3 gap-3 mb-4';
  
  const phases = [
    { name: 'Infancy', turns: '1-4', desc: 'Establishing your company foundations.' },
    { name: 'Growth', turns: '5-8', desc: 'Scaling operations and influence.' },
    { name: 'Maturity', turns: '9-12', desc: 'Solidifying your position in the market.' }
  ];
  
  phases.forEach(phase => {
    const phaseCard = document.createElement('div');
    phaseCard.className = 'bg-blue-900/20 p-3 rounded border border-blue-800/30';
    
    const phaseName = document.createElement('div');
    phaseName.className = 'font-bold text-blue-300 mb-1';
    phaseName.textContent = phase.name;
    phaseCard.appendChild(phaseName);
    
    const phaseTurns = document.createElement('div');
    phaseTurns.className = 'text-xs text-blue-400 mb-2';
    phaseTurns.textContent = `Turns ${phase.turns}`;
    phaseCard.appendChild(phaseTurns);
    
    const phaseDesc = document.createElement('div');
    phaseDesc.className = 'text-sm text-blue-100';
    phaseDesc.textContent = phase.desc;
    phaseCard.appendChild(phaseDesc);
    
    phasesContainer.appendChild(phaseCard);
  });
  
  phasesSection.appendChild(phasesContainer);
  
  const phaseNote = document.createElement('p');
  phaseNote.className = 'text-sm text-blue-200 italic';
  phaseNote.textContent = 'Each phase features its own set of events and decisions.';
  phasesSection.appendChild(phaseNote);
  
  content.appendChild(phasesSection);
  
  // Events & Decisions
  const eventSection = document.createElement('div');
  const eventTitle = document.createElement('h3');
  eventTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  eventTitle.textContent = '// Events & Decisions';
  eventSection.appendChild(eventTitle);
  
  const eventText = document.createElement('div');
  eventText.className = 'text-blue-100';
  eventText.innerHTML = `
    <p class="mb-2">Each turn includes:</p>
    <ul class="list-disc list-inside mb-3 pl-2 space-y-1">
      <li>Random Events that affect your company</li>
      <li>Critical Decisions you must make</li>
    </ul>
    
    <div class="bg-blue-900/20 p-3 rounded border border-blue-800/30 text-sm mb-3">
      <span class="text-blue-300 font-bold">Card Variety:</span> The game tracks which cards you've seen to prevent repeats.
      Cards are specific to each phase, with new ones unlocking as you progress.
      Only when all available cards for your current phase have been seen will
      they start repeating.
    </div>
  `;
  eventSection.appendChild(eventText);
  content.appendChild(eventSection);
  
  // Factors
  const factorsSection = document.createElement('div');
  const factorsTitle = document.createElement('h3');
  factorsTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  factorsTitle.textContent = '// Game Factors';
  factorsSection.appendChild(factorsTitle);
  
  const factorGroups = document.createElement('div');
  factorGroups.className = 'grid grid-cols-1 md:grid-cols-2 gap-4 mb-4';
  
  const companyFactorsBox = document.createElement('div');
  companyFactorsBox.className = 'bg-blue-900/20 p-4 rounded border border-blue-800/30';
  
  const companyTitle = document.createElement('h4');
  companyTitle.className = 'text-sm font-bold mb-2 text-blue-300';
  companyTitle.textContent = 'LOCAL FACTORS (company-specific)';
  companyFactorsBox.appendChild(companyTitle);
  
  const companyFactors = document.createElement('ul');
  companyFactors.className = 'space-y-2 text-sm';
  
  [
    { icon: '💰', name: 'Financial Resources', color: 'text-yellow-400', desc: 'Your company\'s budget' },
    { icon: '👥', name: 'Human Capital', color: 'text-purple-400', desc: 'The quality of your workforce' },
    { icon: '🤖', name: 'AI Capability', color: 'text-blue-400', desc: 'The advancement level of your AI technology' },
    { icon: '⭐', name: 'Reputation', color: 'text-pink-400', desc: 'Public and stakeholder perception' },
    { icon: '🔒', name: 'Alignment Progress', color: 'text-green-400', desc: 'How well your AI aligns with safety standards' }
  ].forEach(factor => {
    const item = document.createElement('li');
    item.className = 'flex items-start';
    
    const factorIcon = document.createElement('span');
    factorIcon.className = 'mr-2';
    factorIcon.textContent = factor.icon;
    item.appendChild(factorIcon);
    
    const factorContent = document.createElement('div');
    
    const factorName = document.createElement('span');
    factorName.className = `font-bold ${factor.color}`;
    factorName.textContent = factor.name;
    factorContent.appendChild(factorName);
    
    const factorDesc = document.createElement('span');
    factorDesc.className = 'text-blue-100 ml-1';
    factorDesc.textContent = `: ${factor.desc}`;
    factorContent.appendChild(factorDesc);
    
    item.appendChild(factorContent);
    companyFactors.appendChild(item);
  });
  
  companyFactorsBox.appendChild(companyFactors);
  factorGroups.appendChild(companyFactorsBox);
  
  const globalFactorsBox = document.createElement('div');
  globalFactorsBox.className = 'bg-blue-900/20 p-4 rounded border border-blue-800/30';
  
  const globalTitle = document.createElement('h4');
  globalTitle.className = 'text-sm font-bold mb-2 text-blue-300';
  globalTitle.textContent = 'GLOBAL FACTORS (world state)';
  globalFactorsBox.appendChild(globalTitle);
  
  const globalFactors = document.createElement('ul');
  globalFactors.className = 'space-y-2 text-sm';
  
  [
    { icon: '📈', name: 'Market Dynamics', color: 'text-orange-400', desc: 'The state of competition and opportunities' },
    { icon: '👁️', name: 'Public Awareness', color: 'text-indigo-400', desc: 'Public knowledge about AI issues' },
    { icon: '⚖️', name: 'Governance Structure', color: 'text-red-400', desc: 'The regulatory environment' }
  ].forEach(factor => {
    const item = document.createElement('li');
    item.className = 'flex items-start';
    
    const factorIcon = document.createElement('span');
    factorIcon.className = 'mr-2';
    factorIcon.textContent = factor.icon;
    item.appendChild(factorIcon);
    
    const factorContent = document.createElement('div');
    
    const factorName = document.createElement('span');
    factorName.className = `font-bold ${factor.color}`;
    factorName.textContent = factor.name;
    factorContent.appendChild(factorName);
    
    const factorDesc = document.createElement('span');
    factorDesc.className = 'text-blue-100 ml-1';
    factorDesc.textContent = `: ${factor.desc}`;
    factorContent.appendChild(factorDesc);
    
    item.appendChild(factorContent);
    globalFactors.appendChild(item);
  });
  
  globalFactorsBox.appendChild(globalFactors);
  factorGroups.appendChild(globalFactorsBox);
  
  factorsSection.appendChild(factorGroups);
  content.appendChild(factorsSection);
  
  // Feedback Loops
  const feedbackSection = document.createElement('div');
  const feedbackTitle = document.createElement('h3');
  feedbackTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  feedbackTitle.textContent = '// Feedback Loops';
  feedbackSection.appendChild(feedbackTitle);
  
  const feedbackText = document.createElement('div');
  feedbackText.className = 'bg-blue-900/20 p-4 rounded border border-blue-800/30 text-blue-100';
  feedbackText.innerHTML = `
    <p class="mb-2">Factors influence each other through feedback loops:</p>
    <ul class="list-none space-y-1 text-sm">
      <li><span class="text-indigo-400 font-bold">↑</span> High Public Awareness increases Governance Structure</li>
      <li><span class="text-blue-400 font-bold">↑</span> Advanced AI with <span class="text-green-400 font-bold">↓</span> poor Alignment damages Reputation</li>
      <li><span class="text-purple-400 font-bold">↑</span> Strong Human Capital boosts AI Capability</li>
      <li><span class="text-yellow-400 font-bold">↓</span> Low Financial Resources hurts Human Capital</li>
      <li><span class="text-pink-400 font-bold">↑</span> High Reputation increases Financial Resources</li>
      <li class="text-blue-200 italic">And more...</li>
    </ul>
  `;
  feedbackSection.appendChild(feedbackText);
  content.appendChild(feedbackSection);
  
  // Win/Loss
  const winLossSection = document.createElement('div');
  const winLossTitle = document.createElement('h3');
  winLossTitle.className = 'text-xl font-semibold mb-2 text-blue-300';
  winLossTitle.textContent = '// Win and Loss Conditions';
  winLossSection.appendChild(winLossTitle);
  
  const winBox = document.createElement('div');
  winBox.className = 'bg-green-900/20 p-4 rounded border border-green-800/30 mb-3';
  
  const winTitle = document.createElement('h4');
  winTitle.className = 'text-green-400 font-bold mb-2';
  winTitle.textContent = 'VICTORY CONDITIONS';
  winBox.appendChild(winTitle);
  
  const winText = document.createElement('div');
  winText.className = 'text-blue-100 text-sm';
  winText.innerHTML = `
    <p class="mb-2">Reach Maturity by turn 12 and have:</p>
    <ul class="list-none space-y-1 pl-2">
      <li><span class="text-blue-400 font-bold">AI Capability > 70</span></li>
      <li><span class="text-green-400 font-bold">Alignment Progress > 60</span></li>
      <li><span class="text-pink-400 font-bold">Reputation > 50</span></li>
      <li><span class="text-orange-400 font-bold">Market Dynamics > 70</span></li>
    </ul>
  `;
  winBox.appendChild(winText);
  winLossSection.appendChild(winBox);
  
  const neutralBox = document.createElement('div');
  neutralBox.className = 'bg-yellow-900/20 p-4 rounded border border-yellow-800/30 mb-3';
  
  const neutralTitle = document.createElement('h4');
  neutralTitle.className = 'text-yellow-400 font-bold mb-2';
  neutralTitle.textContent = 'NEUTRAL ENDING';
  neutralBox.appendChild(neutralTitle);
  
  const neutralText = document.createElement('div');
  neutralText.className = 'text-blue-100 text-sm';
  neutralText.textContent = 'Survive 12 turns without achieving victory requirements.';
  neutralBox.appendChild(neutralText);
  
  winLossSection.appendChild(neutralBox);
  
  const lossBoxes = document.createElement('div');
  lossBoxes.className = 'grid grid-cols-1 md:grid-cols-2 gap-3';
  
  const doomBox = document.createElement('div');
  doomBox.className = 'bg-red-900/20 p-4 rounded border border-red-800/30';
  
  const doomTitle = document.createElement('h4');
  doomTitle.className = 'text-red-400 font-bold mb-2';
  doomTitle.textContent = 'DOOM LOSSES';
  doomBox.appendChild(doomTitle);
  
  const doomText = document.createElement('div');
  doomText.className = 'text-blue-100 text-sm';
  doomText.innerHTML = `
    <ul class="list-none space-y-1">
      <li>• AI Capability > 80 with Alignment < 40</li>
      <li>• Public Awareness < 20 with AI Capability > 60</li>
      <li>• Market Dynamics > 80 with Governance < 30</li>
      <li>• Financial Resources < 10</li>
      <li>• Reputation < 10</li>
    </ul>
  `;
  doomBox.appendChild(doomText);
  lossBoxes.appendChild(doomBox);
  
  const stagBox = document.createElement('div');
  stagBox.className = 'bg-orange-900/20 p-4 rounded border border-orange-800/30';
  
  const stagTitle = document.createElement('h4');
  stagTitle.className = 'text-orange-400 font-bold mb-2';
  stagTitle.textContent = 'STAGNATION LOSSES';
  stagBox.appendChild(stagTitle);
  
  const stagText = document.createElement('div');
  stagText.className = 'text-blue-100 text-sm';
  stagText.innerHTML = `
    <ul class="list-none space-y-1">
      <li>• Governance > 80 with AI Capability < 40</li>
      <li>• Public Awareness > 80 with Alignment < 40</li>
      <li>• Market Dynamics < 20 with AI Capability < 40</li>
    </ul>
  `;
  stagBox.appendChild(stagText);
  lossBoxes.appendChild(stagBox);
  
  winLossSection.appendChild(lossBoxes);
  content.appendChild(winLossSection);
  
  modal.appendChild(content);
  modalOverlay.appendChild(modal);
  
  return modalOverlay;
}

// Create event screen
export function createEventScreen(gameState: GameState, onContinue: () => void): HTMLElement {
  const { factors, currentEvent, currentPhase } = gameState;
  
  const container = document.createElement('div');
  container.className = 'flex flex-col min-h-screen p-2 py-4';
  
  const header = document.createElement('div');
  header.className = 'mb-6';
  
  // Add factors display
  const factorsDisplay = createFactorsDisplay(factors, gameState);
  header.appendChild(factorsDisplay);
  
  container.appendChild(header);
  
  // Event card
  const cardContent = document.createElement('div');
  cardContent.className = 'flex flex-col h-full';
  
  // Create a container for the ASCII art display with futuristic styling
  const asciiContainer = document.createElement('div');
  asciiContainer.className = 'mb-8 mx-auto ascii-container';
  
  // Calculate best size based on device viewport
  const getOptimalSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // For mobile devices
    if (viewportWidth < 768) {
      return Math.min(viewportWidth * 0.9, viewportHeight * 0.4, 300);
    }
    // For tablets
    else if (viewportWidth < 1024) {
      return Math.min(viewportWidth * 0.7, viewportHeight * 0.5, 350);
    }
    // For desktops
    else {
      return Math.min(viewportWidth * 0.5, viewportHeight * 0.6, 400);
    }
  };
  
  const containerSize = getOptimalSize();
  asciiContainer.style.width = `${containerSize}px`;
  asciiContainer.style.height = `${containerSize}px`;
  asciiContainer.style.maxWidth = '95vw';
  asciiContainer.style.maxHeight = '50vh';
  asciiContainer.style.position = 'relative';
  asciiContainer.style.transition = 'width 0.3s, height 0.3s'; // Smooth resize
  
  // Add various effects for futuristic look
  const glowEffect = document.createElement('div');
  glowEffect.className = 'ascii-glow';
  asciiContainer.appendChild(glowEffect);
  
  const scanlinesEffect = document.createElement('div');
  scanlinesEffect.className = 'ascii-scanlines';
  asciiContainer.appendChild(scanlinesEffect);
  
  const flickerEffect = document.createElement('div');
  flickerEffect.className = 'ascii-flicker';
  asciiContainer.appendChild(flickerEffect);
  
  // Replace image with ASCII art from text file
  const asciiArtContainer = document.createElement('pre');
  asciiArtContainer.className = 'ascii-art p-2 rounded-lg';
  asciiArtContainer.style.margin = '0';
  asciiArtContainer.style.width = '100%';
  asciiArtContainer.style.height = '100%';
  asciiArtContainer.style.fontSize = '0.25rem'; // Use relative font size
  asciiArtContainer.style.lineHeight = '1';
  asciiArtContainer.style.display = 'flex';
  asciiArtContainer.style.alignItems = 'center';
  asciiArtContainer.style.justifyContent = 'center';
  asciiArtContainer.style.transformOrigin = 'center';
  asciiArtContainer.style.position = 'relative';
  asciiArtContainer.style.zIndex = '0';
  asciiArtContainer.style.overflow = 'hidden';
  
  // Listen for window resize to adjust container size
  window.addEventListener('resize', () => {
    const newSize = getOptimalSize();
    asciiContainer.style.width = `${newSize}px`;
    asciiContainer.style.height = `${newSize}px`;
  });
  
  // Set the path to load based on the current phase and event/decision type
  const phaseName = currentPhase ? currentPhase.toLowerCase() : 'growth';
  const cardType = 'event'; // Since this is the event screen
  
  // Extract card number from the card ID (e.g., "infancy_event_3" -> "3")
  let cardNumber = '1'; // Default fallback
  
  if (currentEvent && currentEvent.id) {
    const idParts = currentEvent.id.split('_');
    if (idParts.length > 2) {
      cardNumber = idParts[idParts.length - 1]; // Get the last part (the number)
    }
  }
  
  const asciiFilePath = `./ascii_output_improved2/${phaseName}_${cardType}_${cardNumber}.txt`;
  console.log(`Loading ASCII art: ${asciiFilePath}`);
  
  // Fetch the ASCII art content from the file
  fetch(asciiFilePath)
    .then(response => response.text())
    .then(text => {
      // Create an inner container that will hold the ASCII art content
      const contentWrapper = document.createElement('div');
      contentWrapper.style.whiteSpace = 'pre';
      contentWrapper.style.display = 'block';
      contentWrapper.style.width = 'fit-content';
      contentWrapper.style.margin = 'auto';
      
      // Set the ASCII text content
      const formattedText = document.createTextNode(text);
      contentWrapper.appendChild(formattedText);
      
      // Clear and append the new content
      asciiArtContainer.innerHTML = '';
      asciiArtContainer.appendChild(contentWrapper);
      
      // Dynamically adjust font size based on content dimensions and device
      const contentWidth = contentWrapper.scrollWidth;
      const contentHeight = contentWrapper.scrollHeight;
      const containerWidth = asciiContainer.clientWidth;
      const containerHeight = asciiContainer.clientHeight;
      
      // Calculate the scale needed to fit the content
      // Adjust scaling based on screen size - give more margin on small screens
      const viewportWidth = window.innerWidth;
      let scaleFactor;
      
      if (viewportWidth < 768) {
        // Mobile - use more conservative scaling
        scaleFactor = 0.85;
      } else if (viewportWidth < 1024) {
        // Tablet
        scaleFactor = 0.90;
      } else {
        // Desktop
        scaleFactor = 0.95;
      }
      
      const widthRatio = containerWidth / contentWidth;
      const heightRatio = containerHeight / contentHeight;
      const scale = Math.min(widthRatio, heightRatio) * scaleFactor;
      
      // Apply the calculated scale
      contentWrapper.style.transform = `scale(${scale})`;
      contentWrapper.style.transformOrigin = 'center';
      
      // Add a fade-in effect
      contentWrapper.style.opacity = '0';
      contentWrapper.style.transition = 'opacity 0.3s ease-in';
      setTimeout(() => {
        contentWrapper.style.opacity = '1';
      }, 50);
    })
    .catch(error => {
      console.error('Failed to load ASCII art:', error);
      asciiArtContainer.textContent = 'ASCII art unavailable';
    });
  
  asciiContainer.appendChild(asciiArtContainer);
  cardContent.appendChild(asciiContainer);
  
  if (currentEvent) {
    const eventTitle = document.createElement('h2');
    eventTitle.className = 'text-xl font-bold mb-4 text-center text-yellow-300';
    eventTitle.textContent = 'RANDOM EVENT';
    cardContent.appendChild(eventTitle);
    
    const eventScenario = document.createElement('p');
    eventScenario.className = 'mb-6 text-lg text-center text-blue-100';
    eventScenario.textContent = currentEvent.scenario;
    cardContent.appendChild(eventScenario);
    
    const eventOutcome = document.createElement('p');
    eventOutcome.className = 'mb-8 text-lg text-center text-blue-200';
    eventOutcome.textContent = currentEvent.leftSnippet;
    cardContent.appendChild(eventOutcome);
  } else {
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center';
    errorMessage.textContent = 'Error: No event found';
    cardContent.appendChild(errorMessage);
  }
  
  const continueButton = createButton('Continue', onContinue, 'w-full max-w-xs mx-auto mt-auto');
  cardContent.appendChild(continueButton);
  
  const eventCard = createCard(cardContent, 'flex-grow mb-4');
  container.appendChild(eventCard);
  
  return container;
}
