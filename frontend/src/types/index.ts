export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: Category;
  badge: string;
  tagline: string;
  description: string;
  shortDescription: string;
  images: string[];
  video?: string;
  brochure?: string;
  price: number;
  discountPrice?: number;
  emiStartsFrom?: number;
  specifications: Specifications;
  features: string[];
  accessories: Accessory[];
  colors: ProductColor[];
  isActive: boolean;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  ratings: { average: number; count: number };
  views: number;
  createdAt: string;
}

export interface Specifications {
  motor?: string;
  motorPower?: string;
  battery?: string;
  batteryCapacity?: string;
  chargingTime?: string;
  range?: string;
  topSpeed?: string;
  loadCapacity?: string;
  brakes?: string;
  tyreSize?: string;
  wheelBase?: string;
  groundClearance?: string;
  seatHeight?: string;
  kerbWeight?: string;
  dimensions?: string;
  warranty?: string;
  chargerType?: string;
  ipRating?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
}

export interface Accessory {
  name: string;
  price: number;
  image?: string;
}

export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface Dealer {
  _id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: Address;
  location?: { lat: number; lng: number };
  logo?: string;
  isActive: boolean;
  isVerified: boolean;
  status: string;
  workingHours?: string;
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface Booking {
  _id: string;
  bookingId: string;
  type: 'test_ride' | 'purchase';
  customer: {
    name: string;
    email: string;
    phone: string;
    city?: string;
    state?: string;
  };
  product: Product;
  dealer?: Dealer;
  preferredDate?: string;
  preferredTime?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'dealer' | 'customer';
  avatar?: string;
  isActive: boolean;
  permissions: string[];
}

export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  avatar?: string;
  rating: number;
  review: string;
  product?: Product;
  isFeatured: boolean;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  category?: string;
  tags: string[];
  author?: User;
  isPublished: boolean;
  isFeatured: boolean;
  publishedAt?: string;
  views: number;
  createdAt: string;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
}

export interface HeroSlider {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  stats?: { icon: string; label: string; value: string }[];
  isActive: boolean;
  sortOrder: number;
}

export interface FinancePartner {
  _id: string;
  name: string;
  logo?: string;
  description?: string;
  interestRate?: string;
  tenure?: string;
  minAmount?: number;
  maxAmount?: number;
  website?: string;
  isActive: boolean;
}

export interface SiteSettings {
  site_name?: string;
  site_tagline?: string;
  site_email?: string;
  site_phone?: string;
  site_address?: string;
  working_hours?: string;
  whatsapp_number?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  primary_color?: string;
  secondary_color?: string;
  top_bar_text?: string;
  meta_title?: string;
  meta_description?: string;
  [key: string]: string | undefined;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  total?: number;
  page?: number;
  limit?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}
