import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <FileText className="w-4 h-4 text-gold-400" />
            <span>الضوابط والسياسات</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            الشروط <span className="gold-text-gradient">والأحكام العامة</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            يرجى قراءة الشروط والضوابط المنظمة لخدمات السفر والحجوزات لدى وكالة وهبين للسفريات والسياحة.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/20 space-y-6 text-xs sm:text-sm text-slate-300 leading-loose">
          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">1. طبيعة الحجز عبر الموقع</h3>
            <p>
              يُعتبر إرسال طلب الحجز من خلال الموقع الإلكتروني بمثابة رغبة مبدئية غير ملزمة مالياً، ولا يُعد الحجز نهائياً ومؤكداً إلا بعد مراجعة موظف الحجوزات والتأكيد الرسمي وسداد قيمة الخدمة عبر الحسابات المعتمدة للوكالة.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">2. الأسعار وتقلبات العملات</h3>
            <p>
              كافة الأسعار المعروضة في الموقع هي أسعار تقديرية تخضع للتحديث المستمر بناءً على مواسم السفر وتوافر المقاعد وتغير أسعار صرف العملات العالمية، ويتم إفادة العميل بالسعر النهائي الصافي قبل الإصدار.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">3. سياسة التعديل والإلغاء</h3>
            <p>
              تخضع شروط إلغاء أو استرجاع أو تعديل تذاكر الطيران وباقات الفنادق للقوانين والسياسات المفروضة من قبل شركات الطيران المعنية وإدارات الفنادق المشغلة، وتبذل الوكالة أقصى جهدها لتيسير الإجراءات وتقليل رسوم التعديل.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">4. وثائق السفر والجوازات</h3>
            <p>
              يتحمل المسافر مسؤولية سريان وصلاحية جواز سفره (لمدة لا تقل عن 6 أشهر) والتأكد من استيفاء شروط الدخول والتطعيمات الصحية المطلوبة للبلد المقصود.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">5. باقات الحج والعمرة</h3>
            <p>
              يلتزم المعتمر أو الحاج بالتعليمات التنظيمية لوزارة الحج والعمرة والجهات الأمنية في المملكة العربية السعودية، والالتزام بمواعيد التفويج والمغادرة المحددة في جدول الرحلة.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
