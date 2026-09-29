import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  Mic,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Clock,
  Sparkles,
  HelpCircle,
  GraduationCap,
  FileText,
  Briefcase,
  HeartHandshake,
  Bot,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/Button';
import LandingNavbar from '../components/LandingNavbar';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* Landing Navbar */}
      <LandingNavbar />

      <main className="flex-1">
        {/* ==================================================
            HERO SECTION
            ================================================== */}
        <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span className="tracking-wide">NAGRIK MITRA AI</span>
              </div>

              {/* Hero Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-tight">
                Government services, made simple.
              </h1>

              {/* Short Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Find government services, check eligibility, verify documents and track applications — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto text-sm px-6 py-3"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/services" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto text-sm px-6 py-3"
                  >
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* ==================================================
                VISUAL PREVIEW / SERVICE INTERFACE ILLUSTRATION
                ================================================== */}
            <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                {/* Mock Window Top Bar */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <span className="font-medium text-slate-600 ml-2 hidden sm:inline">
                      nagrikmitra.gov.in / citizen-desk
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Aadhaar e-KYC Active</span>
                  </div>
                </div>

                {/* Mock Interface Content */}
                <div className="p-6 sm:p-8 space-y-6 bg-white">
                  {/* Greeting */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        Good morning, Rajesh 👋
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Welcome to Nagrik Mitra. What do you need help with today?
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">Varanasi, Uttar Pradesh</span>
                  </div>

                  {/* Primary Service-Search Preview */}
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                    <div className="text-xs font-semibold text-slate-700">
                      How can we help you?
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <div className="relative flex-1 w-full">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <div className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 shadow-xs">
                          Mujhe scholarship ke liye apply karna hai
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                        <button
                          type="button"
                          className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-medium flex items-center space-x-1.5 shadow-xs"
                        >
                          <Mic className="w-3.5 h-3.5 text-teal-700" />
                          <span>Speak</span>
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg bg-teal-700 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Search</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Active Application Preview Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="card-hover p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                            Under Review
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">APP-2024-8841</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">PM Kisan Samman Nidhi</h4>
                        <div className="text-[11px] text-slate-500">Progress: 75% • DBT Active</div>
                      </div>
                      <span className="text-xs text-teal-700 font-semibold">View →</span>
                    </div>

                    <div className="card-hover p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                            Approved
                          </span>
                          <span className="font-mono text-[11px] text-slate-400">CERT-2024-1902</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Income Certificate</h4>
                        <div className="text-[11px] text-slate-500">Ready for Download</div>
                      </div>
                      <span className="text-xs text-teal-700 font-semibold">Download →</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            HOW NAGRIK MITRA HELPS
            ================================================== */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                How Nagrik Mitra Helps
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                A simple, 4-step path to accessing any government service or entitlement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-sm flex items-center justify-center">
                    1
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Find the right service
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Search or describe what you need in plain everyday language to find official welfare programs.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700">
                  Instant search & voice support
                </div>
              </div>

              {/* Step 2 */}
              <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-sm flex items-center justify-center">
                    2
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Check eligibility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Answer a few basic questions about your income, occupation, and family to know what benefits you can get.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700">
                  Clear qualification checklist
                </div>
              </div>

              {/* Step 3 */}
              <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-sm flex items-center justify-center">
                    3
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Prepare documents
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Verify required certificates, Aadhaar records, and bank details safely through DigiLocker with zero paperwork.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700">
                  Paperless & 100% verified
                </div>
              </div>

              {/* Step 4 */}
              <div className="card-hover p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 font-bold text-sm flex items-center justify-center">
                    4
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    Track your application
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Follow real-time status updates, view officer notes, and file grievances if decisions are delayed.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-slate-100 text-xs font-semibold text-teal-700">
                  Guaranteed 30-day resolution
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            POPULAR SERVICES
            ================================================== */}
        <section id="popular-services" className="py-16 sm:py-24 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Popular Services
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600">
                  Frequently accessed public services and direct benefit transfers.
                </p>
              </div>
              <Link
                to="/services"
                className="text-xs sm:text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
              >
                <span>View all government services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Scholarships */}
              <div
                onClick={() => navigate('/services?category=Education')}
                className="card-hover p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    Scholarships
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Pre-matric, post-matric, and higher education financial aid for eligible students.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 2: Certificates */}
              <div
                onClick={() => navigate('/services?category=Certificates')}
                className="card-hover p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    Certificates
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Official income, caste, domicile, and birth certificates issued online.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 3: Employment */}
              <div
                onClick={() => navigate('/services?category=Employment')}
                className="card-hover p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    Employment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Job seeker registration, skill training programs, and rural employment guarantees.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Card 4: Welfare Schemes */}
              <div
                onClick={() => navigate('/services?category=Social%20Welfare')}
                className="card-hover p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5 text-teal-700 transition-transform duration-200 group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    Welfare Schemes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Direct benefit transfers (DBT), farmer subsidies, and family health protection.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                  <span>Explore Schemes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            ABOUT SECTION
            ================================================== */}
        <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Designed for every Indian citizen
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Nagrik Mitra AI is built with one clear mission: to make government entitlements accessible, transparent, and completely free of confusing bureaucratic red tape.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="card-hover p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="text-sm font-bold text-slate-900">Simple & Trustworthy</div>
                <p className="text-xs text-slate-500">
                  Clean interface with clear guidance in everyday language.
                </p>
              </div>
              <div className="card-hover p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="text-sm font-bold text-slate-900">DigiLocker Integration</div>
                <p className="text-xs text-slate-500">
                  Instant paperless verification from official state records.
                </p>
              </div>
              <div className="card-hover p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                <div className="text-sm font-bold text-slate-900">Guaranteed SLAs</div>
                <p className="text-xs text-slate-500">
                  Statutory redressal backed by CPGRAMS public grievance rules.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            FINAL CTA SECTION
            ================================================== */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto shadow-xs">
                <Bot className="w-6 h-6 text-teal-700" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Need help finding a government service?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
                Nagrik Mitra can guide you step by step in simple words.
              </p>

              <div className="pt-2">
                <Link to="/assistant">
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-8 py-3 text-sm font-semibold"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Ask Nagrik Mitra
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================================================
          FOOTER
          ================================================== */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-[10px]">
                NM
              </div>
              <span className="font-semibold text-slate-700">Nagrik Mitra AI</span>
              <span>• National Public Welfare Platform</span>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/services" className="hover:text-slate-800 transition-colors">
                Services
              </Link>
              <Link to="/assistant" className="hover:text-slate-800 transition-colors">
                AI Assistant
              </Link>
              <Link to="/login" className="hover:text-slate-800 transition-colors">
                Sign In
              </Link>
              <Link to="/officer" className="hover:text-teal-800 transition-colors">
                Officer Portal
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <div>
              © 2026 Nagrik Mitra AI. An open citizen public utility platform.
            </div>
            <div>
              Citizen Helpline: 1800-180-1551 (Toll-Free, 24x7)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
