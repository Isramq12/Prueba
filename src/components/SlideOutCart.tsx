import React, { useState } from 'react';
import { X, Trash2, Tag, ShoppingBag, Plus, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { CartItem, Coupon, Product, Platform } from '../types';
import { SPECIAL_COUPONS } from '../data';

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, platform: Platform, format: 'Digital' | 'Physical', newQty: number) => void;
  onRemoveItem: (id: string, platform: Platform, format: 'Digital' | 'Physical') => void;
  couponApplied: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onCheckout: () => void;
  allProducts: Product[];
  onAddUpsell: (product: Product, quantity: number, platform: Platform, format: 'Digital' | 'Physical') => void;
}

export default function SlideOutCart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  couponApplied,
  onApplyCoupon,
  onCheckout,
  allProducts,
  onAddUpsell
}: SlideOutCartProps) {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // Free Shipping Threshold (e.g. $100)
  const shippingThreshold = 100;
  const isFreeShipping = subtotal >= shippingThreshold;
  const deliveryCost = subtotal > 0 ? (isFreeShipping ? 0 : 9.99) : 0;
  
  // Calculate discount percentage
  const discountAmount = couponApplied ? Number((subtotal * (couponApplied.discount / 100)).toFixed(2)) : 0;
  const total = Number((subtotal - discountAmount + deliveryCost).toFixed(2));

  // Handle promo code validity check
  const handleApplyPromo = () => {
    setPromoError('');
    const matched = SPECIAL_COUPONS.find(c => c.code.toUpperCase() === promoCodeInput.trim().toUpperCase());
    if (matched) {
      if (matched.minSpend && subtotal < matched.minSpend) {
        setPromoError(`Requires a minimum spend of $${matched.minSpend} to apply.`);
        return;
      }
      onApplyCoupon(matched);
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid coupon code. Try NEXUS10 or LEGEND25.');
    }
  };

  // Upsell suggestion: Find an item in products that is NOT currently in the cart. Let's offer the Apparel (id: '8') or Retro classic (id: '5')
  const inCartIds = cartItems.map(item => item.product.id);
  const upsellProduct = allProducts.find(p => !inCartIds.includes(p.id) && (p.id === '8' || p.id === '5' || p.id === '6'));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="slide-out-cart-container">
      
      {/* Backdrop shade overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-cyber-black/75 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0f] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#15151f]">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="h-5 w-5 text-brand-purple" />
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">TACTICAL WEAPON BAG</h3>
                <span className="text-[10px] text-gray-500 font-mono uppercase">{cartItems.length} SLOTS FILLED</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Free Shipping Alert progression */}
            {subtotal > 0 && (
              <div className="p-4 rounded-xl bg-[#15151f] border border-white/10">
                <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  <span>SHIPPING ALIGNMENT MATRIX</span>
                  <span className="text-white font-mono">{isFreeShipping ? 'UNLOCKED' : `$${(shippingThreshold - subtotal).toFixed(2)} REMAINING`}</span>
                </div>
                <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-brand-cyan h-full transition-all duration-550"
                    style={{ width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
                {!isFreeShipping && (
                  <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wider text-[9px]">
                    Orders totaling $100 or above receive free priority shipping.
                  </p>
                )}
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative h-20 w-20 rounded-full bg-cyber-gray border border-gray-800 flex items-center justify-center text-gray-500 mb-4 animate-pulse">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <h4 className="text-base font-bold text-white uppercase tracking-wider">Your bag is empty</h4>
                <p className="text-xs text-gray-500 mt-2 max-w-xs">
                  Inspect our catalog and unlock high-conversion deals with gamified loyalty multiplier benefits today!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-4 py-2 rounded-xl bg-brand-cyan text-cyber-black text-xs font-black uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Return To Storefront
                </button>
              </div>
            ) : (
              <div className="space-y-4" id="cart-items-list">
                {cartItems.map((item, index) => (
                  <div 
                    key={`${item.product.id}-${item.platformSelected}-${item.formatSelected}`}
                    className="flex pb-4 border-b border-white/5 last:border-b-0 space-x-4 items-start"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-lg object-cover bg-[#0a0a0f] border border-white/10"
                    />

                    <div className="flex-1 overflow-hidden">
                      
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white truncate uppercase tracking-widest leading-snug">
                          {item.product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.platformSelected, item.formatSelected)}
                          className="text-gray-500 hover:text-brand-pink transition-colors cursor-pointer"
                          title="Trash slot"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-[9px] font-bold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-1.5 py-0.2 rounded uppercase">
                          {item.platformSelected}
                        </span>
                        <span className="text-[9px] font-bold text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.2 rounded uppercase font-mono">
                          {item.formatSelected}
                        </span>
                      </div>

                      {/* Quantity editors and sum price */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-white/10 bg-black rounded-full overflow-hidden h-7">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.platformSelected, item.formatSelected, item.quantity - 1)}
                            className="px-2.5 text-xs text-gray-500 hover:text-white"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs text-white font-bold font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.platformSelected, item.formatSelected, item.quantity + 1)}
                            className="px-2.5 text-xs text-gray-500 hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-mono font-bold text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

             {/* Micro Upsell Item: boost average order value (AOV) */}
            {upsellProduct && cartItems.length > 0 && (
              <div className="pt-4 border-t border-white/5" id="cart-quick-upsell">
                <div className="flex items-center space-x-1 text-amber-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>EXCLUSIVE INSTANT AD-ON</span>
                </div>

                <div className="p-3 bg-[#15151f] border border-white/10 rounded-xl flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center space-x-3">
                    <img src={upsellProduct.image} className="h-10 w-10 rounded object-cover" />
                    <div>
                      <span className="text-[11px] font-bold text-white block w-32 truncate uppercase">{upsellProduct.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">${upsellProduct.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddUpsell(upsellProduct, 1, upsellProduct.platform, upsellProduct.isDigital ? 'Digital' : 'Physical')}
                    className="py-1 px-3 bg-brand-cyan text-black font-black text-[10px] uppercase rounded-full hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3 stroke-[2.5]" />
                    <span>ADD DETECTOR</span>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Pricing Math calculations and Checkout Call to Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#15151f] space-y-4 flex-shrink-0">
              
              {/* Promo code entry bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>ACTIVATE DISCOUNT CODE</span>
                  {couponApplied && (
                    <span className="text-brand-cyan text-[10px] font-black uppercase flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      <span>{couponApplied.code} Applied</span>
                    </span>
                  )}
                </div>

                {couponApplied ? (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-xs">
                    <div className="text-white">
                      <span className="font-bold block uppercase">{couponApplied.code} Activator</span>
                      <span className="text-[9px] text-gray-500 block">{couponApplied.description}</span>
                    </div>
                    <button 
                      onClick={() => onApplyCoupon(null)}
                      className="text-[10px] hover:underline font-bold text-red-400 uppercase"
                    >
                      Clear
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="ENTER VIP PROMO CODE"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 text-xs bg-[#0a0a0f] border border-white/10 text-white rounded-full focus:outline-none focus:border-[#BC00FF] uppercase"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-5 py-2.5 bg-[#BC00FF] text-white font-black text-xs uppercase tracking-widest rounded-full transition-all cursor-pointer"
                    >
                      APPLY
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-[10px] font-bold text-brand-pink flex items-center">
                    <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    <span>{promoError}</span>
                  </p>
                )}
              </div>

              {/* Mathematical Summary values */}
              <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-gray-400 font-medium">
                <div className="flex justify-between">
                  <span>Bag Subtotal:</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-brand-cyan">
                    <span>VIP Code Discount ({couponApplied.discount}%):</span>
                    <span className="font-mono">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Priority Secure Shipping:</span>
                  <span className="font-mono text-white">{deliveryCost === 0 ? 'FREE' : `$${deliveryCost}`}</span>
                </div>
                
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-white/5">
                  <span className="uppercase tracking-widest text-[#00f0ff] font-sans">Compounded Total:</span>
                  <span className="font-mono text-xl">${total}</span>
                </div>
              </div>

              {/* Ultimate Action Trigger */}
              <button
                onClick={onCheckout}
                className="w-full py-4 rounded-full bg-brand-cyan text-black italic font-black text-xs uppercase tracking-widest hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,240,255,0.45)] active:scale-95 transition-all text-center flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg shadow-brand-cyan/25"
                id="cart-checkout-btn"
              >
                <span>FRICTIONLESS CHECKOUT</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </button>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}
