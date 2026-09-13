'use client';

import React, { useEffect, useState } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';

export default function AttendancePage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
          <Clock className="w-3.5 h-3.5" />
          <span>Operational Rollup Data</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Attendance & Overtime Hub</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Monthly summarized working days, leave balances, punctuality statistics, and overtime trends.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
          Employee Monthly Attendance Summaries
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {employees.map((emp) => (
            <div key={emp.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">{emp.fullName}</span> ({emp.employeeCode})
                <div className="text-[11px] text-slate-500">{emp.currentTitle} • {emp.currentDepartment}</div>
              </div>
              <a
                href={`/employees/${emp.id}?tab=attendance`}
                className="px-3 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-semibold text-xs hover:bg-indigo-100 transition-colors"
              >
                View Attendance & OT Log
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
