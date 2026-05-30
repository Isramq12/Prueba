import React, { useState } from 'react';
import { MessageSquare, Users, Star, ThumbsUp, Send, Trophy, Plus, CheckCircle2 } from 'lucide-react';
import { Review, DiscussionThread, Product } from '../types';

interface CommunitySectionProps {
  products: Product[];
  reviews: Review[];
  discussions: DiscussionThread[];
  onSubmitReview: (productId: string, productName: string, author: string, rating: number, comment: string) => void;
  onSubmitThread: (title: string, author: string, category: 'General' | 'LFG (Looking For Group)' | 'Help' | 'Lore & Spoilers') => void;
}

export default function CommunitySection({
  products,
  reviews,
  discussions,
  onSubmitReview,
  onSubmitThread
}: CommunitySectionProps) {
  const [selectedForumCategory, setSelectedForumCategory] = useState<string>('All');
  
  // Submit thread state
  const [threadTitle, setThreadTitle] = useState('');
  const [threadCat, setThreadCat] = useState<'General' | 'LFG (Looking For Group)' | 'Help' | 'Lore & Spoilers'>('General');
  const [threadUser, setThreadUser] = useState('ApexPredator');
  const [showThreadForm, setShowThreadForm] = useState(false);

  // Submit review state
  const [revGameId, setRevGameId] = useState(products[0]?.id || '');
  const [revRating, setRevRating] = useState(5);
  const [revAuthor, setRevAuthor] = useState('ProGamer99');
  const [revComment, setRevComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Filtered discussions
  const filteredDiscussions = selectedForumCategory === 'All'
    ? discussions
    : discussions.filter(d => d.category === selectedForumCategory);

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (threadTitle.trim()) {
      onSubmitThread(threadTitle.trim(), threadUser, threadCat);
      setThreadTitle('');
      setShowThreadForm(false);
    }
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    const game = products.find(p => p.id === revGameId);
    if (game && revComment.trim()) {
      onSubmitReview(revGameId, game.title, revAuthor, revRating, revComment.trim());
      setRevComment('');
      setShowReviewForm(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="community-hub">
      
      {/* Title */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyber-charcoal to-[#0a0a0f] border border-gray-850 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center space-x-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan p-0.5">
            <div className="h-full w-full bg-cyber-black rounded-[14px] flex items-center justify-center">
              <Users className="h-6 w-6 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider">Nexus Community Lounge</h2>
            <p className="text-xs text-gray-400">Join the discussion, explore reviews, and organize raiding parties</p>
          </div>
        </div>

        {/* Live Lobby user stats indicator */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-cyber-black/75 p-3 rounded-xl border border-gray-800 text-center">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">ACTIVE LOBBIES</span>
            <span className="font-mono text-white text-sm font-black text-brand-cyan animate-pulse">4,210 Online</span>
          </div>
          <div className="bg-cyber-black/75 p-3 rounded-xl border border-gray-800 text-center">
            <span className="text-[10px] font-bold text-gray-505 uppercase block">REVIEWS HOSTED</span>
            <span className="font-mono text-white text-sm font-black text-brand-purple">{reviews.length} Verified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Col span 7): Forums & discussions */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-800">
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-900 mb-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Active Discussions Forums</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Interact with other core players</p>
              </div>

              <button
                onClick={() => setShowThreadForm(!showThreadForm)}
                className="px-3.5 py-2 rounded-lg bg-brand-purple hover:bg-brand-cyan text-white hover:text-cyber-black font-extrabold text-[10px] uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Start Thread</span>
              </button>
            </div>

            {/* Quick Forum categories selector bar */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['All', 'General', 'LFG (Looking For Group)', 'Help', 'Lore & Spoilers'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedForumCategory(category)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-lg border shrink-0 transition-colors cursor-pointer ${
                    selectedForumCategory === category
                      ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan'
                      : 'bg-cyber-black border-gray-850 text-gray-400 hover:text-white'
                  }`}
                >
                  {category === 'LFG (Looking For Group)' ? 'LFG Rooms' : category === 'Lore & Spoilers' ? 'Lore' : category}
                </button>
              ))}
            </div>

            {/* Create Thread Form */}
            {showThreadForm && (
              <form onSubmit={handleCreateThread} className="p-4 rounded-xl bg-cyber-black border border-gray-850 space-y-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-cyan block">Open a New Forum Discussion</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Your Gamertag</label>
                    <input
                      type="text"
                      required
                      value={threadUser}
                      onChange={(e) => setThreadUser(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-1.5 bg-cyber-charcoal border border-gray-800 text-white rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Forum Room Category</label>
                    <select
                      value={threadCat}
                      onChange={(e) => setThreadCat(e.target.value as any)}
                      className="w-full text-xs px-2 py-1.5 bg-cyber-charcoal border border-gray-800 text-white rounded cursor-pointer"
                    >
                      <option value="General">General</option>
                      <option value="Help">Gameplay Help</option>
                      <option value="LFG (Looking For Group)">Looking For Group (LFG)</option>
                      <option value="Lore & Spoilers">Lore & Spoilers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Discussion Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Speedrun momentum trick questions..."
                    value={threadTitle}
                    onChange={(e) => setThreadTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-cyber-charcoal border border-gray-800 text-white rounded focus:border-brand-purple focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button type="button" onClick={() => setShowThreadForm(false)} className="px-3.5 py-1.5 text-[10px] font-bold uppercase text-gray-500 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 bg-brand-cyan text-cyber-black font-extrabold text-[10px] uppercase rounded">Assemble Thread</button>
                </div>
              </form>
            )}

            {/* Forums discussions cards list */}
            <div className="space-y-3" id="discussion-threads">
              {filteredDiscussions.map((d) => (
                <div 
                  key={d.id}
                  className="p-4 rounded-xl bg-cyber-black hover:bg-cyber-gray/40 border border-gray-850 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center space-x-3.5 overflow-hidden">
                    <img src={d.avatar} className="h-8 w-8 rounded-full object-cover border border-gray-800" referrerPolicy="no-referrer" />
                    <div className="overflow-hidden">
                      <span className="text-[9px] font-bold text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.2 rounded uppercase block w-max">
                        {d.category}
                      </span>
                      <h4 className="text-xs font-bold text-white uppercase hover:text-brand-cyan cursor-pointer transition-colors mt-1.5 truncate">
                        {d.title}
                      </h4>
                      <span className="text-[10px] text-gray-500 block">Opened by {d.author} • Active {d.lastActive}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-xs text-gray-400 font-mono shrink-0">
                    <div className="text-center">
                      <span className="text-white block font-bold">{d.replies}</span>
                      <span className="text-[9px] text-gray-500 block uppercase">Replies</span>
                    </div>
                    <div className="text-center">
                      <span className="text-gray-400 block">{d.views}</span>
                      <span className="text-[9px] text-gray-500 block uppercase">Views</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column (Col span 5): Customer Verified reviews */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-800 text-left">
            
            <div className="flex justify-between items-center pb-4 border-b border-gray-950 mb-6">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Verified Customer Critique</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">Real-time buyer ratings</p>
              </div>

              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-2 rounded-lg bg-brand-cyan text-cyber-black hover:bg-brand-purple hover:text-white font-extrabold text-[10px] uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                <span>Write Review</span>
              </button>
            </div>

            {/* Create Review Form */}
            {showReviewForm && (
              <form onSubmit={handleCreateReview} className="p-4 rounded-xl bg-cyber-black border border-gray-850 space-y-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-purple block">Share Your Direct Gaming Experience</span>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Your Alias</label>
                    <input
                      type="text"
                      required
                      value={revAuthor}
                      onChange={(e) => setRevAuthor(e.target.value)}
                      className="w-full text-xs font-mono px-3 py-1.5 bg-cyber-charcoal border border-gray-800 text-white rounded focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Review Rating</label>
                    <select
                      value={revRating}
                      onChange={(e) => setRevRating(Number(e.target.value))}
                      className="w-full text-xs px-2 py-1.5 bg-cyber-charcoal border border-gray-800 text-white rounded cursor-pointer font-bold text-amber-400"
                    >
                      <option value="5">★★★★★ Outstanding</option>
                      <option value="4">★★★★ Very Good</option>
                      <option value="3">★★★ Average</option>
                      <option value="2">★★ Poor</option>
                      <option value="1">★ Terrible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Select Game Target</label>
                  <select
                    value={revGameId}
                    onChange={(e) => setRevGameId(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 bg-cyber-charcoal border border-gray-800 text-white rounded cursor-pointer"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.platform}: {p.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[9px] text-gray-400 uppercase tracking-wider block mb-1">Comments Outline</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide details on game haptics, graphics parameters..."
                    value={revComment}
                    onChange={(e) => setRevComment(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-cyber-charcoal border border-gray-800 text-white rounded focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 justify-end pt-1">
                  <button type="button" onClick={() => setShowReviewForm(false)} className="px-3.5 py-1.5 text-[10px] font-bold uppercase text-gray-500 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 bg-brand-purple text-white font-extrabold text-[10px] uppercase rounded">Publish Score</button>
                </div>
              </form>
            )}

            {/* List Reviews */}
            <div className="space-y-4" id="community-reviews-list">
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="p-4 rounded-xl bg-cyber-black border border-gray-850 space-y-2.5 text-xs text-left"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="h-6 w-6 rounded-full bg-brand-cyan/20 flex items-center justify-center font-bold text-white text-[10px]">
                        {rev.author[0]}
                      </div>
                      <span className="font-bold text-white text-xs">{rev.author}</span>
                      {rev.verified && (
                        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/20 px-1.5 rounded uppercase">Verified Buyer</span>
                      )}
                    </div>

                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'fill-current' : 'text-gray-700'}`} />
                      ))}
                    </div>
                  </div>

                  <span className="text-[10px] text-brand-purple uppercase tracking-tight block">Target: {rev.productName}</span>
                  <p className="text-gray-400 leading-normal">{rev.comment}</p>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 pt-2 border-t border-gray-900 font-mono">
                    <span>Reviewed: {rev.date}</span>
                    <button className="flex items-center space-x-1 hover:text-white transition-colors cursor-pointer">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{rev.likes} Helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
