'use client';

import { useState, useEffect, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { Evaluation, Answer } from '@/types/scorecard';
import { SECTIONS, calculateScore, getDecision, getTotalQuestions } from '@/lib/questions';
import { saveEvaluation, getEvaluation, generateId } from '@/lib/storage';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionCard } from '@/components/QuestionCard';

type Step = 'info' | 'questions' | 'review';

export default function EvaluatePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [step, setStep] = useState<Step>('info');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Form refs for uncontrolled inputs
  const projectNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  
  // State for project info (set after form submit)
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  
  // Load existing evaluation if available
  useEffect(() => {
    const existing = getEvaluation(resolvedParams.id);
    if (existing) {
      setProjectName(existing.projectName);
      setDescription(existing.description || '');
      if (projectNameRef.current) {
        projectNameRef.current.value = existing.projectName;
      }
      if (descriptionRef.current) {
        descriptionRef.current.value = existing.description || '';
      }
      const answerMap: Record<string, number> = {};
      existing.answers.forEach(a => {
        answerMap[a.questionId] = a.score;
      });
      setAnswers(answerMap);
      if (existing.completedAt) {
        router.push(`/result/${resolvedParams.id}`);
      } else if (existing.projectName) {
        // Resume in progress evaluation
        setStep('questions');
      }
    }
  }, [resolvedParams.id, router]);

  const currentSection = SECTIONS[currentSectionIndex];
  const currentQuestion = currentSection?.questions[currentQuestionIndex];
  const totalQuestions = getTotalQuestions();
  
  // Calculate overall question number
  let overallQuestionNumber = 0;
  for (let i = 0; i < currentSectionIndex; i++) {
    overallQuestionNumber += SECTIONS[i].questions.length;
  }
  overallQuestionNumber += currentQuestionIndex + 1;

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const name = projectNameRef.current?.value?.trim() || '';
    const desc = descriptionRef.current?.value?.trim() || '';
    
    if (!name) {
      projectNameRef.current?.focus();
      return;
    }
    
    setProjectName(name);
    setDescription(desc);
    
    // Save initial evaluation
    const evaluation: Evaluation = {
      id: resolvedParams.id || generateId(),
      projectName: name,
      description: desc,
      createdAt: new Date().toISOString(),
      answers: [],
      totalScore: 0,
      decision: 'KILL',
      hardStopTriggered: false,
    };
    saveEvaluation(evaluation);
    setStep('questions');
  };

  const handleAnswerChange = (questionId: string, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  const handleNext = () => {
    // Move to next question or section
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentSectionIndex < SECTIONS.length - 1) {
      setCurrentSectionIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // All questions answered, go to review
      setStep('review');
    }
    
    // Save progress
    saveProgress();
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSection = SECTIONS[currentSectionIndex - 1];
      setCurrentSectionIndex(prev => prev - 1);
      setCurrentQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const saveProgress = () => {
    const answerList = Object.entries(answers).map(([questionId, score]) => ({
      questionId,
      score,
      weightedScore: 0, // Will be calculated on completion
    }));

    const evaluation: Evaluation = {
      id: resolvedParams.id,
      projectName,
      description,
      createdAt: getEvaluation(resolvedParams.id)?.createdAt || new Date().toISOString(),
      answers: answerList,
      totalScore: 0,
      decision: 'KILL',
      hardStopTriggered: false,
    };
    saveEvaluation(evaluation);
  };

  const handleComplete = () => {
    // Calculate final score
    const answerList = Object.entries(answers).map(([questionId, score]) => ({
      questionId,
      score,
    }));

    const { totalScore, weightedAnswers, hardStopTriggered, hardStopReason } = calculateScore(answerList);
    const decision = getDecision(totalScore);

    const evaluation: Evaluation = {
      id: resolvedParams.id,
      projectName,
      description,
      createdAt: getEvaluation(resolvedParams.id)?.createdAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      answers: weightedAnswers,
      totalScore,
      decision: hardStopTriggered ? 'KILL' : decision.decision,
      hardStopTriggered,
      hardStopReason,
    };
    saveEvaluation(evaluation);
    router.push(`/result/${resolvedParams.id}`);
  };

  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] ?? 3) : 0;

  // Info step
  if (step === 'info') {
    return (
      <main className="min-h-screen px-4 py-12 md:py-20">
        <div className="max-w-xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-display italic text-text-primary mb-3">
              New Evaluation
            </h1>
            <p className="text-text-secondary mb-10">
              What project are you evaluating today?
            </p>

            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-text-secondary mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="projectName"
                  ref={projectNameRef}
                  defaultValue={projectName}
                  placeholder="e.g., AI Writing Assistant"
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-warm focus:outline-none text-text-primary placeholder:text-text-muted transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">
                  Brief Description <span className="text-text-muted">(optional)</span>
                </label>
                <textarea
                  id="description"
                  ref={descriptionRef}
                  defaultValue={description}
                  placeholder="What's the core idea in one sentence?"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-border focus:border-accent-warm focus:outline-none text-text-primary placeholder:text-text-muted transition-all resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-accent-warm text-white font-medium hover:bg-accent-muted transition-colors"
                >
                  Begin Evaluation
                </button>
                <p className="text-center text-sm text-text-muted mt-4">
                  19 questions • ~10 minutes
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Questions step
  if (step === 'questions') {
    return (
      <main className="min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => router.push('/')}
                className="text-text-secondary hover:text-text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="text-sm text-text-muted font-medium truncate max-w-[200px]">
                {projectName}
              </span>
              <div className="w-6" /> {/* Spacer for alignment */}
            </div>
            
            <ProgressBar
              currentSection={currentSectionIndex}
              totalSections={SECTIONS.length}
              sectionNames={SECTIONS.map(s => s.name)}
            />
          </div>

          {/* Section header */}
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl font-display italic text-text-primary mb-2">
              {currentSection.name}
            </h2>
            <p className="text-text-secondary">
              {currentSection.description}
            </p>
          </div>

          {/* Question card */}
          {currentQuestion && (
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={overallQuestionNumber}
              totalQuestions={totalQuestions}
              value={currentAnswer}
              onChange={(score) => handleAnswerChange(currentQuestion.id, score)}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
              className="px-6 py-3 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-accent-warm text-white font-medium hover:bg-accent-muted transition-colors"
            >
              {currentSectionIndex === SECTIONS.length - 1 && 
               currentQuestionIndex === currentSection.questions.length - 1
                ? 'Review →'
                : 'Next →'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Review step
  return (
    <main className="min-h-screen px-4 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display italic text-text-primary mb-3">
            Review & Submit
          </h1>
          <p className="text-text-secondary mb-10">
            Take a moment to review your answers before submitting.
          </p>

          {/* Summary by section */}
          <div className="space-y-6 mb-10">
            {SECTIONS.map((section) => {
              const sectionAnswers = section.questions.map(q => answers[q.id] ?? 0);
              const avgScore = sectionAnswers.reduce((a, b) => a + b, 0) / sectionAnswers.length;
              
              return (
                <div
                  key={section.id}
                  className="bg-surface rounded-xl border border-border-subtle p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-text-primary">{section.name}</h3>
                    <span className="text-sm font-mono text-text-secondary">
                      {avgScore.toFixed(1)} avg
                    </span>
                  </div>
                  
                  <div className="flex gap-1">
                    {section.questions.map((q) => {
                      const score = answers[q.id] ?? 0;
                      const intensity = score / 5;
                      return (
                        <div
                          key={q.id}
                          className="flex-1 h-2 rounded-full"
                          style={{
                            backgroundColor: `rgba(249, 115, 22, ${0.2 + intensity * 0.8})`,
                          }}
                          title={`${q.text}: ${score}/5`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => {
                setStep('questions');
                setCurrentSectionIndex(0);
                setCurrentQuestionIndex(0);
              }}
              className="flex-1 px-6 py-4 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-all"
            >
              ← Edit Answers
            </button>
            
            <button
              onClick={handleComplete}
              className="flex-1 px-6 py-4 rounded-xl bg-accent-warm text-white font-medium hover:bg-accent-muted transition-colors"
            >
              Get My Score →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
