import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Database, Plus, Trash2, Edit2, TrendingUp, DollarSign, Activity, ShoppingCart, RefreshCw, Smartphone, ListCollapse, Play, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Product, Platform } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function AdminDashboard({
  products,
  onAddProduct,
  onUpdateStock,
  onDeleteProduct
}: AdminDashboardProps) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'automation'>('analytics');

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

    </section>
  );
}
