import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, Shield, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@wahbeen.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Verify manager credentials
    if ((email === 'admin@wahbeen.com' || email === 'manager@wahbeen.com') && (password === 'admin123' || password === 'wahbeen2026')) {
      localStorage.setItem('wahbeen_admin_auth', 'true');
      localStorage.setItem('wahbeen_admin_user', email);
      navigate('/admin');
    } else {
      setError('بيانات الدخول غير صحيحة. يرجى التحقق من البريد أو كلمة السر.');
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen islamic-pattern flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8 space-y-2">
          <Link to="/" className="inline-block">
            <img src="/logo.png" alt="وكالة وهبين" className="h-16 w-auto mx-auto" />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/15 text-gold-400 text-xs font-bold border border-gold-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>بوابة الإدارة المركزية (خاص بالمدير)</span>
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">
            تسجيل دخول الإدارة
          </h1>
          <p className="text-xs text-slate-400">
            هذه الصفحة مخصصة لمدير وكالة وهبين لإدارة الحجوزات والمحتوى
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-gold-500/30 shadow-2xl text-right">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
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
                placeholder="admin@wahbeen.com"
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/15 focus:border-gold-500 focus:outline-none text-xs text-white"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gold-400" />
                <span>كلمة المرور</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl bg-navy-900 border border-white/15 focus:border-gold-500 focus:outline-none text-xs text-white"
                dir="ltr"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-navy-900/80 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
              <span className="text-gold-400 font-bold block mb-0.5">بيانات الدخول الافتراضية للمعاينة:</span>
              <span>البريد: <code className="text-white font-mono">admin@wahbeen.com</code></span> | 
              <span className="mr-1">كلمة المرور: <code className="text-white font-mono">admin123</code></span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-heading font-bold text-sm shadow flex items-center justify-center gap-2 transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>دخول لوحة التحكم</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <Link to="/" className="text-xs text-slate-400 hover:text-gold-400 flex items-center justify-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للموقع الرئيسي</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
