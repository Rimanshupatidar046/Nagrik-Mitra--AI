import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  FileCheck2,
  Clock,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  HelpCircle,
  Bot,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/Button';
import { mockServices } from '../data/mockData';

export const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const service = mockServices.find((s) => s.id === id) || mockServices[0];

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Service Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested service or scheme could not be located in the citizen directory.
        </p>
        <Button variant="primary" size="sm" onClick={() => navigate('/services')}>
          Back to Services
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/services')}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Services</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Services</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-medium">{service.category}</span>
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className="card-hover p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {service.category}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {service.dept}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {service.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 shrink-0 text-left sm:text-right min-w-[180px]">
            <div className="text-xs text-slate-500">Government Entitlement</div>
            <div className="text-base font-bold text-emerald-700 mt-0.5">
              {service.financialBenefit}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center sm:justify-end space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>SLA: {service.processingTime}</span>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {service.description}
        </div>
      </div>

      {/* Two Column Grid: Who Can Use It & Basic Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section: Who Can Use It */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <UserCheck className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Who can use it</h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {service.whoCanUse}
          </p>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
            <span>Open to all eligible citizens with valid state records.</span>
          </div>
        </div>

        {/* Section: Basic Requirements */}
        <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Basic requirements</h2>
          </div>

          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            {service.basicRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-snug">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section: Required Documents */}
      <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Required documents</h2>
          </div>
          <span className="text-xs text-teal-700 font-semibold">
            DigiLocker Synced
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {service.requiredDocuments.map((doc, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3 text-xs sm:text-sm text-slate-800"
            >
              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-teal-700 shadow-xs shrink-0">
                <FileCheck2 className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Estimated Process */}
      <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="pb-2 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Estimated process</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Simple 4-stage lifecycle from submission to benefit release
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {service.estimatedProcess.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
            >
              <div className="text-xs font-bold text-teal-800">
                Stage {idx + 1}
              </div>
              <p className="text-xs text-slate-700 leading-snug">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section: Important Information */}
      <div className="card-hover p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 flex items-start space-x-3.5 text-xs sm:text-sm text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-amber-950">Important information</h3>
          <p className="text-amber-900/90 leading-relaxed text-xs">
            {service.importantInformation}
          </p>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="card-hover p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/services')}
          className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl transition-colors"
        >
          ← Back to Services
        </button>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="sm"
            icon={Bot}
            onClick={() => navigate(`/assistant?query=Tell me about ${encodeURIComponent(service.name)}`)}
          >
            Ask Assistant
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Sparkles}
            onClick={() => navigate(`/eligibility?scheme=${service.id}`)}
          >
            Check Eligibility
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate(`/apply/${service.id}`)}
            className="flex-1 sm:flex-none px-6"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
