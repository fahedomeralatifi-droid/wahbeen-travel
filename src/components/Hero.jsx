import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Compass, 
  Plane, 
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import SearchFilterBar from './SearchFilterBar';
import InteractiveHeroVisual from './InteractiveHeroVisual';
import { useData } from '../context/DataContext';


export default function Hero() {
  const { siteSettings } = useData();

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#051326] via-[#071933] to-[#040d1a]">
      
      {/* Ambient Lighting & Soft Celestial Glow (No sharp borders) */}
      <div className="absolute top-10 right-10 w-[32rem] h-[32rem] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[36rem] h-[36rem] bg-navy-600/25 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[45rem] h-[45rem] bg-sky-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* 2-Column Hero Grid: Text & Brand (Right in RTL) + Airplane & Cloud Visual (Left in RTL) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Right Column in RTL: Hero Content & CTAs (Centered on mobile, Right on desktop) */}
          <div className="lg:col-span-6 text-center lg:text-right space-y-5 sm:space-y-6">
            
            {/* Agency Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/80 border border-gold-500/30 text-gold-400 text-xs sm:text-sm font-semibold shadow-md backdrop-blur-md mx-auto lg:mx-0">
              <Award className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>وكالة وهبين للسفريات والسياحة - عدن</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span className="text-slate-300 font-normal">خدمات الحج والعمرة</span>
            </div>

            {/* Main Headline - Luxuriously Re-arranged with Alexandria Font */}
            <div className="space-y-2.5 sm:space-y-3.5">
              <h1 className="font-luxury tracking-tight pb-4">
                {/* Primary Brand Name */}
                <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-normal pb-2">
                  وكالة <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF2C2] via-[#EFCB6C] to-[#D4AF37] drop-shadow-[0_4px_25px_rgba(212,175,55,0.4)]">وهبين</span>
                </span>
                {/* Scope of Service */}
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 mt-2 sm:mt-4 leading-normal">
                  للسفريات والسياحة
                </span>
              </h1>

              {/* Distinctive Prestigious Motto: "خيارك الأمثل" */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-gold-400 to-transparent rounded-full" />
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-gold-400 to-amber-500 drop-shadow-[0_2px_18px_rgba(212,175,55,0.45)]">
                  خيارك الأمثل
                </span>
                <span className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-gold-400 to-transparent rounded-full" />
              </div>
            </div>

            {/* Sub-description */}
            <p className="text-xs sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
              نرافقك بأعلى درجات الفخامة والموثوقية: باقات حج وعمرة مدروسة بعناية، حجز تذاكر طيران لجميع الوجهات العالمية بأفضل الأسعار، استخراج سريع لكافة التأشيرات، وحجوزات فنادق الحرمين الراقية.
            </p>

            {/* Core Action Buttons: Stacked on Mobile, Side-by-side on Desktop */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              
              {/* Luxury Request Booking Button */}
              <Link
                to="/booking"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-extrabold text-xs sm:text-base shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.65)] transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3 border border-gold-300/40 active:scale-98"
              >
                <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-navy-950" />
                <span>طلب حجز مباشر</span>
              </Link>

              {/* Luxury Direct WhatsApp Button */}
              <a
                href="https://wa.me/967782833832?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-heading font-bold text-xs sm:text-base border border-emerald-400/40 hover:border-gold-400 shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 sm:gap-3 active:scale-98"
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span>تواصل واتساب مباشر</span>
              </a>

            </div>

          </div>

          {/* Left Column: Interactive 3D Luxury Visual with Wahbeen Plane and Floating Clouds (6 cols) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <InteractiveHeroVisual />
          </div>

        </div>

      </div>

      {/* Embedded Search and Filter Bar at bottom of Hero */}
      <div className="mt-12">
        <SearchFilterBar />
      </div>

    </section>
  );
}
