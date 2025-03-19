Below is the complete pseudo-code for *Survive the AI Future: CEO Edition*, a strategic game where you play as the CEO of an AI company. This includes all event cards, decision cards, and the logic for managing phases, flags, factors, feedback loops, and win/loss conditions. The game is designed to be challenging, with only specific sequences of choices leading to victory, while integrating resource management and projects through flags to keep the experience manageable and engaging.

---

## Complete Pseudo-Code for *Survive the AI Future: CEO Edition*

```pseudo
// Initialize hidden factors (range: 0-100)
factors = {
    "AI Capability": 40,           // Measures technological advancement
    "Alignment Progress": 60,      // Tracks efforts to ensure AI safety and ethics
    "Public Awareness": 30,        // Reflects public knowledge and perception of your AI
    "Governance Structure": 50,    // Indicates regulatory and internal control levels
    "Market Dynamics": 50          // Represents market competitiveness and economic conditions
}

// Initialize flags to track company state and projects
flags = {
    "Well-Funded": True,           // Sufficient funding available
    "Talented Team": True,         // A skilled workforce is present
    "Cutting-Edge Tech": False,    // Advanced technology not yet achieved
    "Safety-Focused": False,       // No active safety initiative
    "Global Presence": False,      // Not yet operating internationally
    "Market Leader": False,        // Not yet dominant in the market
    "Public Scandal": False        // No negative publicity
}

// Initialize current phase
current_phase = "Infancy"  // Game begins in the Infancy phase

// Define event cards (random events that introduce unpredictability)
event_cards = [
    {
        "condition": lambda flags, phase: True,
        "scenario": "A rival company announces a major AI breakthrough.",
        "effect": {"factors": {"AI Capability": 10, "Market Dynamics": -5}},
        "snippet": "Your team scrambles to catch up, but the market tightens."
    },
    {
        "condition": lambda flags, phase: phase == "Growth",
        "scenario": "An economic recession hits, reducing available funding.",
        "effect": {"flags": {"Well-Funded": False}},
        "snippet": "Investors pull back, tightening your budget."
    },
    {
        "condition": lambda flags, phase: phase == "Maturity",
        "scenario": "A global AI ethics conference boosts alignment efforts.",
        "effect": {"factors": {"Alignment Progress": 10}},
        "snippet": "The conference inspires a renewed focus on safety."
    },
    {
        "condition": lambda flags, phase: flags["Cutting-Edge Tech"],
        "scenario": "Your advanced tech draws regulatory scrutiny.",
        "effect": {"factors": {"Governance Structure": 15}},
        "snippet": "Regulators take a keen interest in your operations."
    },
    {
        "condition": lambda flags, phase: flags["Public Scandal"],
        "scenario": "The public scandal continues to damage your reputation.",
        "effect": {"factors": {"Public Awareness": 10}},
        "snippet": "The scandal refuses to die down, fueling public outcry."
    },
    {
        "condition": lambda flags, phase: not flags["Talented Team"],
        "scenario": "Your team struggles with a lack of skilled personnel.",
        "effect": {"factors": {"AI Capability": -10}},
        "snippet": "Progress slows as your team lacks the necessary expertise."
    },
    {
        "condition": lambda flags, phase: flags["Global Presence"],
        "scenario": "A geopolitical crisis affects your international operations.",
        "effect": {"factors": {"Market Dynamics": -10}},
        "snippet": "Global tensions disrupt your supply chain and market access."
    }
]

// Define decision cards (phase-specific choices with trade-offs)
decision_cards = [
    // Infancy Phase Decisions
    {
        "phase": "Infancy",
        "condition": lambda flags: flags["Well-Funded"],
        "scenario": "You can invest heavily in early research.",
        "left": {"factors": {"AI Capability": 15, "Alignment Progress": -10}, "flags": {"Well-Funded": False}},
        "right": {"factors": {"Alignment Progress": 10}, "flags": {"Safety-Focused": True}},
        "left_snippet": "The investment boosts your tech, but safety lags and funds run low.",
        "right_snippet": "You focus on safety, earning trust but slowing progress."
    },
    {
        "phase": "Infancy",
        "condition": lambda flags: True,
        "scenario": "A journalist offers to cover your startup.",
        "left": {"factors": {"Public Awareness": 15}, "flags": {"Public Scandal": True}},
        "right": {"factors": {"Public Awareness": -5}},
        "left_snippet": "The coverage boosts visibility but risks a scandal.",
        "right_snippet": "You decline, keeping a low profile."
    },
    {
        "phase": "Infancy",
        "condition": lambda flags: not flags["Talented Team"],
        "scenario": "You can prioritize hiring top talent.",
        "left": {"flags": {"Talented Team": True}},
        "right": {"factors": {"AI Capability": 10}},
        "left_snippet": "Hiring the best minds boosts your capabilities.",
        "right_snippet": "You focus on immediate tech gains."
    },
    // Growth Phase Decisions
    {
        "phase": "Growth",
        "condition": lambda flags: flags["Talented Team"],
        "scenario": "Your team proposes a bold new AI feature.",
        "left": {"factors": {"AI Capability": 20, "Alignment Progress": -15}, "flags": {"Cutting-Edge Tech": True}},
        "right": {"factors": {"Alignment Progress": 10, "Public Awareness": 5}},
        "left_snippet": "The feature wows the market but raises ethical concerns.",
        "right_snippet": "You prioritize safety, gaining public trust."
    },
    {
        "phase": "Growth",
        "condition": lambda flags: flags["Well-Funded"],
        "scenario": "You can expand into international markets.",
        "left": {"factors": {"Market Dynamics": 15}, "flags": {"Global Presence": True, "Well-Funded": False}},
        "right": {"factors": {"Governance Structure": 10}},
        "left_snippet": "The expansion boosts your reach but drains your funds.",
        "right_snippet": "You focus on compliance, avoiding risks."
    },
    {
        "phase": "Growth",
        "condition": lambda flags: True,
        "scenario": "A major corporation offers a partnership.",
        "left": {"factors": {"Market Dynamics": 10}, "flags": {"Well-Funded": True}},
        "right": {"factors": {"AI Capability": 15}, "flags": {"Cutting-Edge Tech": True}},
        "left_snippet": "The partnership boosts your market position and funding.",
        "right_snippet": "You decline, focusing on independent tech development."
    },
    // Maturity Phase Decisions
    {
        "phase": "Maturity",
        "condition": lambda flags: flags["Global Presence"],
        "scenario": "A global treaty proposes strict AI regulations.",
        "left": {"factors": {"Governance Structure": -10}, "flags": {"Market Leader": True}},
        "right": {"factors": {"Governance Structure": 15, "AI Capability": -10}},
        "left_snippet": "You lobby against the treaty, gaining market share but risking chaos.",
        "right_snippet": "Supporting the treaty builds trust but slows your tech."
    },
    {
        "phase": "Maturity",
        "condition": lambda flags: flags["Cutting-Edge Tech"],
        "scenario": "Your AI is ready for a major public deployment.",
        "left": {"factors": {"Public Awareness": 20, "Alignment Progress": -15}, "flags": {"Market Leader": True}},
        "right": {"factors": {"Alignment Progress": 10, "Public Awareness": -10}},
        "left_snippet": "The deployment is a success, but ethical concerns mount.",
        "right_snippet": "You delay to address safety, losing some public interest."
    },
    {
        "phase": "Maturity",
        "condition": lambda flags: flags["Safety-Focused"],
        "scenario": "You can lead an industry-wide safety initiative.",
        "left": {"factors": {"Alignment Progress": 15, "Governance Structure": 10}},
        "right": {"factors": {"Market Dynamics": 10, "AI Capability": 10}},
        "left_snippet": "The initiative boosts safety and governance but diverts resources.",
        "right_snippet": "You focus on your own growth, maintaining market leadership."
    }
]

// Function to determine the current phase based on flags and factors
function determine_phase(flags, factors):
    if flags["Market Leader"] or factors["AI Capability"] > 70:
        return "Maturity"
    elif (flags["Well-Funded"] and flags["Talented Team"]) or factors["AI Capability"] > 50:
        return "Growth"
    else:
        return "Infancy"

// Function to apply feedback loops (dynamic adjustments to factors)
function apply_feedback_loops(factors, flags):
    if flags["Safety-Focused"]:
        factors["Alignment Progress"] += 5      // Safety focus improves alignment
    if flags["Public Scandal"]:
        factors["Public Awareness"] += 10       // Scandals increase public scrutiny
    if factors["Public Awareness"] > 70:
        factors["Governance Structure"] += 5    // High awareness drives regulation
    if factors["Market Dynamics"] > 70:
        factors["AI Capability"] += 5           // Strong market boosts tech
        factors["Alignment Progress"] -= 5      // But diverts from safety
    if factors["AI Capability"] > 80:
        factors["Public Awareness"] += 10       // Advanced tech draws attention

// Function to check Doom Loss conditions (catastrophic failure)
function check_doom(factors, flags):
    if factors["AI Capability"] > 80 and factors["Alignment Progress"] < 40:
        return True, "Your AI spirals out of control, unleashing chaos."
    if factors["Public Awareness"] < 20 and factors["AI Capability"] > 60:
        return True, "A disaster strikes an unprepared world."
    if flags["Public Scandal"] and factors["Public Awareness"] > 80:
        return True, "The scandal destroys your company’s reputation."
    return False, ""

// Function to check Stagnation Loss conditions (company failure)
function check_stagnation(factors, flags):
    if factors["Governance Structure"] > 80 and factors["AI Capability"] < 40:
        return True, "Overregulation chokes your progress."
    if not flags["Well-Funded"] and factors["Market Dynamics"] < 30:
        return True, "Your company runs out of funding and stagnates."
    if not flags["Talented Team"] and factors["AI Capability"] < 40:
        return True, "Without a skilled team, your tech falls behind."
    return False, ""

// Function to check victory conditions
function check_victory(factors, flags):
    if factors["AI Capability"] > 70 and factors["Alignment Progress"] > 60 and flags["Safety-Focused"] and flags["Market Leader"] and not flags["Public Scandal"]:
        return True, "You’ve steered your company to a thriving AI future!"
    else:
        return False, "You survived, but your company’s future is uncertain."

// Main game loop: 12 turns
for turn in range(1, 13):
    // Determine the current phase
    current_phase = determine_phase(flags, factors)
    
    // Draw and apply a random event card if conditions are met
    available_events = [event for event in event_cards if event["condition"](flags, current_phase)]
    if available_events:
        event = random.choice(available_events)
        print("Event:", event["scenario"])
        if "factors" in event["effect"]:
            for factor in event["effect"]["factors"]:
                factors[factor] += event["effect"]["factors"][factor]
        if "flags" in event["effect"]:
            for flag in event["effect"]["flags"]:
                flags[flag] = event["effect"]["flags"][flag]
        print(event["snippet"])
    
    // Filter and draw a decision card based on phase and flags
    available_decisions = [card for card in decision_cards if card["phase"] == current_phase and card["condition"](flags)]
    if not available_decisions:
        print("No decisions remain. The future stagnates.")
        break
    card = random.choice(available_decisions)
    print("Turn", turn, ":", card["scenario"])
    
    // Player selects left or right option
    choice = input("Choose left (1) or right (2): ")
    if choice == "1":
        effects = card["left"]
        snippet = card["left_snippet"]
    elif choice == "2":
        effects = card["right"]
        snippet = card["right_snippet"]
    else:
        print("Invalid choice. Try again.")
        continue
    
    // Apply the effects of the player's choice
    if "factors" in effects:
        for factor in effects["factors"]:
            factors[factor] += effects["factors"][factor]
    if "flags" in effects:
        for flag in effects["flags"]:
            flags[flag] = effects["flags"][flag]
    
    // Apply feedback loops
    apply_feedback_loops(factors, flags)
    
    // Clamp factors to 0-100 range
    for factor in factors:
        factors[factor] = max(0, min(100, factors[factor]))
    
    // Check for loss conditions
    doom, doom_message = check_doom(factors, flags)
    if doom:
        print("Doom Loss:", doom_message)
        break
    stagnation, stagnation_message = check_stagnation(factors, flags)
    if stagnation:
        print("Stagnation Loss:", stagnation_message)
        break
    
    // Display narrative feedback
    print(snippet)

// Check victory condition after all turns (if no early loss)
else:
    victory, victory_message = check_victory(factors, flags)
    if victory:
        print("Victory:", victory_message)
    else:
        print(victory_message)
```

---

## Game Overview

### **Objective**
You are the CEO of an AI company tasked with surviving and thriving over 12 turns. Your goal is to achieve a winning state by balancing technological advancement (AI Capability) and safety (Alignment Progress), while navigating market conditions, public perception, and regulations. Victory requires specific factor thresholds and flags, but random choices rarely succeed—strategic planning is key.

### **Core Mechanics**
- **Factors**: Five hidden metrics (0-100) that define the game state:
  - **AI Capability**: Technological progress.
  - **Alignment Progress**: Safety and ethical alignment.
  - **Public Awareness**: Public knowledge of your AI.
  - **Governance Structure**: Regulatory and internal controls.
  - **Market Dynamics**: Market competitiveness.
- **Flags**: Boolean states (e.g., "Well-Funded", "Safety-Focused") that track resources, projects, and company status, influencing decisions and events.
- **Phases**: Three stages (Infancy, Growth, Maturity) determined by flags and factors, shifting the focus of challenges.
- **Event Cards**: Random events that alter factors or flags, adding unpredictability.
- **Decision Cards**: Phase-specific choices with two options, each with trade-offs affecting factors and flags.
- **Feedback Loops**: Automatic factor adjustments each turn based on flags and thresholds, simulating a dynamic world.
- **Win/Loss Conditions**: Strict criteria for victory, doom, or stagnation, ensuring a challenging experience.

---

## Key Features

### **1. Phases**
- **Infancy**: Starting phase, focused on building foundations.
- **Growth**: Triggered by "Well-Funded" and "Talented Team" or AI Capability > 50, emphasizing scaling.
- **Maturity**: Reached with "Market Leader" or AI Capability > 70, focusing on sustainability and leadership.

### **2. Event Cards**
- Seven unique events, such as rival breakthroughs, economic recessions, or regulatory scrutiny, each with conditions, effects, and narrative feedback.

### **3. Decision Cards**
- Nine cards (three per phase), offering dilemmas like investing in tech vs. safety, expanding globally vs. staying compliant, or deploying AI vs. refining it.

### **4. Feedback Loops**
- Examples:
  - "Safety-Focused" increases Alignment Progress by 5 per turn.
  - High Public Awareness (>70) boosts Governance Structure.
  - High Market Dynamics (>70) accelerates AI Capability but reduces Alignment Progress.

### **5. Win/Loss Conditions**
- **Victory**: AI Capability > 70, Alignment Progress > 60, "Safety-Focused", "Market Leader", and no "Public Scandal".
- **Doom Losses**: E.g., AI Capability > 80 and Alignment Progress < 40 (AI catastrophe).
- **Stagnation Losses**: E.g., Not "Well-Funded" and Market Dynamics < 30 (financial collapse).

---

This pseudo-code provides a fully playable framework for *Survive the AI Future: CEO Edition*. It’s balanced to be difficult yet winnable with careful strategy, using flags to streamline resource and project management. Enjoy leading your AI company to glory—or doom!