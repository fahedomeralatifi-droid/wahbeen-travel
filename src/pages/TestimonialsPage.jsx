import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageSquare, CalendarCheck, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function TestimonialsPage() {
  const { testimonials } = useData();

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
            <span>ثقة نعتز بها</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            آراء <span className="gold-text-gradient">وتجارب عملائنا</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            شهادات حية من ضيوف الرحمن والمسافرين الذين شرفونا باختيار وكالة وهبين لرحلاتهم المباركة وجولاتهم السياحية.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/20 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gold-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 bg-navy-900 px-3 py-1 rounded-full border border-white/10">
                    {t.city}
                  </span>
                </div>

                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic mb-4">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-base text-white">{t.name}</h4>
                  <span className="text-xs text-gold-400">{t.role}</span>
                </div>
                <Award className="w-6 h-6 text-gold-500/50" />
              </div>
            </div>
          ))}
        </div>

        {/* Share Experience Banner */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/30 text-center space-y-4">
          <h3 className="text-2xl font-heading font-bold text-white">
            سافرت معنا مؤخراً؟ شاركنا رأيك وتجربتك
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            رأيك يهمنا ويساعدنا دائماً في تطوير وتجويد خدماتنا لضيوف الرحمن والمسافرين.
          </p>
          <a
            href="https://wa.me/967776050007?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D9%85%D8%B4%D8%A7%D8%B1%D9%83%D8%A9%20%D8%AA%D9%82%D9%8A%D9%8A%D9%85%D9%8A%20%D9%88%D8%AA%D8%AC%D8%B1%D8%A8%D8%AA%D9%8A%20%D9%85%D8%B9%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>إرسال تقييمك لإدارة الوكالة عبر الواتساب</span>
          </a>
        </div>

      </div>
    </div>
  );
}
