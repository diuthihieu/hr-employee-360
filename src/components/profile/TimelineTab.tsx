'use client';

import React, { useState } from 'react';
import {
  GitCommit,
  FileText,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  UserX,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
} from 'lucide-react';
import { clsx } from 'clsx';
import { DocumentData } from '@/components/documents/DocumentViewerModal';

interface TimelineTabProps {
  events: any[];
  records?: any[];
  onSelectDocument: (doc: DocumentData) => void;
}

export function TimelineTab({ events, records = [], onSelectDocument }: TimelineTabProps) {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const eventCategoryColors: Record<string, { bg: string; text: string; border: string; icon: any }> = {
    RECRUITMENT: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300', icon: Briefcase },
    ONBOARD: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: Briefcase },
    CONTRACT: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: FileText },
    PROBATION: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', icon: Award },
    PROJECT_CHANGE: { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200', icon: GitCommit },
    TRANSFER: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: GitCommit },
    APPOINTMENT: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: TrendingUp },
    SALARY_CHANGE: { bg: 'bg-emerald-50', text: 'text-emerald-800', border: 'border-emerald-300', icon: TrendingUp },
    TRAINING: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', icon: GraduationCap },
    PERFORMANCE_REVIEW: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: TrendingUp },
    COMPETENCY_REVIEW: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', icon: Award },
    CONCURRENT_ASSIGNMENT: { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200', icon: GitCommit },
    RESIGNATION: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: UserX },
    EXIT_INTERVIEW: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: UserX },
    HANDOVER: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200', icon: FileText },
    TERMINATION: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', icon: UserX },
    CUSTOM_MODULE: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200', icon: Sparkles },
  };

  // Merge legacy events and new dynamic records
  const unifiedEvents = [
    ...events.map(ev => ({
      ...ev,
      isLegacy: true,
      timestamp: new Date(ev.eventDate).getTime(),
    })),
    ...records.map(rec => ({
      id: rec.id,
      eventType: rec.module?.name?.toUpperCase().replace(/\s+/g, '_') || 'CUSTOM_MODULE',
      eventDate: rec.createdAt,
      title: `${rec.module?.name || 'Record'} Added`,
      description: rec.values?.map((v: any) => `${v.field?.fieldName}: ${v.stringValue || v.numberValue || v.dateValue || (v.booleanValue ? 'Yes' : 'No')}`).join(' | '),
      status: 'COMPLETED',
      documents: [],
      isLegacy: false,
      timestamp: new Date(rec.createdAt).getTime(),
    }))
  ].sort((a, b) => b.timestamp - a.timestamp); // Sort descending

  const filteredEvents = unifiedEvents.filter((ev) => {
    if (filterType === 'EMPLOYMENT' && !['ONBOARD', 'CONTRACT', 'PROBATION', 'TRANSFER', 'APPOINTMENT', 'PROJECT_CHANGE', 'SALARY_CHANGE', 'CONCURRENT_ASSIGNMENT'].includes(ev.eventType)) return false;
    if (filterType === 'TRAINING' && ev.eventType !== 'TRAINING') return false;
    if (filterType === 'PERFORMANCE' && !['PERFORMANCE_REVIEW', 'COMPETENCY_REVIEW'].includes(ev.eventType)) return false;
    if (filterType === 'OFFBOARDING' && !['RESIGNATION', 'EXIT_INTERVIEW', 'HANDOVER', 'TERMINATION'].includes(ev.eventType)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return ev.title.toLowerCase().includes(q) || (ev.description && ev.description.toLowerCase().includes(q)) || ev.eventType.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter and Search Bar for Timeline */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Event Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          {[
            { id: 'ALL', label: 'All Lifecycle Events' },
            { id: 'EMPLOYMENT', label: 'Employment Movements' },
            { id: 'TRAINING', label: 'Training' },
            { id: 'PERFORMANCE', label: 'Performance' },
            { id: 'OFFBOARDING', label: 'Offboarding' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={clsx(
                'px-3 py-1.5 rounded-lg border transition-colors',
                filterType === tab.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search within Timeline */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-medium">
            No events match the selected timeline filters.
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {filteredEvents.map((ev) => {
              const meta = eventCategoryColors[ev.eventType] || {
                bg: 'bg-slate-100',
                text: 'text-slate-700',
                border: 'border-slate-300',
                icon: GitCommit,
              };
              const IconComp = meta.icon;

              const formattedDate = new Date(ev.eventDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div key={ev.id} className="relative group">
                  {/* Timeline Node Icon */}
                  <div
                    className={clsx(
                      'absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center text-xs shadow-xs z-10 transition-transform group-hover:scale-110',
                      meta.border
                    )}
                  >
                    <IconComp className={clsx('w-3 h-3', meta.text)} />
                  </div>

                  {/* Event Card Panel */}
                  <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-2xs space-y-3">
                    {/* Top Row: Date & Event Type Badge */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            'font-mono text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider',
                            meta.bg,
                            meta.text,
                            meta.border
                          )}
                        >
                          {ev.eventType}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-500">{formattedDate}</span>
                      </div>

                      {ev.status && (
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Status: {ev.status}
                        </span>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                      {ev.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ev.description}</p>}
                    </div>

                    {/* Old Value -> New Value Delta Comparison */}
                    {ev.oldValue && ev.newValue && (
                      <div className="inline-flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono">
                        <span className="text-slate-500 line-through">{ev.oldValue}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-emerald-700 font-bold">{ev.newValue}</span>
                      </div>
                    )}

                    {/* Attached Documents */}
                    {ev.documents && ev.documents.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                          Attached Records:
                        </span>
                        {ev.documents.map((doc: any) => (
                          <button
                            key={doc.id}
                            onClick={() => onSelectDocument(doc)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-medium transition-colors shadow-2xs group"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-600 group-hover:scale-105 transition-transform" />
                            <span>{doc.fileName}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
