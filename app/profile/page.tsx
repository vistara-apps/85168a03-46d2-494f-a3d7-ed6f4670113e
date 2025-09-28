'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { UserProfileHeader } from '../components/UserProfileHeader';
import { OpinionCard } from '../components/OpinionCard';
import { ReviewCard } from '../components/ReviewCard';
import { User, Opinion, Review } from '@/lib/types';
import { MOCK_USERS } from '@/lib/constants';
import { MessageSquare, Star, Settings2 } from 'lucide-react';

// Mock user data
const mockUser: User = {
  ...MOCK_USERS[0],
  bio: 'Crypto enthusiast and professional reviewer. Helping the community make informed decisions through honest, detailed reviews.',
};

const mockUserOpinions: Opinion[] = [
  {
    opinionId: '1',
    userId: '1',
    text: "The future of DeFi is in user experience. Projects that prioritize simplicity and security will win in the long run.",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    tipAmount: 0.045,
    tipCount: 15,
    user: mockUser,
  },
  {
    opinionId: '2',
    userId: '1',
    text: "Base's low transaction fees are a game-changer for micro-tipping. Finally, we can reward quality content without worrying about gas costs.",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    tipAmount: 0.032,
    tipCount: 11,
    user: mockUser,
  },
];

const mockUserReviews: Review[] = [
  {
    reviewId: '1',
    userId: '1',
    businessId: '1',
    rating: 5,
    text: "Outstanding hardware wallet with excellent build quality. The security features are comprehensive and the user interface is intuitive. Highly recommended for serious crypto holders.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isVerifiedPurchase: true,
    helpfulCount: 28,
    user: mockUser,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'opinions' | 'reviews'>('opinions');
  const [user] = useState<User>(mockUser);
  const [opinions] = useState<Opinion[]>(mockUserOpinions);
  const [reviews] = useState<Review[]>(mockUserReviews);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Profile Header */}
        <UserProfileHeader user={user} variant="showStats" />

        {/* Profile Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="btn-primary flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Share New Opinion
          </button>
          <button className="btn-secondary flex-1">
            <Star className="w-4 h-4 mr-2" />
            Write Review
          </button>
          <button className="btn-secondary">
            <Settings2 className="w-4 h-4 mr-2" />
            Settings
          </button>
        </div>

        {/* Content Tabs */}
        <div className="glass-card p-6">
          <div className="flex items-center space-x-6 mb-6 border-b border-white/10">
            <button
              onClick={() => setActiveTab('opinions')}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 transition-all duration-200 ${
                activeTab === 'opinions'
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-fg'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="font-medium">My Opinions ({opinions.length})</span>
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
              <span className="font-medium">My Reviews ({reviews.length})</span>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {activeTab === 'opinions' ? (
              opinions.length > 0 ? (
                opinions.map((opinion) => (
                  <OpinionCard
                    key={opinion.opinionId}
                    opinion={opinion}
                    variant="withTipButton"
                    onTip={() => {}} // Disabled for own opinions
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageSquare className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-fg mb-2">No opinions yet</h3>
                  <p className="text-text-secondary mb-4">
                    Share your first opinion and start earning tips!
                  </p>
                  <button className="btn-primary">
                    Share Opinion
                  </button>
                </div>
              )
            ) : (
              reviews.length > 0 ? (
                reviews.map((review) => (
                  <ReviewCard key={review.reviewId} review={review} />
                ))
              ) : (
                <div className="text-center py-12">
                  <Star className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-fg mb-2">No reviews yet</h3>
                  <p className="text-text-secondary mb-4">
                    Write your first review and help others make informed decisions!
                  </p>
                  <button className="btn-primary">
                    Write Review
                  </button>
                </div>
              )
            )}
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Earnings Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Total Earned</span>
                <span className="text-lg font-semibold text-accent">0.077 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">This Month</span>
                <span className="text-lg font-semibold text-fg">0.023 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Average per Opinion</span>
                <span className="text-lg font-semibold text-fg">0.038 ETH</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Tips Given</span>
                <span className="text-lg font-semibold text-primary">0.156 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Reviews Written</span>
                <span className="text-lg font-semibold text-fg">{reviews.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary">Opinions Shared</span>
                <span className="text-lg font-semibold text-fg">{opinions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
