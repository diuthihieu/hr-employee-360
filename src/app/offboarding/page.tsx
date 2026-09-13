'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserX, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { DocumentViewerModal, DocumentData } from '@/components/documents/DocumentViewerModal';

export default function OffboardingPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => {
        const offboardingOrTerminated = data.filter((e: any) =>
          ['OFFBOARDING', 'TERMINATED'].includes(e.employmentStatus)
        );
        setEmployees(offboardingOrTerminated);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
          <UserX className="w-3.5 h-3.5" />
          <span>Exit Lifecycle Control</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Offboarding Cases Tracker</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Structured case management for employee resignations, exit interviews, handovers, and final contract termination agreements.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
          Active & Completed Offboarding Cases ({employees.length})
        </h3>

        <div className="space-y-4">
          {employees.map((emp) => (
            <div key={emp.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 text-sm">{emp.fullName}</span>
                  <span className="font-mono text-xs text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {emp.employeeCode}
                  </span>
                  <span
                    className={clsx(
                      'px-2 py-0.5 rounded text-[10px] font-bold border',
                      emp.employmentStatus === 'TERMINATED'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    )}
                  >
                    {emp.employmentStatus}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Department: {emp.currentDepartment} • Manager: {emp.currentManager}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/employees/${emp.id}?tab=offboarding`}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
                >
                  <span>Open Offboarding Checklist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDoc && (
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
