import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Send, CheckCircle2, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function CareersPage() {
  const { jobs } = useData();
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    experience: '',
    jobTitle: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <Briefcase className="w-4 h-4 text-gold-400" />
            <span>انضم إلى فريقنا المتميز</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            الوظائف <span className="gold-text-gradient">المتاحة</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            تبحث عن بيئة عمل محفزة وتطوير مهني مستمر؟ نرحب بالكفاءات الشابة والمحترفة في قطاع السياحة والسفر والحج والعمرة في فرعنا بالعاصمة عدن.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4 text-right">
          {jobs.map((job) => (
            <div 
              key={job.id}
              className="glass-panel rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 font-bold border border-gold-500/30">
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                  </span>
                  <span>•</span>
                  <span>{job.department}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-white">
                  {job.title}
                </h3>
                
                <p className="text-xs text-slate-300">
                  {job.desc}
                </p>

                <div className="text-[11px] text-gold-400/90 font-medium">
                  <strong>الخبرة المطلوبة:</strong> {job.experience}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setFormData({ ...formData, jobTitle: job.title });
                    window.scrollTo({ top: 500, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold shadow transition-colors whitespace-nowrap"
                >
                  التقديم على الوظيفة
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 text-right space-y-6 shadow-2xl">
          <h2 className="text-2xl font-heading font-bold text-white border-b border-white/10 pb-3">
            استمارة التقديم {selectedJob ? `لوظيفة: ${selectedJob.title}` : 'العام'}
          </h2>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-green-950/60 border border-green-500/40 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
              <h3 className="text-xl font-heading font-bold text-white">تم استلام طلب التقديم بنجاح</h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                شكراً لاهتمامك بالانضمام إلى وكالة وهبين. سيقوم قسم الموارد البشرية بمراجعة سيرتك الذاتية والتواصل معك في حال مطابقة الشروط.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الثلاثي أو الرباعي</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="الاسم الكامل..."
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">رقم الجوال / الواتساب</label>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+967 780000000"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white font-mono text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الوظيفة المراد التقديم عليها</label>
                  <input
                    type="text"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="مثال: مسؤول حجوزات، تسويق، استقبال..."
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">نبذة عن خبراتك ومؤهلاتك (أو رابط السيرة الذاتية CV)</label>
                <textarea
                  rows="3"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="سنوات الخبرة، الأنظمة التي تجيدها (مثل أماديوس، سيبر)، اللغات، أو رابط ملفك..."
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/10 focus:border-gold-500 focus:outline-none text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-heading font-bold text-sm shadow flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب التوظيف</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
