export interface Question {
  id: string;
  text: string;
  weight: number;
  isHardStop?: boolean;
  hardStopThreshold?: number; // Score at or below this triggers hard stop
  hardStopMessage?: string;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  maxPoints: number;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  score: number; // 0-5
  weightedScore: number;
}

export interface Evaluation {
  id: string;
  projectName: string;
  description?: string;
  createdAt: string;
  completedAt?: string;
  answers: Answer[];
  totalScore: number;
  decision: Decision;
  hardStopTriggered: boolean;
  hardStopReason?: string;
}

export type Decision = 'LAUNCH' | 'ITERATE' | 'PARK' | 'KILL';

export interface DecisionThreshold {
  min: number;
  max: number;
  decision: Decision;
  label: string;
  description: string;
  color: string;
}

