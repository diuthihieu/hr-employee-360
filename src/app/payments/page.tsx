'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Search, Filter, Download, Plus, Clock } from 'lucide-react';

export default function PaymentsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/payments')
      .then(res => res.json())
      .then(data => {
        setRecords(data);
        setLoading(false);
      });
  }, []);

  return (
    <AppShell>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <Clock className="w-6 h-6 mr-2 text-emerald-600" />
              Bonus & Payments
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage bonuses, 13th-month salary, and other taxable payments</p>
          </div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Payment
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-t-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search employee or payment type..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <th className="px-6 py-3">Payment Date</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Period</th>
                <th className="px-6 py-3 text-right">Gross Amount</th>
                <th className="px-6 py-3 text-right">Tax Amount</th>
                <th className="px-6 py-3 text-right">Net Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">Loading...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">No payment records found.</td>
                </tr>
              ) : (
                records.map(record => (
                  <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 dark:text-white">{record.employee?.fullName}</div>
                      <div className="text-xs text-slate-500">{record.employee?.employeeCode}</div>
                    </td>
                    <td className="px-6 py-4">{new Date(record.paymentDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                        {record.paymentType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{record.paymentPeriod}</td>
                    <td className="px-6 py-4 text-right text-slate-600">
                      {record.grossAmount.toLocaleString()} {record.currency}
                    </td>
                    <td className="px-6 py-4 text-right text-rose-600">
                      -{record.taxAmount.toLocaleString()} {record.currency}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-emerald-700 dark:text-emerald-400">
                      {record.netAmount.toLocaleString()} {record.currency}
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
