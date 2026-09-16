import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function PrivacyPage() {
  const { siteSettings } = useData();

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>حماية وأمان البيانات</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            سياسة <span className="gold-text-gradient">الخصوصية</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            تلتزم وكالة وهبين للسفريات والسياحة بحماية خصوصية وأمان بيانات كافة المسافرين والمعتمرين.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/20 space-y-6 text-xs sm:text-sm text-slate-300 leading-loose">
          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">1. المعلومات التي نجمعها</h3>
            <p>
              نقوم بجمع البيانات الضرورية فقط لإتمام إجراءات الحجز، مثل: الاسم الكامل، رقم الهاتف/الواتساب، البريد الإلكتروني، وتفاصيل السفر المطلوبة (الوجهة، تواريخ الرحلة، وعدد المسافرين).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">2. الغرض من جمع البيانات</h3>
            <p>
              تُستخدم المعلومات حصرياً لأغراض: إصدار تذاكر الطيران، التنسيق مع الفنادق وشركات النقل، تقديم طلبات التأشيرات لدى الجهات الرسمية، والتواصل معكم عبر الواتساب لتأكيد تفاصيل رحلتكم.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">3. أمان وسرية البيانات</h3>
            <p>
              نتخذ كافة التدابير الأمنية والتقنية لضمان عدم تسريب أو بيع بياناتكم لأي طرف خارجي غير معني بتقديم الخدمة المباشرة لرحلتكم.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">4. لا يوجد دفع إلكتروني بالموقع</h3>
            <p>
              موقعنا لا يطلب ولا يخزن أي بيانات بطاقات ائتمانية أو مصرفية على الإطلاق. كافة التعاملات المالية وتأكيدات الحجز تتم عبر القنوات الرسمية المعتمدة للوكالة أو في مقرنا في عدن.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-heading font-bold text-gold-400">5. التواصل والتعديل</h3>
            <p>
              يحق للعميل في أي وقت طلب تعديل أو حذف بيانات الحجز الخاصة به من خلال التواصل مع إدارة الوكالة على الرقم: <span className="font-mono text-gold-400" dir="ltr">+967 776050007</span>.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
