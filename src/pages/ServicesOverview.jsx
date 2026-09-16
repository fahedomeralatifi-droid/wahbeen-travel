import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CalendarCheck, MessageSquare } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { useData } from '../context/DataContext';

export default function ServicesOverview() {
  const { services } = useData();

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>خدماتنا المتكاملة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">
            خدمات <span className="gold-text-gradient">وكالة وهبين</span> للسفريات والسياحة
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            نضع بين يديك تشكيلة واسعة وشاملة من أرقى خدمات السفر والسياحة وخدمات ضيوف الرحمن لضمان رحلة مريحة وآمنة تنبض بالفخامة والاطمئنان.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/30 text-center space-y-4">
          <h3 className="text-2xl font-heading font-bold text-white">
            هل تحتاج لخدمة مخصصة أو استشارة سفر؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            مستشارو السفر في وكالة وهبين جاهزون لتصميم خطة رحلتك وحجز التذاكر والفنادق بالأسعار التي تناسبك تماماً.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/booking"
              className="px-6 py-3 rounded-2xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-heading font-bold text-sm shadow transition-colors flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>إرسال طلب حجز مباشر</span>
            </Link>

            <a
              href="https://wa.me/967782833832"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-heading font-bold text-sm shadow transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب الحجز</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
