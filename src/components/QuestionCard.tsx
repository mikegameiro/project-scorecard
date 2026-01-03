'use client';

import { Question } from '@/types/scorecard';
import { ScoreSlider } from './ScoreSlider';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  value: number;
  onChange: (value: number) => void;
}

export function QuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions, 
  value, 
  onChange 
}: QuestionCardProps) {
  return (
    <div className="bg-surface/50 backdrop-blur-sm rounded-2xl border border-border-subtle p-6 md:p-8 animate-scale-in">
      {/* Question header */}
      <div className="flex items-start justify-between mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-bg-secondary text-xs font-mono text-text-muted">
          Q{questionNumber}/{totalQuestions}
        </span>
        
        {question.isHardStop && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-decision-kill/10 text-xs font-medium text-decision-kill">
            <span className="w-1.5 h-1.5 rounded-full bg-decision-kill animate-pulse"></span>
            Critical
          </span>
        )}
      </div>

      {/* Question text */}
      <h3 className="text-xl md:text-2xl font-medium text-text-primary leading-relaxed mb-8">
        {question.text}
      </h3>

      {/* Score slider */}
      <ScoreSlider
        value={value}
        onChange={onChange}
        questionId={question.id}
      />
    </div>
  );
}

