import React, { useState } from 'react';
import {
  AlertCircle,
  Plus,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Send,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { useToast } from '../context/ToastContext';
import { mockGrievances } from '../data/mockData';

export const Grievances = () => {
  const [grievances, setGrievances] = useState(mockGrievances);
  const [expandedId, setExpandedId] = useState(mockGrievances[0]?.id || null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  // Form State
  const [newDepartment, setNewDepartment] = useState('Department of Agriculture & Cooperation');
  const [newCategory, setNewCategory] = useState('Payment Discrepancy');
  const [newSubject, setNewSubject] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitGrievance = (e) => {
    e.preventDefault();
    if (!newSubject.trim() || !newDescription.trim()) {
      toast.warning('Fields Required', 'Please enter the subject and details of your grievance.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `GRV-2024-${Math.floor(1000 + Math.random() * 9000)}`;
      const newEntry = {
        id: generatedId,
        subject: newSubject,
        department: newDepartment,
        category: newCategory,
        filingDate: new Date().toISOString().split('T')[0],
        status: 'under_review',
        slaRemainingDays: 30,
        escalationLevel: 'Level 1 (District Grievance Cell)',
        description: newDescription,
        resolutionHistory: [
          {
            date: 'Today',
            text: 'Grievance lodged on CPGRAMS node. Auto-assigned to Varanasi Division Redressal Officer.',
            authority: 'Central CPGRAMS Gateway',
          },
        ],
      };

      setGrievances([newEntry, ...grievances]);
      setExpandedId(generatedId);
      setIsSubmitting(false);
      setShowModal(false);
      setNewSubject('');
      setNewDescription('');

      toast.success(
        'Complaint Registered',
        `Docket reference ${generatedId} created. You will receive SMS updates on progress.`
      );
    }, 800);
  };

  const filteredGrievances = grievances.filter(
    (g) =>
      g.subject.toLowerCase().includes(search.toLowerCase()) ||
      g.id.toLowerCase().includes(search.toLowerCase()) ||
      g.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Public Grievances (CPGRAMS)
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Government Monitored
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lodge complaints regarding delayed benefits, ration denial, or officer misconduct
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setShowModal(true)}
        >
          Lodge a Complaint
        </Button>
      </div>

      {/* SLA Guarantee Banner */}
      <div className="card-hover p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start space-x-3.5 text-xs sm:text-sm text-slate-600">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-900">Guaranteed 30-Day Resolution</span>
          <p className="text-slate-500 leading-relaxed text-xs">
            Every grievance filed under CPGRAMS is tracked directly by the district administration. Officers must review and issue a decision within 30 days.
          </p>
        </div>
      </div>

      {/* Search and List */}
      <div className="card-hover p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by docket ID, subject, or ministry..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
          />
        </div>

        {filteredGrievances.length === 0 ? (
          <EmptyState
            title="No Grievances Found"
            description="You currently have no registered grievances matching this search."
            actionLabel="Lodge Grievance"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <div className="space-y-3">
            {filteredGrievances.map((grv) => {
              const isExpanded = expandedId === grv.id;
              return (
                <div
                  key={grv.id}
                  className="card-hover rounded-xl border border-slate-200 overflow-hidden bg-white"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : grv.id)}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-bold text-slate-500">{grv.id}</span>
                        <StatusBadge status={grv.status} size="sm" />
                        <span className="text-xs text-slate-400">
                          • Filed {grv.filingDate}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900">{grv.subject}</h4>
                      <p className="text-xs text-slate-500">{grv.department} • {grv.category}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
                      {grv.slaRemainingDays > 0 ? (
                        <div className="text-right">
                          <span className="text-[11px] text-slate-400">Resolution SLA:</span>
                          <div className="text-xs font-bold text-amber-700 flex items-center space-x-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{grv.slaRemainingDays} Days Left</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-emerald-700 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Resolved</span>
                        </div>
                      )}

                      <button className="text-slate-400 hover:text-slate-700 p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded view */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs sm:text-sm space-y-3">
                      <div>
                        <span className="text-slate-500 font-semibold text-xs">
                          Citizen Complaint:
                        </span>
                        <p className="mt-1 text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                          {grv.description}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-500 font-semibold text-xs">
                          Official Resolution History:
                        </span>
                        <div className="mt-2 space-y-2">
                          {grv.resolutionHistory.map((hist, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 text-xs"
                            >
                              <div className="space-y-0.5">
                                <div className="text-slate-800 font-medium">{hist.text}</div>
                                <div className="text-[11px] text-slate-400">
                                  Authority: <strong className="text-teal-700">{hist.authority}</strong>
                                </div>
                              </div>
                              <span className="text-slate-400 shrink-0 font-mono text-[11px]">
                                {hist.date}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lodging Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Lodge Official Grievance</h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Ministry
                </label>
                <select
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                >
                  <option value="Department of Agriculture & Cooperation">Department of Agriculture & Cooperation</option>
                  <option value="Food & Civil Supplies Department">Food & Civil Supplies Department (PDS)</option>
                  <option value="Ministry of Rural Development">Ministry of Rural Development (PMAY / MGNREGA)</option>
                  <option value="National Health Authority">National Health Authority (Ayushman Bharat)</option>
                  <option value="Department of Revenue & Land Records">Department of Revenue & Land Records (Bhulekh)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                >
                  <option value="Payment Discrepancy">Payment Discrepancy / DBT Failed</option>
                  <option value="Corruption / Overcharging">Corruption / Unauthorized Fee Demand</option>
                  <option value="Procedural Delay">Undue Delay beyond Citizen Charter</option>
                  <option value="Biometric Failure">Biometric / Aadhaar Failure</option>
                  <option value="Staff Misbehavior">Staff Apathy / Misconduct</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Non-receipt of installment despite clear eKYC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Explanation & Details
                </label>
                <textarea
                  rows={4}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Provide date, office location, official names, and bank branch details if applicable..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                  required
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmitting}
                  icon={Send}
                >
                  Submit Complaint
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grievances;
