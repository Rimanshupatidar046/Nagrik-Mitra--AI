import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Search,
  Filter,
  ArrowRight,
  Clock,
  ShieldCheck,
  FileCheck2,
  CheckCircle2,
} from 'lucide-react';
import Card, { CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { mockApplications } from '../data/mockData';

export const OfficerApplications = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = mockApplications.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch =
      app.applicantName.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gov-text">
              Application Scrutiny & Sanctions Desk
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
              NIC Scrutiny Node
            </span>
          </div>
          <p className="text-xs text-gov-secondary mt-1">
            Review applicant land records, biometric e-KYC status, and execute statutory sanction orders
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by applicant name, ID, or scheme..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center space-x-1.5 text-xs overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All Cases (3)' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'action_required', label: 'Clarification Needed' },
            { id: 'approved', label: 'Sanctioned' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap text-xs ${
                filter === tab.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Applications Table / Cards */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Scrutiny Applications Found"
          description="There are currently no cases matching the selected filter criteria."
          actionLabel="Clear Filter"
          onAction={() => {
            setFilter('all');
            setSearch('');
          }}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((app) => (
            <Card
              key={app.id}
              hoverable
              onClick={() => navigate(`/officer/application/${app.id}`)}
              className="p-5 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-teal-700">{app.id}</span>
                  <StatusBadge status={app.status} size="sm" />
                  <span className="text-[11px] text-slate-500">
                    Priority: <strong className="text-slate-800">{app.priority}</strong>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{app.serviceName}</h3>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>Applicant: <strong className="text-slate-700">{app.applicantName}</strong></span>
                  <span>Tehsil: <strong className="text-slate-700">Varanasi Sadar</strong></span>
                  <span>Submitted: {app.submissionDate}</span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-1 italic">
                  Note: {app.remarks}
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-500">Mandate SLA:</span>
                  <div className="text-xs font-bold text-amber-600 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{app.slaDueDate}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="xs"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Scrutinize Case
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfficerApplications;
