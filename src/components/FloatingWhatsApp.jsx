import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const whatsappUrl = "https://wa.me/967782833832?text=" + encodeURIComponent("السلام عليكم، أود الاستفسار عن خدمات وحجوزات وكالة وهبين للسفريات والسياحة");

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center font-sans" dir="rtl">
      
      {/* Single Direct Luxury Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-heading font-bold text-xs sm:text-sm border-2 border-emerald-400/60 hover:border-gold-400 shadow-[0_6px_30px_rgba(16,185,129,0.5)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.75)] transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="تواصل مباشر عبر الواتساب"
      >
        {/* Glowing Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-emerald-900" />
          <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gold-400 border-2 border-navy-950 animate-pulse" />
        </div>

        <span className="tracking-wide hidden xs:inline text-xs sm:text-sm">تواصل واتساب</span>
      </a>

    </div>
  );
}
