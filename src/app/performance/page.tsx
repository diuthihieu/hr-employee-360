'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, Award, CheckCircle2 } from 'lucide-react';

export default function PerformancePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Talent Analytics</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Performance & Competency Overview</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Centralized view of historical performance ratings and competency gap metrics across evaluation cycles.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
          Performance & Competency Directory
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {employees.map((emp) => (
            <div key={emp.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">{emp.fullName}</span> ({emp.employeeCode})
                <div className="text-[11px] text-slate-500">{emp.currentTitle} • {emp.currentDepartment}</div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/employees/${emp.id}?tab=performance`}
                  className="px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded font-semibold text-xs hover:bg-purple-100 transition-colors"
                >
                  Performance Ratings
                </a>
                <a
                  href={`/employees/${emp.id}?tab=competency`}
                  className="px-3 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-semibold text-xs hover:bg-indigo-100 transition-colors"
                >
                  Competency Matrix
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
