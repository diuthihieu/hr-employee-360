'use client';

import React from 'react';
import {
  User,
  Calendar,
  Briefcase,
  Building,
  FolderGit2,
  UserCheck,
  Clock,
  FileText,
  GraduationCap,
  TrendingUp,
  Award,
  GitBranch,
} from 'lucide-react';
import { clsx } from 'clsx';

interface EmployeeHeaderProps {
  employee: any;
}

export function EmployeeHeader({ employee }: EmployeeHeaderProps) {
  if (!employee) return null;

  // Calculate Tenure (e.g., 2Y 5M)
  const join = new Date(employee.joinDate);
  const end = employee.terminationDate ? new Date(employee.terminationDate) : new Date();
  const diffMonths = Math.floor((end.getTime() - join.getTime()) / (1000 * 60 * 60 * 24 * 30.4375));
  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const tenureStr = `${years > 0 ? `${years}Y ` : ''}${months}M`;

  const statusBadges: Record<string, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    PROBATION: 'bg-blue-50 text-blue-700 border-blue-200',
    OFFBOARDING: 'bg-amber-50 text-amber-700 border-amber-200',
    TERMINATED: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  // Metrics calculation
  const totalDocs = employee.documents?.length || 0;
  const totalTrainingCourses = employee.trainingRecords?.length || 0;
  const totalTrainingHours =
    employee.trainingRecords?.reduce((sum: number, t: any) => sum + (t.learningHours || 0), 0) || 0;
  const latestPerf = employee.performanceReviews?.[0]?.performanceScore || 'N/A';
  const totalOtHours =
    employee.attendanceSummaries?.reduce((sum: number, a: any) => sum + (a.otHours || 0), 0) || 0;
  const totalWorkingHours =
    employee.attendanceSummaries?.reduce((sum: number, a: any) => sum + (a.workingHours || 0), 0) || 0;
  const totalMovements =
    employee.events?.filter((e: any) =>
      ['TRANSFER', 'APPOINTMENT', 'PROJECT_CHANGE', 'CONCURRENT_ASSIGNMENT'].includes(e.eventType)
    ).length || 0;

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Avatar & Primary Info */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-white font-bold text-xl flex items-center justify-center border-2 border-slate-700 shadow-md shrink-0">
              {employee.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">{employee.fullName}</h1>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                  {employee.employeeCode}
                </span>
                <span
                  className={clsx(
                    'px-2.5 py-0.5 rounded text-[11px] font-bold border',
                    statusBadges[employee.employmentStatus] || 'bg-slate-100 text-slate-700'
                  )}
                >
                  {employee.employmentStatus}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-slate-800">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  {employee.currentTitle}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  {employee.currentDepartment}
                </span>
                {employee.currentProject && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <FolderGit2 className="w-3.5 h-3.5 text-purple-600" />
                      {employee.currentProject}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Key Administrative Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Join Date</span>
              <span className="font-mono font-semibold text-slate-800">
                {new Date(employee.joinDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {employee.terminationDate && (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 block">Termination</span>
                <span className="font-mono font-semibold text-rose-700">
                  {new Date(employee.terminationDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            )}

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Tenure</span>
              <span className="font-mono font-bold text-blue-600">{tenureStr}</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Manager</span>
              <span className="font-semibold text-slate-800">{employee.currentManager || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tenure</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{tenureStr}</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Indexed Files</div>
          <div className="text-base font-bold text-amber-700 mt-0.5">{totalDocs} Docs</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Training</div>
          <div className="text-base font-bold text-emerald-700 mt-0.5">
            {totalTrainingHours}h ({totalTrainingCourses})
          </div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance</div>
          <div className="text-base font-bold text-purple-700 mt-0.5">{latestPerf} / 5.0</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Working Hours</div>
          <div className="text-base font-bold text-slate-900 mt-0.5">{totalWorkingHours}h</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">OT YTD</div>
          <div className="text-base font-bold text-indigo-700 mt-0.5">{totalOtHours}h</div>
        </div>

        <div className="bg-white p-3 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Movements</div>
          <div className="text-base font-bold text-blue-600 mt-0.5">{totalMovements} Moves</div>
        </div>
      </div>
    </div>
  );
}
