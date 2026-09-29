import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export const LanguageSelector = ({ className = '', compact = false }) => {
  const { language, setLanguage, currentLanguage, languages } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
        className="inline-flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 transition-colors focus:outline-none focus:ring-1 focus:ring-teal-700"
      >
        <Globe className="w-3.5 h-3.5 text-teal-700 shrink-0" />
        <span className="font-medium">{currentLanguage.nativeName || currentLanguage.name}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white border border-slate-200 shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Select Language
          </div>
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                onClick={() => handleSelect(lang.code)}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-teal-50/80 text-teal-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex flex-col">
                  <span>{lang.nativeName}</span>
                  {lang.nativeName !== lang.name && (
                    <span className="text-[10px] text-slate-400">{lang.name}</span>
                  )}
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
