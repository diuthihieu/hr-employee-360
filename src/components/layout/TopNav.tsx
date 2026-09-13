'use client';

import React from 'react';
import { Search, Shield, Bell, User, Sparkles } from 'lucide-react';
import { useRole, UserRole } from '@/context/RoleContext';

interface TopNavProps {
  onOpenSearch: () => void;
}

export function TopNav({ onOpenSearch }: TopNavProps) {
  const { role, setRole } = useRole();

  const roleLabels: Record<UserRole, string> = {
    HR_ADMIN: 'HR Admin (Full Access)',
    HR_MANAGER: 'HR Manager',
    HR_USER: 'HR Staff',
    VIEWER: 'Read Only Viewer',
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-20 shrink-0 shadow-xs">
      {/* Left: Global Search Launcher */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center gap-3 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs font-normal hover:bg-slate-100 hover:border-slate-300 transition-all group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          <span className="truncate text-slate-500">Search employee name, code, document, training, project...</span>
          <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right: Role Switcher & User Profile */}
      <div className="flex items-center gap-4">
        {/* Role Selector Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 border border-slate-200 rounded-lg text-xs">
          <Shield className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-slate-500 font-medium text-[11px] uppercase tracking-wider">Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="bg-transparent font-semibold text-slate-800 text-xs focus:outline-none cursor-pointer"
          >
            <option value="HR_ADMIN">HR Admin</option>
            <option value="HR_MANAGER">HR Manager</option>
            <option value="HR_USER">HR User</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>

        {/* Notifications Icon */}
        <button
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors relative"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 border border-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200"></div>

        {/* Current HR User */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-medium text-xs border border-slate-700 shadow-xs">
            HR
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-semibold text-slate-800 leading-tight">Sarah Jenkins</span>
            <span className="text-[10px] text-slate-500">{roleLabels[role]}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
