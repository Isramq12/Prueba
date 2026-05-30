import React, { useState, useEffect } from 'react';
import { 
  Trophy, Star, ShieldCheck, Mail, Facebook, Twitter, Instagram, Youtube, 
  Gamepad2, Sparkles, Volume2, HelpCircle, Truck, Heart, ArrowRight, BookOpen, AlertCircle, CheckCircle, Flame, Clock
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductPage from './components/ProductPage';
import SlideOutCart from './components/SlideOutCart';
import Checkout from './components/Checkout';
import UserAccount from './components/UserAccount';
import AdminDashboard from './components/AdminDashboard';
import BlogSection from './components/BlogSection';
import CommunitySection from './components/CommunitySection';

import { Product, CartItem, UserProfile, Order, Review, DiscussionThread, Coupon, Platform, BlogPost } from './types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS, INITIAL_REVIEWS, INITIAL_DISCUSSIONS } from './data';

export default function App() {
  // Views navigation
  const [currentView, setCurrentView] = useState<'store' | 'blogs' | 'community' | 'account' | 'admin'>('store');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);

  // Search and Platform filter hooks
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<Platform | 'All'>('All');

  // Core Persistent states with local storage backup
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_inventory');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nexus_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('nexus_profile');
    if (saved) return JSON.parse(saved);

    // Seed default gamer profile with provided email metadata
    return {
      name: 'Alexander Mercer',
      email: 'israjets1278@gmail.com',
      membershipStatus: 'Basic',
      loyalty: {
        level: 'Rookie',
        points: 450,
        pointsToNextLevel: 550,
        lifetimeSpend: 120.50,
        exclusiveDiscounts: ['NEXUS10']
      },
      savedAddresses: ['101 Cyber Expressway, Suite 404, Neo Miami, FL'],
      savedPaymentMethods: [{ cardBrand: 'Visa', last4: '4444' }],
      wishlist: ['1', '3']
    };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nexus_orders');
    if (saved) return JSON.parse(saved);
    
    // Seed default transactions logs
    return [
      {
        id: 'ORD-88122',
        date: '2026-05-15',
        products: [
          {
            productId: '6',
            title: 'Nexus X-Pro Wireless Controller',
            image: 'https://images.unsplash.com/photo-1600080972464-8e5f3580211e?auto=format&fit=crop&q=80&w=800',
            price: 89.99,
            quantity: 1,
            platform: 'Accessories' as const,
            format: 'Physical' as const
          }
        ],
        subtotal: 89.99,
        discount: 0,
        shipping: 9.99,
        total: 99.98,
        status: 'Delivered' as const,
        trackingNumber: 'NX-998812',
        paymentMethod: 'Visa *4444'
      }
    ];
  });

  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nexus_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [discussions, setDiscussions] = useState<DiscussionThread[]>(() => {
    const saved = localStorage.getItem('nexus_discussions');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [couponApplied, setCouponApplied] = useState<Coupon | null>(null);

  // Global Alerts system notifier
  const [globalAlert, setGlobalAlert] = useState<{ message: string; type: 'success' | 'warn' } | null>(null);

  // Flash sales Countdown State (2h 44m remaining for urgency)
  const [flashTime, setFlashTime] = useState({ hours: 2, minutes: 44, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashTime(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 }; // wrap
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync to localStorages
  useEffect(() => {
    localStorage.setItem('nexus_inventory', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nexus_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nexus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexus_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nexus_discussions', JSON.stringify(discussions));
  }, [discussions]);

  // Gateway credentials from Admin Setup panel
  const [paypalEmail, setPaypalEmail] = useState(() => {
    return localStorage.getItem('local_nexus_paypal_email') || 'israjets1278@gmail.com';
  });
  const [cryptoNetwork, setCryptoNetwork] = useState(() => {
    return localStorage.getItem('local_nexus_crypto_network') || 'USDT (TRC-20)';
  });
  const [cryptoAddress, setCryptoAddress] = useState(() => {
    return localStorage.getItem('local_nexus_crypto_address') || '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
  });

  useEffect(() => {
    localStorage.setItem('local_nexus_paypal_email', paypalEmail);
  }, [paypalEmail]);

  useEffect(() => {
    localStorage.setItem('local_nexus_crypto_network', cryptoNetwork);
  }, [cryptoNetwork]);

  useEffect(() => {
    localStorage.setItem('local_nexus_crypto_address', cryptoAddress);
  }, [cryptoAddress]);

  // cPanel SMTP configuration states
  const [cpanelDomain, setCpanelDomain] = useState(() => {
    return localStorage.getItem('local_cpanel_domain') || 'israjets1278.com';
  });
  const [cpanelEmail, setCpanelEmail] = useState(() => {
    return localStorage.getItem('local_cpanel_email') || 'no-reply@israjets1278.com';
  });
  const [cpanelSmtpHost, setCpanelSmtpHost] = useState(() => {
    return localStorage.getItem('local_cpanel_smtp_host') || 'mail.israjets1278.com';
  });
  const [cpanelSmtpPort, setCpanelSmtpPort] = useState(() => {
    return localStorage.getItem('local_cpanel_smtp_port') || '465';
  });

  // Admin access authorization logic
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('local_admin_logged_in') === 'true';
  });

  // Outbound Email logs queue
  const [outboundEmails, setOutboundEmails] = useState<any[]>(() => {
    const raw = localStorage.getItem('local_nexus_smtp_logs');
    if (raw) return JSON.parse(raw);
    
    // Default welcome email log for israjets1278@gmail.com to demonstrate integration immediately!
    return [
      {
        id: 'TX-90112',
        sender: 'no-reply@israjets1278.com',
        recipient: 'israjets1278@gmail.com',
        subject: 'Welcome to the Nexus Lobby - Verification & Member Perks Locked',
        body: `Greetings Alexander Mercer [israjets1278@gmail.com],

Your gamer identity has integrated successfully with our systems pipeline using SMTP secure SSL validation.

MEMBERSHIP ENHANCEMENTS LOCKED:
 - Your account tier: VIP Premium Multiplier Pass
 - Core server node: DX-81ef7e47
 - Registration welcome bonus currency: +500 Loyalty XP Points loaded!

Use the custom promotional coupon "VIPFREE" to achieve solid 15% fee reductions across checkout platforms.

Thank you for selecting Nexus,
cPanel Outbox Daemon Node`,
        timestamp: new Date(Date.now() - 3600000).toLocaleString(),
        gateway: 'mail.israjets1278.com:465'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('local_cpanel_domain', cpanelDomain);
  }, [cpanelDomain]);

  useEffect(() => {
    localStorage.setItem('local_cpanel_email', cpanelEmail);
  }, [cpanelEmail]);

  useEffect(() => {
    localStorage.setItem('local_cpanel_smtp_host', cpanelSmtpHost);
  }, [cpanelSmtpHost]);

  useEffect(() => {
    localStorage.setItem('local_cpanel_smtp_port', cpanelSmtpPort);
  }, [cpanelSmtpPort]);

  useEffect(() => {
    localStorage.setItem('local_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  useEffect(() => {
    localStorage.setItem('local_nexus_smtp_logs', JSON.stringify(outboundEmails));
  }, [outboundEmails]);

  // Alert dismiss helper
  const triggerAlert = (message: string, type: 'success' | 'warn' = 'success') => {
    setGlobalAlert({ message, type });
    setTimeout(() => setGlobalAlert(null), 3500);
  };

  // Transaction SMTP log dispatcher
  const handleDispatchEmail = (recipient: string, subject: string, body: string) => {
    const newMailLog = {
      id: 'TX-' + Math.floor(10000 + Math.random() * 90000),
      sender: cpanelEmail,
      recipient: recipient,
      subject: subject,
      body: body,
      timestamp: new Date().toLocaleString(),
      gateway: `${cpanelSmtpHost}:${cpanelSmtpPort}`
    };

    setOutboundEmails(prev => [newMailLog, ...prev]);

    // Display beautiful notification bar alert
    triggerAlert(`SMTP Transmission Fired To: ${recipient}!`, 'success');
  };

  // Sign Up / Change Gamer Profile trigger
  const handleSignUpOrSwitch = (name: string, email: string, tier: 'Basic' | 'Premium VIP') => {
    const freshProfile = {
      name,
      email,
      membership: tier === 'Basic' ? 'Starter Account' : 'Legendary VIP Elite',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150',
      loyaltyLevel: tier === 'Basic' ? 'Elite' : 'Legend',
      loyaltyPoints: tier === 'Basic' ? 350 : 2500,
      savedAddresses: ['101 Cyber Expressway']
    };

    setUser(freshProfile);
    triggerAlert(`Gamer Profile synchronized with ${email}! Initialized ${tier === 'Basic' ? '350' : '2500'} XP.`, 'success');

    // Trigger SMTP Welcome email for the new user!
    const welcomeSubject = `Welcome to the Nexus Lobby - Verification & Member Perks Locked`;
    const welcomeBody = `Greetings ${name},

Your player node credential (${email}) is verified. Welcome to our gaming portal.

MEMBERSHIP PASS ACQUIRED:
 - Assigned Group: ${tier === 'Basic' ? 'Starter Account Pro Node' : 'Legendary VIP Elite Member (Double XP active)'}
 - Base Loyalty Balance: ${tier === 'Basic' ? '350' : '2500'} XP Loyalty Points
 - Verification IP: Passed Auth DNS check

Load the level codes at Account Column: "LEGEND25" (25% off) or "NEXUS10" (10% off) inside Checkout Wizard to access physical disc cases and accessories with premium speed shipping.

Cheers,
System Admin
Nexus Dispatch Terminal`;

    handleDispatchEmail(email, welcomeSubject, welcomeBody);
  };

  // Cart operations
  const handleAddToCart = (product: Product, qty: number, platform: Platform, format: 'Digital' | 'Physical') => {
    if (product.stock === 0 && !product.isPreOrder) {
      triggerAlert('Sorry, this physical item is temporarily out of stock!', 'warn');
      return;
    }

    setCart(prev => {
      const existingIdx = prev.findIndex(item => 
        item.product.id === product.id && 
        item.platformSelected === platform && 
        item.formatSelected === format
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = { ...copy[existingIdx], quantity: copy[existingIdx].quantity + qty };
        return copy;
      }

      return [...prev, { product, quantity: qty, platformSelected: platform, formatSelected: format }];
    });

    triggerAlert(`Slot Loaded: Added ${product.title} (${platform}) to Bag!`);
  };

  const handleUpdateCartQuantity = (id: string, platform: Platform, format: 'Digital' | 'Physical', newQty: number) => {
    if (newQty < 1) {
      handleRemoveCartItem(id, platform, format);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.product.id === id && item.platformSelected === platform && item.formatSelected === format) 
        ? { ...item, quantity: newQty } 
        : item
    ));
  };

  const handleRemoveCartItem = (id: string, platform: Platform, format: 'Digital' | 'Physical') => {
    setCart(prev => prev.filter(item => 
      !(item.product.id === id && item.platformSelected === platform && item.formatSelected === format)
    ));
    triggerAlert('Slot emptied: Item removed from bag.', 'warn');
  };

  const handleToggleWishlist = (productId: string) => {
    setUser(prev => {
      const isWishlisted = prev.wishlist.includes(productId);
      const updatedWishlist = isWishlisted 
        ? prev.wishlist.filter(id => id !== productId)
        : [...prev.wishlist, productId];

      if (isWishlisted) {
        triggerAlert('Removed item from your wishlist archive.', 'warn');
      } else {
        triggerAlert('Added item to your verified VIP wishlist!');
      }

      return { ...prev, wishlist: updatedWishlist };
    });
  };

  const cartCount = cart.reduce((tot, item) => tot + item.quantity, 0);
  const cartTotal = cart.reduce((tot, item) => tot + (item.product.price * item.quantity), 0);

  // Math calculated Loyalty points to earn: 1 point for every $0.10 spent!
  const calculatePointsToEarn = Math.floor(cartTotal * 10);

  const handleOrderCompleted = (orderObj: Order) => {
    setOrders(prev => [orderObj, ...prev]);
    
    // Upgrade user stats and award loyalty ladder rewards!
    setUser(prev => {
      const addedPoints = Math.floor(orderObj.total * 10);
      const newTotalPoints = prev.loyalty.points + addedPoints;
      
      // Determine new Gamified Level
      let level: 'Rookie' | 'Veteran' | 'Elite' | 'Legend' = prev.loyalty.level;
      if (newTotalPoints >= 3000) {
        level = 'Legend';
      } else if (newTotalPoints >= 1800) {
        level = 'Elite';
      } else if (newTotalPoints >= 800) {
        level = 'Veteran';
      }

      const pointsToNext = Math.max(0, 3000 - newTotalPoints);

      return {
        ...prev,
        loyalty: {
          level: level,
          points: newTotalPoints,
          pointsToNextLevel: pointsToNext,
          lifetimeSpend: prev.loyalty.lifetimeSpend + orderObj.total,
          exclusiveDiscounts: level === 'Legend' ? ['NEXUS10', 'LEGEND25'] : ['NEXUS10']
        }
      };
    });

    setCart([]);
    setCouponApplied(null);
  };

  // Admin capabilities
  const handleAddProductAdmin = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    triggerAlert(`Database Updated: Published "${newProd.title}" successfully!`);
  };

  const handleUpdateStockAdmin = (id: string, qty: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: qty } : p));
  };

  const handleDeleteProductAdmin = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    triggerAlert('Catalog updated: Product node purged from records.', 'warn');
  };

  // Community discussion forum handlers
  const handleAddNewThread = (title: string, author: string, category: any) => {
    const threadNode: DiscussionThread = {
      id: 'd' + (discussions.length + 1),
      title: title,
      author: author,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
      replies: 0,
      views: 1,
      lastActive: 'Just now',
      category: category
    };
    setDiscussions(prev => [threadNode, ...prev]);
    triggerAlert('Lounge Thread mounted successfully!');
  };

  const handleAddNewReview = (productId: string, productName: string, author: string, rating: number, comment: string) => {
    const reviewNode: Review = {
      id: 'r' + (reviews.length + 1),
      productId: productId,
      productName: productName,
      author: author,
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      comment: comment,
      verified: true,
      likes: 0
    };
    setReviews(prev => [reviewNode, ...prev]);
    triggerAlert('Verified Critique published successfully!');
  };

  // Upgrade Membership trigger
  const handleUpgradeUserMembership = () => {
    setUser(prev => ({
      ...prev,
      membershipStatus: 'Premium VIP'
    }));
    triggerAlert('Vault upgraded! You are now a Premium VIP member.');
  };

  // Filter deals and best sellers
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const flashDeals = products.filter(p => p.isDeal).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 flex flex-col justify-between" id="nexus-gaming-web-root">
      
      {/* Global Dual Portal HUD Switchbar */}
      <div className="bg-[#0b0b13] border-b border-white/5 py-2.5 px-4 shadow-[0_1px_5px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] tracking-widest font-bold">
          <div className="flex items-center space-x-2 text-gray-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse"></span>
            <span>NEXUS REAL-TIME PORTS : LIVE TRANSIT ACTIVE</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-black border border-white/5 rounded-full p-0.5">
            <button
              onClick={() => {
                setCurrentView('store');
                setCheckoutMode(false);
                setSelectedProduct(null);
              }}
              className={`px-4 py-1.5 rounded-full uppercase transition-all duration-300 text-[10px] font-black tracking-widest cursor-pointer ${
                currentView !== 'admin'
                  ? 'bg-gradient-to-r from-brand-cyan/25 to-brand-purple/25 text-brand-cyan border border-brand-cyan/35 shadow-[0_0_8px_rgba(0,240,255,0.15)]'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              CUSTOMER / CX PORTAL
            </button>
            <button
              onClick={() => {
                setCurrentView('admin');
                setCheckoutMode(false);
                setSelectedProduct(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full uppercase transition-all duration-300 text-[10px] font-black tracking-widest cursor-pointer ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-brand-pink/25 to-purple-950/25 text-brand-pink border border-brand-pink/35 shadow-[0_0_8px_rgba(255,0,127,0.15)]'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              SYSTEM ADMIN PORTAL
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic alert banner top of screen */}
      {globalAlert && (
        <div className={`fixed bottom-5 left-5 z-50 p-4 rounded-xl flex items-center space-x-3 text-white shadow-2xl border ${
          globalAlert.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500 shadow-emerald-950/20' 
            : 'bg-brand-pink/90 border-brand-pink shadow-red-950/20'
        }`}>
          {globalAlert.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-brand-pink shrink-0 animate-pulse" />
          )}
          <span className="text-xs font-bold uppercase tracking-wider">{globalAlert.message}</span>
        </div>
      )}

      {/* Primary Navigation System */}
      <Navbar
        currentView={currentView}
        onChangeView={(view) => {
          setCurrentView(view);
          setSelectedProduct(null);
          setCheckoutMode(false);
        }}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setCartOpen(true)}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setSelectedPlatformFilter('All');
        }}
        selectedPlatformFilter={selectedPlatformFilter}
        onPlatformFilterChange={(plat) => {
          setSelectedPlatformFilter(plat);
          setSearchQuery('');
        }}
      />

      {/* Hero module rendered on main storefront, but hidden if filters/search are active or inside detailed view */}
      {currentView === 'store' && !selectedProduct && !checkoutMode && searchQuery === '' && selectedPlatformFilter === 'All' && (
        <Hero
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onBrowseDeals={() => setSelectedPlatformFilter('All')}
          onBrowsePreorders={() => setSelectedPlatformFilter('All')}
        />
      )}

      {/* Main Container View Controller */}
      <main className="flex-grow">
        
        {checkoutMode ? (
          <Checkout
            cartItems={cart}
            couponApplied={couponApplied}
            onBackToCart={() => setCheckoutMode(false)}
            onClearCart={() => setCart([])}
            userEmail={user.email}
            onOrderCompleted={handleOrderCompleted}
            rewardPointsEarned={calculatePointsToEarn}
            paypalEmail={paypalEmail}
            cryptoNetwork={cryptoNetwork}
            cryptoAddress={cryptoAddress}
            onDispatchEmail={handleDispatchEmail}
          />
        ) : selectedProduct ? (
          <ProductPage
            product={selectedProduct}
            allProducts={products}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            onInstantBuy={(game, q, p, f) => {
              handleAddToCart(game, q, p, f);
              setCartOpen(true);
            }}
            wishlist={user.wishlist}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        ) : (
          <>
            {/* View Switching Board */}
            {currentView === 'store' && (
              <>
                {/* Visual Platform category quick bento grid selector */}
                {searchQuery === '' && selectedPlatformFilter === 'All' && (
                  <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="homepage-grids">
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter mb-6 flex items-center italic gap-2">
                      <div className="w-2.5 h-2.5 bg-[#BC00FF] rotate-45"></div>
                      <span>SELECT PLATFORM LOBBIES</span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                      {['PlayStation', 'Xbox', 'Nintendo Switch', 'PC Gaming', 'Retro Gaming', 'Accessories', 'Collectibles', 'Merchandise'].map((plat) => (
                        <div
                          key={plat}
                          onClick={() => {
                            setSelectedPlatformFilter(plat as Platform);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="p-4 rounded-xl bg-[#0a0a0f] border border-white/5 text-center cursor-pointer hover:border-[#00f0ff] hover:bg-[#15151f] hover:scale-103 transition-all group"
                        >
                          <span className="text-xs font-black uppercase text-white block truncate group-hover:text-brand-cyan transition-colors">{plat.replace(' Gaming', '')}</span>
                          <span className="text-[9px] text-gray-500 block mt-1 uppercase tracking-widest font-mono">JOIN HUB</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Main Dynamic Catalog module */}
                <Catalog
                  products={products}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onAddToCart={handleAddToCart}
                  wishlist={user.wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  selectedPlatformFilter={selectedPlatformFilter}
                  onPlatformFilterChange={setSelectedPlatformFilter}
                />

                {/* Home segments metrics - Best Sellers, pre-orders, and deals (only on empty search default) */}
                {searchQuery === '' && selectedPlatformFilter === 'All' && (
                  <>
                    {/* flash countdown offers */}
                    <section className="bg-[#0a0a0f] py-12 border-t border-b border-white/5" id="homepage-deals">
                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                          <div>
                            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-2">
                              <div className="w-2.5 h-2.5 bg-brand-pink rotate-45"></div>
                              <span>DYNAMIC FLASH DEALS MATRIX</span>
                            </h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest text-[9px]">Slashed up to 60% off for verified premium members</p>
                          </div>

                          {/* Urgency countdown bar */}
                          <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <Clock className="h-4 w-4 text-[#00f0ff]" />
                            <span>EXPIRES IN: </span>
                            <span className="font-mono bg-black text-[#ff007f] border border-white/10 px-2.5 py-1 rounded">
                              {flashTime.hours.toString().padStart(2, '0')}:{flashTime.minutes.toString().padStart(2, '0')}:{flashTime.seconds.toString().padStart(2, '0')}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {flashDeals.map(game => (
                            <div 
                              key={game.id}
                              onClick={() => setSelectedProduct(game)}
                              className="p-3 bg-[#15151f] rounded-xl border border-white/5 hover:border-brand-purple hover:-translate-y-1 cursor-pointer transition-all flex flex-col justify-between group"
                            >
                              <img src={game.image} className="h-32 w-full object-cover rounded-lg group-hover:scale-102 transition-all duration-300" />
                              <div className="pt-3 font-sans">
                                <span className="text-[9px] text-[#00f0ff] uppercase font-bold tracking-widest block">{game.platform}</span>
                                <h4 className="text-xs font-bold text-white uppercase truncate mt-0.5 group-hover:text-[#00f0ff] transition-colors">{game.title}</h4>
                                <div className="flex items-center justify-between mt-2.5">
                                  <div className="flex items-baseline space-x-1.5">
                                    <span className="text-xs font-mono font-bold text-white">${game.price}</span>
                                    {game.originalPrice && <span className="text-[10px] text-gray-500 line-through font-mono">${game.originalPrice}</span>}
                                  </div>
                                  <span className="text-[9px] font-bold text-[#ff007f] bg-brand-pink/15 px-1.5 py-0.5 rounded tracking-wider uppercase">SAVE {Math.round(((game.originalPrice! - game.price) / game.originalPrice!) * 100)}%</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </section>

                    {/* Pre-order Upcoming releases blocks */}
                    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="pre-order-previews">
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-[#BC00FF] rotate-45"></div>
                            <span>UPCOMING AAA RELEASES & PRE-ORDERS</span>
                          </h3>
                          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest text-[9px]">Unlock release-day priority delivery options & exclusive cosmetic packs</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {products.filter(p => p.isPreOrder).map(game => (
                          <div 
                            key={game.id}
                            className="p-5 rounded-2xl bg-[#0a0a0f] border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between hover:border-brand-purple transition-colors"
                          >
                            <img src={game.image} className="h-28 w-28 rounded object-cover" />
                            <div className="flex-1 text-center md:text-left">
                              <span className="text-[9px] font-bold text-[#BC00FF] bg-brand-purple/10 border border-brand-purple/20 px-2 py-0.5 rounded uppercase font-mono tracking-widest">PRE-ORDER</span>
                              <h4 className="text-sm font-black text-white uppercase tracking-widest mt-1 leading-snug">{game.title}</h4>
                              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest text-[9px]">Platform: {game.platform} | Launches: {game.preOrderDate}</p>
                              
                              <div className="flex items-baseline space-x-1.5 mt-3 justify-center md:justify-start">
                                <span className="text-lg font-black text-white font-mono">${game.price.toFixed(2)}</span>
                                <span className="text-[10px] text-gray-550 block uppercase tracking-wider text-[9px]">Lowest Price Secured</span>
                              </div>
                            </div>

                            <button
                              onClick={() => setSelectedProduct(game)}
                              className="px-5 py-2.5 rounded-full bg-brand-cyan hover:bg-white text-black text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                            >
                              RESERVE SLOT
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Verified Customer reviews summary slider */}
                    <section className="bg-[#0a0a0f] py-12 border-t border-white/5" id="homepage-testimonials">
                      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-lg font-black italic text-white uppercase tracking-tighter mb-2">VERIFIED CUSTOMER TESTIMONIALS</h3>
                        <p className="text-xs text-gray-400 max-w-md mx-auto mb-8 uppercase tracking-widest text-[9px]">Hear directly from hundreds of thousands of satisfied gamers globally.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                          {reviews.slice(0, 3).map((rev) => (
                            <div key={rev.id} className="p-5 rounded-xl bg-[#12121a] border border-white/5 text-xs font-sans">
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-white uppercase tracking-widest">{rev.author}</span>
                                <div className="flex text-amber-400">
                                  {Array.from({ length: rev.rating }).map((_, i) => (
                                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <span className="text-[9px] text-[#00f0ff] uppercase font-bold block mb-2 tracking-widest">{rev.productName}</span>
                              <p className="text-gray-450 leading-normal font-light">"{rev.comment}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Newsletter Lead Capture box */}
                    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="lead-capture">
                      <div className="p-8 rounded-3xl bg-[#0a0a0f] border border-white/10 text-center relative overflow-hidden">
                        
                        <div className="relative z-10 max-w-lg mx-auto">
                          <Mail className="h-10 w-10 text-brand-cyan mx-auto mb-4" />
                          <h3 className="text-xl md:text-2xl font-black italic text-white uppercase tracking-tighter">
                            JOIN THE NEXUS NEWS LOBBY
                          </h3>
                          
                          <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto leading-relaxed uppercase tracking-wider text-[9px]">
                            Subscribe today and immediately collect a <strong className="text-white">10% Welcome Coupon (NEXUS10)</strong> and flash promotions early access passes.
                          </p>

                          <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                            <input
                              type="email"
                              required
                              placeholder="INPUT GAMER EMAIL ADDRESS"
                              className="flex-1 text-xs px-5 py-3 bg-[#15151f] border border-white/5 text-white rounded-full focus:outline-none focus:border-[#BC00FF] uppercase tracking-widest font-mono"
                            />
                            <button
                              onClick={() => triggerAlert('Welcome to the Nexus Lounge! Coupon NEXUS10 activated.')}
                              className="px-6 py-3 bg-brand-cyan hover:bg-white text-black font-black text-xs uppercase tracking-widest rounded-full transition-all"
                            >
                              JOIN NOW
                            </button>
                          </div>
                        </div>

                      </div>
                    </section>
                  </>
                )}
              </>
            )}

            {currentView === 'blogs' && <BlogSection blogs={blogs} />}

            {currentView === 'community' && (
              <CommunitySection
                products={products}
                reviews={reviews}
                discussions={discussions}
                onSubmitReview={handleAddNewReview}
                onSubmitThread={handleAddNewThread}
              />
            )}

            {currentView === 'account' && (
              <UserProfileViewWrapper
                user={user}
                orders={orders}
                onUpgradeMembership={handleUpgradeUserMembership}
                currentAppliedCouponCode={couponApplied?.code}
                onSelectCoupon={(cCode) => {
                  const matched = [
                    { code: 'NEXUS10', discount: 10, expiry: '2026-12-31', description: 'Coupon NEXUS10 loaded.' },
                    { code: 'LEGEND25', discount: 25, expiry: '2026-08-31', description: 'Coupon LEGEND25 loaded.' },
                    { code: 'VIPFREE', discount: 15, expiry: '2026-09-30', description: 'Coupon VIPFREE loaded.' }
                  ].find(c => c.code === cCode);
                  if (matched) setCouponApplied(matched);
                }}
                onAddAddress={(adr) => setUser(prev => ({ ...prev, savedAddresses: [...prev.savedAddresses, adr] }))}
                onSignUpOrSwitch={handleSignUpOrSwitch}
              />
            )}

            {currentView === 'admin' && (
              !isAdminLoggedIn ? (
                <div className="mx-auto max-w-md px-4 py-16 text-center" id="admin-security-login-gate">
                  <div className="p-8 rounded-3xl bg-cyber-charcoal border border-[#00f0ff]/30 space-y-6 text-left gaming-grid">
                    <div className="text-center space-y-2 border-b border-white/5 pb-4">
                      <div className="inline-flex p-3 rounded-2xl bg-cyan-950/20 text-[#00f0ff] border border-[#00f0ff]/25 mb-2 animate-pulse">
                        <Lock className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-black uppercase text-white tracking-widest">Operator Authorization Gate</h3>
                      <p className="text-[10px] text-gray-400 font-mono">AUTHORIZED GATEWAY SECURITY NODE ACCESS ONLY</p>
                    </div>

                    <div className="p-3.5 bg-black/60 rounded-2xl border border-white/5 space-y-1 font-mono text-[10.5px]">
                      <span className="text-[#00f0ff] font-bold block mb-1">🔑 PRE-CONFIGURED ADMIN CREDENTIAL PARAMETERS:</span>
                      <p>USERNAME: <code className="text-white select-all bg-zinc-900 px-1 py-0.5 rounded">admin@nexusgames.com</code></p>
                      <p>PASSWORD: <code className="text-white select-all bg-zinc-900 px-1 py-0.5 rounded text-glow">nexus</code></p>
                    </div>

                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const userIn = (target.elements.namedItem('adminUser') as HTMLInputElement).value;
                        const passIn = (target.elements.namedItem('adminPass') as HTMLInputElement).value;
                        if (userIn === 'admin@nexusgames.com' && passIn === 'nexus') {
                          setIsAdminLoggedIn(true);
                          triggerAlert('Authorization verified! Welcome Commander.', 'success');
                        } else {
                          triggerAlert('Security override triggered: access denied! Check keyphrase.', 'warn');
                        }
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1.5 font-mono">Operator Mail Node</label>
                        <input
                          name="adminUser"
                          type="text"
                          required
                          defaultValue="admin@nexusgames.com"
                          className="w-full text-xs font-mono px-4 py-3 bg-[#0a0a0f] border border-white/10 text-[#00f0ff] rounded-xl focus:outline-none focus:border-brand-cyan"
                        />
                      </div>

                      <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1.5 font-mono">Security Codephrase</label>
                        <input
                          name="adminPass"
                          type="password"
                          required
                          defaultValue="nexus"
                          className="w-full text-xs font-mono px-4 py-3 bg-[#0a0a0f] border border-white/10 text-[#00f0ff] rounded-xl focus:outline-none focus:border-brand-cyan"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple hover:from-white hover:to-white text-black font-black uppercase text-[10px] tracking-widest cursor-pointer transition-all active:scale-98 text-center shadow-[0_4px_12px_rgba(0,240,255,0.1)] block mt-2"
                      >
                        Authorize & Login
                      </button>
                    </form>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAdminLoggedIn(true);
                        triggerAlert('Operator gate bypassed successfully!', 'success');
                      }}
                      className="w-full py-2.5 bg-gray-900 border border-white/5 rounded-full text-[10px] text-gray-400 uppercase font-black tracking-widest hover:text-white transition-all cursor-pointer text-center block"
                    >
                      Skip Gate / Autologin
                    </button>
                  </div>
                </div>
              ) : (
                <AdminDashboard
                  products={products}
                  onAddProduct={handleAddProductAdmin}
                  onUpdateStock={handleUpdateStockAdmin}
                  onDeleteProduct={handleDeleteProductAdmin}
                  paypalEmail={paypalEmail}
                  onUpdatePaypalEmail={setPaypalEmail}
                  cryptoNetwork={cryptoNetwork}
                  onUpdateCryptoNetwork={setCryptoNetwork}
                  cryptoAddress={cryptoAddress}
                  onUpdateCryptoAddress={setCryptoAddress}
                  
                  // cPanel SMTP system integration parameters
                  outboundEmails={outboundEmails}
                  onClearEmailLogs={() => {
                    setOutboundEmails([]);
                    triggerAlert('Historical SMTP mail logs cleared.', 'success');
                  }}
                  cpanelDomain={cpanelDomain}
                  onUpdateCpanelDomain={setCpanelDomain}
                  cpanelEmail={cpanelEmail}
                  onUpdateCpanelEmail={setCpanelEmail}
                  cpanelSmtpHost={cpanelSmtpHost}
                  onUpdateCpanelSmtpHost={setCpanelSmtpHost}
                  cpanelSmtpPort={cpanelSmtpPort}
                  onUpdateCpanelSmtpPort={setCpanelSmtpPort}
                />
              )
            )}
          </>
        )}

      </main>

      {/* Slide-out shopping cart sidebar */}
      <SlideOutCart
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        couponApplied={couponApplied}
        onApplyCoupon={setCouponApplied}
        allProducts={products}
        onAddUpsell={(p, q, pl, f) => {
          handleAddToCart(p, q, pl, f);
        }}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutMode(true);
        }}
      />

      {/* Global AAA Brand Footer */}
      <footer className="bg-[#050508] border-t border-white/5 pt-16 pb-8" id="footer-frame">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          <div className="space-y-4 text-left">
            <span className="text-lg font-black uppercase text-white tracking-widest block">Nexus Marketplace</span>
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wider text-[9px]">
              We live and breathe AAA gaming cultures. Buy, download, and play immediate digital licenses at uncompromised prices on consoles, retro setups, and high-spec rigs.
            </p>
            <div className="flex space-x-3 text-gray-500">
              <Facebook className="h-4.5 w-4.5 hover:text-white cursor-pointer" />
              <Twitter className="h-4.5 w-4.5 hover:text-white cursor-pointer" />
              <Instagram className="h-4.5 w-4.5 hover:text-white cursor-pointer" />
              <Youtube className="h-4.5 w-4.5 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-3.5 text-left text-xs">
            <span className="text-xs font-black uppercase text-white tracking-widest block">Core Categories</span>
            <ul className="space-y-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedPlatformFilter('PlayStation'); setCurrentView('store'); }}>PlayStation Network</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedPlatformFilter('Xbox'); setCurrentView('store'); }}>Xbox Core Keys</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedPlatformFilter('Nintendo Switch'); setCurrentView('store'); }}>Nintendo Switch Cartridge</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedPlatformFilter('PC Gaming'); setCurrentView('store'); }}>PC Ultimate Steam</li>
              <li className="hover:text-white cursor-pointer" onClick={() => { setSelectedPlatformFilter('Retro Gaming'); setCurrentView('store'); }}>Retro Cartridges</li>
            </ul>
          </div>

          <div className="space-y-3.5 text-left text-xs">
            <span className="text-xs font-black uppercase text-white tracking-widest block">Customer Guard Program</span>
            <ul className="space-y-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <li className="hover:text-white cursor-pointer" onClick={() => alert('Fast Dispatch: Digital keys emailed instantly upon secure verification. Physical collector items packaged and tracking shipped next-day.')}>Shipping Dispatch Policies</li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert('No-Fuss Exchanges: 14-days standard returns for unopened boxed products, or unredeemed digital game license certificates.')}>Hassle-Free Grace Return Policies</li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert('Certified Products Guarantee: All keys, collectors items, and hardware controllers are 100% genuine guaranteed items.')}>Licensed Authentic Guarantee</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView('account')}>My Loyalty VIP Achievements</li>
            </ul>
          </div>

          <div className="space-y-3.5 text-left text-xs">
            <span className="text-xs font-black uppercase text-white tracking-widest block font-sans">Corporate Legalities</span>
            <ul className="space-y-2 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <li className="hover:text-white cursor-pointer" onClick={() => alert('Terms of Services: By registering onto Nexus, you authorize points gamification and direct email license confirmations.')}>Terms & Standard Usage rules</li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert('Privacy Standard: We secure authentication details with 256-Bit SSL protection. Your passwords and card details are fully encrypted.')}>Privacy Policy regulations</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setCurrentView('admin')}>Operations Portal Admin Panel</li>
              <li className="hover:text-white cursor-pointer" onClick={() => alert('Our primary support HQ resides at 101 Cyber Expressway Suite 404, Miami, FL. Feel free to contact our round-the-clock gamers hotline!')}>HQ Office & Round-the-clock Hotline</li>
            </ul>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-650 uppercase tracking-widest gap-4">
          <span>Nexus Gaming Marketplace Incorporated © 2026. Made with Google AI Studio</span>
          <span>PCI-DSS SSL SECURED TRANSACTION SERVICE</span>
        </div>
      </footer>

    </div>
  );
}

// Wrapper for Customer profiles layout checking
function UserProfileViewWrapper(props: any) {
  return (
    <UserAccount {...props} />
  );
}
