import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  FileCheck, 
  Moon, 
  Building2, 
  Hotel, 
  Compass, 
  Bus, 
  ShieldCheck, 
  Crown,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';

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

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon] || Plane;

  return (
    <div className="group relative glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Service Image with Dark Navy Gradient Overlay */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent" />
        
        {/* Floating Icon Badge */}
        <div className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-navy-900/90 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-lg group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between text-right">
        <div>
          <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block mb-1">
            {service.subtitle}
          </span>
          <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
            {service.shortDesc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs font-semibold text-gold-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>تفاصيل الخدمة</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>

          <Link
            to={`/booking?service=${encodeURIComponent(service.title)}`}
            className="px-3 py-1.5 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-gold-300 hover:text-navy-950 text-xs font-bold border border-gold-500/30 transition-all flex items-center gap-1.5"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>طلب حجز</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
