import React from 'react';
import { useToast } from '../context/ToastContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-teal-600 flex-shrink-0" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-white shadow-emerald-50';
      case 'error':
        return 'border-rose-200 bg-white shadow-rose-50';
      case 'warning':
        return 'border-amber-200 bg-white shadow-amber-50';
      case 'info':
      default:
        return 'border-slate-200 bg-white shadow-slate-50';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((item) => (
        <div
          key={item.id}
          className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-xl border ${getBorderColor(
            item.type
          )} shadow-md transition-all duration-200`}
          role="alert"
        >
          {getIcon(item.type)}
          <div className="flex-1 min-w-0">
            {item.title && (
              <h4 className="text-sm font-semibold text-slate-900 mb-0.5">
                {item.title}
              </h4>
            )}
            {item.message && (
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.message}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(item.id)}
            className="text-slate-400 hover:text-slate-700 p-1 transition-colors rounded"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
