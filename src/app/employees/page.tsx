'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Users, FileText, ArrowRight, UserPlus, Shield, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export default function EmployeeDirectoryPage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [deptFilter, setDeptFilter] = useState('ALL');

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (statusFilter !== 'ALL') params.append('status', statusFilter);
        if (deptFilter !== 'ALL') params.append('department', deptFilter);

        const res = await fetch(`/api/employees?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setEmployees(data);
        }
      } catch (err) {
        console.error('Failed to fetch employees', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchEmployees, 200);
    return () => clearTimeout(timer);
  }, [query, statusFilter, deptFilter]);

  const departments = Array.from(new Set(employees.map((e) => e.currentDepartment))).filter(Boolean);

  const statusBadges: Record<string, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PROBATION: 'bg-blue-50 text-blue-700 border-blue-200',
    OFFBOARDING: 'bg-amber-50 text-amber-700 border-amber-200',
    TERMINATED: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Navigation Mode A</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Explore by Employee</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an employee to open their complete centralized Employee 360 profile & lifecycle timeline.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, employee code (e.g. EMP-001), title, department..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PROBATION">PROBATION</option>
            <option value="OFFBOARDING">OFFBOARDING</option>
            <option value="TERMINATED">TERMINATED</option>
          </select>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* High Density Employee Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Current Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Manager</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Docs</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-mono">
                    Loading Employee Records...
                  </td>
                </tr>
              )}

              {!loading && employees.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-500 font-medium">
                    No employees matching the selected criteria.
                  </td>
                </tr>
              )}

              {!loading &&
                employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="py-3 px-4">
                      <Link
                        href={`/employees/${emp.id}`}
                        className="flex items-center gap-3 font-semibold text-slate-900 group-hover:text-blue-600 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                          {emp.fullName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div>{emp.fullName}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{emp.email}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] font-semibold text-slate-600">
                      {emp.employeeCode}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">{emp.currentTitle}</td>
                    <td className="py-3 px-4 text-slate-600">{emp.currentDepartment}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                      {emp.currentProject || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{emp.currentManager || '—'}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                      {new Date(emp.joinDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={clsx(
                          'inline-block px-2 py-0.5 rounded text-[10px] font-bold border',
                          statusBadges[emp.employmentStatus] || 'bg-slate-100 text-slate-700'
                        )}
                      >
                        {emp.employmentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <FileText className="w-3 h-3 text-amber-600" />
                        <span>{emp._count?.documents || 0}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/employees/${emp.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        <span>360 Profile</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
