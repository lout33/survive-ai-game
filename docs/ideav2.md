Below is the complete logic and pseudo-code for the AI company management game, incorporating the changes and refinements outlined in the thinking process. This is a self-contained description of the game mechanics, including factors, phases, events, decisions, feedback loops, and win/loss conditions, presented in a clear and structured format using markdown.

---

## Game Overview

In this game, you are the CEO of an AI company navigating through three phases—**Infancy**, **Growth**, and **Maturity**—over 12 turns. Your goal is to manage a set of numerical **factors** that represent your company’s status and the broader world. Each turn, a random event occurs, and you make a decision, both of which adjust your factors. Feedback loops further modify these factors based on their interactions. The game ends in victory if you reach Maturity with strong factor values, or in loss if you stagnate or trigger a catastrophic failure.

### Factors

The game tracks eight factors, each ranging from 0 to 100:

- **Local Factors** (specific to your company):
  - **Financial Resources**: Your company’s budget (initial value: 50).
  - **Human Capital**: The quality of your workforce (initial value: 50).
  - **AI Capability**: The advancement level of your AI technology (initial value: 40).
  - **Reputation**: Public and stakeholder perception of your company (initial value: 50).
  - **Alignment Progress**: How well your AI aligns with safety and ethical standards (initial value: 30).

- **Global Factors** (affecting the game world):
  - **Market Dynamics**: The state of competition and market opportunities (initial value: 50).
  - **Public Awareness**: Public knowledge and concern about AI issues (initial value: 30).
  - **Governance Structure**: The regulatory environment (initial value: 50).

### Phases

The game progresses through three phases based on factor thresholds:
- **Infancy**: Starting phase.
- **Growth**: Requires `AI Capability > 50` and `Financial Resources > 50`.
- **Maturity**: Requires `AI Capability > 70` or `Market Dynamics > 70`.

### Game Flow

Each turn:
1. Determine the current phase.
2. Check for stagnation loss (more than 4 turns in Infancy or Growth).
3. Draw and apply a phase-specific random event.
4. Present and resolve a phase-specific decision with two choices.
5. Apply feedback loops based on factor interactions.
6. Clamp factors to the 0-100 range.
7. Check for doom loss conditions.
8. In Maturity, check for victory conditions.

The game lasts 12 turns unless ended early by a loss condition.

### Win and Loss Conditions

- **Victory**: Reach Maturity by turn 12 and have:
  - `AI Capability > 70`
  - `Alignment Progress > 60`
  - `Reputation > 50`
  - `Market Dynamics > 70`
  - Outcome: “Victory: You’ve built a successful and responsible AI company!”

- **Neutral Ending**: Survive 12 turns without losing or achieving victory.
  - Outcome: “You survived, but your company’s future is uncertain.”

- **Loss Conditions**:
  - **Stagnation Loss**: Spend more than 4 turns in Infancy or Growth without advancing.
    - Outcome: “Stagnation: Your company failed to progress.”
  - **Doom Losses**:
    - `Financial Resources < 0`: “Bankruptcy: Your company runs out of money.”
    - `Reputation < 10`: “Reputation Collapse: Your company is shunned.”
    - `AI Capability > 80` and `Alignment Progress < 40`: “AI Catastrophe: Your AI spirals out of control.”

---

## Pseudo-Code

Below is the complete pseudo-code implementing the game logic.

### Initialization

```pseudo
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

current_phase = "Infancy"
phase_turns = {"Infancy": 0, "Growth": 0, "Maturity": 0}
previous_phase = "Infancy"
```

### Event and Decision Cards

Cards are defined with a phase, condition (lambda function), scenario, effects, and narrative snippets. Below are examples for each phase (more can be added for variety).

#### Infancy Phase

```pseudo
event_cards = [
    {
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "A rival startup announces a breakthrough.",
        "effect": {"AI Capability": -5, "Market Dynamics": 5},
        "snippet": "Your team feels the pressure to catch up."
    },
    {
        "phase": "Infancy",
        "condition": lambda f: f["Financial Resources"] < 30,
        "scenario": "Investors are getting nervous.",
        "effect": {"Financial Resources": -10},
        "snippet": "Funding is tighter than expected."
    },
    {
        "phase": "Infancy",
        "condition": lambda f: f["Human Capital"] > 50,
        "scenario": "Your team discovers a new algorithm.",
        "effect": {"AI Capability": 10},
        "snippet": "A breakthrough boosts your tech."
    }
]

decision_cards = [
    {
        "phase": "Infancy",
        "condition": lambda f: f["Financial Resources"] > 40,
        "scenario": "Invest in marketing or R&D?",
        "left": {"Financial Resources": -20, "Reputation": 15},
        "right": {"Financial Resources": -20, "AI Capability": 10},
        "left_snippet": "Marketing boosts your public image.",
        "right_snippet": "R&D advances your technology."
    },
    {
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "Focus on safety or speed?",
        "left": {"Alignment Progress": 10, "AI Capability": 5},
        "right": {"AI Capability": 15, "Alignment Progress": -5},
        "left_snippet": "Safety first, but progress is slower.",
        "right_snippet": "Rapid development, but risks increase."
    },
    {
        "phase": "Infancy",
        "condition": lambda f: f["Reputation"] < 40,
        "scenario": "Address public concerns or ignore them?",
        "left": {"Reputation": 10, "Public Awareness": 5},
        "right": {"Financial Resources": 10},
        "left_snippet": "Engaging with the public improves trust.",
        "right_snippet": "Ignoring concerns saves money for now."
    }
]
```

#### Growth Phase

```pseudo
event_cards += [
    {
        "phase": "Growth",
        "condition": lambda f: f["Market Dynamics"] > 50,
        "scenario": "A new market opportunity emerges.",
        "effect": {"Financial Resources": 10, "Market Dynamics": 5},
        "snippet": "Your company capitalizes on the opportunity."
    },
    {
        "phase": "Growth",
        "condition": lambda f: f["Reputation"] < 40,
        "scenario": "A whistleblower leaks internal documents.",
        "effect": {"Reputation": -10, "Public Awareness": 10},
        "snippet": "The scandal damages your image."
    },
    {
        "phase": "Growth",
        "condition": lambda f: True,
        "scenario": "An AI conference boosts industry knowledge.",
        "effect": {"AI Capability": 5, "Alignment Progress": 5},
        "snippet": "Your team learns from the best."
    }
]

decision_cards += [
    {
        "phase": "Growth",
        "condition": lambda f: f["Financial Resources"] > 50,
        "scenario": "Expand to a new region or consolidate?",
        "left": {"Financial Resources": -30, "Market Dynamics": 15},
        "right": {"Human Capital": 10, "Reputation": 5},
        "left_snippet": "Expansion increases market share but is costly.",
        "right_snippet": "Consolidation strengthens your core."
    },
    {
        "phase": "Growth",
        "condition": lambda f: f["AI Capability"] > 60,
        "scenario": "Deploy AI in a high-stakes project?",
        "left": {"AI Capability": 10, "Reputation": 15, "Alignment Progress": -5},
        "right": {"Alignment Progress": 10, "AI Capability": 5},
        "left_snippet": "The project succeeds, but safety concerns linger.",
        "right_snippet": "You improve alignment, but progress slows."
    }
]
```

#### Maturity Phase

```pseudo
event_cards += [
    {
        "phase": "Maturity",
        "condition": lambda f: f["Governance Structure"] > 60,
        "scenario": "New regulations are imposed.",
        "effect": {"Financial Resources": -10, "Alignment Progress": 5},
        "snippet": "Compliance costs rise, but safety improves."
    },
    {
        "phase": "Maturity",
        "condition": lambda f: True,
        "scenario": "Your AI sets an industry standard.",
        "effect": {"Reputation": 10, "Market Dynamics": 5},
        "snippet": "Your leadership is recognized."
    }
]

decision_cards += [
    {
        "phase": "Maturity",
        "condition": lambda f: f["Reputation"] > 60,
        "scenario": "Lobby for regulations or focus inward?",
        "left": {"Governance Structure": 10, "Public Awareness": 5},
        "right": {"AI Capability": 10, "Financial Resources": -5},
        "left_snippet": "Shaping policy enhances your influence.",
        "right_snippet": "Internal focus drives innovation."
    }
]
```

### Helper Functions

```pseudo
function determine_phase(factors):
    if factors["AI Capability"] > 70 or factors["Market Dynamics"] > 70:
        return "Maturity"
    elif factors["AI Capability"] > 50 and factors["Financial Resources"] > 50:
        return "Growth"
    else:
        return "Infancy"

function apply_effect(factors, effect):
    for key in effect:
        factors[key] += effect[key]

function clamp_factors(factors):
    for key in factors:
        factors[key] = max(0, min(100, factors[key]))

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
```

### Main Game Loop

```pseudo
for turn in range(1, 13):
    # Determine current phase
    current_phase = determine_phase(factors)
    
    # Update phase turns
    if current_phase == previous_phase:
        phase_turns[current_phase] += 1
    else:
        phase_turns[current_phase] = 1
        previous_phase = current_phase
    
    # Check for stagnation loss
    if current_phase in ["Infancy", "Growth"] and phase_turns[current_phase] > 4:
        print("Stagnation Loss: Your company failed to progress.")
        break
    
    # Draw and apply event
    available_events = [e for e in event_cards if e["phase"] == current_phase and e["condition"](factors)]
    if available_events:
        event = random.choice(available_events)
        print("Event:", event["scenario"])
        apply_effect(factors, event["effect"])
        print(event["snippet"])
    else:
        print("No events triggered this turn.")
    
    # Draw and present decision
    available_decisions = [d for d in decision_cards if d["phase"] == current_phase and d["condition"](factors)]
    if available_decisions:
        decision = random.choice(available_decisions)
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
    
    # Check for doom loss
    if factors["Financial Resources"] < 0:
        print("Bankruptcy: Your company runs out of money.")
        break
    if factors["Reputation"] < 10:
        print("Reputation Collapse: Your company is shunned.")
        break
    if factors["AI Capability"] > 80 and factors["Alignment Progress"] < 40:
        print("AI Catastrophe: Your AI spirals out of control.")
        break
    
    # Display current state (optional for debugging)
    print("Factors:", factors)
    print("Phase:", current_phase)

# Endgame check
else:
    if current_phase == "Maturity" and factors["AI Capability"] > 70 and factors["Alignment Progress"] > 60 and factors["Reputation"] > 50 and factors["Market Dynamics"] > 70:
        print("Victory: You’ve built a successful and responsible AI company!")
    else:
        print("You survived, but your company’s future is uncertain.")
```

---

## Notes

- **Scalability**: More event and decision cards can be added to each phase to increase variety and replayability.
- **Balance**: The feedback loops and thresholds (e.g., phase transitions, win conditions) may need tuning to ensure the game is neither too easy nor too hard.
- **Narrative**: The snippets provide flavor and context, making the game educational and engaging by connecting mechanics to a story.

This pseudo-code encapsulates the complete game logic, ready to be expanded or implemented in a programming language of choice. Let me know if you’d like further refinements or additional details!