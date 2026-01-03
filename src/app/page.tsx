'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Evaluation } from '@/types/scorecard';
import { getEvaluations, deleteEvaluation, generateId } from '@/lib/storage';
import { getDecision } from '@/lib/questions';

export default function Home() {
  const router = useRouter();
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setEvaluations(getEvaluations());
    setIsLoading(false);
  }, []);

  const handleNewEvaluation = () => {
    const id = generateId();
    router.push(`/evaluate/${id}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this evaluation?')) {
      deleteEvaluation(id);
      setEvaluations(getEvaluations());
    }
  };

  const handleViewResult = (id: string) => {
    router.push(`/result/${id}`);
  };

  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-border-subtle mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-warm animate-pulse"></span>
            <span className="text-sm text-text-secondary">Decision Gate v1</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-display italic text-text-primary mb-6">
            Project Scorecard
          </h1>
          
          <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
            A weighted scoring system to help you decide which projects to launch or kill.
            <span className="text-text-muted block mt-2">Fast. Opinionated. Honest.</span>
          </p>
        </header>

        {/* New Evaluation CTA */}
        <div className="mb-16 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <button
            onClick={handleNewEvaluation}
            className="w-full group relative overflow-hidden rounded-2xl bg-surface border border-border hover:border-accent-warm/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-warm/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-8 md:p-10 flex items-center justify-between">
              <div className="text-left">
                <h2 className="text-2xl font-medium text-text-primary mb-2">
                  Evaluate a New Project
                </h2>
                <p className="text-text-secondary">
                  Answer 19 questions across 4 dimensions • ~10 minutes
                </p>
              </div>
              <div className="w-14 h-14 rounded-full bg-accent-warm/10 flex items-center justify-center group-hover:bg-accent-warm/20 transition-colors">
                <svg className="w-6 h-6 text-accent-warm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Past Evaluations */}
        {!isLoading && evaluations.length > 0 && (
          <section className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
              Past Evaluations
            </h3>
            
            <div className="space-y-3">
              {evaluations.map((evaluation, index) => {
                const decision = getDecision(evaluation.totalScore);
                const isComplete = evaluation.completedAt;
                
                return (
                  <div
                    key={evaluation.id}
                    onClick={() => isComplete ? handleViewResult(evaluation.id) : router.push(`/evaluate/${evaluation.id}`)}
                    className="group relative rounded-xl bg-surface/50 border border-border-subtle hover:border-border hover:bg-surface transition-all duration-200 cursor-pointer"
                    style={{ animationDelay: `${(index + 3) * 50}ms` }}
                  >
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {isComplete ? (
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center font-mono text-lg font-medium"
                            style={{ 
                              backgroundColor: `${decision.color}15`,
                              color: decision.color 
                            }}
                          >
                            {evaluation.hardStopTriggered ? '⛔' : evaluation.totalScore}
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center">
                            <span className="text-text-muted">•••</span>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-medium text-text-primary group-hover:text-accent-warm transition-colors">
                            {evaluation.projectName || 'Untitled Project'}
                          </h4>
                          <p className="text-sm text-text-muted">
                            {isComplete ? (
                              <>
                                <span style={{ color: decision.color }}>{decision.label}</span>
                                {evaluation.hardStopTriggered && (
                                  <span className="text-decision-kill ml-2">• Hard Stop</span>
                                )}
                              </>
                            ) : (
                              'In progress'
                            )}
                            <span className="mx-2">•</span>
                            {new Date(evaluation.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleDelete(evaluation.id, e)}
                          className="p-2 rounded-lg text-text-muted hover:text-decision-kill hover:bg-decision-kill/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                        <div className="p-2 text-text-muted">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!isLoading && evaluations.length === 0 && (
          <div className="text-center py-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 rounded-full bg-surface mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-text-secondary">No evaluations yet</p>
            <p className="text-text-muted text-sm mt-1">Start by evaluating your first project idea</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border-subtle text-center">
          <p className="text-sm text-text-muted">
            Built for founders who need to make hard decisions.
          </p>
        </footer>
      </div>
    </main>
  );
}

