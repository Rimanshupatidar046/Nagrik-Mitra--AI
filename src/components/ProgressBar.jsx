import React from 'react';
import { Check } from 'lucide-react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = false,
  label,
  variant = 'purple',
  size = 'md',
  steps = null,
  currentStep = 0,
  className = '',
}) => {
  // Mode 1: Multi-step tracking
  if (steps && Array.isArray(steps) && steps.length > 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative flex items-center justify-between">
          {/* Connector line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-100 -z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-brand-purple transition-all duration-300 -z-0"
            style={{
              width: `${(Math.min(currentStep, steps.length - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-gov-green text-white ring-4 ring-white shadow-sm'
                      : isCurrent
                      ? 'bg-brand-purple text-white ring-4 ring-teal-50 shadow-sm'
                      : 'bg-white text-slate-400 border border-slate-200 ring-4 ring-white'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                </div>
                <span
                  className={`mt-2 text-[11px] font-medium text-center max-w-[85px] leading-tight ${
                    isCurrent
                      ? 'text-slate-900 font-semibold'
                      : isCompleted
                      ? 'text-slate-600'
                      : 'text-slate-400'
                  }`}
                >
                  {typeof step === 'string' ? step : step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Mode 2: Linear percent progress bar
  const percent = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1.5">
          <span>{label || 'Progress'}</span>
          <span className="font-semibold text-slate-800">{percent}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 ${heightClasses[size] || heightClasses.md}`}>
        <div
          className="h-full rounded-full bg-brand-purple transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
