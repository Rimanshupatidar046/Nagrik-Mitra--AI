import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldAlert,
  Inbox,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { mockOfficer, mockOfficerStats, mockApplications, mockGrievances } from '../data/mockData';

export const OfficerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Officer Header */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {mockOfficer.name}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Officer Clearance
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {mockOfficer.designation} • {mockOfficer.jurisdiction}
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link to="/officer/applications">
            <Button variant="primary" size="sm" icon={Inbox}>
              Scrutiny Queue ({mockOfficerStats.totalPendingApplications})
            </Button>
          </Link>
          <Link to="/officer/grievances">
            <Button variant="secondary" size="sm" icon={ShieldAlert}>
              Grievance Desk ({mockOfficerStats.grievancesAssigned})
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/officer/applications')}
          className="card-hover p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Pending Scrutiny</span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{mockOfficerStats.totalPendingApplications}</div>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting approval</p>
        </div>

        <div
          onClick={() => navigate('/officer/applications')}
          className="card-hover p-5 rounded-2xl bg-white border border-rose-200 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-rose-700">SLA Breach Risk</span>
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-700">{mockOfficerStats.slaBreachRisk} Cases</div>
          <p className="text-[11px] text-rose-500 mt-1">Due within 48 hours</p>
        </div>

        <div
          onClick={() => navigate('/officer/grievances')}
          className="card-hover p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">CPGRAMS Dockets</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{mockOfficerStats.grievancesAssigned}</div>
          <p className="text-[11px] text-slate-400 mt-1">District monitoring</p>
        </div>

        <div className="card-hover p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500">Sanctioned This Month</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700">{mockOfficerStats.sanctionedThisMonth}</div>
          <p className="text-[11px] text-slate-400 mt-1">Avg SLA: {mockOfficerStats.averageProcessingTime}</p>
        </div>
      </div>

      {/* Work Queues Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scrutiny Queue */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Pending Application Scrutiny</h3>
            <Link to="/officer/applications" className="text-xs text-teal-700 hover:text-teal-800 font-semibold">
              View queue →
            </Link>
          </div>

          <div className="space-y-3">
            {mockApplications.map((app) => (
              <div
                key={app.id}
                onClick={() => navigate(`/officer/application/${app.id}`)}
                className="card-hover-sm p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-slate-600 font-bold">{app.id}</span>
                  <StatusBadge status={app.status} size="sm" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900">{app.serviceName}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>Applicant: <strong className="text-slate-800">{app.applicantName}</strong></span>
                  <span className="text-amber-700 font-medium">SLA: {app.slaDueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Grievance Desk */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">CPGRAMS Grievance Dockets</h3>
            <Link to="/officer/grievances" className="text-xs text-teal-700 hover:text-teal-800 font-semibold">
              Open desk →
            </Link>
          </div>

          <div className="space-y-3">
            {mockGrievances.map((grv) => (
              <div
                key={grv.id}
                onClick={() => navigate('/officer/grievances')}
                className="card-hover-sm p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-slate-600 font-bold">{grv.id}</span>
                  <span className="text-xs text-amber-700 font-semibold">{grv.escalationLevel}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 line-clamp-1">{grv.subject}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <span>{grv.department}</span>
                  <span className="text-amber-700 font-medium">
                    {grv.slaRemainingDays > 0 ? `${grv.slaRemainingDays}d Left` : 'Resolved'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
