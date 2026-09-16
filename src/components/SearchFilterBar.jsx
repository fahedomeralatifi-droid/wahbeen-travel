import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, X, SlidersHorizontal } from 'lucide-react';

export default function SearchFilterBar({ onFilterChange }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Popular search suggestions for quick selection
  const popularKeywords = [
    { label: 'باقات العمرة والحج', query: 'عمرة' },
    { label: 'تذاكر طيران مخفضة', query: 'طيران' },
    { label: 'تأشيرات سياحية وتجارية', query: 'تأشيرة' },
    { label: 'فنادق مكة والمدينة', query: 'فنادق' },
    { label: 'برامج سياحية عائلية', query: 'برامج' },
    { label: 'حجوزات دبي والقاهرة', query: 'دبي' }
  ];

  const handleSearch = (searchKeyword) => {
    const term = (searchKeyword !== undefined ? searchKeyword : query).trim();
    if (!term) return;

    if (onFilterChange) {
      onFilterChange(term);
      return;
    }

    const lowerTerm = term.toLowerCase();

    // Smart routing based on keyword
    if (lowerTerm.includes('عمر') || lowerTerm.includes('حج') || lowerTerm.includes('مكة') || lowerTerm.includes('مدين')) {
      navigate(`/hajj-umrah?q=${encodeURIComponent(term)}`);
    } else if (lowerTerm.includes('طيران') || lowerTerm.includes('تذكر') || lowerTerm.includes('رحل')) {
      navigate(`/services/flight-booking?q=${encodeURIComponent(term)}`);
    } else if (lowerTerm.includes('تأشير') || lowerTerm.includes('فيزا')) {
      navigate(`/services/visas?q=${encodeURIComponent(term)}`);
    } else if (lowerTerm.includes('فندق') || lowerTerm.includes('سكن') || lowerTerm.includes('فنادق')) {
      navigate(`/services/hotels?q=${encodeURIComponent(term)}`);
    } else if (lowerTerm.includes('برنامج') || lowerTerm.includes('سياح')) {
      navigate(`/programs?q=${encodeURIComponent(term)}`);
    } else if (lowerTerm.includes('دبي') || lowerTerm.includes('قاهر') || lowerTerm.includes('تركيا') || lowerTerm.includes('ماليزيا') || lowerTerm.includes('مصر')) {
      navigate(`/destinations?q=${encodeURIComponent(term)}`);
    } else {
      // General search routes to booking / inquiry with prefilled details
      navigate(`/booking?destination=${encodeURIComponent(term)}&details=${encodeURIComponent('طلب بخصوص: ' + term)}`);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleChipClick = (kw) => {
    setQuery(kw.label);
    handleSearch(kw.query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto -mt-6 sm:-mt-10 relative z-30 px-4">
      <div className="glass-panel rounded-3xl p-3 sm:p-5 shadow-2xl border border-gold-500/40 hover:border-gold-500/70 transition-all duration-300">
        
        {/* Single Unified Advanced Search Box */}
        <form onSubmit={onSubmit} className="relative flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          
          {/* Main Search Input Container */}
          <div className="relative w-full flex-1 flex items-center bg-navy-950/80 rounded-2xl border border-white/10 hover:border-gold-500/40 focus-within:border-gold-500/80 transition-all px-3.5 py-2.5 sm:py-3 shadow-inner">
            <Search className="w-5 h-5 text-gold-400 flex-shrink-0 ml-2.5" />
            
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن رحلة، تذكرة طيران، باقة عمرة، تأشيرة، وجهة، أو فندق..."
              className="w-full bg-transparent text-white text-xs sm:text-sm md:text-base focus:outline-none placeholder-slate-400 font-medium"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-white transition-colors"
                title="مسح النص"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Advanced Search Submit Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-gold-glow transition-all duration-300 transform hover:-translate-y-0.5 flex-shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>بحث متقدم</span>
          </button>

        </form>

        {/* Popular Search Suggestions Strip */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-2 text-right">
          <div className="text-[11px] text-gold-400 font-bold flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>شائع:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {popularKeywords.map((kw, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleChipClick(kw)}
                className="px-2.5 py-1 rounded-xl bg-navy-900/80 hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-[11px] text-slate-300 hover:text-gold-300 transition-colors"
              >
                {kw.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
