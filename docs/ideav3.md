Below is an updated version of the AI company management game logic and pseudo-code, incorporating your requests: **adding more cards for variety** and **introducing a feature to track shown cards to prevent repetition**. I’ve built upon the existing structure, expanded the card pools, and added a tracking mechanism to ensure cards aren’t repeated until necessary. This response is self-contained, clear, and structured with markdown for readability.

---

## Game Overview

You are the CEO of an AI company navigating through three phases—**Infancy**, **Growth**, and **Maturity**—over 12 turns. Your objective is to manage eight numerical **factors** representing your company’s status and the broader world. Each turn, a random event occurs, and you make a decision, both affecting your factors. Feedback loops adjust factors based on their interactions, and the game ends in victory if you reach Maturity with strong factor values, or in loss if you stagnate or trigger a catastrophic failure.

### Factors

The game tracks eight factors, each ranging from 0 to 100:

- **Local Factors** (company-specific):
  - **Financial Resources**: Budget (initial: 50).
  - **Human Capital**: Workforce quality (initial: 50).
  - **AI Capability**: AI technology level (initial: 40).
  - **Reputation**: Public perception (initial: 50).
  - **Alignment Progress**: AI safety and ethics (initial: 30).

- **Global Factors** (world state):
  - **Market Dynamics**: Competition and opportunities (initial: 50).
  - **Public Awareness**: Public AI concern (initial: 30).
  - **Governance Structure**: Regulatory environment (initial: 50).

### Phases

Phases progress based on factor thresholds:
- **Infancy**: Default starting phase.
- **Growth**: Requires `AI Capability > 50` and `Financial Resources > 50`.
- **Maturity**: Requires `AI Capability > 70` or `Market Dynamics > 70`.

### Game Flow

Each turn:
1. Determine the current phase.
2. Check for stagnation loss (more than 4 turns in Infancy or Growth).
3. Draw a phase-specific event from unused cards, apply its effect.
4. Present a phase-specific decision from unused cards, resolve the player’s choice.
5. Apply feedback loops.
6. Clamp factors to 0-100.
7. Check for doom loss conditions.
8. In Maturity, check for victory.

The game lasts 12 turns unless ended early by a loss.

### Win and Loss Conditions

- **Victory**: Reach Maturity by turn 12 with:
  - `AI Capability > 70`
  - `Alignment Progress > 60`
  - `Reputation > 50`
  - `Market Dynamics > 70`
  - Outcome: “Victory: You’ve built a successful and responsible AI company!”

- **Neutral Ending**: Survive 12 turns without victory or loss.
  - Outcome: “You survived, but your company’s future is uncertain.”

- **Loss Conditions**:
  - **Stagnation Loss**: Over 4 turns in Infancy or Growth.
    - Outcome: “Stagnation: Your company failed to progress.”
  - **Doom Losses**:
    - `Financial Resources < 0`: “Bankruptcy: Your company runs out of money.”
    - `Reputation < 10`: “Reputation Collapse: Your company is shunned.”
    - `AI Capability > 80` and `Alignment Progress < 40`: “AI Catastrophe: Your AI spirals out of control.”

---

## Improvements

### 1. More Cards for Variety

I’ve expanded the card pools significantly, adding at least 10 event cards and 5 decision cards per phase (previously fewer). Each card now includes an `id` for tracking, a `condition` for context, and varied effects to enhance strategic depth and replayability.

### 2. Tracking Shown Cards

To prevent repetition, I’ve added:
- **Used Card Tracking**: Separate lists (`used_event_ids` and `used_decision_ids`) track the IDs of cards already shown per phase. When drawing, the game prioritizes unused cards. If all eligible cards have been used, the list resets, reshuffling the deck for that phase.
- **Phase-Specific Decks**: Each phase maintains its own card pool, and tracking resets when the deck is exhausted, ensuring variety without overly complex cooldowns.

---

## Pseudo-Code

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
used_event_ids = {"Infancy": [], "Growth": [], "Maturity": []}
used_decision_ids = {"Infancy": [], "Growth": [], "Maturity": []}
```

### Event and Decision Cards

Cards include `id`, `phase`, `condition`, `scenario`, `effect`, and `snippet` (plus `left`/`right` for decisions). Below are expanded examples; full lists would have 10+ events and 5+ decisions per phase.

#### Infancy Phase

```pseudo
event_cards = [
    {
        "id": "infancy_event_1",
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "A rival startup announces a breakthrough.",
        "effect": {"AI Capability": -5, "Market Dynamics": 5},
        "snippet": "Your team feels the pressure to catch up."
    },
    {
        "id": "infancy_event_2",
        "phase": "Infancy",
        "condition": lambda f: f["Financial Resources"] < 30,
        "scenario": "Investors are getting nervous.",
        "effect": {"Financial Resources": -10},
        "snippet": "Funding is tighter than expected."
    },
    {
        "id": "infancy_event_3",
        "phase": "Infancy",
        "condition": lambda f: f["Human Capital"] > 40,
        "scenario": "Your lead developer quits unexpectedly.",
        "effect": {"Human Capital": -10, "AI Capability": -5},
        "snippet": "The loss slows your progress."
    },
    {
        "id": "infancy_event_4",
        "phase": "Infancy",
        "condition": lambda f: f["Reputation"] > 30,
        "scenario": "An angel investor shows interest.",
        "effect": {"Financial Resources": 15},
        "snippet": "A cash infusion boosts your startup."
    },
    {
        "id": "infancy_event_5",
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "A technical breakthrough speeds development.",
        "effect": {"AI Capability": 10},
        "snippet": "Your tech takes a leap forward."
    },
    {
        "id": "infancy_event_6",
        "phase": "Infancy",
        "condition": lambda f: f["Reputation"] < 40,
        "scenario": "Early user feedback is negative.",
        "effect": {"Reputation": -10},
        "snippet": "Your product needs work."
    },
    {
        "id": "infancy_event_7",
        "phase": "Infancy",
        "condition": lambda f: f["Human Capital"] > 50,
        "scenario": "A hackathon yields promising prototypes.",
        "effect": {"AI Capability": 5, "Human Capital": 5},
        "snippet": "Team morale and tech improve."
    },
    {
        "id": "infancy_event_8",
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "Server costs exceed estimates.",
        "effect": {"Financial Resources": -10},
        "snippet": "Unexpected expenses hit hard."
    },
    {
        "id": "infancy_event_9",
        "phase": "Infancy",
        "condition": lambda f: f["AI Capability"] > 40,
        "scenario": "A bug causes incorrect AI outputs.",
        "effect": {"Reputation": -5, "AI Capability": -5},
        "snippet": "Trust in your tech wavers."
    },
    {
        "id": "infancy_event_10",
        "phase": "Infancy",
        "condition": lambda f: f["Alignment Progress"] < 40,
        "scenario": "You receive a small AI safety grant.",
        "effect": {"Financial Resources": 10, "Alignment Progress": 5},
        "snippet": "Ethics research gets a boost."
    }
]

decision_cards = [
    {
        "id": "infancy_decision_1",
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "Choose CTO: technical genius or manager?",
        "left": {"AI Capability": 15, "Human Capital": -5},
        "right": {"Human Capital": 10, "AI Capability": 5},
        "left_snippet": "Tech soars, team struggles.",
        "right_snippet": "Team thrives, tech grows steadily."
    },
    {
        "id": "infancy_decision_2",
        "phase": "Infancy",
        "condition": lambda f: f["Reputation"] > 30,
        "scenario": "Open-source AI or keep it proprietary?",
        "left": {"Reputation": 10, "Public Awareness": 5, "Financial Resources": -10},
        "right": {"Financial Resources": 15, "Reputation": -5},
        "left_snippet": "Community loves it, profits dip.",
        "right_snippet": "Revenue grows, trust dips."
    },
    {
        "id": "infancy_decision_3",
        "phase": "Infancy",
        "condition": lambda f: f["Financial Resources"] > 40,
        "scenario": "Hire developers or upgrade infrastructure?",
        "left": {"Human Capital": 10},
        "right": {"AI Capability": 10},
        "left_snippet": "Team expands.",
        "right_snippet": "Tech improves."
    },
    {
        "id": "infancy_decision_4",
        "phase": "Infancy",
        "condition": lambda f: True,
        "scenario": "Join an accelerator or go solo?",
        "left": {"Human Capital": 10, "Reputation": 5, "Financial Resources": -10},
        "right": {"Financial Resources": 5, "AI Capability": 5},
        "left_snippet": "Mentors help, but it costs.",
        "right_snippet": "Slow and steady progress."
    },
    {
        "id": "infancy_decision_5",
        "phase": "Infancy",
        "condition": lambda f: f["Market Dynamics"] < 50,
        "scenario": "Target niche or broad market?",
        "left": {"Market Dynamics": 10, "Reputation": -5},
        "right": {"Reputation": 10, "Market Dynamics": -5},
        "left_snippet": "Niche success, less fame.",
        "right_snippet": "Broader appeal, less focus."
    }
]
```

#### Growth Phase

```pseudo
event_cards += [
    {
        "id": "growth_event_1",
        "phase": "Growth",
        "condition": lambda f: f["Market Dynamics"] > 50,
        "scenario": "A major tech company enters your niche.",
        "effect": {"Market Dynamics": -10},
        "snippet": "Competition heats up."
    },
    {
        "id": "growth_event_2",
        "phase": "Growth",
        "condition": lambda f: f["AI Capability"] > 60,
        "scenario": "Your AI passes a key benchmark.",
        "effect": {"Reputation": 10, "AI Capability": 5},
        "snippet": "Industry takes notice."
    },
    {
        "id": "growth_event_3",
        "phase": "Growth",
        "condition": lambda f: f["Human Capital"] > 50,
        "scenario": "Employee burnout causes turnover.",
        "effect": {"Human Capital": -10},
        "snippet": "Overwork takes its toll."
    },
    {
        "id": "growth_event_4",
        "phase": "Growth",
        "condition": lambda f: True,
        "scenario": "A funding round closes successfully.",
        "effect": {"Financial Resources": 20},
        "snippet": "Investors back your vision."
    },
    {
        "id": "growth_event_5",
        "phase": "Growth",
        "condition": lambda f: f["Governance Structure"] > 50,
        "scenario": "Regulatory scrutiny increases.",
        "effect": {"Governance Structure": 5, "Financial Resources": -10},
        "snippet": "Compliance costs rise."
    },
    {
        "id": "growth_event_6",
        "phase": "Growth",
        "condition": lambda f: True,
        "scenario": "Featured in a tech blog.",
        "effect": {"Reputation": 10, "Public Awareness": 5},
        "snippet": "Publicity grows."
    },
    {
        "id": "growth_event_7",
        "phase": "Growth",
        "condition": lambda f: f["Market Dynamics"] > 40,
        "scenario": "A partnership deal falls through.",
        "effect": {"Market Dynamics": -10},
        "snippet": "Plans unravel."
    },
    {
        "id": "growth_event_8",
        "phase": "Growth",
        "condition": lambda f: f["Financial Resources"] > 50,
        "scenario": "You win a government contract.",
        "effect": {"Financial Resources": 15, "Governance Structure": 5},
        "snippet": "A big client boosts your status."
    },
    {
        "id": "growth_event_9",
        "phase": "Growth",
        "condition": lambda f: f["Human Capital"] < 40,
        "scenario": "Employees strike over workload.",
        "effect": {"Human Capital": -5, "Reputation": -5},
        "snippet": "Labor unrest hurts you."
    },
    {
        "id": "growth_event_10",
        "phase": "Growth",
        "condition": lambda f: f["AI Capability"] > 50,
        "scenario": "A new AI framework outdates yours.",
        "effect": {"AI Capability": -10},
        "snippet": "You’re falling behind."
    }
]

decision_cards += [
    {
        "id": "growth_decision_1",
        "phase": "Growth",
        "condition": lambda f: f["Market Dynamics"] < 50,
        "scenario": "Pivot to a new market or stay put?",
        "left": {"Market Dynamics": 15, "Financial Resources": -20},
        "right": {"Reputation": 10},
        "left_snippet": "Risky pivot pays off.",
        "right_snippet": "Stability builds trust."
    },
    {
        "id": "growth_decision_2",
        "phase": "Growth",
        "condition": lambda f: f["Human Capital"] > 40,
        "scenario": "Wellness programs or marketing push?",
        "left": {"Human Capital": 10, "Financial Resources": -15},
        "right": {"Reputation": 10, "Market Dynamics": 5, "Financial Resources": -15},
        "left_snippet": "Team morale rises.",
        "right_snippet": "Brand grows stronger."
    },
    {
        "id": "growth_decision_3",
        "phase": "Growth",
        "condition": lambda f: True,
        "scenario": "University collab or internal R&D?",
        "left": {"AI Capability": 10, "Alignment Progress": 5, "Financial Resources": -10},
        "right": {"AI Capability": 10, "Financial Resources": 5},
        "left_snippet": "Research advances safely.",
        "right_snippet": "In-house tech thrives."
    },
    {
        "id": "growth_decision_4",
        "phase": "Growth",
        "condition": lambda f: f["Alignment Progress"] < 50,
        "scenario": "Strict governance or innovation?",
        "left": {"Governance Structure": 10, "Alignment Progress": 10, "AI Capability": -5},
        "right": {"AI Capability": 15, "Alignment Progress": -5},
        "left_snippet": "Safety improves, pace slows.",
        "right_snippet": "Tech leaps, risks rise."
    },
    {
        "id": "growth_decision_5",
        "phase": "Growth",
        "condition": lambda f: f["Financial Resources"] > 50,
        "scenario": "Outsource dev or keep in-house?",
        "left": {"Financial Resources": -20, "Human Capital": 15},
        "right": {"Financial Resources": 10, "Human Capital": -5},
        "left_snippet": "Outsourcing boosts staff.",
        "right_snippet": "Control saves money."
    }
]
```

#### Maturity Phase

```pseudo
event_cards += [
    {
        "id": "maturity_event_1",
        "phase": "Maturity",
        "condition": lambda f: f["Reputation"] > 60,
        "scenario": "A Fortune 500 company adopts your AI.",
        "effect": {"Reputation": 10, "Market Dynamics": 10},
        "snippet": "Your dominance grows."
    },
    {
        "id": "maturity_event_2",
        "phase": "Maturity",
        "condition": lambda f: f["Alignment Progress"] < 50,
        "scenario": "A data breach erodes trust.",
        "effect": {"Reputation": -15, "Financial Resources": -10},
        "snippet": "Security flaws cost you."
    },
    {
        "id": "maturity_event_3",
        "phase": "Maturity",
        "condition": lambda f: f["Governance Structure"] > 60,
        "scenario": "New AI regulations pass.",
        "effect": {"Financial Resources": -15, "Alignment Progress": 10},
        "snippet": "Compliance is expensive but safe."
    },
    {
        "id": "maturity_event_4",
        "phase": "Maturity",
        "condition": lambda f: True,
        "scenario": "Nominated for an innovation award.",
        "effect": {"Reputation": 10},
        "snippet": "Your work is celebrated."
    },
    {
        "id": "maturity_event_5",
        "phase": "Maturity",
        "condition": lambda f: f["AI Capability"] > 70,
        "scenario": "A key patent is granted.",
        "effect": {"AI Capability": 5, "Market Dynamics": 10},
        "snippet": "Your tech is secured."
    },
    {
        "id": "maturity_event_6",
        "phase": "Maturity",
        "condition": lambda f: f["Alignment Progress"] < 40,
        "scenario": "AI bias issues surface.",
        "effect": {"Reputation": -10, "Alignment Progress": -5},
        "snippet": "Ethics concerns mount."
    },
    {
        "id": "maturity_event_7",
        "phase": "Maturity",
        "condition": lambda f: True,
        "scenario": "You establish an AI ethics board.",
        "effect": {"Alignment Progress": 10, "Reputation": 5},
        "snippet": "Responsibility earns praise."
    },
    {
        "id": "maturity_event_8",
        "phase": "Maturity",
        "condition": lambda f: f["Market Dynamics"] > 60,
        "scenario": "A competitor releases a better product.",
        "effect": {"Market Dynamics": -10, "AI Capability": -5},
        "snippet": "You’re losing edge."
    },
    {
        "id": "maturity_event_9",
        "phase": "Maturity",
        "condition": lambda f: f["Financial Resources"] > 70,
        "scenario": "Listed on the stock exchange.",
        "effect": {"Financial Resources": 20, "Reputation": 10},
        "snippet": "Your valuation soars."
    },
    {
        "id": "maturity_event_10",
        "phase": "Maturity",
        "condition": lambda f: True,
        "scenario": "Economic downturn hits.",
        "effect": {"Financial Resources": -15, "Market Dynamics": -10},
        "snippet": "Tough times challenge you."
    }
]

decision_cards += [
    {
        "id": "maturity_decision_1",
        "phase": "Maturity",
        "condition": lambda f: f["Governance Structure"] < 60,
        "scenario": "Lobby for regulations or self-regulate?",
        "left": {"Governance Structure": 10, "Public Awareness": 5, "Financial Resources": -10},
        "right": {"Alignment Progress": 10, "Reputation": -5},
        "left_snippet": "Policy shapes the future.",
        "right_snippet": "Ethics improve internally."
    },
    {
        "id": "maturity_decision_2",
        "phase": "Maturity",
        "condition": lambda f: f["Financial Resources"] > 60,
        "scenario": "Acquire a startup or build an innovation lab?",
        "left": {"AI Capability": 10, "Market Dynamics": 10, "Financial Resources": -20},
        "right": {"AI Capability": 10, "Reputation": 5},
        "left_snippet": "Acquisition expands reach.",
        "right_snippet": "Lab fosters breakthroughs."
    },
    {
        "id": "maturity_decision_3",
        "phase": "Maturity",
        "condition": lambda f: True,
        "scenario": "Enhance AI safety or new applications?",
        "left": {"Alignment Progress": 15, "Financial Resources": -10},
        "right": {"Market Dynamics": 10, "Reputation": 5, "Alignment Progress": -5},
        "left_snippet": "Safety is prioritized.",
        "right_snippet": "Expansion excites markets."
    },
    {
        "id": "maturity_decision_4",
        "phase": "Maturity",
        "condition": lambda f: f["Public Awareness"] < 50,
        "scenario": "Fund AI safety research or marketing?",
        "left": {"Alignment Progress": 10, "Public Awareness": 10, "Financial Resources": -15},
        "right": {"Reputation": 10, "Market Dynamics": 5, "Financial Resources": -10},
        "left_snippet": "Safety gains attention.",
        "right_snippet": "Brand shines brighter."
    },
    {
        "id": "maturity_decision_5",
        "phase": "Maturity",
        "condition": lambda f: f["Market Dynamics"] > 60,
        "scenario": "Form an alliance or compete alone?",
        "left": {"Market Dynamics": 10, "Governance Structure": 5, "Financial Resources": -10},
        "right": {"Financial Resources": 10, "Reputation": -5},
        "left_snippet": "Collaboration strengthens you.",
        "right_snippet": "Independence saves costs."
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
```

### Main Game Loop

```pseudo
for turn in range(1, 13):
    # Determine phase
    current_phase = determine_phase(factors)
    
    # Update phase turns
    if current_phase == previous_phase:
        phase_turns[current_phase] += 1
    else:
        phase_turns[current_phase] = 1
        previous_phase = current_phase
    
    # Check stagnation loss
    if current_phase in ["Infancy", "Growth"] and phase_turns[current_phase] > 4:
        print("Stagnation Loss: Your company failed to progress.")
        break
    
    # Draw and apply event
    event = draw_card(event_cards, current_phase, used_event_ids, factors)
    if event:
        print("Event:", event["scenario"])
        apply_effect(factors, event["effect"])
        print(event["snippet"])
    else:
        print("No events triggered this turn.")
    
    # Draw and present decision
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
    
    # Check doom loss
    if factors["Financial Resources"] < 0:
        print("Bankruptcy: Your company runs out of money.")
        break
    if factors["Reputation"] < 10:
        print("Reputation Collapse: Your company is shunned.")
        break
    if factors["AI Capability"] > 80 and factors["Alignment Progress"] < 40:
        print("AI Catastrophe: Your AI spirals out of control.")
        break
    
    # Display state (optional)
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

- **Variety**: With 10 events and 5 decisions per phase (expandable further), the game offers diverse scenarios. Conditions ensure context-specific triggers, enhancing replayability.
- **Repetition Prevention**: The `used_event_ids` and `used_decision_ids` dictionaries track shown cards per phase. Cards are drawn without replacement until the pool is exhausted, then reset, ensuring no repeats until necessary.
- **Scalability**: Add more cards by extending the `event_cards` and `decision_cards` lists with unique `id`s.
- **Balance**: Factor effects and conditions may need tuning to maintain challenge and fairness.

This updated logic delivers a richer, less repetitive experience. Let me know if you’d like further adjustments!