'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  FileText,
  GraduationCap,
  TrendingUp,
  Clock,
  UserX,
  ArrowUpRight,
  GitBranch,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Activity,
  Layers,
  Search,
} from 'lucide-react';
import { DocumentViewerModal, DocumentData } from '@/components/documents/DocumentViewerModal';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-xs font-mono">
        Loading People360 Operations Data...
      </div>
    );
  }

  const { metrics, recentEvents } = data || {};

  return (
    <div className="space-y-6">
      {/* Dashboard Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Operational Intelligence Center</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            People360 – Employee Lifecycle & Personnel File
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Centralized document indexing, lifecycle history tracking, and workforce intelligence across source repositories.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/employees"
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Users className="w-4 h-4" />
            <span>Explore Employees</span>
          </Link>
          <Link
            href="/documents"
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Browse Documents</span>
          </Link>
        </div>
      </div>

      {/* Top Section: Compact Enterprise KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Active Staff</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics?.activeEmployees || 0}</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            Out of {metrics?.totalEmployees || 0} total headcount
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Indexed Files</span>
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics?.totalDocuments || 0}</div>
          <div className="text-[10px] text-emerald-600 font-mono mt-1 flex items-center gap-1">
            <FileCheck className="w-3 h-3" />
            <span>{metrics?.validDocuments || 0} Valid Source Files</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Training YTD</span>
            <GraduationCap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics?.totalTrainingHours || 0}h</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">
            Avg Score: {metrics?.avgTrainingScore || 0}%
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Movements</span>
            <GitBranch className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics?.totalMovements || 0}</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Promotions & Transfers</div>
        </div>

        {/* KPI 5 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">OT Hours YTD</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{metrics?.totalOtHours || 0}h</div>
          <div className="text-[10px] text-slate-500 mt-1 font-mono">Monthly summarized</div>
        </div>

        {/* KPI 6 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Offboarding</span>
            <UserX className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {(metrics?.offboardingEmployees || 0) + (metrics?.terminatedEmployees || 0)}
          </div>
          <div className="text-[10px] text-rose-600 font-mono mt-1">
            {metrics?.offboardingEmployees || 0} In Progress
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Lifecycle Events & Document Repository Integrity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Recent Employee Lifecycle Movements */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recent Employee Lifecycle Movements
              </h3>
            </div>
            <Link href="/employees" className="text-xs font-semibold text-blue-600 hover:underline">
              View All Employees →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentEvents?.map((ev: any) => (
              <div key={ev.id} className="p-4 hover:bg-slate-50/80 transition-colors flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                    {ev.employee?.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/employees/${ev.employeeId}?tab=timeline`}
                        className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {ev.employee?.fullName}
                      </Link>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {ev.employee?.employeeCode}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {ev.eventType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium mt-1">{ev.title}</p>
                    {ev.description && <p className="text-[11px] text-slate-500 mt-0.5">{ev.description}</p>}

                    {/* Old Value -> New Value Badge */}
                    {ev.oldValue && ev.newValue && (
                      <div className="mt-2 inline-flex items-center gap-2 text-[11px] font-mono bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                        <span className="text-slate-500 line-through">{ev.oldValue}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-emerald-700 font-semibold">{ev.newValue}</span>
                      </div>
                    )}

                    {/* Attached Document Badges */}
                    {ev.documents && ev.documents.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {ev.documents.map((doc: any) => (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDoc(doc)}
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2 py-0.5 rounded transition-colors"
                          >
                            <FileText className="w-3 h-3 text-amber-600" />
                            <span>{doc.fileName}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 shrink-0">
                  {new Date(ev.eventDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1/3): Document Digital File Integrity & Quick Filters */}
        <div className="space-y-6">
          {/* Document Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Document Status Index</span>
              </h3>
              <Link href="/documents" className="text-xs text-blue-600 font-semibold hover:underline">
                Explorer →
              </Link>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg">
                <span className="font-semibold text-emerald-800">VALID Active Documents</span>
                <span className="font-mono font-bold text-emerald-900">{metrics?.validDocuments || 0}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg">
                <span className="font-semibold text-amber-800">SUPERSEDED Decisions</span>
                <span className="font-mono font-bold text-amber-900">{metrics?.supersededDocuments || 0}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-rose-50/60 border border-rose-200 rounded-lg">
                <span className="font-semibold text-rose-800">CANCELLED Decisions</span>
                <span className="font-mono font-bold text-rose-900">{metrics?.cancelledDocuments || 0}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              💡 <strong>System Architecture Note:</strong> Original files remain stored in SharePoint, OneDrive, and HR File Servers. People360 centralizes metadata and timeline relationships.
            </div>
          </div>

          {/* Quick Nav: Explore by Record Type */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Explore by Record Type</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Browse employees grouped directly by specific decision types (e.g. Exit Interviews, Transfer Decisions, Labour Contracts).
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <Link
                href="/documents?type=EXIT_INTERVIEW_FORM"
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>Exit Interviews</span>
                <span className="text-rose-400 font-mono text-[11px]">→</span>
              </Link>
              <Link
                href="/documents?type=TRANSFER_DECISION"
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>Transfers</span>
                <span className="text-blue-400 font-mono text-[11px]">→</span>
              </Link>
              <Link
                href="/documents?type=APPOINTMENT_DECISION"
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>Appointments</span>
                <span className="text-purple-400 font-mono text-[11px]">→</span>
              </Link>
              <Link
                href="/documents?type=LABOUR_CONTRACT"
                className="p-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-between"
              >
                <span>Contracts</span>
                <span className="text-emerald-400 font-mono text-[11px]">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
