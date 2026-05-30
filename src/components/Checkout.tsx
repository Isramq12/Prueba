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
  paypalEmail: string;
  cryptoNetwork: string;
  cryptoAddress: string;
  onDispatchEmail?: (recipient: string, subject: string, body: string) => void;
}

export default function Checkout({
  cartItems,
  couponApplied,
  onBackToCart,
  onClearCart,
  userEmail,
  onOrderCompleted,
  rewardPointsEarned,
  paypalEmail,
  cryptoNetwork,
  cryptoAddress,
  onDispatchEmail
}: CheckoutProps) {
  // Wizard panels
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentOption, setPaymentOption] = useState<'card' | 'paypal' | 'apple' | 'crypto'>('card');
  const [shippingMode, setShippingMode] = useState<'regular' | 'express'>('regular');

  // Simulation parameters for Paypal / Crypto Gateways
  const [isPaypalConnected, setIsPaypalConnected] = useState(false);
  const [paypalConnecting, setPaypalConnecting] = useState(false);
  const [cryptoTxHash, setCryptoTxHash] = useState('');
  const [cryptoVerifyState, setCryptoVerifyState] = useState<'idle' | 'verifying' | 'verified'>('idle');
  const [cryptoVerifyProgress, setCryptoVerifyProgress] = useState(0);

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

    if (paymentOption === 'paypal' && !isPaypalConnected) {
      alert(`PayPal Security Guard: Please complete sandbox validation and click "Simulate PayPal Authorization" under the merchant profile ${paypalEmail} before locking order.`);
      return;
    }

    if (paymentOption === 'crypto' && cryptoVerifyState !== 'verified') {
      alert(`Decentralized Mempool Guard: Please trigger Mempool validation and click "Verify Blockchain Ledger Transit" for ${cryptoNetwork} before placing order.`);
      return;
    }

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
      paymentMethod: paymentOption === 'card' 
        ? 'Visa *4444' 
        : paymentOption === 'paypal' 
          ? `PayPal (To: ${paypalEmail})` 
          : paymentOption === 'crypto' 
            ? `Crypto via ${cryptoNetwork} (To: ${cryptoAddress.substring(0, 8)}...)` 
            : 'Apple Pay'
    };

    setGeneratedOrder(orderObj);
    onClearCart();
    
    // Dispatch automated transactional cPanel email receipt!
    if (onDispatchEmail) {
      const itemsPurchased = cartItems.map(item => `${item.product.title} (${item.platformSelected} - ${item.formatSelected}) x${item.quantity}`).join('\n - ');
      const paymentBrand = paymentOption === 'card' 
        ? 'Credit Card (Visa *4444)'
        : paymentOption === 'paypal' 
          ? `PayPal Secure Profile (${paypalEmail})`
          : paymentOption === 'crypto' 
            ? `Decentralized Ledger Ledger (${cryptoNetwork} Address: ${cryptoAddress})`
            : 'Apple Pay Terminal';

      const emailBody = `Nexus Gaming Marketplace [Order Verified]

Greetings ${nameForm},

We have received your electronic settlement fund. Your game licensing parameters have compiled successfully and registered to node ${orderObj.id}.

INVOICE SUMMARY:
-----------------------------------------------------------
Order ID:       ${orderObj.id}
Date:           ${orderObj.date}
Payment Channel: ${paymentBrand}
Tracking Hash:  ${trackingRef}

ITEMS ACQUIRED:
 - ${itemsPurchased}

SUBTOTAL:       $${subtotal.toFixed(2)}
DISCOUNT VALUE: -$${discountVal.toFixed(2)}
SHIPPING VALUE: $${shippingCharge.toFixed(2)}
GRAND TOTAL:    $${grandTotal.toFixed(2)}
-----------------------------------------------------------

DIGITAL LICENSE KEYS REGISTERED IN VAULT:
Your unique system activation keys have initialized in your user profile:
 - Copy standard game license tickets under your 'Gamer Profile Dashboard' instantly to trace steam/console server restocks.

If physical hardware controllers or collectibles are included, secure cardboard transport containers deploy via standard priority next-day dispatch.

Regards,
Systems Dispatcher Node
cPanel SMTP Delivery Engine`;

      onDispatchEmail(emailForm, `Receipt Confirmation: Nexus Order #${orderObj.id}`, emailBody);
    }

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

          {/* Gateway settlement detail */}
          {generatedOrder.paymentMethod.includes('PayPal') && (
            <div className="mt-3 p-3.5 rounded-xl bg-purple-950/20 border border-purple-900/40 text-[10.5px] uppercase font-mono tracking-wider text-purple-300 text-left">
              ⚡ AUTHORIZED SECURE SANDBOX TRANSACTION DISPATCHED TO MERCHANT EMAIL: <span className="text-white select-all font-bold">{paypalEmail}</span>
            </div>
          )}
          {generatedOrder.paymentMethod.includes('Crypto') && (
            <div className="mt-3 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-[10.5px] text-left font-mono tracking-wider text-brand-cyan space-y-1 bg-black/40">
              <span className="block font-sans text-[9px] text-[#00f0ff] font-bold uppercase tracking-widest">⛓️ DECENTRALIZED MEMPOOL TRANSACTION CONFIRMED ON LEDGERS:</span>
              <div className="space-y-0.5">
                <p>BLOCK TRANSIT NETWORK: <span className="text-white font-bold">{cryptoNetwork}</span></p>
                <p>RECEIVING DESTINATION NODE: <span className="text-white select-all font-bold">{cryptoAddress}</span></p>
                {cryptoTxHash && <p className="truncate">TRANSIT TxHash ID: <span className="text-white select-all font-bold">{cryptoTxHash}</span></p>}
              </div>
            </div>
          )}
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

            {/* Selector methods icons with responsive grid-cols-4 and custom styling */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => setPaymentOption('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'card' ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white font-bold' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <CreditCard className="h-5 w-5 text-[#00f0ff] mb-1.5" />
                <span className="text-[9px] uppercase font-black tracking-widest">BANK CARD</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('paypal')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'paypal' ? 'border-[#BC00FF] bg-[#BC00FF]/15 text-white font-bold shadow-[0_0_12px_rgba(188,0,255,0.1)]' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <div className="h-5 w-5 rounded-full bg-[#BC00FF]/25 flex items-center justify-center mb-1.5 font-bold">
                  <span className="text-[10px] font-black text-[#BC00FF] font-sans">PP</span>
                </div>
                <span className="text-[9px] uppercase font-black tracking-widest">PAYPAL</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('crypto')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'crypto' ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-white font-bold shadow-[0_0_12px_rgba(0,240,255,0.1)]' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <div className="h-5 w-5 rounded-full bg-[#00F0FF]/25 flex items-center justify-center mb-1.5 animate-pulse">
                  <span className="text-[10px] font-mono font-black text-[#00F0FF]">₿</span>
                </div>
                <span className="text-[9px] uppercase font-black tracking-widest">CRYPTO</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentOption('apple')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${
                  paymentOption === 'apple' ? 'border-brand-pink bg-brand-pink/10 text-white font-bold' : 'border-white/5 text-gray-400 bg-[#15151f]'
                }`}
              >
                <Smartphone className="h-5 w-5 text-brand-pink mb-1.5" />
                <span className="text-[9px] uppercase font-black tracking-widest">APPLE PAY</span>
              </button>
            </div>

            {/* Custom Payment Inner interfaces */}
            {paymentOption === 'card' && (
              <div className="space-y-3 pt-3 text-left">
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

                <div className="grid grid-cols-2 gap-3 pb-1">
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
            )}

            {paymentOption === 'paypal' && (
              <div className="p-5 rounded-2xl bg-[#0b0b13] border border-white/5 text-left space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest block">PAYPAL GATEWAY MAPPED COORD</span>
                  <p className="text-[11px] text-gray-300">
                    Settlements flow directly to your store's verified PayPal receiver coordinate:
                  </p>
                  <div className="p-2.5 bg-black/60 rounded-xl font-mono text-white text-xs block border border-white/5 sm:flex sm:items-center sm:justify-between select-all">
                    <span>{paypalEmail}</span>
                    <span className="text-[9px] font-bold rounded bg-purple-950 text-[#BC00FF] px-1.5 py-0.5 border border-purple-900/40 uppercase tracking-widest mt-1 sm:mt-0 font-sans">
                      VERIFIED MERCH
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  {paypalConnecting ? (
                    <div className="flex items-center justify-center space-x-2 py-3 bg-[#15151f] rounded-full border border-white/5 text-xs text-purple-400 uppercase tracking-wider">
                      <div className="w-4 h-4 rounded-full border-2 border-[#BC00FF] border-t-transparent animate-spin"></div>
                      <span>Connecting Sandbox Tunnel...</span>
                    </div>
                  ) : isPaypalConnected ? (
                    <div className="space-y-2 text-center text-xs p-3 rounded-xl border border-emerald-950 bg-emerald-950/25 text-emerald-400 font-mono tracking-wide">
                      <p className="font-bold flex items-center justify-center gap-1.5 uppercase font-sans">
                        <span>● MOCK PAYPAL ACCOUNT AUTHORIZED</span>
                      </p>
                      <p className="text-[10px] text-gray-400 uppercase font-sans tracking-wide">
                        Connected. Ready to execute secure instant settlement of ${grandTotal} USD.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setPaypalConnecting(true);
                        setTimeout(() => {
                          setPaypalConnecting(false);
                          setIsPaypalConnected(true);
                        }, 1200);
                      }}
                      className="w-full py-2.5 rounded-full bg-[#BC00FF] hover:bg-white text-black font-black uppercase text-[10px] tracking-widest cursor-pointer transition-all active:scale-98 text-center"
                    >
                      Simulate PayPal Authorization
                    </button>
                  )}
                </div>
              </div>
            )}

            {paymentOption === 'crypto' && (
              <div className="p-5 rounded-2xl bg-[#0b0b13] border border-white/5 text-left space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-black text-brand-cyan uppercase tracking-widest block">DECENTRALIZED NODE TRANSPORTS</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-black/50 p-3 rounded-2xl border border-white/5 font-mono">
                    <div>
                      <span className="text-[8.5px] text-gray-500 uppercase block tracking-wider mb-0.5">NETWORKS TARGET:</span>
                      <span className="text-white font-bold font-sans tracking-wide text-[11px] block">{cryptoNetwork}</span>
                    </div>
                    <div>
                      <span className="text-[8.5px] text-gray-500 uppercase block tracking-wider mb-0.5">RECEIVER HASH:</span>
                      <span className="text-brand-cyan block truncate select-all text-[11.5px]" title={cryptoAddress}>{cryptoAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-end gap-2 text-xs">
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline mb-1">
                        <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block animate-pulse">
                          Transaction Hash (TxHash)
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const newHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
                            setCryptoTxHash(newHash);
                            setCryptoVerifyState('idle');
                          }}
                          className="text-[9px] text-brand-cyan uppercase font-bold hover:underline cursor-pointer"
                        >
                          Generate demo hash
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={cryptoTxHash}
                        onChange={(e) => {
                          setCryptoTxHash(e.target.value);
                          if(cryptoVerifyState === 'verified') setCryptoVerifyState('idle');
                        }}
                        placeholder="e.g. 0xf83d9cbb281...cb9e2"
                        className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/10 text-white rounded-full focus:outline-none"
                      />
                    </div>
                  </div>

                  {cryptoVerifyState === 'verifying' ? (
                    <div className="space-y-2 p-3 rounded-xl border border-white/5 bg-black/60 font-mono text-[10px] text-gray-400">
                      <div className="flex justify-between font-bold uppercase tracking-wide text-[9px] text-[#00f0ff]">
                        <span>Scanning Meme Pool Node...</span>
                        <span>{cryptoVerifyProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-100"
                          style={{ width: `${cryptoVerifyProgress}%` }}
                        ></div>
                      </div>
                      <p className="animate-pulse text-[9px]">Awaiting confirmations (Block node depth verification active)...</p>
                    </div>
                  ) : cryptoVerifyState === 'verified' ? (
                    <div className="p-3.5 rounded-xl border border-emerald-950 bg-emerald-950/20 text-emerald-400 font-mono text-[10.5px] space-y-1">
                      <span className="font-bold flex items-center gap-1.5 uppercase font-sans text-xs text-white">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                        TRANSACTION CONFIRMED LIVE
                      </span>
                      <p className="text-[9.5px] text-gray-400 uppercase font-sans">
                        Blockchain snapshot verification received. Funds registered in store transit logs safely.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        if (!cryptoTxHash) {
                          alert("Please paste a block transaction hash or click 'Generate demo hash' first to trace the ledger!");
                          return;
                        }
                        setCryptoVerifyState('verifying');
                        setCryptoVerifyProgress(0);
                        let progress = 0;
                        const interval = setInterval(() => {
                          progress += 20;
                          setCryptoVerifyProgress(progress);
                          if (progress >= 100) {
                            clearInterval(interval);
                            setCryptoVerifyState('verified');
                          }
                        }, 250);
                      }}
                      className="w-full py-2.5 rounded-full bg-brand-cyan hover:bg-white text-black font-black uppercase text-[10px] tracking-widest cursor-pointer transition-all active:scale-98 text-center"
                    >
                      Verify Blockchain Ledger Transit
                    </button>
                  )}
                </div>
              </div>
            )}

            {paymentOption === 'apple' && (
              <div className="p-5 rounded-2xl bg-[#0b0b13] border border-white/5 text-center space-y-3.5">
                <span className="font-sans font-bold text-xs text-white uppercase tracking-widest block"> Pay Authentication</span>
                <p className="text-xs text-gray-400 leading-normal max-w-sm mx-auto uppercase tracking-wide text-[10px]">
                  Double-tap side trigger on Apple devices or face ID scan to instant purchase. Mapped secure token transit is automated on place order.
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
