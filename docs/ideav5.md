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


### Story Framework 

the story framework, i mean the characters, the story and the overall story understanding, 


### Event Cards and Decision Cards mergin with the story framework


```pseudo
{
  "main_plot": "Lead an AI company from a fledgling startup to a global powerhouse, balancing innovation, ethics, and competition to shape the future of artificial intelligence responsibly.",
  "characters": [
    {
      "name": "You, the CEO",
      "role": "CEO",
      "personality": "Visionary yet adaptable, shaped by your choices",
      "bio": "As the CEO, you steer the company through triumphs and crises, balancing ambition with responsibility."
    },
    {
      "name": "Dr. Alex Chen",
      "role": "Lead AI Researcher",
      "personality": "Brilliant, ambitious, occasionally reckless",
      "bio": "A machine learning prodigy, Dr. Chen drives cutting-edge AI breakthroughs but often pushes ethical and safety boundaries."
    },
    {
      "name": "Maria Gonzalez",
      "role": "CFO",
      "personality": "Pragmatic, cautious, financially astute",
      "bio": "Maria keeps the company solvent, advocating for sustainable growth over risky ventures."
    },
    {
      "name": "James Patel",
      "role": "Head of HR",
      "personality": "Empathetic, collaborative, culture-focused",
      "bio": "James ensures the team thrives, prioritizing morale and talent retention amidst rapid change."
    },
    {
      "name": "Linda Wu",
      "role": "Public Relations Manager",
      "personality": "Charismatic, strategic, media-savvy",
      "bio": "Linda crafts the company’s image, turning challenges into opportunities with clever PR moves."
    },
    {
      "name": "Prof. Evelyn Wright",
      "role": "Ethics Advisor",
      "personality": "Principled, reflective, idealistic",
      "bio": "A moral compass, Prof. Wright insists on safe, ethical AI, often clashing with ambitious timelines."
    },
    {
      "name": "Senator John Doe",
      "role": "Government Liaison",
      "personality": "Diplomatic, pragmatic, politically connected",
      "bio": "Senator Doe navigates regulatory waters, offering opportunities to influence policy—or avoid its constraints."
    },
    {
      "name": "CEO of RivalCo",
      "role": "Competitor CEO",
      "personality": "Aggressive, cunning, ruthless",
      "bio": "Your nemesis leads RivalCo, constantly challenging your market position with bold moves."
    }
  ],
  "story_arc": {
    "Infancy": {
      "focus": "Founding the company, assembling a team, and achieving initial AI breakthroughs",
      "challenges": [
        "Securing initial funding amidst skepticism",
        "Attracting top talent in a competitive field",
        "Balancing speed of development with early safety concerns",
        "Establishing a foothold against emerging rivals"
      ],
      "tone": "Optimistic yet uncertain, a scrappy startup proving itself"
    },
    "Growth": {
      "focus": "Scaling operations, expanding markets, and refining AI technology",
      "challenges": [
        "Managing rapid growth without losing cohesion",
        "Navigating increasing regulatory scrutiny",
        "Countering aggressive competition from RivalCo",
        "Maintaining public trust as visibility grows"
      ],
      "tone": "Dynamic and tense, a rising star under pressure"
    },
    "Maturity": {
      "focus": "Dominating the AI landscape, innovating responsibly, and shaping global AI governance",
      "challenges": [
        "Fending off mature competitors and market saturation",
        "Addressing ethical dilemmas with widespread AI adoption",
        "Influencing international policies and public perception",
        "Securing a lasting legacy for the company"
      ],
      "tone": "Reflective and high-stakes, a leader defining the future"
    }
  },
  "event_cards": [
    # Infancy Events (5 total: 4 original + 1 new)
    {
      "id": "infancy_event_1",
      "phase": "Infancy",
      "condition": lambda f: f["AI Capability"] < 60,
      "scenario": "Dr. Alex Chen bursts into your office, proposing a daring experiment to leapfrog your AI development. 'It’s risky, but the rewards could be massive,' he insists.",
      "effect": {"AI Capability": 10, "Alignment Progress": -5},
      "snippet": "The experiment yields results, but safety concerns emerge.",
      "quote": "This could put us years ahead—or blow up in our faces. Your call, boss."
    },
    {
      "id": "infancy_event_2",
      "phase": "Infancy",
      "condition": lambda f: f["Financial Resources"] < 40,
      "scenario": "Maria Gonzalez, your CFO, warns that investors are tightening their belts after seeing your latest spending reports.",
      "effect": {"Financial Resources": -10},
      "snippet": "Funding dries up as investors demand quicker results.",
      "quote": "We’re burning cash too fast. They won’t wait forever."
    },
    {
      "id": "infancy_event_3",
      "phase": "Infancy",
      "condition": lambda f: f["Human Capital"] < 50,
      "scenario": "James Patel, your Head of HR, reports that the CEO of RivalCo is poaching top AI talent with lavish offers.",
      "effect": {"Human Capital": -5, "Market Dynamics": 5},
      "snippet": "Your team shrinks as RivalCo gains an edge.",
      "quote": "We’re losing good people. We need to fight back—or step up."
    },
    {
      "id": "infancy_event_4",
      "phase": "Infancy",
      "condition": lambda f: f["AI Capability"] > 50,
      "scenario": "Linda Wu, your PR Manager, seizes on a small AI demo to generate buzz in the tech press.",
      "effect": {"Reputation": 10, "Public Awareness": 5},
      "snippet": "Your name starts circulating among industry insiders.",
      "quote": "This is our shot to shine—let’s make them talk about us."
    },
    {
      "id": "infancy_event_5",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "Your first AI prototype fails spectacularly during a demo.",
      "effect": {"Reputation": -10, "AI Capability": 5},
      "snippet": "The failure is embarrassing, but your team learns valuable lessons.",
      "quote": "Failure is just practice for success. – Dr. Chen"
    },

    # Growth Events (5 total: 4 original + 1 new)
    {
      "id": "growth_event_1",
      "phase": "Growth",
      "condition": lambda f: f["Human Capital"] > 40,
      "scenario": "James Patel warns that your rapid expansion is overworking the team, risking burnout.",
      "effect": {"Human Capital": -10},
      "snippet": "Exhausted employees start to disengage.",
      "quote": "We’re growing fast, but our people can’t keep up."
    },
    {
      "id": "growth_event_2",
      "phase": "Growth",
      "condition": lambda f: f["Reputation"] > 50,
      "scenario": "Dr. Alex Chen’s offhand comment about 'AI superiority' sparks a media firestorm, and Linda Wu scrambles to respond.",
      "effect": {"Reputation": -10, "Public Awareness": 10},
      "snippet": "The public debates your intentions as headlines blare.",
      "quote": "Alex, you genius—now I’ve got a mess to clean up!"
    },
    {
      "id": "growth_event_3",
      "phase": "Growth",
      "condition": lambda f: f["Governance Structure"] < 60,
      "scenario": "Senator John Doe alerts you to a new AI regulation that could stall your expansion plans.",
      "effect": {"Governance Structure": 5, "Market Dynamics": -10},
      "snippet": "Red tape slows your momentum.",
      "quote": "Washington’s watching—adapt or get crushed."
    },
    {
      "id": "growth_event_4",
      "phase": "Growth",
      "condition": lambda f: f["Market Dynamics"] > 50,
      "scenario": "The CEO of RivalCo unveils a sleek new AI product, undercutting your market share.",
      "effect": {"Market Dynamics": -10, "Reputation": -5},
      "snippet": "Customers waver as RivalCo steals the spotlight.",
      "quote": "Your time’s up—welcome to the big leagues."
    },
    {
      "id": "growth_event_5",
      "phase": "Growth",
      "condition": lambda f: True,
      "scenario": "A new data privacy law passes, requiring costly compliance measures.",
      "effect": {"Financial Resources": -15, "Governance Structure": 10},
      "snippet": "Compliance drains your funds but aligns you with new standards.",
      "quote": "The law is the law—adapt or pay the price. – Senator Doe"
    },

    # Maturity Events (5 total: 4 original + 1 new)
    {
      "id": "maturity_event_1",
      "phase": "Maturity",
      "condition": lambda f: f["Alignment Progress"] < 50,
      "scenario": "Prof. Evelyn Wright uncovers a flaw in your AI that could harm users, urging an immediate recall.",
      "effect": {"Reputation": -15, "Alignment Progress": -5},
      "snippet": "The world questions your commitment to safety.",
      "quote": "We can’t hide this—it’s our responsibility to fix it."
    },
    {
      "id": "maturity_event_2",
      "phase": "Maturity",
      "condition": lambda f: f["Reputation"] > 60,
      "scenario": "The CEO of RivalCo launches a brutal ad campaign accusing your AI of unethical practices.",
      "effect": {"Reputation": -10, "Market Dynamics": 5},
      "snippet": "Public trust wavers as RivalCo gains traction.",
      "quote": "They’re playing dirty—we need to hit back or rise above."
    },
    {
      "id": "maturity_event_3",
      "phase": "Maturity",
      "condition": lambda f: f["Governance Structure"] < 70,
      "scenario": "Senator John Doe secures you a keynote spot at a global AI governance summit.",
      "effect": {"Governance Structure": 10, "Public Awareness": 5},
      "snippet": "Your voice shapes the future of AI policy.",
      "quote": "This is your chance to lead the world—don’t waste it."
    },
    {
      "id": "maturity_event_4",
      "phase": "Maturity",
      "condition": lambda f: f["AI Capability"] > 70,
      "scenario": "Dr. Alex Chen’s team achieves a groundbreaking AI advancement, drawing global attention.",
      "effect": {"AI Capability": 10, "Reputation": 10, "Public Awareness": 5},
      "snippet": "Your company sets a new industry standard.",
      "quote": "We’ve just changed the game—again."
    },
    {
      "id": "maturity_event_5",
      "phase": "Maturity",
      "condition": lambda f: True,
      "scenario": "You’re invited to set global AI standards at a UN summit.",
      "effect": {"Governance Structure": 15, "Public Awareness": 10},
      "snippet": "Your influence grows, shaping the future of AI.",
      "quote": "This is your moment to lead the world. – Senator Doe"
    }
  ],
  "decision_cards": [
    # Infancy Decisions (7 total: 3 original + 4 new)
    {
      "id": "infancy_decision_1",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "James Patel urges you to define your hiring strategy: prioritize raw talent or team cohesion?",
      "left": {"AI Capability": 15, "Human Capital": -5},
      "right": {"Human Capital": 10, "Reputation": 5},
      "left_snippet": "Your tech leaps forward, but team morale takes a hit.",
      "right_snippet": "The team gels, earning quiet respect.",
      "quote": "A genius can innovate, but a team builds the future."
    },
    {
      "id": "infancy_decision_2",
      "phase": "Infancy",
      "condition": lambda f: f["Financial Resources"] > 20,
      "scenario": "Prof. Evelyn Wright pushes for early AI safety research, but Maria Gonzalez warns it’ll delay investor milestones.",
      "left": {"Alignment Progress": 10, "Financial Resources": -10},
      "right": {"AI Capability": 10, "Reputation": -5},
      "left_snippet": "Investors grumble, but your ethical stance strengthens.",
      "right_snippet": "Tech surges ahead, but whispers of recklessness spread.",
      "quote": "Safety now saves us later—trust me."
    },
    {
      "id": "infancy_decision_3",
      "phase": "Infancy",
      "condition": lambda f: f["Reputation"] < 60,
      "scenario": "Linda Wu suggests either a flashy PR stunt or a modest tech conference debut to put your company on the map.",
      "left": {"Reputation": 15, "Financial Resources": -10},
      "right": {"Reputation": 10, "AI Capability": 5},
      "left_snippet": "The spotlight shines, but your wallet feels lighter.",
      "right_snippet": "Experts take note of your steady progress.",
      "quote": "Go big or go smart—either way, we need eyes on us."
    },
    {
      "id": "infancy_decision_4",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "An investor offers a large sum but wants a say in product direction.",
      "left": {"Financial Resources": 20, "AI Capability": -5},
      "right": {"Reputation": 5},
      "left_snippet": "Cash flows in, but your vision is compromised.",
      "right_snippet": "You maintain control, impressing some with your integrity.",
      "quote": "Money talks, but so does independence. – Maria"
    },
    {
      "id": "infancy_decision_5",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "Choose to focus on a niche market or a broader audience.",
      "left": {"Market Dynamics": 10, "Reputation": -5},
      "right": {"Reputation": 10, "Market Dynamics": -5},
      "left_snippet": "You dominate a small pond, but visibility suffers.",
      "right_snippet": "Wider appeal, but competition is fierce.",
      "quote": "Specialize or generalize—both have risks. – Linda"
    },
    {
      "id": "infancy_decision_6",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "Implement a strict work schedule or a flexible one.",
      "left": {"Human Capital": 10, "Alignment Progress": -5},
      "right": {"Human Capital": 15, "Financial Resources": -5},
      "left_snippet": "Productivity rises, but creativity may stifle.",
      "right_snippet": "Morale boosts, but costs increase.",
      "quote": "Happy workers or efficient workers? – James"
    },
    {
      "id": "infancy_decision_7",
      "phase": "Infancy",
      "condition": lambda f: True,
      "scenario": "Partner with a university for research or with a corporation for resources.",
      "left": {"AI Capability": 10, "Reputation": 5},
      "right": {"Financial Resources": 15, "Alignment Progress": -5},
      "left_snippet": "Academic ties enhance your tech and image.",
      "right_snippet": "Corporate backing fills your coffers but raises ethical questions.",
      "quote": "Knowledge or capital—both are power. – Prof. Wright"
    },

    # Growth Decisions (7 total: 3 original + 4 new)
    {
      "id": "growth_decision_1",
      "phase": "Growth",
      "condition": lambda f: f["Market Dynamics"] < 60,
      "scenario": "Linda Wu proposes chasing RivalCo into a new market or fortifying your current position.",
      "left": {"Market Dynamics": 15, "Financial Resources": -15},
      "right": {"Reputation": 10, "Human Capital": 5},
      "left_snippet": "You gain ground, but the cost is steep.",
      "right_snippet": "Loyalty grows as your team rallies.",
      "quote": "Risk it all or play it safe—your legacy’s on the line."
    },
    {
      "id": "growth_decision_2",
      "phase": "Growth",
      "condition": lambda f: f["Human Capital"] < 60,
      "scenario": "James Patel reports staff poaching by RivalCo. Raise salaries or boost morale with perks?",
      "left": {"Human Capital": 10, "Financial Resources": -15},
      "right": {"Human Capital": 15, "Reputation": 5},
      "left_snippet": "Your team stays, but the budget tightens.",
      "right_snippet": "Morale soars, and your culture shines.",
      "quote": "Pay them more or treat them better—either keeps them here."
    },
    {
      "id": "growth_decision_3",
      "phase": "Growth",
      "condition": lambda f: f["AI Capability"] > 60,
      "scenario": "Dr. Chen wants to rush a new AI model to market, but Prof. Wright demands ethical vetting first.",
      "left": {"AI Capability": 10, "Market Dynamics": 10, "Alignment Progress": -10},
      "right": {"Alignment Progress": 15, "Reputation": 5},
      "left_snippet": "Sales spike, but critics raise alarms.",
      "right_snippet": "Trust grows, though competitors close in.",
      "quote": "Speed wins races; ethics wins trust."
    },
    {
      "id": "growth_decision_4",
      "phase": "Growth",
      "condition": lambda f: True,
      "scenario": "Expand internationally or deepen domestic presence.",
      "left": {"Market Dynamics": 15, "Financial Resources": -20},
      "right": {"Reputation": 10, "Human Capital": 5},
      "left_snippet": "Global reach grows, but logistics strain your budget.",
      "right_snippet": "Local dominance boosts loyalty and team spirit.",
      "quote": "Go wide or dig deep—both have merits. – Linda"
    },
    {
      "id": "growth_decision_5",
      "phase": "Growth",
      "condition": lambda f: f["Market Dynamics"] < 50,
      "scenario": "RivalCo undercuts your prices. Match them or differentiate?",
      "left": {"Market Dynamics": 10, "Financial Resources": -10},
      "right": {"Reputation": 10, "AI Capability": 5},
      "left_snippet": "You stay competitive, but margins shrink.",
      "right_snippet": "Innovation sets you apart, winning discerning customers.",
      "quote": "Fight on price or on value? – CEO of RivalCo"
    },
    {
      "id": "growth_decision_6",
      "phase": "Growth",
      "condition": lambda f: True,
      "scenario": "Invest in employee training or hire experienced professionals.",
      "left": {"Human Capital": 15, "Financial Resources": -10},
      "right": {"AI Capability": 10, "Human Capital": -5},
      "left_snippet": "Your team grows stronger, but it’s costly.",
      "right_snippet": "New talent brings expertise but disrupts cohesion.",
      "quote": "Grow from within or bring in fresh blood? – James"
    },
    {
      "id": "growth_decision_7",
      "phase": "Growth",
      "condition": lambda f: f["Reputation"] < 50,
      "scenario": "Address a minor scandal head-on or let it blow over.",
      "left": {"Reputation": 10, "Public Awareness": 5},
      "right": {"Financial Resources": 5, "Reputation": -5},
      "left_snippet": "Transparency earns trust, but attention lingers.",
      "right_snippet": "Savings, but whispers persist.",
      "quote": "Face the music or hope it fades? – Linda"
    },

    # Maturity Decisions (7 total: 3 original + 4 new)
    {
      "id": "maturity_decision_1",
      "phase": "Maturity",
      "condition": lambda f: f["Alignment Progress"] < 60,
      "scenario": "Senator John Doe offers a government contract for AI safety research, but it’ll slow commercial work.",
      "left": {"Alignment Progress": 15, "Governance Structure": 10, "AI Capability": -5},
      "right": {"Financial Resources": 15, "Reputation": -5},
      "left_snippet": "Safety improves, but innovation lags.",
      "right_snippet": "Profits rise, but critics question your priorities.",
      "quote": "Work with us, and we’ll shape the rules together."
    },
    {
      "id": "maturity_decision_2",
      "phase": "Maturity",
      "condition": lambda f: f["Financial Resources"] > 50,
      "scenario": "Dr. Chen suggests acquiring a startup or building an in-house innovation lab to stay ahead.",
      "left": {"AI Capability": 10, "Market Dynamics": 10, "Financial Resources": -20},
      "right": {"AI Capability": 10, "Reputation": 5, "Human Capital": 5},
      "left_snippet": "The buyout boosts your tech, but integration costs mount.",
      "right_snippet": "Your lab drives breakthroughs and inspires the team.",
      "quote": "Buy them out, or let me build something legendary."
    },
    {
      "id": "maturity_decision_3",
      "phase": "Maturity",
      "condition": lambda f: f["Public Awareness"] > 60,
      "scenario": "Linda Wu proposes addressing rising public AI fears with transparency or a distraction campaign.",
      "left": {"Alignment Progress": 10, "Reputation": 10, "Market Dynamics": -5},
      "right": {"Reputation": 15, "Public Awareness": -10},
      "left_snippet": "Trust grows, though competitors exploit the pause.",
      "right_snippet": "The public’s dazzled, but concerns linger.",
      "quote": "We can win their hearts with truth—or dazzle them with showmanship."
    },
    {
      "id": "maturity_decision_4",
      "phase": "Maturity",
      "condition": lambda f: True,
      "scenario": "Invest in a moonshot project or solidify current successes.",
      "left": {"AI Capability": 20, "Financial Resources": -25},
      "right": {"Market Dynamics": 15, "Reputation": 10},
      "left_snippet": "A gamble that could redefine AI or drain your coffers.",
      "right_snippet": "Steady gains secure your position.",
      "quote": "Dream big or play it safe? – Dr. Chen"
    },
    {
      "id": "maturity_decision_5",
      "phase": "Maturity",
      "condition": lambda f: f["Alignment Progress"] < 70,
      "scenario": "Use AI to solve a global crisis, risking unintended consequences.",
      "left": {"Reputation": 15, "Alignment Progress": -10},
      "right": {"Alignment Progress": 10, "Public Awareness": 5},
      "left_snippet": "You’re hailed as heroes, but critics warn of risks.",
      "right_snippet": "Caution earns respect, but some call it inaction.",
      "quote": "Act now or think twice? – Prof. Wright"
    },
    {
      "id": "maturity_decision_6",
      "phase": "Maturity",
      "condition": lambda f: f["Market Dynamics"] > 70,
      "scenario": "Acquire a competitor or foster competition.",
      "left": {"Market Dynamics": 20, "Reputation": -10},
      "right": {"Reputation": 10, "Market Dynamics": -5},
      "left_snippet": "You monopolize, but antitrust looms.",
      "right_snippet": "Fair play wins praise, but rivals grow.",
      "quote": "Crush them or let them live? – CEO of RivalCo"
    },
    {
      "id": "maturity_decision_7",
      "phase": "Maturity",
      "condition": lambda f: True,
      "scenario": "Lobby for strict AI regulations or advocate for innovation freedom.",
      "left": {"Governance Structure": 15, "AI Capability": -10},
      "right": {"AI Capability": 15, "Governance Structure": -10},
      "left_snippet": "Safety first, but progress slows.",
      "right_snippet": "Unleash potential, but risks rise.",
      "quote": "Control or chaos—which path to choose? – Senator Doe"
    }
  ]
}

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

Summary of Improvements:

Infancy Phase:
Event Cards: Increased from 4 to 5 by adding infancy_event_5 (prototype failure).
Decision Cards: Increased from 3 to 7 by adding infancy_decision_4 (investor influence), infancy_decision_5 (market focus), infancy_decision_6 (work culture), and infancy_decision_7 (partnership choice).

Growth Phase:
Event Cards: Increased from 4 to 5 by adding growth_event_5 (data privacy law).
Decision Cards: Increased from 3 to 7 by adding growth_decision_4 (expansion strategy), growth_decision_5 (price competition), growth_decision_6 (talent management), and growth_decision_7 (scandal response).

Maturity Phase:
Event Cards: Increased from 4 to 5 by adding maturity_event_5 (UN summit invitation).
Decision Cards: Increased from 3 to 7 by adding maturity_decision_4 (moonshot project), maturity_decision_5 (global crisis response), maturity_decision_6 (competitor acquisition), and maturity_decision_7 (policy lobbying).


Notes   
The new cards were designed to reflect the focus, challenges, and tone of each phase, enhancing the strategic depth and narrative variety.
Conditions for new cards use lambda f: True for simplicity where specific triggers weren’t critical, though some include conditional logic (e.g., f["Market Dynamics"] < 50) to align with gameplay dynamics.
The improved JSON maintains the original structure, ensuring compatibility with the existing framework while meeting the requirement of 5 event cards and 7 decision cards per phase.