export const TIP_AMOUNTS: { value: number; label: string; usd: string }[] = [
  { value: 0.001, label: '0.001 ETH', usd: '$2.50' },
  { value: 0.005, label: '0.005 ETH', usd: '$12.50' },
  { value: 0.01, label: '0.01 ETH', usd: '$25.00' },
  { value: 0.05, label: '0.05 ETH', usd: '$125.00' },
];

export const BUSINESS_CATEGORIES = [
  'Restaurant',
  'Retail',
  'Technology',
  'Healthcare',
  'Finance',
  'Entertainment',
  'Travel',
  'Education',
  'Real Estate',
  'Other',
];

export const REPUTATION_LEVELS = [
  { min: 0, max: 99, label: 'Newcomer', color: '#64748b' },
  { min: 100, max: 499, label: 'Contributor', color: '#3b82f6' },
  { min: 500, max: 999, label: 'Trusted', color: '#10b981' },
  { min: 1000, max: 4999, label: 'Expert', color: '#f59e0b' },
  { min: 5000, max: Infinity, label: 'Legend', color: '#ef4444' },
];

export const MOCK_USERS: any[] = [
  {
    userId: '1',
    walletAddress: '0x1234...5678',
    username: 'cryptoreview_pro',
    bio: 'Professional reviewer with 5+ years in crypto',
    reputationScore: 1250,
    verifiedPurchaseCount: 45,
    tipReceivedCount: 128,
    tipSentCount: 67,
    avatar: '👨‍💼',
    createdAt: new Date('2023-01-15'),
  },
  {
    userId: '2',
    walletAddress: '0x9876...5432',
    username: 'defi_explorer',
    bio: 'DeFi enthusiast and early adopter',
    reputationScore: 890,
    verifiedPurchaseCount: 32,
    tipReceivedCount: 95,
    tipSentCount: 143,
    avatar: '🚀',
    createdAt: new Date('2023-03-22'),
  },
];

export const MOCK_BUSINESSES: any[] = [
  {
    businessId: '1',
    name: 'CryptoMart',
    description: 'Your one-stop shop for crypto hardware and accessories',
    category: 'Technology',
    location: 'San Francisco, CA',
    profileImageUrl: '🏪',
    ownerWalletAddress: '0xabcd...efgh',
    rating: 4.7,
    reviewCount: 234,
    createdAt: new Date('2022-08-10'),
  },
  {
    businessId: '2',
    name: 'DeFi Diner',
    description: 'Farm-to-table restaurant accepting crypto payments',
    category: 'Restaurant',
    location: 'Austin, TX',
    profileImageUrl: '🍽️',
    ownerWalletAddress: '0x5678...9012',
    rating: 4.9,
    reviewCount: 156,
    createdAt: new Date('2023-01-05'),
  },
];
