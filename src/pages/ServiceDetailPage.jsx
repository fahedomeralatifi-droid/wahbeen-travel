import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  CalendarCheck, 
  MessageSquare, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Plane,
  FileCheck,
  Moon,
  Building2,
  Hotel,
  Compass,
  Bus,
  Crown
} from 'lucide-react';
import { useData } from '../context/DataContext';

const iconMap = {
  Plane,
  FileCheck,
  Moon,
  Building2,
  Hotel,
  Compass,
  Bus,
  ShieldCheck,
  Crown
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const { services, packages } = useData();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const IconComponent = iconMap[service.icon] || Plane;
  const relatedPackages = packages.filter((p) => 
    (slug === 'umrah' && p.type === 'umrah') || 
    (slug === 'hajj' && p.type === 'hajj')
  );

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-gold-400">الرئيسية</Link>
          <span>/</span>
          <Link to="/services" className="hover:text-gold-400">خدماتنا</Link>
          <span>/</span>
          <span className="text-gold-400 font-bold">{service.title}</span>
        </div>

        {/* Hero Section of Service */}
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
          </div>

          <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-10 text-right space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold">
              <IconComponent className="w-4 h-4 text-gold-400" />
              <span>{service.subtitle}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white">
              {service.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              {service.shortDesc}
            </p>
          </div>
        </div>

        {/* Main Service Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Right Column: Full Details & Features (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-right">
            
            {/* Description Card */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/20 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-white border-b border-white/10 pb-3">
                تفاصيل ومميزات الخدمة
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {service.fullDesc}
              </p>

              {/* Feature Points */}
              <div className="pt-4 space-y-3">
                <h3 className="text-sm font-bold text-gold-300 mb-2">ما تشمله هذه الخدمة لدى وكالة وهبين:</h3>
                {service.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-2xl border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Hajj/Umrah Packages if applicable */}
            {relatedPackages.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-white">
                  باقات {service.title} المتوفرة حالياً:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedPackages.map((pkg) => (
                    <div key={pkg.id} className="glass-panel rounded-2xl p-4 border border-gold-500/20 space-y-2">
                      <span className="text-[10px] text-gold-400 font-bold">{pkg.category}</span>
                      <h4 className="font-heading font-bold text-white text-sm">{pkg.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{pkg.subtitle}</p>
                      <div className="pt-2 flex justify-between items-center">
                        <span className="text-xs text-slate-400">{pkg.duration}</span>
                        <Link 
                          to={`/booking?package=${encodeURIComponent(pkg.title)}&type=${encodeURIComponent(service.title)}`}
                          className="px-3 py-1 bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold rounded-lg transition-colors"
                        >
                          طلب حجز
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Left Column: Quick Action Box (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Direct Booking Card */}
            <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 text-right space-y-5 shadow-xl">
              <div className="space-y-1">
                <span className="text-[11px] text-gold-400 font-bold uppercase tracking-wider block">طلب فوري</span>
                <h3 className="text-xl font-heading font-bold text-white">احجز {service.title}</h3>
                <p className="text-xs text-slate-300">
                  أرسل طلبك الآن بدون دفع إلكتروني، وسنتواصل معك فوراً لتزويدك بأفضل العروض ومواعيد الرحلات.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to={`/booking?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-sm shadow-md hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>إرسال طلب حجز الخدمة</span>
                </Link>

                <a
                  href={`https://wa.me/967782833832?text=${encodeURIComponent(`السلام عليكم، أود الاستفسار عن خدمة "${service.title}" عبر وكالة وهبين.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>محادثة واتساب موظف الحجز</span>
                </a>

                <a
                  href="https://wa.me/967776050007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-2xl bg-navy-900 hover:bg-navy-800 border border-gold-500/30 text-gold-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>واتساب المدير: 776050007</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 space-y-1">
                <div>✓ استجابة سريعة على مدار الساعة</div>
                <div>✓ أسعار تفضيلية وضمان المقاعد</div>
                <div>✓ دعم ومتابعة طوال مدة السفر</div>
              </div>
            </div>

            {/* Other Services Navigation */}
            <div className="glass-panel rounded-3xl p-5 border border-white/10 text-right space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                خدمات أخرى قد تهمك
              </h4>
              <div className="space-y-1.5">
                {services.filter((s) => s.slug !== slug).slice(0, 5).map((other) => (
                  <Link
                    key={other.id}
                    to={`/services/${other.slug}`}
                    className="block p-2 rounded-xl text-xs text-slate-300 hover:text-gold-300 hover:bg-white/5 transition-colors"
                  >
                    {other.title}
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
