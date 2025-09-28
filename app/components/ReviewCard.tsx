'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Shield, MessageCircle } from 'lucide-react';
import { Review } from '@/lib/types';
import { formatRelativeTime, generateStars, getReputationLevel } from '@/lib/utils';

interface ReviewCardProps {
  review: Review;
  variant?: 'compact' | 'detailed';
}

export function ReviewCard({ review, variant = 'detailed' }: ReviewCardProps) {
  const [isHelpful, setIsHelpful] = useState<boolean | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || Math.floor(Math.random() * 20) + 1);

  const user = review.user || {
    userId: review.userId,
    username: 'anonymous_reviewer',
    reputationScore: 0,
    avatar: '👤',
  };

  const business = review.business || {
    businessId: review.businessId,
    name: 'Unknown Business',
    category: 'General',
  };

  const reputationLevel = getReputationLevel(user.reputationScore);

  const handleHelpful = (helpful: boolean) => {
    if (isHelpful === helpful) {
      setIsHelpful(null);
      setHelpfulCount(prev => helpful ? prev - 1 : prev + 1);
    } else {
      const prevHelpful = isHelpful;
      setIsHelpful(helpful);
      setHelpfulCount(prev => {
        if (prevHelpful === null) {
          return helpful ? prev + 1 : prev - 1;
        } else {
          return helpful ? prev + 2 : prev - 2;
        }
      });
    }
  };

  if (variant === 'compact') {
    return (
      <div className="review-card">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-sm">
            {user.avatar || '👤'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-fg">{user.username}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              {review.isVerifiedPurchase && (
                <Shield className="w-3 h-3 text-green-400" />
              )}
            </div>
            <p className="text-sm text-fg line-clamp-2">{review.text}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-text-secondary">
                {formatRelativeTime(review.createdAt)}
              </span>
              <span className="text-xs text-text-secondary">
                {helpfulCount} found helpful
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="review-card animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-lg">
            {user.avatar || '👤'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-fg">{user.username}</span>
              <span 
                className="px-2 py-1 rounded-full text-xs font-medium"
                style={{ 
                  backgroundColor: `${reputationLevel.color}20`,
                  color: reputationLevel.color 
                }}
              >
                {reputationLevel.label}
              </span>
              {review.isVerifiedPurchase && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                  <Shield className="w-3 h-3" />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>
            <span className="text-sm text-text-secondary">
              {formatRelativeTime(review.createdAt)}
            </span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-medium text-accent">{business.name}</div>
          <div className="text-xs text-text-secondary">{business.category}</div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-lg font-semibold text-fg">{review.rating}/5</span>
      </div>

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-fg leading-relaxed">{review.text}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleHelpful(true)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              isHelpful === true
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'text-text-secondary hover:text-green-400 hover:bg-green-500/10'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful</span>
          </button>

          <button
            onClick={() => handleHelpful(false)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              isHelpful === false
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-text-secondary hover:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <ThumbsDown className="w-4 h-4" />
            <span>Not Helpful</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium text-text-secondary hover:text-fg hover:bg-surface/50 transition-all duration-200">
            <MessageCircle className="w-4 h-4" />
            <span>Reply</span>
          </button>
        </div>

        <span className="text-sm text-text-secondary">
          {helpfulCount} found this helpful
        </span>
      </div>
    </div>
  );
}
