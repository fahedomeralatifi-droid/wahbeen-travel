import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Tag, Sparkles, Clock, CalendarCheck, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';

export default function OffersPage() {
  const [searchParams] = useSearchParams();
  const { offers } = useData();
  const { formatPrice } = useCurrency();
  const filterParam = searchParams.get('filter');

  const [filter, setFilter] = useState(filterParam === 'seasonal' ? 'seasonal' : 'all');

  const displayOffers = filter === 'seasonal'
    ? offers.filter((o) => o.isSeasonal)
    : offers;

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Tag className="w-4 h-4 text-gold-400" />
            <span>خصومات حصرية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            أحدث العروض <span className="gold-text-gradient">والتخفيضات الموسمية</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            اغتنم أقوى العروض الحصرية على باقات العمرة، حجوزات تذاكر الطيران، التأشيرات السريعة، والبرامج السياحية العائلية بأفضل الأسعار التنافسية.
          </p>

          {/* Filter Pills */}
          <div className="pt-3 flex justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-gold-500 text-navy-950 font-bold shadow'
                  : 'bg-navy-900 text-slate-300 border border-white/10'
              }`}
            >
              كافة العروض
            </button>
            <button
              onClick={() => setFilter('seasonal')}
              className={`px-5 py-2 rounded-xl text-xs font-medium transition-colors ${
                filter === 'seasonal'
                  ? 'bg-gold-500 text-navy-950 font-bold shadow'
                  : 'bg-navy-900 text-slate-300 border border-white/10'
              }`}
            >
              عروض موسمية فقط 🌟
            </button>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayOffers.map((offer) => (
            <div 
              key={offer.id} 
              className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all flex flex-col justify-between text-right group shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={offer.image} 
                  alt={offer.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-md">
                  {offer.discount}
                </span>
                {offer.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold-500 text-navy-950 text-xs font-bold">
                    {offer.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {offer.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>ساري حتى: {offer.validUntil} (أو نفاد المقاعد)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400 line-through">
                      {formatPrice(offer.oldPriceSAR)}
                    </div>
                    <div className="text-xl font-heading font-bold text-gold-400">
                      {formatPrice(offer.priceSAR)}
                    </div>
                  </div>

                  <Link
                    to={`/booking?service=عرض خاص&details=${encodeURIComponent(offer.title)}`}
                    className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>طلب حجز العرض</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
