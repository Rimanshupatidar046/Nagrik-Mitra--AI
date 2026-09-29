import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  IndianRupee,
  Users,
  BookOpen,
  XCircle,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';
import { mockServices } from '../data/mockData';

export const Eligibility = () => {
  const [searchParams] = useSearchParams();
  const targetedSchemeId = searchParams.get('scheme');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Wizard Step: 1 to 7, or 'result'
  const [currentStep, setCurrentStep] = useState(1);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    age: '24',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    education: '12th Pass (Higher Secondary)',
    occupation: 'Student / Scholar',
    incomeRange: '100k-250k', // 'below-100k', '100k-250k', '250k-500k', 'above-500k'
    category: 'OBC', // 'OBC', 'SC', 'ST', 'EWS', 'General'
    studentStatus: 'Yes, currently a full-time student', // 'Yes, currently a full-time student', 'Yes, part-time', 'No, not currently studying'
  });

  // Target scheme if navigated from Service Details
  const targetedScheme = mockServices.find((s) => s.id === targetedSchemeId);

  // Quick helper to update state
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      handleCheckEligibility();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCheckEligibility = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setCurrentStep('result');
      toast.success(
        'Eligibility Evaluated',
        'Calculated scheme compatibility based on your answers.'
      );
    }, 500);
  };

  const handleRestart = () => {
    setCurrentStep(1);
  };

  // Predefined transparent JavaScript rules
  const evaluateResults = () => {
    const ageNum = parseInt(formData.age, 10) || 24;
    const isStudent = formData.studentStatus.includes('Yes');
    const isLowIncome = formData.incomeRange === 'below-100k' || formData.incomeRange === '100k-250k';
    const isMiddleIncome = formData.incomeRange === '250k-500k';
    const isHighIncome = formData.incomeRange === 'above-500k';
    const isFarmer = formData.occupation.includes('Farmer');
    const isReservedCategory = ['OBC', 'SC', 'ST', 'EWS'].includes(formData.category);

    const eligibleSchemes = [];
    const notEligibleSchemes = [];

    // Rule 1: Post-Matric Scholarship Scheme
    if (isStudent && isLowIncome) {
      eligibleSchemes.push({
        id: 'national-scholarship',
        name: 'Post-Matric Scholarship Scheme',
        category: 'Scholarships',
        benefit: 'Full Tuition + ₹1,200/mo',
        explanation: 'Provides financial aid and monthly stipend for students in recognized colleges.',
        matchedRequirements: [
          'Education level matches post-secondary requirements',
          'Currently enrolled student status verified',
          'Family income is within the ₹2.5 Lakh per annum ceiling',
        ],
        missingRequirement: 'Income certificate and college bonafide need verification upon application.',
      });
    } else {
      let reason = 'Reported family income exceeds the ₹2.5 Lakh ceiling for this scholarship.';
      if (!isStudent) {
        reason = 'This scheme requires active enrollment as a student in a school or college.';
      }
      notEligibleSchemes.push({
        id: 'national-scholarship',
        name: 'Post-Matric Scholarship Scheme',
        category: 'Scholarships',
        reason,
      });
    }

    // Rule 2: PM Kisan Samman Nidhi
    if (isFarmer && ageNum >= 18) {
      eligibleSchemes.push({
        id: 'pm-kisan',
        name: 'PM Kisan Samman Nidhi',
        category: 'Welfare Schemes',
        benefit: '₹6,000 / year',
        explanation: 'Direct income support of ₹6,000 per year transferred in 3 equal installments.',
        matchedRequirements: [
          'Applicant meets the minimum age requirement (18+)',
          'Primary occupation registered as farming/agriculture',
          'Valid residential district jurisdiction verified',
        ],
        missingRequirement: 'Land ownership record (Khatauni) needs to be matched in state Bhulekh portal.',
      });
    } else {
      let reason = 'PM-KISAN is exclusively for families with registered agricultural landholding.';
      if (ageNum < 18) {
        reason = 'Applicant must be at least 18 years of age.';
      }
      notEligibleSchemes.push({
        id: 'pm-kisan',
        name: 'PM Kisan Samman Nidhi',
        category: 'Welfare Schemes',
        reason,
      });
    }

    // Rule 3: Ayushman Bharat (PM-JAY)
    if (isLowIncome || (isReservedCategory && !isHighIncome)) {
      eligibleSchemes.push({
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat (PM-JAY)',
        category: 'Healthcare',
        benefit: '₹5,00,000 / family / year',
        explanation: 'Free cashless secondary and tertiary medical treatment at empaneled hospitals.',
        matchedRequirements: [
          'Annual family income falls within the welfare benchmark',
          'Social category qualifies under economic deprivation criteria',
          'All household members covered with zero age limit',
        ],
        missingRequirement: 'Household ID must be mapped to NFSA Ration Card or SECC registry.',
      });
    } else {
      notEligibleSchemes.push({
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat (PM-JAY)',
        category: 'Healthcare',
        reason: 'Reported family income exceeds the economic threshold for free PM-JAY health protection.',
      });
    }

    // Rule 4: MGNREGA Rural Employment Guarantee
    if (ageNum >= 18 && !formData.occupation.includes('Salaried')) {
      eligibleSchemes.push({
        id: 'mgnrega-job-card',
        name: 'MGNREGA Rural Employment Support',
        category: 'Employment',
        benefit: '100 Days Paid Wage Work',
        explanation: 'Guaranteed 100 days of unskilled wage work per year within 5 km of residence.',
        matchedRequirements: [
          'Meets adult citizen age criteria (18 years and above)',
          'Not engaged in permanent government or salaried employment',
          'Resident in an eligible district jurisdiction',
        ],
        missingRequirement: 'Local Gram Panchayat residence certificate required for job card issuance.',
      });
    } else {
      notEligibleSchemes.push({
        id: 'mgnrega-job-card',
        name: 'MGNREGA Rural Employment Support',
        category: 'Employment',
        reason: 'Salaried public/private employees or individuals under 18 are not eligible for MGNREGA manual work cards.',
      });
    }

    // Rule 5: Income Certificate
    eligibleSchemes.push({
      id: 'income-certificate',
      name: 'Income Certificate',
      category: 'Certificates',
      benefit: 'Official State Income Proof',
      explanation: 'Statutory certificate certifying annual family earnings issued by the Revenue Tehsildar.',
      matchedRequirements: [
        'Resident of state revenue jurisdiction',
        'Self-declaration of family income ready for Lekhpal enquiry',
      ],
      missingRequirement: 'Utility bill and salary slip / affidavit needed upon application submission.',
    });

    // Rule 6: Learner & Driving License
    if (ageNum >= 18) {
      eligibleSchemes.push({
        id: 'driving-license',
        name: 'Learner & Driving License (Sarathi)',
        category: 'Licenses',
        benefit: 'Online Contactless RTO Test',
        explanation: 'Official legal authorization to drive motor vehicles on public roads across India.',
        matchedRequirements: [
          'Applicant is 18 years of age or older',
          'Eligible for online home-based learner license test',
        ],
        missingRequirement: 'Passing computerized audio-visual road safety traffic test.',
      });
    } else {
      notEligibleSchemes.push({
        id: 'driving-license',
        name: 'Learner & Driving License (Sarathi)',
        category: 'Licenses',
        reason: 'Minimum age for operating a private light motor vehicle is 18 years.',
      });
    }

    return { eligibleSchemes, notEligibleSchemes };
  };

  const { eligibleSchemes, notEligibleSchemes } = evaluateResults();

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-2">
      {/* Target Scheme Notice if arrived from Service Details */}
      {targetedScheme && currentStep !== 'result' && (
        <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-between text-xs text-teal-900">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
            <span>
              Checking potential eligibility for: <strong>{targetedScheme.name}</strong>
            </span>
          </div>
          <Link
            to={`/services/${targetedScheme.id}`}
            className="font-semibold text-teal-700 hover:text-teal-800 underline"
          >
            View Scheme
          </Link>
        </div>
      )}

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Check Your Eligibility
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Answer a few simple questions to find services and schemes you may qualify for.
        </p>
      </div>

      {/* ==================================================
          STEP-BY-STEP WIZARD (Steps 1 to 7)
          ================================================== */}
      {currentStep !== 'result' && (
        <div className="card-hover bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-teal-800">
                Step {currentStep} of 7
              </span>
              <span className="text-slate-400">
                {Math.round((currentStep / 7) * 100)}% Completed
              </span>
            </div>

            {/* Progress bar track */}
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-teal-700 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Step Content */}
          <div className="pt-2">
            {/* Step 1: Age */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <User className="w-4 h-4 text-teal-700" />
                    <span>How old are you?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Age determines eligibility for youth scholarships, pension schemes, and driving licenses.
                  </p>
                </div>

                <div className="pt-2 max-w-xs">
                  <div className="relative">
                    <input
                      type="number"
                      min="10"
                      max="100"
                      value={formData.age}
                      onChange={(e) => updateField('age', e.target.value)}
                      placeholder="e.g. 24"
                      className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-bold text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white focus:ring-1 focus:ring-teal-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      Years
                    </span>
                  </div>
                </div>

                {/* Quick preset pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-slate-400 font-medium">Quick select:</span>
                  {['18', '21', '24', '35', '45', '60'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => updateField('age', preset)}
                      className={`px-3 py-1.5 rounded-lg border transition-colors ${
                        formData.age === preset
                          ? 'bg-teal-50 border-teal-300 text-teal-800 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {preset} yrs
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: State / District */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-teal-700" />
                    <span>Where do you reside?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Many government programs and revenue certificates are administered at the state and district level.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      State / Union Territory
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Delhi">Delhi (NCT)</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Gujarat">Gujarat</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      District
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => updateField('district', e.target.value)}
                      placeholder="e.g. Varanasi, Lucknow, Pune"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-700 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Education */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    <span>What is your highest educational level?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Used to identify eligible college scholarships, fee waivers, and technical apprenticeships.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    'Below 10th / Middle School',
                    '10th Pass (Matriculation)',
                    '12th Pass (Higher Secondary)',
                    'Undergraduate / Diploma / ITI Degree',
                    'Postgraduate / Masters & Above',
                  ].map((level) => (
                    <div
                      key={level}
                      onClick={() => updateField('education', level)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        formData.education === level
                          ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{level}</span>
                      {formData.education === level && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Occupation */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Briefcase className="w-4 h-4 text-teal-700" />
                    <span>What is your primary occupation?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Many welfare benefits are targeted towards farmers, students, or unorganized workers.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { label: 'Farmer / Agricultural Laborer', desc: 'Cultivating crops or working on farm lands' },
                    { label: 'Student / Scholar', desc: 'Enrolled in school, college, or university courses' },
                    { label: 'Daily Wage / Unorganized Worker', desc: 'Construction, transport, or informal manual labor' },
                    { label: 'Self-Employed / Artisan / Small Trader', desc: 'Running a small shop, handicraft, or trade' },
                    { label: 'Salaried (Private / Public Employee)', desc: 'Regular salary with formal employer benefits' },
                    { label: 'Unemployed / Looking for Work', desc: 'Currently seeking job placement or skill training' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      onClick={() => updateField('occupation', item.label)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        formData.occupation === item.label
                          ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                      {formData.occupation === item.label && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Annual Family Income */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-teal-700" />
                    <span>What is your approximate annual family income?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Government schemes use income ceilings to grant subsidies, scholarships, and free healthcare.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    {
                      id: 'below-100k',
                      title: 'Below ₹ 1,00,000 / year',
                      desc: 'Eligible for maximum BPL, Antyodaya, and EWS subsidies',
                    },
                    {
                      id: '100k-250k',
                      title: '₹ 1,00,000 – ₹ 2,50,000 / year',
                      desc: 'Eligible for scholarships, Ayushman Bharat, and PM-KISAN',
                    },
                    {
                      id: '250k-500k',
                      title: '₹ 2,50,000 – ₹ 5,00,000 / year',
                      desc: 'Eligible for housing interest subsidies and education loans',
                    },
                    {
                      id: 'above-500k',
                      title: 'Above ₹ 5,00,000 / year',
                      desc: 'Eligible for utility, business licenses, and general citizen services',
                    },
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => updateField('incomeRange', tier.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        formData.incomeRange === tier.id
                          ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div>{tier.title}</div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                          {tier.desc}
                        </div>
                      </div>
                      {formData.incomeRange === tier.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Category */}
            {currentStep === 6 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Users className="w-4 h-4 text-teal-700" />
                    <span>Which social category do you belong to?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Affirmative social welfare schemes provide fee waivers and grants for notified communities.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { id: 'OBC', name: 'Other Backward Class (OBC)' },
                    { id: 'SC', name: 'Scheduled Caste (SC)' },
                    { id: 'ST', name: 'Scheduled Tribe (ST)' },
                    { id: 'EWS', name: 'Economically Weaker Section (General EWS)' },
                    { id: 'General', name: 'General Category' },
                  ].map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => updateField('category', cat.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        formData.category === cat.id
                          ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      {formData.category === cat.id && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Student Status */}
            {currentStep === 7 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-teal-700" />
                    <span>Are you currently enrolled as a student?</span>
                  </label>
                  <p className="text-xs text-slate-500">
                    Scholarships and educational allowances require active enrollment in a school, college, or university.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { label: 'Yes, currently a full-time student', desc: 'Attending regular school, college, or university' },
                    { label: 'Yes, enrolled in distance / part-time education', desc: 'Pursuing correspondence, online, or part-time degree' },
                    { label: 'No, not currently studying', desc: 'Working, looking for employment, or homemaker' },
                  ].map((status) => (
                    <div
                      key={status.label}
                      onClick={() => updateField('studentStatus', status.label)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        formData.studentStatus === status.label
                          ? 'bg-teal-50/70 border-teal-300 text-teal-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <div>{status.label}</div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                          {status.desc}
                        </div>
                      </div>
                      {formData.studentStatus === status.label && (
                        <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Action Controls */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              disabled={currentStep === 1}
              onClick={handleBack}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="md"
              isLoading={isEvaluating}
              icon={currentStep === 7 ? Sparkles : ArrowRight}
              iconPosition="right"
              onClick={handleNext}
              className="px-6"
            >
              {currentStep === 7 ? 'Check Eligibility' : 'Continue'}
            </Button>
          </div>
        </div>
      )}

      {/* ==================================================
          RESULT VIEW: SERVICES YOU MAY BE ELIGIBLE FOR
          ================================================== */}
      {currentStep === 'result' && (
        <div className="space-y-6">
          {/* Important Wording Disclaimer */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-800">
                Preliminary Compatibility Assessment
              </span>
              <p>
                Based on the information provided, you may be eligible for the schemes below. Final statutory sanctions require verification of original documents.
              </p>
            </div>
          </div>

          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Services You May Be Eligible For
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Matched against your reported profile ({formData.education}, {formData.occupation}, {formData.state})
              </p>
            </div>

            <Button
              variant="secondary"
              size="xs"
              icon={RotateCcw}
              onClick={handleRestart}
            >
              Edit Answers
            </Button>
          </div>

          {/* Eligible Schemes List */}
          <div className="space-y-4">
            {eligibleSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="card-hover p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {scheme.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                        Potentially Eligible
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                      {scheme.name}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[11px] text-slate-400">Entitlement:</span>
                    <div className="text-sm font-bold text-emerald-700">
                      {scheme.benefit}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {scheme.explanation}
                </p>

                {/* Matched Requirements */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-semibold text-slate-700 block">
                    Matched requirements:
                  </span>
                  <div className="space-y-1 text-xs text-slate-700">
                    {scheme.matchedRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing / Verification Warning */}
                {scheme.missingRequirement && (
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{scheme.missingRequirement}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => navigate(`/services/${scheme.id}`)}
                  >
                    View Service
                  </Button>

                  <Button
                    variant="primary"
                    size="xs"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      toast.info(
                        'Application Flow',
                        `Opening conversational application for ${scheme.name}.`
                      );
                      navigate(`/apply/${scheme.id}`);
                    }}
                  >
                    Start Application
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ==================================================
              NOT CURRENTLY ELIGIBLE SECTION
              ================================================== */}
          {notEligibleSchemes.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Not Currently Eligible
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Schemes where reported profile details do not currently match required government benchmarks.
                </p>
              </div>

              <div className="space-y-3">
                {notEligibleSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="card-hover p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {scheme.category}
                        </span>
                        <span className="font-semibold text-rose-600 flex items-center space-x-1">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Not currently eligible</span>
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {scheme.name}
                      </h4>
                      <p className="text-slate-500 leading-relaxed">
                        {scheme.reason}
                      </p>
                    </div>

                    <Button
                      variant="secondary"
                      size="xs"
                      className="shrink-0 text-xs"
                      onClick={() => navigate('/services')}
                    >
                      View Other Services
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={RotateCcw}
              onClick={handleRestart}
            >
              Restart Eligibility Check
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/services')}
            >
              Browse All Services
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Eligibility;
