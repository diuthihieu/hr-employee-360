'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Plus, Edit2, Trash2, Save, X, Layers, Database, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';

interface Field {
  id: string;
  fieldName: string;
  fieldKey: string;
  dataType: string;
  isRequired: boolean;
  isActive: boolean;
}

interface Module {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
  fields: Field[];
}

export default function ModulesSettingsPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  const fetchModules = async () => {
    try {
      const res = await fetch('/api/modules');
      const data = await res.json();
      setModules(data);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Module List Sidebar */}
        <div className="w-1/3 border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-950 sticky top-0">
            <h2 className="font-semibold flex items-center text-slate-800 dark:text-slate-200">
              <Layers className="w-4 h-4 mr-2 text-blue-600" />
              HR Modules
            </h2>
            <button className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-2 space-y-1">
            {loading ? (
              <div className="p-4 text-center text-sm text-slate-500">Loading modules...</div>
            ) : (
              modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`w-full text-left p-3 rounded-md flex justify-between items-center transition-colors ${
                    selectedModule?.id === mod.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-600' 
                      : 'hover:bg-slate-200 dark:hover:bg-slate-800 border-l-2 border-transparent'
                  }`}
                >
                  <div>
                    <div className="font-medium text-sm text-slate-800 dark:text-slate-200">{mod.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{mod.fields.length} fields</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${selectedModule?.id === mod.id ? 'text-blue-600' : 'text-slate-400'}`} />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Module Detail Area */}
        <div className="w-2/3 bg-white dark:bg-slate-950 overflow-y-auto">
          {selectedModule ? (
            <div>
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                    {selectedModule.name}
                    {selectedModule.isSystem && (
                      <span className="ml-3 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full font-medium border border-slate-200 dark:border-slate-700">
                        System Module
                      </span>
                    )}
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">{selectedModule.description || 'No description provided.'}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-900 flex items-center">
                    <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
                  </button>
                </div>
              </div>

              {/* Fields List */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center text-slate-800 dark:text-slate-200">
                    <Database className="w-4 h-4 mr-2 text-slate-500" />
                    Field Configuration
                  </h3>
                  <button className="px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-md text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 flex items-center">
                    <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Field
                  </button>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 uppercase text-xs border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-4 py-3 font-medium">Field Name</th>
                        <th className="px-4 py-3 font-medium">Data Type</th>
                        <th className="px-4 py-3 font-medium">Required</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {selectedModule.fields.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                            No fields configured yet.
                          </td>
                        </tr>
                      ) : (
                        selectedModule.fields.map(field => (
                          <tr key={field.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{field.fieldName}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded font-mono">
                                {field.dataType}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {field.isRequired ? (
                                <span className="text-amber-600 text-xs font-medium bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">Yes</span>
                              ) : (
                                <span className="text-slate-500 text-xs">No</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button className="text-slate-400 hover:text-blue-600 mr-2"><Edit2 className="w-4 h-4" /></button>
                              <button className="text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 flex-col">
              <Layers className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-700" />
              <p>Select a module from the sidebar to configure it.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
