'use client';

interface ProgressBarProps {
  currentSection: number;
  totalSections: number;
  sectionNames: string[];
}

export function ProgressBar({ currentSection, totalSections, sectionNames }: ProgressBarProps) {
  const progress = ((currentSection + 1) / totalSections) * 100;

  return (
    <div className="space-y-3">
      {/* Section indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-text-secondary">
          Section {currentSection + 1} of {totalSections}
        </span>
        <span className="text-text-muted font-medium">
          {sectionNames[currentSection]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-warm to-accent-muted transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Section dots */}
      <div className="flex justify-between px-2">
        {sectionNames.map((name, index) => (
          <div
            key={name}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index < currentSection
                ? 'bg-accent-warm'
                : index === currentSection
                ? 'bg-accent-warm scale-125'
                : 'bg-surface'
            }`}
            title={name}
          />
        ))}
      </div>
    </div>
  );
}

