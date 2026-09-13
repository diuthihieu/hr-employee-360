'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap, Award, BookOpen, Clock, Users } from 'lucide-react';

export default function TrainingPage() {
  const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Workforce Learning Intelligence</span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Training & Development</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Track employee course completions, certifications, and learning hours inside & outside working time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Total Training Hours</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">68.0h</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Courses Completed</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">3 Courses</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-semibold uppercase">Avg Test Score</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">91.6%</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] text-slate-400 font-semibold uppercase font-mono">Inside Work Hours</span>
          <div className="text-2xl font-bold text-purple-700 mt-1">48.0h</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
          Employee Training Summary Directory
        </h3>
        <p className="text-xs text-slate-500">
          Select an employee from the directory to view detailed course transcripts, certificates, and scores.
        </p>

        <div className="divide-y divide-slate-100 text-xs">
          {employees.map((emp) => (
            <div key={emp.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">{emp.fullName}</span> ({emp.employeeCode})
                <div className="text-[11px] text-slate-500">{emp.currentTitle} • {emp.currentDepartment}</div>
              </div>
              <a
                href={`/employees/${emp.id}?tab=training`}
                className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs hover:bg-emerald-100 transition-colors"
              >
                View Training Records
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
