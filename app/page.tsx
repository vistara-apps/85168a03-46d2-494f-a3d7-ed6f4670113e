'use client';

import { useState, useEffect } from 'react';
import { Plus, TrendingUp, Clock, Star } from 'lucide-react';
import { AppShell } from './components/AppShell';
import { OpinionCard } from './components/OpinionCard';
import { ReviewCard } from './components/ReviewCard';
import { Opinion, Review } from '@/lib/types';
import { MOCK_USERS, MOCK_BUSINESSES } from '@/lib/constants';

// Mock data
const mockOpinions: Opinion[] = [
  {
    opinionId: '1',
    userId: '1',
    businessId: '1',
    text: "Just tried CryptoMart's new hardware wallet. The setup process is incredibly smooth and the security features are top-notch. Definitely worth the investment for anyone serious about crypto security.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tipAmount: 0.025,
    tipCount: 8,
    user: MOCK_USERS[0],
    business: MOCK_BUSINESSES[0],
  },
  {
    opinionId: '2',
    userId: '2',
    text: "Hot take: Most DeFi protocols are overcomplicating simple financial products. We need more focus on user experience and less on complex tokenomics that nobody understands.",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    tipAmount: 0.018,
    tipCount: 12,
    user: MOCK_USERS[1],
  },
  {
    opinionId: '3',
    userId: '1',
    businessId: '2',
    text: "DeFi Diner's crypto payment integration is seamless! Paid with USDC and got a 5% discount. The food was amazing too - their farm-to-table approach really shows in the quality.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    tipAmount: 0.012,
    tipCount: 5,
    user: MOCK_USERS[0],
    business: MOCK_BUSINESSES[1],
  },
];

const mockReviews: Review[] = [
  {
    reviewId: '1',
    userId: '2',
    businessId: '1',
    rating: 5,
    text: "Exceptional service and product quality. The team at CryptoMart really knows their stuff and helped me choose the perfect hardware wallet for my needs. Fast shipping and great customer support.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    isVerifiedPurchase: true,
    helpfulCount: 23,
    user: MOCK_USERS[1],
    business: MOCK_BUSINESSES[0],
  },
  {
    reviewId: '2',
    userId: '1',
    businessId: '2',
    rating: 5,
    text: "Best crypto-friendly restaurant in Austin! The atmosphere is great, staff is knowledgeable about crypto payments, and the food is absolutely delicious. Will definitely be back.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isVerifiedPurchase: true,
    helpfulCount: 18,
    user: MOCK_USERS[0],
    business: MOCK_BUSINESSES[1],
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'trending' | 'recent' | 'reviews'>('trending');
  const [opinions, setOpinions] = useState<Opinion[]>(mockOpinions);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  const handleTip = async (opinionId: string, amount: number) => {
    // Simulate tip transaction
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOpinions(prev => prev.map(opinion => 
      opinion.opinionId === opinionId 
        ? { 
            ...opinion, 
            tipAmount: opinion.tipAmount + amount,
            tipCount: opinion.tipCount + 1 
          }
        : opinion
    ));
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Your Opinion, Your Coin
          </h1>
          <p className="text-xl text-text-secondary mb-6 max-w-2xl mx-auto">
            Earn cryptocurrency by sharing valuable insights and reviews. 
            Tip others for their helpful opinions.
          </p>
          
          <button className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Share Your Opinion
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-accent mb-2">$12,450</div>
            <div className="text-sm text-text-secondary">Total Tips Distributed</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,847</div>
            <div className="text-sm text-text-secondary">Active Contributors</div>
          </div>
          <div className="metric-card text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">15,623</div>
            <div className="text-sm text-text-secondary">Opinions Shared</div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-6 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 transition-all duration-200 ${
                activeTab === 'trending'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-fg'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Trending</span>
            </button>
            
            <button
              onClick={() => setActiveTab('recent')}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 transition-all duration-200 ${
                activeTab === 'recent'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-fg'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span className="font-medium">Recent</span>
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 transition-all duration-200 ${
                activeTab === 'reviews'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-fg'
              }`}
            >
              <Star className="w-4 h-4" />
              <span className="font-medium">Reviews</span>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'reviews' ? (
              reviews.map((review) => (
                <ReviewCard key={review.reviewId} review={review} />
              ))
            ) : (
              opinions
                .sort((a, b) => {
                  if (activeTab === 'trending') {
                    return (b.tipAmount + b.tipCount * 0.001) - (a.tipAmount + a.tipCount * 0.001);
                  }
                  return b.createdAt.getTime() - a.createdAt.getTime();
                })
                .map((opinion) => (
                  <OpinionCard
                    key={opinion.opinionId}
                    opinion={opinion}
                    onTip={handleTip}
                  />
                ))
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-fg mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-text-secondary mb-6">
            Connect your Base wallet and start sharing your valuable opinions today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Connect Wallet
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
