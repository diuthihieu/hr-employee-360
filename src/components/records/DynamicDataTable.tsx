'use client';

import React from 'react';
import { MoreHorizontal, Download, Filter, Search } from 'lucide-react';

interface FieldDefinition {
  id: string;
  fieldName: string;
  fieldKey: string;
  dataType: string;
  displayOrder: number;
}

interface RecordValue {
  fieldId: string;
  stringValue?: string | null;
  numberValue?: number | null;
  dateValue?: string | null;
  booleanValue?: boolean | null;
}

interface DynamicRecord {
  id: string;
  createdAt: string;
  values: RecordValue[];
}

interface DynamicDataTableProps {
  fields: FieldDefinition[];
  records: DynamicRecord[];
  onAddRecord?: () => void;
}

export default function DynamicDataTable({ fields, records, onAddRecord }: DynamicDataTableProps) {
  // Sort fields by displayOrder
  const sortedFields = [...fields].sort((a, b) => a.displayOrder - b.displayOrder);

  const getCellValue = (record: DynamicRecord, fieldId: string, dataType: string) => {
    const val = record.values.find(v => v.fieldId === fieldId);
    if (!val) return '-';

    switch (dataType) {
      case 'NUMBER':
      case 'CURRENCY':
      case 'PERCENTAGE':
        return val.numberValue !== null ? val.numberValue : '-';
      case 'DATE':
      case 'DATETIME':
        return val.dateValue ? new Date(val.dateValue).toLocaleDateString() : '-';
      case 'BOOLEAN':
        return val.booleanValue ? 'Yes' : 'No';
      default:
        return val.stringValue || '-';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center bg-slate-50 dark:bg-slate-950/50">
        <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900">
            <Download className="w-4 h-4" />
          </button>
          {onAddRecord && (
            <button 
              onClick={onAddRecord}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Add Record
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-slate-50 dark:bg-slate-900/80 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 uppercase text-[11px] font-semibold tracking-wider sticky top-0 z-10">
            <tr>
              {sortedFields.map(field => (
                <th key={field.id} className="px-4 py-3">{field.fieldName}</th>
              ))}
              <th className="px-4 py-3 text-right">Created At</th>
              <th className="px-4 py-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {records.length === 0 ? (
              <tr>
                <td colSpan={sortedFields.length + 2} className="px-4 py-12 text-center text-slate-500">
                  No records found
                </td>
              </tr>
            ) : (
              records.map(record => (
                <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  {sortedFields.map(field => (
                    <td key={field.id} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      {getCellValue(record, field.id, field.dataType)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-slate-500 text-right">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-400 hover:text-blue-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
