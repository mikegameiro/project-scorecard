# Project Scorecard

A weighted scoring system to help founders decide which projects to launch or kill, based on personal alignment and business viability.

## Features

- **19 Weighted Questions** across 4 key dimensions:
  - Personal Alignment (40 points)
  - Market & Distribution (30 points)
  - Execution & Risk (20 points)
  - Strategic Upside (10 points)

- **Hard Stop Detection**: Automatically flags critical misalignments that should block a project regardless of overall score

- **Clear Decision Outcomes**:
  - 80-100: **LAUNCH** — Strong alignment, go build it
  - 65-79: **ITERATE** — Promising but needs refinement
  - 50-64: **PARK** — Not ready, revisit later
  - 0-49: **KILL** — Move on

- **Local Storage Persistence**: Evaluations are saved locally, no account required

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to use the app.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Storage**: Local Storage (no database required)
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page with evaluation list
│   ├── evaluate/[id]/     # Evaluation wizard
│   └── result/[id]/       # Results page
├── components/
│   ├── QuestionCard.tsx   # Question display component
│   ├── ScoreSlider.tsx    # 0-5 score input
│   └── ProgressBar.tsx    # Section progress indicator
├── lib/
│   ├── questions.ts       # Question definitions & scoring logic
│   └── storage.ts         # Local storage helpers
└── types/
    └── scorecard.ts       # TypeScript definitions
```

## Deployment

This project is configured for deployment on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Deploy

No environment variables required for v1.

## License

MIT

