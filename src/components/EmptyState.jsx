import React from 'react';
import { Inbox } from 'lucide-react';
import Button from './Button';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no active entries matching your current filters.',
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white border border-slate-200/90 shadow-sm ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 text-slate-500">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
