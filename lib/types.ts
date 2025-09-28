export interface User {
  userId: string;
  walletAddress: string;
  username: string;
  bio?: string;
  reputationScore: number;
  verifiedPurchaseCount: number;
  tipReceivedCount: number;
  tipSentCount: number;
  avatar?: string;
  createdAt: Date;
}

export interface Business {
  businessId: string;
  name: string;
  description: string;
  category: string;
  location?: string;
  profileImageUrl?: string;
  ownerWalletAddress: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface Review {
  reviewId: string;
  userId: string;
  businessId: string;
  rating: number;
  text: string;
  createdAt: Date;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  user?: User;
  business?: Business;
}

export interface Opinion {
  opinionId: string;
  userId: string;
  businessId?: string;
  text: string;
  createdAt: Date;
  tipAmount: number;
  tipCount: number;
  user?: User;
  business?: Business;
}

export interface Tip {
  tipId: string;
  opinionId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  createdAt: Date;
  transactionHash: string;
  fromUser?: User;
  toUser?: User;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export type TipAmount = 0.001 | 0.005 | 0.01 | 0.05;

export interface WalletBalance {
  eth: number;
  usd: number;
}
