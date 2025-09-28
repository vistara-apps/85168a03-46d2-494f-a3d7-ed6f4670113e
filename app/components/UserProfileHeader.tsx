'use client';

import { User } from '@/lib/types';
import { formatAmount, getReputationLevel } from '@/lib/utils';
import { Coins, Star, Shield, TrendingUp } from 'lucide-react';

interface UserProfileHeaderProps {
  user: User;
  variant?: 'showStats';
}

export function UserProfileHeader({ user, variant = 'showStats' }: UserProfileHeaderProps) {
  const reputationLevel = getReputationLevel(user.reputationScore);

  return (
    <div className="glass-card p-6 mb-6 animate-fade-in">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-20 h-20 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full flex items-center justify-center text-3xl">
          {user.avatar || '👤'}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-2xl font-bold text-fg">{user.username}</h1>
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: `${reputationLevel.color}20`,
                color: reputationLevel.color 
              }}
            >
              {reputationLevel.label}
            </span>
          </div>

          {user.bio && (
            <p className="text-text-secondary mb-3">{user.bio}</p>
          )}

          <div className="text-sm text-text-secondary">
            <span>Wallet: </span>
            <span className="font-mono text-accent">{user.walletAddress}</span>
          </div>
        </div>
      </div>

      {variant === 'showStats' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-2xl font-bold text-fg">{user.reputationScore}</div>
            <div className="text-sm text-text-secondary">Reputation</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg mx-auto mb-2">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-fg">{user.verifiedPurchaseCount}</div>
            <div className="text-sm text-text-secondary">Verified</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-lg mx-auto mb-2">
              <Coins className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-fg">{user.tipReceivedCount}</div>
            <div className="text-sm text-text-secondary">Tips Received</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-500/20 rounded-lg mx-auto mb-2">
              <Star className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-fg">{user.tipSentCount}</div>
            <div className="text-sm text-text-secondary">Tips Sent</div>
          </div>
        </div>
      )}
    </div>
  );
}
