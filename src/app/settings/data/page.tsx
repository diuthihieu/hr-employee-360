'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Database, Upload, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function DataImportExportPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
              <Database className="w-6 h-6 mr-2 text-blue-600" />
              Data Import & Export
            </h1>
            <p className="text-slate-500 text-sm mt-1">Bulk manage your HR records using CSV templates and module mappings.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-lg text-blue-600 dark:text-blue-400">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Bulk Data Export</h3>
                <p className="text-xs text-slate-500">Export dynamic records to CSV.</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Select Target Module</label>
                <select className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Attendance Summaries</option>
                  <option>Training Records</option>
                  <option>Compensation History</option>
                  <option>Performance Reviews</option>
                </select>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-emerald-600 font-medium mb-1">
                  <CheckCircle2 className="w-4 h-4" /> Ready to export 1,245 records.
                </div>
                Exports will include both standard system fields and custom dynamic metadata fields defined in the Module Builder.
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm transition-colors flex justify-center items-center">
              <Download className="w-4 h-4 mr-2" />
              Generate CSV Export
            </button>
          </div>

          {/* Import Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2.5 rounded-lg text-emerald-600 dark:text-emerald-400">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Bulk Data Import</h3>
                <p className="text-xs text-slate-500">Import new records via CSV mapping.</p>
              </div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Target Module</label>
                <select className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  <option>Attendance Summaries</option>
                  <option>Training Records</option>
                  <option>Compensation History</option>
                  <option>Performance Reviews</option>
                </select>
              </div>
              
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8 text-center bg-slate-50 dark:bg-slate-950 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors">
                <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="font-medium text-slate-700 dark:text-slate-300">Drag & Drop CSV File</div>
                <div className="text-xs text-slate-500 mt-1">or click to browse from your computer</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-lg text-sm shadow-sm transition-colors text-center">
                Download Template
              </button>
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg text-sm shadow-sm transition-colors flex justify-center items-center opacity-50 cursor-not-allowed">
                <Upload className="w-4 h-4 mr-2" />
                Start Import
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
