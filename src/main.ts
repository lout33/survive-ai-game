import './style.css'
import './utility.css'
import { GameState } from './types'
import {
  initializeGame,
  startGame,
  makeChoice,
  proceedToNextTurn
} from './gameEngine'
import {
  createStartScreen,
  createDecisionScreen,
  createEventScreen,
  createVictoryScreen,
  createDoomLossScreen,
  createStagnationLossScreen,
  createNeutralEndingScreen,
  createGameInfoModal
} from './ui'

// Get the app element
const app = document.querySelector<HTMLDivElement>('#app')!

// Add grid overlay to the body for futuristic effect
const gridOverlay = document.createElement('div')
gridOverlay.className = 'grid-overlay'
document.body.appendChild(gridOverlay)

// Initialize game state
let gameState: GameState = initializeGame()
let infoModalVisible = false
let toastTimeout: number | null = null

// Shows the info modal
function showInfoModal() {
  if (!infoModalVisible) return
  
  const modal = createGameInfoModal(() => {
    infoModalVisible = false
    document.body.removeChild(document.querySelector('.fixed.inset-0.bg-black')!)
    render()
  })
  
  document.body.appendChild(modal)
}

// Render function - renders the appropriate UI based on game state
function render() {
  // Clear the app container
  app.innerHTML = ''
  
  // Render based on current screen
  switch (gameState.currentScreen) {
    case 'start':
      app.appendChild(createStartScreen(() => {
        gameState = startGame()
        render()
      }))
      break
      
    case 'decision':
      // Render decision screen with choice handlers
      const decisionScreen = createDecisionScreen(
        gameState,
        () => handleChoice('left'),
        () => handleChoice('right'),
        false // Buttons should not be disabled by default
      )
      app.appendChild(decisionScreen)
      
      // Check if snippetText exists and we need to show a toast (decision feedback only)
      if (gameState.snippetText) {
        showFeedbackToast(gameState.snippetText)
        
        // Now disable the buttons after showing the toast
        const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>
        buttons.forEach(button => {
          button.disabled = true
          button.classList.add('opacity-50', 'cursor-not-allowed')
        })
        
        // Clear the snippet text to prevent showing it again
        gameState = { ...gameState, snippetText: '' }
        
        // Only set timer to proceed if one isn't already set
        if (toastTimeout === null) {
          toastTimeout = window.setTimeout(() => {
            gameState = proceedToNextTurn(gameState)
            toastTimeout = null
            render()
          }, 2300) // Slightly longer than toast display time to ensure smooth transition
        }
      }
      break
      
    case 'event':
      // Render event screen
      app.appendChild(createEventScreen(
        gameState,
        () => {
          // Proceed to decision screen
          gameState = {
            ...gameState,
            currentScreen: 'decision'
          }
          render()
        }
      ))
      break
      
    case 'victory':
      app.appendChild(createVictoryScreen(() => {
        gameState = initializeGame()
        render()
      }))
      break
      
    case 'doomLoss':
      app.appendChild(createDoomLossScreen(
        gameState,
        () => {
          gameState = initializeGame()
          render()
        }
      ))
      break
      
    case 'stagnationLoss':
      app.appendChild(createStagnationLossScreen(
        gameState,
        () => {
          gameState = initializeGame()
          render()
        }
      ))
      break
      
    case 'neutralEnding':
      app.appendChild(createNeutralEndingScreen(
        gameState,
        () => {
          gameState = initializeGame()
          render()
        }
      ))
      break
      
    default:
      console.error('Unknown screen state:', gameState.currentScreen)
  }
}

// Add parallax effect to grid overlay on mouse move
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth
  const y = e.clientY / window.innerHeight
  
  // Small parallax effect
  gridOverlay.style.backgroundPosition = `${x * 20}px ${y * 20}px`
})

// Handle window resize
window.addEventListener('resize', () => {
  // Only re-render if we're in a screen that shows factors (which need responsive layout)
  if (['decision', 'event'].includes(gameState.currentScreen)) {
    render()
  }
})

// Handle player choice
function handleChoice(choice: 'left' | 'right') {
  // Disable buttons immediately to prevent multiple clicks
  const buttons = document.querySelectorAll('.btn') as NodeListOf<HTMLButtonElement>
  buttons.forEach(button => {
    button.disabled = true
    button.classList.add('opacity-50', 'cursor-not-allowed')
  })
  
  // Clear any existing toast timeout to prevent multiple toasts
  if (toastTimeout !== null) {
    clearTimeout(toastTimeout)
    toastTimeout = null
  }
  
  // Clear any existing toast elements
  const toastContainer = document.querySelector('.toast-container')
  if (toastContainer) {
    toastContainer.innerHTML = ''
  }
  
  gameState = makeChoice(gameState, choice)
  render()
}

// Show feedback toast notification
function showFeedbackToast(message: string) {
  // Find the card to insert the toast
  const card = document.querySelector('.card')
  if (!card) return
  
  // Create toast container if it doesn't exist within the card
  let toastContainer = card.querySelector('.toast-container')
  if (!toastContainer) {
    toastContainer = document.createElement('div')
    toastContainer.className = 'toast-container'
    card.appendChild(toastContainer)
  } else {
    // Clear existing toasts
    toastContainer.innerHTML = ''
  }
  
  // Create toast element
  const toast = document.createElement('div')
  toast.className = 'toast-notification slide-in'
  
  const feedbackTitle = document.createElement('div')
  feedbackTitle.className = 'toast-title'
  feedbackTitle.textContent = '📣 OUTCOME'
  toast.appendChild(feedbackTitle)
  
  const messageElement = document.createElement('div')
  messageElement.className = 'toast-message'
  messageElement.textContent = message
  toast.appendChild(messageElement)
  
  // Add toast to container
  toastContainer.appendChild(toast)
  
  // Set timer to remove toast
  setTimeout(() => {
    toast.classList.add('slide-out')
    setTimeout(() => {
      if (toastContainer && toastContainer.contains(toast)) {
        toastContainer.removeChild(toast)
      }
    }, 300)
  }, 2000) // Reduced to 2 seconds
}

// Initial render
render()

// Event delegation for info button
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (target.id === 'game-info-button' || target.closest('#game-info-button')) {
    infoModalVisible = true;
    showInfoModal();
  }
});
