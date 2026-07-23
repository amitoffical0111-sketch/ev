export const formatPrice = (price: number): string =>
  `₹ ${price.toLocaleString('en-IN')}/-`;

export const formatPriceShort = (price: number): string =>
  `₹${(price / 1000).toFixed(0)}K`;

export const slugify = (text: string): string =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const truncate = (text: string, length: number): string =>
  text.length > length ? `${text.substring(0, length)}...` : text;

export const getBadgeClass = (badge: string): string => {
  const map: Record<string, string> = {
    'RTO Approved': 'badge-rto',
    'Non-RTO': 'badge-non-rto',
    'New': 'bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded',
    'Best Seller': 'bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded',
  };
  return map[badge] || 'badge-rto';
};

export const getImageUrl = (url?: string): string => {
  if (!url) return '/bbb.png';
  if (url.startsWith('http') || url.startsWith('/')) return url;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '')}${url}`;
};

export const calculateEMI = (principal: number, rate: number = 9, tenure: number = 24): number => {
  const monthlyRate = rate / 12 / 100;
  return Math.round(principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1));
};

export const cn = (...classes: (string | undefined | null | false)[]): string =>
  classes.filter(Boolean).join(' ');
