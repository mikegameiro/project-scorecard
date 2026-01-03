import { Evaluation } from '@/types/scorecard';

const STORAGE_KEY = 'project-scorecard-evaluations';

export function getEvaluations(): Evaluation[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveEvaluation(evaluation: Evaluation): void {
  if (typeof window === 'undefined') return;
  const evaluations = getEvaluations();
  const existingIndex = evaluations.findIndex(e => e.id === evaluation.id);
  
  if (existingIndex >= 0) {
    evaluations[existingIndex] = evaluation;
  } else {
    evaluations.unshift(evaluation);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
}

export function getEvaluation(id: string): Evaluation | null {
  const evaluations = getEvaluations();
  return evaluations.find(e => e.id === id) || null;
}

export function deleteEvaluation(id: string): void {
  if (typeof window === 'undefined') return;
  const evaluations = getEvaluations();
  const filtered = evaluations.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function generateId(): string {
  return `eval-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

