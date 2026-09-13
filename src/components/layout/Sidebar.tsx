'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  History,
  FileText,
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  UserX,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  HardDrive,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Employees', href: '/employees', icon: Users },
    { name: 'Document Explorer', href: '/documents', icon: FileText },
    { name: 'Training & Development', href: '/training', icon: GraduationCap },
    { name: 'Performance Review', href: '/performance', icon: TrendingUp },
    { name: 'Attendance & OT', href: '/attendance', icon: Clock },
    { name: 'Offboarding Cases', href: '/offboarding', icon: UserX },
    { name: 'AI Extraction Workbench', href: '/ai-extraction', icon: Sparkles },
    { name: 'Source Connectors', href: '/connectors', icon: HardDrive },
  ];

  return (
    <aside
      className={clsx(
        'bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col justify-between transition-all duration-200 ease-in-out z-30 select-none shrink-0',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div>
        {/* Logo Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold tracking-wider text-sm shadow-sm shadow-blue-500/20">
                360
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-tight text-base leading-none">People360</span>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase mt-1">Lifecycle Engine</span>
              </div>
            </Link>
          )}
          {collapsed && (
            <div className="mx-auto w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              360
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-medium transition-colors relative group',
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 font-semibold border-l-2 border-blue-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                )}
                title={collapsed ? item.name : undefined}
              >
                <Icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200')} />
                {!collapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-800 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 text-[11px] text-slate-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>PROD MVP v1.0</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
