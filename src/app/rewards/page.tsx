'use client';

import React, { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Gift, Coins, TrendingUp, Search, Plus, Filter, Target, ShoppingBag, Clock } from 'lucide-react';

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<'store' | 'rules' | 'requests'>('store');
  const [items, setItems] = useState<any[]>([]);
  const [rules, setRules] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/rewards/items').then(res => res.json()),
      fetch('/api/rewards/rules').then(res => res.json()),
      fetch('/api/rewards/requests').then(res => res.json())
    ]).then(([itemsData, rulesData, requestsData]) => {
      setItems(itemsData);
      setRules(rulesData);
      setRequests(requestsData);
      setLoading(false);
    });
  }, []);

  return (
    <AppShell>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <Gift className="w-6 h-6 mr-2 text-amber-500" />
              Knowledge Rewards Hub
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage engagement rules, internal points store, and employee redemption requests.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Wallet Analytics
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === 'store' ? 'New Item' : activeTab === 'rules' ? 'New Rule' : 'Process Request'}
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Points Distributed</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 flex items-center">
              45,200 <Coins className="w-5 h-5 ml-2 text-amber-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Active Rules</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{rules.length || 0}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Store Items</span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">{items.length || 0}</div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Pending Requests</span>
            <div className="text-2xl font-bold text-rose-600 mt-1">{requests.filter(r => r.status === 'PENDING').length || 0}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('store')}
              className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
                activeTab === 'store'
                  ? 'border-b-2 border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-500/10'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Reward Store
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
                activeTab === 'rules'
                  ? 'border-b-2 border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-500/10'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Target className="w-4 h-4 mr-2" />
              Earning Rules
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
                activeTab === 'requests'
                  ? 'border-b-2 border-amber-500 text-amber-600 bg-amber-50/50 dark:bg-amber-500/10'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Redemption Requests
              {requests.filter(r => r.status === 'PENDING').length > 0 && (
                <span className="ml-2 bg-rose-100 text-rose-700 py-0.5 px-2 rounded-full text-[10px] font-bold">
                  {requests.filter(r => r.status === 'PENDING').length}
                </span>
              )}
            </button>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button className="px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-lg text-sm flex items-center hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-500">Loading...</div>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                {activeTab === 'store' && (
                  <>
                    <thead className="bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 text-xs uppercase font-medium border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-3">Item Name</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3 text-right">Cost (KC)</th>
                        <th className="px-6 py-3 text-center">Available Qty</th>
                        <th className="px-6 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {items.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No store items configured.</td></tr>
                      ) : items.map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{item.name}</td>
                          <td className="px-6 py-4 text-slate-600 truncate max-w-xs">{item.description}</td>
                          <td className="px-6 py-4 text-right font-bold text-amber-600">{item.cost}</td>
                          <td className="px-6 py-4 text-center font-mono">{item.stockQuantity}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded text-[11px] font-bold ${item.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                              {item.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {activeTab === 'rules' && (
                  <>
                    <thead className="bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 text-xs uppercase font-medium border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-3">Rule Name</th>
                        <th className="px-6 py-3">Trigger / Condition</th>
                        <th className="px-6 py-3 text-right">Points Value (KC)</th>
                        <th className="px-6 py-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {rules.length === 0 ? (
                        <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-500">No earning rules configured.</td></tr>
                      ) : rules.map(rule => (
                        <tr key={rule.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{rule.name}</td>
                          <td className="px-6 py-4 text-slate-600">
                            <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded border border-slate-200 dark:border-slate-700">
                              {rule.condition}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-amber-600">+{rule.points}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded text-[11px] font-bold ${rule.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                              {rule.isActive ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}

                {activeTab === 'requests' && (
                  <>
                    <thead className="bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 text-xs uppercase font-medium border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-6 py-3">Employee</th>
                        <th className="px-6 py-3">Requested Item</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3 text-center">Status</th>
                        <th className="px-6 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {requests.length === 0 ? (
                        <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">No redemption requests.</td></tr>
                      ) : requests.map(req => (
                        <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-900 dark:text-white">{req.employee?.fullName}</div>
                            <div className="text-xs text-slate-500">{req.employee?.employeeCode} • {req.employee?.currentDepartment}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{req.item?.name}</div>
                            <div className="text-xs text-amber-600 font-bold">{req.item?.cost} KC</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-mono text-xs">{new Date(req.requestDate).toLocaleDateString()}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                              req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              req.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                              'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {req.status === 'PENDING' ? (
                              <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">Review</button>
                            ) : (
                              <span className="text-slate-400 text-xs">Closed</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
