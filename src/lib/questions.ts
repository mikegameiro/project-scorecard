import { Section, DecisionThreshold } from '@/types/scorecard';

export const SECTIONS: Section[] = [
  {
    id: 'personal-alignment',
    name: 'Personal Alignment',
    description: 'How well does this project align with who you are and what you want?',
    maxPoints: 40,
    questions: [
      {
        id: 'pa-1',
        text: 'I deeply identify with this idea — it feels like an extension of who I am',
        weight: 8,
        isHardStop: true,
        hardStopThreshold: 1,
        hardStopMessage: 'This project is blocked due to low personal identification',
      },
      {
        id: 'pa-2',
        text: 'This project gives me energy when I think about working on it',
        weight: 8,
        isHardStop: true,
        hardStopThreshold: 1,
        hardStopMessage: 'This project is blocked — it drains rather than energizes you',
      },
      {
        id: 'pa-3',
        text: 'I can imagine working on this for 3–5 years without burning out',
        weight: 8,
        isHardStop: true,
        hardStopThreshold: 1,
        hardStopMessage: 'This project is blocked due to insufficient long-term commitment potential',
      },
      {
        id: 'pa-4',
        text: 'This aligns with my long-term vision for my life and career',
        weight: 6,
      },
      {
        id: 'pa-5',
        text: 'I have unique insight or experience that makes me suited for this',
        weight: 5,
      },
      {
        id: 'pa-6',
        text: 'I would be proud to tell people I work on this',
        weight: 5,
      },
    ],
  },
  {
    id: 'market-distribution',
    name: 'Market & Distribution',
    description: 'Can you reach and serve real customers profitably?',
    maxPoints: 30,
    questions: [
      {
        id: 'md-1',
        text: 'I know exactly who my first 100 users are and where to find them',
        weight: 7,
        isHardStop: true,
        hardStopThreshold: 1,
        hardStopMessage: 'No viable distribution path identified — you need to know how to reach users',
      },
      {
        id: 'md-2',
        text: "The problem I'm solving is urgent and painful for my target users",
        weight: 7,
      },
      {
        id: 'md-3',
        text: 'People are already paying for inferior solutions to this problem',
        weight: 6,
      },
      {
        id: 'md-4',
        text: 'I have an unfair advantage in distribution (audience, network, platform)',
        weight: 5,
      },
      {
        id: 'md-5',
        text: 'The market is growing and timing feels right',
        weight: 5,
      },
    ],
  },
  {
    id: 'execution-risk',
    name: 'Execution & Risk',
    description: 'Can you actually build and ship this?',
    maxPoints: 20,
    questions: [
      {
        id: 'er-1',
        text: 'I can build an MVP in less than 3 months with current resources',
        weight: 5,
      },
      {
        id: 'er-2',
        text: 'I understand the core technical challenges and have a plan',
        weight: 4,
      },
      {
        id: 'er-3',
        text: 'I have access to the skills/people needed to execute this',
        weight: 4,
      },
      {
        id: 'er-4',
        text: 'The project has low regulatory/legal/platform risk',
        weight: 4,
      },
      {
        id: 'er-5',
        text: 'I can validate the core hypothesis quickly and cheaply',
        weight: 3,
      },
    ],
  },
  {
    id: 'strategic-upside',
    name: 'Strategic Upside',
    description: "What's the potential if this works?",
    maxPoints: 10,
    questions: [
      {
        id: 'su-1',
        text: 'This could become a significant business (not just a side project)',
        weight: 4,
      },
      {
        id: 'su-2',
        text: 'Success here opens doors to other opportunities I care about',
        weight: 3,
      },
      {
        id: 'su-3',
        text: "Even if it fails, I'll learn valuable skills or make valuable connections",
        weight: 3,
      },
    ],
  },
];

export const DECISION_THRESHOLDS: DecisionThreshold[] = [
  {
    min: 80,
    max: 100,
    decision: 'LAUNCH',
    label: 'Launch',
    description: 'Strong alignment across all dimensions. Go build it.',
    color: '#22c55e',
  },
  {
    min: 65,
    max: 79,
    decision: 'ITERATE',
    label: 'Iterate',
    description: 'Promising but needs refinement. Address weak areas before committing.',
    color: '#eab308',
  },
  {
    min: 50,
    max: 64,
    decision: 'PARK',
    label: 'Park',
    description: 'Not ready yet. Revisit when circumstances change.',
    color: '#f97316',
  },
  {
    min: 0,
    max: 49,
    decision: 'KILL',
    label: 'Kill',
    description: 'Not aligned with your goals or capabilities. Move on.',
    color: '#ef4444',
  },
];

export function getDecision(score: number): DecisionThreshold {
  return DECISION_THRESHOLDS.find(t => score >= t.min && score <= t.max) || DECISION_THRESHOLDS[3];
}

export function calculateScore(answers: { questionId: string; score: number }[]): {
  totalScore: number;
  weightedAnswers: { questionId: string; score: number; weightedScore: number }[];
  hardStopTriggered: boolean;
  hardStopReason?: string;
} {
  const allQuestions = SECTIONS.flatMap(s => s.questions);
  let hardStopTriggered = false;
  let hardStopReason: string | undefined;

  const weightedAnswers = answers.map(answer => {
    const question = allQuestions.find(q => q.id === answer.questionId);
    if (!question) return { ...answer, weightedScore: 0 };

    // Check for hard stop
    if (question.isHardStop && question.hardStopThreshold !== undefined) {
      if (answer.score <= question.hardStopThreshold) {
        hardStopTriggered = true;
        hardStopReason = question.hardStopMessage;
      }
    }

    // Calculate weighted score: (score / 5) * weight
    const weightedScore = (answer.score / 5) * question.weight;
    return { ...answer, weightedScore };
  });

  const totalScore = Math.round(weightedAnswers.reduce((sum, a) => sum + a.weightedScore, 0));

  return {
    totalScore,
    weightedAnswers,
    hardStopTriggered,
    hardStopReason,
  };
}

export function getTotalQuestions(): number {
  return SECTIONS.reduce((sum, s) => sum + s.questions.length, 0);
}
