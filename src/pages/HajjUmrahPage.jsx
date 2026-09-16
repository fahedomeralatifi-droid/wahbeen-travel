import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Moon, Building2, Crown, CalendarCheck, MessageSquare, ShieldCheck, Check } from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { useData } from '../context/DataContext';

export default function HajjUmrahPage() {
  const [searchParams] = useSearchParams();
  const { packages, faqs } = useData();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  const filteredPackages = activeTab === 'all'
    ? packages
    : packages.filter((p) => p.type === activeTab);

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Moon className="w-4 h-4 text-gold-400" />
            <span>لبيك اللهم لبيك</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white">
            باقات <span className="gold-text-gradient">الحج والعمرة</span> وزيارة الحرمين
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            شرف خدمة ضيوف الرحمن أمانة نعتز بحملها. نقدم لكم باقات حج وعمرة متنوعة مدروسة تلبي تطلعات كافة الفئات، مع فنادق صف أول وتنقلات فاخرة ورعاية روحانية وإدارية متكاملة.
          </p>

          {/* Tab Selector */}
          <div className="pt-4">
            <div className="inline-flex items-center p-1.5 rounded-2xl bg-navy-900 border border-gold-500/30 gap-1.5">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                كافة الباقات
              </button>
              <button
                onClick={() => setActiveTab('umrah')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'umrah'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>باقات العمرة</span>
              </button>
              <button
                onClick={() => setActiveTab('hajj')}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                  activeTab === 'hajj'
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>باقات الحج</span>
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        {/* Hajj & Umrah Guarantee Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-right">
          <div className="glass-panel rounded-3xl p-5 border border-gold-500/20 space-y-2">
            <span className="text-xl font-bold text-gold-400 block font-heading">01. السكن</span>
            <h4 className="text-sm font-bold text-white">فنادق صف أول وقريبة</h4>
            <p className="text-xs text-slate-300">أبراج وقف الملك عبد العزيز وساحات الحرم المكي الشريف والمسجد النبوي.</p>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-gold-500/20 space-y-2">
            <span className="text-xl font-bold text-gold-400 block font-heading">02. المواصلات</span>
            <h4 className="text-sm font-bold text-white">أسطول VIP حديث</h4>
            <p className="text-xs text-slate-300">باصات مجهزة بشاشات وتكييف فائق وسيارات فارهة خاصة للعوائل ورجال الأعمال.</p>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-gold-500/20 space-y-2">
            <span className="text-xl font-bold text-gold-400 block font-heading">03. الإرشاد</span>
            <h4 className="text-sm font-bold text-white">كادر ديني وفقهي</h4>
            <p className="text-xs text-slate-300">مرشدون معتمدون لشرح أحكام المناسك والإجابة على الفتاوى ومرافقة المعتمرين.</p>
          </div>

          <div className="glass-panel rounded-3xl p-5 border border-gold-500/20 space-y-2">
            <span className="text-xl font-bold text-gold-400 block font-heading">04. الإعاشة</span>
            <h4 className="text-sm font-bold text-white">بوفيهات مفتوحة</h4>
            <p className="text-xs text-slate-300">وجبات طازجة ومتنوعة ومشروبات ومياه زمزم طوال أيام المناسك والرحلة.</p>
          </div>
        </div>

        {/* Common Hajj/Umrah Questions */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/20 text-right space-y-6">
          <h3 className="text-2xl font-heading font-bold text-white border-b border-white/10 pb-4">
            أسئلة شائعة حول الحج والعمرة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.slice(0, 4).map((faq, idx) => (
              <div key={idx} className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-sm font-bold text-gold-300">{faq.question}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-3">
          <p className="text-xs sm:text-sm text-slate-400">
            ترغب في تصميم باقة عمرة خاصة لك أو لعائلتك بعدد أيام وفنادق محددة؟
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/booking?type=العمرة وزيارة الحرمين"
              className="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm shadow"
            >
              طلب باقة مخصصة
            </Link>
            <a
              href="https://wa.me/967782833832"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm shadow"
            >
              تواصل عبر الواتساب
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
