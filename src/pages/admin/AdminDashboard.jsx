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
  Key,
  MapPin,
  Plane,
  FileCheck,
  ShieldCheck,
  HeartHandshake,
  Award,
  Sparkles,
  X,
  Check
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
    updatePackage,
    deletePackage,
    offers, 
    addOffer, 
    updateOffer,
    deleteOffer,
    blogPosts, 
    addBlogPost, 
    updateBlogPost,
    deleteBlogPost,
    faqs, 
    addFaq, 
    updateFaq,
    deleteFaq,
    destinations,
    addDestination,
    updateDestination,
    deleteDestination,
    services,
    addService,
    updateService,
    deleteService,
    whyChooseUs,
    addWhyChooseUs,
    updateWhyChooseUs,
    deleteWhyChooseUs,
    statistics,
    updateStatistic,
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

  // --- Packages Modals & Forms ---
  const [newPkgModal, setNewPkgModal] = useState(false);
  const [editingPkg, setEditingPkg] = useState(null);
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

  // --- Offers Modals & Forms ---
  const [newOfferModal, setNewOfferModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
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

  // --- Destinations Modals & Forms (وجهات سياحية ساحرة) ---
  const [newDestModal, setNewDestModal] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [destForm, setDestForm] = useState({
    name: '',
    country: '',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    startingPriceSAR: 2000,
    desc: '',
    attractions: '',
    isHajjUmrah: false
  });

  // --- Services Modals & Forms (خدمات سفر راقية) ---
  const [newServiceModal, setNewServiceModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    subtitle: '',
    icon: 'Plane',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop',
    shortDesc: '',
    fullDesc: '',
    features: ''
  });

  // --- Why Choose Us Modals & Forms (لماذا يختار المسافرون وكالة وهبين؟) ---
  const [newWhyModal, setNewWhyModal] = useState(false);
  const [editingWhy, setEditingWhy] = useState(null);
  const [whyForm, setWhyForm] = useState({
    title: '',
    description: '',
    icon: 'ShieldCheck'
  });

  // --- Blog & FAQ Modals & Forms ---
  const [newBlogModal, setNewBlogModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    category: 'نصائح سفر',
    date: new Date().toISOString().split('T')[0],
    readTime: '4 دقائق',
    excerpt: '',
    content: '',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
  });

  const [newFaqModal, setNewFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null); // { index, question, answer }
  const [faqForm, setFaqForm] = useState({
    q: '',
    a: '',
    category: 'عام'
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

  // --- Package Update ---
  const handleUpdatePackage = (e) => {
    e.preventDefault();
    if (!editingPkg) return;
    updatePackage(editingPkg.id, {
      ...editingPkg,
      priceSAR: Number(editingPkg.priceSAR)
    });
    setEditingPkg(null);
  };

  // --- Offer Update ---
  const handleUpdateOffer = (e) => {
    e.preventDefault();
    if (!editingOffer) return;
    updateOffer(editingOffer.id, {
      ...editingOffer,
      priceSAR: Number(editingOffer.priceSAR),
      oldPriceSAR: Number(editingOffer.oldPriceSAR)
    });
    setEditingOffer(null);
  };

  // --- Destination Handlers (وجهات سياحية ساحرة) ---
  const handleCreateDestination = (e) => {
    e.preventDefault();
    const attractionsArray = typeof destForm.attractions === 'string'
      ? destForm.attractions.split(',').map(s => s.trim()).filter(Boolean)
      : destForm.attractions;

    addDestination({
      ...destForm,
      startingPriceSAR: Number(destForm.startingPriceSAR),
      attractions: attractionsArray.length > 0 ? attractionsArray : ['معالم سياحية بارزة', 'جولات ترفيهية']
    });
    setNewDestModal(false);
    setDestForm({
      name: '',
      country: '',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
      startingPriceSAR: 2000,
      desc: '',
      attractions: '',
      isHajjUmrah: false
    });
  };

  const handleUpdateDestination = (e) => {
    e.preventDefault();
    if (!editingDest) return;
    const attractionsArray = typeof editingDest.attractions === 'string'
      ? editingDest.attractions.split(',').map(s => s.trim()).filter(Boolean)
      : editingDest.attractions;

    updateDestination(editingDest.id, {
      ...editingDest,
      startingPriceSAR: Number(editingDest.startingPriceSAR),
      attractions: attractionsArray
    });
    setEditingDest(null);
  };

  // --- Service Handlers (خدمات سفر راقية) ---
  const handleCreateService = (e) => {
    e.preventDefault();
    const featuresArray = typeof serviceForm.features === 'string'
      ? serviceForm.features.split(',').map(s => s.trim()).filter(Boolean)
      : serviceForm.features;

    addService({
      ...serviceForm,
      features: featuresArray.length > 0 ? featuresArray : ['خدمة متميزة وسريعة', 'أسعار تنافسية', 'دعم على مدار الساعة']
    });
    setNewServiceModal(false);
    setServiceForm({
      title: '',
      subtitle: '',
      icon: 'Plane',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop',
      shortDesc: '',
      fullDesc: '',
      features: ''
    });
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    if (!editingService) return;
    const featuresArray = typeof editingService.features === 'string'
      ? editingService.features.split(',').map(s => s.trim()).filter(Boolean)
      : editingService.features;

    updateService(editingService.id, {
      ...editingService,
      features: featuresArray
    });
    setEditingService(null);
  };

  // --- Why Choose Us Handlers (لماذا يختار المسافرون وكالة وهبين؟) ---
  const handleCreateWhy = (e) => {
    e.preventDefault();
    addWhyChooseUs(whyForm);
    setNewWhyModal(false);
    setWhyForm({ title: '', description: '', icon: 'ShieldCheck' });
  };

  const handleUpdateWhy = (e) => {
    e.preventDefault();
    if (!editingWhy) return;
    updateWhyChooseUs(editingWhy.id, editingWhy);
    setEditingWhy(null);
  };

  // --- Blog & FAQ Handlers ---
  const handleCreateBlog = (e) => {
    e.preventDefault();
    addBlogPost(blogForm);
    setNewBlogModal(false);
    setBlogForm({
      title: '',
      category: 'نصائح سفر',
      date: new Date().toISOString().split('T')[0],
      readTime: '4 دقائق',
      excerpt: '',
      content: '',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop'
    });
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    if (!editingBlog) return;
    updateBlogPost(editingBlog.id, editingBlog);
    setEditingBlog(null);
  };

  const handleCreateFaq = (e) => {
    e.preventDefault();
    addFaq(faqForm);
    setNewFaqModal(false);
    setFaqForm({ q: '', a: '', category: 'عام' });
  };

  const handleUpdateFaq = (e) => {
    e.preventDefault();
    if (!editingFaq) return;
    updateFaq(editingFaq.index, { q: editingFaq.q, a: editingFaq.a, category: editingFaq.category || 'عام' });
    setEditingFaq(null);
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
            { id: 'destinations', label: `الوجهات السياحية (${destinations?.length || 0})`, icon: MapPin },
            { id: 'services', label: `خدمات السفر (${services?.length || 0})`, icon: Plane },
            { id: 'features_stats', label: 'لماذا وهبين والإحصائيات', icon: Award },
            { id: 'packages', label: `باقات الحج والعمرة (${packages.length})`, icon: Moon },
            { id: 'offers', label: `العروض والبانرات (${offers.length})`, icon: Tag },
            { id: 'content', label: 'المدونة والأسئلة الشائعة', icon: BookOpen },
            { id: 'settings', label: 'إعدادات الوكالة والأمان', icon: Settings },
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

        {/* TAB: DESTINATIONS MANAGEMENT (وجهات سياحية ساحرة) */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold-400" />
                  <span>إدارة الوجهات السياحية (وجهات سياحية ساحرة)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  تحكم كامل بكافة الوجهات المعروضة في الموقع، الأسعار، الصور، والمعالم السياحية
                </p>
              </div>
              <button
                onClick={() => setNewDestModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة وجهة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((dest) => (
                <div key={dest.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/40 transition-all text-right group flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold">
                        <MapPin className="w-3 h-3 text-gold-400" />
                        <span>{dest.country}</span>
                      </div>
                      {dest.isHajjUmrah && (
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-gold-500 text-navy-950 text-[10px] font-bold">
                          حج وعمرة
                        </div>
                      )}
                      <div className="absolute bottom-2 right-3">
                        <h4 className="text-base font-heading font-bold text-white drop-shadow">
                          {dest.name}
                        </h4>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">سعر البداية:</span>
                        <span className="font-bold text-gold-400 font-mono text-sm">{formatPrice(dest.startingPriceSAR)}</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {dest.desc}
                      </p>

                      {/* Attractions Tags */}
                      {dest.attractions && dest.attractions.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {dest.attractions.slice(0, 3).map((att, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-navy-900 border border-white/5 text-[10px] text-slate-400">
                              {att}
                            </span>
                          ))}
                          {dest.attractions.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-navy-900 text-[10px] text-gold-400">
                              +{dest.attractions.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (window.confirm(`هل أنت متأكد من حذف وجهة (${dest.name})؟`)) {
                          deleteDestination(dest.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف الوجهة</span>
                    </button>

                    <button
                      onClick={() => setEditingDest(dest)}
                      className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 font-bold transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل الوجهة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add Destination */}
            {newDestModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-gold-400" />
                      <span>إضافة وجهة سياحية جديدة</span>
                    </h3>
                    <button onClick={() => setNewDestModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateDestination} className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">اسم الوجهة / المدينة</label>
                        <input
                          type="text"
                          required
                          value={destForm.name}
                          onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                          placeholder="مثال: جزيرة سقطرى"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">الدولة</label>
                        <input
                          type="text"
                          required
                          value={destForm.country}
                          onChange={(e) => setDestForm({ ...destForm, country: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                          placeholder="مثال: اليمن"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">السعر يبدأ من (ر.س)</label>
                        <input
                          type="number"
                          required
                          value={destForm.startingPriceSAR}
                          onChange={(e) => setDestForm({ ...destForm, startingPriceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={destForm.isHajjUmrah}
                            onChange={(e) => setDestForm({ ...destForm, isHajjUmrah: e.target.checked })}
                            className="rounded text-gold-500"
                          />
                          <span>وجهة حج وعمرة دينية</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">رابط صورة الوجهة (URL)</label>
                      <input
                        type="url"
                        value={destForm.image}
                        onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        placeholder="https://..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">وصف الوجهة</label>
                      <textarea
                        rows="3"
                        required
                        value={destForm.desc}
                        onChange={(e) => setDestForm({ ...destForm, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="وصف جذاب عن معالم وتجربة السياحة في هذه الوجهة..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">أبرز المعالم والأنشطة (مفصولة بفاصلة ,)</label>
                      <input
                        type="text"
                        value={destForm.attractions}
                        onChange={(e) => setDestForm({ ...destForm, attractions: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="شواطئ ساحرة, معالم أثرية, تسوق فاخر"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewDestModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300 hover:bg-navy-800"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 shadow"
                      >
                        حفظ ونشر الوجهة
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Destination */}
            {editingDest && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل بيانات الوجهة: {editingDest.name}</span>
                    </h3>
                    <button onClick={() => setEditingDest(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateDestination} className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">اسم الوجهة / المدينة</label>
                        <input
                          type="text"
                          required
                          value={editingDest.name}
                          onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">الدولة</label>
                        <input
                          type="text"
                          required
                          value={editingDest.country}
                          onChange={(e) => setEditingDest({ ...editingDest, country: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">السعر يبدأ من (ر.س)</label>
                        <input
                          type="number"
                          required
                          value={editingDest.startingPriceSAR}
                          onChange={(e) => setEditingDest({ ...editingDest, startingPriceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-6">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(editingDest.isHajjUmrah)}
                            onChange={(e) => setEditingDest({ ...editingDest, isHajjUmrah: e.target.checked })}
                            className="rounded text-gold-500"
                          />
                          <span>وجهة حج وعمرة دينية</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">رابط الصورة (URL)</label>
                      <input
                        type="url"
                        value={editingDest.image}
                        onChange={(e) => setEditingDest({ ...editingDest, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف</label>
                      <textarea
                        rows="3"
                        required
                        value={editingDest.desc}
                        onChange={(e) => setEditingDest({ ...editingDest, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">المعالم السياحية (مفصولة بفاصلة ,)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingDest.attractions) ? editingDest.attractions.join(', ') : editingDest.attractions}
                        onChange={(e) => setEditingDest({ ...editingDest, attractions: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingDest(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300 hover:bg-navy-800"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 shadow"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: SERVICES MANAGEMENT (خدمات سفر راقية لكافة احتياجاتك) */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <Plane className="w-5 h-5 text-gold-400" />
                  <span>إدارة خدمات السفر (خدمات سفر راقية لكافة احتياجاتك)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  إمكانية تعديل وحذف وإضافة خدمات الوكالة (طيران، تأشيرات، فنادق، حج وعمرة، VIP)
                </p>
              </div>
              <button
                onClick={() => setNewServiceModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة جديدة</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div key={svc.id} className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-gold-500/40 transition-all text-right flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-navy-900 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                        /{svc.slug}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-heading font-bold text-white text-base">{svc.title}</h4>
                      {svc.subtitle && <div className="text-xs text-gold-400/80 font-medium">{svc.subtitle}</div>}
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {svc.shortDesc}
                    </p>

                    {/* Features list preview */}
                    {svc.features && svc.features.length > 0 && (
                      <div className="space-y-1 pt-1 border-t border-white/5">
                        {svc.features.slice(0, 2).map((feat, idx) => (
                          <div key={idx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (window.confirm(`هل أنت متأكد من حذف خدمة (${svc.title})؟`)) {
                          deleteService(svc.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف الخدمة</span>
                    </button>

                    <button
                      onClick={() => setEditingService(svc)}
                      className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 font-bold transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل الخدمة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add Service */}
            {newServiceModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-gold-400" />
                      <span>إضافة خدمة جديدة</span>
                    </h3>
                    <button onClick={() => setNewServiceModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateService} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">عنوان الخدمة</label>
                      <input
                        type="text"
                        required
                        value={serviceForm.title}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مثال: حجوزات قطار الحرمين السريع"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">العنوان الفرعي / الشعار</label>
                      <input
                        type="text"
                        value={serviceForm.subtitle}
                        onChange={(e) => setServiceForm({ ...serviceForm, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مثال: رحلات سريعة ومريحة بين مكة والمدينة"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">وصف موجز (يظهر في البطاقة الرئيسية)</label>
                      <textarea
                        rows="2"
                        required
                        value={serviceForm.shortDesc}
                        onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="شرح مختصر للخدمة في سطرين..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف الكامل والمفصل</label>
                      <textarea
                        rows="3"
                        value={serviceForm.fullDesc}
                        onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="التفاصيل الكاملة والمميزات التي يحصل عليها العميل..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">مميزات الخدمة (مفصولة بفاصلة ,)</label>
                      <input
                        type="text"
                        value={serviceForm.features}
                        onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="حجز فوري, درجات رجال الأعمال, خدمة 24 ساعة"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewServiceModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300 hover:bg-navy-800"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 shadow"
                      >
                        حفظ الخدمة
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Service */}
            {editingService && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل خدمة: {editingService.title}</span>
                    </h3>
                    <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateService} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">عنوان الخدمة</label>
                      <input
                        type="text"
                        required
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">العنوان الفرعي</label>
                      <input
                        type="text"
                        value={editingService.subtitle || ''}
                        onChange={(e) => setEditingService({ ...editingService, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">وصف موجز للبطاقة</label>
                      <textarea
                        rows="2"
                        required
                        value={editingService.shortDesc}
                        onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف الكامل</label>
                      <textarea
                        rows="3"
                        value={editingService.fullDesc || ''}
                        onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">مميزات الخدمة (مفصولة بفاصلة ,)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingService.features) ? editingService.features.join(', ') : editingService.features}
                        onChange={(e) => setEditingService({ ...editingService, features: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300 hover:bg-navy-800"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold hover:bg-gold-400 shadow"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB: FEATURES & STATISTICS (لماذا يختار المسافرون وكالة وهبين؟ والإحصائيات) */}
        {activeTab === 'features_stats' && (
          <div className="space-y-8 text-right">
            
            {/* Section 1: Statistical Highlights */}
            <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-gold-400">
                  <Award className="w-5 h-5" />
                  <h3 className="font-heading font-bold text-base text-white">إحصائيات وكالة وهبين في الصفحة الرئيسية</h3>
                </div>
                <span className="text-xs text-slate-400">تعديل الأرقام والنسب المئوية المعروضة</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(statistics || []).map((stat) => (
                  <div key={stat.id} className="p-4 rounded-2xl bg-navy-900/90 border border-white/10 space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">الرقم / القيمة (مثل: 15+)</label>
                      <input
                        type="text"
                        defaultValue={stat.value}
                        onBlur={(e) => updateStatistic(stat.id, { value: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-gold-400 font-bold font-mono text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">العنوان الرئيسي</label>
                      <input
                        type="text"
                        defaultValue={stat.label}
                        onBlur={(e) => updateStatistic(stat.id, { label: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-white text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">الوصف الفرعي</label>
                      <input
                        type="text"
                        defaultValue={stat.sublabel}
                        onBlur={(e) => updateStatistic(stat.id, { sublabel: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg bg-navy-800 border border-white/10 text-slate-300 text-[11px]"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 text-left">
                * يتم حفظ التعديلات على الإحصائيات تلقائياً فور تعديل الحقل والضغط في أي مكان.
              </p>
            </div>

            {/* Section 2: Why Choose Wahbeen (معايير التميز والفخامة) */}
            <div className="glass-panel rounded-3xl p-6 border border-gold-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-gold-400">
                  <ShieldCheck className="w-5 h-5" />
                  <h3 className="font-heading font-bold text-base text-white">لماذا يختار المسافرون وكالة وهبين؟ (معايير التميز)</h3>
                </div>
                <button
                  onClick={() => setNewWhyModal(true)}
                  className="px-4 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1.5 shadow self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة بطاقة تميز جديدة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(whyChooseUs || []).map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-navy-900/90 border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-xl bg-navy-950 border border-gold-500/40 flex items-center justify-center text-gold-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={() => {
                          if (window.confirm(`هل تريد حذف (${item.title})؟`)) {
                            deleteWhyChooseUs(item.id);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف</span>
                      </button>

                      <button
                        onClick={() => setEditingWhy(item)}
                        className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 font-bold"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add Why Choose Us */}
            {newWhyModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gold-500/40 text-right space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-base font-heading font-bold text-white">إضافة معيار تميز جديد</h3>
                    <button onClick={() => setNewWhyModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateWhy} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">العنوان</label>
                      <input
                        type="text"
                        required
                        value={whyForm.title}
                        onChange={(e) => setWhyForm({ ...whyForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مثال: أسعار شفافة بدون أي رسوم خفية"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف</label>
                      <textarea
                        rows="3"
                        required
                        value={whyForm.description}
                        onChange={(e) => setWhyForm({ ...whyForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="شرح مفصل للميزة..."
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewWhyModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        إضافة
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Why Choose Us */}
            {editingWhy && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gold-500/40 text-right space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-base font-heading font-bold text-white">تعديل معيار التميز</h3>
                    <button onClick={() => setEditingWhy(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleUpdateWhy} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">العنوان</label>
                      <input
                        type="text"
                        required
                        value={editingWhy.title}
                        onChange={(e) => setEditingWhy({ ...editingWhy, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف</label>
                      <textarea
                        rows="3"
                        required
                        value={editingWhy.description}
                        onChange={(e) => setEditingWhy({ ...editingWhy, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingWhy(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ التعديل
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
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
                    <button
                      onClick={() => setEditingPkg(pkg)}
                      className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 font-bold"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل الباقة</span>
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

            {/* Modal for editing package */}
            {editingPkg && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل باقة: {editingPkg.title}</span>
                    </h3>
                    <button onClick={() => setEditingPkg(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleUpdatePackage} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">اسم الباقة</label>
                      <input
                        type="text"
                        required
                        value={editingPkg.title}
                        onChange={(e) => setEditingPkg({ ...editingPkg, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">النوع</label>
                        <select
                          value={editingPkg.type}
                          onChange={(e) => setEditingPkg({ ...editingPkg, type: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        >
                          <option value="umrah">عمرة</option>
                          <option value="hajj">حج</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">السعر بالريال السعودي</label>
                        <input
                          type="number"
                          required
                          value={editingPkg.priceSAR}
                          onChange={(e) => setEditingPkg({ ...editingPkg, priceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">المدة</label>
                        <input
                          type="text"
                          value={editingPkg.duration || ''}
                          onChange={(e) => setEditingPkg({ ...editingPkg, duration: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">الفئة</label>
                        <input
                          type="text"
                          value={editingPkg.category || ''}
                          onChange={(e) => setEditingPkg({ ...editingPkg, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">فندق مكة المكرمة</label>
                      <input
                        type="text"
                        value={editingPkg.makkahHotel || ''}
                        onChange={(e) => setEditingPkg({ ...editingPkg, makkahHotel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مثال: فندق أبراج مكة أو دار التوحيد"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">فندق المدينة المنورة</label>
                      <input
                        type="text"
                        value={editingPkg.madinahHotel || ''}
                        onChange={(e) => setEditingPkg({ ...editingPkg, madinahHotel: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مثال: أوبروي المدينة أو أنوار المدينة موفنبيك"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingPkg(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ التعديلات
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
                  <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                    <button
                      onClick={() => {
                        if (window.confirm(`هل أنت متأكد من حذف ${offer.title}؟`)) {
                          deleteOffer(offer.id);
                        }
                      }}
                      className="text-red-400 hover:text-red-300 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                    <button
                      onClick={() => setEditingOffer(offer)}
                      className="text-gold-400 hover:text-gold-300 text-xs flex items-center gap-1 font-bold"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>تعديل العرض</span>
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
                      <label className="block text-slate-300 mb-1 font-bold">عنوان العرض</label>
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
                        <label className="block text-slate-300 mb-1 font-bold">نسبة الخصم / الشارة</label>
                        <input
                          type="text"
                          value={offerForm.discount}
                          onChange={(e) => setOfferForm({ ...offerForm, discount: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">السعر المخفض (ر.س)</label>
                        <input
                          type="number"
                          value={offerForm.priceSAR}
                          onChange={(e) => setOfferForm({ ...offerForm, priceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">السعر الأصلي قبل الخصم (ر.س)</label>
                      <input
                        type="number"
                        value={offerForm.oldPriceSAR}
                        onChange={(e) => setOfferForm({ ...offerForm, oldPriceSAR: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف</label>
                      <textarea
                        rows="2"
                        value={offerForm.desc}
                        onChange={(e) => setOfferForm({ ...offerForm, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
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

            {/* Modal for editing offer */}
            {editingOffer && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل العرض: {editingOffer.title}</span>
                    </h3>
                    <button onClick={() => setEditingOffer(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateOffer} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">عنوان العرض</label>
                      <input
                        type="text"
                        required
                        value={editingOffer.title}
                        onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">نسبة الخصم / الشارة</label>
                        <input
                          type="text"
                          value={editingOffer.discount || ''}
                          onChange={(e) => setEditingOffer({ ...editingOffer, discount: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">السعر المخفض (ر.س)</label>
                        <input
                          type="number"
                          value={editingOffer.priceSAR}
                          onChange={(e) => setEditingOffer({ ...editingOffer, priceSAR: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">السعر الأصلي قبل الخصم (ر.س)</label>
                      <input
                        type="number"
                        value={editingOffer.oldPriceSAR || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, oldPriceSAR: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الوصف</label>
                      <textarea
                        rows="2"
                        value={editingOffer.desc || ''}
                        onChange={(e) => setEditingOffer({ ...editingOffer, desc: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingOffer(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ التعديلات
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
          <div className="space-y-6 text-right">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Blog Posts */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h3 className="text-lg font-heading font-bold text-white">
                    مقالات المدونة ({blogPosts.length})
                  </h3>
                  <button
                    onClick={() => setNewBlogModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة مقال</span>
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="bg-navy-900 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <h5 className="font-bold text-white text-xs">{post.title}</h5>
                        <span className="text-[10px] text-slate-400">{post.date} • {post.category || 'نصائح'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingBlog(post)}
                          className="text-gold-400 hover:text-gold-300 text-xs p-1"
                          title="تعديل المقال"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متأكد من حذف مقال "${post.title}"؟`)) {
                              deleteBlogPost(post.id);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-xs p-1"
                          title="حذف المقال"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h3 className="text-lg font-heading font-bold text-white">
                    الأسئلة الشائعة ({faqs.length})
                  </h3>
                  <button
                    onClick={() => setNewFaqModal(true)}
                    className="px-3 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold flex items-center gap-1 shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة سؤال</span>
                  </button>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-navy-900 p-3 rounded-xl border border-white/5 flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h5 className="font-bold text-gold-300 text-xs">{faq.question}</h5>
                        <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{faq.answer}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingFaq({ index: idx, q: faq.question, a: faq.answer, category: faq.category || 'عام' })}
                          className="text-gold-400 hover:text-gold-300 text-xs p-1"
                          title="تعديل السؤال"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
                              deleteFaq(idx);
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-xs p-1"
                          title="حذف السؤال"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal: Add Blog Post */}
            {newBlogModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-gold-400" />
                      <span>إضافة مقال جديد للمدونة</span>
                    </h3>
                    <button onClick={() => setNewBlogModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">عنوان المقال</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="أهم نصائح السفر لحاملي الجواز اليمني..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">التصنيف</label>
                        <input
                          type="text"
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                          placeholder="نصائح سفر / حج وعمرة"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">وقت القراءة</label>
                        <input
                          type="text"
                          value={blogForm.readTime}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                          placeholder="4 دقائق"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">رابط صورة المقال (URL)</label>
                      <input
                        type="url"
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">مقتطف موجز</label>
                      <textarea
                        rows="2"
                        required
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="مقدمة سريعة تظهر في بطاقة المقال..."
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">محتوى المقال الكامل</label>
                      <textarea
                        rows="5"
                        required
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="اكتب المقال بالتفصيل هنا..."
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewBlogModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        نشر المقال
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Blog Post */}
            {editingBlog && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gold-500/40 text-right space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل المقال: {editingBlog.title}</span>
                    </h3>
                    <button onClick={() => setEditingBlog(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateBlog} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">عنوان المقال</label>
                      <input
                        type="text"
                        required
                        value={editingBlog.title}
                        onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">التصنيف</label>
                        <input
                          type="text"
                          value={editingBlog.category || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-bold">وقت القراءة</label>
                        <input
                          type="text"
                          value={editingBlog.readTime || ''}
                          onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">رابط الصورة (URL)</label>
                      <input
                        type="url"
                        value={editingBlog.image || ''}
                        onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">مقتطف موجز</label>
                      <textarea
                        rows="2"
                        required
                        value={editingBlog.excerpt}
                        onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">محتوى المقال الكامل</label>
                      <textarea
                        rows="5"
                        required
                        value={editingBlog.content}
                        onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingBlog(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Add FAQ */}
            {newFaqModal && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gold-500/40 text-right space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-gold-400" />
                      <span>إضافة سؤال شائع جديد</span>
                    </h3>
                    <button onClick={() => setNewFaqModal(false)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">السؤال</label>
                      <input
                        type="text"
                        required
                        value={faqForm.q}
                        onChange={(e) => setFaqForm({ ...faqForm, q: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="ما هي متطلبات استخراج تأشيرة العمرة؟"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الإجابة</label>
                      <textarea
                        rows="4"
                        required
                        value={faqForm.a}
                        onChange={(e) => setFaqForm({ ...faqForm, a: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                        placeholder="شرح الإجابة بالتفصيل..."
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setNewFaqModal(false)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        إضافة السؤال
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit FAQ */}
            {editingFaq && (
              <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-md w-full border border-gold-500/40 text-right space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-base font-heading font-bold text-white flex items-center gap-2">
                      <Edit className="w-4 h-4 text-gold-400" />
                      <span>تعديل السؤال الشائع</span>
                    </h3>
                    <button onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleUpdateFaq} className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">السؤال</label>
                      <input
                        type="text"
                        required
                        value={editingFaq.q}
                        onChange={(e) => setEditingFaq({ ...editingFaq, q: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">الإجابة</label>
                      <textarea
                        rows="4"
                        required
                        value={editingFaq.a}
                        onChange={(e) => setEditingFaq({ ...editingFaq, a: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingFaq(null)}
                        className="px-4 py-2 rounded-xl bg-navy-900 text-slate-300"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-gold-500 text-navy-950 font-bold"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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
