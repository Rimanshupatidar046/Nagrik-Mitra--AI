import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  User,
  Calendar,
  GraduationCap,
  IndianRupee,
  CreditCard,
  FileCheck2,
  Edit2,
  Sparkles,
  Loader2,
  RotateCcw,
  Home,
  Check,
} from 'lucide-react';
import Button from '../components/Button';
import StatusBadge from '../components/StatusBadge';
import { useToast } from '../context/ToastContext';
import { mockServices, mockUser } from '../data/mockData';

export const Apply = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const reviewRef = useRef(null);

  const service = mockServices.find((s) => s.id === serviceId) || mockServices[0];
  const storageKey = `nagrik_apply_${service.id}`;

  // Default initial values:
  // Bank account and address proof are initially empty to demonstrate dynamic 83% readiness and incomplete item attention
  const defaultValues = {
    fullName: mockUser.name || 'Rajesh Kumar Sharma',
    dateOfBirth: '1998-05-15',
    education: '12th Pass (Higher Secondary)',
    annualIncome: '180000',
    category: 'OBC',
    bankAccount: '',
    ifscCode: 'SBIN0001234',
    hasAddressProof: false,
    isAadhaarLinked: true,
  };

  // Load from localStorage if present
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return defaultValues;
  });

  // Current step: 1 to 6 (questions), or 'readiness'
  const [currentStep, setCurrentStep] = useState(1);
  const [validationError, setValidationError] = useState('');
  
  // Submission state: 'idle' | 'submitting' | 'submitted' | 'error'
  const [submissionState, setSubmissionState] = useState('idle');
  const [submittedData, setSubmittedData] = useState(null);

  // Sync with localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    } catch (e) {
      // ignore
    }
  }, [formData, storageKey]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  // Validation function per question step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName?.trim()) {
          setValidationError('Please enter your name.');
          return false;
        }
        break;
      case 2:
        if (!formData.dateOfBirth?.trim()) {
          setValidationError('Please enter your date of birth.');
          return false;
        }
        break;
      case 3:
        if (!formData.education?.trim()) {
          setValidationError('Please select your education qualification.');
          return false;
        }
        break;
      case 4:
        if (!formData.annualIncome?.toString().trim()) {
          setValidationError("Please enter your family's annual income.");
          return false;
        }
        break;
      case 5:
        if (!formData.category?.trim()) {
          setValidationError('Please select your category.');
          return false;
        }
        break;
      case 6:
        // When stepping through Question 6, inform the user if fields are left blank, but allow them to proceed to Readiness to view missing items
        if (!formData.bankAccount?.trim()) {
          setValidationError('Please enter your bank account number.');
          return false;
        }
        break;
      default:
        break;
    }
    setValidationError('');
    return true;
  };

  const handleContinue = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep('readiness');
      toast.info('Readiness Assessment', 'Calculating application readiness and checklist.');
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep === 'readiness') {
      setCurrentStep(6);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Jump to specific step for editing
  const handleEditSection = (stepNumber) => {
    setCurrentStep(stepNumber);
    setValidationError('');
  };

  // ==================================================
  // CHECKLIST & DYNAMIC READINESS CALCULATION (PHASE 7)
  // ==================================================
  // 6 checklist modules matching prompt:
  // ✓ Eligibility
  // ✓ Personal Information
  // ✓ Education Details
  // ✓ Required Documents
  // ✓ Application Details
  // ⚠ Bank Details
  const checklist = [
    {
      id: 'eligibility',
      label: 'Eligibility',
      isComplete: Boolean(formData.annualIncome?.toString().trim() && formData.category?.trim()),
      step: 4,
    },
    {
      id: 'personal',
      label: 'Personal Information',
      isComplete: Boolean(formData.fullName?.trim() && formData.dateOfBirth?.trim()),
      step: 1,
    },
    {
      id: 'education',
      label: 'Education Details',
      isComplete: Boolean(formData.education?.trim()),
      step: 3,
    },
    {
      id: 'documents',
      label: 'Required Documents',
      isComplete: true, // Pre-verified from Phase 5 / DigiLocker
      step: 'docs',
    },
    {
      id: 'appDetails',
      label: 'Application Details',
      isComplete: Boolean(formData.isAadhaarLinked),
      step: 6,
    },
    {
      id: 'bank',
      label: 'Bank Details',
      isComplete: Boolean(formData.bankAccount?.trim() && formData.ifscCode?.trim() && formData.hasAddressProof),
      step: 6,
    },
  ];

  // Dynamic readiness percentage: completed requirements / total requirements * 100
  const completedRequirementsCount = checklist.filter((item) => item.isComplete).length;
  const totalRequirementsCount = checklist.length; // 6
  const readinessPercentage = Math.round((completedRequirementsCount / totalRequirementsCount) * 100);

  // Missing items list with direct action buttons [Complete Now →]
  const getMissingItems = () => {
    const missing = [];
    if (!formData.fullName?.trim()) {
      missing.push({ id: 'name', label: 'Full name', step: 1 });
    }
    if (!formData.dateOfBirth?.trim()) {
      missing.push({ id: 'dob', label: 'Date of birth', step: 2 });
    }
    if (!formData.education?.trim()) {
      missing.push({ id: 'edu', label: 'Education qualification', step: 3 });
    }
    if (!formData.annualIncome?.toString().trim()) {
      missing.push({ id: 'income', label: "Family's annual income", step: 4 });
    }
    if (!formData.category?.trim()) {
      missing.push({ id: 'cat', label: 'Social category', step: 5 });
    }
    if (!formData.bankAccount?.trim()) {
      missing.push({ id: 'bank', label: 'Bank account number', step: 6 });
    }
    if (!formData.hasAddressProof) {
      missing.push({ id: 'address', label: 'Address proof', step: 6 });
    }
    return missing;
  };

  const missingItems = getMissingItems();
  const isReadyToSubmit = missingItems.length === 0;

  // Scroll to review section
  const handleScrollToReview = () => {
    if (reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Demo application ID generator: e.g. NM-SCH-2026-00124
  const generateApplicationId = () => {
    const prefixMap = {
      'national-scholarship': 'NM-SCH',
      'pm-kisan': 'NM-KIS',
      'ayushman-bharat': 'NM-AYU',
      'pm-awas': 'NM-AWA',
    };
    const prefix = prefixMap[service.id] || 'NM-SCH';
    const year = '2026';
    const randomSeq = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${year}-00${randomSeq}`;
  };

  // Submission handler with loading and confirmation
  const handleFinalSubmit = () => {
    if (!isReadyToSubmit) {
      toast.warning('Attention Required', 'Please complete all missing items before submitting.');
      return;
    }

    setSubmissionState('submitting');

    setTimeout(() => {
      // Generate demo application ID e.g. NM-SCH-2026-00124
      const generatedId = generateApplicationId();
      const submissionDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      const applicationRecord = {
        id: generatedId,
        serviceId: service.id,
        serviceName: service.name,
        department: service.dept || 'Department of Welfare Services',
        category: service.category || 'Scholarships',
        status: 'submitted',
        submissionDate: submissionDate,
        slaDueDate: '15 Oct 2026',
        officerAssigned: 'Sub-Divisional Scrutiny Officer',
        steps: ['Submitted', 'Scrutiny', 'Field Verification', 'Sanctioned'],
        stepIndex: 0,
        applicantName: formData.fullName,
        formData: { ...formData },
        remarks: 'Application submitted successfully. Under initial administrative scrutiny.',
        timeline: [
          {
            date: `${submissionDate}, Just now`,
            event: 'Application submitted successfully by citizen',
            actor: `${formData.fullName} (Applicant)`,
          },
          {
            date: `${submissionDate}, Just now`,
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

      // Persist in localStorage so /applications and /applications/:id can immediately display it
      try {
        const existing = JSON.parse(localStorage.getItem('nagrik_submitted_apps') || '[]');
        localStorage.setItem(
          'nagrik_submitted_apps',
          JSON.stringify([applicationRecord, ...existing])
        );
      } catch (e) {
        // ignore
      }

      setSubmittedData(applicationRecord);
      setSubmissionState('submitted');
      toast.success(
        'Application Submitted',
        `Reference ID ${generatedId} generated successfully.`
      );
    }, 1200);
  };

  // Helper for desktop summary panel state
  const getModuleStatus = (moduleName) => {
    if (moduleName === 'Personal Details') {
      if (currentStep > 2 || currentStep === 'readiness') return 'done';
      if (currentStep <= 2) return 'active';
      return 'pending';
    }
    if (moduleName === 'Education') {
      if (currentStep > 3 || currentStep === 'readiness') return 'done';
      if (currentStep === 3) return 'active';
      return 'pending';
    }
    if (moduleName === 'Eligibility') {
      if (currentStep > 5 || currentStep === 'readiness') return 'done';
      if (currentStep === 4 || currentStep === 5) return 'active';
      return 'pending';
    }
    if (moduleName === 'Documents') {
      return 'done'; // Verified prior to application
    }
    if (moduleName === 'Application Details') {
      if (currentStep === 'readiness') return isReadyToSubmit ? 'done' : 'active';
      if (currentStep === 6) return 'active';
      return 'pending';
    }
    return 'pending';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to={`/services/${service.id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Service Details</span>
        </Link>

        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Official Application Desk
        </span>
      </div>

      {/* Main Title & Service Context */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Application for {service.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          {service.dept} • Fast conversational citizen onboarding
        </p>
      </div>

      {/* ==================================================
          MAIN LAYOUT: TWO COLUMNS (SUMMARY PANEL ON LEFT, WIZARD ON RIGHT)
          ================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ==================================================
            DESKTOP SUMMARY PANEL (LEFT SIDEBAR)
            ================================================== */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card-hover p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Application Checklist
              </span>
              <span className="text-xs font-semibold text-teal-800">
                {currentStep === 'readiness' ? 'Readiness' : `Step ${currentStep} of 6`}
              </span>
            </div>

            {/* Desktop progress summary list with exact format:
                Personal Details ✓
                Education ✓
                Eligibility ✓
                Documents ✓
                Application Details ●
            */}
            <div className="space-y-2 text-xs font-medium">
              {[
                { name: 'Personal Details', step: 1 },
                { name: 'Education', step: 3 },
                { name: 'Eligibility', step: 4 },
                { name: 'Documents', step: 'docs' },
                { name: 'Application Details', step: 6 },
              ].map((item) => {
                const status = getModuleStatus(item.name);
                return (
                  <div
                    key={item.name}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                      status === 'active'
                        ? 'bg-teal-50/60 border-teal-200 text-teal-900 font-semibold'
                        : 'bg-slate-50 border-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{item.name}</span>
                    {status === 'done' ? (
                      <span className="font-bold text-emerald-600 text-xs">✓</span>
                    ) : status === 'active' ? (
                      <span className="font-bold text-teal-700 text-xs">●</span>
                    ) : (
                      <span className="text-slate-300 text-xs">○</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dynamic Application Readiness Indicator */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Application Readiness</span>
                <span className={`font-bold ${isReadyToSubmit ? 'text-emerald-700' : 'text-teal-800'}`}>
                  {readinessPercentage}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isReadyToSubmit ? 'bg-emerald-600' : 'bg-teal-700'
                  }`}
                  style={{ width: `${readinessPercentage}%` }}
                />
              </div>

              {currentStep !== 'readiness' && (
                <button
                  type="button"
                  onClick={() => setCurrentStep('readiness')}
                  className="w-full text-center text-[11px] font-semibold text-teal-700 hover:text-teal-800 pt-1 transition-colors"
                >
                  View Readiness Assessment →
                </button>
              )}
            </div>

            {/* Local Persistence Reassurance */}
            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
              <span>Progress automatically saved locally</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT COLUMN: QUESTIONS OR READINESS & SUBMISSION
            ================================================== */}
        <div className="lg:col-span-2 space-y-4">
          {/* ==================================================
              STAGE A: QUESTIONS (STEPS 1 TO 6)
              ================================================== */}
          {currentStep !== 'readiness' && submissionState === 'idle' && (
            <div className="card-hover p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Simple Visual Step Tracker: Application ●────○────○────○ (Step X of 6) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Application</span>
                  <span className="font-bold text-teal-800">
                    Step {currentStep} of 6
                  </span>
                </div>

                {/* Progress dot-line track */}
                <div className="flex items-center justify-between pt-1">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <React.Fragment key={num}>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all ${
                          num < currentStep
                            ? 'bg-emerald-600 text-white'
                            : num === currentStep
                            ? 'bg-teal-700 text-white ring-4 ring-teal-50'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {num < currentStep ? '✓' : num === currentStep ? '●' : '○'}
                      </div>
                      {num < 6 && (
                        <div
                          className={`flex-1 h-0.5 mx-1 transition-colors ${
                            num < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Conversational Question Canvas: ONE QUESTION AT A TIME */}
              <div className="py-4 space-y-4">
                {/* Question 1: Full Name */}
                {currentStep === 1 && (
                  <div className="space-y-3">
                    <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      What is your full name?
                    </label>
                    <p className="text-xs text-slate-500">
                      Please enter your name as recorded on your official identification card.
                    </p>
                    <div className="pt-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => updateField('fullName', e.target.value)}
                          placeholder="Enter your name"
                          autoFocus
                          className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 transition-colors"
                        />
                        <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Question 2: Date of Birth */}
                {currentStep === 2 && (
                  <div className="space-y-3">
                    <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      What is your date of birth?
                    </label>
                    <p className="text-xs text-slate-500">
                      Used to confirm statutory age qualification for this welfare scheme.
                    </p>
                    <div className="pt-2 max-w-xs">
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => updateField('dateOfBirth', e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Question 3: Education */}
                {currentStep === 3 && (
                  <div className="space-y-3">
                    <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      What is your highest level of education?
                    </label>
                    <p className="text-xs text-slate-500">
                      Select your highest completed educational standard from the list below.
                    </p>
                    <div className="pt-2 max-w-md">
                      <select
                        value={formData.education}
                        onChange={(e) => updateField('education', e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700 cursor-pointer"
                      >
                        <option value="">Select your education level</option>
                        <option value="10th Pass (Matriculation)">10th Pass (Matriculation)</option>
                        <option value="12th Pass (Higher Secondary)">12th Pass (Higher Secondary)</option>
                        <option value="Undergraduate / Degree / Diploma">Undergraduate / Degree / Diploma</option>
                        <option value="Postgraduate & Above">Postgraduate & Above</option>
                        <option value="Below 10th / Secondary">Below 10th / Secondary</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Question 4: Family Income */}
                {currentStep === 4 && (
                  <div className="space-y-3">
                    <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      What is your family's annual income?
                    </label>
                    <p className="text-xs text-slate-500">
                      Total combined household income per year from all sources.
                    </p>
                    <div className="pt-2 max-w-sm">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          value={formData.annualIncome}
                          onChange={(e) => updateField('annualIncome', e.target.value)}
                          placeholder="e.g. 180000"
                          className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700"
                        />
                      </div>

                      {/* Quick preset selector */}
                      <div className="flex flex-wrap gap-2 pt-2 text-xs">
                        <span className="text-slate-400 py-1">Quick choose:</span>
                        {['80000', '150000', '180000', '240000'].map((preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => updateField('annualIncome', preset)}
                            className={`px-2.5 py-1 rounded-lg border text-xs ${
                              formData.annualIncome === preset
                                ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            ₹ {parseInt(preset, 10).toLocaleString('en-IN')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Question 5: Social Category */}
                {currentStep === 5 && (
                  <div className="space-y-3">
                    <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      Which social category do you belong to?
                    </label>
                    <p className="text-xs text-slate-500">
                      Please select your category as registered in official state revenue records.
                    </p>
                    <div className="pt-2 space-y-2 max-w-md">
                      {[
                        { id: 'General', name: 'General Category' },
                        { id: 'OBC', name: 'Other Backward Class (OBC)' },
                        { id: 'SC', name: 'Scheduled Caste (SC)' },
                        { id: 'ST', name: 'Scheduled Tribe (ST)' },
                        { id: 'EWS', name: 'General (Economically Weaker Section - EWS)' },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center space-x-3 text-xs sm:text-sm ${
                            formData.category === item.id
                              ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={item.id}
                            checked={formData.category === item.id}
                            onChange={(e) => updateField('category', e.target.value)}
                            className="w-4 h-4 text-teal-700 border-slate-300 focus:ring-teal-700 cursor-pointer"
                          />
                          <span className="flex-1">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Question 6: Bank Account & Address Proof */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="block text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        What is your bank account number for direct benefits?
                      </label>
                      <p className="text-xs text-slate-500">
                        Enter the bank account where DBT installments or scholarships should be deposited.
                      </p>
                    </div>

                    <div className="space-y-3 max-w-md">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Bank Account Number
                        </label>
                        <input
                          type="text"
                          value={formData.bankAccount}
                          onChange={(e) => updateField('bankAccount', e.target.value)}
                          placeholder="e.g. 501004829104"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Bank IFSC Code
                        </label>
                        <input
                          type="text"
                          value={formData.ifscCode}
                          onChange={(e) => updateField('ifscCode', e.target.value.toUpperCase())}
                          placeholder="e.g. SBIN0001234"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 uppercase focus:outline-none focus:border-teal-700 focus:bg-white"
                        />
                      </div>

                      <div className="pt-2 space-y-2.5">
                        <label className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.hasAddressProof}
                            onChange={(e) => updateField('hasAddressProof', e.target.checked)}
                            className="w-4 h-4 rounded text-teal-700 border-slate-300 focus:ring-teal-700 mt-0.5 cursor-pointer"
                          />
                          <div className="text-xs text-slate-700 leading-snug">
                            <span className="font-semibold text-slate-900 block">Address proof confirmed</span>
                            <span>I have valid address proof (Aadhaar, Voter ID, or Electricity Bill) matching my residential address.</span>
                          </div>
                        </label>

                        <label className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.isAadhaarLinked}
                            onChange={(e) => updateField('isAadhaarLinked', e.target.checked)}
                            className="w-4 h-4 rounded text-teal-700 border-slate-300 focus:ring-teal-700 mt-0.5 cursor-pointer"
                          />
                          <div className="text-xs text-slate-700 leading-snug">
                            <span className="font-semibold text-slate-900 block">Aadhaar-seeded bank account</span>
                            <span>This account is active and seeded with Aadhaar for Direct Benefit Transfer (DBT).</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Validation Error Message */}
                {validationError && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  icon={ArrowLeft}
                >
                  Back
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleContinue}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="px-6"
                >
                  {currentStep === 6 ? 'Continue to Readiness & Review →' : 'Continue →'}
                </Button>
              </div>
            </div>
          )}

          {/* ==================================================
              STAGE B: READINESS & FINAL REVIEW (PHASE 7)
              ================================================== */}
          {currentStep === 'readiness' && submissionState === 'idle' && (
            <div className="space-y-6">
              {/* 1. Readiness Header Card */}
              <div className="card-hover p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {isReadyToSubmit
                        ? 'Your application is ready to submit ✓'
                        : 'Your Application is Almost Ready'}
                    </h2>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isReadyToSubmit
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {isReadyToSubmit ? '100% Ready' : `${readinessPercentage}% Complete`}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Review the information below before submitting your application.
                  </p>
                </div>

                {/* Application Readiness Progress Bar */}
                <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Application Readiness</span>
                    <span className={`font-bold ${isReadyToSubmit ? 'text-emerald-700' : 'text-teal-800'}`}>
                      {isReadyToSubmit ? '100% Ready' : `${readinessPercentage}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isReadyToSubmit ? 'bg-emerald-600' : 'bg-teal-700'
                      }`}
                      style={{ width: `${readinessPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Readiness Checklist:
                    ✓ Eligibility
                    ✓ Personal Information
                    ✓ Education Details
                    ✓ Required Documents
                    ✓ Application Details
                    ⚠ Bank Details
                */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Readiness Verification Checklist
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {checklist.map((item) => (
                      <div
                        key={item.id}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                          item.isComplete
                            ? 'bg-slate-50/70 border-slate-200/80 text-slate-800'
                            : 'bg-amber-50/60 border-amber-200 text-amber-950 font-medium'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {item.isComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <span className="text-amber-700 font-bold text-sm">⚠</span>
                          )}
                          <span>{item.label}</span>
                        </div>

                        {!item.isComplete && (
                          <button
                            type="button"
                            onClick={() => handleEditSection(item.step)}
                            className="text-[11px] font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2"
                          >
                            Resolve
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Information Attention Box (When Incomplete) */}
                {!isReadyToSubmit && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-bold text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>
                        {missingItems.length} {missingItems.length === 1 ? 'item needs' : 'items need'} your attention
                      </span>
                    </div>

                    <div className="space-y-2">
                      {missingItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 border border-amber-200/80 text-xs"
                        >
                          <div className="flex items-center space-x-2 text-amber-900 font-medium">
                            <span className="text-amber-700 font-bold">⚠</span>
                            <span>{item.label}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleEditSection(item.step)}
                            className="inline-flex items-center space-x-1 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors"
                          >
                            <span>Complete Now</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Readiness Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleBack}
                    icon={ArrowLeft}
                  >
                    Back to Questions
                  </Button>

                  <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleScrollToReview}
                    >
                      Review Application
                    </Button>

                    <Button
                      variant="primary"
                      size="md"
                      disabled={!isReadyToSubmit}
                      onClick={handleFinalSubmit}
                      icon={Sparkles}
                      className="px-6 flex-1 sm:flex-none"
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              </div>

              {/* 2. Final Review Summary Section */}
              <div
                ref={reviewRef}
                className="card-hover p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5"
              >
                <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Final Review
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Verify your submitted information across all 5 modules
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-slate-500">
                    5 of 5 Modules
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Section 1: Personal Information */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Personal Information
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Completed ✓
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditSection(1)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Full Name:</span>
                        <span className="font-semibold text-slate-800">{formData.fullName || '—'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Date of Birth:</span>
                        <span className="font-semibold text-slate-800">{formData.dateOfBirth || '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Education */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Education
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Completed ✓
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditSection(3)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 block text-[11px]">Highest Level:</span>
                      <span className="font-semibold text-slate-800">{formData.education || '—'}</span>
                    </div>
                  </div>

                  {/* Section 3: Eligibility */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Eligibility
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Completed ✓
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditSection(4)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Annual Family Income:</span>
                        <span className="font-semibold text-slate-800">
                          {formData.annualIncome
                            ? `₹ ${parseInt(formData.annualIncome, 10).toLocaleString('en-IN')}`
                            : '—'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Social Category:</span>
                        <span className="font-semibold text-slate-800">{formData.category || '—'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Documents */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Documents
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Completed ✓
                        </span>
                      </div>
                      <Link
                        to={`/documents?service=${service.id}`}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Aadhaar Identity Card (DigiLocker Synced)</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Annual Income Certificate (State e-District Verified)</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: Application Details */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Application Details
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                            formData.bankAccount && formData.hasAddressProof
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                              : 'text-amber-800 bg-amber-50 border-amber-200'
                          }`}
                        >
                          {formData.bankAccount && formData.hasAddressProof ? 'Completed ✓' : 'Incomplete ⚠'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditSection(6)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-800"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Applied Scheme:</span>
                        <span className="font-semibold text-slate-800">{service.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Bank Account (Masked):</span>
                        <span className="font-semibold font-mono text-slate-800">
                          {formData.bankAccount
                            ? `•••• ${formData.bankAccount.slice(-4)} (${formData.ifscCode})`
                            : 'Not entered ⚠'}
                        </span>
                      </div>
                      <div className="col-span-2 text-[11px] text-slate-500 pt-1 flex items-center space-x-1.5">
                        {formData.hasAddressProof ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Address proof verified for permanent residence</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span className="text-amber-800">Address proof confirmation pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final Submit CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <Button
                    variant="primary"
                    size="md"
                    disabled={!isReadyToSubmit}
                    onClick={handleFinalSubmit}
                    icon={Sparkles}
                    className="px-8 w-full sm:w-auto"
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              STAGE C: SUBMISSION LOADING STATE (PHASE 7)
              ================================================== */}
          {submissionState === 'submitting' && (
            <div className="p-10 sm:p-12 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-xs">
                <Loader2 className="w-7 h-7 animate-spin" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Submitting your application…
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  Please wait while your verified data and documents are registered securely with the citizen service system.
                </p>
              </div>
              <div className="text-[11px] text-slate-400">
                This will only take a moment. Please do not close this window.
              </div>
            </div>
          )}

          {/* ==================================================
              STAGE D: SUBMISSION CONFIRMATION PAGE (PHASE 7)
              ================================================== */}
          {submissionState === 'submitted' && submittedData && (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
              {/* Success Header */}
              <div className="text-center space-y-2 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Application Submitted Successfully ✓
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                  Your application has been received and registered under official citizen records.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Official Application Receipt
                  </span>
                  <StatusBadge status="submitted" size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Service</span>
                    <span className="font-bold text-slate-900 text-sm">
                      {submittedData.serviceName}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {submittedData.department}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Application ID</span>
                    <span className="font-mono font-bold text-teal-800 text-sm sm:text-base">
                      {submittedData.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Submission Date</span>
                    <span className="font-semibold text-slate-800">
                      {submittedData.submissionDate}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[11px]">Current Status</span>
                    <span className="font-semibold text-emerald-800 flex items-center space-x-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Submitted</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Reassurance & Tracking Notice */}
              <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 flex items-start space-x-2.5">
                <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold">Next Steps & Updates</span>
                  <p className="text-teal-900/90 leading-relaxed text-[11px]">
                    Your reference ID is now active. You will receive SMS alerts as your file advances through administrative scrutiny.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Track Application & Back to Dashboard */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => navigate('/dashboard')}
                  icon={Home}
                  className="w-full sm:w-auto"
                >
                  Back to Dashboard
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => navigate(`/applications/${submittedData.id}`)}
                  icon={ArrowRight}
                  iconPosition="right"
                  className="px-6 w-full sm:w-auto"
                >
                  Track Application
                </Button>
              </div>
            </div>
          )}

          {/* ==================================================
              STAGE E: SUBMISSION FAILURE / RETRY UX (PHASE 7)
              ================================================== */}
          {submissionState === 'error' && (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center mx-auto shadow-xs">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Your application could not be submitted.
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  A temporary connection issue interrupted submission. None of your entered details were lost.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmissionState('idle')}
                >
                  Back to Review
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  icon={RotateCcw}
                  onClick={handleFinalSubmit}
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
