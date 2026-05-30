import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Plus, Trash2, Edit2, TrendingUp, DollarSign, Activity, ShoppingCart, RefreshCw, Smartphone, ListCollapse, Play, CheckCircle2, AlertTriangle, Wallet, Coins, Mail, Globe, FileCode2, Terminal, ArrowDownToLine, Copy, Link, Inbox } from 'lucide-react';
import { Product, Platform } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
  paypalEmail: string;
  onUpdatePaypalEmail: (email: string) => void;
  cryptoNetwork: string;
  onUpdateCryptoNetwork: (net: string) => void;
  cryptoAddress: string;
  onUpdateCryptoAddress: (addr: string) => void;
  
  // cPanel system logs, dynamic mailbox, SMTP triggers
  outboundEmails: any[];
  onClearEmailLogs: () => void;
  cpanelDomain: string;
  onUpdateCpanelDomain: (val: string) => void;
  cpanelEmail: string;
  onUpdateCpanelEmail: (val: string) => void;
  cpanelSmtpHost: string;
  onUpdateCpanelSmtpHost: (val: string) => void;
  cpanelSmtpPort: string;
  onUpdateCpanelSmtpPort: (val: string) => void;
}

export default function AdminDashboard({
  products,
  onAddProduct,
  onUpdateStock,
  onDeleteProduct,
  paypalEmail,
  onUpdatePaypalEmail,
  cryptoNetwork,
  onUpdateCryptoNetwork,
  cryptoAddress,
  onUpdateCryptoAddress,
  
  outboundEmails,
  onClearEmailLogs,
  cpanelDomain,
  onUpdateCpanelDomain,
  cpanelEmail,
  onUpdateCpanelEmail,
  cpanelSmtpHost,
  onUpdateCpanelSmtpHost,
  cpanelSmtpPort,
  onUpdateCpanelSmtpPort
}: AdminDashboardProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'automation' | 'gateways' | 'cpanel'>('analytics');

  // New product form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<Platform>('PlayStation');
  const [newPrice, setNewPrice] = useState(59.99);
  const [newImg, setNewImg] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800');
  const [newGenre, setNewGenre] = useState('Action Adventure');
  const [newStock, setNewStock] = useState(25);
  const [newDesc, setNewDesc] = useState('AAA premium physical and digital keys.');

  // Marketing automation logs simulator
  const [botLogs, setBotLogs] = useState<string[]>([]);
  const [isBotRunning, setIsBotRunning] = useState(false);

  // Recharts analytic data
  const revenueHistory = [
    { month: 'Jan', revenue: 42, conversionRate: 2.1 },
    { month: 'Feb', revenue: 58, conversionRate: 2.3 },
    { month: 'Mar', revenue: 74, conversionRate: 2.5 },
    { month: 'Apr', revenue: 91, conversionRate: 2.8 },
    { month: 'May', revenue: 110, conversionRate: 3.2 },
  ];

  const categoryPerformance = [
    { name: 'Consoles/Games', sales: 480 },
    { name: 'Retro Classics', sales: 180 },
    { name: 'Accessories', sales: 340 },
    { name: 'Collectibles', sales: 210 },
    { name: 'Merchandise', sales: 120 },
  ];

  const platformDistribution = [
    { name: 'PlayStation', value: 40, color: '#bc13fe' },
    { name: 'Xbox', value: 25, color: '#3b82f6' },
    { name: 'Nintendo Switch', value: 20, color: '#e11d48' },
    { name: 'PC / Retro', value: 15, color: '#00f0ff' },
  ];

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      const generatedProduct: Product = {
        id: 'PRD-' + Math.floor(1000 + Math.random() * 9000),
        title: newTitle.trim(),
        platform: newPlatform,
        price: newPrice,
        rating: 4.8,
        reviewCount: 1,
        image: newImg,
        gallery: [newImg],
        genre: newGenre,
        releaseDate: new Date().toISOString().split('T')[0],
        publisher: 'Apex Global Publishing',
        esrbRating: 'E',
        languages: ['English', 'German'],
        multiplayer: false,
        singleplayer: true,
        isDigital: true,
        isPhysical: true,
        stock: newStock,
        description: newDesc,
        longDescription: newDesc + ' Fully certified retail version and immediate key distribution.'
      };

      onAddProduct(generatedProduct);
      setNewTitle('');
      setShowAddForm(false);
      alert(`Product ${generatedProduct.title} added successfully!`);
    }
  };

  const runRecoveryBot = () => {
    setIsBotRunning(true);
    setBotLogs([]);
    
    const messages = [
      'Initializing Abandoned Cart Recovery Engine...',
      'Scanning checkout database logs for idle carts...',
      'Detected 18 abandoned sessions within the last 2 hours.',
      'Analyzing israjets1278@gmail.com customer cart: Found Chronicles of Eldoria.',
      'Generating active personalized VIP incentive coupon VIPFREE Code (15% discount)...',
      'Deploying secure automated recovery email campaign to israjets1278@gmail.com...',
      'Recovery incentive successfully dispatched! Telemetry registered: PASS',
      'System summary: 8 of 18 recovered sessions recovered successfully! AOV up +$142.50.'
    ];

    messages.forEach((msg, idx) => {
      setTimeout(() => {
        setBotLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
        if (idx === messages.length - 1) {
          setIsBotRunning(false);
        }
      }, (idx + 1) * 1200);
    });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id="admin-panel-dashboard">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800 pb-5 mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center space-x-2">
            <Database className="h-5 w-5 text-brand-cyan" />
            <span>Nexus Administrative Portal</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-mono">Operations Management, Analytics and System Controls</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-cyber-charcoal border border-gray-800 p-1.5 rounded-xl text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'analytics' ? 'bg-brand-cyan text-cyber-black font-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            Analytics Reports
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'products' ? 'bg-brand-purple text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Manage Catalog
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'automation' ? 'bg-brand-pink text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            System Bots
          </button>
          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'gateways' ? 'bg-[#BC00FF] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Gateways Config
          </button>
          <button
            onClick={() => setActiveTab('cpanel')}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeTab === 'cpanel' ? 'bg-brand-cyan text-black font-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            cPanel & Email Setup
          </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <div className="space-y-8" id="admin-analytics-view">
          
          {/* Metrics grids */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-cyber-charcoal border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Consolidated Revenue</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">$110,480</span>
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">+14.2% from April</span>
              </div>
              <DollarSign className="h-8 w-8 text-brand-cyan opacity-20" />
            </div>

            <div className="p-5 rounded-2xl bg-cyber-charcoal border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block">Average Order Value (AOV)</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">$74.20</span>
                <span className="text-[10px] text-brand-purple font-bold block mt-1">+15% Active Upsells</span>
              </div>
              <TrendingUp className="h-8 w-8 text-brand-purple opacity-20" />
            </div>

            <div className="p-5 rounded-2xl bg-cyber-charcoal border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-505 uppercase tracking-widest block">Conversion Rate</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">3.2% Absolute</span>
                <span className="text-[10px] text-brand-cyan font-bold block mt-1">High conversion layout optimized</span>
              </div>
              <Activity className="h-8 w-8 text-brand-cyan opacity-20" />
            </div>

            <div className="p-5 rounded-2xl bg-cyber-charcoal border border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-505 uppercase tracking-widest block">Cart Abandonment Rate</span>
                <span className="text-2xl font-black font-mono text-white mt-1 block">38.4%</span>
                <span className="text-[10px] text-brand-pink font-bold block mt-1">Bot recovery running</span>
              </div>
              <ShoppingCart className="h-8 w-8 text-brand-pink opacity-20" />
            </div>
          </div>

          {/* Recharts chart matrices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Sales trends area chart */}
            <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850">
              <h3 className="text-xs font-black uppercase text-white tracking-widest mb-4">
                Monthly Net Revenue Trend ($ Thousands)
              </h3>
              
              <div className="h-72 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="month" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#00f0ff" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance by categories */}
            <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850">
              <h3 className="text-xs font-black uppercase text-white tracking-widest mb-4">
                Category Sales Distribution Volume
              </h3>

              <div className="h-72 w-full text-xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryPerformance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Bar dataKey="sales" fill="#bc13fe" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Platform Distribution Pie Chart row */}
          <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850 text-left">
            <h3 className="text-xs font-black uppercase text-white tracking-widest mb-6">
              Platform Sales Distribution Ratio (%)
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-around gap-6">
              <div className="h-56 w-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={platformDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                      {platformDistribution.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend checklist */}
              <div className="space-y-3.5 text-xs">
                {platformDistribution.map((p) => (
                  <div key={p.name} className="flex items-center space-x-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }}></span>
                    <span className="text-gray-400 font-medium uppercase font-mono">{p.name}: <strong className="text-white font-bold">{p.value}% share</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'products' && (
        <div className="space-y-6" id="admin-products-view">
          
          <div className="flex justify-between items-center bg-cyber-black p-4 rounded-xl border border-gray-805">
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">Add new titles into database</span>
              <p className="text-[10px] text-gray-500">Add physical cartridges, license keys, or hardware instantly</p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-xl bg-brand-purple text-white font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Insert Product</span>
            </button>
          </div>

          {/* Add product form */}
          {showAddForm && (
            <form onSubmit={handleAddNewProduct} className="p-6 rounded-2xl bg-cyber-charcoal border border-brand-purple/20 space-y-4 text-left">
              <h3 className="text-xs font-black uppercase text-brand-cyan tracking-wider border-b border-gray-800 pb-2">
                Add New Gaming Stock Node
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Halo Infinite Remastered"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Target Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as Platform)}
                    className="w-full text-xs px-2 py-2 bg-cyber-black border border-gray-800 text-white rounded cursor-pointer"
                  >
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo Switch">Nintendo Switch</option>
                    <option value="PC Gaming">PC Gaming</option>
                    <option value="Retro Gaming">Retro Gaming</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Splash Cover Image URL</label>
                  <input
                    type="text"
                    required
                    value={newImg}
                    onChange={(e) => setNewImg(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Genre Category</label>
                  <input
                    type="text"
                    required
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Initial Stock Units</label>
                  <input
                    type="number"
                    required
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full text-xs font-mono px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Short Description Outline</label>
                <textarea
                  required
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-cyber-black border border-gray-800 text-white rounded focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-gray-500 rounded">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded bg-brand-cyan text-cyber-black font-extrabold">Publish Node</button>
              </div>
            </form>
          )}

          {/* Catalog grid overview with stock editing capability */}
          <div className="bg-cyber-charcoal border border-gray-800 rounded-2xl overflow-hidden text-left overflow-x-auto text-xs font-medium">
            <table className="w-full">
              <thead className="bg-[#0c0c16] text-gray-500 uppercase text-[9px] tracking-wider border-b border-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left">Target Title Node</th>
                  <th className="px-6 py-4 text-left">Platform</th>
                  <th className="px-6 py-4 text-left">Unit Price</th>
                  <th className="px-6 py-4 text-left">Stock Matrix</th>
                  <th className="px-6 py-4 text-center">Safety Status</th>
                  <th className="px-6 py-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-900" id="admin-table-body">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-cyber-black/40">
                    <td className="px-6 py-4 flex items-center space-x-3.5">
                      <img src={p.image} className="h-8 w-8 object-cover rounded border border-gray-800" referrerPolicy="no-referrer" />
                      <span className="font-bold text-white uppercase text-xs block truncate w-40 md:w-56">{p.title}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 font-mono text-[11px] uppercase whitespace-nowrap">{p.platform}</td>
                    <td className="px-6 py-4 font-mono text-white text-xs font-bold">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={p.stock}
                          onChange={(e) => onUpdateStock(p.id, Number(e.target.value))}
                          className="w-14 font-mono text-center bg-cyber-black border border-gray-850 py-1 rounded text-white"
                        />
                        <span className="text-[10px] text-gray-500 uppercase">units</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {p.stock === 0 ? (
                        <span className="px-2 py-0.5 rounded bg-red-950/20 text-red-400 font-bold text-[9px] border border-red-900/30">LOW</span>
                      ) : p.stock <= 5 ? (
                        <span className="px-2 py-0.5 rounded bg-amber-950/20 text-amber-400 font-bold text-[9px] border border-amber-900/30">WARN</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-400 font-bold text-[9px]">GOOD</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-gray-500 hover:text-brand-pink border border-transparent hover:border-brand-pink/20 hover:bg-brand-pink/5 rounded-lg transition-all cursor-pointer"
                        title="Delete game index"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {activeTab === 'automation' && (
        <div className="space-y-6" id="admin-automation-view">
          
          {/* Bots launcher */}
          <div className="p-6 rounded-3xl bg-cyber-charcoal border border-gray-800 text-left space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center">
              <RefreshCw className="h-4.5 w-4.5 text-brand-pink mr-2 animate-spin-slow" />
              <span>Marketing Automation & Cart Recovery Bot</span>
            </h3>
            
            <p className="text-xs text-gray-400 leading-normal max-w-2xl">
              Launch a simulated Cron process that evaluates checkout session abandonment, structures dynamic 15% discount coupon identifiers (`VIPFREE`) personalized to their idle components, and dispatches email recovery triggers directly.
            </p>

            <button
              onClick={runRecoveryBot}
              disabled={isBotRunning}
              className={`px-5 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                isBotRunning 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : 'bg-brand-pink hover:bg-brand-purple text-white shadow-brand-pink/15'
              }`}
            >
              <Play className="h-4 w-4 fill-current mr-1" />
              <span>{isBotRunning ? 'Processing Engine Logs...' : 'Execute Recovery Script'}</span>
            </button>
          </div>

          {/* Logs panel */}
          {botLogs.length > 0 && (
            <div className="p-5 rounded-2xl bg-[#030306] border border-gray-900 text-left font-mono text-[11px] whitespace-pre-wrap leading-relaxed space-y-1.5 shadow-inner">
              <span className="block text-[10px] font-bold text-gray-650 uppercase tracking-widest font-sans pb-2 border-b border-gray-900 mb-3">
                Live Terminal Activity stream check:
              </span>
              {botLogs.map((log, i) => (
                <div key={i} className={`flex items-start ${log.includes('FAIL') ? 'text-red-400' : log.includes('dispatched') || log.includes('recovered') ? 'text-[#00f0ff]' : 'text-gray-450'}`}>
                  <span className="text-gray-600 mr-2 shrink-0">{`>`}</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {activeTab === 'gateways' && (
        <div className="space-y-6 text-left" id="admin-gateways-view">
          
          {/* Welcome Intro Banner */}
          <div className="p-6 rounded-2xl bg-[#0a0a0f] border border-white/5 space-y-2">
            <h3 className="text-lg font-black text-white uppercase tracking-tighter col-span-full flex items-center gap-2 italic">
              <div className="w-2.5 h-2.5 bg-[#00f0ff] rotate-45 animate-pulse"></div>
              <span>GATEWAY CHANNELS & PAYMENT SETTLEMENTS</span>
            </h3>
            <p className="text-xs text-gray-400 max-w-2xl leading-normal uppercase tracking-wider text-[10px]">
              Set up your merchant accounts and payment receiving addresses for immediate transit. 
              The parameters submitted here are compiled in real-time and binded directly to the customer storefront during the checkout flow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Box 1: PayPal Settlements */}
            <div className="p-6 rounded-3xl bg-[#0a0a0f] border border-white/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#BC00FF] rounded-full"></span>
                    <span>1. PAYPAL MERCHANT LINK</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-emerald-400 font-bold text-[9px] border border-emerald-900/30 font-mono tracking-widest">
                    ACTIVE POOL
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">
                  Provide your PayPal merchant email address. Checkout payments will process mock sandbox authorizations referencing this profile coordinate.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div>
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                    Merchant Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={paypalEmail}
                    onChange={(e) => onUpdatePaypalEmail(e.target.value)}
                    placeholder="e.g. merchant@nexusgames.com"
                    className="w-full text-xs font-mono px-4 py-2.5 bg-[#15151f] border border-white/10 text-white rounded-full focus:outline-none focus:border-[#BC00FF] uppercase tracking-wider"
                  />
                </div>

                <div className="p-3 bg-black/60 border border-white/5 rounded-xl text-[10px] font-mono leading-normal text-gray-400 tracking-wider">
                  <span className="text-[#BC00FF] font-bold uppercase block mb-1 font-sans">🔗 API Transit Route:</span>
                  <p className="truncate block select-all text-[9.5px]">
                    https://nexus-engine.co/api/v1/paypal/dispatch?merchant={encodeURIComponent(paypalEmail)}
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2: Crypto Multi-chain Address */}
            <div className="p-6 rounded-3xl bg-[#0a0a0f] border border-white/5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#00f0ff] rounded-full"></span>
                    <span>2. DECENTRALIZED CRYPTO LEDGER</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/20 text-[#00f0ff] font-bold text-[9px] border border-cyan-900/30 font-mono tracking-widest animate-pulse">
                    LISTENING
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider leading-relaxed">
                  Input your secure wallet receiving address. Customers can select this payment channel at checkout to transfer block funds directly to your node.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                      Settlement Network
                    </label>
                    <select
                      value={cryptoNetwork}
                      onChange={(e) => onUpdateCryptoNetwork(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#15151f] border border-white/10 text-white rounded-full cursor-pointer focus:outline-none focus:border-[#00f0ff] uppercase font-bold text-[10px] tracking-widest"
                    >
                      <option value="USDT (TRC-20)">USDT (TRC-20 Chain)</option>
                      <option value="USDT (ERC-20)">USDT (Ethereum Chain)</option>
                      <option value="ERC-20 ETH">ERC-20 (Ethereum Coin)</option>
                      <option value="Bitcoin Network">BTC (Native Blockchain)</option>
                      <option value="Solana Coin">SOL (Solana Blockchain)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">
                      Destination Address
                    </label>
                    <input
                      type="text"
                      required
                      value={cryptoAddress}
                      onChange={(e) => onUpdateCryptoAddress(e.target.value)}
                      placeholder="e.g. 0x71C7656...76F"
                      className="w-full text-xs font-mono px-4 py-2 bg-[#15151f] border border-white/10 text-white rounded-full focus:outline-none focus:border-[#00f0ff]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-black/60 border border-white/5 rounded-xl text-[10px] font-mono leading-normal text-gray-400 tracking-wider">
                  <span className="text-[#00f0ff] font-bold uppercase block mb-1 font-sans">⛓️ Ledgers Target:</span>
                  <p className="truncate block font-mono text-[9px]">
                    NETWORK: {cryptoNetwork} | RECEIVER: <span className="text-white select-all">{cryptoAddress}</span>
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Connected Stream Simulation */}
          <div className="p-6 rounded-3xl bg-[#0a0a0f] border border-white/5 space-y-4">
            <h4 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-2">
              REAL-TIME SIMULATION & DIAGNOSTIC VERIFIER
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono uppercase tracking-widest">
              <div className="p-4 bg-[#111116] border border-white/5 rounded-2xl">
                <span className="text-[9px] text-gray-500 block mb-1">PAYPAL TRANSIT DISPATCH STATUS</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px] mt-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  STETH SECURE (MAPPED TO {paypalEmail})
                </span>
              </div>
              <div className="p-4 bg-[#111116] border border-white/5 rounded-2xl">
                <span className="text-[9px] text-gray-500 block mb-1">BLOCKCHAIN MEMPOOL VERIFIER</span>
                <span className="text-brand-purple font-bold flex items-center gap-1.5 text-[11px] mt-1">
                  <span className="h-2 w-2 rounded-full bg-brand-purple animate-ping"></span>
                  READY ({cryptoNetwork})
                </span>
              </div>
              <div className="p-4 bg-[#111116] border border-white/5 rounded-2xl">
                <span className="text-[9px] text-gray-500 block mb-1">DESTINATION LEDGER NODE</span>
                <span className="text-gray-300 block truncate font-mono text-[10px] mt-1 text-brand-cyan select-all">
                  {cryptoAddress}
                </span>
              </div>
            </div>

            <div className="p-4 bg-brand-cyan/5 border border-brand-cyan/20 rounded-2xl text-[10px] uppercase font-mono tracking-widest text-[#00f0ff] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping"></span>
              <span>Lobbies diagnostics complete: Settings synchronization synced with Customer/CX checkout. Open Checkout to finalize simulation with changed merchant data.</span>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'cpanel' && (
        <div className="space-y-8 text-left" id="cpanel-integration-view">
          
          {/* Top Info Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/20 via-cyber-charcoal to-cyber-black border border-brand-cyan/25 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">Active Core Interface</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-wider font-sans">
                cPanel & Professional SMTP Mailbox Portal
              </h3>
              <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                Connect your online store to your cPanel hosting system. Generate production static bundles, deploy file routing rules, configure professional SMTP mail boxes, and inspect outbound transactional logs.
              </p>
            </div>
            
            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 space-y-1 text-xs font-mono text-right shrink-0">
              <p className="text-white">Active Server Domain: <span className="text-brand-cyan uppercase font-bold select-all">{cpanelDomain}</span></p>
              <p className="text-gray-500">Node Dispatch Target: <span className="text-brand-purple">{cpanelEmail}</span></p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Hand: SMTP settings & cPanel Email Account Wizard */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* cPanel Domain and SMTP Mailbox Sync Settings */}
              <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850 space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                  <Mail className="h-4.5 w-4.5 text-brand-purple mr-2" />
                  <span>cPanel SMTP Linker Credentials</span>
                </h4>

                <p className="text-[10px] text-gray-400 uppercase tracking-wide leading-relaxed">
                  Modify SMTP server properties. Transactional emails triggered during signups or checkout checkout processes will broadcast via these credentials.
                </p>

                <div className="space-y-3.5 pt-1">
                  <div>
                    <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                      cPanel Main Domain / Coordinate
                    </label>
                    <input
                      type="text"
                      required
                      value={cpanelDomain}
                      onChange={(e) => onUpdateCpanelDomain(e.target.value)}
                      placeholder="e.g. yourdomain.com"
                      className="w-full text-xs font-mono px-4 py-2.5 bg-cyber-black border border-gray-800 text-white rounded-full focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                      Sender Business Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={cpanelEmail}
                      onChange={(e) => onUpdateCpanelEmail(e.target.value)}
                      placeholder="e.g. support@yourdomain.com"
                      className="w-full text-xs font-mono px-4 py-2.5 bg-cyber-black border border-gray-800 text-brand-cyan rounded-full focus:outline-none focus:border-brand-purple"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Outgoing SMTP Host
                      </label>
                      <input
                        type="text"
                        required
                        value={cpanelSmtpHost}
                        onChange={(e) => onUpdateCpanelSmtpHost(e.target.value)}
                        placeholder="e.g. mail.domain.com"
                        className="w-full text-xs font-mono px-4 py-2.5 bg-cyber-black border border-gray-800 text-white rounded-full focus:outline-none focus:border-brand-purple"
                      />
                    </div>

                    <div>
                      <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        SMTP SSL Port
                      </label>
                      <input
                        type="text"
                        required
                        value={cpanelSmtpPort}
                        onChange={(e) => onUpdateCpanelSmtpPort(e.target.value)}
                        placeholder="e.g. 465"
                        className="w-full text-xs font-mono px-4 py-2.5 bg-cyber-black border border-gray-800 text-white rounded-full focus:outline-none focus:border-brand-purple text-center"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-brand-purple/5 border border-brand-purple/20 rounded-xl text-[10px] text-gray-400 font-mono leading-normal">
                    <span className="text-white font-bold block mb-0.5">💡 SECURE SMTP TUNNEL ENABLED:</span>
                    All outbound customer notifications dispatch through port <span className="text-brand-purple font-extrabold">{cpanelSmtpPort}</span> over secure SSL transport connection protocols.
                  </div>
                </div>
              </div>

              {/* cPanel Step-By-Step Email Creation Wizard */}
              <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-150/5 space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                  <Globe className="h-4.5 w-4.5 text-brand-cyan mr-2" />
                  <span>cPanel Email Setup Guide</span>
                </h4>

                <div className="space-y-4 text-xs">
                  <div className="relative pl-6 text-gray-300">
                    <div className="absolute left-0 top-0.5 h-4 w-4 rounded-full bg-brand-cyan/20 border border-brand-cyan text-[9px] flex items-center justify-center font-bold text-brand-cyan">1</div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wide">Enter cPanel Control Board</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">Login to your web hosting account (usually <code className="text-white bg-black px-1 rounded font-mono select-all">https://{cpanelDomain || "yourdomain.com"}:2083</code>).</p>
                  </div>

                  <div className="relative pl-6 text-gray-300">
                    <div className="absolute left-0 top-0.5 h-4 w-4 rounded-full bg-brand-cyan/20 border border-brand-cyan text-[9px] flex items-center justify-center font-bold text-brand-cyan">2</div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wide">Navigate to Email Accounts</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">Search "Email" in top finder, click on **Email Accounts** and select **"+ Create"** on right sidebar.</p>
                  </div>

                  <div className="relative pl-6 text-gray-300">
                    <div className="absolute left-0 top-0.5 h-4 w-4 rounded-full bg-brand-cyan/20 border border-brand-cyan text-[9px] flex items-center justify-center font-bold text-brand-cyan">3</div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wide">Allocate Address Credentials</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">Enter Username <code className="text-white select-all bg-black px-1.5 py-0.5 rounded text-[10px] font-mono">no-reply</code> and select your store domain. Assign strong randomized secure password.</p>
                  </div>

                  <div className="relative pl-6 text-gray-300 col-span-1 border-t border-white/5 pt-3">
                    <div className="absolute left-0 top-3.5 h-4 w-4 rounded-full bg-brand-cyan/20 border border-brand-cyan text-[9px] flex items-center justify-center font-bold text-brand-cyan">4</div>
                    <p className="font-bold text-white uppercase text-[10px] tracking-wide text-brand-cyan">Mailbox Synchronization PASS</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed mt-0.5">Link those SMTP credentials on your server's <code className="text-brand-cyan">.env</code> configurations using port 465 SSL or 587 TLS to connect mail queues safely.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hand: Interactive cPanel Build Deployer Simulator */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* cPanel Static Deployment Simulator Card */}
              <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850 space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                    <ArrowDownToLine className="h-4.5 w-4.5 text-brand-cyan mr-2" />
                    <span>Upload & Unpack build-bundle.zip (cPanel Simulator)</span>
                  </h4>
                  <span className="px-2 py-0.5 rounded bg-amber-950/20 text-[#00f0ff] font-mono font-bold text-[9px] border border-cyan-900/30">
                    VITE SERVER BUILD
                  </span>
                </div>

                <p className="text-xs text-gray-400 max-w-xl leading-relaxed">
                  When ready, compile your app to static assets, zip it, and extract! Below, you can trigger a simulator that extracts your dynamic app bundle inside virtual cPanel cpanel's root.
                </p>

                {/* Simulated build commands */}
                <div className="p-4 bg-sky-950/10 border border-brand-cyan/25 rounded-2xl font-mono text-[11.5px] text-gray-300 space-y-1.5 text-left bg-black/50 select-all">
                  <span className="text-brand-cyan block font-sans text-[9px] uppercase tracking-wider font-extrabold pb-1 border-b border-white/5 mb-1.5">💻 EXPORT & COMPILE TERMINAL COMMANDS:</span>
                  <p><span className="text-gray-500 font-bold"># Step 1: Compiles static production package optimized for browser client</span></p>
                  <p className="text-white font-bold">$ <span className="text-emerald-400">npm run build</span></p>
                  <p><span className="text-gray-500 font-bold"># Step 2: ZIP compile directory assets into uploadable archive</span></p>
                  <p className="text-white font-bold">$ <span className="text-emerald-400">zip -r build-bundle.zip dist/</span></p>
                </div>

                {/* Deployer button simulation states */}
                <CustomizeDeploySimulator />

                {/* cPanel SPA Router Redirections Config file card */}
                <div className="p-4 bg-black/60 border border-gray-800 rounded-2xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase flex items-center">
                      <FileCode2 className="h-4.5 w-4.5 text-amber-500 mr-1.5" />
                      <span>.htaccess Configuration (Required for cPanel Routing)</span>
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`RewriteEngine On\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]\nRewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d\nRewriteRule ^ - [L]\nRewriteRule ^ /index.html [L]`);
                        alert("Copied rewrite .htaccess code! Paste this in your cPanel file manager.");
                      }}
                      className="text-[10px] text-brand-cyan hover:underline hover:text-white flex items-center cursor-pointer font-bold uppercase transition-all"
                    >
                      <Copy className="h-3 w-3 mr-1" /> Copy Code
                    </button>
                  </div>
                  <p className="text-[10.5px] text-gray-400 uppercase tracking-wider leading-relaxed">
                    Paste this code inside your <code className="text-white bg-black/80 px-1 rounded">/public_html/.htaccess</code> file in cPanel File Manager to ensure refreshing pages doesn't throw a "404 Not Found" error.
                  </p>
                  <pre className="p-3 bg-black rounded-lg border border-white/5 font-mono text-[10px] text-emerald-400 text-left overflow-x-auto">
{`RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^ /index.html [L]`}
                  </pre>
                </div>
              </div>

              {/* Transactions logs Mail dispatch log viewer */}
              <div className="p-6 rounded-2xl bg-cyber-charcoal border border-gray-850">
                <div className="flex justify-between items-center border-b border-gray-900 pb-3 mb-4">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest flex items-center">
                    <Inbox className="h-4.5 w-4.5 text-brand-cyan mr-2" />
                    <span>Historical SMTP Mail Delivery logs</span>
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 text-[8.5px] font-bold font-mono rounded bg-brand-purple/20 text-[#00f0ff] border border-brand-cyan/20">
                      {outboundEmails.length} Transits
                    </span>
                    {outboundEmails.length > 0 && (
                      <button
                        onClick={onClearEmailLogs}
                        className="text-[8.5px] font-bold bg-gray-800 text-gray-400 px-2 py-0.5 rounded hover:text-white transition-all uppercase"
                      >
                        Clear Log
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-450 uppercase tracking-widest leading-normal text-[10px] font-sans pb-3">Trace live transactional mail transmissions fired during checkout purchases or account registrations:</p>

                {outboundEmails.length === 0 ? (
                  <div className="py-8 text-center text-gray-500 text-xs shadow-inner bg-black/40 rounded-xl border border-white/5 font-mono">
                    Awaiting dispatch triggers. Sign up a new profile or purchase games in checkout to generate instant logs.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {outboundEmails.map((ml) => (
                      <div key={ml.id} className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-xs text-left space-y-2 hover:border-brand-cyan/35 transition-all">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="font-sans font-bold text-[10px] text-brand-cyan uppercase tracking-wider">
                            📧 LOG {ml.id}
                          </span>
                          <span className="text-[10px] text-gray-500 font-light">
                            {ml.timestamp}
                          </span>
                        </div>
                        <div className="space-y-1 block text-gray-400 text-[11px]">
                          <p>SENDER:    <span className="text-white font-bold">{ml.sender}</span></p>
                          <p>RECIPIENT: <span className="text-brand-purple font-bold select-all">{ml.recipient}</span></p>
                          <p>SUBJECT:   <span className="text-[#00f0ff] font-bold">{ml.subject}</span></p>
                        </div>
                        
                        <div className="p-2.5 bg-[#15151f]/60 rounded-lg text-gray-300 font-mono text-[10.5px] leading-relaxed whitespace-pre-wrap select-all block border border-white/5">
                          {ml.body}
                        </div>

                        <div className="flex justify-between items-center text-[9px] text-gray-500 pt-1 border-t border-white/5 uppercase">
                          <span>SMTP Gateway: <span className="text-white font-bold">{ml.gateway}</span></span>
                          <span className="text-emerald-400 font-black animate-pulse flex items-center">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 mr-1 inline-block"></span>
                            DELIVERABILITY: COMPLIANT PASS
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

    </section>
  );
}

// Private deployment helper wrapper to contain local state safely avoiding infinite re-renders
function CustomizeDeploySimulator() {
  const [deployState, setDeployState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [deployProgress, setDeployProgress] = useState(0);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  const triggerMockDeployment = () => {
    setDeployState('running');
    setDeployProgress(0);
    setConsoleLines(['[System Terminal Link initialized]', 'Establishing secure cPanel session over TLS: success.']);
    
    const lines = [
      'Linking container tunnel path: israjets@yourdomain:/home/israjets/public_html',
      'Receiving archive build payload file: build-bundle.zip (748.2 KB)',
      'Unpacking archive: inflating and extracting folders...',
      'Verified assets directory structure: /dist /assets index.html',
      'Applying secure dynamic server rewrite guidelines: .htaccess verified',
      'Telemetry audit: indexing static source links passed',
      'Production deployment live: Domain verified ONLINE at https://yourdomain.com!'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDeployProgress(progress);
      
      const linesToLog = Math.floor((progress / 100) * lines.length);
      const outputLines = ['[System Terminal Link initialized]', 'Establishing secure cPanel session over TLS: success.'];
      for (let i = 0; i < linesToLog; i++) {
        outputLines.push(`[${new Date().toLocaleTimeString()}] ${lines[i]}`);
      }
      setConsoleLines(outputLines);

      if (progress >= 100) {
        clearInterval(interval);
        setDeployState('completed');
      }
    }, 350);
  };

  return (
    <div className="pt-2 border-t border-white/5 space-y-3">
      {deployState === 'idle' ? (
        <button
          type="button"
          onClick={triggerMockDeployment}
          className="w-full py-3 rounded-full bg-brand-cyan hover:bg-[#00f0ff]/10 hover:text-white text-black font-black uppercase text-[11px] tracking-widest cursor-pointer transition-all active:scale-98 text-center shadow-[0_4px_14px_rgba(0,240,255,0.1)] block"
        >
          Deploy ZIP to cPanel public_html (Simulate Extract)
        </button>
      ) : deployState === 'running' ? (
        <div className="space-y-2 p-4 rounded-2xl border border-white/5 bg-black/40 font-mono text-[10.5px] text-gray-400">
          <div className="flex justify-between font-bold uppercase tracking-wide text-[9px] text-[#00f0ff]">
            <span>UPLOADING & EXTRACTING ARCHIVE IN FILE MANAGER...</span>
            <span>{deployProgress}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple transition-all duration-100"
              style={{ width: `${deployProgress}%` }}
            ></div>
          </div>
          
          <div className="pt-2 max-h-[140px] overflow-y-auto leading-relaxed text-left text-gray-400 font-mono text-[10px] space-y-0.5">
            {consoleLines.map((ln, idx) => (
              <p key={idx} className={idx === consoleLines.length - 1 ? "text-brand-purple font-bold" : ""}>{ln}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-emerald-950 bg-emerald-950/20 text-emerald-400 font-mono text-[11px] space-y-1">
            <span className="font-extrabold flex items-center gap-1.5 uppercase font-sans text-xs text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping"></span>
               CPANEL FILE EXTRACTION COMPLETED SUCCESSFULLY
            </span>
            <p className="text-[10px] text-gray-400 uppercase font-sans">
              Dynamic bundle extracted into public_html, and default .htaccess rules merged. Your store is now active and routing is securely configured on cPanel.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => setDeployState('idle')}
            className="w-full py-2 bg-gray-900 border border-white/10 rounded-full text-white text-[10px] uppercase font-bold hover:bg-gray-800 transition-all select-none"
          >
            Run Another Deployment Trace
          </button>
        </div>
      )}
    </div>
  );
}
