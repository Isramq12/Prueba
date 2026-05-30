import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, CreditCard, ShoppingBag, Gift, Truck, CheckCircle, Smartphone, AlertCircle } from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  couponApplied: Coupon | null;
  onBackToCart: () => void;
  onClearCart: () => void;
  userEmail: string;
  onOrderCompleted: (orderObj: any) => void;
  rewardPointsEarned: number;
}

export default function Checkout({
  cartItems,
  couponApplied,
  onBackToCart,
  onClearCart,
  userEmail,
  onOrderCompleted,
  rewardPointsEarned
}: CheckoutProps) {
  // Wizard panels
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentOption, setPaymentOption] = useState<'card' | 'paypal' | 'apple'>('card');
  const [shippingMode, setShippingMode] = useState<'regular' | 'express'>('regular');

  // Input states
  const [emailForm, setEmailForm] = useState(userEmail || 'gamer@nexusm.com');
  const [nameForm, setNameForm] = useState('Alexander Mercer');
  const [addressForm, setAddressForm] = useState('101 Cyber Expressway, Suite 404');
  const [cityForm, setCityForm] = useState('Neo Miami');
  const [zipForm, setZipForm] = useState('33101');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('09/29');
  const [cardCvv, setCardCvv] = useState('420');

  // Completed order stats holder
  const [generatedOrder, setGeneratedOrder] = useState<any>(null);

  // Math totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountVal = couponApplied ? Number((subtotal * (couponApplied.discount / 100)).toFixed(2)) : 0;
  const shippingCharge = subtotal >= 100 ? 0 : (shippingMode === 'express' ? 14.99 : 9.99);
  const grandTotal = Number((subtotal - discountVal + shippingCharge).toFixed(2));

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Create a random order reference ID
    const trackingRef = 'NX-' + Math.floor(100000 + Math.random() * 900000);
    const orderObj = {
      id: 'ORD-' + Math.floor(50000 + Math.random() * 50000),
      date: new Date().toISOString().split('T')[0],
      products: cartItems.map(item => ({
        productId: item.product.id,
        title: item.product.title,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        platform: item.platformSelected,
        format: item.formatSelected
      })),
      subtotal: subtotal,
      discount: discountVal,
      shipping: shippingCharge,
      total: grandTotal,
      status: 'Processing' as const,
      trackingNumber: trackingRef,
      paymentMethod: paymentOption === 'card' ? 'Visa *444' : paymentOption === 'paypal' ? 'PayPal' : 'Apple Pay'
    };

    setGeneratedOrder(orderObj);
    onOrderCompleted(orderObj);
    setStep('success');
  };

  if (step === 'success' && generatedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center gaming-grid" id="checkout-success-view">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-cyan/20 border border-brand-cyan mb-6 animate-bounce">
          <CheckCircle className="h-8 w-8 text-brand-cyan" />
        </div>

        <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">ORDER SECURED! VAULT ACCESSED</h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto mb-8 uppercase tracking-wider text-[10px]">
          Thank you for shopping at Nexus. Your purchase keys have been registered on your account and credentials dispatched immediately.
        </p>

        {/* Order specs overview details card */}
        <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 text-left space-y-4 mb-8">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
            <div>
              <span className="text-gray-500 uppercase block tracking-widest text-[9px] font-bold">Purchase Reference:</span>
              <span className="font-bold font-mono text-white text-sm">{generatedOrder.id}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-500 uppercase block tracking-widest text-[9px] font-bold">Dispatch Tracking ID:</span>
              <span className="font-bold font-mono text-brand-cyan text-sm">{generatedOrder.trackingNumber}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {generatedOrder.products.map((p: any, i: number) => (
              <div key={i} className="flex justify-between font-medium">
                <span className="text-gray-300 uppercase truncate max-w-xs">{p.title} <span className="text-brand-purple font-mono">x{p.quantity}</span></span>
                <span className="text-white font-mono">${(p.price * p.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Gamified point notification */}
          <div className="p-3.5 rounded-xl bg-amber-950/15 border border-amber-900/30 flex items-center space-x-3">
            <Gift className="h-6 w-6 text-amber-400 animate-pulse shrink-0" />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">VIP LOYALTY SURGE</span>
              <p className="text-xs text-white">
                You loaded <span className="font-mono font-black text-amber-300">+{rewardPointsEarned}</span> XP points! Your overall rank tier balance has been updated.
              </p>
            </div>
          </div>

          {/* Financial calculations summary */}
          <div className="pt-3 border-t border-white/10 flex justify-between items-baseline text-xs text-gray-500">
            <span>Summary: Subtotal: ${generatedOrder.subtotal.toFixed(2)} | Discount: -${generatedOrder.discount.toFixed(2)} | Delivery: ${generatedOrder.shipping === 0 ? 'FREE' : `$${generatedOrder.shipping}`}</span>
            <div className="text-right text-sm text-white font-black font-mono">
              Total Charge: ${generatedOrder.total}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onClearCart();
            window.location.reload(); // reset back to homepage
          }}
          className="px-8 py-4 rounded-full bg-brand-cyan text-black font-black text-xs uppercase tracking-widest hover:scale-105 transition-all outline-none cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.35)]"
        >
          Return to Hub Storefront
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="one-page-checkout">
      
      {/* Title */}
      <div className="flex items-center space-x-3 mb-8">
        <button
          onClick={onBackToCart}
          className="p-3.5 rounded-full border border-white/10 bg-[#0a0a0f] hover:bg-white/5 hover:text-white text-gray-400 transition-colors cursor-pointer"
          title="Return to Bag"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
        </button>
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">FAST-TRACK SECURE CHECKOUT</h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest text-[9px] mt-0.5">Review your payment details and activate authentic game licenses</p>
        </div>
      </div>

      <form onSubmit={handleProcessOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: address and inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/10 pb-2">
              1. CONTACT INFORMATION
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Gamer Email Address</label>
                <input
                  type="email"
                  required
                  value={emailForm}
                  onChange={(e) => setEmailForm(e.target.value)}
                  className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-brand-purple"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={nameForm}
                  onChange={(e) => setNameForm(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/10 pb-2">
              2. SHIPPING INFORMATION
            </h3>

            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Street Address</label>
              <input
                type="text"
                required
                value={addressForm}
                onChange={(e) => setAddressForm(e.target.value)}
                className="w-full text-xs px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-brand-purple"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">City Metro</label>
                <input
                  type="text"
                  required
                  value={cityForm}
                  onChange={(e) => setCityForm(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-brand-purple"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Postal Zip Code</label>
                <input
                  type="text"
                  required
                  value={zipForm}
                  onChange={(e) => setZipForm(e.target.value)}
                  className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-brand-purple"
                />
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">DELIVERY MODE</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShippingMode('regular')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    shippingMode === 'regular' ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-white/5 text-gray-400 bg-[#15151f]'
                  }`}
                >
                  <span className="text-xs font-bold uppercase block">Regular Delivery</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">3-5 days delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMode('express')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    shippingMode === 'express' ? 'border-[#00f0ff] bg-brand-cyan/10 text-white' : 'border-white/5 text-gray-400 bg-[#15151f]'
                  }`}
                >
                  <span className="text-xs font-bold uppercase block">Express Dispatch</span>
                  <span className="text-[9px] text-gray-500 block mt-0.5">Next-day guaranteed dispatch</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 space-y-4">
            
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                3. ENCRYPTED PAYMENT GATE
              </h3>
              <div className="flex items-center text-gray-500 text-[10px] space-x-1 uppercase tracking-widest">
                <Lock className="h-3 w-3 text-brand-cyan" />
                <span>256-Bit SSL</span>
              </div>
            </div>

            {/* Selector methods icons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption('card')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'card' ? 'border-brand-cyan bg-brand-cyan/10 text-white font-bold' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <CreditCard className="h-5 w-5 text-brand-cyan mb-1.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">BANK CARD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('paypal')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'paypal' ? 'border-[#BC00FF] bg-[#BC00FF]/10 text-white font-bold' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <Gift className="h-5 w-5 text-[#BC00FF] mb-1.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">PAYPAL</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('apple')}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'apple' ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <Smartphone className="h-5 w-5 text-brand-pink mb-1.5" />
                <span className="text-[10px] uppercase font-bold tracking-wider">APPLE PAY</span>
              </button>
            </div>

            {paymentOption === 'card' ? (
              <div className="space-y-3 pt-3">
                <div>
                  <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Credit Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Exp Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1.5">Security CVV</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-black border border-white/5 text-center py-6">
                <p className="text-xs text-gray-400">
                  Clicking "Authorize & Place Order" will mount an external authenticating popup interface to authorize your credentials securely.
                </p>
              </div>
            )}

          </div>

        </div>

        {/* Right column: cart summaries side review */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/10 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest text-white border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
              <span>SELECTED LOOT BAG</span>
              <span className="font-mono text-gray-500 font-bold">({cartItems.length} SLOTS)</span>
            </h3>

            {/* List items */}
            <div className="max-h-64 overflow-y-auto space-y-3 mb-4">
              {cartItems.map((item, id) => (
                <div key={id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center space-x-2 truncate pr-4">
                    <img src={item.product.image} className="h-8 w-8 rounded object-cover border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                    <div className="truncate">
                      <span className="font-bold text-white block truncate uppercase">{item.product.title}</span>
                      <span className="text-[9px] text-brand-cyan tracking-widest font-bold uppercase">{item.platformSelected} • {item.formatSelected}</span>
                    </div>
                  </div>
                  
                  <span className="font-mono font-bold shrink-0 text-white leading-none">
                    {item.quantity}x @ ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-gray-400 font-medium font-sans">
              <div className="flex justify-between">
                <span>Subtotal items:</span>
                <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-brand-cyan">
                  <span>Activated Code discount ({couponApplied.discount}%):</span>
                  <span className="font-mono">-${discountVal}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping fee:</span>
                <span className="font-mono text-white">{shippingCharge === 0 ? 'FREE' : `$${shippingCharge}`}</span>
              </div>
              
              <div className="p-3 bg-amber-950/10 border border-amber-900/30 rounded-xl flex items-center justify-between mt-3">
                <div className="text-left">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 block">XP points rewards</span>
                  <p className="text-[11px] text-gray-300">Awarded on final order</p>
                </div>
                <span className="font-mono text-amber-400 text-sm font-black animate-pulse">+{rewardPointsEarned} XP</span>
              </div>

              <div className="flex justify-between items-baseline pt-3 text-white border-t border-white/10">
                <span className="text-sm font-black uppercase tracking-widest text-[#00f0ff] italic">CONSOLIDATED PRICE:</span>
                <span className="font-mono text-2xl font-black">${grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-4 rounded-full bg-brand-cyan hover:bg-white text-black italic font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-cyan/25 active:scale-95 text-center flex items-center justify-center space-x-1.5"
              id="checkout-finalize-btn"
            >
              <span>PLACE SECURE ORDER</span>
            </button>

            <div className="flex items-center justify-center space-x-1 text-[10px] text-gray-500 uppercase tracking-wider mt-4">
              <Shield className="h-3.5 w-3.5 text-brand-cyan" />
              <span>SSL CERTIFIED PCI-DSS COMPLIANT INTERACTION</span>
            </div>
          </div>

        </div>

      </form>

    </section>
  );
}
