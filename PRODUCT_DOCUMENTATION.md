# Project Scorecard — Complete Product Documentation

**Version:** 1.0.0  
**Last Updated:** January 5, 2026  
**Status:** Live in Production

---

## Table of Contents

1. [Product Scope & Features](#1-product-scope--features)
2. [Target ICP Assumptions](#2-target-icp-assumptions)
3. [Content Structure & Messaging](#3-content-structure--messaging)
4. [SEO Setup & Current State](#4-seo-setup--current-state)
5. [Technical Stack & Codebase](#5-technical-stack--codebase)
6. [IDE, Tooling & Deployment](#6-ide-tooling--deployment)
7. [Constraints, Shortcuts & Known Limitations](#7-constraints-shortcuts--known-limitations)

---

## 1. Product Scope & Features

### 1.1 Core Concept

Project Scorecard is a **decision gate tool** that helps founders evaluate whether to launch, iterate, park, or kill a project idea. It uses a weighted scoring system (0–100) combining personal alignment with business viability.

**Philosophy:** Fast, opinionated, frictionless. Not a planning tool — a decision tool.

### 1.2 Implemented Features (v1)

#### ✅ Project Creation
- Project name (required)
- Optional short description
- Auto-generated unique ID
- Timestamp tracking (created, completed)

#### ✅ Scorecard Evaluation
- **19 fixed questions** across 4 sections
- Each question scored 0–5 via:
  - Quick-select number buttons (0, 1, 2, 3, 4, 5)
  - Slider input with visual feedback
  - Emoji indicators per score level
- Section-by-section wizard flow
- Progress indicator showing current section

#### ✅ Scoring Logic
- Weighted scoring system (weights hidden from user)
- Total score calculated as: `Σ (score/5 × weight)`
- Maximum possible score: 100 points

#### ✅ Decision Output
| Score Range | Decision | Color |
|-------------|----------|-------|
| 80–100 | **LAUNCH** | Green |
| 65–79 | **ITERATE** | Yellow |
| 50–64 | **PARK** | Orange |
| 0–49 | **KILL** | Red |

#### ✅ Hard Stop System
Critical questions that auto-block projects if scored ≤1:
- "I deeply identify with this idea" 
- "This project gives me energy"
- "I can imagine working on this for 3–5 years"
- "I know exactly who my first 100 users are"

Hard stops override the numeric score and force a KILL decision with explicit warning message.

#### ✅ Results Display
- Large score number with color coding
- Decision label (Launch/Iterate/Park/Kill)
- Hard stop warning banner (if triggered)
- Expandable section-by-section breakdown
- Visual score bars per section

#### ✅ Data Persistence
- All evaluations saved to browser localStorage
- Evaluations list on homepage
- Resume incomplete evaluations
- Delete evaluations
- No account required

#### ✅ Navigation & UX
- Wizard flow with Previous/Next navigation
- Section progress dots
- Back to home from any screen
- Responsive design (mobile-friendly)

### 1.3 Question Structure

#### Section A: Personal Alignment (40 points max)
| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I deeply identify with this idea — it feels like an extension of who I am | 8 | Yes (≤1) |
| 2 | This project gives me energy when I think about working on it | 8 | Yes (≤1) |
| 3 | I can imagine working on this for 3–5 years without burning out | 8 | Yes (≤1) |
| 4 | This aligns with my long-term vision for my life and career | 6 | No |
| 5 | I have unique insight or experience that makes me suited for this | 5 | No |
| 6 | I would be proud to tell people I work on this | 5 | No |

#### Section B: Market & Distribution (30 points max)
| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I know exactly who my first 100 users are and where to find them | 7 | Yes (≤1) |
| 2 | The problem I'm solving is urgent and painful for my target users | 7 | No |
| 3 | People are already paying for inferior solutions to this problem | 6 | No |
| 4 | I have an unfair advantage in distribution (audience, network, platform) | 5 | No |
| 5 | The market is growing and timing feels right | 5 | No |

#### Section C: Execution & Risk (20 points max)
| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | I can build an MVP in less than 3 months with current resources | 5 | No |
| 2 | I understand the core technical challenges and have a plan | 4 | No |
| 3 | I understand the core technical challenges and have a plan | 4 | No |
| 4 | The project has low regulatory/legal/platform risk | 4 | No |
| 5 | I can validate the core hypothesis quickly and cheaply | 3 | No |

#### Section D: Strategic Upside (10 points max)
| # | Question | Weight | Hard Stop |
|---|----------|--------|-----------|
| 1 | This could become a significant business (not just a side project) | 4 | No |
| 2 | Success here opens doors to other opportunities I care about | 3 | No |
| 3 | Even if it fails, I'll learn valuable skills or make valuable connections | 3 | No |

### 1.4 Explicit Non-Goals (v1)
- ❌ User accounts / authentication
- ❌ Collaboration features
- ❌ Analytics dashboards
- ❌ AI suggestions or feedback
- ❌ Custom weights or questions
- ❌ Gamification
- ❌ Sharing / export
- ❌ Templates per project type

---

## 2. Target ICP Assumptions

### 2.1 Primary User
**Solo Founder / Indie Hacker**
- Building multiple project ideas
- Needs to prioritize ruthlessly
- Values speed over comprehensiveness
- Self-aware about personal alignment issues
- Experienced enough to answer business viability questions

### 2.2 User Context
- Evaluating a new idea before committing time/resources
- Re-evaluating an existing project that's struggling
- Deciding between multiple competing ideas
- Checking personal alignment after burnout concerns

### 2.3 Psychographic Assumptions
- **Values honesty over optimism** — wants hard truths
- **Time-constrained** — needs fast decisions, not lengthy analysis
- **Self-directed** — doesn't need hand-holding or explanations
- **Repeat user** — will evaluate multiple projects over time
- **Reflective** — willing to honestly assess personal fit

### 2.4 Usage Assumptions
- Completes full evaluation in **< 10 minutes**
- Uses tool **2-5 times per month** during active ideation
- Accesses from **desktop primarily** (laptop during planning sessions)
- Values **privacy** — doesn't want to create accounts or share data

### 2.5 Future ICP Expansion (Not Built Yet)
- Early-stage startup teams (need collaboration)
- Accelerator/incubator programs (need batch evaluation)
- Venture scouts (need pattern analysis)

---

## 3. Content Structure & Messaging

### 3.1 Brand Voice
- **Direct** — No fluff, no motivation speak
- **Opinionated** — Takes a stance on what matters
- **Honest** — Designed to surface hard truths
- **Minimal** — Says less, means more

### 3.2 Key Messages

#### Homepage
- **Headline:** "Project Scorecard"
- **Subhead:** "A weighted scoring system to help you decide which projects to launch or kill."
- **Tagline:** "Fast. Opinionated. Honest."
- **CTA:** "Evaluate a New Project"
- **Footer:** "Built for founders who need to make hard decisions."

#### Evaluation Flow
- Section headers describe the dimension being evaluated
- Questions are statements the user rates agreement with
- No explanatory text or help content (assumes user understands)

#### Results Page
- Score displayed prominently (large number)
- Decision label is clear and unambiguous
- Hard stop warnings are explicit and blocking
- Section breakdown available but collapsed by default

### 3.3 Microcopy
| Element | Copy |
|---------|------|
| Score 0 | "Not at all" 😶 |
| Score 1 | "Barely" 😕 |
| Score 2 | "Somewhat" 😐 |
| Score 3 | "Moderately" 🙂 |
| Score 4 | "Strongly" 😊 |
| Score 5 | "Absolutely" 🔥 |
| CTA Primary | "Begin Evaluation" |
| Navigation | "← Previous" / "Next →" |
| Final CTA | "Get My Score →" |
| Hard Stop | "⛔ Hard Stop Triggered" |

### 3.4 Content Not Yet Created
- Landing page with value proposition
- About/methodology page explaining the framework
- Blog content for SEO
- Email capture / newsletter
- Social proof / testimonials

---

## 4. SEO Setup & Current State

### 4.1 Current Implementation

#### Meta Tags (via Next.js Metadata API)
```typescript
title: "Project Scorecard — Launch or Kill Decision Tool"
description: "A weighted scoring system to help founders decide which projects to launch or kill based on personal alignment and business viability."
```

#### Technical SEO
- ✅ Server-side rendering (Next.js App Router)
- ✅ Clean URL structure (`/evaluate/[id]`, `/result/[id]`)
- ✅ Semantic HTML (proper heading hierarchy)
- ✅ Mobile responsive
- ❌ No sitemap.xml
- ❌ No robots.txt
- ❌ No structured data (JSON-LD)
- ❌ No Open Graph / Twitter cards
- ❌ No canonical URLs configured

### 4.2 URL Structure
| Page | URL Pattern |
|------|-------------|
| Home | `/` |
| New Evaluation | `/evaluate/[unique-id]` |
| Results | `/result/[unique-id]` |

### 4.3 SEO Gaps & Recommendations

#### Immediate (Should Add)
1. **robots.txt** — Allow crawling
2. **sitemap.xml** — Submit to search engines
3. **Open Graph tags** — For social sharing
4. **Favicon** — Brand presence in tabs/bookmarks

#### Future (Content-Driven SEO)
1. Landing page with keyword-optimized content
2. Blog posts targeting:
   - "how to evaluate startup ideas"
   - "should I pursue this project"
   - "founder project fit"
   - "kill your darlings startups"
3. Methodology page explaining the scoring framework
4. Comparison pages vs other frameworks (ICE, RICE, etc.)

### 4.4 Analytics
- ❌ No analytics implemented
- Recommended: Vercel Analytics (privacy-friendly, zero-config)
- Alternative: Plausible, Fathom, or PostHog

---

## 5. Technical Stack & Codebase

### 5.1 Technology Choices

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.1.1 |
| Language | TypeScript | Latest |
| Styling | Tailwind CSS | v4 |
| Runtime | React | 19 |
| Build Tool | Turbopack | Built-in |
| Package Manager | npm | - |

### 5.2 Repository Access

| Resource | URL |
|----------|-----|
| GitHub Repository | https://github.com/mikegameiro/project-scorecard |
| Production URL | https://project-scorecard.vercel.app |
| Local Dev | http://localhost:3000 |

### 5.3 Project Structure

```
project-scorecard/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage (evaluation list)
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── evaluate/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Evaluation wizard
│   │   └── result/
│   │       └── [id]/
│   │           └── page.tsx    # Results display
│   ├── components/
│   │   ├── QuestionCard.tsx    # Question display + scoring
│   │   ├── ScoreSlider.tsx     # 0-5 input component
│   │   └── ProgressBar.tsx     # Section progress indicator
│   ├── lib/
│   │   ├── questions.ts        # Question definitions + scoring logic
│   │   └── storage.ts          # localStorage helpers
│   └── types/
│       └── scorecard.ts        # TypeScript interfaces
├── public/                     # Static assets (empty)
├── .vercel/                    # Vercel project config
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── vercel.json
├── README.md
└── PRODUCT_DOCUMENTATION.md    # This file
```

### 5.4 Key Files Explained

#### `src/lib/questions.ts`
Contains all business logic:
- `SECTIONS` — Array of all questions with weights
- `DECISION_THRESHOLDS` — Score ranges and outcomes
- `calculateScore()` — Weighted scoring algorithm
- `getDecision()` — Maps score to decision
- Hard stop detection logic

#### `src/lib/storage.ts`
localStorage abstraction:
- `getEvaluations()` — List all saved evaluations
- `saveEvaluation()` — Create or update
- `getEvaluation(id)` — Fetch single evaluation
- `deleteEvaluation(id)` — Remove evaluation
- `generateId()` — Create unique IDs

#### `src/types/scorecard.ts`
TypeScript definitions:
- `Question` — Question structure with weight, hard stop config
- `Section` — Section grouping
- `Answer` — User's response with weighted score
- `Evaluation` — Complete evaluation record
- `Decision` — Union type of outcomes

### 5.5 Data Model

#### Evaluation Object (localStorage)
```typescript
{
  id: string;                    // "eval-1704067200000-abc123"
  projectName: string;           // "AI Writing Assistant"
  description?: string;          // Optional description
  createdAt: string;             // ISO timestamp
  completedAt?: string;          // ISO timestamp (when finished)
  answers: Answer[];             // Array of responses
  totalScore: number;            // 0-100
  decision: Decision;            // "LAUNCH" | "ITERATE" | "PARK" | "KILL"
  hardStopTriggered: boolean;    // Whether blocked
  hardStopReason?: string;       // Explanation if blocked
}
```

#### Answer Object
```typescript
{
  questionId: string;    // "pa-1", "md-2", etc.
  score: number;         // 0-5 (user input)
  weightedScore: number; // Calculated: (score/5) × weight
}
```

### 5.6 Styling Architecture

#### Design Tokens (CSS Variables)
Defined in `globals.css` via Tailwind's `@theme`:
- **Colors:** bg-primary, surface, accent-warm, text-primary/secondary/muted
- **Fonts:** Outfit (sans), Instrument Serif (display), JetBrains Mono (mono)
- **Decision colors:** launch (green), iterate (yellow), park (orange), kill (red)

#### Custom Utility Classes
- `.bg-gradient-animated` — Subtle animated background
- `.glow-*` — Color-coded glow effects for results
- `.font-display` — Serif font for headings
- `.score-display` — Monospace for numbers
- `.animate-fade-in`, `.animate-slide-up`, `.animate-scale-in` — Entry animations

### 5.7 Dependencies

#### Production
```json
{
  "next": "latest",
  "react": "latest",
  "react-dom": "latest"
}
```

#### Development
```json
{
  "@tailwindcss/postcss": "latest",
  "@types/node": "latest",
  "@types/react": "latest",
  "autoprefixer": "latest",
  "postcss": "latest",
  "tailwindcss": "latest",
  "typescript": "latest"
}
```

**Note:** Minimal dependencies by design. No state management library, no UI component library, no form library.

---

## 6. IDE, Tooling & Deployment

### 6.1 Development Environment

| Tool | Purpose |
|------|---------|
| **Cursor IDE** | Primary development environment |
| **Claude** | AI pair programming assistant |
| **Node.js** | JavaScript runtime |
| **npm** | Package management |

### 6.2 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Default ports:
- Development: `http://localhost:3000`
- If 3000 busy: Auto-assigns next available

### 6.3 Version Control

| Aspect | Configuration |
|--------|---------------|
| Platform | GitHub |
| Repository | `mikegameiro/project-scorecard` |
| Default Branch | `main` |
| Branch Protection | None configured |
| CI/CD | Via Vercel (auto-deploy on push) |

### 6.4 Deployment Pipeline

```
Local Development
       ↓
   git push
       ↓
GitHub Repository (main branch)
       ↓
Vercel Auto-Deploy (triggered by webhook)
       ↓
Production: project-scorecard.vercel.app
```

#### Vercel Configuration
- **Framework Preset:** Next.js (auto-detected)
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Node Version:** 18.x (default)
- **Environment Variables:** None required

### 6.5 Deployment URLs

| Environment | URL |
|-------------|-----|
| Production | https://project-scorecard.vercel.app |
| Preview (per PR) | Auto-generated `*.vercel.app` URLs |

### 6.6 Monitoring & Observability

Currently implemented:
- ❌ No error tracking (recommend: Sentry)
- ❌ No analytics (recommend: Vercel Analytics)
- ❌ No uptime monitoring
- ✅ Vercel deployment logs available in dashboard

---

## 7. Constraints, Shortcuts & Known Limitations

### 7.1 Technical Constraints

#### No Database
- All data stored in browser localStorage
- Data doesn't sync across devices
- Data lost if browser storage cleared
- No backup/export functionality
- **Rationale:** Faster to ship, no infrastructure cost, privacy-first

#### No Authentication
- No user accounts
- No login required
- Anyone with URL can access
- **Rationale:** Reduces friction, faster to ship, privacy-first

#### Client-Side Only Data
- Evaluation IDs are in URLs (shareable but meaningless without localStorage)
- Results pages require original browser to view full data
- **Rationale:** Simplicity over features

### 7.2 UX Shortcuts

#### No Onboarding
- Assumes user understands the framework
- No tooltips or help text on questions
- No explanation of scoring methodology
- **Rationale:** Target user is sophisticated, values speed

#### No Edit After Completion
- Once submitted, evaluations are read-only
- Must re-evaluate to change answers
- **Rationale:** Encourages thoughtful first pass, simpler data model

#### No Comments/Notes
- Can't add context to individual answers
- No free-text fields beyond project description
- **Rationale:** Keeps it fast, avoids scope creep

### 7.3 Known Bugs & Issues

#### Font Rendering (Accessibility Tree)
- In Playwright/browser automation testing, the letter "s" appears as spaces
- This is a **testing tool artifact**, not a visual bug
- Actual browser rendering is correct
- **Status:** Won't fix (testing environment issue)

#### Form Submission with Browser Automation
- React controlled inputs don't always receive events from automation
- Required using `ref` pattern for uncontrolled inputs
- **Status:** Fixed with workaround

### 7.4 Technical Debt

| Item | Description | Priority |
|------|-------------|----------|
| No error boundaries | App crashes show raw error | Medium |
| No loading states | Some transitions feel abrupt | Low |
| No input validation | Relies on HTML5 validation | Low |
| Hardcoded strings | No i18n preparation | Low |
| No tests | Zero test coverage | Medium |

### 7.5 Security Considerations

#### Current State
- No sensitive data collected
- No authentication = no auth vulnerabilities
- localStorage only (no server-side data)
- HTTPS enforced by Vercel

#### If Adding Database Later
- Will need authentication
- Will need input sanitization
- Will need rate limiting
- Will need data encryption considerations

### 7.6 Performance Notes

#### Current Performance
- **Bundle size:** Minimal (no heavy dependencies)
- **First Load JS:** ~85KB (Next.js baseline)
- **Lighthouse Score:** Not measured yet
- **Core Web Vitals:** Not measured yet

#### Optimization Opportunities
- Add `loading="lazy"` to images (none currently)
- Implement route prefetching
- Add service worker for offline support
- Optimize font loading with `next/font`

### 7.7 Accessibility Status

#### Implemented
- Semantic HTML structure
- Proper heading hierarchy
- Form labels associated with inputs
- Color contrast (dark theme)
- Keyboard navigation (native browser)

#### Not Implemented
- ARIA labels on custom components
- Skip navigation link
- Focus management on route changes
- Screen reader testing
- Reduced motion support

### 7.8 Browser Support

#### Tested
- Chrome (latest) ✅
- Safari (latest) — Not explicitly tested

#### Expected to Work
- Firefox, Edge (modern versions)
- Mobile browsers (responsive design)

#### Not Supported
- Internet Explorer
- Browsers without localStorage
- Browsers without CSS custom properties

---

## Appendix: Future Roadmap (Not Committed)

### Phase 2: Polish
- [ ] Add favicon and OG images
- [ ] Implement analytics
- [ ] Add error tracking
- [ ] Create landing page with SEO content
- [ ] Add export to PDF/image

### Phase 3: Persistence
- [ ] Optional Supabase integration
- [ ] User accounts (magic link)
- [ ] Cross-device sync
- [ ] Evaluation history

### Phase 4: Collaboration
- [ ] Share evaluations via link
- [ ] Team workspaces
- [ ] Compare evaluations side-by-side

### Phase 5: Intelligence
- [ ] Pattern analysis across evaluations
- [ ] AI-powered feedback
- [ ] Custom scoring frameworks

---

*Document generated: January 5, 2026*  
*Built with: Next.js, Tailwind CSS, Vercel*  
*Repository: github.com/mikegameiro/project-scorecard*

