import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialSiteSettings,
  initialServices,
  initialHajjUmrahPackages,
  initialOffers,
  initialDestinations,
  initialPrograms,
  initialBlogPosts,
  initialFaqs,
  initialTestimonials,
  initialPartners,
  initialJobs,
  initialBookings,
  initialWhyChooseUs,
  initialStatistics
} from '../utils/seedData';

const DataContext = createContext();

const STORAGE_KEY = 'wahbeen_agency_store_v1';

export const DataProvider = ({ children }) => {
  // Load data from localStorage or fallback to seeds
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          whyChooseUs: parsed.whyChooseUs || initialWhyChooseUs,
          statistics: parsed.statistics || initialStatistics
        };
      }
    } catch (e) {
      console.error('Error loading stored agency data', e);
    }
    return {
      siteSettings: initialSiteSettings,
      services: initialServices,
      packages: initialHajjUmrahPackages,
      offers: initialOffers,
      destinations: initialDestinations,
      programs: initialPrograms,
      blogPosts: initialBlogPosts,
      faqs: initialFaqs,
      testimonials: initialTestimonials,
      partners: initialPartners,
      jobs: initialJobs,
      bookings: initialBookings,
      whyChooseUs: initialWhyChooseUs,
      statistics: initialStatistics,
      subscribers: [
        { email: 'customer1@example.com', date: '2026-09-10' },
        { email: 'traveler.aden@gmail.com', date: '2026-09-12' }
      ]
    };
  });

  // Save to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving agency data', e);
    }
  }, [data]);

  // Booking Actions
  const addBooking = (bookingInput) => {
    const newId = `REQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newBooking = {
      id: newId,
      createdAt: formattedDate,
      fullName: bookingInput.fullName || '',
      phone: bookingInput.phone || '',
      email: bookingInput.email || '',
      serviceType: bookingInput.serviceType || 'طلب عام',
      destination: bookingInput.destination || '',
      travelDate: bookingInput.travelDate || '',
      passengers: Number(bookingInput.passengers) || 1,
      travelClass: bookingInput.travelClass || 'عادي',
      details: bookingInput.details || '',
      status: 'جديد',
      adminNotes: ''
    };

    setData((prev) => ({
      ...prev,
      bookings: [newBooking, ...prev.bookings]
    }));

    return newBooking;
  };

  const updateBookingStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, status } : b))
    }));
  };

  const updateBookingNotes = (id, adminNotes) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.map((b) => (b.id === id ? { ...b, adminNotes } : b))
    }));
  };

  const deleteBooking = (id) => {
    setData((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.id !== id)
    }));
  };

  // Newsletter Subscription
  const addSubscriber = (email) => {
    if (!email) return false;
    const now = new Date().toISOString().split('T')[0];
    if (data.subscribers.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
      return false; // Already subscribed
    }
    setData((prev) => ({
      ...prev,
      subscribers: [{ email, date: now }, ...prev.subscribers]
    }));
    return true;
  };

  // Settings Update
  const updateSiteSettings = (newSettings) => {
    setData((prev) => ({
      ...prev,
      siteSettings: { ...prev.siteSettings, ...newSettings }
    }));
  };

  // Package Management
  const addPackage = (pkg) => {
    const id = `pkg-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      packages: [{ ...pkg, id }, ...prev.packages]
    }));
  };

  const updatePackage = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      packages: prev.packages.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    }));
  };

  const deletePackage = (id) => {
    setData((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id)
    }));
  };

  // Offer Management
  const addOffer = (offer) => {
    const id = `off-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      offers: [{ ...offer, id }, ...prev.offers]
    }));
  };

  const updateOffer = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      offers: prev.offers.map((o) => (o.id === id ? { ...o, ...updatedFields } : o))
    }));
  };

  const deleteOffer = (id) => {
    setData((prev) => ({
      ...prev,
      offers: prev.offers.filter((o) => o.id !== id)
    }));
  };

  // Blog Management
  const addBlogPost = (post) => {
    const id = `blog-${Date.now()}`;
    const slug = post.slug || `post-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      blogPosts: [{ ...post, id, slug }, ...prev.blogPosts]
    }));
  };

  const updateBlogPost = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((b) => (b.id === id ? { ...b, ...updatedFields } : b))
    }));
  };

  const deleteBlogPost = (id) => {
    setData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((b) => b.id !== id)
    }));
  };

  // FAQ Management
  const addFaq = (faq) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, faq]
    }));
  };

  const updateFaq = (index, updatedFaq) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => (i === index ? { ...f, ...updatedFaq } : f))
    }));
  };

  const deleteFaq = (index) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  // Destination Management (وجهات سياحية ساحرة)
  const addDestination = (dest) => {
    const id = dest.id || `dest-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      destinations: [{ ...dest, id }, ...prev.destinations]
    }));
  };

  const updateDestination = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      destinations: prev.destinations.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    }));
  };

  const deleteDestination = (id) => {
    setData((prev) => ({
      ...prev,
      destinations: prev.destinations.filter((d) => d.id !== id)
    }));
  };

  // Service Management (خدمات سفر راقية)
  const addService = (service) => {
    const id = service.id || `service-${Date.now()}`;
    const slug = service.slug || id;
    setData((prev) => ({
      ...prev,
      services: [{ ...service, id, slug }, ...prev.services]
    }));
  };

  const updateService = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    }));
  };

  const deleteService = (id) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id)
    }));
  };

  // Why Choose Us Management (لماذا يختار المسافرون وكالة وهبين؟)
  const addWhyChooseUs = (item) => {
    const id = item.id || `why-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      whyChooseUs: [...(prev.whyChooseUs || []), { ...item, id }]
    }));
  };

  const updateWhyChooseUs = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      whyChooseUs: (prev.whyChooseUs || []).map((w) => (w.id === id ? { ...w, ...updatedFields } : w))
    }));
  };

  const deleteWhyChooseUs = (id) => {
    setData((prev) => ({
      ...prev,
      whyChooseUs: (prev.whyChooseUs || []).filter((w) => w.id !== id)
    }));
  };

  // Statistics Management (الإحصائيات البارزة)
  const updateStatistic = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      statistics: (prev.statistics || []).map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    }));
  };

  // CSV Export
  const exportBookingsCSV = () => {
    const headers = ['رقم الطلب', 'تاريخ الإنشاء', 'الاسم الكامل', 'الجوال', 'الإيميل', 'الخدمة', 'الوجهة', 'تاريخ السفر', 'المسافرين', 'الفئة', 'الحالة', 'ملاحظات الإدارة'];
    const rows = data.bookings.map((b) => [
      b.id,
      b.createdAt,
      `"${(b.fullName || '').replace(/"/g, '""')}"`,
      b.phone,
      b.email || '',
      `"${(b.serviceType || '').replace(/"/g, '""')}"`,
      `"${(b.destination || '').replace(/"/g, '""')}"`,
      b.travelDate || '',
      b.passengers,
      b.travelClass,
      b.status,
      `"${(b.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `wahbeen_bookings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reset to seeds
  const resetToSeeds = () => {
    setData({
      siteSettings: initialSiteSettings,
      services: initialServices,
      packages: initialHajjUmrahPackages,
      offers: initialOffers,
      destinations: initialDestinations,
      programs: initialPrograms,
      blogPosts: initialBlogPosts,
      faqs: initialFaqs,
      testimonials: initialTestimonials,
      partners: initialPartners,
      jobs: initialJobs,
      bookings: initialBookings,
      whyChooseUs: initialWhyChooseUs,
      statistics: initialStatistics,
      subscribers: [
        { email: 'customer1@example.com', date: '2026-09-10' }
      ]
    });
  };

  // Helper to generate WhatsApp URL for a booking
  const getBookingWhatsAppUrl = (booking, isManager = false) => {
    const phone = isManager ? '967776050007' : '967782833832';
    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله،\nأود المتابعة بخصوص طلب الحجز عبر موقع وكالة وهبين:\n` +
      `📌 رقم الطلب: ${booking.id}\n` +
      `👤 الاسم: ${booking.fullName}\n` +
      `📱 الهاتف: ${booking.phone}\n` +
      `✈️ نوع الخدمة: ${booking.serviceType}\n` +
      `📍 الوجهة: ${booking.destination || 'غير محدد'}\n` +
      `📅 موعد السفر: ${booking.travelDate || 'غير محدد'}\n` +
      `👥 عدد المسافرين: ${booking.passengers}\n` +
      `⭐ الفئة: ${booking.travelClass}\n` +
      (booking.details ? `📝 تفاصيل إضافية: ${booking.details}\n` : '') +
      `شكراً لكم.`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <DataContext.Provider value={{
      ...data,
      addBooking,
      updateBookingStatus,
      updateBookingNotes,
      deleteBooking,
      addSubscriber,
      updateSiteSettings,
      addPackage,
      updatePackage,
      deletePackage,
      addOffer,
      updateOffer,
      deleteOffer,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost,
      addFaq,
      updateFaq,
      deleteFaq,
      addDestination,
      updateDestination,
      deleteDestination,
      addService,
      updateService,
      deleteService,
      addWhyChooseUs,
      updateWhyChooseUs,
      deleteWhyChooseUs,
      updateStatistic,
      exportBookingsCSV,
      resetToSeeds,
      getBookingWhatsAppUrl
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
