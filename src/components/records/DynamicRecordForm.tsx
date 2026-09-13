'use client';

import React, { useState } from 'react';

interface FieldDefinition {
  id: string;
  fieldName: string;
  fieldKey: string;
  dataType: string;
  isRequired: boolean;
  selectOptions?: string | null;
}

interface DynamicRecordFormProps {
  moduleName: string;
  fields: FieldDefinition[];
  onSubmit: (values: any) => void;
  onCancel: () => void;
  initialValues?: any;
}

export default function DynamicRecordForm({
  moduleName,
  fields,
  onSubmit,
  onCancel,
  initialValues = {}
}: DynamicRecordFormProps) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);

  const handleChange = (fieldId: string, value: any) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Map values to RecordValue structure for Prisma
    const formattedValues = fields.map(field => {
      const val = values[field.id];
      let recordValue: any = { fieldId: field.id };
      
      switch (field.dataType) {
        case 'NUMBER':
        case 'CURRENCY':
        case 'PERCENTAGE':
          recordValue.numberValue = val ? parseFloat(val) : null;
          break;
        case 'DATE':
        case 'DATETIME':
          recordValue.dateValue = val ? new Date(val).toISOString() : null;
          break;
        case 'BOOLEAN':
          recordValue.booleanValue = !!val;
          break;
        default:
          recordValue.stringValue = val || null;
      }
      return recordValue;
    });

    onSubmit(formattedValues);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Create {moduleName} Record</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              {field.fieldName} {field.isRequired && <span className="text-red-500">*</span>}
            </label>
            
            {field.dataType === 'LONG_TEXT' ? (
              <textarea
                required={field.isRequired}
                value={values[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            ) : field.dataType === 'BOOLEAN' ? (
              <input
                type="checkbox"
                checked={!!values[field.id]}
                onChange={e => handleChange(field.id, e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            ) : field.dataType === 'SINGLE_SELECT' ? (
              <select
                required={field.isRequired}
                value={values[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {field.selectOptions && JSON.parse(field.selectOptions).map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.dataType === 'NUMBER' ? 'number' : field.dataType === 'DATE' ? 'date' : 'text'}
                required={field.isRequired}
                value={values[field.id] || ''}
                onChange={e => handleChange(field.id, e.target.value)}
                className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}
        
        <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Save Record
          </button>
        </div>
      </form>
    </div>
  );
}
