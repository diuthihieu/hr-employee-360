'use client';

import React, { useState, useEffect } from 'react';
import useRouter from 'next/navigation';
import Link from 'next/link';
import { Search, X, Users, FileText, Calendar, GraduationCap, ArrowRight, Loader2 } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    employees: any[];
    documents: any[];
    events: any[];
    training: any[];
  }>({
    employees: [],
    documents: [],
    events: [],
    training: [],
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ employees: [], documents: [], events: [], training: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Failed to search', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const hasResults =
    results.employees.length > 0 ||
    results.documents.length > 0 ||
    results.events.length > 0 ||
    results.training.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search employee name, code, document, event, course..."
            className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
            autoFocus
          />
          {loading && <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />}
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query.trim() && (
            <div className="py-8 text-center text-slate-400 text-xs">
              Type employee code (e.g., <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600">EMP-001</code>), document title, or event to search across People360.
            </div>
          )}

          {query.trim() && !loading && !hasResults && (
            <div className="py-8 text-center text-slate-500 text-xs font-medium">
              No matching records found for "{query}".
            </div>
          )}

          {/* Employees Category */}
          {results.employees.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span>Employees ({results.employees.length})</span>
              </div>
              <div className="space-y-1">
                {results.employees.map((emp) => (
                  <Link
                    key={emp.id}
                    href={`/employees/${emp.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center border border-slate-300">
                        {emp.fullName.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                          <span>{emp.fullName}</span>
                          <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {emp.employeeCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {emp.currentTitle} • {emp.currentDepartment}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Documents Category */}
          {results.documents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Documents ({results.documents.length})</span>
              </div>
              <div className="space-y-1">
                {results.documents.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/employees/${doc.employeeId}?tab=documents&docId=${doc.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {doc.documentTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded text-[10px]">
                          {doc.documentType}
                        </span>
                        <span>Employee: {doc.employee?.fullName}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Events Category */}
          {results.events.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-purple-600" />
                <span>Lifecycle Events ({results.events.length})</span>
              </div>
              <div className="space-y-1">
                {results.events.map((ev) => (
                  <Link
                    key={ev.id}
                    href={`/employees/${ev.employeeId}?tab=timeline`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {ev.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-purple-50 text-purple-700 px-1.5 py-0.2 rounded text-[10px]">
                          {ev.eventType}
                        </span>
                        <span>{ev.employee?.fullName}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Training Category */}
          {results.training.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                <span>Training Records ({results.training.length})</span>
              </div>
              <div className="space-y-1">
                {results.training.map((tr) => (
                  <Link
                    key={tr.id}
                    href={`/employees/${tr.employeeId}?tab=training`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group"
                  >
                    <div>
                      <div className="text-xs font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {tr.courseName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded text-[10px]">
                          {tr.courseCode}
                        </span>
                        <span>{tr.employee?.fullName}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Global Indexing Active</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
