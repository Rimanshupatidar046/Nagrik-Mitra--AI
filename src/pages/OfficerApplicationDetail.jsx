import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck2,
  Building2,
  Send,
  Printer,
  Calendar,
  Clock,
} from 'lucide-react';
import Card, { CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';
import { useToast } from '../context/ToastContext';
import { mockApplications, mockOfficer } from '../data/mockData';

export const OfficerApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const initialApp = mockApplications.find((a) => a.id === id) || mockApplications[0];
  const [app, setApp] = useState(initialApp);
  const [officerNote, setOfficerNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Verification checks state
  const [checks, setChecks] = useState({
    aadhaarVerified: true,
    landVerified: true,
    bankVerified: true,
    incomeVerified: true,
  });

  const handleApprove = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setApp((prev) => ({
        ...prev,
        status: 'approved',
        stepIndex: 3,
        remarks: officerNote || 'All statutory document requirements verified by Sub-Divisional Scrutiny Desk. Sanction Order #SO-2024-8841 generated.',
        timeline: [
          {
            date: 'Today, Just now',
            event: 'Sanction Order Generated & Signed with NIC Digital Certificate',
            actor: `${mockOfficer.name} (${mockOfficer.designation})`,
          },
          ...prev.timeline,
        ],
      }));
      toast.success(
        'Sanction Order Granted',
        `Application ${app.id} approved. DBT grant mandate scheduled for release.`
      );
    }, 800);
  };

  const handleRequestClarification = () => {
    if (!officerNote.trim()) {
      toast.warning('Clarification Note Required', 'Specify the exact document or correction needed.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setApp((prev) => ({
        ...prev,
        status: 'action_required',
        remarks: officerNote,
        timeline: [
          {
            date: 'Today, Just now',
            event: `Clarification Requested: ${officerNote}`,
            actor: mockOfficer.name,
          },
          ...prev.timeline,
        ],
      }));
      toast.warning(
        'Clarification Dispatched',
        `Citizen ${app.applicantName} notified via SMS to re-upload required document.`
      );
    }, 700);
  };

  const handleReject = () => {
    if (!officerNote.trim()) {
      toast.error('Rejection Reason Required', 'Provide statutory grounds for rejecting welfare entitlement.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setApp((prev) => ({
        ...prev,
        status: 'rejected',
        remarks: officerNote,
        timeline: [
          {
            date: 'Today, Just now',
            event: `Application Rejected: ${officerNote}`,
            actor: mockOfficer.name,
          },
          ...prev.timeline,
        ],
      }));
      toast.error(
        'Application Rejected',
        `Rejection notice generated under Section 4(B) of the Scheme Rules.`
      );
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/officer/applications')}
          className="inline-flex items-center space-x-1.5 text-xs font-medium text-gov-secondary hover:text-gov-text"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scrutiny Desk</span>
        </button>

        <span className="font-mono text-xs text-gov-secondary">
          Desk Clearance ID: NIC-VNS-SEC-09
        </span>
      </div>

      {/* Main Review Card */}
      <Card className="p-6 border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="font-mono text-sm font-bold text-teal-700">{app.id}</span>
              <StatusBadge status={app.status} size="md" />
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                Priority: {app.priority}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">{app.serviceName}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Applicant: <strong className="text-slate-800">{app.applicantName}</strong> • {app.department}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-right min-w-[200px]">
            <div className="text-[11px] text-slate-500">Statutory Mandate Deadline</div>
            <div className="text-sm font-bold text-amber-600">{app.slaDueDate}</div>
            <div className="text-[10px] text-slate-400">Submitted: {app.submissionDate}</div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="py-6 px-4">
          <ProgressBar steps={app.steps} currentStep={app.stepIndex} />
        </div>

        {/* Official Scrutiny Checklist */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Statutory Verification Checklist
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">All Core Databases Queried</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <label className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={checks.aadhaarVerified}
                onChange={(e) => setChecks({ ...checks, aadhaarVerified: e.target.checked })}
                className="rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-slate-800 font-medium">UIDAI Biometric e-KYC Authenticated</span>
            </label>

            <label className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={checks.landVerified}
                onChange={(e) => setChecks({ ...checks, landVerified: e.target.checked })}
                className="rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-slate-800 font-medium">Bhulekh Land Record Revenue Cross-Match</span>
            </label>

            <label className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={checks.bankVerified}
                onChange={(e) => setChecks({ ...checks, bankVerified: e.target.checked })}
                className="rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-slate-800 font-medium">NPCI Aadhaar Payment Bridge Active</span>
            </label>

            <label className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-white border border-slate-200 cursor-pointer select-none hover:border-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={checks.incomeVerified}
                onChange={(e) => setChecks({ ...checks, incomeVerified: e.target.checked })}
                className="rounded border-slate-300 text-teal-700 focus:ring-teal-500"
              />
              <span className="text-slate-800 font-medium">e-District Tehsildar Income Certificate Valid</span>
            </label>
          </div>
        </div>

        {/* Attached Verification Documents */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-800 mb-3">Applicant Uploaded Documents</h4>
          <div className="space-y-2">
            {app.documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs"
              >
                <div className="flex items-center space-x-2">
                  <FileCheck2 className="w-4 h-4 text-teal-700" />
                  <span className="font-medium text-slate-800">{doc.name}</span>
                  <span className="text-[10px] text-slate-500">({doc.size})</span>
                </div>
                <StatusBadge status={doc.status} size="sm" />
              </div>
            ))}
          </div>
        </div>

        {/* Officer Decision Console */}
        <div className="mt-6 pt-5 border-t border-slate-200 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Officer Scrutiny Notes & Formal Direction
            </label>
            <textarea
              rows={3}
              value={officerNote}
              onChange={(e) => setOfficerNote(e.target.value)}
              placeholder="Enter remarks for sanction order or specify clarification details..."
              className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button
              variant="danger"
              size="sm"
              disabled={isProcessing}
              onClick={handleReject}
              icon={XCircle}
            >
              Reject Case
            </Button>
            <Button
              variant="secondary"
              size="sm"
              disabled={isProcessing}
              onClick={handleRequestClarification}
              icon={AlertTriangle}
            >
              Request Clarification
            </Button>
            <Button
              variant="primary"
              size="sm"
              isLoading={isProcessing}
              onClick={handleApprove}
              icon={CheckCircle2}
            >
              Approve & Issue Sanction Order
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OfficerApplicationDetail;
