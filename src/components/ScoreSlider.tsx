'use client';

import { useState } from 'react';

interface ScoreSliderProps {
  value: number;
  onChange: (value: number) => void;
  questionId: string;
}

const SCORE_LABELS = [
  { value: 0, label: 'Not at all', emoji: '😶' },
  { value: 1, label: 'Barely', emoji: '😕' },
  { value: 2, label: 'Somewhat', emoji: '😐' },
  { value: 3, label: 'Moderately', emoji: '🙂' },
  { value: 4, label: 'Strongly', emoji: '😊' },
  { value: 5, label: 'Absolutely', emoji: '🔥' },
];

export function ScoreSlider({ value, onChange, questionId }: ScoreSliderProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const currentLabel = SCORE_LABELS[value];

  return (
    <div className="space-y-4">
      {/* Score display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span 
            className={`text-4xl transition-transform duration-200 ${isInteracting ? 'scale-125' : ''}`}
          >
            {currentLabel.emoji}
          </span>
          <div>
            <div className="score-display text-2xl font-medium text-text-primary">
              {value}
            </div>
            <div className="text-sm text-text-secondary">
              {currentLabel.label}
            </div>
          </div>
        </div>
        
        {/* Quick select buttons */}
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              onClick={() => onChange(score)}
              className={`w-10 h-10 rounded-lg font-mono text-sm transition-all duration-200 ${
                value === score
                  ? 'bg-accent-warm text-white scale-105'
                  : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-text-primary'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="relative pt-2 pb-4">
        <input
          type="range"
          id={questionId}
          min={0}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          onMouseDown={() => setIsInteracting(true)}
          onMouseUp={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${(value / 5) * 100}%, #27272a ${(value / 5) * 100}%, #27272a 100%)`
          }}
        />
        
        {/* Tick marks */}
        <div className="absolute left-0 right-0 top-0 flex justify-between px-3 pointer-events-none">
          {[0, 1, 2, 3, 4, 5].map((tick) => (
            <div
              key={tick}
              className={`w-1 h-1 rounded-full ${
                tick <= value ? 'bg-accent-warm' : 'bg-text-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

