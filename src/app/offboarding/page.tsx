'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { UserX, Search, Filter, Download, Plus, CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';

export default function OffboardingPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/offboarding')
      .then(res => res.json())
      .then(data => {
        setRecords(data);
        setLoading(false);
      });
  }, []);

  const renderStatus = (status: string) => {
    switch(status) {
      case 'IN_PROGRESS': return <span className="bg-amber-50 text-amber-700 border-amber-200 px-2 py-0.5 rounded border text-xs font-medium">In Progress</span>;
      case 'COMPLETED': return <span className="bg-emerald-50 text-emerald-700 border-emerald-200 px-2 py-0.5 rounded border text-xs font-medium">Completed</span>;
      default: return <span className="bg-slate-100 text-slate-600 border-slate-200 px-2 py-0.5 rounded border text-xs font-medium">{status}</span>;
    }
  };

  const renderChecklistStep = (label: string, done: boolean) => (
    <div className="flex items-center gap-1.5 text-xs">
      {done ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Clock className="w-3.5 h-3.5 text-slate-300" />}
      <span className={done ? 'text-slate-700 font-medium' : 'text-slate-400'}>{label}</span>
    </div>
  );

  return (
    <AppShell>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <UserX className="w-6 h-6 mr-2 text-rose-600" />
              Offboarding Cases Tracker
            </h1>
            <p className="text-slate-500 text-sm mt-1">Structured case management for resignations, handovers, and final contract termination.</p>
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            New Case
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-t-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employee..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
            <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-slate-900 border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950/50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Dates</th>
                <th className="px-6 py-3">Exit Checklist Progress</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Loading...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No offboarding cases found.</td>
                </tr>
              ) : (
                records.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{record.employee?.fullName}</div>
                      <div className="text-xs text-slate-500">{record.employee?.employeeCode} • {record.employee?.currentDepartment}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between w-40">
                          <span className="text-slate-500">Resigned:</span>
                          <span className="font-mono text-slate-700">{new Date(record.resignationDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between w-40">
                          <span className="text-slate-500">Last Day:</span>
                          <span className="font-mono text-rose-600 font-medium">{new Date(record.lastWorkingDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {renderChecklistStep('Resignation', record.resignationDone)}
                        {renderChecklistStep('Handover', record.handoverDone)}
                        {renderChecklistStep('Exit Interview', record.exitInterviewDone)}
                        {renderChecklistStep('Final Timesheet', record.finalTimesheetDone)}
                        {renderChecklistStep('Asset Return', record.assetReturnDone)}
                        {renderChecklistStep('Termination Signed', record.terminationAgreementSigned)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {renderStatus(record.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/employees/${record.employeeId}?tab=offboarding`} className="text-rose-600 hover:text-rose-700 text-xs font-medium hover:underline">
                        View Case
                      </a>
                    </td>
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
