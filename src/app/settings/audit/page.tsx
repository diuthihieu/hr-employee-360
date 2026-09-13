'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Shield, Search, Filter, Download, Activity, Clock } from 'lucide-react';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/audit')
      .then(res => res.json())
      .then(data => {
        setLogs(data);
        setLoading(false);
      });
  }, []);

  const renderActionBadge = (action: string) => {
    switch(action) {
      case 'CREATE': return <span className="px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border-emerald-200">CREATE</span>;
      case 'UPDATE': return <span className="px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200">UPDATE</span>;
      case 'DELETE': return <span className="px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border-rose-200">DELETE</span>;
      default: return <span className="px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border-slate-200">{action}</span>;
    }
  };

  return (
    <AppShell>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <Shield className="w-6 h-6 mr-2 text-indigo-600" />
              Platform Audit Logs
            </h1>
            <p className="text-slate-500 text-sm mt-1">Immutable record of system changes, data modifications, and security events.</p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export Compliance Report
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-t-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search user, entity, or action..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Filter className="w-4 h-4 mr-2" /> Filter By Date
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl overflow-hidden">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Entity Type</th>
                <th className="px-6 py-3">Entity ID</th>
                <th className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500 flex justify-center items-center">
                    <Activity className="w-5 h-5 mr-2 animate-spin text-indigo-500" /> Loading logs...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">No audit logs found.</td>
                </tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-xs text-slate-600 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{log.userId}</td>
                    <td className="px-6 py-4">{renderActionBadge(log.action)}</td>
                    <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">{log.entityType}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{log.entityId}</td>
                    <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{log.details || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
