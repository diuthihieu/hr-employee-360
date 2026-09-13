'use client';

import React from 'react';
import { ShieldCheck, HardDrive, Cloud, FolderGit2, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

export default function SourceConnectorsPage() {
  const connectors = [
    {
      id: 'sharepoint',
      name: 'SharePoint HR Library',
      type: 'Cloud Repository',
      status: 'HEALTHY',
      indexedDocs: 4520,
      lastSync: '10 mins ago',
      pathPrefix: 'SharePoint://HR/...',
      icon: Cloud,
    },
    {
      id: 'onedrive',
      name: 'OneDrive Enterprise HR',
      type: 'Cloud Repository',
      status: 'HEALTHY',
      indexedDocs: 1240,
      lastSync: '25 mins ago',
      pathPrefix: 'OneDrive://HR-Transfers/...',
      icon: Cloud,
    },
    {
      id: 'nas-local',
      name: 'Local Network HR File Server',
      type: 'On-Premises NAS',
      status: 'HEALTHY',
      indexedDocs: 1082,
      lastSync: '1 hour ago',
      pathPrefix: '\\\\NAS-HR\\Contracts\\...',
      icon: HardDrive,
    },
    {
      id: 'gdrive',
      name: 'Google Drive HR Workspace',
      type: 'Cloud Repository',
      status: 'CONNECTED',
      indexedDocs: 0,
      lastSync: 'Standby',
      pathPrefix: 'GoogleDrive://HR-Archive/...',
      icon: FolderGit2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          <Layers className="w-3.5 h-3.5" />
          <span>Source Repository Integration Engine</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Generic Source Repository Connectors
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Original documents remain safely in their source folders. People360 centralizes metadata indexing, employee lineage, and event relationships.
        </p>
      </div>

      {/* Architecture Principle Box */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Source of Truth Principle</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            Zero File Replication Needed
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          People360 acts strictly as an <strong>index, metadata layer, timeline viewer, and analytical engine</strong>. Physical PDFs and contracts remain untouched inside SharePoint, OneDrive, or local network folders, ensuring compliance with existing security permissions.
        </p>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectors.map((c) => {
          const IconComp = c.icon;
          return (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{c.name}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">{c.type}</span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{c.status}</span>
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 font-mono text-xs">
                <span className="text-[10px] text-slate-400 block font-sans font-medium">Path Protocol Format</span>
                <span className="text-slate-800 font-bold text-[11px]">{c.pathPrefix}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-600 border-t border-slate-100 pt-3">
                <div>
                  Indexed Docs: <span className="font-bold text-slate-900">{c.indexedDocs.toLocaleString()}</span>
                </div>
                <div className="text-[11px] text-slate-400">Last Sync: {c.lastSync}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
