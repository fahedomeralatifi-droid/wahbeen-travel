import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  Shield, 
  ExternalLink,
  ChevronDown,
  MessageCircle,
  Clock,
  Sparkles,
  CalendarCheck
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Footer() {
  const { siteSettings, addSubscriber } = useData();
  const [emailInput, setEmailInput] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState('');
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);

  const toggleAccordion = (sectionKey) => {
    setOpenMobileAccordion(prev => prev === sectionKey ? null : sectionKey);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    const success = addSubscriber(emailInput);
    if (success) {
      setSubscribedMessage('شكراً لاشتراكك! ستصلك أحدث عروض السفر والعمرة.');
      setEmailInput('');
    } else {
      setSubscribedMessage('أنت مشترك بالفعل في نشرتنا البريدية.');
    }
    setTimeout(() => setSubscribedMessage(''), 5000);
  };

  return (
    <footer className="bg-navy-950 border-t border-gold-500/25 relative overflow-hidden text-slate-300 pt-12 sm:pt-16 pb-8">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-navy-800/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Strip: Dedicated Direct Contact Quick Action (776847742) */}
        <div className="mb-10 p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/15 border border-gold-500/40 flex items-center justify-center text-gold-400 flex-shrink-0">
              <Phone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-gold-400 font-bold">خدمة العملاء والاستفسارات السريعة</div>
              <div className="text-base sm:text-lg font-heading font-extrabold text-white flex items-center justify-center sm:justify-start gap-2">
                <span>تواصل مباشر:</span>
                <span className="font-mono text-gold-300" dir="ltr">776847742</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href="tel:+967776847742"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>اتصال هاتفي</span>
            </a>
            <a
              href="https://wa.me/967776847742?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>مراسلة واتساب</span>
            </a>
          </div>
        </div>

        {/* 1. Desktop 4-Column Grid Layout (hidden on mobile, visible on md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/10 text-right">
          
          {/* Column 1: Brand & Contact Details */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="وكالة وهبين للسفريات والسياحة" 
                className="h-14 sm:h-16 w-auto object-contain filter drop-shadow"
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-gold-400 font-bold">وكالة وهبين للسفريات والسياحة وخدمات الحج والعمرة</strong> - بوابتكم الرسمية المعتمدة لرحلات مريحة وآمنة، باقات حج وعمرة ميسرة، حجز تذاكر طيران لجميع الوجهات العالمية، وتأشيرات سياحية وتجارية سريعة.
            </p>

            <div className="space-y-2 pt-1 text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span dir="ltr">واتساب الحجز: <a href="https://wa.me/967782833832" target="_blank" rel="noreferrer" className="hover:text-green-400 font-mono">+967 782833832</a></span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span dir="ltr">واتساب المدير: <a href="https://wa.me/967776050007" target="_blank" rel="noreferrer" className="hover:text-gold-400 font-mono">+967 776050007</a></span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-gold-300 flex-shrink-0" />
                <span dir="ltr">تواصل إضافي: <a href="tel:+967776847742" className="hover:text-gold-300 font-mono">+967 776847742</a></span>
              </div>
            </div>

            {/* Social Icons Strip in One Neat Row */}
            <div className="pt-2 flex items-center gap-2.5">
              <a 
                href="https://wa.me/967782833832" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-green-950/70 border border-green-600/40 flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-colors"
                title="واتساب الحجز"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              {siteSettings.socialLinks.facebook && (
                <a 
                  href={siteSettings.socialLinks.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="فيسبوك"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
              )}
              {siteSettings.socialLinks.instagram && (
                <a 
                  href={siteSettings.socialLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="إنستغرام"
                >
                  <span className="text-xs font-bold">ig</span>
                </a>
              )}
              {siteSettings.socialLinks.tiktok && (
                <a 
                  href={siteSettings.socialLinks.tiktok} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="تيك توك"
                >
                  <span className="text-xs font-bold">tk</span>
                </a>
              )}
              {siteSettings.socialLinks.twitter && (
                <a 
                  href={siteSettings.socialLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="منصة إكس"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-gold-400 uppercase tracking-wider border-b border-gold-500/20 pb-2">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">من نحن</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">جميع خدماتنا</Link></li>
              <li><Link to="/hajj-umrah" className="hover:text-gold-400 transition-colors">الحج والعمرة</Link></li>
              <li><Link to="/offers" className="hover:text-gold-400 transition-colors">أحدث العروض</Link></li>
              <li><Link to="/destinations" className="hover:text-gold-400 transition-colors">الوجهات السياحية</Link></li>
              <li><Link to="/programs" className="hover:text-gold-400 transition-colors">البرامج السياحية</Link></li>
              <li><Link to="/booking" className="text-gold-400 font-bold hover:underline flex items-center gap-1"><CalendarCheck className="w-3.5 h-3.5" /> طلب حجز مباشر</Link></li>
            </ul>
          </div>

          {/* Column 3: Agency Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-gold-400 uppercase tracking-wider border-b border-gold-500/20 pb-2">
              خدمات الوكالة
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services/flights" className="hover:text-gold-400 transition-colors">حجوزات طيران</Link></li>
              <li><Link to="/services/visas" className="hover:text-gold-400 transition-colors">تأشيرات سفر</Link></li>
              <li><Link to="/services/umrah" className="hover:text-gold-400 transition-colors">رحلات العمرة</Link></li>
              <li><Link to="/services/hajj" className="hover:text-gold-400 transition-colors">باقات الحج</Link></li>
              <li><Link to="/services/hotels" className="hover:text-gold-400 transition-colors">حجوزات فنادق</Link></li>
              <li><Link to="/services/transport" className="hover:text-gold-400 transition-colors">نقل سياحي VIP</Link></li>
              <li><Link to="/services/insurance" className="hover:text-gold-400 transition-colors">تأمين السفر الدولي</Link></li>
              <li><Link to="/services/vip" className="hover:text-gold-400 transition-colors">خدمات كبار الشخصيات</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Extra Pages */}
          <div className="space-y-3">
            <h4 className="text-sm font-heading font-bold text-gold-400 uppercase tracking-wider border-b border-gold-500/20 pb-2">
              النشرة البريدية
            </h4>
            <p className="text-xs text-slate-400">
              اشترك لتصلك أحدث أسعار تذاكر الطيران وباقات العمرة والحج الموسمية فور صدورها.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني..." 
                  className="w-full px-3 py-2 text-xs rounded-xl bg-navy-900 border border-white/15 focus:border-gold-500 focus:outline-none text-white placeholder-slate-500"
                  required
                />
                <button
                  type="submit"
                  className="absolute left-1 top-1 bottom-1 px-3 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg text-xs font-bold transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribedMessage && (
                <div className="text-[11px] text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{subscribedMessage}</span>
                </div>
              )}
            </form>

            <div className="pt-2">
              <h5 className="text-[11px] font-bold text-slate-300 mb-1.5">صفحات إضافية</h5>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                <Link to="/blog" className="hover:text-gold-400">المدونة</Link>
                <Link to="/faq" className="hover:text-gold-400">الأسئلة الشائعة</Link>
                <Link to="/privacy" className="hover:text-gold-400">سياسة الخصوصية</Link>
                <Link to="/terms" className="hover:text-gold-400">الشروط والأحكام</Link>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Mobile Accordion Layout (visible on < md only, prevents long scrolling clutter) */}
        <div className="md:hidden space-y-2.5 pb-8 border-b border-white/10 text-right">
          
          {/* Mobile Header: Logo & Short Intro */}
          <div className="text-center pb-3">
            <Link to="/" className="inline-block mb-2">
              <img 
                src="/logo.png" 
                alt="وكالة وهبين" 
                className="h-12 w-auto mx-auto object-contain filter drop-shadow"
              />
            </Link>
            <p className="text-xs text-slate-300 px-2 leading-relaxed">
              وكالة وهبين للسفريات والسياحة وخدمات الحج والعمرة - عدن.
            </p>

            {/* Social Icons row for mobile */}
            <div className="pt-3 flex items-center justify-center gap-2.5">
              <a 
                href="https://wa.me/967782833832" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-green-950/70 border border-green-600/40 flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-colors"
                title="واتساب الحجز"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>
              {siteSettings.socialLinks.facebook && (
                <a 
                  href={siteSettings.socialLinks.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="فيسبوك"
                >
                  <span className="text-xs font-bold">f</span>
                </a>
              )}
              {siteSettings.socialLinks.instagram && (
                <a 
                  href={siteSettings.socialLinks.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="إنستغرام"
                >
                  <span className="text-xs font-bold">ig</span>
                </a>
              )}
              {siteSettings.socialLinks.tiktok && (
                <a 
                  href={siteSettings.socialLinks.tiktok} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="تيك توك"
                >
                  <span className="text-xs font-bold">tk</span>
                </a>
              )}
              {siteSettings.socialLinks.twitter && (
                <a 
                  href={siteSettings.socialLinks.twitter} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-navy-900 border border-gold-500/20 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500 transition-colors"
                  title="منصة إكس"
                >
                  <span className="text-xs font-bold">𝕏</span>
                </a>
              )}
            </div>
          </div>

          {/* Accordion Item 1: بيانات الاتصال والعنوان */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-navy-900/40">
            <button
              onClick={() => toggleAccordion('contact')}
              className="w-full flex items-center justify-between p-3 text-right text-xs font-bold text-gold-300 hover:bg-white/5 transition-colors"
            >
              <span>بيانات التواصل والمقر الرسمي</span>
              <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${openMobileAccordion === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileAccordion === 'contact' && (
              <div className="p-3 bg-navy-950/80 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{siteSettings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                  <span dir="ltr">واتساب الحجز: <a href="https://wa.me/967782833832" className="text-green-400 font-mono">+967 782833832</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span dir="ltr">واتساب المدير: <a href="https://wa.me/967776050007" className="text-gold-400 font-mono">+967 776050007</a></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold-300 flex-shrink-0" />
                  <span dir="ltr">تواصل إضافي: <a href="tel:+967776847742" className="text-gold-300 font-mono">+967 776847742</a></span>
                </div>
              </div>
            )}
          </div>

          {/* Accordion Item 2: روابط سريعة */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-navy-900/40">
            <button
              onClick={() => toggleAccordion('links')}
              className="w-full flex items-center justify-between p-3 text-right text-xs font-bold text-gold-300 hover:bg-white/5 transition-colors"
            >
              <span>روابط رئيسية وحجز مباشر</span>
              <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${openMobileAccordion === 'links' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileAccordion === 'links' && (
              <div className="p-3 bg-navy-950/80 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <Link to="/" className="text-slate-300 hover:text-gold-400 py-1">الرئيسية</Link>
                <Link to="/about" className="text-slate-300 hover:text-gold-400 py-1">من نحن</Link>
                <Link to="/services" className="text-slate-300 hover:text-gold-400 py-1">جميع الخدمات</Link>
                <Link to="/hajj-umrah" className="text-slate-300 hover:text-gold-400 py-1">الحج والعمرة</Link>
                <Link to="/offers" className="text-slate-300 hover:text-gold-400 py-1">أحدث العروض</Link>
                <Link to="/destinations" className="text-slate-300 hover:text-gold-400 py-1">الوجهات</Link>
                <Link to="/programs" className="text-slate-300 hover:text-gold-400 py-1">البرامج السياحية</Link>
                <Link to="/booking" className="text-gold-400 font-bold py-1">طلب حجز مباشر</Link>
              </div>
            )}
          </div>

          {/* Accordion Item 3: خدمات الوكالة */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-navy-900/40">
            <button
              onClick={() => toggleAccordion('services')}
              className="w-full flex items-center justify-between p-3 text-right text-xs font-bold text-gold-300 hover:bg-white/5 transition-colors"
            >
              <span>خدمات السفر والحج والعمرة</span>
              <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${openMobileAccordion === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileAccordion === 'services' && (
              <div className="p-3 bg-navy-950/80 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <Link to="/services/flights" className="text-slate-300 hover:text-gold-400 py-1">حجوزات طيران</Link>
                <Link to="/services/visas" className="text-slate-300 hover:text-gold-400 py-1">تأشيرات سفر</Link>
                <Link to="/services/umrah" className="text-slate-300 hover:text-gold-400 py-1">رحلات العمرة</Link>
                <Link to="/services/hajj" className="text-slate-300 hover:text-gold-400 py-1">باقات الحج</Link>
                <Link to="/services/hotels" className="text-slate-300 hover:text-gold-400 py-1">حجوزات فنادق</Link>
                <Link to="/services/transport" className="text-slate-300 hover:text-gold-400 py-1">نقل سياحي VIP</Link>
                <Link to="/services/insurance" className="text-slate-300 hover:text-gold-400 py-1">تأمين السفر</Link>
                <Link to="/services/vip" className="text-slate-300 hover:text-gold-400 py-1">خدمات VIP</Link>
              </div>
            )}
          </div>

          {/* Accordion Item 4: النشرة البريدية وصفحات إضافية */}
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-navy-900/40">
            <button
              onClick={() => toggleAccordion('newsletter')}
              className="w-full flex items-center justify-between p-3 text-right text-xs font-bold text-gold-300 hover:bg-white/5 transition-colors"
            >
              <span>النشرة البريدية والصفحات الإضافية</span>
              <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${openMobileAccordion === 'newsletter' ? 'rotate-180' : ''}`} />
            </button>
            {openMobileAccordion === 'newsletter' && (
              <div className="p-3 bg-navy-950/80 border-t border-white/10 space-y-3">
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="relative">
                    <input 
                      type="email" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="بريدك الإلكتروني..." 
                      className="w-full px-3 py-2 text-xs rounded-xl bg-navy-900 border border-white/15 focus:border-gold-500 focus:outline-none text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute left-1 top-1 bottom-1 px-3 bg-gold-500 text-navy-950 rounded-lg text-xs font-bold"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {subscribedMessage && (
                    <div className="text-[11px] text-green-400">{subscribedMessage}</div>
                  )}
                </form>

                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  <Link to="/blog" className="hover:text-gold-400">المدونة</Link>
                  <span>•</span>
                  <Link to="/faq" className="hover:text-gold-400">الأسئلة الشائعة</Link>
                  <span>•</span>
                  <Link to="/privacy" className="hover:text-gold-400">الخصوصية</Link>
                  <span>•</span>
                  <Link to="/terms" className="hover:text-gold-400">الشروط</Link>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 3. Bottom Bar: Copyright, Developer Signature & Terms */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Copyright & Disclaimer */}
          <div className="text-center md:text-right">
            <span>© {new Date().getFullYear()} وكالة وهبين للسفريات والسياحة وخدمات الحج والعمرة. جميع الحقوق محفوظة.</span>
            <span className="block sm:inline sm:mr-2 text-[11px] text-gold-400/80">
              * الأسعار المعروضة تقديرية وقابلة للتغيير وفق تواريخ السفر.
            </span>
          </div>

          {/* Mandatory Developer Signature as requested */}
          <div className="text-center py-1 px-3 rounded-full bg-navy-900/60 border border-gold-500/20 text-slate-300 text-[11px] sm:text-xs">
            <span>تصميم وتطوير: </span>
            <strong className="text-gold-400 font-heading font-bold">م. ابن عمر</strong>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-[11px]">
            <Link to="/privacy" className="hover:text-gold-400">سياسة الخصوصية</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gold-400">الشروط والأحكام</Link>
          </div>

        </div>

      </div>
    </footer>
  );
}
