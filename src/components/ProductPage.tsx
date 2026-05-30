import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShieldCheck, Truck, RefreshCw, ShoppingCart, Play, CheckCircle, Smartphone, Globe, Users, Trophy, Sparkles } from 'lucide-react';
import { Product, Platform } from '../types';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, platform: Platform, format: 'Digital' | 'Physical') => void;
  onInstantBuy: (product: Product, quantity: number, platform: Platform, format: 'Digital' | 'Physical') => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function ProductPage({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onInstantBuy,
  wishlist,
  onToggleWishlist,
  onSelectProduct
}: ProductPageProps) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<'Digital' | 'Physical'>(product.isDigital ? 'Digital' : 'Physical');
  const [quantity, setQuantity] = useState(1);
  const [bundleAgreed, setBundleAgreed] = useState(true);

  // For cross-selling bundle, find an accessory product, e.g. '6' (Nexus Pro Controller)
  const accessory = allProducts.find(p => p.id === '6') || allProducts[5];
  const bundleDiscountedPrice = Number(((product.price + (accessory ? accessory.price : 40)) * 0.85).toFixed(2)); // 15% discount for buying the bundle!

  const isStarred = wishlist.includes(product.id);

  // Recommendations: same platform or genre
  const recommendations = allProducts
    .filter(p => p.id !== product.id && (p.platform === product.platform || p.genre === product.genre))
    .slice(0, 3);

  const handleAddBundleToCart = () => {
    // Add product
    onAddToCart(product, 1, product.platform, selectedFormat);
    if (accessory) {
      onAddToCart(accessory, 1, accessory.platform, 'Physical');
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="product-detail-view">
      
      {/* Back to Catalog Breadcrumb */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-xs font-black text-gray-400 hover:text-brand-cyan uppercase tracking-widest mb-6 cursor-pointer"
        id="product-back-btn"
      >
        <ArrowLeft className="h-4.5 w-4.5" />
        <span>BACK TO DISPATCH CENTRE</span>
      </button>

      {/* Main product showcase split column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">
        
        {/* Left Column: Extensive Gallery / Video block */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative h-96 md:h-[460px] rounded-3xl bg-[#0a0a0f] border border-white/10 overflow-hidden shadow-2xl">
            {isPlayingVideo && product.videoUrl ? (
              <video
                src={product.videoUrl}
                controls
                autoPlay
                className="h-full w-full object-contain"
                onEnded={() => setIsPlayingVideo(false)}
              />
            ) : (
              <img
                src={activeImage}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-colors"
              />
            )}

            {/* Quick trailer play toggle */}
            {!isPlayingVideo && product.videoUrl && (
              <button
                onClick={() => setIsPlayingVideo(true)}
                className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan text-cyber-black shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Simulate immersive high-def game trial"
              >
                <Play className="h-7 w-7 fill-current translate-x-0.5" />
              </button>
            )}

            <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] text-gray-400 uppercase tracking-widest text-[9px]">
              {isPlayingVideo ? 'Playing Gameplay Cinematic Preview' : 'Interactive Gallery Screen'}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="flex gap-3 overflow-x-auto pb-2" id="gallery-thumbnails">
            {product.gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImage(imgUrl);
                  setIsPlayingVideo(false);
                }}
                className={`relative h-20 w-32 rounded-xl flex-shrink-0 overflow-hidden border transition-all cursor-pointer ${
                  activeImage === imgUrl && !isPlayingVideo
                    ? 'border-brand-purple scale-98 shadow-[0_0_10px_rgba(188,19,254,0.3)]'
                    : 'border-white/10 grayscale-30 hover:grayscale-0 hover:border-white/25'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
              </button>
            ))}

            {product.videoUrl && (
              <button
                onClick={() => setIsPlayingVideo(true)}
                className={`relative h-20 w-32 bg-[#121224] rounded-xl flex-shrink-0 border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isPlayingVideo ? 'border-brand-cyan' : 'border-white/10 hover:border-white/25'
                }`}
              >
                <Play className="h-5 w-5 text-brand-cyan mb-1" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Teaser trailer</span>
              </button>
            )}
          </div>

        </div>

        {/* Right Column: Checkout metrics and core properties & actions */}
        <div className="lg:col-span-5 flex flex-col justify-between" id="product-actions-panel">
          
          <div>
            
            {/* Platform, Release status */}
            <div className="flex items-center space-x-2 text-xs font-black text-brand-cyan tracking-widest uppercase mb-2">
              <span>{product.platform}</span>
              <span>•</span>
              <span>{product.genre}</span>
            </div>

            <h1 className="text-3xl md:text-4.5xl font-black italic tracking-tighter text-white leading-tight uppercase mb-3">
              {product.title}
            </h1>

            {/* Critique Score Stars, Reviews Count & Brand */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center text-amber-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 text-xs font-bold">
                <Star className="h-3.5 w-3.5 fill-current mr-1 text-[#00f0ff]" />
                <span className="text-white">{product.rating} / 5</span>
              </div>
              <span className="text-xs text-gray-400 hover:underline cursor-pointer">
                Based on {product.reviewCount} Verified purchase critiques
              </span>
            </div>

            {/* Price section with Urgency Trigger indicators */}
            <div className="p-5 rounded-2xl bg-[#0a0a0f] border border-white/10 mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">COMPETITIVE RETAIL PRICE</span>
                {product.stock > 0 ? (
                  <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 px-2.5 py-1 rounded-sm flex items-center">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full mr-1.5 animate-pulse"></span>
                    <span>READY TO DISPATCH</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase text-red-400 bg-red-950/20 border border-red-900/40 px-2.5 py-1 rounded-sm">
                    OUT OF STOCK
                  </span>
                )}
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black font-mono text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through font-mono">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs text-brand-cyan mt-1.5 font-semibold">
                  You save an extra ${ (product.originalPrice - product.price).toFixed(2) } as direct digital incentive.
                </p>
              )}
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-gray-400 leading-relaxed mb-6">
              {product.longDescription}
            </p>

            {/* User choices: format (Digital or Physical) */}
            <div className="space-y-4 mb-6">
              {product.isDigital && product.isPhysical && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">DELIVERY CHOICE:</h4>
                  <div className="grid grid-cols-2 gap-3" id="format-selection">
                    <button
                      onClick={() => setSelectedFormat('Digital')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedFormat === 'Digital'
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white'
                          : 'border-white/10 bg-[#15151f] text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-widest block">Instant Digital Code</span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">E-mailed key, play immediately</span>
                    </button>
                    <button
                      onClick={() => setSelectedFormat('Physical')}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedFormat === 'Physical'
                          ? 'border-brand-cyan bg-brand-cyan/10 text-white'
                          : 'border-white/10 bg-[#15151f] text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-black uppercase tracking-widest block">Physical Disc Edition</span>
                      <span className="text-[10px] text-gray-500 block mt-0.5">Boxed, classic collector item</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              {product.stock > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">ORDER QUANTITY:</span>
                  <div className="flex items-center border border-white/10 bg-[#15151f] rounded-full overflow-hidden">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3.5 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-black"
                    >
                      -
                    </button>
                    <span className="px-3.5 text-xs text-white font-bold font-mono">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                      className="px-3.5 py-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs font-black"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Action Row buttons */}
          <div className="space-y-3">
            
            <div className="flex gap-3">
              {product.stock > 0 ? (
                <>
                  <button
                    onClick={() => onAddToCart(product, quantity, product.platform, selectedFormat)}
                    className="flex-1 py-3.5 rounded-xl bg-cyber-gray border border-gray-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-gray-800 hover:border-gray-700 active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    id="details-add-to-cart-btn"
                  >
                    <ShoppingCart className="h-4.5 w-4.5 text-brand-purple" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => onInstantBuy(product, quantity, product.platform, selectedFormat)}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white font-extrabold text-xs uppercase tracking-wider hover:scale-[1.02] shadow-lg shadow-brand-purple/20 active:scale-95 transition-all flex items-center justify-center space-x-1 cursor-pointer"
                    id="details-instant-buy-btn"
                  >
                    <span>Instant checkout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onAddToCart(product, 1, product.platform, 'Physical')}
                  className="w-full py-4 rounded-xl bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider hover:bg-red-500 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Trophy className="h-4.5 w-4.5 animate-bounce" />
                  <span>PRE-ORDER LAUNCH NOW (DISPATCH GUARANTEE)</span>
                </button>
              )}

              {/* Wishlist triggers */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isStarred 
                    ? 'border-red-500 text-white bg-red-600/10' 
                    : 'border-gray-850 bg-cyber-black text-gray-400 hover:text-white hover:bg-gray-800/10'
                }`}
                title="Save into Wishlist Archive"
              >
                <Heart className={`h-5 w-5 ${isStarred ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Visual Value trust markers */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-center text-gray-500 text-[10px]">
              <div className="flex flex-col items-center">
                <ShieldCheck className="h-5 w-5 text-brand-cyan mb-1" />
                <span className="font-bold text-gray-400 block uppercase">100% Authentic</span>
                <span>Certified Retailer</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-5 w-5 text-brand-purple mb-1" />
                <span className="font-bold text-gray-400 block uppercase">Super Expedited</span>
                <span>E-Mail key or Box priority</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="h-5 w-5 text-brand-pink mb-1" />
                <span className="font-bold text-gray-400 block uppercase">No-Fuss Exchange</span>
                <span>14-day grace coverage</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Highly Conversion-Optimized Cross-Selling Segment: "Frequently Bought Together" */}
      {accessory && product.stock > 0 && (
        <div className="my-12 p-6 rounded-3xl bg-[#0a0a0f] border border-white/10 relative" id="quick-upsell-bundle">
          <div className="absolute top-4 right-4 bg-[#BC00FF]/15 text-brand-cyan border border-[#BC00FF]/30 text-[9px] uppercase tracking-widest font-black px-3 py-1 rounded-sm">
            COMBO PACK ACTIVE: SAVE 15%
          </div>

          <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span>COMPLETE THE EXPERIENCE</span>
          </h3>
          <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest text-[9px]">
            Gamers usually purchase this block together with an elite accessory. Check both boxes to unlock automated VIP discount pricing!
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              
              {/* Product A */}
              <div className="flex items-center space-x-3 bg-[#15151f] p-3 rounded-xl border border-white/5">
                <img src={product.image} className="h-12 w-12 rounded object-cover" refferrerpolicy="no-referrer" />
                <div>
                  <span className="text-xs font-bold text-white block truncate w-32 md:w-44">{product.title}</span>
                  <span className="text-xs text-gray-500 font-mono">${product.price.toFixed(2)}</span>
                </div>
              </div>

              <span className="text-base font-bold text-gray-500">+</span>

              {/* Product B */}
              <div className="flex items-center space-x-3 bg-[#15151f] p-3 rounded-xl border border-white/5">
                <img src={accessory.image} className="h-12 w-12 rounded object-cover" refferrerpolicy="no-referrer" />
                <div>
                  <span className="text-xs font-bold text-white block truncate w-32 md:w-44">{accessory.title}</span>
                  <span className="text-xs text-gray-400 block text-[10px] uppercase text-brand-cyan">{accessory.platform}</span>
                  <span className="text-xs text-gray-500 font-mono">${accessory.price.toFixed(2)}</span>
                </div>
              </div>

            </div>

            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <div className="text-right">
                <span className="text-[9px] font-black text-gray-500 block uppercase tracking-widest">TOTAL VALUE:</span>
                <div className="flex items-baseline space-x-2 justify-end">
                  <span className="text-sm font-mono text-gray-500 line-through">${(product.price + accessory.price).toFixed(2)}</span>
                  <span className="text-2xl font-black font-mono text-[#00f0ff]">${bundleDiscountedPrice}</span>
                </div>
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="px-6 py-3.5 rounded-full bg-brand-cyan text-black font-black text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer active:scale-95"
                id="bundle-add-to-cart-btn"
              >
                Buy Both With 1-Click
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Information Specifications block */}
      <div className="py-12 border-b border-white/10">
        <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-brand-cyan rotate-45"></div>
          <span>SYSTEM SPECIFICATIONS & COMPATIBILITY</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 flex items-start space-x-3">
            <Smartphone className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">Platform Host</span>
              <span className="text-xs font-black text-white uppercase">{product.platform}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 flex items-start space-x-3">
            <Globe className="h-5 w-5 text-[#BC00FF] shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">Supported Languages</span>
              <span className="text-xs font-bold text-white leading-normal truncate block w-40">{product.languages.join(', ')}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 flex items-start space-x-3">
            <Users className="h-5 w-5 text-brand-pink shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">Multiplayer Mode</span>
              <span className="text-xs font-bold text-white">{product.multiplayer ? 'Supported Online & Local' : 'Single-player Story Only'}</span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 flex items-start space-x-3">
            <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest block">ESRB Category Rating</span>
              <span className="text-xs font-bold text-white">{product.esrbRating} rating standard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended similar entries row */}
      {recommendations.length > 0 && (
         <div className="pt-12">
           <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-6 flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-[#BC00FF] rotate-45"></div>
             <span>RECOMMENDED HYPERLINKS</span>
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {recommendations.map(game => (
               <div
                 key={game.id}
                 onClick={() => {
                   onSelectProduct(game);
                   setActiveImage(game.gallery[0] || game.image);
                   setIsPlayingVideo(false);
                   setQuantity(1);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 }}
                 className="p-3 bg-[#0a0a0f] rounded-xl border border-white/5 hover:border-brand-purple hover:bg-[#15151f] cursor-pointer transition-all flex items-center space-x-3 group"
               >
                 <img src={game.image} className="h-16 w-16 rounded object-cover group-hover:scale-103 transition-transform" />
                 <div className="overflow-hidden">
                   <span className="text-[9px] font-black tracking-widest text-[#00f0ff] uppercase block">{game.platform}</span>
                   <h4 className="text-xs font-bold text-white truncate uppercase group-hover:text-brand-cyan transition-colors">{game.title}</h4>
                   <span className="text-xs font-mono font-bold text-gray-400 mt-1 block">${game.price.toFixed(2)}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}

    </section>
  );
}
