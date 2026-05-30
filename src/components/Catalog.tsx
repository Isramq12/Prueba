import React, { useState, useMemo } from 'react';
import { Filter, Star, Heart, Eye, ShoppingCart, SlidersHorizontal, ChevronDown, Check, Sparkles, AlertTriangle } from 'lucide-react';
import { Product, Platform } from '../types';

interface CatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, platform: Platform, format: 'Digital' | 'Physical') => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  selectedPlatformFilter: Platform | 'All';
  onPlatformFilterChange: (platform: Platform | 'All') => void;
}

export default function Catalog({
  products,
  onSelectProduct,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  selectedPlatformFilter,
  onPlatformFilterChange
}: CatalogProps) {
  // Advanced filters state
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(160);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [stockOnly, setStockOnly] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<'All' | 'Digital' | 'Physical'>('All');
  const [selectedPlayers, setSelectedPlayers] = useState<'All' | 'Singleplayer' | 'Multiplayer'>('All');
  
  // Sorting state
  const [sortBy, setSortBy] = useState<string>('best-selling');
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  // Derive unique lists
  const genres = useMemo(() => {
    const list = new Set<string>();
    products.forEach(p => list.add(p.genre));
    return ['All', ...Array.from(list)];
  }, [products]);

  // Handle Filtering & Sorting Core Process
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Platform Filter
    if (selectedPlatformFilter !== 'All') {
      result = result.filter(p => p.platform === selectedPlatformFilter);
    }

    // Genre
    if (selectedGenre !== 'All') {
      result = result.filter(p => p.genre === selectedGenre);
    }

    // Max Price
    result = result.filter(p => p.price <= maxPrice);

    // Rating
    if (selectedRating > 0) {
      result = result.filter(p => p.rating >= selectedRating);
    }

    // In Stock only
    if (stockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Format
    if (selectedFormat === 'Digital') {
      result = result.filter(p => p.isDigital);
    } else if (selectedFormat === 'Physical') {
      result = result.filter(p => p.isPhysical);
    }

    // Player Mode
    if (selectedPlayers === 'Singleplayer') {
      result = result.filter(p => p.singleplayer);
    } else if (selectedPlayers === 'Multiplayer') {
      result = result.filter(p => p.multiplayer);
    }

    // Sorter logic
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'newest') return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      if (sortBy === 'most-popular') return b.reviewCount - a.reviewCount;
      // Default: best-selling / popular algorithm
      const aScore = (a.isBestSeller ? 3000 : 0) + a.reviewCount + (a.rating * 100);
      const bScore = (b.isBestSeller ? 3000 : 0) + b.reviewCount + (b.rating * 100);
      return bScore - aScore;
    });

    return result;
  }, [products, selectedPlatformFilter, selectedGenre, maxPrice, selectedRating, stockOnly, selectedFormat, selectedPlayers, sortBy]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="catalog-section">
      
      {/* Catalog Title + Layout Adjuster bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <div className="w-3 h-3 bg-brand-cyan rotate-45 shrink-0"></div>
            <span>PREMIUM GAMING CATALOG</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest text-[9px]">
            Displaying {filteredProducts.length} core gaming titles calibrated to your specs
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Quick filter expand on tablet */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest rounded-full border transition-all flex items-center space-x-2 cursor-pointer ${
              filtersOpen 
                ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' 
                : 'bg-[#15151f] border-white/10 text-gray-300 hover:text-white hover:border-white/25'
            }`}
            id="filter-toggle-btn"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>CONFIGURE FILTERS {filtersOpen ? '(ON)' : '(OFF)'}</span>
          </button>

          {/* Sorter Selector */}
          <div className="relative flex items-center">
            <span className="text-xs text-gray-500 mr-2 uppercase tracking-widest text-[10px] hidden sm:inline">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-[#15151f] border border-white/10 text-xs font-bold text-white rounded-full focus:outline-none focus:border-brand-purple cursor-pointer uppercase tracking-wider pr-10 appearance-none"
              id="catalog-sorter"
            >
              <option value="best-selling">Featured Releases</option>
              <option value="most-popular">Most Popular</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="newest">Recent Additions</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4 pointer-events-none" />
          </div>

        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8">
        
        {/* Filters Panel Dropdown/Sidebar */}
        <div className={`w-full lg:w-64 flex-shrink-0 bg-[#0a0a0f] rounded-2xl border border-white/10 p-6 space-y-6 transition-all duration-300 ${
          filtersOpen ? 'block' : 'hidden lg:block'
        }`} id="catalog-filters-sidebar">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-black text-white uppercase tracking-widest flex items-center space-x-1.5">
              <Filter className="h-3.5 w-3.5 text-brand-purple" />
              <span>FILTER CONFIG</span>
            </span>
            <button 
              onClick={() => {
                setSelectedGenre('All');
                setMaxPrice(160);
                setSelectedRating(0);
                setStockOnly(false);
                setSelectedFormat('All');
                setSelectedPlayers('All');
                onPlatformFilterChange('All');
              }}
              className="text-[10px] uppercase font-black text-brand-cyan hover:underline cursor-pointer"
            >
              CLEAR
            </button>
          </div>

          {/* Platforms Filter Quick Links inside filter panel */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">SYSTEM PREFERENCE</h4>
            <div className="space-y-1.5">
              {['All', 'PlayStation', 'Xbox', 'Nintendo Switch', 'PC Gaming', 'Retro Gaming', 'Accessories', 'Collectibles', 'Merchandise'].map((plat) => (
                <button
                  key={plat}
                  onClick={() => onPlatformFilterChange(plat as Platform | 'All')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                    selectedPlatformFilter === plat 
                      ? 'bg-brand-cyan/10 text-brand-cyan font-bold border border-brand-cyan/25' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{plat}</span>
                  {selectedPlatformFilter === plat && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Category Filter */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">GENRE CATEGORY</h4>
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#15151f] border border-white/5 text-xs text-white rounded-lg focus:outline-none focus:border-brand-purple cursor-pointer appearance-none"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="h-4 w-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Double Slideway Price Filter */}
          <div>
            <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              <span>BUDGET ACCELERATION</span>
              <span className="font-mono text-white">${maxPrice} LIMIT</span>
            </div>
            <input
              type="range"
              min="10"
              max="160"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
              <span>$10</span>
              <span>$85</span>
              <span>$160</span>
            </div>
          </div>

          {/* Rating filter stars */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">VERIFIED CRITIQUE</h4>
            <div className="space-y-2">
              {[4.8, 4.5, 4.0].map((starVal) => (
                <label key={starVal} className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer select-none">
                  <input
                    type="radio"
                    name="stars-filter"
                    checked={selectedRating === starVal}
                    onChange={() => setSelectedRating(starVal)}
                    className="rounded-full border-white/15 text-brand-purple focus:ring-brand-purple bg-[#15151f]"
                  />
                  <div className="flex items-center text-amber-400 space-x-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-white font-bold">{starVal}+</span>
                    <span className="text-gray-500 font-light">Stars Rated</span>
                  </div>
                </label>
              ))}
              <label className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white cursor-pointer select-none">
                <input
                  type="radio"
                  name="stars-filter"
                  checked={selectedRating === 0}
                  onChange={() => setSelectedRating(0)}
                  className="rounded-full border-white/15 text-brand-purple bg-[#15151f]"
                />
                <span className="text-gray-400 font-bold">Show All Ratings</span>
              </label>
            </div>
          </div>

          {/* Single vs Multi-player filter */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">COMBAT ALIGNMENT</h4>
            <div className="grid grid-cols-3 gap-1">
              {(['All', 'Singleplayer', 'Multiplayer'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedPlayers(mode)}
                  className={`px-1 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-lg text-center transition-all cursor-pointer ${
                    selectedPlayers === mode
                      ? 'bg-brand-purple/15 border-brand-purple text-brand-purple'
                      : 'bg-[#15151f] border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {mode === 'Singleplayer' ? 'SOLO' : mode === 'Multiplayer' ? 'CO-OP' : 'ALL'}
                </button>
              ))}
            </div>
          </div>

          {/* Delivery option Format */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">DELIVERY FORMAT</h4>
            <div className="flex gap-2">
              {(['All', 'Digital', 'Physical'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-lg text-center transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan'
                      : 'bg-[#15151f] border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Stock toggle */}
          <div className="pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">STOCK INVENTORY ONLY</span>
            <button
              onClick={() => setStockOnly(!stockOnly)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                stockOnly ? 'bg-brand-cyan' : 'bg-white/10'
              }`}
            >
              <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                stockOnly ? 'translate-x-4' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>

        {/* Catalog Main Frame Grid */}
        <div className="flex-1 w-full">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 rounded-3xl bg-[#0d0d16] border border-gray-800 text-center">
              <AlertTriangle className="h-12 w-12 text-brand-pink mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Zero Titles Matched</h3>
              <p className="text-sm text-gray-400 mt-2 max-w-md">
                We couldn't locate any products matching those filters. Try clearing your search or reset criteria variables inside the sidebar.
              </p>
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setMaxPrice(160);
                  setSelectedRating(0);
                  setStockOnly(false);
                  setSelectedFormat('All');
                  setSelectedPlayers('All');
                  onPlatformFilterChange('All');
                }}
                className="mt-6 px-5 py-2.5 rounded-xl bg-brand-cyan text-cyber-black font-extrabold uppercase text-xs tracking-wider hover:bg-white transition-colors"
              >
                Reset Search Matrix
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" id="products-grid">
              {filteredProducts.map((game) => {
                const isItemWishlisted = wishlist.includes(game.id);
                return (
                  <div
                    key={game.id}
                    className="p-4 bg-[#0a0a0f] rounded-2xl border border-white/5 hover:border-brand-cyan/20 shadow-xl group hover:shadow-[0_0_20px_rgba(0,240,255,0.06)] transition-all flex flex-col h-[500px] relative"
                  >
                    
                    {/* Badge items */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-1.5 max-w-[80%]">
                      {game.isBestSeller && (
                        <div className="flex items-center space-x-1 px-2.5 py-1 rounded-sm bg-amber-500 text-[9px] font-black uppercase tracking-widest text-white shadow-md">
                          <Sparkles className="h-3 w-3 fill-current" />
                          <span>BEST SELLER</span>
                        </div>
                      )}
                      {game.isPreOrder && (
                        <div className="px-2.5 py-1 rounded-sm bg-[#BC00FF] text-[9px] font-black uppercase tracking-widest text-white shadow-md">
                          PRE-ORDER
                        </div>
                      )}
                      {game.isDeal && game.originalPrice && (
                        <div className="px-2.5 py-1 rounded-sm bg-brand-pink text-[9px] font-black uppercase tracking-widest text-white shadow-md">
                          {Math.round(((game.originalPrice - game.price) / game.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    {/* Wishlist triggers */}
                    <button
                      onClick={() => onToggleWishlist(game.id)}
                      className={`absolute top-6 right-6 z-25 p-2 rounded-full backdrop-blur-md transition-colors shadow-lg cursor-pointer ${
                        isItemWishlisted 
                          ? 'bg-red-500 text-white' 
                          : 'bg-[#15151f]/80 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={isItemWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`h-4 w-4 ${isItemWishlisted ? 'fill-current' : ''}`} />
                    </button>

                    {/* Image Section */}
                    <div className="relative h-44 w-full rounded-xl overflow-hidden bg-cyber-black flex-shrink-0 cursor-pointer border border-white/5" onClick={() => onSelectProduct(game)}>
                      <img
                        src={game.image}
                        alt={game.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent"></div>
                      
                      {/* Platform label overlay bottom left */}
                      <div className="absolute bottom-3 left-3 bg-[#BC00FF] border border-[#BC00FF] text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                        {game.platform}
                      </div>

                      {/* ESRB label bottom right */}
                      <span className="absolute bottom-3 right-3 text-[10px] font-bold font-mono text-gray-400 bg-black/70 px-1.5 py-0.5 rounded border border-white/10">
                        {game.esrbRating}
                      </span>
                    </div>

                    {/* Description Text Frame */}
                    <div className="flex-1 flex flex-col justify-between pt-4">
                      
                      <div>
                        {/* Rating block & genre */}
                        <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mb-1.5">
                          <span className="uppercase tracking-widest font-bold text-[9px] text-brand-cyan">{game.genre}</span>
                          <div className="flex items-center text-amber-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                            <Star className="h-3 w-3 fill-current mr-1" />
                            <span className="font-bold font-sans text-white">{game.rating}</span>
                            <span className="text-gray-500 mx-0.5 font-light">({game.reviewCount})</span>
                          </div>
                        </div>

                        {/* Game Title */}
                        <h3 
                          onClick={() => onSelectProduct(game)}
                          className="text-base font-black text-white italic leading-tight uppercase hover:text-brand-cyan cursor-pointer transition-colors line-clamp-2"
                        >
                          {game.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                          {game.description}
                        </p>
                      </div>

                      {/* Stock availability banner */}
                      <div className="mt-2.5">
                        {game.stock === 0 ? (
                          <span className="text-[10px] font-black text-red-400 bg-red-950/25 border border-red-900/40 px-2 py-0.5 rounded-sm inline-block">
                            STOCK SOLD OUT
                          </span>
                        ) : game.stock <= 5 ? (
                          <span className="text-[10px] font-black text-amber-400 bg-amber-950/25 border border-amber-900/40 px-2 py-0.5 rounded-sm inline-block animate-pulse">
                            ONLY {game.stock} UNITS LEFT!
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500 bg-white/5 border border-transparent px-2 py-0.5 rounded-sm inline-block">
                            AVAILABLE FOR DELIVERY
                          </span>
                        )}
                      </div>

                      {/* Interactive buy rows */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3 flex-shrink-0">
                        
                        <div>
                          <div className="flex items-baseline space-x-1.5">
                            <span className="text-xl font-black font-mono text-white">${game.price.toFixed(2)}</span>
                            {game.originalPrice && (
                              <span className="text-xs text-gray-500 line-through font-mono">${game.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <span className="text-[9px] font-bold text-gray-500 uppercase block leading-none">
                            {game.isDigital ? 'Digital Key / Physical' : 'Physical disc only'}
                          </span>
                        </div>

                        {/* Compact utility tools row */}
                        <div className="flex items-center space-x-1.5">
                          
                          {/* Quick details inspect */}
                          <button
                            onClick={() => onSelectProduct(game)}
                            className="p-2 w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:text-brand-cyan text-gray-400 transition-colors flex items-center justify-center cursor-pointer"
                            title="Inspect core game details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {/* Quick Instant Buy */}
                          {game.stock > 0 ? (
                            <button
                              onClick={() => onAddToCart(
                                game,
                                1,
                                game.platform,
                                game.isDigital ? 'Digital' : 'Physical'
                              )}
                              className="px-4 py-2 h-9 rounded-full bg-brand-cyan text-black font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center space-x-1 cursor-pointer active:scale-95 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                              title="Add physical / key into Cart"
                            >
                              <ShoppingCart className="h-3.5 w-3.5 stroke-[2.5]" />
                              <span>BUY</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => onSelectProduct(game)}
                              className="px-3.5 py-2 h-9 rounded-full bg-red-950/30 border border-red-900/40 text-red-400 font-black text-[10px] uppercase tracking-widest flex items-center justify-center cursor-pointer hover:bg-red-900/30"
                            >
                              PRE-ORDER
                            </button>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
