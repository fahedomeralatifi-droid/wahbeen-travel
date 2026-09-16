import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Sparkles, CalendarCheck, ChevronLeft } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';

export default function DestinationsPage() {
  const { destinations } = useData();
  const { formatPrice } = useCurrency();

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>وجهات حول العالم</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            أبرز <span className="gold-text-gradient">الوجهات السياحية</span> والإسلامية
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            استكشف باقة منتقاة من أجمل مدن وعواصم العالم، من قدسية مكة المكرمة والمدينة المنورة، إلى حيوية دبي، وسحر إسطنبول، وعراقة القاهرة، وطبيعة جورجيا وماليزيا.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div 
              key={dest.id}
              className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all flex flex-col justify-between text-right group shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="text-xs font-bold text-gold-400 block">{dest.country}</span>
                  <h3 className="text-2xl font-heading font-bold text-white">{dest.name}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
                    {dest.desc}
                  </p>

                  <div className="space-y-1.5 mb-4 text-xs text-slate-400">
                    <strong className="text-gold-300 block mb-1">أبرز المعالم والأنشطة:</strong>
                    <div className="flex flex-wrap gap-1.5">
                      {dest.attractions.map((attr, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-xl bg-navy-900 border border-white/10 text-[11px] text-slate-300">
                          {attr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">تبدأ الأسعار التقديرية من:</span>
                    <span className="text-lg font-heading font-bold text-gold-400">
                      {formatPrice(dest.startingPriceSAR)}
                    </span>
                  </div>

                  <Link
                    to={`/booking?destination=${encodeURIComponent(dest.name)}`}
                    className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow transition-colors flex items-center gap-1"
                  >
                    <CalendarCheck className="w-3.5 h-3.5" />
                    <span>طلب حجز للوجهة</span>
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
