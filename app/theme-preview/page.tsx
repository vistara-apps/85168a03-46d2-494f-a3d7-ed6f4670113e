'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { OpinionCard } from '../components/OpinionCard';
import { TipButton } from '../components/TipButton';
import { useTheme } from '../components/ThemeProvider';
import { Palette, Check } from 'lucide-react';

const themes = [
  { id: 'default', name: 'Professional Finance', description: 'Dark navy with gold accents' },
  { id: 'celo', name: 'CELO', description: 'Black background with yellow accents' },
  { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
  { id: 'base', name: 'Base', description: 'Base blue theme' },
  { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue' },
];

const mockOpinion = {
  opinionId: 'preview',
  userId: 'preview-user',
  text: "This is a preview of how opinions look in different themes. The design adapts to each blockchain's visual identity while maintaining readability and functionality.",
  createdAt: new Date(),
  tipAmount: 0.025,
  tipCount: 8,
  user: {
    userId: 'preview-user',
    username: 'theme_preview',
    reputationScore: 1250,
    avatar: '🎨',
    walletAddress: '0x1234...5678',
    bio: 'Theme preview user',
    verifiedPurchaseCount: 0,
    tipReceivedCount: 0,
    tipSentCount: 0,
    createdAt: new Date(),
  },
};

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Palette className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-bold text-gradient">Theme Preview</h1>
          </div>
          <p className="text-text-secondary">
            Preview how POV Coin looks across different blockchain themes
          </p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Select Theme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent/10'
                    : 'border-white/10 bg-surface/50 hover:border-accent/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-fg">{themeOption.name}</h3>
                  {theme === themeOption.id && (
                    <Check className="w-5 h-5 text-accent" />
                  )}
                </div>
                <p className="text-sm text-text-secondary">{themeOption.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg">Component Previews</h2>

          {/* Buttons */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
              <TipButton onTip={() => {}} />
            </div>
          </div>

          {/* Cards */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-accent mb-2">$12,450</div>
                <div className="text-sm text-text-secondary">Metric Card</div>
              </div>
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-primary mb-2">2,847</div>
                <div className="text-sm text-text-secondary">Primary Color</div>
              </div>
              <div className="metric-card text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">15,623</div>
                <div className="text-sm text-text-secondary">Success Color</div>
              </div>
            </div>
          </div>

          {/* Opinion Card */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Opinion Card</h3>
            <OpinionCard
              opinion={mockOpinion}
              onTip={() => {}}
            />
          </div>

          {/* Color Palette */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-bg rounded-lg mx-auto mb-2 border border-white/20"></div>
                <div className="text-sm font-medium text-fg">Background</div>
                <div className="text-xs text-text-secondary">--color-bg</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-surface rounded-lg mx-auto mb-2"></div>
                <div className="text-sm font-medium text-fg">Surface</div>
                <div className="text-xs text-text-secondary">--color-surface</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent rounded-lg mx-auto mb-2"></div>
                <div className="text-sm font-medium text-fg">Accent</div>
                <div className="text-xs text-text-secondary">--color-accent</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
                <div className="text-sm font-medium text-fg">Primary</div>
                <div className="text-xs text-text-secondary">--color-primary</div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-fg mb-4">Typography</h3>
            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-bold text-gradient">Display Text</h1>
                <p className="text-sm text-text-secondary">text-4xl font-bold</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-fg">Heading Text</h2>
                <p className="text-sm text-text-secondary">text-2xl font-semibold</p>
              </div>
              <div>
                <p className="text-base leading-7 text-fg">
                  Body text with proper line height for readability across all themes.
                </p>
                <p className="text-sm text-text-secondary">text-base leading-7</p>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary">Caption text for secondary information</p>
                <p className="text-sm text-text-secondary">text-sm font-medium</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
