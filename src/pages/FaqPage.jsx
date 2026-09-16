import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function FaqPage() {
  const { faqs } = useData();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4 text-gold-400" />
            <span>إجابات واضحة وشاملة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            الأسئلة <span className="gold-text-gradient">الشائعة</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            جمعنا لكم أهم الأسئلة المتكررة حول شروط السفر، تأشيرات العمرة والحج، أسعار التذاكر، وضوابط الحجز لدى وكالة وهبين.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-right">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-right hover:bg-white/5 transition-colors"
                >
                  <span className="font-heading font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gold-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-navy-950/60">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Prompt to contact if not found */}
        <div className="glass-panel rounded-3xl p-8 border border-gold-500/30 text-center space-y-4">
          <h3 className="text-xl font-heading font-bold text-white">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            فريق خدمة العملاء متاح للإجابة المباشرة على كافة استفساراتكم عبر الواتساب على مدار الساعة.
          </p>
          <a
            href="https://wa.me/967782833832?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D9%84%D8%AF%D9%8A%20%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D9%84%D9%85%20%D8%A3%D8%AC%D8%AF%D9%87%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A3%D8%B3%D8%A6%D9%84%D8%A9%20%D8%A7%D9%84%D8%B4%D8%A7%D8%A6%D8%B9%D8%A9."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm shadow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>اسأل موظف الحجز عبر الواتساب</span>
          </a>
        </div>

      </div>
    </div>
  );
}
