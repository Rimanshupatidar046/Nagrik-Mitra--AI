import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple disabled:opacity-50 disabled:cursor-not-allowed select-none hover:shadow-xs hover:scale-[1.01] active:scale-[0.99]';

  const variants = {
    primary: 'bg-brand-purple hover:bg-brand-purple-hover text-white shadow-sm',
    secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm hover:border-slate-300',
    accent: 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200',
    danger: 'bg-gov-red hover:bg-red-700 text-white shadow-sm',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
    outline: 'border border-brand-purple text-brand-purple hover:bg-teal-50',
  };

  const sizes = {
    xs: 'text-xs px-2.5 py-1 gap-1.5',
    sm: 'text-xs px-3.5 py-1.5 gap-2',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 ease-out" />}
        </>
      )}
    </button>
  );
};

export default Button;
