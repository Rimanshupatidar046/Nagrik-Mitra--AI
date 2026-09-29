import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Grid,
  Bot,
  CheckCircle2,
  FolderLock,
  FileText,
  AlertCircle,
  User,
  ShieldCheck,
  Building2,
  Inbox,
  ShieldAlert,
  X,
} from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export const Sidebar = ({ isOpen, onClose, isOfficer = false }) => {
  const { t } = useTranslation();

  const citizenLinks = [
    { to: '/dashboard', label: t('nav.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { to: '/services', label: t('nav.services', 'Services & Schemes'), icon: Grid },
    { to: '/assistant', label: t('nav.assistant', 'AI Assistant'), icon: Bot },
    { to: '/eligibility', label: t('nav.eligibility', 'Eligibility'), icon: CheckCircle2 },
    { to: '/documents', label: t('nav.documents', 'Documents'), icon: FolderLock },
    { to: '/applications', label: t('nav.applications', 'My Applications'), icon: FileText },
    { to: '/grievances', label: t('nav.grievances', 'Grievances'), icon: AlertCircle },
    { to: '/profile', label: t('nav.profile', 'Profile'), icon: User },
  ];

  const officerLinks = [
    { to: '/officer', label: t('nav.officer', 'Officer Desk'), icon: LayoutDashboard },
    { to: '/officer/applications', label: t('nav.applications', 'Applications'), icon: Inbox },
    { to: '/officer/grievances', label: t('nav.grievances', 'Grievance Queue'), icon: ShieldAlert },
  ];

  const links = isOfficer ? officerLinks : citizenLinks;

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200 text-slate-700 select-none">
      {/* Mobile Header in drawer */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-teal-700" />
          <span className="font-bold text-sm tracking-tight text-slate-900">
            {isOfficer ? 'Officer Portal' : 'Nagrik Mitra'}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Citizen Snapshot Strip */}
      <div className="p-4 border-b border-slate-100">
        <div className="px-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center shrink-0">
              {isOfficer ? 'SD' : 'RK'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-slate-900 truncate">
                {isOfficer ? 'Dr. Sunita Deshmukh' : 'Rajesh Sharma'}
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {isOfficer ? 'District Officer' : 'Citizen (Varanasi, UP)'}
              </div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Account" />
        </div>
      </div>

      {/* Calm White Navigation with gentle tinted active state */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/officer'}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0 text-current" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Portal Switcher & Footer info */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <Link
          to={isOfficer ? '/dashboard' : '/officer'}
          onClick={() => {
            if (window.innerWidth < 1024) onClose();
          }}
          className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 rounded-xl text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
        >
          <Building2 className="w-4 h-4 text-teal-700" />
          <span>{isOfficer ? 'Citizen Portal' : 'Officer Desk'}</span>
        </Link>

        <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
          <span>Nagrik Mitra</span>
          <span className="text-emerald-600 font-medium">Verified Portal</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Mobile Drawer (Slide in) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-200 ease-in-out lg:hidden shadow-xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>

      {/* Desktop Sidebar (Static, White) */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-slate-200 bg-white h-[calc(100vh-4.25rem)] sticky top-[4.25rem]">
        {content}
      </aside>
    </>
  );
};

export default Sidebar;
