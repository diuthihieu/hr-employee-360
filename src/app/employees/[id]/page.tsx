'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  History,
  Briefcase,
  FileText,
  GraduationCap,
  TrendingUp,
  Award,
  Clock,
  UserX,
  FileCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { clsx } from 'clsx';
import { EmployeeHeader } from '@/components/profile/EmployeeHeader';
import { TimelineTab } from '@/components/profile/TimelineTab';
import { DocumentViewerModal, DocumentData } from '@/components/documents/DocumentViewerModal';

function EmployeeProfileContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const initialTab = searchParams.get('tab') || 'timeline';
  const initialDocId = searchParams.get('docId');

  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/employees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
        setLoading(false);

        // If docId is passed in URL, auto-open that document viewer
        if (initialDocId && data.documents) {
          const target = data.documents.find((d: any) => d.id === initialDocId);
          if (target) setSelectedDoc(target);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch employee 360 profile:', err);
        setLoading(false);
      });
  }, [id, initialDocId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-xs font-mono">
        Fetching Employee 360 Lifecycle Record...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Employee record not found.
      </div>
    );
  }

  const tabs = [
    { id: 'timeline', label: 'Timeline', icon: History, count: employee.events?.length },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'documents', label: 'Documents', icon: FileText, count: employee.documents?.length },
    { id: 'training', label: 'Training', icon: GraduationCap, count: employee.trainingRecords?.length },
    { id: 'performance', label: 'Performance', icon: TrendingUp, count: employee.performanceReviews?.length },
    { id: 'competency', label: 'Competency', icon: Award, count: employee.competencyAssessments?.length },
    { id: 'attendance', label: 'Attendance & OT', icon: Clock, count: employee.attendanceSummaries?.length },
    { id: 'interview', label: 'Recruitment', icon: Layers },
    { id: 'offboarding', label: 'Offboarding', icon: UserX, count: employee.offboardingCases?.length },
  ];

  return (
    <div className="space-y-6">
      {/* 360 Profile Header & Summary Bar */}
      <EmployeeHeader employee={employee} />

      {/* Horizontal Tab Navigation (Sticky) */}
      <div className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200 pt-2 backdrop-blur-md">
        <div className="flex overflow-x-auto gap-1 text-xs font-semibold scrollbar-none pb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2.5 rounded-t-lg border-b-2 transition-all whitespace-nowrap',
                  isActive
                    ? 'border-blue-600 text-blue-600 bg-white shadow-2xs font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                )}
              >
                <Icon className={clsx('w-4 h-4', isActive ? 'text-blue-600' : 'text-slate-400')} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={clsx(
                      'px-1.5 py-0.2 rounded-full text-[10px] font-mono',
                      isActive ? 'bg-blue-100 text-blue-800 font-bold' : 'bg-slate-200 text-slate-600'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: TIMELINE */}
      {activeTab === 'timeline' && (
        <TimelineTab events={employee.events || []} onSelectDocument={(doc) => setSelectedDoc(doc)} />
      )}

      {/* TAB 2: EMPLOYMENT */}
      {activeTab === 'employment' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Position & Contract Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-slate-400 font-medium block">Current Position</span>
              <div className="font-bold text-slate-900 text-sm">{employee.currentTitle}</div>
              <div className="text-slate-500">Department: {employee.currentDepartment}</div>
              <div className="text-slate-500 font-mono text-[11px]">Project: {employee.currentProject || 'N/A'}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-slate-400 font-medium block">Manager & Supervision</span>
              <div className="font-bold text-slate-900 text-sm">{employee.currentManager || 'N/A'}</div>
              <div className="text-slate-500">Location: {employee.location || 'Ho Chi Minh City'}</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
              <span className="text-slate-400 font-medium block">Employment Contract</span>
              <div className="font-bold text-emerald-700 text-sm">{employee.employmentStatus}</div>
              <div className="font-mono text-slate-600">
                Join Date: {new Date(employee.joinDate).toLocaleDateString('en-GB')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Digital Personnel File Documents ({employee.documents?.length || 0})
            </h3>
            <span className="text-[11px] text-slate-500">Click any document to open integrated viewer</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Effective Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Source System</th>
                  <th className="py-3 px-4 text-right">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employee.documents?.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{doc.documentTitle}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px]">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold border border-slate-200">
                        {doc.documentType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {new Date(doc.documentDate).toLocaleDateString('en-GB')}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {doc.effectiveDate ? new Date(doc.effectiveDate).toLocaleDateString('en-GB') : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-emerald-50 text-emerald-700 border-emerald-200">
                        {doc.documentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{doc.sourceSystem}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedDoc(doc)}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded font-semibold text-xs transition-colors"
                      >
                        Open Viewer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TRAINING */}
      {activeTab === 'training' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Training Courses & Certifications
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Course Code</th>
                    <th className="py-3 px-4">Course Name</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Completion Date</th>
                    <th className="py-3 px-4">Learning Hours (Inside / Outside)</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employee.trainingRecords?.map((tr: any) => (
                    <tr key={tr.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{tr.courseCode}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{tr.courseName}</td>
                      <td className="py-3 px-4 text-slate-600">{tr.trainingType}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {new Date(tr.completionDate).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-3 px-4 font-mono">
                        <span className="font-bold text-slate-900">{tr.learningHours}h</span> ({tr.learningHoursInsideWorkingTime}h inside / {tr.learningHoursOutsideWorkingTime}h outside)
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-blue-600">{tr.score ? `${tr.score}%` : 'N/A'}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {tr.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PERFORMANCE */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3 mb-4">
              Performance Review History
            </h3>

            <div className="space-y-3">
              {employee.performanceReviews?.map((pr: any) => (
                <div key={pr.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{pr.reviewPeriod}</span>
                      <span className="text-[10px] font-mono bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 font-bold">
                        {pr.rating}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Reviewer: {pr.reviewer} • Date: {new Date(pr.reviewDate).toLocaleDateString('en-GB')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-purple-700 font-mono">{pr.performanceScore} / 5.0</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: COMPETENCY */}
      {activeTab === 'competency' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Competency Assessment Matrix (Required vs Actual Level & Gap Analysis)
          </h3>

          {employee.competencyAssessments?.map((ca: any) => (
            <div key={ca.id} className="space-y-3">
              <div className="text-xs font-semibold text-slate-600">Review Period: {ca.reviewPeriod}</div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                    <th className="py-2.5 px-4">Competency Name</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-center">Required Level</th>
                    <th className="py-2.5 px-4 text-center">Actual Level</th>
                    <th className="py-2.5 px-4 text-center">Gap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ca.scores?.map((sc: any) => (
                    <tr key={sc.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-semibold text-slate-900">{sc.competencyName}</td>
                      <td className="py-3 px-4 text-slate-600">{sc.competencyCategory}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold">{sc.requiredLevel}</td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-blue-600">{sc.actualLevel}</td>
                      <td className="py-3 px-4 text-center font-mono">
                        <span
                          className={clsx(
                            'px-2 py-0.5 rounded font-bold text-[11px]',
                            sc.gap > 0 ? 'bg-emerald-50 text-emerald-700' : sc.gap < 0 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'
                          )}
                        >
                          {sc.gap > 0 ? `+${sc.gap}` : sc.gap}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* TAB 7: ATTENDANCE & OT */}
      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Monthly Attendance & Overtime Summary
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Standard Days</th>
                  <th className="py-3 px-4">Actual Days</th>
                  <th className="py-3 px-4">Working Hours</th>
                  <th className="py-3 px-4">Paid Leave</th>
                  <th className="py-3 px-4">Unpaid Leave</th>
                  <th className="py-3 px-4">Late / Early</th>
                  <th className="py-3 px-4 text-right">OT Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employee.attendanceSummaries?.map((att: any) => (
                  <tr key={att.id} className="hover:bg-slate-50 font-mono">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {att.year} / {String(att.month).padStart(2, '0')}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{att.standardWorkingDays}</td>
                    <td className="py-3 px-4 text-slate-800 font-bold">{att.actualWorkingDays}</td>
                    <td className="py-3 px-4 text-slate-800">{att.workingHours}h</td>
                    <td className="py-3 px-4 text-emerald-700">{att.paidLeaveDays}</td>
                    <td className="py-3 px-4 text-slate-500">{att.unpaidLeaveDays}</td>
                    <td className="py-3 px-4 text-rose-600">
                      {att.lateCount} / {att.earlyLeaveCount}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-indigo-700">{att.otHours}h</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 8: INTERVIEW */}
      {activeTab === 'interview' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Interview Evaluation & Onboarding Documents
          </h3>
          <p className="text-xs text-slate-600">Initial recruitment records indexed from HR Recruitment Repository.</p>
        </div>
      )}

      {/* TAB 9: OFFBOARDING */}
      {activeTab === 'offboarding' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
            Offboarding Case Tracker & Checklist
          </h3>

          {employee.offboardingCases && employee.offboardingCases.length > 0 ? (
            employee.offboardingCases.map((off: any) => (
              <div key={off.id} className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-900 text-sm">Offboarding Case</span>
                    <div className="text-slate-500 mt-1">
                      Resignation Date: {new Date(off.resignationDate).toLocaleDateString('en-GB')} • Last Working Date: {new Date(off.lastWorkingDate).toLocaleDateString('en-GB')}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded font-bold font-mono text-xs bg-rose-50 text-rose-700 border border-rose-200">
                    STATUS: {off.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { label: 'Resignation Letter Submitted', done: off.resignationDone },
                    { label: 'Exit Interview Form Completed', done: off.exitInterviewDone },
                    { label: 'Work & Task Handover Verified', done: off.handoverDone },
                    { label: 'Final Timesheet Approved', done: off.finalTimesheetDone },
                    { label: 'IT Assets & Badge Returned', done: off.assetReturnDone },
                    { label: 'Termination Agreement Signed', done: off.terminationAgreementSigned },
                    { label: 'Social Insurance (BHXH) Processed', done: off.socialInsuranceDone },
                  ].map((chk, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white">
                      <span className="font-medium text-slate-800">{chk.label}</span>
                      {chk.done ? (
                        <span className="flex items-center gap-1 text-emerald-600 font-bold text-[11px]">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600 font-bold text-[11px]">
                          <AlertCircle className="w-4 h-4" /> Pending
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs font-medium">
              No active offboarding case logged for this employee.
            </div>
          )}
        </div>
      )}

      {/* Document Viewer Modal */}
      {selectedDoc && (
        <DocumentViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}

export default function EmployeeProfilePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-slate-400">Loading 360 Profile...</div>}>
      <EmployeeProfileContent />
    </Suspense>
  );
}
