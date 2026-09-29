import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const statusConfig = {
  submitted: {
    label: 'Submitted',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    dot: 'bg-teal-600',
  },
  under_review: {
    label: 'Under Review',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  in_progress: {
    label: 'In Progress',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
    dot: 'bg-sky-500',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  approved: {
    label: 'Approved',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-600',
  },
  verified: {
    label: 'Verified',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-600',
  },
  resolved: {
    label: 'Resolved',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-600',
  },
  rejected: {
    label: 'Rejected',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-600',
  },
  escalated: {
    label: 'Escalated',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-600',
  },
  action_required: {
    label: 'Action Needed',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    dot: 'bg-orange-500 animate-pulse',
  },
  active: {
    label: 'Active',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
    dot: 'bg-teal-600',
  },
  draft: {
    label: 'Draft',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  },
};

export const StatusBadge = ({
  status = 'submitted',
  label,
  size = 'sm',
  className = '',
}) => {
  const { t } = useTranslation();
  const normalizedKey = String(status).toLowerCase().replace(/[\s-]/g, '_');
  const config = statusConfig[normalizedKey] || {
    label: status,
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  };

  const translatedLabel = t(`status.${normalizedKey}`, config.label);
  const displayText = label || translatedLabel;
  const isSm = size === 'sm';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${
        isSm ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${config.dot}`} />
      <span>{displayText}</span>
    </span>
  );
};

export default StatusBadge;
