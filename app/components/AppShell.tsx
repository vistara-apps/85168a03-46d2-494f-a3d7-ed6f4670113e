'use client';

import { useState } from 'react';
import { Home, User, TrendingUp, Settings2, Menu, X } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Analytics', href: '/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/settings', icon: Settings2 },
  ];

  const shellClasses = cn(
    'min-h-screen',
    variant === 'glass' ? 'bg-bg/95 backdrop-blur-lg' : 'bg-bg'
  );

  return (
    <div className={shellClasses}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                <span className="text-bg font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gradient">POV</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'text-text-secondary hover:text-fg hover:bg-surface/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-3">
              <Wallet>
                <ConnectWallet>
                  <div className="flex items-center space-x-2 bg-surface border border-accent/30 rounded-lg px-3 py-2 hover:bg-accent/10 transition-all duration-200">
                    <Avatar className="w-6 h-6" />
                    <Name className="text-sm font-medium" />
                  </div>
                </ConnectWallet>
              </Wallet>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-surface border border-white/10 hover:bg-surface/80 transition-all duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-surface/95 backdrop-blur-sm border-t border-white/10">
            <nav className="max-w-3xl mx-auto px-4 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'text-text-secondary hover:text-fg hover:bg-surface/50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-sm border-t border-white/10">
        <nav className="flex items-center justify-around py-2">
          {navigation.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-fg'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Padding for Mobile Navigation */}
      <div className="md:hidden h-20" />
    </div>
  );
}
