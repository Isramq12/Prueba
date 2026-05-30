export type Platform = 'PlayStation' | 'Xbox' | 'Nintendo Switch' | 'PC Gaming' | 'Retro Gaming' | 'Accessories' | 'Collectibles' | 'Merchandise';

export interface Product {
  id: string;
  title: string;
  platform: Platform;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  videoUrl?: string;
  genre: string;
  releaseDate: string;
  publisher: string;
  esrbRating: 'E' | 'T' | 'M' | 'RP';
  languages: string[];
  multiplayer: boolean;
  singleplayer: boolean;
  isDigital: boolean;
  isPhysical: boolean;
  stock: number;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  isPreOrder?: boolean;
  isDeal?: boolean;
  preOrderDate?: string;
  description: string;
  longDescription: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  platformSelected: Platform;
  formatSelected: 'Digital' | 'Physical';
}

export type LoyaltyLevel = 'Rookie' | 'Veteran' | 'Elite' | 'Legend';

export interface Coupon {
  code: string;
  discount: number; // percentage
  expiry: string;
  description: string;
  minSpend?: number;
}

export interface LoyaltyStatus {
  level: LoyaltyLevel;
  points: number;
  pointsToNextLevel: number;
  lifetimeSpend: number;
  exclusiveDiscounts: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  membershipStatus: 'Basic' | 'Premium VIP';
  membershipExpiry?: string;
  loyalty: LoyaltyStatus;
  savedAddresses: string[];
  savedPaymentMethods: { cardBrand: string; last4: string }[];
  wishlist: string[]; // Product IDs
}

export interface Order {
  id: string;
  date: string;
  products: {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    platform: Platform;
    format: 'Digital' | 'Physical';
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
  paymentMethod: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  likes: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  author: string;
  readTime: string;
  publishedDate: string;
  category: 'Gaming News' | 'Reviews' | 'Guides' | 'Hardware' | 'Upcoming Releases' | 'Retro Gaming';
  tags: string[];
}

export interface DiscussionThread {
  id: string;
  title: string;
  author: string;
  avatar: string;
  replies: number;
  views: number;
  lastActive: string;
  category: 'General' | 'LFG (Looking For Group)' | 'Help' | 'Lore & Spoilers';
}
