import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Shield, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة.');
      return;
    }

    setLoading(true);

    // Retrieve any custom credentials set by the admin in settings
    const storedEmail = (localStorage.getItem('wahbeen_custom_admin_email') || '').toLowerCase();
    const storedPass = localStorage.getItem('wahbeen_custom_admin_password') || '';

    // Verify credentials
    const isCustomMatch = storedEmail && storedPass && cleanEmail === storedEmail && cleanPass === storedPass;
    const isMasterMatch = (
      (cleanEmail === 'admin@wahbeen.com' || cleanEmail === 'manager@wahbeen.com' || cleanEmail === 'wahbeen@agency.com') && 
      (cleanPass === 'wahbeen2026' || cleanPass === 'admin123')
    );

    if (isCustomMatch || isMasterMatch) {
      localStorage.setItem('wahbeen_admin_auth', 'true');
      localStorage.setItem('wahbeen_admin_user', cleanEmail);
      navigate('/admin');
    } else {
      setError('بيانات الدخول غير صحيحة. لا يمكن الوصول إلى لوحة التحكم إلا بعد إدخال البريد وكلمة السر الصحيحة.');
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen islamic-pattern flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8 space-y-3">
          <Link to="/" className="inline-block hover:scale-105 transition-transform">
            <img src="/logo.png" alt="وكالة وهبين للسفريات والسياحة" className="h-16 w-auto mx-auto filter drop-shadow-lg" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 text-gold-400 text-xs font-bold border border-gold-500/30 shadow-inner">
            <Lock className="w-3.5 h-3.5 text-gold-400" />
            <span>بوابة الإدارة المركزية والتحكم</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
            تسجيل دخول لوحة التحكم
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
            منطقة محمية ومشفرة مخصصة لإدارة الحجوزات والبرامج والأسعار
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl text-right backdrop-blur-xl bg-navy-950/80">
          
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-start gap-2.5 shadow-lg animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gold-400" />
                <span>البريد الإلكتروني للإدارة</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@wahbeen.com"
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-xs text-white placeholder:text-slate-500 transition-all font-mono"
                dir="ltr"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>كلمة المرور</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-900/90 border border-white/15 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 focus:outline-none text-xs text-white placeholder:text-slate-500 transition-all font-mono"
                  dir="ltr"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold-400 transition-colors"
                  aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-navy-950 font-heading font-extrabold text-sm shadow-lg shadow-gold-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
            >
              <Shield className="w-4 h-4 text-navy-950" />
              <span>{loading ? 'جاري التحقق...' : 'دخول لوحة التحكم'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-gold-400 flex items-center justify-center gap-1.5 transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة إلى الصفحة الرئيسية للموقع</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
