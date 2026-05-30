import React, { useState } from 'react';
import { Trophy, Gift, Calendar, Navigation, Shield, CreditCard, ShoppingBag, ArrowRight, CheckCircle, Copy, Lock, Key, Compass } from 'lucide-react';
import { UserProfile, Order, Coupon } from '../types';
import { SPECIAL_COUPONS } from '../data';

interface UserAccountProps {
  user: UserProfile;
  orders: Order[];
  onUpgradeMembership: () => void;
  onSelectCoupon: (couponCode: string) => void;
  currentAppliedCouponCode?: string;
  onAddAddress: (address: string) => void;
}

export default function UserAccount({
  user,
  orders,
  onUpgradeMembership,
  onSelectCoupon,
  currentAppliedCouponCode,
  onAddAddress
}: UserAccountProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState('');

  const handleCopy = (code: string) => {
    setCopiedCode(code);
    onSelectCoupon(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getTierBadge = (lvl: string) => {
    switch (lvl) {
      case 'Legend': return 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white border-amber-400';
      case 'Elite': return 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500';
      case 'Veteran': return 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white border-cyan-400';
      default: return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  const getPointsProgressColor = (lvl: string) => {
    switch (lvl) {
      case 'Legend': return 'bg-amber-400';
      case 'Elite': return 'bg-brand-purple';
      case 'Veteran': return 'bg-brand-cyan';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="customer-profile-dashboard">
      
      {/* Top Welcome Title Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d0d16] via-cyan-950/20 to-brand-cyan/5 border border-gray-850 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan p-0.5 shadow-lg">
            <div className="h-full w-full bg-cyber-black rounded-[14px] flex items-center justify-center font-black text-white text-xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-black text-white uppercase tracking-wider">{user.name}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase ${getTierBadge(user.loyalty.level)}`}>
                {user.loyalty.level} LEVEL
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-0.5">Primary email checkup: {user.email}</p>
          </div>
        </div>

        {/* Membership details */}
        <div className="p-4 rounded-xl bg-cyber-black border border-gray-800 flex items-center space-x-6 text-xs text-left">
          <div>
            <span className="text-[9px] font-bold uppercase text-gray-500 block">MEMBERSHIP PACKAGE</span>
            <span className="text-white font-extrabold uppercase text-xs flex items-center">
              <Shield className="h-3.5 w-3.5 text-brand-purple mr-1" />
              <span>{user.membershipStatus}</span>
            </span>
          </div>
          {user.membershipStatus === 'Basic' ? (
            <button
              onClick={onUpgradeMembership}
              className="px-3.5 py-2 rounded-lg bg-brand-cyan text-cyber-black font-black uppercase text-[10px] tracking-wider hover:bg-white transition-all cursor-pointer"
            >
              UPGRADE VIP NOW
            </button>
          ) : (
            <div className="text-gray-400 font-medium">
              <span className="block text-[9px]">EXPIRED BY:</span>
              <span className="font-mono text-xs">2027-12-31</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Loyalty points dashboard details */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Gamified Points Status bar */}
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-800 text-left">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center">
                <Trophy className="h-4.5 w-4.5 text-amber-400 mr-2" />
                <span>Loyalty Rank XP Progression</span>
              </h3>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/30 px-2 py-0.5 rounded-full border border-amber-900/10">
                {user.loyalty.points} Total XP
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400 font-medium font-mono">
                <span>Rookie</span>
                <span>Elite</span>
                <span>Legend TIER</span>
              </div>
              <div className="w-full bg-cyber-black h-2 rounded-full overflow-hidden border border-gray-900">
                <div 
                  className={`h-full transition-all duration-800 ${getPointsProgressColor(user.loyalty.level)}`}
                  style={{ width: `${Math.min(100, (user.loyalty.points / 3000) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                <span>0 XP</span>
                <span>{user.loyalty.pointsToNextLevel} XP remaining to Level Up!</span>
                <span>3000+ XP</span>
              </div>
            </div>

            {/* Loyalty tier benefits bullet points */}
            <div className="mt-6 pt-4 border-t border-gray-800 space-y-2.5 text-xs text-gray-400">
              <span className="block font-bold text-white uppercase text-[10px]">Your Unlocked VIP Perks:</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Lifetime store spends: <strong className="text-white font-mono">${user.loyalty.lifetimeSpend.toFixed(2)}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Base coupon codes usage enabled automatically</span>
              </div>
              {user.loyalty.level === 'Legend' || user.membershipStatus === 'Premium VIP' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-brand-purple font-bold">25% Absolute Physical Coupon (LEGEND25) Unlocked</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Free early pass on beta launches and restocks</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Quick-activate custom Promo codes */}
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-800 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-white flex items-center">
              <Gift className="h-4.5 w-4.5 text-brand-purple mr-2" />
              <span>Available Level Coupons</span>
            </h3>

            <div className="space-y-3">
              {SPECIAL_COUPONS.map((coupon) => {
                const isActive = currentAppliedCouponCode === coupon.code;
                return (
                  <div 
                    key={coupon.code}
                    className={`p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${
                      isActive 
                        ? 'border-brand-cyan bg-brand-cyan/5' 
                        : 'border-gray-850 bg-cyber-black'
                    }`}
                  >
                    <div>
                      <span className="font-extrabold text-white block uppercase">{coupon.code} ({coupon.discount}% Off)</span>
                      <span className="text-[10px] text-gray-400 block font-light leading-snug mt-0.5">{coupon.description}</span>
                    </div>
                    
                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className={`p-2 rounded-lg cursor-pointer transition-all ${
                        copiedCode === coupon.code 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                      title="Load into Cart"
                    >
                      {copiedCode === coupon.code ? 'Copied' : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Order history records & digital licenses vault */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Digital Vault for downloaded codes */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-953/10 to-cyber-charcoal border border-brand-purple/20">
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-2 flex items-center">
              <Key className="h-4.5 w-4.5 text-brand-purple mr-2" />
              <span>Activated Game Licensing Vault</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Access your unique digital steam/console activation credential keys. Click copy to redeem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-cyber-black/75 border border-gray-850">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">CYBER CHRONICLES: NEO TOKYO 2099</span>
                <span className="text-xs font-sans text-brand-cyan block font-bold mt-1 uppercase">Digital Standard Key</span>
                
                <div className="mt-3 flex space-x-2">
                  <span className="flex-1 bg-gray-900 border border-gray-800 p-2 text-xs font-mono text-white rounded text-center truncate select-all block">
                    NX-7FFF-28B9-99AA-CC44
                  </span>
                  <button onClick={() => alert('Copied licensing standard key!')} className="p-2 bg-gray-800 hover:bg-brand-purple text-white text-xs rounded transition-all">Copy</button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyber-black/75 border border-gray-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">SUPER POCKET MARIO: COSMIC ODYSSEY</span>
                  <span className="text-xs font-sans text-amber-400 block font-bold mt-1 uppercase">VIP Pre-Order Pass Key</span>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <span className="flex-1 bg-gray-900 border border-gray-800 p-2 text-xs font-mono text-white rounded text-center truncate select-all block">
                    NX-MARIO-XP-BOOST-8877
                  </span>
                  <button onClick={() => alert('Copied VIP Pre-Order license key!')} className="p-2 bg-gray-800 hover:bg-brand-purple text-white text-xs rounded transition-all">Copy</button>
                </div>
              </div>
            </div>
          </div>

          {/* Past transactions order history rows */}
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-800 text-left">
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-6 flex items-center justify-between border-b border-gray-900 pb-3">
              <span className="flex items-center">
                <ShoppingBag className="h-4.5 w-4.5 text-brand-cyan mr-2" />
                <span>Historical Purchase Logs ({orders.length})</span>
              </span>
              <span className="text-[10px] text-gray-500 font-mono">Real-time status updates</span>
            </h3>

            {orders.length === 0 ? (
              <div className="py-8 text-center text-gray-500 text-xs shadow-inner bg-cyber-black rounded-xl border border-gray-850">
                You have not placed any orders yet. Place your first order to kickstart loyalty achievements multipliers!
              </div>
            ) : (
              <div className="space-y-4" id="order-history-list">
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="p-4 rounded-xl bg-[#08080f] border border-gray-850 space-y-3 hover:border-gray-800 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-xs pb-2 border-b border-gray-900 gap-2">
                      <div>
                        <span className="text-gray-500 font-medium">Order: </span>
                        <span className="font-bold text-white font-mono uppercase">{order.id}</span>
                        <span className="text-gray-600 font-light mx-2">|</span>
                        <span className="text-gray-400 font-mono">{order.date}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                        <span className="font-mono text-white font-bold">${order.total} total cost</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400' 
                            : 'bg-amber-950/20 border-amber-900/40 text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Products details */}
                    <div className="space-y-2">
                      {order.products.map((p, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center space-x-2 truncate">
                            <img src={p.image} className="h-6 w-6 rounded object-cover border border-gray-900" />
                            <span className="text-gray-300 font-medium truncate uppercase max-w-[200px] md:max-w-xs">
                              {p.title} 
                            </span>
                            <span className="text-brand-purple font-semibold font-mono">x{p.quantity}</span>
                          </div>
                          
                          <span className="text-gray-400 text-[11px] font-mono whitespace-nowrap">
                            ${p.price.toFixed(2)} ea
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping logistics summary */}
                    {order.trackingNumber && (
                      <div className="pt-2 border-t border-gray-900 text-[11px] text-gray-500 flex justify-between items-center">
                        <span>Dispatch Method: <strong className="text-gray-400">{order.paymentMethod}</strong></span>
                        <span>Tracking Code: <strong className="text-brand-cyan font-mono select-all uppercase">{order.trackingNumber}</strong></span>
                      </div>
                    )}

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional: Add and store custom address coordinates */}
          <div className="p-6 rounded-2xl bg-[#08080f] border border-gray-850">
            <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4 flex items-center">
              <Navigation className="h-4.5 w-4.5 text-brand-cyan mr-2" />
              <span>Registered Shipping Addresses</span>
            </h3>

            <div className="space-y-2 mb-4">
              {user.savedAddresses.map((addr, idx) => (
                <div key={idx} className="p-3 bg-cyber-black text-xs text-gray-400 rounded-lg border border-gray-850">
                  {addr}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Submit alternative address..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="flex-1 text-xs px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded-lg focus:outline-none focus:border-brand-purple"
              />
              <button
                onClick={() => {
                  if (newAddress.trim()) {
                    onAddAddress(newAddress.trim());
                    setNewAddress('');
                  }
                }}
                className="px-4 py-2 bg-gray-800 text-white hover:bg-brand-purple text-xs font-bold uppercase rounded-lg transition-all"
              >
                Add Option
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
