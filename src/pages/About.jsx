import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  ShieldCheck, 
  Eye, 
  Target, 
  Heart, 
  Building2, 
  CheckCircle2, 
  Phone, 
  CalendarCheck,
  MapPin
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function About() {
  const { siteSettings } = useData();

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-3">
            <Award className="w-4 h-4 text-gold-400" />
            <span>عراقة، ثقة، وفخامة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            من نحن - <span className="gold-text-gradient">وكالة وهبين للسفريات</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            وكالة رائدة في العاصمة عدن متخصصة في تقديم أرقى خدمات السفر والسياحة، تنظيم رحلات الحج والعمرة، إصدار تذاكر الطيران، وتأشيرات السفر الدولية وفق أحدث المعايير العالمية.
          </p>
        </div>

        {/* Story & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5 text-right">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
              قصة نجاحنا وخدمتنا <span className="gold-text-gradient">لضيوف الرحمن</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تأسست <strong>وكالة وهبين للسفريات والسياحة وخدمات الحج والعمرة</strong> في العاصمة عدن برؤية واضحة تهدف إلى الارتقاء بمفهوم السفر وخدمات الحج والعمرة، وتقديم تجربة روحانية وسياحية استثنائية تتسم بالسهولة والراحة والاهتمام بأدق التفاصيل.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              على مدار سنوات طويلة من العمل الدؤوب والشراكات الاستراتيجية مع كبرى شركات الطيران العالمية وسلاسل الفنادق الرائدة في مكة المكرمة والمدينة المنورة، نجحت وهبين في كسب ثقة آلاف العائلات والمسافرين من مختلف محافظات الجمهورية اليمنية.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div className="p-3 rounded-2xl bg-navy-900/90 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-slate-200">مرخصة رسمياً ومعتمدة</span>
              </div>
              <div className="p-3 rounded-2xl bg-navy-900/90 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-slate-200">إشراف ميداني متمرس</span>
              </div>
              <div className="p-3 rounded-2xl bg-navy-900/90 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-slate-200">أسعار تنافسية مباشرة</span>
              </div>
              <div className="p-3 rounded-2xl bg-navy-900/90 border border-white/10 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span className="text-slate-200">خدمة عملاء 24 ساعة</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="glass-panel rounded-3xl p-4 border border-gold-500/30 overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1000&auto=format&fit=crop" 
                alt="المسجد الحرام وخدمات الحج والعمرة" 
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="mt-4 p-4 rounded-2xl bg-navy-900/90 border border-white/10 text-right">
                <div className="text-xs text-gold-400 font-bold mb-1">مقرنا الرئيسي</div>
                <div className="text-sm font-semibold text-white">{siteSettings.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 text-right space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">رؤيتنا</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              أن نكون الخيار الأول والأكثر موثوقية للمسافر والمعتمر اليمني، من خلال تقديم منظومة خدمات سفر وسياحة متكاملة تجمع بين الفخامة والأسعار المدروسة والاهتمام الإنساني الفائق.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 text-right space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">رسالتنا</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              تيسير رحلات ضيوف الرحمن والمسافرين بكفاءة عالية واحترافية متناهية، وإزالة كافة عوائق السفر عبر تقديم باقات ميسرة، مواعيد دقيقة، ورعاية شاملة تضمن راحة البال التامة.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 text-right space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white">قيمنا</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              الأمانة والصدق في التعامل، احترام المواعيد، الشفافية المطلقة في الأسعار، والحرص البالغ على تقديم أرقى خدمة تليق بضيوف بيت الله الحرام وعملاء وكالتنا الكرام.
            </p>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/30 text-center space-y-4">
          <h2 className="text-2xl font-heading font-bold text-white">
            جاهزون لبدء رحلتك القادمة معنا؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            فريقنا يسعد باستقبالكم في مقرنا في عدن أو الرد على كافة استفساراتكم عبر الواتساب على مدار الساعة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/booking"
              className="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-heading font-bold text-sm shadow transition-colors flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>إرسال طلب حجز</span>
            </Link>

            <a
              href="https://wa.me/967782833832"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-heading font-bold text-sm shadow transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>واتساب الحجز: 782833832</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
