import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  FileCheck2,
  AlertTriangle,
  Upload,
  Printer,
  ShieldCheck,
  Bot,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import ErrorState from '../components/ErrorState';
import { useToast } from '../context/ToastContext';
import { mockApplications } from '../data/mockData';

export const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const getInitialApp = () => {
    const foundMock = mockApplications.find((a) => a.id === id);
    if (foundMock) return foundMock;

    try {
      const savedApps = JSON.parse(localStorage.getItem('nagrik_submitted_apps') || '[]');
      const localMatch = savedApps.find((a) => a.id === id);
      if (localMatch) return localMatch;
    } catch (e) {}

    // Fallback for demo generated ID e.g. NM-SCH-2026-00124
    if (id && id.startsWith('NM-')) {
      return {
        id,
        serviceName: 'National Scholarship Portal 2026',
        department: 'Ministry of Education & Social Justice',
        category: 'Scholarships',
        status: 'submitted',
        slaDueDate: '15 Oct 2026',
        officerAssigned: 'Sub-Divisional Scrutiny Officer',
        steps: ['Submitted', 'Scrutiny', 'Field Verification', 'Sanctioned'],
        stepIndex: 0,
        submissionDate: '29 Sep 2026',
        remarks: 'Application submitted successfully. Under initial administrative scrutiny.',
        timeline: [
          {
            date: 'Today, Just now',
            event: 'Application submitted successfully by citizen',
            actor: 'Citizen Portal',
          },
          {
            date: 'Today, Just now',
            event: 'Automated pre-submission check completed (DigiLocker)',
            actor: 'Verification System',
          },
        ],
        documents: [
          { name: 'Aadhaar Identity Card', status: 'verified' },
          { name: 'Annual Income Certificate', status: 'verified' },
          { name: 'Address Proof', status: 'verified' },
        ],
      };
    }

    return mockApplications[0];
  };

  const [app, setApp] = useState(getInitialApp);
  const [isUploading, setIsUploading] = useState(false);

  if (!app) {
    return (
      <div className="py-8">
        <ErrorState
          title="Application Record Not Found"
          message={`No government application record exists with reference ID ${id}.`}
          onRetry={() => navigate('/applications')}
          retryLabel="Back to Applications"
        />
      </div>
    );
  }

  const handleResolveAction = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setApp((prev) => ({
        ...prev,
        status: 'under_review',
        remarks: 'Re-uploaded geotagged photograph received. Block Development Officer review re-activated.',
        documents: prev.documents.map((d) =>
          d.name.includes('Geo_Tag') ? { ...d, status: 'verified' } : d
        ),
        timeline: [
          {
            date: 'Today, Just now',
            event: 'Re-submitted Geo-tagged photograph with verified GPS metadata',
            actor: 'Citizen (Rajesh Sharma)',
          },
          ...prev.timeline,
        ],
      }));
      toast.success(
        'Action Resolved',
        'Updated documents have been dispatched to the sub-divisional scrutiny officer.'
      );
    }, 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <button
          onClick={() => navigate('/applications')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Applications</span>
        </button>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            icon={Bot}
            onClick={() => navigate(`/assistant?query=Status of application ${app.id}`)}
          >
            Ask AI About This
          </Button>
          <Button
            variant="secondary"
            size="xs"
            icon={Printer}
            onClick={handlePrint}
          >
            Print Receipt
          </Button>
        </div>
      </div>

      {/* Main Details Header Card */}
      <div className="card-hover p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="font-mono text-xs font-bold text-slate-500">
                {app.id}
              </span>
              <StatusBadge status={app.status} size="md" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{app.serviceName}</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{app.department}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-right min-w-[200px]">
            <div className="text-xs text-slate-400">Expected Decision By</div>
            <div className="text-sm font-bold text-amber-700 mt-0.5">{app.slaDueDate}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Officer: {app.officerAssigned}</div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="py-2 px-2">
          <ProgressBar steps={app.steps} currentStep={app.stepIndex} />
        </div>

        {/* Remarks callout */}
        <div className={`p-4 rounded-xl border text-xs sm:text-sm ${
          app.status === 'action_required'
            ? 'bg-amber-50 border-amber-200 text-amber-900'
            : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-start space-x-3">
            {app.status === 'action_required' ? (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <div className="font-bold text-slate-900">Official Status Note</div>
              <p className="leading-relaxed">{app.remarks}</p>
            </div>
          </div>
        </div>

        {/* Action Required Upload Trigger */}
        {app.status === 'action_required' && (
          <div className="p-5 rounded-xl bg-teal-50/60 border border-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Upload Geotagged Site Photo</h4>
              <p className="text-xs text-slate-600">
                Please take a photo of your residence with GPS enabled on your phone and upload it here.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={Upload}
              isLoading={isUploading}
              onClick={handleResolveAction}
            >
              Upload Verified Photo
            </Button>
          </div>
        )}
      </div>

      {/* Two columns: Attached Documents & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Documents */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Attached Documents</h3>
            <span className="text-xs text-slate-400">{app.documents.length} Files</span>
          </div>

          <div className="space-y-2.5">
            {app.documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-slate-800">{doc.name}</h5>
                    <span className="text-[11px] text-slate-400">{doc.size}</span>
                  </div>
                </div>

                <StatusBadge status={doc.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Application Timeline</h3>
            <span className="text-xs text-slate-400">Step by Step</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {app.timeline.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full bg-teal-600 ring-4 ring-white" />
                <div className="text-xs sm:text-sm font-semibold text-slate-900">{item.event}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-0.5">
                  <span>By: <strong className="text-slate-700">{item.actor}</strong></span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grievance Link */}
      <div className="card-hover p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs sm:text-sm text-slate-600">
        <span>Facing an undue delay or issue with this application?</span>
        <Button
          variant="secondary"
          size="xs"
          onClick={() => navigate('/grievances')}
        >
          Lodge Complaint on CPGRAMS
        </Button>
      </div>
    </div>
  );
};

export default ApplicationDetail;
