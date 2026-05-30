import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Clock, User, Tag, ChevronRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const categories = ['All', 'Reviews', 'Hardware', 'Guides', 'Gaming News', 'Upcoming Releases', 'Retro Gaming'];

  // Handle dynamic filtering
  const filteredBlogs = useMemo(() => {
    let result = [...blogs];

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter(b => b.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q));
    }

    return result;
  }, [blogs, selectedCategory, searchQuery]);

  if (activeBlog) {
    return (
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12" id="blog-reader-view">
        
        {/* Back control */}
        <button
          onClick={() => setActiveBlog(null)}
          className="flex items-center space-x-2 text-xs font-bold text-gray-400 hover:text-brand-cyan uppercase tracking-wider mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          <span>Return to Strategy Hub</span>
        </button>

        {/* Categories tags & date */}
        <div className="flex items-center space-x-3 text-xs mb-4">
          <span className="px-2.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple font-bold border border-brand-purple/20 uppercase text-[10px]">
            {activeBlog.category}
          </span>
          <span className="text-gray-500 font-mono">{activeBlog.publishedDate}</span>
          <span className="text-gray-500">•</span>
          <span className="text-gray-500 font-mono text-brand-cyan flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{activeBlog.readTime}</span>
          </span>
        </div>

        {/* Main Header */}
        <h1 className="text-2xl md:text-4.5xl font-extrabold tracking-tight text-white leading-normal uppercase mb-6">
          {activeBlog.title}
        </h1>

        {/* Written By author credit */}
        <div className="flex items-center space-x-3 mb-8 p-3 rounded-xl bg-cyber-charcoal border border-gray-850">
          <div className="h-9 w-9 rounded-full bg-brand-cyan/20 border border-brand-cyan/20 flex items-center justify-center font-bold text-white uppercase text-xs">
            {activeBlog.author[0]}
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-light">Witten By Expert:</span>
            <span className="text-xs font-bold text-white">{activeBlog.author}</span>
          </div>
        </div>

        {/* Cover illustration banner */}
        <div className="h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-800 bg-[#07070b] mb-8 relative">
          <img src={activeBlog.coverImage} className="h-full w-full object-cover" />
        </div>

        {/* Full Markdown blog paragraph simulator */}
        <div className="text-gray-300 space-y-6 text-sm font-sans leading-relaxed text-left">
          <p className="text-base text-white font-semibold leading-relaxed">
            {activeBlog.summary}
          </p>
          <p>{activeBlog.content}</p>
          <p>
            In conclusion, tracking speedruns and structural updates represents the absolute core of our daily loyalty news hub initiatives. Stay locked right here in the Nexus Lounge for upcoming releases and discounts on tactical gaming hardware.
          </p>
        </div>

        {/* User Engagement metrics indicators */}
        <div className="mt-12 pt-6 border-t border-gray-900 flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            {activeBlog.tags.map(t => (
              <span key={t} className="text-gray-400 font-mono">#{t}</span>
            ))}
          </div>
          <span>Licensed Strategy Copyright 2026 Nexus</span>
        </div>

      </article>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="strategy-guide-hub">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2.5xl md:text-4xl font-black text-white uppercase tracking-wider flex items-center justify-center space-x-3">
          <BookOpen className="h-6 w-6 text-brand-purple" />
          <span>Nexus Strategy Academy & News Hub</span>
        </h2>
        <p className="text-xs text-gray-400 mt-2">
          Master your layout with official strategy logs, competitive gear teardowns, patch adjustments, and retro collectors guide write-ups.
        </p>

        {/* Integrated search block */}
        <div className="relative w-full max-w-md mx-auto mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search strategy guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-cyber-charcoal border border-gray-800 text-white rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-brand-purple"
          />
        </div>
      </div>

      {/* Category selector row */}
      <div className="flex flex-wrap gap-2 justify-center mb-8" id="blog-category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-cyber-black font-black'
                : 'bg-cyber-gray border border-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid items */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 text-gray-500 text-xs">
          Zero strategy guides found matching search criteria. Try a different query.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
          {filteredBlogs.map((post) => (
            <article 
              key={post.id}
              className="p-3 bg-cyber-charcoal rounded-2xl border border-gray-850 hover:border-gray-700 transition-all shadow-xl flex flex-col h-[420px] group cursor-pointer"
              onClick={() => setActiveBlog(post)}
            >
              
              {/* Cover coverImage */}
              <div className="relative h-44 w-full rounded-xl overflow-hidden bg-cyber-black flex-shrink-0">
                <img src={post.coverImage} alt={post.title} className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/80 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-brand-purple/90 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>

              {/* Text metadata */}
              <div className="flex-1 flex flex-col justify-between pt-4">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-500 mb-1.5 font-mono">
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center text-brand-cyan">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white hover:text-brand-cyan transition-colors uppercase leading-tight line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                {/* Read article link */}
                <div className="pt-3 border-t border-gray-800 mt-3 flex items-center justify-between text-xs font-bold text-gray-400 group-hover:text-brand-cyan transition-all flex-shrink-0 uppercase tracking-wider">
                  <span>Written By: {post.author.split(',')[0]}</span>
                  <span className="flex items-center">
                    <span>Read Article</span>
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </span>
                </div>

              </div>

            </article>
          ))}
        </div>
      )}

    </section>
  );
}
