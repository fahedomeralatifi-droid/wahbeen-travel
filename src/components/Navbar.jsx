import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  CalendarCheck, 
  Plane, 
  FileCheck, 
  Hotel, 
  Bus, 
  ShieldCheck, 
  Crown, 
  Building2, 
  Moon, 
  HelpCircle, 
  Sparkles, 
  Compass, 
  Gift, 
  MessageSquare, 
  MapPin, 
  Info, 
  Users, 
  Briefcase, 
  BookOpen, 
  FileText,
  MessageCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  
  const location = useLocation();
  const { siteSettings } = useData();
  const dropdownTimeoutRef = useRef(null);

  // Scroll detection for sticky header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileAccordion(null);
  }, [location.pathname, location.search]);

  // Dropdown hover handlers with slight delay for pleasant UX
  const handleMouseEnter = (menuKey) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  // Exactly 5 sections strictly specified
  const navSections = [
    {
      id: 'home',
      label: 'الرئيسية',
      items: [
        { label: 'الرئيسية', to: '/', icon: Building2, desc: 'الصفحة الرئيسية وبانوراما الخدمات' },
        { label: 'من نحن', to: '/about', icon: Info, desc: 'رؤيتنا، رسالتنا، وتاريخ وكالتنا' },
        { label: 'المدونة', to: '/blog', icon: BookOpen, desc: 'مقالات سياحية ودينية وإرشادات السفر' },
      ]
    },
    {
      id: 'services',
      label: 'خدماتنا',
      items: [
        { label: 'حجوزات طيران', to: '/services/flights', icon: Plane, desc: 'تذاكر مخفضة لجميع الخطوط العالمية' },
        { label: 'تأشيرات', to: '/services/visas', icon: FileCheck, desc: 'استخراج سريع للفيز السياحية والعلاجية' },
        { label: 'فنادق', to: '/services/hotels', icon: Hotel, desc: 'أفضل فنادق الحرمين والعواصم' },
        { label: 'نقل', to: '/services/transport', icon: Bus, desc: 'باصات VIP حديثة وسيارات خاصة' },
        { label: 'تأمين سفر', to: '/services/insurance', icon: ShieldCheck, desc: 'وثائق تأمين دولية معتمدة للسفارات' },
        { label: 'خدمات VIP', to: '/services/vip', icon: Crown, desc: 'فخامة كبار الشخصيات وصالات خاصة' },
      ]
    },
    {
      id: 'hajj_umrah',
      label: 'الحج والعمرة',
      items: [
        { label: 'الحج', to: '/services/hajj', icon: Building2, desc: 'رحلات حج مباركة بإشراف ديني وصحي' },
        { label: 'العمرة', to: '/services/umrah', icon: Moon, desc: 'رحلات عمرة جوية وبرية متواصلة' },
        { label: 'باقات الحج', to: '/hajj-umrah?tab=hajj', icon: Crown, desc: 'باقات حج ممتازة وVIP مصنفة' },
        { label: 'باقات العمرة', to: '/hajj-umrah?tab=umrah', icon: Sparkles, desc: 'باقات اقتصادية، ذهبية، وملكية' },
        { label: 'الأسئلة الشائعة', to: '/faq', icon: HelpCircle, desc: 'إرشادات المناسك والشروط الرسمية' },
      ]
    },
    {
      id: 'offers_destinations',
      label: 'العروض والوجهات',
      items: [
        { label: 'العروض', to: '/offers', icon: Gift, desc: 'أقوى التخفيضات والخصومات النشطة' },
        { label: 'الوجهات', to: '/destinations', icon: MapPin, desc: 'دليل شامل لأجمل دول ومدن العالم' },
        { label: 'البرامج السياحية', to: '/programs', icon: Compass, desc: 'جداول رحلات عائلية وشهر عسل' },
        { label: 'عروض موسمية', to: '/offers?filter=seasonal', icon: Sparkles, desc: 'عروض الأعياد ومواسم الإجازات' },
      ]
    },
    {
      id: 'contact',
      label: 'اتصل بنا',
      items: [
        { label: 'اتصل بنا', to: '/contact', icon: Phone, desc: 'أرقام الهواتف ومكتب خدمة العملاء' },
        { label: 'طلب حجز', to: '/booking', icon: CalendarCheck, desc: 'إرسال طلب حجز مباشر بدون دفع' },
        { label: 'واتساب الحجز', href: 'https://wa.me/967782833832', icon: MessageSquare, desc: 'المحادثة المباشرة مع موظف الحجوزات', external: true },
        { label: 'واتساب المدير', href: 'https://wa.me/967776050007', icon: MessageSquare, desc: 'التواصل المباشر مع إدارة الوكالة', external: true },
        { label: 'الموقع', to: '/contact#map', icon: MapPin, desc: 'عدن - الممدارة - شارع المنار' },
        { label: 'سياسة الخصوصية', to: '/privacy', icon: FileText, desc: 'حماية وأمان بيانات المسافرين' },
        { label: 'الشروط والأحكام', to: '/terms', icon: FileText, desc: 'ضوابط وسياسات الحجز والسفر' },
      ]
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy-950/95 backdrop-blur-md shadow-2xl border-b border-gold-500/20 py-2' 
          : 'bg-navy-950/60 backdrop-blur-sm border-b border-white/10 py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo - Right in RTL */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group py-1">
            <img 
              src="/logo.png" 
              alt="وكالة وهبين للسفريات والسياحة" 
              className="h-9 sm:h-12 md:h-16 lg:h-20 w-auto object-contain filter drop-shadow-[0_2px_14px_rgba(212,175,55,0.3)] group-hover:drop-shadow-[0_4px_22px_rgba(212,175,55,0.55)] transition-all duration-300 group-hover:scale-105"
            />
            <div className="hidden 2xl:block text-right pr-1 border-r border-gold-500/20">
              <span className="block text-sm font-heading font-bold text-white tracking-wide group-hover:text-gold-400 transition-colors">
                وكالة وهبين للسفريات
              </span>
              <span className="block text-[10px] text-gold-400 font-medium">
                خيارك الأمثل لرحلاتك
              </span>
            </div>
          </Link>

          {/* Desktop Navigation: Exactly 5 items with Dropdowns */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navSections.map((section) => {
              const isOpen = openDropdown === section.id;
              return (
                <div 
                  key={section.id} 
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(section.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button 
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isOpen 
                        ? 'text-gold-400 bg-white/10 shadow-sm' 
                        : 'text-slate-200 hover:text-gold-400 hover:bg-white/5'
                    }`}
                  >
                    <span>{section.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-gold-400' : 'text-slate-400'}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div 
                      className="absolute top-full right-0 mt-1.5 w-64 bg-navy-900/95 backdrop-blur-xl border border-gold-500/30 rounded-2xl shadow-2xl p-2.5 z-50 animate-fadeIn"
                    >
                      <div className="text-[11px] font-bold text-gold-400/80 px-3 py-1 border-b border-white/10 mb-1 flex items-center justify-between">
                        <span>{section.label}</span>
                        <span className="text-[9px] text-slate-400">وكالة وهبين</span>
                      </div>
                      <div className="space-y-1">
                        {section.items.map((item, idx) => {
                          const IconComp = item.icon;
                          if (item.external) {
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gold-500/15 text-slate-200 hover:text-gold-300 transition-colors group"
                              >
                                <div className="p-1.5 rounded-lg bg-navy-800 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors mt-0.5">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="flex-1 text-right">
                                  <div className="text-xs font-semibold text-white group-hover:text-gold-300 flex items-center gap-1">
                                    {item.label}
                                    <span className="text-[10px] text-green-400 font-normal">واتساب ↗</span>
                                  </div>
                                  <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>
                                </div>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={idx}
                              to={item.to}
                              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-gold-500/15 text-slate-200 hover:text-gold-300 transition-colors group"
                            >
                              <div className="p-1.5 rounded-lg bg-navy-800 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors mt-0.5">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 text-right">
                                <div className="text-xs font-semibold text-white group-hover:text-gold-300">{item.label}</div>
                                <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Actions: Call + WhatsApp + Hamburger on Left */}
          <div className="xl:hidden flex items-center gap-1.5 sm:gap-2">
            {/* Quick Call Icon Button */}
            <a
              href="tel:+967782833832"
              className="p-2 sm:p-2.5 rounded-xl bg-navy-900/90 border border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-all shadow-sm active:scale-95"
              title="اتصال سريع بالوكالة"
              aria-label="اتصال سريع"
            >
              <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>

            {/* Quick WhatsApp Icon Button */}
            <a
              href="https://wa.me/967782833832?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white border border-emerald-400/40 hover:from-emerald-500 hover:to-green-500 transition-all shadow-sm active:scale-95"
              title="تواصل مباشر عبر الواتساب"
              aria-label="واتساب مباشر"
            >
              <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-xl bg-navy-900/90 border border-gold-500/40 text-gold-400 hover:text-white transition-all shadow-sm active:scale-95"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة الرئيسية"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay & Sliding Menu via Portal */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="xl:hidden fixed inset-0 z-[9999]" dir="rtl">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Right Sliding Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm sm:max-w-md bg-navy-950 border-l border-gold-500/30 shadow-2xl z-50 flex flex-col justify-between animate-drawer-in overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-900/60">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.png" 
                  alt="وكالة وهبين" 
                  className="h-10 w-auto object-contain filter drop-shadow"
                />
                <div className="text-right">
                  <span className="block text-xs font-heading font-bold text-white">وكالة وهبين للسفريات</span>
                  <span className="block text-[10px] text-gold-400">القائمة الرئيسية</span>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-navy-800 border border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Accordion Navigation (Exactly 5 sections) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {navSections.map((section) => {
                const isExpanded = mobileAccordion === section.id;
                return (
                  <div key={section.id} className="border border-white/10 rounded-2xl overflow-hidden bg-navy-900/40 transition-colors">
                    <button
                      onClick={() => setMobileAccordion(isExpanded ? null : section.id)}
                      className={`w-full flex items-center justify-between p-3.5 text-right font-medium transition-colors ${
                        isExpanded ? 'bg-gold-500/10 text-gold-400' : 'text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="font-heading text-sm font-bold">{section.label}</span>
                      <ChevronDown className={`w-4 h-4 text-gold-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {isExpanded && (
                      <div className="p-2 space-y-1 bg-navy-950/90 border-t border-white/10">
                        {section.items.map((item, idx) => {
                          const IconComp = item.icon;
                          if (item.external) {
                            return (
                              <a
                                key={idx}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-200 hover:text-green-300 hover:bg-green-950/30 transition-colors"
                              >
                                <div className="p-1.5 rounded-lg bg-green-900/40 text-green-400">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <span className="flex-1 font-medium">{item.label}</span>
                                <span className="text-[10px] text-green-400 font-bold bg-green-950/60 px-2 py-0.5 rounded-md border border-green-500/20">واتساب ↗</span>
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={idx}
                              to={item.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-2.5 rounded-xl text-xs text-slate-200 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
                            >
                              <div className="p-1.5 rounded-lg bg-navy-800 text-gold-400">
                                <IconComp className="w-4 h-4" />
                              </div>
                              <div className="flex-1 text-right">
                                <div className="font-semibold text-white">{item.label}</div>
                                {item.desc && <div className="text-[10px] text-slate-400 line-clamp-1">{item.desc}</div>}
                              </div>
                              <span className="text-[10px] text-slate-500">انتقال ›</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer: Quick Action Buttons */}
            <div className="p-4 border-t border-white/10 bg-navy-900/80 space-y-2.5">
              <a 
                href="https://wa.me/967782833832?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D9%88%D9%83%D8%A7%D9%84%D8%A9%20%D9%88%D9%87%D8%A8%D9%8A%D9%86" 
                target="_blank" 
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساب الحجز: 782833832</span>
              </a>

              <a 
                href="tel:+967782833832"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-2xl bg-navy-800 hover:bg-navy-700 border border-gold-500/30 text-gold-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصال مباشر: 782833832</span>
              </a>

              <div className="text-[10px] text-slate-400 text-center pt-1">
                عدن - الممدارة - شارع المنار - بجانب العاطفي للصرافة
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
