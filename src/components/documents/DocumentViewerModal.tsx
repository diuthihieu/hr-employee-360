'use client';

import React, { useState } from 'react';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  GitCommit,
  AlertTriangle,
  History,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface DocumentData {
  id: string;
  documentType: string;
  documentTitle: string;
  documentDate: string | Date;
  effectiveDate?: string | Date | null;
  fileName: string;
  fileType: string;
  sourceSystem: string;
  sourcePath: string;
  sourceUrl?: string | null;
  version: string;
  documentStatus: string; // VALID, CANCELLED, SUPERSEDED, EXPIRED
  relationshipType?: string | null;
  parentDocument?: {
    id: string;
    documentTitle: string;
    documentType: string;
  } | null;
  employee?: {
    fullName: string;
    employeeCode: string;
    currentDepartment: string;
  } | null;
}

interface DocumentViewerModalProps {
  document: DocumentData | null;
  onClose: () => void;
}

export function DocumentViewerModal({ document, onClose }: DocumentViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [page, setPage] = useState(1);
  const totalPages = 3;

  if (!document) return null;

  const formattedDate = new Date(document.documentDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedEffectiveDate = document.effectiveDate
    ? new Date(document.effectiveDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'N/A';

  const statusColors: Record<string, string> = {
    VALID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    SUPERSEDED: 'bg-amber-50 text-amber-700 border-amber-200',
    CANCELLED: 'bg-rose-50 text-rose-700 border-rose-200',
    EXPIRED: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 md:p-6">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Viewer Header Bar */}
        <div className="h-14 bg-slate-900 text-white px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              PDF
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-wide text-white truncate max-w-md">
                {document.documentTitle}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                Version {document.version} • {document.fileName}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 rounded-md px-2 py-1 text-xs">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-md px-2 py-1 text-xs">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-400">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={document.sourceUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
              title="Open Source Repository"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline text-[11px]">Open Source</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-md transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: 65% Document Renderer / 35% Metadata Panel */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-slate-100">
          {/* Document Content View Canvas */}
          <div className="flex-1 bg-slate-200/70 p-6 overflow-y-auto flex items-start justify-center">
            <div
              className="bg-white shadow-xl border border-slate-300 rounded-sm w-full max-w-2xl p-10 text-slate-800 transition-all duration-150 space-y-6"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              {/* Document Header Template */}
              <div className="border-b-2 border-slate-800 pb-4 flex justify-between items-start">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    {document.documentType.replace(/_/g, ' ')}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">REF: {document.id.slice(0, 13).toUpperCase()}</p>
                </div>
                <div className="text-right font-mono text-xs text-slate-600">
                  <div>DATE: {formattedDate}</div>
                  <div>VER: {document.version}</div>
                </div>
              </div>

              {/* Document Subtitle & Employee Context */}
              <div className="bg-slate-50 p-4 rounded border border-slate-200 space-y-1">
                <div className="text-xs font-semibold text-slate-900">{document.documentTitle}</div>
                {document.employee && (
                  <div className="text-xs text-slate-600">
                    Subject Employee: <span className="font-semibold text-slate-900">{document.employee.fullName}</span> (
                    {document.employee.employeeCode})
                  </div>
                )}
              </div>

              {/* Mock Legal / Official Document Text */}
              <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-serif">
                <p>
                  <strong>DECISION & RECORD OF OFFICIAL HR ACTION:</strong>
                </p>
                <p>
                  Pursuant to HR Operations Standards and Personnel File Protocol, this document certifies the official record of action regarding{' '}
                  <span className="font-semibold">{document.employee?.fullName || 'the employee'}</span>. All associated administrative procedures and contractual amendments have been executed in compliance with internal policy.
                </p>

                <div className="my-6 border-y border-dashed border-slate-300 py-3 font-mono text-[11px] text-slate-600 space-y-1">
                  <div>• Document Classification: {document.documentType}</div>
                  <div>• Effective Date: {formattedEffectiveDate}</div>
                  <div>• Primary Repository: {document.sourceSystem}</div>
                  <div>• Target Document Path: {document.sourcePath}</div>
                </div>

                <p>
                  This record is indexed into People360 Digital Personnel File System while original physical and source cloud files remain under secure access in {document.sourceSystem}.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-10 flex justify-end">
                <div className="text-center font-mono text-xs text-slate-600 border-t border-slate-400 pt-2 w-48">
                  <p className="font-sans font-bold text-slate-900">APPROVED & INDEXED</p>
                  <p className="text-[10px] text-slate-400 mt-1">HR Operations Division</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Document Metadata & Relationship Panel */}
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-slate-200 p-5 overflow-y-auto shrink-0 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Document Metadata
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Document Status</span>
                  <span
                    className={clsx(
                      'inline-block px-2 py-0.5 rounded border font-semibold text-[11px] mt-0.5',
                      statusColors[document.documentStatus] || 'bg-slate-100 text-slate-700'
                    )}
                  >
                    {document.documentStatus}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Document Type</span>
                  <span className="font-medium text-slate-800">{document.documentType}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Issue Date</span>
                  <span className="font-medium text-slate-800">{formattedDate}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Effective Date</span>
                  <span className="font-medium text-slate-800">{formattedEffectiveDate}</span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[11px]">Version Control</span>
                  <span className="font-mono text-slate-800">v{document.version}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Source Repository</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700">{document.sourceSystem}</div>
                  <div className="text-[10px] font-mono text-slate-500 break-all mt-1">
                    {document.sourcePath}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 leading-snug">
                  * Note: Original source document remains preserved in source folder. People360 maintains index metadata.
                </div>
              </div>
            </div>

            {/* Document Lineage / Relationships */}
            {document.parentDocument && (
              <div className="border-t border-slate-200 pt-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <GitCommit className="w-4 h-4 text-amber-600" />
                  <span>Document Relationship</span>
                </h4>

                <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-lg text-xs space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    {document.relationshipType || 'SUPERSEDES'}
                  </span>
                  <div className="font-medium text-amber-900 truncate">
                    {document.parentDocument.documentTitle}
                  </div>
                  <div className="text-[10px] text-amber-700 font-mono">
                    ID: {document.parentDocument.id.slice(0, 8)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
