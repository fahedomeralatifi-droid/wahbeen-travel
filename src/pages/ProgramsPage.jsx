import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Clock, MapPin, CalendarCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';

export default function ProgramsPage() {
  const { programs } = useData();
  const { formatPrice } = useCurrency();
  const [expandedProgram, setExpandedProgram] = useState(programs[0]?.id || null);

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Compass className="w-4 h-4 text-gold-400" />
            <span>رحلات مجدولة ومدروسة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            البرامج <span className="gold-text-gradient">السياحية المتكاملة</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            جداول سياحية متكاملة تشمل الاستقبال بالمطار، الإقامة في أرقى الفنادق، جولات يومية مع مرشدين سياحيين، والتنقلات المريحة لرحلة عائلية أو شهر عسل لا يُنسى.
          </p>
        </div>

        {/* Programs List */}
        <div className="space-y-8">
          {programs.map((prog) => {
            const isExpanded = expandedProgram === prog.id;
            return (
              <div 
                key={prog.id}
                className="glass-panel rounded-3xl overflow-hidden border border-gold-500/25 text-right shadow-2xl transition-all"
              >
                {/* Main Program Banner */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
                  
                  {/* Program Image */}
                  <div className="lg:col-span-4 rounded-2xl overflow-hidden h-52 relative">
                    <img 
                      src={prog.image} 
                      alt={prog.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-navy-900/90 text-gold-400 text-xs font-bold border border-gold-500/30">
                      {prog.category}
                    </span>
                  </div>

                  {/* Program Details */}
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-gold-400 font-bold">
                        <Clock className="w-4 h-4" />
                        <span>{prog.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{prog.destination}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                      {prog.title}
                    </h3>
                    
                    <p className="text-xs text-slate-300">
                      برنامج سياحي شامل الإقامة والجولات اليومية والاستقبال والتوديع مع إمكانية التعديل حسب الرغبة.
                    </p>

                    <div className="text-sm font-bold text-slate-300">
                      يبدأ السعر من: <strong className="text-xl text-gold-400 font-heading font-extrabold">{formatPrice(prog.priceSAR)}</strong> <span className="text-xs text-slate-400 font-normal">/ للشخص</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="lg:col-span-3 flex flex-col gap-2.5">
                    <Link
                      to={`/booking?service=برامج سياحية متكاملة&destination=${encodeURIComponent(prog.destination)}&details=${encodeURIComponent(prog.title)}`}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-all"
                    >
                      <CalendarCheck className="w-4 h-4" />
                      <span>طلب حجز البرنامج</span>
                    </Link>

                    <button
                      onClick={() => setExpandedProgram(isExpanded ? null : prog.id)}
                      className="w-full py-2.5 rounded-2xl bg-navy-900 hover:bg-navy-800 border border-white/15 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>{isExpanded ? 'إخفاء جدول الأيام' : 'استعراض جدول الأيام (يوماً بيوم)'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                </div>

                {/* Day-by-Day Accordion Itinerary */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 bg-navy-950/80 border-t border-white/10 space-y-4">
                    <h4 className="text-base font-heading font-bold text-gold-300 border-b border-white/10 pb-2">
                      الجدول التفصيلي لمسار الرحلة:
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {prog.itinerary.map((day) => (
                        <div key={day.day} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-1 text-right">
                          <div className="flex items-center justify-between text-xs text-gold-400 font-bold mb-1">
                            <span>اليوم {day.day}</span>
                            <span className="text-white text-xs">{day.title}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {day.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
