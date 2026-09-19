import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Search, 
  MessageSquare, 
  Trash2, 
  Edit, 
  Plus, 
  Settings, 
  LogOut, 
  Tag, 
  Moon, 
  Building2, 
  BookOpen, 
  HelpCircle, 
  ShieldAlert, 
  DollarSign, 
  Save, 
  RefreshCw,
  Eye,
  Lock,
  Key
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { 
    bookings, 
    updateBookingStatus, 
    updateBookingNotes, 
    deleteBooking, 
    exportBookingsCSV,
    packages, 
    addPackage, 
    deletePackage,
    offers, 
    addOffer, 
    deleteOffer,
    blogPosts, 
    addBlogPost, 
    deleteBlogPost,
    faqs, 
    addFaq, 
    deleteFaq,
    siteSettings, 
    updateSiteSettings,
    resetToSeeds,
    subscribers
  } = useData();

  const { formatPrice } = useCurrency();

  // Authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('wahbeen_admin_auth') === 'true';
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('wahbeen_admin_auth');
    localStorage.removeItem('wahbeen_admin_user');
    setIsAuthenticated(false);
    navigate('/admin/login');
  };

  // Prevent any flash of dashboard content if unauthenticated
  if (!isAuthenticated) {
    return null;
  }

  // Active Tab
  const [activeTab, setActiveTab] = useState('bookings');

  // Bookings Filter & Search State
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing settings state
  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Admin Credentials & Security State
  const [adminSecurityForm, setAdminSecurityForm] = useState(() => ({
    email: localStorage.getItem('wahbeen_custom_admin_email') || 'admin@wahbeen.com',
    password: localStorage.getItem('wahbeen_custom_admin_password') || 'wahbeen2026'
  }));
  const [securitySaved, setSecuritySaved] = useState(false);

  // New Package Form State
  const [newPkgModal, setNewPkgModal] = useState(false);
  const [pkgForm, setPkgForm] = useState({
    title: '',
    subtitle: '',
    type: 'umrah',
    priceSAR: 2000,
    duration: '10 أيام',
    category: 'عادي',
    makkahHotel: '',
    madinahHotel: '',
    badge: 'جديد'
  });

  // New Offer Form State
  const [newOfferModal, setNewOfferModal] = useState(false);
  const [offerForm, setOfferForm] = useState({
    title: '',
    discount: 'خصم 15%',
    oldPriceSAR: 2000,
    priceSAR: 1700,
    validUntil: '2026-11-30',
    desc: '',
    isSeasonal: true,
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1000&auto=format&fit=crop'
  });

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesQuery = 
      (b.fullName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.phone || '').includes(searchQuery) ||
      (b.id || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.serviceType || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // Stats calculation
  const totalBookings = bookings.length;
  const newCount = bookings.filter((b) => b.status === 'جديد').length;
  const contactedCount = bookings.filter((b) => b.status === 'تم التواصل').length;
  const confirmedCount = bookings.filter((b) => b.status === 'مؤكد').length;
  const cancelledCount = bookings.filter((b) => b.status === 'ملغي').length;

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 4000);
  };

  const handleCreatePackage = (e) => {
    e.preventDefault();
    addPackage({
      ...pkgForm,
      priceSAR: Number(pkgForm.priceSAR),
      features: ['تأشيرة وسكن فاخر', 'نقل حديث ومريح', 'مزارات تاريخية وإشراف']
    });
    setNewPkgModal(false);
  };

  const handleCreateOffer = (e) => {
    e.preventDefault();
    addOffer({
      ...offerForm,
      priceSAR: Number(offerForm.priceSAR),
      oldPriceSAR: Number(offerForm.oldPriceSAR)
    });
    setNewOfferModal(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="pt-24 pb-20 bg-navy-950 min-h-screen text-slate-100 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Control Bar */}
        <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="وكالة وهبين" className="h-12 w-auto" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-heading font-bold text-white">مركز تحكم إدارة وكالة وهبين</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/30">
                  لوحة نشطة
                </span>
              </div>
              <p className="text-xs text-slate-400">
                مرحباً بك، المدير العام (admin@wahbeen.com) • تاريخ اليوم: {new Date().toLocaleDateString('en-GB')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 border border-white/10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>معاينة الموقع</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="glass-panel rounded-2xl p-4 border border-white/10 text-right">
            <span className="text-[11px] text-slate-400 block mb-1">إجمالي طلبات الحجز</span>
            <div className="text-2xl font-bold font-heading text-white">{totalBookings}</div>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-yellow-500/30 bg-yellow-500/5 text-right">
            <span className="text-[11px] text-yellow-400 font-bold block mb-1">طلبات جديدة (بانتظار الرد)</span>
            <div className="text-2xl font-bold font-heading text-yellow-300">{newCount}</div>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-blue-500/30 bg-blue-500/5 text-right">
            <span className="text-[11px] text-blue-400 block mb-1">تم التواصل</span>
            <div className="text-2xl font-bold font-heading text-blue-300">{contactedCount}</div>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-green-500/30 bg-green-500/5 text-right">
            <span className="text-[11px] text-green-400 block mb-1">حجوزات مؤكدة</span>
            <div className="text-2xl font-bold font-heading text-green-300">{confirmedCount}</div>
          </div>

          <div className="glass-panel rounded-2xl p-4 border border-white/10 text-right">
            <span className="text-[11px] text-slate-400 block mb-1">المشتركون بالنشرة</span>
            <div className="text-2xl font-bold font-heading text-gold-400">{subscribers?.length || 0}</div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
          {[
            { id: 'bookings', label: `طلبات الحجز (${newCount > 0 ? `${newCount} جديد` : totalBookings})`, icon: CalendarCheck },
            { id: 'packages', label: `باقات الحج والعمرة (${packages.length})`, icon: Moon },
            { id: 'offers', label: `العروض والبانرات (${offers.length})`, icon: Tag },
            { id: 'content', label: 'المدونة والأسئلة الشائعة', icon: BookOpen },
            { id: 'settings', label: 'إعدادات الوكالة والعملات', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-gold-500 text-navy-950 font-bold shadow'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            
            {/* Action & Filter Toolbar */}
            <div className="glass-panel rounded-2xl p-4 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="بحث بالاسم، الهاتف، رقم الطلب..."
                  className="w-full pr-9 pl-4 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'جديد', label: 'جديد' },
                  { id: 'تم التواصل', label: 'تم التواصل' },
                  { id: 'مؤكد', label: 'مؤكد' },
                  { id: 'ملغي', label: 'ملغي' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                      statusFilter === st.id
                        ? 'bg-white text-navy-950'
                        : 'bg-navy-900 text-slate-300 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* CSV Export Button */}
              <button
                onClick={exportBookingsCSV}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
                title="تصدير جدول الطلبات إلى ملف Excel / CSV"
              >
                <Download className="w-4 h-4" />
                <span>تصدير الطلبات CSV</span>
              </button>

            </div>

            {/* Bookings Table */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-navy-900/90 text-gold-400 font-bold border-b border-white/10">
                    <tr>
                      <th className="p-3.5">رقم الطلب</th>
                      <th className="p-3.5">العميل والهاتف</th>
                      <th className="p-3.5">الخدمة المطلوبة</th>
                      <th className="p-3.5">الوجهة والموعد</th>
                      <th className="p-3.5">المسافرين / الفئة</th>
                      <th className="p-3.5">الحالة</th>
                      <th className="p-3.5">ملاحظات الإدارة</th>
                      <th className="p-3.5 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-slate-400">
                          لا توجد طلبات تطابق هذا البحث أو الفلتر.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-white/5 transition-colors">
                          
                          {/* Request ID & Time */}
                          <td className="p-3.5 font-mono font-bold text-gold-300">
                            <div>{b.id}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{b.createdAt}</div>
                          </td>

                          {/* Customer Name & Phone */}
                          <td className="p-3.5">
                            <div className="font-bold text-white text-sm">{b.fullName}</div>
                            <div className="text-slate-300 font-mono" dir="ltr">{b.phone}</div>
                            {b.email && <div className="text-[10px] text-slate-400">{b.email}</div>}
                          </td>

                          {/* Service Type */}
                          <td className="p-3.5 font-medium text-slate-200">
                            <div>{b.serviceType}</div>
                            {b.details && (
                              <div className="text-[10px] text-slate-400 max-w-[180px] truncate" title={b.details}>
                                {b.details}
                              </div>
                            )}
                          </td>

                          {/* Destination & Date */}
                          <td className="p-3.5 text-slate-300">
                            <div>{b.destination || '-'}</div>
                            <div className="text-[11px] text-gold-400/90">{b.travelDate || '-'}</div>
                          </td>

                          {/* Passengers & Class */}
                          <td className="p-3.5 text-slate-300">
                            <span>{b.passengers} مسافر</span>
                            <span className="block text-[10px] text-slate-400 font-medium">{b.travelClass}</span>
                          </td>

                          {/* Status Dropdown */}
                          <td className="p-3.5">
                            <select
                              value={b.status}
                              onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                                b.status === 'جديد'
                                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                  : b.status === 'تم التواصل'
                                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                  : b.status === 'مؤكد'
                                  ? 'bg-green-500/20 text-green-300 border-green-500/40'
                                  : 'bg-red-500/20 text-red-300 border-red-500/40'
                              }`}
                            >
                              <option value="جديد">جديد</option>
                              <option value="تم التواصل">تم التواصل</option>
                              <option value="مؤكد">مؤكد</option>
                              <option value="ملغي">ملغي</option>
                            </select>
                          </td>

                          {/* Admin Notes */}
                          <td className="p-3.5">
                            <input
                              type="text"
                              defaultValue={b.adminNotes || ''}
                              onBlur={(e) => updateBookingNotes(b.id, e.target.value)}
                              placeholder="أضف ملاحظة..."
                              className="w-36 px-2 py-1 rounded bg-navy-900 border border-white/10 text-xs text-slate-200 focus:border-gold-500 focus:outline-none"
                            />
                          </td>

                          {/* Actions: Direct WhatsApp & Delete */}
                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Direct WhatsApp to Client */}
                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`السلام عليكم ورحمة الله أخي ${b.fullName}،\nمعكم إدارة وكالة وهبين للسفريات بخصوص طلب حجزكم رقم ${b.id} لخدمة (${b.serviceType}).`)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white transition-colors"
                                title="مراسلة العميل عبر الواتساب"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (window.confirm(`هل أنت متأكد من حذف طلب الحجز رقم ${b.id}؟`)) {
                                    deleteBooking(b.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-400 hover:text-white transition-colors"
                                title="حذف الطلب"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PACKAGES MANAGEMENT */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-bold text-white">إدارة باقات الحج والعمرة</h3>
              <button
                onClick={() => setNewPkgModal(true)}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة باقة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3 relative text-right">
                  <span className="text-xs text-gold-400 font-bold">{pkg.category} ({pkg.type === 'hajj' ? 'حج' : 'عمرة'})</span>
                  <h4 className="font-heading font-bold text-white text-base">{pkg.title}</h4>
                  <div className="text-lg font-bold text-gold-300">{formatPrice(pkg.priceSAR)}</div>
                  <div className="text-xs text-slate-400">{pkg.duration}</div>
                  <div className="pt-2 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => {
                        if (window.confirm(`هل أنت متأكد من حذف ${pkg.title}؟`)) {
                          deletePackage(pkg.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف الباقة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for adding package */}
            {newPkgModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4">
                  <h3 className="text-lg font-heading font-bold text-white">إضافة باقة جديدة</h3>
                  <form onSubmit={handleCreatePackage} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">اسم الباقة</label>
                      <input
                        type="text"
                        required
                        value={pkgForm.title}
                        onChange={(e) => setPkgForm({ ...pkgForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="باقة العمرة الرمضانية..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1">النوع</label>
                        <select
                          value={pkgForm.type}
                          onChange={(e) => setPkgForm({ ...pkgForm, type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        >
                          <option value="umrah">عمرة</option>
                          <option value="hajj">حج</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">السعر بالريال السعودي</label>
                        <input
                          type="number"
                          required
                          value={pkgForm.priceSAR}
                          onChange={(e) => setPkgForm({ ...pkgForm, priceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1">المدة</label>
                        <input
                          type="text"
                          value={pkgForm.duration}
                          onChange={(e) => setPkgForm({ ...pkgForm, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">الفئة</label>
                        <input
                          type="text"
                          value={pkgForm.category}
                          onChange={(e) => setPkgForm({ ...pkgForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setNewPkgModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ الباقة
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: OFFERS & BANNERS */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            
            {/* Top Banner Control Box */}
            <div className="glass-panel rounded-2xl p-5 border border-gold-500/30 text-right space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">شريط الإعلان المتحرك في أعلى الموقع</span>
                <label className="flex items-center gap-2 text-xs text-gold-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.bannerActive}
                    onChange={(e) => {
                      const updated = { ...settingsForm, bannerActive: e.target.checked };
                      setSettingsForm(updated);
                      updateSiteSettings(updated);
                    }}
                    className="rounded text-gold-500"
                  />
                  <span>تفعيل الشريط</span>
                </label>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settingsForm.bannerText}
                  onChange={(e) => setSettingsForm({ ...settingsForm, bannerText: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                />
                <button
                  onClick={() => updateSiteSettings(settingsForm)}
                  className="px-4 py-2 bg-gold-500 text-navy-950 text-xs font-bold rounded-xl"
                >
                  حفظ النص
                </button>
              </div>
            </div>

            {/* Offers Cards */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-bold text-white">العروض الترويجية النشطة</h3>
              <button
                onClick={() => setNewOfferModal(true)}
                className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عرض جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2 text-right">
                  <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">{offer.discount}</span>
                  <h4 className="font-heading font-bold text-white text-sm">{offer.title}</h4>
                  <div className="text-base font-bold text-gold-400">{formatPrice(offer.priceSAR)}</div>
                  <div className="pt-2 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => deleteOffer(offer.id)}
                      className="text-red-400 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف العرض</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for adding offer */}
            {newOfferModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4">
                  <h3 className="text-lg font-heading font-bold text-white">إضافة عرض ترويجي</h3>
                  <form onSubmit={handleCreateOffer} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1">عنوان العرض</label>
                      <input
                        type="text"
                        required
                        value={offerForm.title}
                        onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1">نسبة الخصم / الشارة</label>
                        <input
                          type="text"
                          value={offerForm.discount}
                          onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">السعر المخفض (ر.س)</label>
                        <input
                          type="number"
                          value={offerForm.priceSAR}
                          onChange={(e) => setOfferForm({ ...offerForm, priceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1">الوصف</label>
                      <textarea
                        rows="2"
                        value={offerForm.desc}
                        onChange={(e) => setOfferForm({ ...offerForm, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setNewOfferModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ العرض
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 4: BLOG & FAQ */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-right">
            
            {/* Blog Posts */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-2">
                مقالات المدونة ({blogPosts.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-navy-900 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-white text-xs">{post.title}</h5>
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                    </div>
                    <button
                      onClick={() => deleteBlogPost(post.id)}
                      className="text-red-400 hover:text-red-300 text-xs p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="text-lg font-heading font-bold text-white border-b border-white/10 pb-2">
                الأسئلة الشائعة ({faqs.length})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-navy-900 p-3 rounded-xl border border-white/5 flex justify-between items-start gap-2">
                    <div>
                      <h5 className="font-bold text-gold-300 text-xs">{faq.question}</h5>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{faq.answer}</p>
                    </div>
                    <button
                      onClick={() => deleteFaq(idx)}
                      className="text-red-400 hover:text-red-300 text-xs p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: GENERAL SETTINGS & CURRENCIES */}
        {activeTab === 'settings' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 text-right space-y-8 max-w-4xl mx-auto shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">إعدادات الوكالة وأرقام التواصل</h3>
                <p className="text-xs text-slate-400">تعديل العنوان، أرقام الواتساب، وأسعار صرف العملات التقديرية</p>
              </div>
              {settingsSaved && (
                <div className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-300 text-xs font-bold border border-green-500/40 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم حفظ الإعدادات بنجاح</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5">اسم الوكالة بالعربي</label>
                  <input
                    type="text"
                    value={settingsForm.agencyNameAr}
                    onChange={(e) => setSettingsForm({ ...settingsForm, agencyNameAr: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-300 mb-1.5">العنوان الدقيق</label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              {/* WhatsApp Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-green-400 mb-1.5">واتساب الحجز</label>
                  <input
                    type="text"
                    value={settingsForm.bookingWhatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bookingWhatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-xs text-white font-mono text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gold-400 mb-1.5">واتساب المدير</label>
                  <input
                    type="text"
                    value={settingsForm.managerWhatsapp}
                    onChange={(e) => setSettingsForm({ ...settingsForm, managerWhatsapp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-xs text-white font-mono text-right"
                  />
                </div>
              </div>

              {/* Currency Rates Configuration */}
              <div className="p-4 rounded-2xl bg-navy-900/90 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-gold-400 block">أسعار صرف العملات بالنسبة للريال السعودي (الريال السعودي = 1.0):</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1">سعر الدولار الأمريكي (USD)</label>
                    <input
                      type="number"
                      step="0.001"
                      value={settingsForm.currencyRates?.USD?.rate || 0.266}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setSettingsForm({
                          ...settingsForm,
                          currencyRates: {
                            ...settingsForm.currencyRates,
                            USD: { ...settingsForm.currencyRates.USD, rate: val }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">سعر الريال اليمني (YER)</label>
                    <input
                      type="number"
                      step="1"
                      value={settingsForm.currencyRates?.YER?.rate || 420}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setSettingsForm({
                          ...settingsForm,
                          currencyRates: {
                            ...settingsForm.currencyRates,
                            YER: { ...settingsForm.currencyRates.YER, rate: val }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-white/10 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">سعر الدرهم الإماراتي (AED)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={settingsForm.currencyRates?.AED?.rate || 0.98}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setSettingsForm({
                          ...settingsForm,
                          currencyRates: {
                            ...settingsForm.currencyRates,
                            AED: { ...settingsForm.currencyRates.AED, rate: val }
                          }
                        });
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-navy-800 border border-white/10 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Admin Security & Password Settings Card */}
              <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-500/30 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 text-gold-400 border-b border-white/10 pb-3">
                  <Lock className="w-4 h-4" />
                  <h3 className="font-heading font-bold text-sm text-white">بيانات الدخول وكلمة المرور للوحة التحكم</h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  يمكنك من هنا تخصيص البريد الإلكتروني وكلمة المرور الخاصة بدخولك إلى لوحة التحكم لضمان أعلى درجات الأمان:
                </p>

                {securitySaved && (
                  <div className="p-3 rounded-xl bg-green-950/80 border border-green-500/50 text-green-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تم تحديث بيانات الدخول وكلمة المرور بنجاح!</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">البريد الإلكتروني للدخول</label>
                    <input
                      type="email"
                      value={adminSecurityForm.email}
                      onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, email: e.target.value })}
                      placeholder="admin@wahbeen.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white font-mono text-left"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1.5 font-bold">كلمة المرور الجديدة</label>
                    <input
                      type="text"
                      value={adminSecurityForm.password}
                      onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, password: e.target.value })}
                      placeholder="كلمة مرور قوية"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-800 border border-white/10 text-white font-mono text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={() => {
                      if (!adminSecurityForm.email.trim() || !adminSecurityForm.password.trim()) {
                        alert('يرجى كتابة البريد الإلكتروني وكلمة المرور');
                        return;
                      }
                      localStorage.setItem('wahbeen_custom_admin_email', adminSecurityForm.email.trim());
                      localStorage.setItem('wahbeen_custom_admin_password', adminSecurityForm.password.trim());
                      setSecuritySaved(true);
                      setTimeout(() => setSecuritySaved(false), 4000);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-2 shadow transition-all"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>حفظ بيانات الدخول الجديدة</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات في النظام</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('هل تريد استعادة البيانات الافتراضية للنظام بالكامل؟')) {
                      resetToSeeds();
                      setSettingsForm(siteSettings);
                      alert('تمت استعادة البيانات الافتراضية بنجاح.');
                    }
                  }}
                  className="text-xs text-slate-400 hover:text-red-400 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>استعادة البيانات الافتراضية</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
