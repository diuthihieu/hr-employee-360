'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FileText,
  Search,
  Filter,
  ExternalLink,
  Layers,
  ShieldCheck,
  GitCommit,
  UserX,
  FileCheck,
} from 'lucide-react';
import { clsx } from 'clsx';
import { DocumentViewerModal, DocumentData } from '@/components/documents/DocumentViewerModal';

function DocumentsContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') || 'ALL';

  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (typeFilter !== 'ALL') params.append('type', typeFilter);
        if (statusFilter !== 'ALL') params.append('status', statusFilter);
        if (searchQuery) params.append('q', searchQuery);

        const res = await fetch(`/api/documents?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
        }
      } catch (err) {
        console.error('Failed to fetch document explorer data', err);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchDocs, 200);
    return () => clearTimeout(timer);
  }, [typeFilter, statusFilter, searchQuery]);

  const documentTypes = [
    { id: 'ALL', label: 'All Document Types' },
    { id: 'EXIT_INTERVIEW_FORM', label: 'Exit Interview' },
    { id: 'TRANSFER_DECISION', label: 'Transfer Decision' },
    { id: 'APPOINTMENT_DECISION', label: 'Appointment Decision' },
    { id: 'LABOUR_CONTRACT', label: 'Labour Contract' },
    { id: 'PROBATION_ASSESSMENT', label: 'Probation Assessment' },
    { id: 'SALARY_DECISION', label: 'Salary Adjustment' },
    { id: 'RESIGNATION_LETTER', label: 'Resignation Letter' },
    { id: 'TERMINATION_AGREEMENT', label: 'Termination Agreement' },
    { id: 'CV', label: 'Curriculum Vitae' },
    { id: 'INTERVIEW_EVALUATION', label: 'Interview Evaluation' },
  ];

  const statusBadges: Record<string, string> = {
    VALID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    SUPERSEDED: 'bg-amber-50 text-amber-700 border-amber-200',
    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
    EXPIRED: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5" />
            <span>Navigation Mode B</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Explore by Record Type</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Browse and filter digital personnel file documents across all employees without moving original source files.
          </p>
        </div>
      </div>

      {/* Record Type Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {documentTypes.map((dt) => (
          <button
            key={dt.id}
            onClick={() => setTypeFilter(dt.id)}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all',
              typeFilter === dt.id
                ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            )}
          >
            {dt.label}
          </button>
        ))}
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document title, file name, employee name or code..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Document Status:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="VALID">VALID</option>
            <option value="SUPERSEDED">SUPERSEDED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* Document Explorer Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Repository & Path</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400 font-mono">
                    Indexing Personnel Documents...
                  </td>
                </tr>
              )}

              {!loading && documents.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                    No documents matching the selected filters.
                  </td>
                </tr>
              )}

              {!loading &&
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="font-semibold text-slate-900 hover:text-amber-700 transition-colors flex items-center gap-2 text-left"
                      >
                        <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <div>{doc.documentTitle}</div>
                          <div className="text-[10px] text-slate-400 font-mono font-normal">
                            Ver: {doc.version} • {doc.fileName}
                          </div>
                        </div>
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <a
                        href={`/employees/${doc.employeeId}`}
                        className="font-medium text-slate-800 hover:text-blue-600 transition-colors"
                      >
                        {doc.employee?.fullName}
                        <span className="text-[10px] text-slate-400 font-mono block">
                          {doc.employee?.employeeCode} • {doc.employee?.currentDepartment}
                        </span>
                      </a>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border border-slate-200">
                        {doc.documentType}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-600">
                      {new Date(doc.documentDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          'px-2 py-0.5 rounded text-[10px] font-bold border',
                          statusBadges[doc.documentStatus] || 'bg-slate-100 text-slate-700'
                        )}
                      >
                        {doc.documentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[10px] text-slate-500 max-w-xs truncate">
                      <span className="font-bold text-slate-700 block">{doc.sourceSystem}</span>
                      <span className="truncate block" title={doc.sourcePath}>
                        {doc.sourcePath}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded font-semibold text-xs transition-colors"
                      >
                        Preview PDF
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-slate-400">Loading Document Explorer...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
