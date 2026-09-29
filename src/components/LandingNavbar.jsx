import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
import Button from './Button';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../context/LanguageContext';

export const LandingNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm">
              <ShieldCheck className="w-5 h-5 text-teal-100" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  {t('nav.brandTitle', 'NAGRIK MITRA')}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  AI
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                {t('nav.brandSubtitle', 'National Welfare Services')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <Link
              to="/services"
              className="hover:text-slate-900 transition-colors"
            >
              {t('nav.services', 'Services')}
            </Link>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('how-it-works');
              }}
              className="hover:text-slate-900 transition-colors"
            >
              {t('nav.howItWorks', 'How It Works')}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo('about');
              }}
              className="hover:text-slate-900 transition-colors"
            >
              {t('nav.about', 'About')}
            </a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageSelector />
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t('nav.login', 'Login')}
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                {t('nav.signup', 'Get Started')}
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle & LanguageSelector */}
          <div className="flex md:hidden items-center space-x-2">
            <LanguageSelector />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3 bg-white">
            <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <Link
                to="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.services', 'Services')}
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('how-it-works');
                }}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.howItWorks', 'How It Works')}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollTo('about');
                }}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t('nav.about', 'About')}
              </a>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">
                  {t('nav.login', 'Login')}
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full" icon={ArrowRight} iconPosition="right">
                  {t('nav.signup', 'Get Started')}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
