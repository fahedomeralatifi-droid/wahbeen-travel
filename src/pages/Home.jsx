import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Clock, 
  HeartHandshake, 
  CalendarCheck, 
  MessageSquare, 
  ChevronLeft,
  MapPin
} from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import PackageCard from '../components/PackageCard';
import { useData } from '../context/DataContext';
import { useCurrency } from '../context/CurrencyContext';

export default function Home() {
  const { services, packages, destinations } = useData();
  const { formatPrice } = useCurrency();
  const [packageTab, setPackageTab] = useState('all');

  // Filter packages based on active tab
  const filteredPackages = packageTab === 'all' 
    ? packages 
    : packages.filter((p) => p.type === packageTab);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Hero Section with Cutout Plane/Kaaba/Pilgrim and Search Bar */}
      <Hero />

      {/* 2. Statistical Highlights Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-gold-500/30 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            
            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-gold-400 mb-1">
                15+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">عاماً من الخبرة والريادة</div>
              <div className="text-[11px] text-slate-400">في خدمات السفر والحج والعمرة</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-gold-400 mb-1">
                25,000+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">معتمر وحاج ومسافر</div>
              <div className="text-[11px] text-slate-400">سافروا معنا بكل طمأنينة</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-gold-400 mb-1">
                99.8%
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">نسبة رضا العملاء</div>
              <div className="text-[11px] text-slate-400">ثقة متوارثة ورعاية لا تنقطع</div>
            </div>

            <div className="pt-4 lg:pt-0">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-gold-400 mb-1">
                50+
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">شريك طيران وفنادق</div>
              <div className="text-[11px] text-slate-400">تعاقدات حصرية بأسعار تفضيلية</div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Why Choose Wahbeen? (لماذا تختار وكالة وهبين؟) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-3">
            <Award className="w-4 h-4 text-gold-400" />
            <span>معايير التميز والفخامة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            لماذا يختار المسافرون <span className="gold-text-gradient">وكالة وهبين</span>؟
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            نجمع بين الخبرة العريقة في إدارة الأفواج والتقنيات الحديثة لتوفير تجربة سفر فاخرة ومريحة تلبي أعلى معايير الجودة والشفافية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all text-right group">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">اعتماد رسمي وتراخيص قانونية</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              وكالة معتمدة رسمياً ومسجلة لدى وزارات الأوقاف والإرشاد، النقل، وهيئات الطيران المدني، مما يضمن حقوقك الكاملة في كل رحلة.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all text-right group">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">فنادق صف أول وقريبة من الحرم</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تعاقدات مباشرة مع أشهر أبراج وفنادق مكة المكرمة والمدينة المنورة المطلة والمجاورة لساحات الحرم لتوفير أقصى درجات الراحة للمعتمرين.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all text-right group">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">متابعة وإشراف على مدار 24 ساعة</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              فريق إداري وميداني مرافق لك منذ لحظة إقلاع الرحلة وحتى العودة، لضمان معالجة أي طارئ وتلبية كافة الاحتياجات.
            </p>
          </div>

        </div>
      </section>

      {/* 4. Core Services Showcase (خدماتنا) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>خدماتنا الشاملة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              خدمات سفر راقية <span className="gold-text-gradient">لكافة احتياجاتك</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="text-xs sm:text-sm font-semibold text-gold-400 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>استعراض كافة الخدمات (9)</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 5. Hajj & Umrah Featured Packages (باقات الحج والعمرة) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>ضيوف الرحمن</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            باقات الحج والعمرة <span className="gold-text-gradient">المباركة</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
            برامج متكاملة تشمل التأشيرة، السكن القريب من الحرمين، النقل الحديث، والإشراف الميداني بأفضل الأسعار.
          </p>

          {/* Filter Tabs: All, Umrah, Hajj */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-navy-900 border border-white/10 gap-1 max-w-full overflow-x-auto">
            <button
              onClick={() => setPackageTab('all')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                packageTab === 'all' 
                  ? 'bg-gold-500 text-navy-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              جميع الباقات
            </button>
            <button
              onClick={() => setPackageTab('umrah')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                packageTab === 'umrah' 
                  ? 'bg-gold-500 text-navy-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              باقات العمرة
            </button>
            <button
              onClick={() => setPackageTab('hajj')}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                packageTab === 'hajj' 
                  ? 'bg-gold-500 text-navy-950 font-bold shadow' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              باقات الحج
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/hajj-umrah"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy-900 hover:bg-navy-800 border border-gold-500/40 text-gold-300 text-sm font-bold transition-all"
          >
            <span>استعراض كافة تفاصيل باقات الحج والعمرة</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>



      {/* 7. Featured Destinations (أبرز الوجهات السياحية) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-right">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-2">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>استكشف العالم</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              وجهات سياحية <span className="gold-text-gradient">ساحرة</span>
            </h2>
          </div>
          <Link
            to="/destinations"
            className="text-xs sm:text-sm font-semibold text-gold-400 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-end"
          >
            <span>دليل الوجهات الكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest) => (
            <div 
              key={dest.id}
              className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all text-right group"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="text-[11px] font-bold text-gold-400 block">{dest.country}</span>
                  <h3 className="text-2xl font-heading font-bold text-white">{dest.name}</h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                  {dest.desc}
                </p>

                <div className="space-y-1 mb-4 text-xs text-slate-400">
                  <strong className="text-gold-300 block mb-1">أبرز المعالم:</strong>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.attractions.slice(0, 3).map((attr, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-navy-800 text-[11px] text-slate-300">
                        {attr}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">تبدأ الرحلات من:</span>
                    <span className="text-base font-heading font-bold text-gold-400">
                      {formatPrice(dest.startingPriceSAR)}
                    </span>
                  </div>

                  <Link
                    to={`/booking?destination=${encodeURIComponent(dest.name)}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-xs font-bold border border-gold-500/40 transition-colors"
                  >
                    حجز رحلة
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Direct CTA Strip: Single Luxury WhatsApp Button + Single Luxury Booking Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border-2 border-gold-500/40 p-8 sm:p-14 shadow-2xl text-center">
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="px-4 py-1.5 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/30 inline-block">
              خدمة راقية ومباشرة
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white leading-tight">
              هل تخطط لرحلة عمرة أو حجز تذكرة طيران؟ <br />
              <span className="gold-text-gradient">تواصل مع موظف الحجز مباشرة الآن</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light">
              فريق وكالة وهبين في خدمتك فوراً لتزويدك بأفضل باقات السفر وتأكيد حجزك بكل سهولة وأمان.
            </p>

            {/* Exactly 2 High-End Luxury Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
              
              {/* Luxury Direct WhatsApp Button */}
              <a
                href="https://wa.me/967782833832?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D8%AD%D8%AC%D9%88%D8%B2%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-heading font-bold text-xs sm:text-base border border-emerald-400/40 hover:border-gold-400 shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.6)] transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-98"
              >
                <MessageSquare className="w-5 h-5 text-white" />
                <span>تواصل واتساب: 782833832</span>
              </a>

              {/* Luxury Direct Booking Request Button */}
              <Link
                to="/booking"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-extrabold text-xs sm:text-base shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.65)] transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 border border-gold-300/40 active:scale-98"
              >
                <CalendarCheck className="w-5 h-5 text-navy-950" />
                <span>طلب حجز مباشر</span>
              </Link>

            </div>

            <div className="text-xs text-slate-400 pt-2">
              العنوان: عدن - الممدارة - شارع المنار - بجانب العاطفي للصرافة
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
