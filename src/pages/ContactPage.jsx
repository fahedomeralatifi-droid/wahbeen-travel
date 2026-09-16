import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  User 
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContactPage() {
  const { siteSettings } = useData();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Phone className="w-4 h-4 text-gold-400" />
            <span>نحن في خدمتكم دائماً</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            اتصل بنا - <span className="gold-text-gradient">وكالة وهبين للسفريات</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            يسعدنا تواصلكم واستقبالكم في مقرنا في عدن أو الرد على استفساراتكم عبر قنوات الواتساب والهاتف على مدار الساعة.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-right">
          
          {/* Address */}
          <div className="glass-panel rounded-3xl p-6 border border-gold-500/20 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">العنوان والمقر الرئيسي</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {siteSettings.address}
            </p>
            <div className="text-[11px] text-gold-400 font-semibold pt-1">
              العاصمة عدن - الجمهورية اليمنية
            </div>
          </div>

          {/* WhatsApp Booking */}
          <div className="glass-panel rounded-3xl p-6 border border-green-500/30 space-y-3 bg-green-950/20">
            <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center text-white shadow-md">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">واتساب الحجز المباشر</h3>
            <p className="text-xs text-slate-300">
              للاستفسار عن أسعار تذاكر الطيران، باقات العمرة، وتأشيرات السفر الفورية:
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/967782833832"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white font-mono text-sm font-bold shadow transition-colors"
                dir="ltr"
              >
                <MessageSquare className="w-4 h-4" />
                <span>+967 782833832</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Manager */}
          <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 space-y-3 bg-gold-950/20">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center text-navy-950 shadow-md">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white">واتساب المدير العام</h3>
            <p className="text-xs text-slate-300">
              للشكاوى، الاقتراحات، الشراكات، وعروض المجموعات الكبرى وخدمات VIP:
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/967776050007"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-mono text-sm font-bold shadow transition-colors"
                dir="ltr"
              >
                <MessageSquare className="w-4 h-4" />
                <span>+967 776050007</span>
              </a>
            </div>
          </div>

        </div>

        {/* Interactive Map & Form Grid */}
        <div id="map" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Location Map View (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-gold-500/25 space-y-4 text-right">
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>موقع الوكالة على الخريطة</span>
            </h3>
            
            <p className="text-xs text-slate-300">
              عدن - الممدارة - شارع المنار الرئيسي - بجوار العاطفي للصرافة.
            </p>

            {/* Simulated Clean Interactive Map Canvas with Coordinates */}
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 border border-white/10 bg-navy-900 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-14 h-14 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-400 animate-bounce">
                <MapPin className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-heading font-bold text-white">موقع وكالة وهبين للسفريات</h4>
                <p className="text-xs text-slate-300">الممدارة، شارع المنار، بجانب العاطفي للصرافة - عدن</p>
                <div className="text-[11px] text-gold-400/90 font-mono" dir="ltr">Lat: 12.8712° N, Long: 45.0289° E</div>
              </div>
              <a
                href="https://maps.google.com/?q=Al-Mamdara,Aden,Yemen"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow transition-colors flex items-center gap-1.5 mt-2"
              >
                <span>فتح الموقع في خرائط Google ↗</span>
              </a>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 text-xs text-slate-300 border border-white/5">
              <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span><strong>أوقات الدوام:</strong> السبت - الخميس: 8:30 صباحاً إلى 9:30 مساءً (الواتساب متاح 24/7)</span>
            </div>
          </div>

          {/* Quick Message Form (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/25 text-right space-y-4">
            <h3 className="text-xl font-heading font-bold text-white">
              أرسل لنا رسالة سريعة
            </h3>
            
            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-950/60 border border-green-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
                <h4 className="font-heading font-bold text-white text-base">تم إرسال رسالتك بنجاح</h4>
                <p className="text-xs text-slate-300">
                  شكراً لتواصلك. يمكنك أيضاً متابعة الرد مباشرة عبر الواتساب:
                </p>
                <a
                  href={`https://wa.me/967782833832?text=${encodeURIComponent(`السلام عليكم، أرسلت لكم استفساراً من الموقع باسم ${formData.name}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-xs font-bold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>فتح الواتساب للمتابعة</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اسمك الكريم..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف أو الواتساب</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+967 780000000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white placeholder-slate-500 font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">موضوع الاستفسار</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="حجز طيران، عمرة، تأشيرة..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نص الرسالة</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب استفسارك هنا بالتفصيل..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-heading font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
