'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Evaluation } from '@/types/scorecard';
import { getEvaluation } from '@/lib/storage';
import { getDecision, SECTIONS } from '@/lib/questions';

export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const data = getEvaluation(resolvedParams.id);
    if (!data || !data.completedAt) {
      router.push('/');
      return;
    }
    setEvaluation(data);
  }, [resolvedParams.id, router]);

  if (!evaluation) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-warm border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const decision = getDecision(evaluation.totalScore);
  const effectiveDecision = evaluation.hardStopTriggered ? 'KILL' : decision.decision;
  
  const getGlowClass = () => {
    if (evaluation.hardStopTriggered) return 'glow-red';
    switch (effectiveDecision) {
      case 'LAUNCH': return 'glow-green';
      case 'ITERATE': return 'glow-yellow';
      case 'PARK': return 'glow-orange';
      case 'KILL': return 'glow-red';
      default: return '';
    }
  };

  const getDecisionColor = () => {
    if (evaluation.hardStopTriggered) return '#ef4444';
    return decision.color;
  };

  // Calculate section scores
  const sectionScores = SECTIONS.map(section => {
    let earned = 0;
    section.questions.forEach(q => {
      const answer = evaluation.answers.find(a => a.questionId === q.id);
      if (answer) {
        earned += answer.weightedScore;
      }
    });
    return {
      name: section.name,
      maxPoints: section.maxPoints,
      earned: Math.round(earned * 10) / 10,
      percentage: Math.round((earned / section.maxPoints) * 100),
    };
  });

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Evaluations
        </button>

        {/* Project name */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-medium text-text-primary mb-2">
            {evaluation.projectName}
          </h1>
          {evaluation.description && (
            <p className="text-text-secondary">{evaluation.description}</p>
          )}
        </div>

        {/* Score card */}
        <div 
          className={`relative overflow-hidden rounded-3xl bg-surface border border-border p-8 md:p-12 mb-8 animate-scale-in ${getGlowClass()}`}
        >
          {/* Background decoration */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl"
            style={{ backgroundColor: getDecisionColor() }}
          />
          
          <div className="relative">
            {/* Hard stop warning */}
            {evaluation.hardStopTriggered && (
              <div className="mb-8 p-4 rounded-xl bg-decision-kill/10 border border-decision-kill/30 animate-slide-up">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⛔</span>
                  <div>
                    <h3 className="font-medium text-decision-kill mb-1">Hard Stop Triggered</h3>
                    <p className="text-sm text-text-secondary">
                      {evaluation.hardStopReason || 'Critical alignment issue detected'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Score display */}
            <div className="text-center mb-8">
              <div 
                className="score-display text-8xl md:text-9xl font-bold mb-4"
                style={{ 
                  color: getDecisionColor(),
                  textShadow: `0 0 60px ${getDecisionColor()}40`
                }}
              >
                {evaluation.hardStopTriggered ? (
                  <span className="text-6xl md:text-7xl">BLOCKED</span>
                ) : (
                  evaluation.totalScore
                )}
              </div>
              
              {!evaluation.hardStopTriggered && (
                <p className="text-text-muted">out of 100</p>
              )}
            </div>

            {/* Decision label */}
            <div className="text-center mb-8">
              <div 
                className="inline-block px-8 py-3 rounded-full text-2xl md:text-3xl font-display italic"
                style={{ 
                  backgroundColor: `${getDecisionColor()}15`,
                  color: getDecisionColor(),
                }}
              >
                {evaluation.hardStopTriggered ? 'Kill' : decision.label}
              </div>
            </div>

            {/* Decision description */}
            <p className="text-center text-text-secondary text-lg max-w-md mx-auto">
              {evaluation.hardStopTriggered 
                ? "This project has critical misalignment that must be addressed before proceeding."
                : decision.description}
            </p>
          </div>
        </div>

        {/* Section breakdown */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface/50 border border-border-subtle hover:border-border transition-colors"
          >
            <span className="font-medium text-text-primary">Score Breakdown</span>
            <svg 
              className={`w-5 h-5 text-text-muted transition-transform ${showDetails ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDetails && (
            <div className="mt-4 space-y-4 animate-fade-in">
              {sectionScores.map((section) => (
                <div key={section.name} className="p-4 rounded-xl bg-surface/30 border border-border-subtle">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-secondary">{section.name}</span>
                    <span className="font-mono text-text-primary">
                      {section.earned} / {section.maxPoints}
                    </span>
                  </div>
                  <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${section.percentage}%`,
                        backgroundColor: section.percentage >= 70 ? '#22c55e' 
                          : section.percentage >= 50 ? '#eab308' 
                          : '#ef4444'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <button
            onClick={() => router.push(`/evaluate/${evaluation.id}`)}
            className="flex-1 px-6 py-4 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-all"
          >
            Re-evaluate
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="flex-1 px-6 py-4 rounded-xl bg-accent-warm text-white font-medium hover:bg-accent-muted transition-colors"
          >
            New Evaluation
          </button>
        </div>

        {/* Meta info */}
        <div className="mt-12 pt-8 border-t border-border-subtle text-center text-sm text-text-muted">
          <p>
            Evaluated on {new Date(evaluation.completedAt!).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </main>
  );
}

