import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = ({
  message = 'Loading government services data...',
  subtext = 'Please wait while we connect to state directories',
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200 shadow-sm ${className}`}>
      <div className="relative mb-4">
        <div className="w-10 h-10 rounded-full border-2 border-slate-200 border-t-brand-purple animate-spin" />
      </div>
      <h4 className="text-sm font-semibold text-slate-800 mb-1">{message}</h4>
      {subtext && <p className="text-xs text-slate-500 max-w-sm">{subtext}</p>}
    </div>
  );
};

export default LoadingState;
