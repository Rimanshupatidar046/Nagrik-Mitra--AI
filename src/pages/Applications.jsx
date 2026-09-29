import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  ArrowRight,
  Clock,
  AlertCircle,
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { mockApplications } from '../data/mockData';

export const Applications = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const [allApps] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('nagrik_submitted_apps') || '[]');
      return [...saved, ...mockApplications];
    } catch (e) {
      return mockApplications;
    }
  });

  const filteredApps = allApps.filter((app) => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch =
      app.serviceName.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase()) ||
      app.department.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            My Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track status, official reviews, and document approvals in one place
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate('/services')}
        >
          Apply for New Scheme
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col md:flex-row gap-3 items-center justify-between shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID or Scheme name..."
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto text-xs">
          {[
            { id: 'all', label: 'All Applications' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'action_required', label: 'Action Needed' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap text-xs ${
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

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          title="No Applications Found"
          description="There are no applications matching your selected filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setFilter('all');
            setSearch('');
          }}
        />
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app) => {
            const progressPercent = Math.round(((app.stepIndex + 1) / app.steps.length) * 100);

            return (
              <Card
                key={app.id}
                hoverable
                onClick={() => navigate(`/applications/${app.id}`)}
                className="p-5 sm:p-6 border-slate-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <StatusBadge status={app.status} size="sm" />
                      <span className="font-mono text-xs font-bold text-teal-700">{app.id}</span>
                      <span className="text-xs text-slate-400">• Submitted: {app.submissionDate}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{app.serviceName}</h3>
                    <p className="text-xs text-slate-500">{app.department}</p>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs text-slate-500 flex items-center sm:justify-end space-x-1">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Expected Decision: {app.slaDueDate}</span>
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="my-3 space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Current Stage: <strong className="text-slate-800">{app.steps[app.stepIndex]}</strong></span>
                    <span className="font-semibold text-slate-800">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-700 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Next Action / View details row */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-500 truncate mr-2">
                    {app.status === 'action_required' ? (
                      <span className="text-amber-700 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Action Required: Please re-upload geotagged site photo</span>
                      </span>
                    ) : (
                      <span>Officer Note: {app.remarks}</span>
                    )}
                  </div>

                  <span className="text-teal-700 font-semibold shrink-0 flex items-center space-x-1">
                    <span>View Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;
