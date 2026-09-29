import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Search,
  Bot,
  Clock,
  ArrowRight,
  GraduationCap,
  FileText,
  Briefcase,
  HeartPulse,
  Home,
  FileCheck2,
  ShoppingBag,
  Zap,
  Car,
  BadgeCheck,
  BookOpen,
  Compass,
  Wheat,
  X,
  Sparkles,
} from 'lucide-react';
import Button from '../components/Button';
import { mockServices } from '../data/mockData';
import { useTranslation } from '../context/LanguageContext';

// Helper icon resolver
const getServiceIcon = (iconName) => {
  switch (iconName) {
    case 'GraduationCap':
      return <GraduationCap className="w-5 h-5" />;
    case 'FileText':
      return <FileText className="w-5 h-5" />;
    case 'Briefcase':
      return <Briefcase className="w-5 h-5" />;
    case 'HeartPulse':
      return <HeartPulse className="w-5 h-5" />;
    case 'Home':
      return <Home className="w-5 h-5" />;
    case 'IdCard':
      return <FileCheck2 className="w-5 h-5" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5" />;
    case 'Zap':
      return <Zap className="w-5 h-5" />;
    case 'Car':
      return <Car className="w-5 h-5" />;
    case 'BadgeCheck':
      return <BadgeCheck className="w-5 h-5" />;
    case 'BookOpen':
      return <BookOpen className="w-5 h-5" />;
    case 'Compass':
      return <Compass className="w-5 h-5" />;
    case 'Wheat':
    default:
      return <Wheat className="w-5 h-5" />;
  }
};

const categoryKeyMap = {
  'All Services': 'category.all',
  'Scholarships': 'category.scholarships',
  'Certificates': 'category.certificates',
  'Education': 'category.education',
  'Employment': 'category.employment',
  'Welfare Schemes': 'category.socialWelfare',
  'Healthcare': 'category.healthcare',
  'Documents': 'category.documents',
  'Bills & Utilities': 'category.bills',
  'Licenses': 'category.licenses',
};

export const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const initialCategory = searchParams.get('category') || 'All Services';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const categories = [
    'All Services',
    'Scholarships',
    'Certificates',
    'Education',
    'Employment',
    'Welfare Schemes',
    'Healthcare',
    'Documents',
    'Bills & Utilities',
    'Licenses',
  ];

  // Popular flagship schemes
  const popularSchemes = useMemo(() => {
    return mockServices.filter((s) => s.isPopularScheme);
  }, []);

  // Filtered services
  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' || service.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.dept.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Services');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* ==================================================
          PAGE HEADING & SUBTITLE
          ================================================== */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          {t('services.title', 'Find a Government Service')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {t('services.subtitle', 'Choose a service or tell Nagrik Mitra what you need help with.')}
        </p>
      </div>

      {/* ==================================================
          SEARCH BOX
          ================================================== */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('services.searchPlaceholder', 'Search services, schemes or certificates…')}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:border-teal-700 focus:ring-1 focus:ring-teal-700 transition-colors"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="p-1 text-slate-400 hover:text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2"
            aria-label="Clear search query"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ==================================================
          POPULAR SCHEMES SECTION (Shown when not filtering search)
          ================================================== */}
      {!searchQuery && selectedCategory === 'All Services' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {t('services.popularSchemes', 'Popular Schemes')}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Key national welfare programs available for citizen applications
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {t('services.flagshipPrograms', 'Flagship Programs')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="card-hover p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
                    {getServiceIcon(scheme.icon)}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {scheme.schemeSummary}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                    <span className="font-semibold text-slate-700 block">{t('services.eligibility', 'Eligibility')}:</span>
                    <p className="line-clamp-2 leading-relaxed text-slate-600">
                      {scheme.eligibilitySnippet}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Button
                    variant="secondary"
                    size="xs"
                    className="w-full text-xs"
                    onClick={() => navigate(`/services/${scheme.id}`)}
                  >
                    {t('services.viewDetails', 'View Details')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================================================
          CATEGORIES SELECTION
          ================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {t('services.browseByCategory', 'Browse by Category')}
          </h2>
          <span className="text-xs text-slate-500">
            {filteredServices.length} {t('services.available', 'Available')}
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors font-medium text-xs ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white font-semibold shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {t(categoryKeyMap[cat] || cat, cat)}
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          SERVICE CARDS / EMPTY STATE
          ================================================== */}
      {filteredServices.length === 0 ? (
        <div className="card-hover p-8 sm:p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              {t('services.noServiceFound', 'No service found.')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {t('services.noServiceSub', 'Try a different search or ask Nagrik Mitra to guide you.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={handleClearFilters}>
              {t('services.clearSearch', 'Clear Search')}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Bot}
              onClick={() => navigate(`/assistant?query=${encodeURIComponent(searchQuery || 'Help me find a service')}`)}
            >
              {t('dashboard.askNagrikMitra', 'Ask Nagrik Mitra')}
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="card-hover p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-teal-700 flex items-center justify-center">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {t(categoryKeyMap[service.category] || service.category, service.category)}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {service.processingTime}
                </span>

                <Button
                  variant="secondary"
                  size="xs"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => navigate(`/services/${service.id}`)}
                >
                  {t('btn.view', 'View Service')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
