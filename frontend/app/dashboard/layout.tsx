'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Gauge,
  Brain,
  Zap,
  Settings,
  Share2,
  Users,
  TrendingUp,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Eye,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface MenuItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  submenu?: { name: string; href: string; icon?: React.ComponentType<{ className?: string }> }[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Analytics',
    icon: BarChart3,
    href: '/dashboard/analytics',
    badge: 'GA4',
  },
  {
    name: 'Cockpit',
    icon: Gauge,
    href: '/dashboard/cockpit',
  },
  {
    name: 'AI Performance',
    icon: Brain,
    href: '/dashboard/ai-performance',
  },
  {
    name: 'Automação',
    icon: Zap,
    href: '/dashboard/automacao',
  },
  {
    name: 'Configurações',
    icon: Settings,
    href: '/dashboard/configuracoes',
  },
  {
    name: 'Social Flow',
    icon: Share2,
    href: '/dashboard/social-flow',
  },
  {
    name: 'Gestão',
    icon: Users,
    href: '/dashboard/gestao',
  },
  {
    name: 'Meta Ads',
    icon: TrendingUp,
    href: '/dashboard/meta-ads',
    submenu: [
      { name: 'Visão Geral', href: '/dashboard/meta-ads/visao-geral', icon: Eye },
      { name: 'WhatsApp', href: '/dashboard/meta-ads/whatsapp', icon: MessageCircle },
    ],
  },
  {
    name: 'Vendas',
    icon: ShoppingCart,
    href: '/dashboard/vendas',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Meta Ads']);
  const pathname = usePathname();

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((item) => item !== menuName)
        : [...prev, menuName]
    );
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'w-64 bg-[#1e293b] border-r border-gray-800'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
            <h1 className="text-xl font-bold text-white">Humano Saúde</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-2 hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                const isExpanded = expandedMenus.includes(item.name);
                const active = isActive(item.href);

                return (
                  <li key={item.name}>
                    {/* Menu Item */}
                    <div>
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleMenu(item.name)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                            {item.badge && (
                              <Badge
                                variant="secondary"
                                className="bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                            active
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      )}
                    </div>

                    {/* Submenu */}
                    {hasSubmenu && isExpanded && (
                      <ul className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                        {item.submenu!.map((subitem) => {
                          const SubIcon = subitem.icon;
                          const subActive = isActive(subitem.href);

                          return (
                            <li key={subitem.name}>
                              <Link
                                href={subitem.href}
                                className={cn(
                                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                                  subActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                )}
                              >
                                {SubIcon && <SubIcon className="h-4 w-4" />}
                                <span>{subitem.name}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold">
                HS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Humano Saúde</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'ml-0'
        )}
      >
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-800 bg-[#1e293b] px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 hover:bg-gray-800">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
