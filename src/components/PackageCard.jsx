import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Hotel, 
  Bus, 
  Clock, 
  Sparkles, 
  MessageSquare, 
  CalendarCheck,
  Building2,
  Crown
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

export default function PackageCard({ pkg }) {
  const { formatPrice, currentCurrency, currencies } = useCurrency();

  const isVip = pkg.category?.toLowerCase().includes('vip') || pkg.badge?.includes('👑');

  return (
    <div className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 text-right ${
      pkg.isPopular 
        ? 'glass-panel border-2 border-gold-500 shadow-2xl shadow-gold-500/10' 
        : 'glass-panel border border-gold-500/20 hover:border-gold-500/50'
    }`}>
      
      {/* Badge on top */}
      {pkg.badge && (
        <div className="absolute -top-3.5 right-6">
          <span className={`px-3.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 ${
            isVip 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-600 text-navy-950' 
              : 'bg-gold-500 text-navy-950'
          }`}>
            <Sparkles className="w-3 h-3" />
            <span>{pkg.badge}</span>
          </span>
        </div>
      )}

      <div>
        {/* Category & Duration */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2 mt-1">
          <span className="flex items-center gap-1 text-gold-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{pkg.duration}</span>
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-navy-800 text-slate-300 text-[11px] border border-white/10">
            فئة {pkg.category}
          </span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl font-heading font-bold text-white mb-1">
          {pkg.title}
        </h3>
        <p className="text-xs text-slate-300 mb-4 line-clamp-2">
          {pkg.subtitle}
        </p>

        {/* Dynamic Price Display in Selected Currency */}
        <div className="bg-navy-900/80 rounded-2xl p-3.5 border border-white/10 mb-5">
          <div className="text-[11px] text-slate-400">يبدأ السعر التقديري من:</div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl sm:text-3xl font-heading font-bold text-gold-400">
              {formatPrice(pkg.priceSAR)}
            </span>
            <span className="text-xs text-slate-400">/ للشخص</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            * السعر بالـ {currencies[currentCurrency].name} وقابل للتغيير حسب الموسم وتوافر المقاعد
          </div>
        </div>

        {/* Hotels and Transport Inclusions */}
        <div className="space-y-2 mb-5 text-xs text-slate-300 bg-white/5 rounded-2xl p-3 border border-white/5">
          {pkg.makkahHotel && (
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span><strong>مكة:</strong> {pkg.makkahHotel}</span>
            </div>
          )}
          {pkg.madinahHotel && (
            <div className="flex items-start gap-2">
              <Hotel className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span><strong>المدينة:</strong> {pkg.madinahHotel}</span>
            </div>
          )}
          {pkg.transport && (
            <div className="flex items-start gap-2">
              <Bus className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <span><strong>النقل:</strong> {pkg.transport}</span>
            </div>
          )}
        </div>

        {/* Feature List */}
        <div className="space-y-2 mb-6">
          <div className="text-xs font-bold text-gold-300 mb-1">مميزات الباقة:</div>
          {pkg.features?.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="pt-4 border-t border-white/10 space-y-2">
        <Link
          to={`/booking?package=${encodeURIComponent(pkg.title)}&type=${encodeURIComponent(pkg.type === 'hajj' ? 'الحج والمشاعر المقدسة' : 'العمرة وزيارة الحرمين')}&class=${encodeURIComponent(pkg.category)}`}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-sm shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>طلب حجز هذه الباقة</span>
        </Link>

        <a
          href={`https://wa.me/967782833832?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار والتنسيق بخصوص "${pkg.title}" المعروضة في موقع وكالة وهبين.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-2xl bg-navy-900 hover:bg-green-950/60 border border-green-500/30 text-green-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>استفسر عبر الواتساب مباشرة</span>
        </a>
      </div>

    </div>
  );
}
