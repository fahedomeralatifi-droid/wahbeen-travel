import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ChevronLeft, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function BlogPage() {
  const { blogPosts } = useData();
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="pt-28 pb-20 islamic-pattern min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-gold-400" />
            <span>مدونة وهبين للسياحة والسفر</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white">
            مقالات وإرشادات <span className="gold-text-gradient">السفر والحج والعمرة</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            دليلك الشامل حول مناسك الحج والعمرة، نصائح حجز تذاكر الطيران، متطلبات التأشيرات، وأجمل الوجهات السياحية العالمية.
          </p>
        </div>

        {/* Selected Post Modal / View */}
        {selectedPost ? (
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/30 space-y-6 text-right animate-fadeIn">
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-400 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لكافة المقالات</span>
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold-400" /> {selectedPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-gold-400" /> {selectedPost.readTime}</span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold-400" /> {selectedPost.author}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-heading font-bold text-white">
                {selectedPost.title}
              </h2>
            </div>

            <div className="rounded-2xl overflow-hidden h-72 sm:h-96 w-full border border-white/10">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-invert max-w-none text-slate-200 text-sm sm:text-base leading-loose whitespace-pre-line">
              {selectedPost.content}
            </div>

            <div className="pt-6 border-t border-white/10 text-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-6 py-2.5 rounded-xl bg-navy-900 border border-gold-500/30 text-gold-300 text-xs font-bold hover:bg-gold-500 hover:text-navy-950 transition-colors"
              >
                العودة لقائمة المقالات
              </button>
            </div>
          </div>
        ) : (
          /* Blog Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div 
                key={post.id}
                className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500/60 transition-all flex flex-col justify-between text-right group shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-navy-900/90 text-gold-400 text-[11px] font-bold border border-gold-500/30">
                    {post.readTime}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-white mb-2 group-hover:text-gold-300 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo({ top: 150, behavior: 'smooth' });
                      }}
                      className="text-xs font-bold text-gold-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>قراءة المقال كاملاً</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
