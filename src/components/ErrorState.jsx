import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export const ErrorState = ({
  title = 'Service Temporarily Unavailable',
  message = 'An error occurred while connecting to the directory. Please try again in a few moments.',
  onRetry,
  retryLabel = 'Try Again',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-10 text-center rounded-2xl bg-white border border-rose-200 shadow-sm ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-3 text-rose-600">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-5 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
