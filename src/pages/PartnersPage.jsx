import React from 'react';
import { Sparkles, Plane, Hotel, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function PartnersPage() {
  const { partners } = useData();

  const airlines = partners.filter((p) => p.category === 'طيران');
  const hotels = partners.filter((p) => p.category === 'فنادق');

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>شراكات استراتيجية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            شركاء <span className="gold-text-gradient">النجاح والتميز</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            نفخر بشراكاتنا المتينة مع كبرى خطوط الطيران العالمية وأرقى سلاسل الفنادق في مكة والمدينة وحول العالم لتأمين أفضل الخدمات بأقل التكاليف.
          </p>
        </div>

        {/* Airlines Section */}
        <div className="space-y-6 text-right">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white">شركات الطيران الشريكة والمعتمدة</h2>
              <span className="text-xs text-slate-400">حجز وإصدار فوري على أنظمة GDS العالمية</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {airlines.map((a, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-2xl p-5 border border-white/10 text-center hover:border-gold-500/40 transition-colors flex flex-col items-center justify-center gap-2 h-28"
              >
                <span className="text-sm sm:text-base font-heading font-bold text-white">{a.name}</span>
                <span className="text-[10px] text-gold-400">وكيل معتمد</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotels Section */}
        <div className="space-y-6 text-right">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white">سلاسل الفنادق وأبراج الحرمين</h2>
              <span className="text-xs text-slate-400">سكن فاخر صف أول بإطلالات الحرم المكي والنبوي الشريف</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotels.map((h, idx) => (
              <div 
                key={idx}
                className="glass-panel rounded-2xl p-5 border border-white/10 text-center hover:border-gold-500/40 transition-colors flex flex-col items-center justify-center gap-2 h-28"
              >
                <span className="text-sm sm:text-base font-heading font-bold text-white">{h.name}</span>
                <span className="text-[10px] text-gold-400">تعاقد حصري</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
