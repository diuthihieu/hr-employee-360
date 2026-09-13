'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Loader2,
  Layers,
} from 'lucide-react';
import { clsx } from 'clsx';

export default function AIExtractionWorkbenchPage() {
  const [selectedFile, setSelectedFile] = useState<string>('Transfer_Decision_MSS_2024_045.pdf');
  const [extracting, setExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [approved, setApproved] = useState(false);

  const handleExtract = async () => {
    setExtracting(true);
    setApproved(false);
    try {
      const res = await fetch('/api/ai-extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentName: selectedFile }),
      });
      if (res.ok) {
        const json = await res.json();
        setExtractedData(json.extractedData);
      }
    } catch (err) {
      console.error('Extraction error', err);
    } finally {
      setExtracting(false);
    }
  };

  const handleApprove = () => {
    setApproved(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Lifecycle Automation Workbench</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          AI Document Extraction & HR Review Gateway
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Upload unstructured HR decision PDFs to extract metadata, detect lifecycle events, and index files into People360.
        </p>
      </div>

      {/* Safety Principle Banner */}
      <div className="bg-purple-50/70 border border-purple-200 p-4 rounded-xl flex items-start gap-3 text-xs text-purple-900">
        <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-purple-950">AI Governance & Data Integrity Principle:</span>
          AI metadata extraction runs in a isolated sandbox environment. AI extracted data will <strong className="underline">NEVER</strong> directly mutate or overwrite Employee Master records without explicit HR review and human approval.
        </div>
      </div>

      {/* Main Grid: Upload & Extraction Controls / Side-by-Side Review */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Document Input & File Select */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-blue-600" />
            <span>Select Source Document for AI Processing</span>
          </h3>

          <div className="space-y-3 text-xs">
            <label className="block font-semibold text-slate-700">Sample Document Selection:</label>
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-800 text-xs focus:outline-none cursor-pointer"
            >
              <option value="Transfer_Decision_MSS_2024_045.pdf">Transfer_Decision_MSS_2024_045.pdf (Project Transfer)</option>
              <option value="Appointment_Senior_Developer_2025_002.pdf">Appointment_Senior_Developer_2025_002.pdf (Promotion)</option>
              <option value="Exit_Interview_Form_TranThiB_2024.pdf">Exit_Interview_Form_TranThiB_2024.pdf (Exit Interview)</option>
            </select>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50/50 space-y-2">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-xs font-semibold text-slate-700">{selectedFile}</div>
            <p className="text-[11px] text-slate-400">PDF Document • 420 KB • Primary Source: SharePoint HR Folder</p>
          </div>

          <button
            onClick={handleExtract}
            disabled={extracting}
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-2xs disabled:opacity-50"
          >
            {extracting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI Processing NER Entity Extraction...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Metadata Extraction</span>
              </>
            )}
          </button>
        </div>

        {/* Right Panel: AI Extracted Metadata & Human HR Review Workbench */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Extracted Metadata Review Workbench</span>
            </h3>

            {extractedData && (
              <span className="font-mono text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                Confidence: {Math.round(extractedData.confidenceScore * 100)}%
              </span>
            )}
          </div>

          {!extractedData && !extracting && (
            <div className="py-16 text-center text-slate-400 text-xs font-medium">
              Click "Run AI Metadata Extraction" to inspect extracted document fields.
            </div>
          )}

          {extracting && (
            <div className="py-16 text-center text-slate-500 text-xs font-mono animate-pulse">
              Extracting entities (Employee Code, Document Type, Effective Dates, Values)...
            </div>
          )}

          {extractedData && !extracting && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  AI Text Snippet Match
                </span>
                <p className="font-serif text-slate-700 italic text-[11px] leading-relaxed">
                  "{extractedData.extractedTextSnippet}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-medium block">Document Type</span>
                  <span className="font-bold text-slate-900 font-mono text-[11px]">{extractedData.documentType}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-medium block">Employee Subject</span>
                  <span className="font-bold text-slate-900">
                    {extractedData.employeeName} ({extractedData.employeeCode})
                  </span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-medium block">Decision Date</span>
                  <span className="font-mono font-semibold text-slate-800">{extractedData.decisionDate}</span>
                </div>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-medium block">Effective Date</span>
                  <span className="font-mono font-semibold text-slate-800">{extractedData.effectiveDate}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg flex items-center justify-between font-mono">
                <span className="text-[11px] text-slate-600">State Transition:</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 line-through">{extractedData.oldValue}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-emerald-700 font-bold">{extractedData.newValue}</span>
                </div>
              </div>

              {!approved ? (
                <button
                  onClick={handleApprove}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>HR Approve & Write Employee Lifecycle Event</span>
                </button>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-emerald-800 font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Approved & Indexed into Employee 360 Timeline!</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
