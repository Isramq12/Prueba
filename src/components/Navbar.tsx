import React, { useState } from 'react';
import { Search, Trophy, BookOpen, MessageSquare, Gamepad2, ShoppingCart, User, Database, Settings } from 'lucide-react';
import { Platform, UserProfile } from '../types';

interface NavbarProps {
  currentView: 'store' | 'blogs' | 'community' | 'account' | 'admin';
  onChangeView: (view: 'store' | 'blogs' | 'community' | 'account' | 'admin') => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlatformFilter: Platform | 'All';
  onPlatformFilterChange: (platform: Platform | 'All') => void;
}

export default function Navbar({
  currentView,
  onChangeView,
  cartCount,
  cartTotal,
  onOpenCart,
  user,
  searchQuery,
  onSearchChange,
  selectedPlatformFilter,
  onPlatformFilterChange
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getTierColor = (level: string) => {
    switch (level) {
      case 'Legend': return 'text-amber-400 border-amber-400 bg-amber-950/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Elite': return 'text-brand-purple border-brand-purple bg-purple-950/40 shadow-[0_0_10px_rgba(188,19,254,0.2)]';
      case 'Veteran': return 'text-brand-cyan border-brand-cyan bg-cyan-950/40';
      default: return 'text-gray-400 border-gray-600 bg-gray-900/40';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div 
          onClick={() => onChangeView('store')}
          className="flex cursor-pointer items-center space-x-3.5 group select-none"
          id="nav-logo"
        >
          <div className="w-8 h-8 bg-gradient-to-tr from-brand-cyan to-brand-purple rounded-sm rotate-45 flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
            <div className="w-3 h-3 bg-white rotate-45"></div>
          </div>
          <span className="text-xl font-black tracking-tighter italic uppercase text-white">
            NEXUS <span className="text-brand-cyan">GAMES</span>
          </span>
        </div>

        {/* Categories / Platform Tabs - Desktop */}
        <nav className="hidden lg:flex items-center space-x-1">
          {['All', 'PlayStation', 'Xbox', 'Nintendo Switch', 'PC Gaming', 'Retro Gaming'].map((plat) => (
            <button
              key={plat}
              onClick={() => {
                onPlatformFilterChange(plat as Platform | 'All');
                onChangeView('store');
              }}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-all ${
                selectedPlatformFilter === plat && currentView === 'store'
                  ? 'text-brand-cyan border-b-2 border-brand-cyan'
                  : 'text-gray-400 hover:text-[#00F0FF]'
              }`}
            >
              {plat === 'All' ? 'Shop All' : plat.replace(' Gaming', '')}
            </button>
          ))}
        </nav>

        {/* Global Action items */}
        <div className="flex items-center space-x-4">
          
          {/* Quick Search */}
          {currentView === 'store' && (
            <div className="relative hidden md:block w-48 lg:w-64" id="nav-search-container">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search titles, gear..."
                className="w-full text-xs bg-[#15151f] border border-white/5 rounded-full pl-10 pr-3 py-2 focus:outline-none focus:border-brand-cyan/50 transition-all text-white placeholder-gray-500"
              />
            </div>
          )}

          {/* Module Nav Links */}
          <div className="flex items-center space-x-1 sm:space-x-2 border-l border-white/10 pl-3">
            <button
              onClick={() => onChangeView('blogs')}
              className={`p-2 rounded-full relative group transition-colors ${currentView === 'blogs' ? 'text-brand-cyan bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              title="Blog & Strategy Hub"
              id="nav-btn-blogs"
            >
              <BookOpen className="h-5 w-5" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Academy & Guides</span>
            </button>

            <button
              onClick={() => onChangeView('community')}
              className={`p-2 rounded-full relative group transition-colors ${currentView === 'community' ? 'text-brand-purple bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              title="Community Boards & Live Feedback"
              id="nav-btn-community"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">User Lounge</span>
            </button>

            <button
              onClick={() => onChangeView('account')}
              className={`p-2 rounded-full relative group transition-colors ${currentView === 'account' ? 'text-amber-400 bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              title="My VIP Loyalty Hub"
              id="nav-btn-account"
            >
              <div className="relative">
                <User className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </div>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Account & Rewards</span>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => onChangeView('admin')}
              className={`p-2 rounded-full relative group transition-colors ${currentView === 'admin' ? 'text-brand-pink bg-white/5' : 'text-gray-400 hover:text-brand-pink hover:bg-white/5'}`}
              title="Manager Settings"
              id="nav-btn-admin"
            >
              <Settings className="h-5 w-5" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Portal Admin</span>
            </button>
          </div>

          {/* Gamified Loyalty Status Badge - Desktop */}
          <div 
            onClick={() => onChangeView('account')}
            className={`hidden md:flex items-center space-x-1 px-3 py-1 text-[10px] font-bold tracking-widest uppercase border rounded-full cursor-pointer transition-transform hover:scale-105 ${getTierColor(user.loyalty.level)}`}
            id="nav-loyalty-badge"
          >
            <Trophy className="h-3 w-3" />
            <span>{user.loyalty.level} TIER</span>
          </div>

          {/* Shopping Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/15 text-white font-bold text-xs hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
            id="nav-cart-btn"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="hidden sm:inline font-mono">${cartTotal.toFixed(2)}</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-purple text-[10px] flex items-center justify-center rounded-full text-white">
              {cartCount}
            </span>
          </button>

        </div>
      </div>

      {/* Sub-bar for mobile search */}
      <div className="md:hidden px-4 pb-2">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search game titles..."
            className="w-full text-xs bg-[#15151f] border border-white/5 text-white rounded-full pl-10 pr-3 py-2 focus:outline-none focus:border-brand-cyan/50"
          />
        </div>
      </div>
    </header>
  );
}
