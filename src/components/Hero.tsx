import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Gamepad2, Sparkles, Flame, Clock, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBrowseDeals: () => void;
  onBrowsePreorders: () => void;
}

export default function Hero({ products, onSelectProduct, onBrowseDeals, onBrowsePreorders }: HeroProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // We choose 3 distinct top titles to cycle
  const heroGames = products.filter(p => p.id === '1' || p.id === '2' || p.id === '9');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroGames.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroGames.length]);

  // Live countdown state for pre-order titles (e.g. June 30, 2026)
  const [countdown, setCountdown] = useState({ days: 30, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  if (heroGames.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#050508] border-b border-white/5 pb-12 pt-6 lg:py-20" id="homepage-hero">
      
      {/* Background visual element */}
      <div className="absolute inset-0 gaming-grid opacity-30 pointer-events-none"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-[600px] h-96 rounded-full bg-brand-purple/15 blur-[150px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Slides Container */}
        <div className="relative min-h-[480px] lg:min-h-[520px] rounded-[32px] overflow-hidden bg-[#0a0a0f] border border-white/10 shadow-2xl">
          {heroGames.map((game, index) => {
            const isSelected = index === activeSlide;
            return (
              <div
                key={game.id}
                className={`absolute inset-0 flex flex-col lg:flex-row items-center justify-between transition-all duration-1000 ease-in-out ${
                  isSelected ? 'opacity-100 translate-x-0 scale-100 pointer-events-auto' : 'opacity-0 translate-x-16 scale-[0.98] pointer-events-none'
                }`}
              >
                {/* Visual Image Banner with Glowing Overlay */}
                <div className="relative w-full lg:w-1/2 h-64 lg:h-full overflow-hidden self-stretch group/banner">
                  <img
                    src={game.image}
                    alt={game.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-top transition duration-1000 group-hover/banner:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0e0e16]/20 to-[#0e0e16]"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/20 to-transparent lg:hidden"></div>
                  
                  {/* Neon badging */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {game.isPreOrder ? (
                      <span className="flex items-center space-x-1 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-red-600 rounded-sm animate-pulse shadow-lg shadow-red-600/45">
                        <Flame className="h-3.5 w-3.5" />
                        <span>PRE-ORDER LIVE</span>
                      </span>
                    ) : game.isDeal ? (
                      <span className="flex items-center space-x-1 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#050508] bg-brand-cyan rounded-sm shadow-lg shadow-brand-cyan/35">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>FLASH SALE</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white bg-brand-purple rounded-sm shadow-lg shadow-brand-purple/35">
                        <Gamepad2 className="h-3.5 w-3.5" />
                        <span>FEATURED RELEASE</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Game Title and Details */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-8 lg:p-12 relative">
                  
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-brand-cyan tracking-widest uppercase mb-3">
                    <span>{game.platform}</span>
                    <span>•</span>
                    <span>{game.genre}</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-white mb-4 leading-[0.9] text-wrap">
                    {game.title}
                  </h1>

                  <p className="text-sm md:text-base text-gray-400 mb-6 max-w-lg leading-relaxed">
                    {game.description}
                  </p>

                  {/* Pre-order Live Countdown Timer */}
                  {game.isPreOrder && (
                    <div className="mb-6 p-4 rounded-xl bg-red-950/20 border border-red-900/40 max-w-sm">
                      <div className="flex items-center space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <Clock className="h-4 w-4" />
                        <span>Launch Countdown:</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center">
                        <div className="bg-cyber-black/75 p-2 rounded-lg border border-red-900/30">
                          <div className="text-lg font-bold text-white font-mono">{countdown.days}</div>
                          <div className="text-[9px] text-gray-500 uppercase">Days</div>
                        </div>
                        <div className="bg-cyber-black/75 p-2 rounded-lg border border-red-900/30">
                          <div className="text-lg font-bold text-white font-mono">{countdown.hours}</div>
                          <div className="text-[9px] text-gray-500 uppercase">Hrs</div>
                        </div>
                        <div className="bg-cyber-black/75 p-2 rounded-lg border border-red-900/30">
                          <div className="text-lg font-bold text-white font-mono">{countdown.minutes}</div>
                          <div className="text-[9px] text-gray-500 uppercase">Mins</div>
                        </div>
                        <div className="bg-cyber-black/75 p-2 rounded-lg border border-red-900/40">
                          <div className="text-lg font-bold text-brand-pink font-mono">{countdown.seconds}</div>
                          <div className="text-[9px] text-gray-500 uppercase">Secs</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pricing Matrix */}
                  <div className="flex items-baseline space-x-3 mb-8">
                    <span className="text-3xl font-black text-white font-mono">
                      ${game.price.toFixed(2)}
                    </span>
                    {game.originalPrice && (
                      <span className="text-lg text-gray-500 line-through font-mono">
                        ${game.originalPrice.toFixed(2)}
                      </span>
                    )}
                    {game.originalPrice && (
                      <span className="text-xs font-bold text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded border border-brand-pink/20">
                        SAVE {Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => onSelectProduct(game)}
                      className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider bg-brand-cyan text-[#050508] hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <span>{game.isPreOrder ? 'SECURE PRE-ORDER' : 'EXPLORE TITLE'}</span>
                      <ArrowRight className="h-4 w-4 stroke-[3]" />
                    </button>

                    <button
                      onClick={onBrowseDeals}
                      className="px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
                    >
                      BROWSE HOT DEALS
                    </button>
                  </div>

                </div>
              </div>
            );
          })}

          {/* Slide Arrow Controls */}
          <button
            onClick={() => setActiveSlide((prev) => (prev - 1 + heroGames.length) % heroGames.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/10 bg-[#0a0a0f]/85 text-white hover:bg-brand-cyan hover:text-black hover:border-brand-cyan transition-all shadow-md cursor-pointer pointer-events-auto"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % heroGames.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/10 bg-[#0a0a0f]/85 text-white hover:bg-brand-cyan hover:text-black hover:border-brand-cyan transition-all shadow-md cursor-pointer pointer-events-auto"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {heroGames.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === activeSlide ? 'w-6 bg-brand-cyan' : 'w-2.5 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Dynamic promotional CTA strips / quick search deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div 
            onClick={onBrowseDeals}
            className="bg-[#15151f] rounded-2xl p-5 border border-white/5 flex flex-col justify-between hover:border-brand-cyan/40 transition-all group cursor-pointer"
          >
            <div className="mb-4">
              <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-brand-cyan transition-colors tracking-widest block mb-1">PROMOTION MATRIX</span>
              <span className="text-xl font-black italic text-white uppercase block leading-none">FLASH SLASH SALES</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Up to 60% Off Live Deals</span>
              <span className="text-xs font-bold text-brand-cyan uppercase bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/15">ACTIVATE</span>
            </div>
          </div>

          <div 
            onClick={onBrowsePreorders}
            className="bg-[#15151f] rounded-2xl p-5 border border-white/5 flex flex-col justify-between hover:border-brand-purple/40 transition-all group cursor-pointer"
          >
            <div className="mb-4">
              <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-brand-purple transition-colors tracking-widest block mb-1">PRE-ORDER PLATFORM</span>
              <span className="text-xl font-black italic text-white uppercase block leading-none">HOT EXCLUSIVES</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">Bestsellers & Preload Keys</span>
              <span className="text-xs font-bold text-brand-purple uppercase bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/15">RESERVE</span>
            </div>
          </div>

          <div 
            className="bg-[#15151f] rounded-2xl p-5 border border-white/5 flex flex-col justify-between hover:border-amber-400/40 transition-all group cursor-pointer"
          >
            <div className="mb-4">
              <span className="text-xs font-bold uppercase text-gray-500 group-hover:text-amber-400 transition-colors tracking-widest block mb-1">VIP ACCELERATOR</span>
              <span className="text-xl font-black italic text-white uppercase block leading-none">GAMIFIED POINTS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium font-sans">Earn point multipliers on play</span>
              <span className="text-xs font-bold text-amber-400 uppercase bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/15">ENTER HUB</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
