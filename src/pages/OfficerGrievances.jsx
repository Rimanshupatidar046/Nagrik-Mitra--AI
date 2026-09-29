import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  AlertCircle,
  X,
} from 'lucide-react';
import Card, { CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from '../components/Card';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { mockGrievances } from '../data/mockData';

export const OfficerGrievances = () => {
  const [grievances, setGrievances] = useState(mockGrievances);
  const [selectedGrievance, setSelectedGrievance] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [isResolving, setIsResolving] = useState(false);
  const { toast } = useToast();

  const handleOpenResolveModal = (grv) => {
    setSelectedGrievance(grv);
    setResolutionNote('');
  };

  const handleConfirmResolve = (e) => {
    e.preventDefault();
    if (!resolutionNote.trim()) {
      toast.warning('Note Required', 'Please enter an official resolution decree before closing.');
      return;
    }

    setIsResolving(true);
    setTimeout(() => {
      setGrievances((prev) =>
        prev.map((g) =>
          g.id === selectedGrievance.id
            ? {
                ...g,
                status: 'resolved',
                slaRemainingDays: 0,
                resolutionHistory: [
                  {
                    date: 'Today',
                    text: `Official Action Order issued: ${resolutionNote}`,
                    authority: 'Dr. Sunita Deshmukh, IAS (District Redressal Officer)',
                  },
                  ...g.resolutionHistory,
                ],
              }
            : g
        )
      );
      setIsResolving(false);
      setSelectedGrievance(null);
      toast.success(
        'Grievance Docket Resolved',
        `Docket ${selectedGrievance.id} updated with official order. Citizen notified via SMS.`
      );
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gov-text">
            CPGRAMS Grievance Redressal & Escalations Desk
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gov-orange/15 text-gov-orange border border-gov-orange/30">
            District Magistrate Monitoring
          </span>
        </div>
        <p className="text-xs text-gov-secondary mt-1">
          Review, investigate, and issue statutory redressal orders for citizen welfare complaints
        </p>
      </div>

      {/* Grievances Queue */}
      <div className="space-y-4">
        {grievances.map((grv) => (
          <Card key={grv.id} className="p-5 border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-teal-700">{grv.id}</span>
                <StatusBadge status={grv.status} size="sm" />
                <span className="text-xs text-slate-500">
                  • Filed: <strong className="text-slate-800">{grv.filingDate}</strong>
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="text-slate-500">Escalation Tier:</span>
                <span className="font-semibold text-amber-600">{grv.escalationLevel}</span>
              </div>
            </div>

            <div className="py-3">
              <h3 className="text-sm font-bold text-slate-900">{grv.subject}</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {grv.department} • Category: {grv.category}
              </p>

              <div className="mt-3 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Citizen Complaint Text:
                </span>
                <p className="mt-1 text-slate-700 leading-relaxed">{grv.description}</p>
              </div>

              {/* Action History */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Recorded Actions:
                </span>
                {grv.resolutionHistory.map((hist, i) => (
                  <div key={i} className="text-xs flex items-center justify-between text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span>
                      <strong className="text-teal-800">{hist.authority}:</strong> {hist.text}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400 shrink-0 ml-2">{hist.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-500">
                  Statutory SLA: {grv.slaRemainingDays > 0 ? `${grv.slaRemainingDays} Days Remaining` : 'Closed'}
                </span>
              </div>

              {grv.status !== 'resolved' ? (
                <Button
                  variant="primary"
                  size="xs"
                  icon={CheckCircle2}
                  onClick={() => handleOpenResolveModal(grv)}
                >
                  Issue Redressal Order
                </Button>
              ) : (
                <span className="text-xs font-semibold text-emerald-600 flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Case Closed by District Officer</span>
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Resolution Modal */}
      {selectedGrievance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Issue Official Redressal Order</h3>
                <span className="text-xs font-mono text-teal-700">{selectedGrievance.id}</span>
              </div>
              <button
                onClick={() => setSelectedGrievance(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmResolve} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Official Redressal Finding & Corrective Order
                </label>
                <textarea
                  rows={4}
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Detail the audit findings, corrective transaction, or disciplinary action taken..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:bg-white transition-colors"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-200">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedGrievance(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isResolving}
                  icon={CheckCircle2}
                >
                  Sign & Close Docket
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfficerGrievances;
