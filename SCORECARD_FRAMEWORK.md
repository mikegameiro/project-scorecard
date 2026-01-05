# Project Launch Scorecard — Framework Reference

A weighted scoring system (0–100) to evaluate projects based on personal alignment and business viability.

---

## Scoring Overview

| Score | Decision | Meaning |
|-------|----------|---------|
| 80–100 | **LAUNCH** | Strong alignment across all dimensions. Go build it. |
| 65–79 | **ITERATE** | Promising but needs refinement. Address weak areas before committing. |
| 50–64 | **PARK** | Not ready yet. Revisit when circumstances change. |
| 0–49 | **KILL** | Not aligned with your goals or capabilities. Move on. |

**Hard Stop Rule:** If any critical question (marked ⚠️) scores ≤1, the project is automatically blocked regardless of total score.

---

## Section 1: Personal Alignment

**Maximum Points:** 40  
**Purpose:** How well does this project align with who you are and what you want?

| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I deeply identify with this idea — it feels like an extension of who I am | 8 | ⚠️ Yes |
| 2 | This project gives me energy when I think about working on it | 8 | ⚠️ Yes |
| 3 | I can imagine working on this for 3–5 years without burning out | 8 | ⚠️ Yes |
| 4 | This aligns with my long-term vision for my life and career | 6 | No |
| 5 | I have unique insight or experience that makes me suited for this | 5 | No |
| 6 | I would be proud to tell people I work on this | 5 | No |

**Section Total:** 40 points (40% of final score)

---

## Section 2: Market & Distribution

**Maximum Points:** 30  
**Purpose:** Can you reach and serve real customers profitably?

| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I know exactly who my first 100 users are and where to find them | 7 | ⚠️ Yes |
| 2 | The problem I'm solving is urgent and painful for my target users | 7 | No |
| 3 | People are already paying for inferior solutions to this problem | 6 | No |
| 4 | I have an unfair advantage in distribution (audience, network, platform) | 5 | No |
| 5 | The market is growing and timing feels right | 5 | No |

**Section Total:** 30 points (30% of final score)

---

## Section 3: Execution & Risk

**Maximum Points:** 20  
**Purpose:** Can you actually build and ship this?

| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I can build an MVP in less than 3 months with current resources | 5 | No |
| 2 | I understand the core technical challenges and have a plan | 4 | No |
| 3 | I have access to the skills/people needed to execute this | 4 | No |
| 4 | The project has low regulatory/legal/platform risk | 4 | No |
| 5 | I can validate the core hypothesis quickly and cheaply | 3 | No |

**Section Total:** 20 points (20% of final score)

---

## Section 4: Strategic Upside

**Maximum Points:** 10  
**Purpose:** What's the potential if this works?

| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | This could become a significant business (not just a side project) | 4 | No |
| 2 | Success here opens doors to other opportunities I care about | 3 | No |
| 3 | Even if it fails, I'll learn valuable skills or make valuable connections | 3 | No |

**Section Total:** 10 points (10% of final score)

---

## Calculation Method

### Per Question
```
Weighted Score = (User Score / 5) × Question Weight
```

**Example:** If you score a question with weight 8 as "4 out of 5":
```
Weighted Score = (4 / 5) × 8 = 6.4 points
```

### Total Score
```
Total Score = Sum of all Weighted Scores (rounded to nearest integer)
```

### Hard Stop Check
Before applying the score-based decision, check all hard stop questions:
- If ANY hard stop question has score ≤ 1 → **Decision = KILL** (regardless of total score)
- Display specific warning message for the triggered hard stop

---

## Hard Stop Messages

| Question | Trigger | Message |
|----------|---------|---------|
| "I deeply identify with this idea" | Score ≤ 1 | "This project is blocked due to low personal identification" |
| "This project gives me energy" | Score ≤ 1 | "This project is blocked — it drains rather than energizes you" |
| "I can work on this for 3–5 years" | Score ≤ 1 | "This project is blocked due to insufficient long-term commitment potential" |
| "I know who my first 100 users are" | Score ≤ 1 | "No viable distribution path identified — you need to know how to reach users" |

---

## Score Input Scale

| Score | Label | Emoji |
|-------|-------|-------|
| 0 | Not at all | 😶 |
| 1 | Barely | 😕 |
| 2 | Somewhat | 😐 |
| 3 | Moderately | 🙂 |
| 4 | Strongly | 😊 |
| 5 | Absolutely | 🔥 |

---

## Quick Reference: All Questions

### Personal Alignment (40 pts)
1. ⚠️ I deeply identify with this idea — it feels like an extension of who I am
2. ⚠️ This project gives me energy when I think about working on it
3. ⚠️ I can imagine working on this for 3–5 years without burning out
4. This aligns with my long-term vision for my life and career
5. I have unique insight or experience that makes me suited for this
6. I would be proud to tell people I work on this

### Market & Distribution (30 pts)
1. ⚠️ I know exactly who my first 100 users are and where to find them
2. The problem I'm solving is urgent and painful for my target users
3. People are already paying for inferior solutions to this problem
4. I have an unfair advantage in distribution (audience, network, platform)
5. The market is growing and timing feels right

### Execution & Risk (20 pts)
1. I can build an MVP in less than 3 months with current resources
2. I understand the core technical challenges and have a plan
3. I have access to the skills/people needed to execute this
4. The project has low regulatory/legal/platform risk
5. I can validate the core hypothesis quickly and cheaply

### Strategic Upside (10 pts)
1. This could become a significant business (not just a side project)
2. Success here opens doors to other opportunities I care about
3. Even if it fails, I'll learn valuable skills or make valuable connections

---

**Total:** 19 questions | **Max Score:** 100 points | **Hard Stops:** 4 questions

