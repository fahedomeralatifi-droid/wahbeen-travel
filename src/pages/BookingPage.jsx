import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  MapPin,
  Calendar,
  User,
  Mail,
  Users,
  FileText
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const { addBooking, getBookingWhatsAppUrl, siteSettings } = useData();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: searchParams.get('service') || searchParams.get('type') || 'العمرة وزيارة الحرمين',
    destination: searchParams.get('destination') || '',
    travelDate: searchParams.get('date') || '',
    passengers: searchParams.get('passengers') || '1',
    travelClass: searchParams.get('class') || 'عادي',
    details: searchParams.get('package') ? `بخصوص باقة: ${searchParams.get('package')}` : ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  useEffect(() => {
    // If URL query parameters exist, update form
    const serviceParam = searchParams.get('service') || searchParams.get('type');
    const destParam = searchParams.get('destination');
    const pkgParam = searchParams.get('package');
    const classParam = searchParams.get('class');

    setFormData((prev) => ({
      ...prev,
      serviceType: serviceParam || prev.serviceType,
      destination: destParam || prev.destination,
      travelClass: classParam || prev.travelClass,
      details: pkgParam ? `طلب بخصوص باقة: ${pkgParam}` : prev.details
    }));
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const createdBooking = addBooking(formData);
      setSubmittedBooking(createdBooking);
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 600);
  };

  const servicesOptions = [
    'العمرة وزيارة الحرمين',
    'الحج والمشاعر المقدسة',
    'حجوزات طيران',
    'تأشيرات سفر',
    'حجوزات فنادق',
    'برامج سياحية متكاملة',
    'نقل سياحي وخدمات النقل',
    'تأمين سفر دولي',
    'خدمات كبار الشخصيات VIP',
    'طلب واستفسار عام'
  ];

  return (
    <div className="pt-28 pb-20 min-h-screen islamic-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>طلب حجز رسمي بدون دفع إلكتروني</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-3">
            نموذج إرسال <span className="gold-text-gradient">طلب الحجز</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            املأ البيانات التالية لإرسال طلبك مباشرة إلى لوحة إدارة وكالة وهبين. سيتم مراجعة طلبك والتواصل معك فوراً لتأكيد الحجز وتزويدك بكافة التفاصيل.
          </p>
        </div>

        {/* Successful Submission View */}
        {submittedBooking ? (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/40 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold border border-gold-500/30">
                رقم الطلب: {submittedBooking.id}
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                تم استلام طلب حجزك بنجاح!
              </h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                شكراً لاختياركم وكالة وهبين. لقد تم تسجيل طلبك في مركز تحكم الإدارة برقم <strong className="text-gold-400 font-mono">({submittedBooking.id})</strong>.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-navy-900/90 rounded-2xl p-5 max-w-lg mx-auto text-right border border-white/10 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">الاسم:</span>
                <span className="text-white font-bold">{submittedBooking.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">الهاتف / واتساب:</span>
                <span className="text-white font-mono" dir="ltr">{submittedBooking.phone}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-slate-400">الخدمة:</span>
                <span className="text-gold-400 font-bold">{submittedBooking.serviceType}</span>
              </div>
              {submittedBooking.destination && (
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-slate-400">الوجهة:</span>
                  <span className="text-white">{submittedBooking.destination}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">عدد المسافرين / الفئة:</span>
                <span className="text-white">{submittedBooking.passengers} مسافر ({submittedBooking.travelClass})</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button (High Priority Request Requirement) */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <a
                href={getBookingWhatsAppUrl(submittedBooking, false)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-heading font-bold text-base shadow-xl hover:shadow-green-500/40 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5" />
                <span>تحويل مباشر إلى واتساب الحجز</span>
              </a>

              <a
                href={getBookingWhatsAppUrl(submittedBooking, true)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-navy-900 hover:bg-gold-950/60 border border-gold-500/30 text-gold-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>مراسلة واتساب المدير العام</span>
              </a>

              <button
                onClick={() => {
                  setSubmittedBooking(null);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    serviceType: 'العمرة وزيارة الحرمين',
                    destination: '',
                    travelDate: '',
                    passengers: '1',
                    travelClass: 'عادي',
                    details: ''
                  });
                }}
                className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto"
              >
                إرسال طلب حجز آخر
              </button>
            </div>

          </div>
        ) : (
          /* The Interactive Booking Form */
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 shadow-2xl">
            
            {/* Notice Alert */}
            <div className="mb-8 p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3 text-right">
              <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-gold-400 font-bold block mb-0.5">ملاحظة هامة:</strong>
                لا يتطلب إرسال هذا الطلب أي دفع مالي إلكتروني. نقوم بمراجعة كافة التفاصيل والتواصل المباشر معكم عبر الواتساب أو الهاتف لتأكيد السعر النهائي ومواعيد السفر.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              
              {/* Row 1: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-gold-400" />
                    <span>الاسم الكامل <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: عبد الله أحمد باوزير"
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span>رقم الجوال / الواتساب <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+967 780000000"
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm placeholder-slate-500 font-mono transition-colors text-right"
                  />
                </div>

              </div>

              {/* Row 2: Email & Service Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Email (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span>البريد الإلكتروني <span className="text-[11px] text-slate-400 font-normal">(اختياري)</span></span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>نوع الخدمة المطلوبة <span className="text-red-400">*</span></span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm transition-colors"
                  >
                    {servicesOptions.map((opt, idx) => (
                      <option key={idx} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 3: Destination & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Destination */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gold-400" />
                    <span>الوجهة المطلوبة <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="مثال: مكة والمدينة، دبي، القاهرة، إسطنبول..."
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Travel Date */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>تاريخ السفر المتوقع <span className="text-red-400">*</span></span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.travelDate}
                    onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm transition-colors [color-scheme:dark]"
                  />
                </div>

              </div>

              {/* Row 4: Passengers & Travel Class */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Passengers */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-gold-400" />
                    <span>عدد المسافرين</span>
                  </label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm transition-colors"
                  >
                    <option value="1">مسافر واحد (1)</option>
                    <option value="2">مسافران (2)</option>
                    <option value="3">3 مسافرين</option>
                    <option value="4">4 مسافرين</option>
                    <option value="5">5 مسافرين</option>
                    <option value="6+">مجموعة عائلية (6 فما فوق)</option>
                  </select>
                </div>

                {/* Class */}
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>الفئة المرغوبة</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['اقتصادي', 'عادي', 'VIP'].map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setFormData({ ...formData, travelClass: cls })}
                        className={`py-3 rounded-2xl text-xs font-bold border transition-all ${
                          formData.travelClass === cls
                            ? 'bg-gold-500 text-navy-950 border-gold-500 shadow-md'
                            : 'bg-navy-900/80 text-slate-300 border-white/10 hover:border-gold-500/40'
                        }`}
                      >
                        {cls}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Row 5: Additional Details */}
              <div>
                <label className="block text-xs font-bold text-gold-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-gold-400" />
                  <span>تفاصيل وملاحظات إضافية</span>
                </label>
                <textarea
                  rows="3"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="حدد رغباتك مثل: اسم الفندق المفضل، نوع الغرفة، طيران محدد، أو أي متطلبات خاصة..."
                  className="w-full px-4 py-3 rounded-2xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:outline-none text-white text-sm placeholder-slate-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-base sm:text-lg shadow-xl hover:shadow-gold-glow flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري إرسال طلبك...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال طلب الحجز</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Prompt */}
              <div className="text-center pt-2">
                <span className="text-xs text-slate-400">
                  أو يمكنك التواصل مباشرة عبر أرقام الواتساب:
                </span>
                <div className="flex items-center justify-center gap-4 mt-2">
                  <a
                    href="https://wa.me/967782833832"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>موظف الحجز: 782833832</span>
                  </a>
                  <span className="text-slate-600">•</span>
                  <a
                    href="https://wa.me/967776050007"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>المدير: 776050007</span>
                  </a>
                </div>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
