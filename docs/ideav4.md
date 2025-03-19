Below is the complete game plan and pseudo-code for the AI company management game, ready for implementation. This is a self-contained description that outlines the game mechanics, structure, and logic in a clear and implementable way. The game simulates managing an AI company through three phases—Infancy, Growth, and Maturity—over 12 turns, balancing eight factors to achieve victory, survive neutrally, or avoid various loss conditions.

---

## Game Overview

You are the CEO of an AI company tasked with guiding it through three phases:
- **Infancy** (Turns 1–4): Establishing your company.
- **Growth** (Turns 5–8): Scaling operations and influence.
- **Maturity** (Turns 9–12): Solidifying your position in the world.

Your objective is to manage eight numerical **factors** (ranging from 0 to 100) that represent your company and the broader environment. Each turn, a random event occurs, you make a decision, and feedback loops adjust your factors based on their interactions. The game ends after 12 turns with a victory if specific factor thresholds are met, a neutral outcome if you survive without winning or losing, or a loss if you trigger a failure condition.

---

## Game Mechanics

### Factors

The game tracks eight factors, split into two categories:

#### Local Factors (Company-Specific)
- **Financial Resources**: Your budget (initial: 50).
- **Human Capital**: Workforce quality and morale (initial: 50).
- **AI Capability**: Level of AI technology (initial: 40).
- **Reputation**: Public perception of your company (initial: 50).
- **Alignment Progress**: AI safety and ethical development (initial: 30).

#### Global Factors (World State)
- **Market Dynamics**: Competition and market opportunities (initial: 50).
- **Public Awareness**: Public concern about AI (initial: 30).
- **Governance Structure**: Strength of AI regulations (initial: 50).

### Phases

The game progresses through three phases based on turn number:
- **Infancy**: Turns 1–4
- **Growth**: Turns 5–8
- **Maturity**: Turns 9–12

### Game Flow

Each turn follows this sequence:
1. Determine the current phase based on the turn number.
2. Draw and apply a phase-specific random event that adjusts factors.
3. Present a phase-specific decision with two choices; apply the chosen effect.
4. Apply feedback loops to simulate factor interactions.
5. Clamp all factors to the 0–100 range.
6. Check for loss conditions (Doom Loss or Player Loss).
7. If Turn 12 is reached (Maturity phase), evaluate victory conditions.

The game lasts 12 turns unless a loss condition ends it early.

### Win, Loss, and Neutral Conditions

- **Victory** (Turn 12):
  - Conditions: `AI Capability > 70`, `Alignment Progress > 60`, `Reputation > 50`, `Market Dynamics > 70`
  - Outcome: “Victory: You’ve built a successful and responsible AI company!”
- **Neutral Ending** (Turn 12):
  - Conditions: Survive without meeting victory conditions or triggering a loss.
  - Outcome: “You survived, but your company’s future is uncertain.”
- **Doom Losses** (Humanity-Ending, checked every turn):
  - `AI Capability > 80` and `Alignment Progress < 40`: “AI Catastrophe: Your AI spirals out of control.”
  - `Public Awareness > 80` and `Governance Structure < 30`: “Public Outcry: Society rejects AI, leading to catastrophic consequences.”
- **Player Losses** (Company-Specific, checked every turn):
  - `Financial Resources < 0`: “Bankruptcy: Your company runs out of money.”
  - `Reputation < 10`: “Reputation Collapse: Your company is shunned.”
  - `Human Capital < 10`: “Talent Drain: Your company loses its workforce.”
  - `Market Dynamics < 10`: “Market Collapse: Your company is outcompeted.”

---

## Pseudo-Code Implementation

Below is the complete pseudo-code, structured for easy translation into a programming language like Python, JavaScript, or C++. It includes initialization, card definitions, helper functions, and the main game loop.

### Initialization

```pseudo
# Initialize factors with starting values
factors = {
    "Financial Resources": 50,
    "Human Capital": 50,
    "AI Capability": 40,
    "Reputation": 50,
    "Alignment Progress": 30,
    "Market Dynamics": 50,
    "Public Awareness": 30,
    "Governance Structure": 50
}

# Track used event and decision IDs to avoid repetition
used_event_ids = {"Infancy": [], "Growth": [], "Maturity": []}
used_decision_ids = {"Infancy": [], "Growth": [], "Maturity": []}
```

### Event and Decision Cards

Cards define the game’s randomness and player choices. Each card has:
- `id`: Unique identifier.
- `phase`: Applicable phase (Infancy, Growth, Maturity).
- `condition`: Lambda function to check eligibility based on factors.
- `scenario`: Description of the event or decision.
- `effect`: Factor adjustments for events; `left`/`right` for decision choices.
- `snippet`: Flavor text for the outcome.

Below is a sample set (2 events and 2 decisions per phase). For a full game, include at least 10 events and 5 decisions per phase.

```pseudo
event_cards = [
    # Infancy Events
    {"id": "infancy_event_1", "phase": "Infancy", "condition": lambda f: True, "scenario": "A rival startup announces a breakthrough.", "effect": {"AI Capability": -5, "Market Dynamics": 5}, "snippet": "Your team feels the pressure to catch up."},
    {"id": "infancy_event_2", "phase": "Infancy", "condition": lambda f: f["Financial Resources"] < 30, "scenario": "Investors are getting nervous.", "effect": {"Financial Resources": -10}, "snippet": "Funding is tighter than expected."},

    # Growth Events
    {"id": "growth_event_1", "phase": "Growth", "condition": lambda f: f["Market Dynamics"] > 50, "scenario": "A major tech company enters your niche.", "effect": {"Market Dynamics": -10}, "snippet": "Competition heats up."},
    {"id": "growth_event_2", "phase": "Growth", "condition": lambda f: f["AI Capability"] > 60, "scenario": "Your AI passes a key benchmark.", "effect": {"Reputation": 10, "AI Capability": 5}, "snippet": "Industry takes notice."},

    # Maturity Events
    {"id": "maturity_event_1", "phase": "Maturity", "condition": lambda f: f["Reputation"] > 60, "scenario": "A Fortune 500 company adopts your AI.", "effect": {"Reputation": 10, "Market Dynamics": 10}, "snippet": "Your dominance grows."},
    {"id": "maturity_event_2", "phase": "Maturity", "condition": lambda f: f["Alignment Progress"] < 50, "scenario": "A data breach erodes trust.", "effect": {"Reputation": -15, "Financial Resources": -10}, "snippet": "Security flaws cost you."}
]

decision_cards = [
    # Infancy Decisions
    {"id": "infancy_decision_1", "phase": "Infancy", "condition": lambda f: True, "scenario": "Choose CTO: technical genius or manager?", "left": {"AI Capability": 15, "Human Capital": -5}, "right": {"Human Capital": 10, "AI Capability": 5}, "left_snippet": "Tech soars, team struggles.", "right_snippet": "Team thrives, tech grows steadily."},
    {"id": "infancy_decision_2", "phase": "Infancy", "condition": lambda f: f["Reputation"] > 30, "scenario": "Open-source AI or keep it proprietary?", "left": {"Reputation": 10, "Public Awareness": 5, "Financial Resources": -10}, "right": {"Financial Resources": 15, "Reputation": -5}, "left_snippet": "Community loves it, profits dip.", "right_snippet": "Revenue grows, trust dips."},

    # Growth Decisions
    {"id": "growth_decision_1", "phase": "Growth", "condition": lambda f: f["Market Dynamics"] < 50, "scenario": "Pivot to a new market or stay put?", "left": {"Market Dynamics": 15, "Financial Resources": -20}, "right": {"Reputation": 10}, "left_snippet": "Risky pivot pays off.", "right_snippet": "Stability builds trust."},
    {"id": "growth_decision_2", "phase": "Growth", "condition": lambda f: f["Human Capital"] > 40, "scenario": "Wellness programs or marketing push?", "left": {"Human Capital": 10, "Financial Resources": -15}, "right": {"Reputation": 10, "Market Dynamics": 5, "Financial Resources": -15}, "left_snippet": "Team morale rises.", "right_snippet": "Brand grows stronger."},

    # Maturity Decisions
    {"id": "maturity_decision_1", "phase": "Maturity", "condition": lambda f: f["Governance Structure"] < 60, "scenario": "Lobby for regulations or self-regulate?", "left": {"Governance Structure": 10, "Public Awareness": 5, "Financial Resources": -10}, "right": {"Alignment Progress": 10, "Reputation": -5}, "left_snippet": "Policy shapes the future.", "right_snippet": "Ethics improve internally."},
    {"id": "maturity_decision_2", "phase": "Maturity", "condition": lambda f: f["Financial Resources"] > 60, "scenario": "Acquire a startup or build an innovation lab?", "left": {"AI Capability": 10, "Market Dynamics": 10, "Financial Resources": -20}, "right": {"AI Capability": 10, "Reputation": 5}, "left_snippet": "Acquisition expands reach.", "right_snippet": "Lab fosters breakthroughs."}
]
```

### Helper Functions

These functions handle core mechanics like phase determination, factor adjustments, and card drawing.

```pseudo
# Determine the current phase based on turn number
function determine_phase(turn):
    if turn <= 4:
        return "Infancy"
    elif turn <= 8:
        return "Growth"
    else:
        return "Maturity"

# Apply an effect (dictionary of factor changes) to factors
function apply_effect(factors, effect):
    for key in effect:
        factors[key] += effect[key]

# Clamp all factors to the 0–100 range
function clamp_factors(factors):
    for key in factors:
        factors[key] = max(0, min(100, factors[key]))

# Apply feedback loops to simulate factor interactions
function apply_feedback_loops(factors):
    if factors["Public Awareness"] > 70:
        factors["Governance Structure"] += 5
    if factors["AI Capability"] > 70 and factors["Alignment Progress"] < 50:
        factors["Reputation"] -= 10
    if factors["Human Capital"] > 60:
        factors["AI Capability"] += 5
    if factors["Financial Resources"] < 20:
        factors["Human Capital"] -= 5
    if factors["Reputation"] > 70:
        factors["Financial Resources"] += 5
    if factors["Market Dynamics"] > 60:
        factors["AI Capability"] += 3
    if factors["Governance Structure"] > 70 and factors["Alignment Progress"] < 40:
        factors["Reputation"] -= 5

# Draw a card from a list, ensuring no repeats until all eligible cards are used
function draw_card(card_list, phase, used_ids, factors):
    available = [c for c in card_list if c["phase"] == phase and c["condition"](factors)]
    unused = [c for c in available if c["id"] not in used_ids[phase]]
    if unused:
        card = random.choice(unused)
    elif available:
        # Reset used list if all eligible cards have been used
        used_ids[phase] = []
        card = random.choice(available)
    else:
        return None
    used_ids[phase].append(card["id"])
    return card

# Check for loss conditions and return a message if triggered
function check_losses(factors):
    # Doom Losses
    if factors["AI Capability"] > 80 and factors["Alignment Progress"] < 40:
        return "AI Catastrophe: Your AI spirals out of control."
    if factors["Public Awareness"] > 80 and factors["Governance Structure"] < 30:
        return "Public Outcry: Society rejects AI, leading to catastrophic consequences."
    # Player Losses
    if factors["Financial Resources"] < 0:
        return "Bankruptcy: Your company runs out of money."
    if factors["Reputation"] < 10:
        return "Reputation Collapse: Your company is shunned."
    if factors["Human Capital"] < 10:
        return "Talent Drain: Your company loses its workforce."
    if factors["Market Dynamics"] < 10:
        return "Market Collapse: Your company is outcompeted."
    return None
```

### Main Game Loop

```pseudo
# Run the game for 12 turns
for turn in range(1, 13):
    # Determine current phase
    current_phase = determine_phase(turn)
    
    # Draw and apply event
    event = draw_card(event_cards, current_phase, used_event_ids, factors)
    if event:
        print("Event:", event["scenario"])
        apply_effect(factors, event["effect"])
        print(event["snippet"])
    else:
        print("No events triggered this turn.")
    
    # Draw and resolve decision
    decision = draw_card(decision_cards, current_phase, used_decision_ids, factors)
    if decision:
        print("Turn", turn, ":", decision["scenario"])
        choice = input("Choose left (1) or right (2): ")
        if choice == "1":
            apply_effect(factors, decision["left"])
            print(decision["left_snippet"])
        elif choice == "2":
            apply_effect(factors, decision["right"])
            print(decision["right_snippet"])
        else:
            print("Invalid choice, no action taken.")
    else:
        print("No decisions available this turn.")
    
    # Apply feedback loops
    apply_feedback_loops(factors)
    
    # Clamp factors
    clamp_factors(factors)
    
    # Check for losses
    loss_message = check_losses(factors)
    if loss_message:
        print(loss_message)
        break
    
    # Display current state (optional for debugging)
    print("Factors:", factors)
    print("Phase:", current_phase)

# Endgame evaluation (runs if loop completes without breaking)
else:
    if factors["AI Capability"] > 70 and factors["Alignment Progress"] > 60 and factors["Reputation"] > 50 and factors["Market Dynamics"] > 70:
        print("Victory: You’ve built a successful and responsible AI company!")
    else:
        print("You survived, but your company’s future is uncertain.")
```

---

## Implementation Notes

- **Card Variety**: The sample includes 2 events and 2 decisions per phase. Expand to 10 events and 5 decisions per phase for replayability, ensuring unique `id`s.
- **Conditions**: Use `condition` lambdas to tie card eligibility to factor states, adding strategic depth.
- **Feedback Loops**: These rules create dynamic interactions (e.g., high `Public Awareness` strengthens `Governance Structure`).
- **User Interface**: The pseudo-code uses `print` and `input` for simplicity. Enhance with a GUI or detailed text formatting as needed.
- **Scalability**: Add more phases, factors, or cards by extending the existing structure.

This framework is ready to be coded in your preferred language. You can now implement it, populate the card lists, and test the game! Let me know if you need help with specific translations or expansions.