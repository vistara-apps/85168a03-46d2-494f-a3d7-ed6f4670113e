'use client';

import { useState } from 'react';
import { Coins, Check } from 'lucide-react';
import { TIP_AMOUNTS } from '@/lib/constants';
import { formatAmount, formatUSD } from '@/lib/utils';

interface TipButtonProps {
  onTip: (amount: number) => void;
  disabled?: boolean;
  variant?: 'default' | 'tipped';
}

export function TipButton({ onTip, disabled = false, variant = 'default' }: TipButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasTipped, setHasTipped] = useState(variant === 'tipped');

  const handleTip = async (amount: number) => {
    setIsProcessing(true);
    try {
      await onTip(amount);
      setHasTipped(true);
      setIsOpen(false);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setHasTipped(false);
      }, 3000);
    } catch (error) {
      console.error('Tip failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasTipped) {
    return (
      <button className="tip-button tipped" disabled>
        <Check className="w-4 h-4" />
        <span>Tipped!</span>
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled || isProcessing}
        className="tip-button"
      >
        <Coins className="w-4 h-4" />
        <span>{isProcessing ? 'Processing...' : 'Tip'}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Tip Menu */}
          <div className="absolute bottom-full right-0 mb-2 z-50 bg-surface border border-white/10 rounded-lg shadow-card p-3 min-w-48 animate-slide-up">
            <div className="text-sm font-medium text-fg mb-3">Choose tip amount</div>
            <div className="space-y-2">
              {TIP_AMOUNTS.map((tip) => (
                <button
                  key={tip.value}
                  onClick={() => handleTip(tip.value)}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium bg-bg hover:bg-accent/10 hover:border-accent/30 border border-white/10 transition-all duration-200"
                >
                  <span className="text-fg">{tip.label}</span>
                  <span className="text-text-secondary">{tip.usd}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  const customAmount = prompt('Enter custom amount (ETH):');
                  if (customAmount && !isNaN(Number(customAmount))) {
                    handleTip(Number(customAmount));
                  }
                }}
                disabled={isProcessing}
                className="w-full px-3 py-2 rounded-lg text-sm font-medium text-accent hover:bg-accent/10 border border-accent/30 transition-all duration-200"
              >
                Custom Amount
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
