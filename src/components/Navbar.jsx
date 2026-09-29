import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Bell,
  User,
  Menu,
  X,
  Bot,
  FileCheck2,
  LogOut,
  Building2,
  ChevronDown,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useTranslation } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import { mockUser, mockOfficer } from '../data/mockData';

export const Navbar = ({ onToggleSidebar, isOfficer = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentUser = isOfficer ? mockOfficer : mockUser;

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowUserMenu(false);
  };

  const handlePortalSwitch = () => {
    if (isOfficer) {
      navigate('/dashboard');
      toast.info('Switched to Citizen Portal', 'Viewing citizen services and applications.');
    } else {
      navigate('/officer');
      toast.info('Switched to Officer Desk', 'Authorized access: District Redressal Officer.');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Hamburger (mobile) + Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm">
                <ShieldCheck className="w-5 h-5 text-teal-200" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="text-base font-bold tracking-tight text-slate-900">
                    {t('nav.brandTitle', 'NAGRIK MITRA')}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                    AI
                  </span>
                  {isOfficer && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      Officer
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  {t('nav.brandSubtitle', 'National Welfare Services')}
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation: Services, AI Assistant, Eligibility, Grievances */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs">
            <Link
              to="/services"
              className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
                location.pathname.startsWith('/services')
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('nav.services', 'Services')}
            </Link>
            <Link
              to="/assistant"
              className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
                location.pathname === '/assistant'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('nav.assistant', 'AI Assistant')}
            </Link>
            <Link
              to="/eligibility"
              className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
                location.pathname === '/eligibility'
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('nav.eligibility', 'Eligibility')}
            </Link>
            <Link
              to="/grievances"
              className={`px-3.5 py-2 rounded-xl font-medium transition-colors ${
                location.pathname.startsWith('/grievances')
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {t('nav.grievances', 'Grievances')}
            </Link>
          </nav>

          {/* Right section: Language Selector + Switch Portal + Notifications + User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector in Header */}
            <LanguageSelector />

            {/* Quick Switch Mode Button */}
            <button
              onClick={handlePortalSwitch}
              className="hidden sm:inline-flex items-center space-x-1.5 text-xs px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
              title="Switch between Citizen and Officer interfaces"
            >
              <Building2 className="w-3.5 h-3.5 text-teal-700" />
              <span>{isOfficer ? t('nav.citizenPortal', 'Citizen Portal') : t('nav.officer', 'Officer Desk')}</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={handleNotificationClick}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors focus:outline-none"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-900">
                      Notifications
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 font-medium">
                      2 Updates
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto">
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/applications/APP-2024-8901');
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-teal-800">PM Kisan Update</span>
                        <span className="text-[10px] text-slate-400">1h ago</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        Land verification cleared by Tehsil desk. Sanction approval in progress.
                      </p>
                    </div>
                    <div
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/grievances');
                      }}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-semibold text-amber-700">Grievance Notice</span>
                        <span className="text-[10px] text-slate-400">1d ago</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        GRV-2024-1039 has been resolved by Sub-Divisional Magistrate.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-semibold text-xs flex items-center justify-center">
                  {isOfficer ? 'SD' : 'RK'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {isOfficer ? currentUser.designation : t('nav.verifiedCitizen', 'Aadhaar Verified Citizen')}
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{t('nav.citizenProfile', 'Citizen Profile')}</span>
                    </Link>
                    <Link
                      to="/documents"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>{t('nav.digilocker', 'DigiLocker Records')}</span>
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => {
                        setShowUserMenu(false);
                        toast.info('Logged Out', 'Session ended safely.');
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('nav.logout', 'Sign In / Switch Account')}</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
