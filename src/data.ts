import { Product, BlogPost, Review, DiscussionThread, Coupon } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Cyber Chronicles: Neo Tokyo 2099',
    platform: 'PlayStation',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    genre: 'Action RPG',
    releaseDate: '2025-11-12',
    publisher: 'Aether Games',
    esrbRating: 'M',
    languages: ['English', 'Spanish', 'French', 'Japanese'],
    multiplayer: true,
    singleplayer: true,
    isDigital: true,
    isPhysical: true,
    stock: 45,
    isBestSeller: true,
    isDeal: true,
    description: 'Immerse yourself in Neo Tokyo, a high-tech, low-life metropolis ruled by colossal cyber-corporations. Outfit your merc with cyberware, make dark deals, and forge your legend.',
    longDescription: 'Explore every neon-lit corner of Tokyo in 2099. Experience next-gen ray-tracing visuals, reactive haptic feedback, and a seamless open-world with zero loading screens. Featuring over 120 hours of gameplay across branching storylines, deep customizable skill trees, and multi-threaded endings based on your neural implants and ethical choices. Get the definitive cyberpunk role-playing experience today.'
  },
  {
    id: '2',
    title: 'Chronicles of Eldoria: Shadow of the World Tree',
    platform: 'Xbox',
    price: 69.99,
    rating: 4.9,
    reviewCount: 1251,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Fantasy Adventure',
    releaseDate: '2026-02-15',
    publisher: 'Elysium Interactive',
    esrbRating: 'T',
    languages: ['English', 'German', 'Italian', 'Chinese'],
    multiplayer: false,
    singleplayer: true,
    isDigital: true,
    isPhysical: true,
    stock: 12,
    isBestSeller: true,
    isNewRelease: true,
    description: 'Rise from the ashes of a forgotten dynasty in Eldoria. Uncover ancient divine relics, defeat celestial beasts, and defend the failing light of the sacred World Tree.',
    longDescription: 'Prepare for an breathtaking dark fantasy epic that has captivated critics globally. Command responsive physics-based tactical action, scale giant monuments using dynamic parkour, and recruit historical war heroes to rebuild your broken kingdom. Fully enhanced for performance with seamless ultra-high frame-rate rendering and dynamic audio spatialization.'
  },
  {
    id: '3',
    title: 'Super Pocket Mario: Cosmic Odyssey',
    platform: 'Nintendo Switch',
    price: 59.99,
    rating: 4.95,
    reviewCount: 2311,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Platformer',
    releaseDate: '2026-01-20',
    publisher: 'Nintendo Corp',
    esrbRating: 'E',
    languages: ['English', 'Spanish', 'Japanese', 'Korean', 'Dutch'],
    multiplayer: true,
    singleplayer: true,
    isDigital: false,
    isPhysical: true,
    stock: 5,
    isBestSeller: true,
    isNewRelease: true,
    description: 'Jump, bounce, and spin across galactic toyboxes alongside Mario and friends. Discover endless power-ups, defeat mischievous bosses, and restore the stars!',
    longDescription: 'The ultimate cosmic adventure enters a pocket dimension! Team up locally or online with up to four friends in full co-op. Guide Mario across beautiful themed worlds packed with hidden secrets, customizable cosmetic costumes, and challenging retro bonus stages that test your agility.'
  },
  {
    id: '4',
    title: 'Starsector Vanguard: Galactic War',
    platform: 'PC Gaming',
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Space Simulator',
    releaseDate: '2025-08-30',
    publisher: 'Stella Games',
    esrbRating: 'T',
    languages: ['English', 'French', 'Russian', 'Simplified Chinese'],
    multiplayer: true,
    singleplayer: true,
    isDigital: true,
    isPhysical: false,
    stock: 100,
    isDeal: true,
    description: 'Pilot customizable battle dreadnoughts in deep space. Forge alliances with star factions, command armadas of fighters, and mine planetary belts.',
    longDescription: 'Take control of your own captain in a massive, sandboxed outer-rim galaxy. Buy, trade, fight and raid with dozens of modular ship hulls, tactical weapon systems, and real-time physical space flight controls. Optimized for maximum graphics, ultrawide layouts, and keyboard-mouse precision.'
  },
  {
    id: '5',
    title: 'Vintage Legend Quest (16-Bit Legacy)',
    platform: 'Retro Gaming',
    price: 39.99,
    rating: 4.7,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Retro RPG',
    releaseDate: '1994-04-10',
    publisher: 'SuperClassic Studios',
    esrbRating: 'E',
    languages: ['English', 'Japanese'],
    multiplayer: false,
    singleplayer: true,
    isDigital: false,
    isPhysical: true,
    stock: 2,
    isBestSeller: false,
    description: 'An authenticated collector physical cartridge of the definitive 16-Bit high fantasy narrative. Cleaned, restored, and complete in box.',
    longDescription: 'Own a historic piece of classic video game history. Fully tested, restored to pristine physical condition, and packaged inside its gorgeous replica retail packaging with historical booklet. Compatible with original retro consoles and modern aftermarket emulation systems.'
  },
  {
    id: '6',
    title: 'Nexus X-Pro Wireless Controller',
    platform: 'Accessories',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.85,
    reviewCount: 742,
    image: 'https://images.unsplash.com/photo-1600080972464-8e5f3580211e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1600080972464-8e5f3580211e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592578629295-73a151d3b14b?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Hardware',
    releaseDate: '2025-06-15',
    publisher: 'Nexus Esports Gear',
    esrbRating: 'E',
    languages: ['None'],
    multiplayer: true,
    singleplayer: true,
    isDigital: false,
    isPhysical: true,
    stock: 18,
    isDeal: true,
    isBestSeller: true,
    description: 'Pro gaming grade wireless controller with magnetic Hall-Effect triggers, swappable paddle buttons, and customizable rgb profile elements.',
    longDescription: 'Elevate your gaming with zero-drift Hall-Effect electromagnetic thumbsticks, interchangeable back pedals, multi-platform dual wireless connectivity, and high-frequency tactile response. Packed inside an elegant hardcover carrying pouch with gold-plated USB cabling.'
  },
  {
    id: '7',
    title: 'Mecha-Knight Alpha: Limited Collector Figurine',
    platform: 'Collectibles',
    price: 149.99,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1559893088-c0787ebfc084?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1559893088-c0787ebfc084?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Art & Figure',
    releaseDate: '2025-10-01',
    publisher: 'Nexus Fine Arts',
    esrbRating: 'RP',
    languages: ['None'],
    multiplayer: false,
    singleplayer: false,
    isDigital: false,
    isPhysical: true,
    stock: 4,
    isBestSeller: true,
    description: 'Stunning hand-painted 1/12 scale diecast mecha-knight collectible. Extremely limited edition with individually numbered authentication base cards.',
    longDescription: 'The ultimate prize centerpiece for your display shelf. Individually hand-crafted, numbering only 500 units worldwide, built with premium metallic finishes and integrated LED thruster modules (batteries included). Includes full Certificate of Authenticity.'
  },
  {
    id: '8',
    title: 'Cyber Chronicles: Aether Syndicate Hoodie',
    platform: 'Merchandise',
    price: 49.99,
    rating: 4.5,
    reviewCount: 112,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Apparel',
    releaseDate: '2025-05-18',
    publisher: 'Nexus Apparel',
    esrbRating: 'E',
    languages: ['None'],
    multiplayer: false,
    singleplayer: false,
    isDigital: false,
    isPhysical: true,
    stock: 60,
    isDeal: false,
    isBestSeller: false,
    description: 'Cyberpunk thematic heavy-weight fleece hoodie with luminous ultraviolet branding highlights and high-density technical graphic design overlays.',
    longDescription: 'Crafted with premium cotton-synthetic blends for maximum structural comfort and weather resistance. Includes dual neon structural drawstrings, micro-mesh breathability, and deep cybernetic utility chest pockets with heat-sealed water-resistant zips.'
  },
  {
    id: '9',
    title: 'Apex Hunters: Primal Wilds',
    platform: 'PlayStation',
    price: 69.99,
    rating: 4.75,
    reviewCount: 418,
    image: 'https://images.unsplash.com/photo-1548685913-fe6578583bad?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1548685913-fe6578583bad?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Co-op Action',
    releaseDate: '2026-06-30',
    publisher: 'Capcom Gaming Ltd',
    esrbRating: 'T',
    languages: ['English', 'German', 'French', 'Italian', 'Spanish'],
    multiplayer: true,
    singleplayer: true,
    isDigital: true,
    isPhysical: true,
    stock: 0,
    isPreOrder: true,
    preOrderDate: '2026-06-30',
    description: 'Hunt monstrous colossal titans with dynamic high-flying wire mechanics, form party lobbies, and forge custom elemental armor sets.',
    longDescription: 'The next chapter in the award-winning monster hunting tactical action genre. Cooperate online with millions globally across reactive micro-climates, harness deep combat strategies, and claim dominance in the primal wild forests. Pre-orders receive the Elite Guild Champion cosmetic pack!'
  },
  {
    id: '10',
    title: 'Metroid Dread (Special Edition Pack)',
    platform: 'Nintendo Switch',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewCount: 812,
    image: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Action Platformer',
    releaseDate: '2025-03-24',
    publisher: 'Nintendo Corp',
    esrbRating: 'T',
    languages: ['English', 'French', 'Spanish', 'Japanese'],
    multiplayer: false,
    singleplayer: true,
    isDigital: false,
    isPhysical: true,
    stock: 3,
    isDeal: true,
    isBestSeller: true,
    description: 'Help Samus escape dynamic relentless E.M.M.I. synthetic hunters in the spectacular award-winning sci-fi 2.5D atmosphere.',
    longDescription: 'Experience Samus Aran’s story as she explores ZDR. Face challenging hazards, absorb ancient Chozo combat upgrades, and reveal deep dark secrets. Includes original metallic physical steelbook storage frame and cards.'
  },
  {
    id: '11',
    title: 'Grand Auto Renegades: Vice Sands',
    platform: 'Xbox',
    price: 69.99,
    rating: 4.88,
    reviewCount: 4620,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Open World Crime',
    releaseDate: '2026-07-20',
    publisher: 'Rockford Games',
    esrbRating: 'M',
    languages: ['English', 'Spanish', 'Italian', 'German', 'Japanese'],
    multiplayer: true,
    singleplayer: true,
    isDigital: true,
    isPhysical: true,
    stock: 0,
    isPreOrder: true,
    preOrderDate: '2026-07-20',
    description: 'Embark on a thrilling sandbox journey through the sun-bleached neon highways, party clubs, and deep back-alleys of Vice Sands.',
    longDescription: 'The defining pop-culture gaming phenomenon returns with unmatched story realism, satirical commercial radio, full-scale vehicle physics, and a fully living, multiplayer sandbox supporting dynamic gang events, heist mechanics, and continuous content updates.'
  },
  {
    id: '12',
    title: 'Neon Catalyst: Future Horizon',
    platform: 'PC Gaming',
    price: 24.99,
    originalPrice: 44.99,
    rating: 4.55,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'
    ],
    genre: 'Cyberpunk Roguelike',
    releaseDate: '2025-01-10',
    publisher: 'Synergy Devs',
    esrbRating: 'T',
    languages: ['English', 'Spanish', 'Korean'],
    multiplayer: false,
    singleplayer: true,
    isDigital: true,
    isPhysical: false,
    stock: 999,
    isDeal: true,
    description: 'Hack, dash, and slash through high-tech virtual loops with custom reactive deck upgrades in this cybernetic techno roguelike.',
    longDescription: 'Harness a synthesized soundtrack that pulses with your gameplay. Hack firewalls, mount custom microchips, and escape the server cluster. Features procedurally generated rooms, modular abilities, and highly replayable runs with intense difficulty scaling.'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why Eldoria is the Ultimate Masterpiece of the Decade',
    summary: 'A deep dive into Elysium Interactive’s crowning fantasy-tactical achievement, detailing its lore depth, battle loops, and graphic innovations.',
    content: 'The scale of Eldoria: Shadow of the World Tree is nothing short of incredible. Featuring an absolute playground of parkour mechanics and combat routines, it sets a standard for open-world designs that other game development studios will study for years to come. In this article, we analyze how they achieved seamless asset loading and why the combat balancing feels both brutally challenging and immensely rewarding...',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
    author: 'Marcus Vance, Chief Editor',
    readTime: '5 min read',
    publishedDate: '2026-05-12',
    category: 'Reviews',
    tags: ['Eldoria', 'PlayStation', 'Xbox', 'RPG']
  },
  {
    id: 'b2',
    title: 'Next Gen VR Gear: What to Expect in Late 2026',
    summary: 'Analyze the highly rumored specifications, retinal display arrays, and feedback rigs for the newest console goggles.',
    content: 'Virtual Reality is about to make its greatest generational leap. Patent filings reveal integrated eye-tracking foveated rendering systems that cut graphic pipeline overheads by up to 60%, delivering cinematic photorealism at native 120Hz refresh rates. Let’s break down the expected cost profiles and weight adjustments that aim to make comfort long session standard...',
    coverImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=800',
    author: 'Elena Rostova, Hardware Guru',
    readTime: '8 min read',
    publishedDate: '2026-05-24',
    category: 'Hardware',
    tags: ['VR', 'Hardware', 'Tech Spec', 'Specs']
  },
  {
    id: 'b3',
    title: 'Complete Guide: Speedrunning Pocket Mario Cosmic Odyssey',
    summary: 'Unlock secret level skips, momentum slides, and dive cancels to climb the cosmic leaderboards in Record Times.',
    content: 'Whether navigating the star-shrouded toyboxes or escaping heavy gravity grids, speedrunning Pocket Mario is an art. Today we break down the frame-perfect crouch-slide trick that allows you to bypass the intermediate bridge sequences of Sector 4. Grab your Switch controllers and buckle in as we outline the optimal route...',
    coverImage: 'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?auto=format&fit=crop&q=80&w=800',
    author: 'Sora Takahashi, Retro Speedrunner',
    readTime: '12 min read',
    publishedDate: '2026-05-28',
    category: 'Guides',
    tags: ['Guides', 'Speedrun', 'Nintendo Switch', 'Mario']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    productName: 'Cyber Chronicles: Neo Tokyo 2099',
    author: 'NocturnalRex',
    rating: 5,
    date: '2026-05-20',
    comment: 'The ray-tracing on my system looks gorgeous! Neo Tokyo lives up to every bit of the cyberpunk dream. Highly recommend the digital copy for instantaneous downloads!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100',
    likes: 84
  },
  {
    id: 'r2',
    productId: '1',
    productName: 'Cyber Chronicles: Neo Tokyo 2099',
    author: 'ValkyrieGamer',
    rating: 4,
    date: '2026-05-18',
    comment: 'Incredible atmosphere. Some minor launch patches fixed the physics bugs, and now the combat feels slick and deep. The faction gear options are insanely diverse!',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    likes: 31
  },
  {
    id: 'r3',
    productId: '2',
    productName: 'Chronicles of Eldoria: Shadow of the World Tree',
    author: 'SlayerX',
    rating: 5,
    date: '2026-05-25',
    comment: 'An absolute masterpiece of audio and visual storytelling. Defeating the World Tree bosses required frame-perfect timing, and I loved every second of it. 10/10.',
    verified: true,
    likes: 128
  }
];

export const INITIAL_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'd1',
    title: 'LFG - Cyber Chronicles: Aether Raid Level 50 tonight!',
    author: 'CyberPunk_404',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    replies: 18,
    views: 420,
    lastActive: '5 mins ago',
    category: 'LFG (Looking For Group)'
  },
  {
    id: 'd2',
    title: 'Eldoria: Tips on how to defeat the Shadow Sentinel?',
    author: 'LuminaGamer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    replies: 34,
    views: 890,
    lastActive: '1 hour ago',
    category: 'Help'
  },
  {
    id: 'd3',
    title: 'Will subsequent Switch handhelds support old cartridges?',
    author: 'CartridgeCollector',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    replies: 52,
    views: 1205,
    lastActive: '2 days ago',
    category: 'General'
  }
];

export const SPECIAL_COUPONS: Coupon[] = [
  {
    code: 'NEXUS10',
    discount: 10,
    expiry: '2026-12-31',
    description: 'Get 10% off your next purchase instantly!',
    minSpend: 30
  },
  {
    code: 'LEGEND25',
    discount: 25,
    expiry: '2026-08-31',
    description: 'Exclusive legend reward: 25% off physical items!',
    minSpend: 100
  },
  {
    code: 'VIPFREE',
    discount: 15,
    expiry: '2026-09-30',
    description: 'Premium Members Special: 15% off anything!',
  }
];
