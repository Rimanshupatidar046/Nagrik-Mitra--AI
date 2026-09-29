import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileCheck2,
  Upload,
  AlertCircle,
  CheckCircle2,
  Circle,
  FileText,
  Trash2,
  RefreshCw,
  Eye,
  ShieldCheck,
  Camera,
  X,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../context/ToastContext';
import { mockServices } from '../data/mockData';

export const Documents = () => {
  const [searchParams] = useSearchParams();
  const initialServiceId = searchParams.get('service') || 'national-scholarship';
  const navigate = useNavigate();
  const { toast } = useToast();

  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [previewDoc, setPreviewDoc] = useState(null);

  // Available services for document checklist
  const serviceOptions = [
    { id: 'national-scholarship', name: 'Post-Matric Scholarship Scheme' },
    { id: 'pm-kisan', name: 'PM Kisan Samman Nidhi' },
    { id: 'ayushman-bharat', name: 'Ayushman Bharat (PM-JAY)' },
    { id: 'income-certificate', name: 'Income Certificate' },
  ];

  // Document templates for services
  const serviceDocumentTemplates = {
    'national-scholarship': [
      {
        id: 'aadhaar',
        name: 'Aadhaar Identity Card',
        whyRequired: 'Mandatory proof of identity and Aadhaar-seeded DBT scholarship disbursement.',
        status: 'ready', // 'ready', 'needs_attention', 'missing'
        checkMessage: 'Document looks readable',
        file: {
          name: 'Aadhaar_Card_Rajesh.pdf',
          size: '1.4 MB',
          type: 'application/pdf',
          uploadedAt: 'Today, 10:15 AM',
        },
      },
      {
        id: 'income',
        name: 'Annual Income Certificate',
        whyRequired: 'Statutory proof that family income is within the ₹2.5 Lakh scholarship ceiling.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Income_Certificate_2024.pdf',
          size: '890 KB',
          type: 'application/pdf',
          uploadedAt: 'Today, 10:18 AM',
        },
      },
      {
        id: 'marksheet',
        name: 'Previous Year Marksheet',
        whyRequired: 'Required by the education department to verify minimum 50% qualifying score.',
        status: 'needs_attention',
        checkMessage: 'Document may be unclear. Please upload a clearer copy.',
        file: {
          name: 'Class_12_Marksheet_Scan.jpg',
          size: '180 KB',
          type: 'image/jpeg',
          uploadedAt: 'Today, 10:20 AM',
        },
      },
      {
        id: 'bank-passbook',
        name: 'Bank Passbook / Cancelled Cheque',
        whyRequired: 'Proof of active bank account linked to NPCI mapper for direct benefit transfer.',
        status: 'missing',
        checkMessage: null,
        file: null,
      },
    ],
    'pm-kisan': [
      {
        id: 'aadhaar',
        name: 'Aadhaar Identity Card',
        whyRequired: 'UIDAI biometric authentication for agricultural beneficiary registry.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Aadhaar_Card_Rajesh.pdf',
          size: '1.4 MB',
          type: 'application/pdf',
          uploadedAt: 'Today, 10:15 AM',
        },
      },
      {
        id: 'khatauni',
        name: 'Land Record (Khatauni / Jamabandi)',
        whyRequired: 'Official state Bhulekh revenue record proving ownership of cultivable land.',
        status: 'needs_attention',
        checkMessage: 'Document may be unclear. Please upload a clearer copy.',
        file: {
          name: 'Khatauni_Land_Extract.pdf',
          size: '220 KB',
          type: 'application/pdf',
          uploadedAt: 'Yesterday, 04:30 PM',
        },
      },
      {
        id: 'bank-passbook',
        name: 'Bank Passbook (NPCI Seeded)',
        whyRequired: 'To receive ₹2,000 quarterly installments via Direct Benefit Transfer.',
        status: 'missing',
        checkMessage: null,
        file: null,
      },
    ],
    'ayushman-bharat': [
      {
        id: 'aadhaar',
        name: 'Aadhaar Identity Card',
        whyRequired: 'Verification of individual biometric identity for golden card issuance.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Aadhaar_Card_Rajesh.pdf',
          size: '1.4 MB',
          type: 'application/pdf',
          uploadedAt: 'Today, 10:15 AM',
        },
      },
      {
        id: 'ration-card',
        name: 'NFSA Ration Card',
        whyRequired: 'Proof of family member mapping in public distribution database.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Ration_Card_Family_PHH.pdf',
          size: '1.2 MB',
          type: 'application/pdf',
          uploadedAt: 'Today, 09:40 AM',
        },
      },
      {
        id: 'family-id',
        name: 'Family Photo with Household Head',
        whyRequired: 'Required for hospital family mapping verification.',
        status: 'missing',
        checkMessage: null,
        file: null,
      },
    ],
    'income-certificate': [
      {
        id: 'aadhaar',
        name: 'Aadhaar Identity Card',
        whyRequired: 'UIDAI citizen verification for revenue Tehsildar enquiry.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Aadhaar_Card_Rajesh.pdf',
          size: '1.4 MB',
          type: 'application/pdf',
          uploadedAt: 'Today, 10:15 AM',
        },
      },
      {
        id: 'salary-slip',
        name: 'Salary Slip / Income Affidavit',
        whyRequired: 'Self-declaration of annual household earnings on notary stamp.',
        status: 'missing',
        checkMessage: null,
        file: null,
      },
      {
        id: 'utility-bill',
        name: 'Electricity / Water Bill',
        whyRequired: 'Proof of local residence address within municipal/tehsil ward.',
        status: 'ready',
        checkMessage: 'Document looks readable',
        file: {
          name: 'Electricity_Bill_July2024.pdf',
          size: '950 KB',
          type: 'application/pdf',
          uploadedAt: 'Today, 11:00 AM',
        },
      },
    ],
  };

  // State holding current documents
  const [documents, setDocuments] = useState(
    serviceDocumentTemplates[initialServiceId] || serviceDocumentTemplates['national-scholarship']
  );

  // Switch service checklist
  const handleServiceChange = (serviceId) => {
    setSelectedServiceId(serviceId);
    setDocuments(serviceDocumentTemplates[serviceId] || serviceDocumentTemplates['national-scholarship']);
  };

  // Handle client-side file upload & basic check
  const handleFileUpload = (docId, file) => {
    if (!file) return;

    // Basic client checks
    const supportedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
    const isSupported = supportedTypes.includes(file.type);
    const isFileSizeOk = file.size <= 5 * 1024 * 1024; // 5 MB limit
    const formattedSize = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    if (!isSupported) {
      toast.error('Unsupported File Type', 'Please upload a PDF or image file (JPG, PNG).');
      return;
    }

    if (!isFileSizeOk) {
      toast.warning('File Too Large', 'File exceeds 5MB size limit. Please upload a smaller file.');
      return;
    }

    // Readability simulation: If file is very small (< 40KB) or has "unclear"/"blur" in name, flag needs attention
    const isUnclear = file.size < 40 * 1024 || file.name.toLowerCase().includes('blur') || file.name.toLowerCase().includes('unclear');

    const newStatus = isUnclear ? 'needs_attention' : 'ready';
    const newCheckMessage = isUnclear
      ? 'Document may be unclear. Please upload a clearer copy.'
      : 'Document looks readable';

    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? {
              ...d,
              status: newStatus,
              checkMessage: newCheckMessage,
              file: {
                name: file.name,
                size: formattedSize,
                type: file.type,
                uploadedAt: 'Just now',
              },
            }
          : d
      )
    );

    if (newStatus === 'ready') {
      toast.success('Document Uploaded', `${file.name} looks clear and ready.`);
    } else {
      toast.warning('Check Needed', 'Document may be blurry or difficult to read. A clearer copy is recommended.');
    }
  };

  // Handle document removal
  const handleRemove = (docId) => {
    setDocuments((prev) =>
      prev.map((d) =>
        d.id === docId
          ? { ...d, status: 'missing', checkMessage: null, file: null }
          : d
      )
    );
    toast.info('Document Removed', 'You can upload a new copy anytime.');
  };

  // Check overall readiness
  const totalDocs = documents.length;
  const readyDocs = documents.filter((d) => d.status === 'ready').length;
  const allReady = readyDocs === totalDocs;

  // Selected service object
  const currentService = serviceOptions.find((s) => s.id === selectedServiceId) || serviceOptions[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Check Your Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload your documents and make sure they are ready before applying.
          </p>
        </div>

        {/* Service Selector Dropdown */}
        <div className="shrink-0">
          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
            Selected Scheme Checklist
          </label>
          <div className="relative">
            <select
              value={selectedServiceId}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-teal-700 shadow-xs"
            >
              {serviceOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Important Disclaimer Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start space-x-3.5">
        <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-800">
            AI-Assisted Pre-Submission Check
          </span>
          <p className="leading-relaxed">
            Document checking is an AI-assisted pre-submission check. Final verification is done by the concerned department.
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout on Desktop, Single Column on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ==================================================
            LEFT COLUMN: REQUIRED DOCUMENTS CHECKLIST SUMMARY
            ================================================== */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Required Documents
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Checklist for {currentService.name}
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {readyDocs}/{totalDocs} Ready
              </span>
            </div>

            {/* Checklist items with clear status indicators */}
            <div className="space-y-3 text-xs sm:text-sm">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center space-x-2.5">
                    {doc.status === 'ready' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {doc.status === 'needs_attention' && (
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    )}
                    {doc.status === 'missing' && (
                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                    <span className="font-medium text-slate-800">
                      {doc.name}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      doc.status === 'ready'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : doc.status === 'needs_attention'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {doc.status === 'ready' && 'Ready'}
                    {doc.status === 'needs_attention' && 'Needs Attention'}
                    {doc.status === 'missing' && 'Missing'}
                  </span>
                </div>
              ))}
            </div>

            {/* Readiness Next Action Banner */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              {allReady ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Documents Ready ✓</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-800">
                    All required documents look clear and readable for this service.
                  </p>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full mt-1"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => {
                      toast.success(
                        'Documents Verified',
                        'Opening conversational application workspace.'
                      );
                      navigate(`/apply/${selectedServiceId}`);
                    }}
                  >
                    Continue
                  </Button>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1.5">
                  <span className="font-semibold text-slate-800 block">
                    Preparation Status
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Upload missing items or replace unclear documents to achieve 100% readiness.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==================================================
            RIGHT COLUMN: UPLOAD & VERIFY CARDS
            ================================================== */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-1">
            <h2 className="text-base font-bold text-slate-900">
              Upload & Verification Workspace
            </h2>
            <span className="text-xs text-slate-500">
              PDF, JPG, PNG (Max 5MB)
            </span>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="card-hover p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 hover:border-slate-300"
              >
                {/* Header: Name and Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {doc.whyRequired}
                    </p>
                  </div>

                  {/* Status Indicator Badge */}
                  <div className="shrink-0">
                    <span
                      className={`inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                        doc.status === 'ready'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : doc.status === 'needs_attention'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {doc.status === 'ready' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      {doc.status === 'needs_attention' && <AlertCircle className="w-3.5 h-3.5 text-amber-600" />}
                      {doc.status === 'missing' && <Circle className="w-3.5 h-3.5 text-slate-400" />}
                      <span>
                        {doc.status === 'ready' && 'Ready'}
                        {doc.status === 'needs_attention' && 'Needs Attention'}
                        {doc.status === 'missing' && 'Missing'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Uploaded File View or Drag & Drop Zone */}
                {doc.file ? (
                  <div className="space-y-3">
                    {/* File metadata card */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                          <span className="font-semibold text-slate-900 block truncate max-w-[200px] sm:max-w-xs">
                            {doc.file.name}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {doc.file.size} • {doc.file.type.split('/')[1]?.toUpperCase()} • Uploaded {doc.file.uploadedAt}
                          </span>
                        </div>
                      </div>

                      {/* File actions */}
                      <div className="flex items-center space-x-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="xs"
                          icon={Eye}
                          onClick={() => setPreviewDoc(doc)}
                        >
                          Preview
                        </Button>

                        {/* Replace File Trigger */}
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="application/pdf,image/jpeg,image/png,image/webp"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(doc.id, file);
                            }}
                          />
                          <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center space-x-1 shadow-xs transition-colors">
                            <RefreshCw className="w-3 h-3 text-slate-500" />
                            <span>Replace</span>
                          </span>
                        </label>

                        <button
                          type="button"
                          onClick={() => handleRemove(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Remove document"
                          aria-label="Remove document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Pre-submission check message callout */}
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${
                        doc.status === 'ready'
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50/70 border-amber-200 text-amber-900'
                      }`}
                    >
                      {doc.status === 'ready' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      )}
                      <span className="font-medium">{doc.checkMessage}</span>
                    </div>
                  </div>
                ) : (
                  /* Empty / Missing Drop Zone */
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-teal-500 hover:bg-slate-50/50 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-2.5">
                      <Upload className="w-5 h-5" />
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                      Upload {doc.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Drag & drop your file here, or browse from your device
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                      {/* Browse File Button */}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="application/pdf,image/jpeg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          }}
                        />
                        <span className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold inline-flex items-center space-x-1.5 shadow-sm transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Browse Files</span>
                        </span>
                      </label>

                      {/* Camera Button (Mobile or Webcam) */}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(doc.id, file);
                          }}
                        />
                        <span className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium inline-flex items-center space-x-1.5 shadow-xs transition-colors">
                          <Camera className="w-3.5 h-3.5 text-slate-500" />
                          <span>Take Photo</span>
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================================================
          MODAL: DOCUMENT PREVIEW
          ================================================== */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {previewDoc.name}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {previewDoc.file?.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mock Visual Document Canvas */}
            <div className="p-8 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-teal-700 mx-auto shadow-xs">
                <FileCheck2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="text-sm font-bold text-slate-800">
                  {previewDoc.name} Preview
                </div>
                <div className="text-xs text-slate-500">
                  Format: {previewDoc.file?.type} • Size: {previewDoc.file?.size}
                </div>
              </div>
              <div className="text-xs text-emerald-700 font-semibold flex items-center justify-center space-x-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified with pre-submission client-side scanner</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPreviewDoc(null)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;
