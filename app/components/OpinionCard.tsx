'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share2, Coins } from 'lucide-react';
import { Opinion, User } from '@/lib/types';
import { formatRelativeTime, formatAmount, getReputationLevel } from '@/lib/utils';
import { TipButton } from './TipButton';

interface OpinionCardProps {
  opinion: Opinion;
  variant?: 'withTipButton';
  onTip?: (opinionId: string, amount: number) => void;
}

export function OpinionCard({ opinion, variant = 'withTipButton', onTip }: OpinionCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 5);
  
  const user = opinion.user || {
    userId: opinion.userId,
    username: 'anonymous_user',
    reputationScore: 0,
    avatar: '👤',
  };

  const reputationLevel = getReputationLevel(user.reputationScore);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Opinion by ${user.username}`,
          text: opinion.text,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="opinion-card animate-fade-in">
      {/* User Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-lg">
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
            </div>
            <span className="text-sm text-text-secondary">
              {formatRelativeTime(opinion.createdAt)}
            </span>
          </div>
        </div>
        
        {opinion.business && (
          <div className="text-right">
            <div className="text-sm font-medium text-accent">
              {opinion.business.name}
            </div>
            <div className="text-xs text-text-secondary">
              {opinion.business.category}
            </div>
          </div>
        )}
      </div>

      {/* Opinion Content */}
      <div className="mb-4">
        <p className="text-fg leading-relaxed">{opinion.text}</p>
      </div>

      {/* Earnings Display */}
      {opinion.tipAmount > 0 && (
        <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Coins className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              Earned {formatAmount(opinion.tipAmount)} ETH
            </span>
            <span className="text-xs text-text-secondary">
              from {opinion.tipCount} tips
            </span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
              isLiked
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'text-text-secondary hover:text-red-400 hover:bg-red-500/10'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likeCount}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium text-text-secondary hover:text-fg hover:bg-surface/50 transition-all duration-200">
            <MessageCircle className="w-4 h-4" />
            <span>Reply</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium text-text-secondary hover:text-fg hover:bg-surface/50 transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {variant === 'withTipButton' && onTip && (
          <TipButton
            onTip={(amount) => onTip(opinion.opinionId, amount)}
            disabled={false}
          />
        )}
      </div>
    </div>
  );
}
