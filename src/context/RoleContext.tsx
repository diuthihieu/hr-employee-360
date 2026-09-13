'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'HR_ADMIN' | 'HR_MANAGER' | 'HR_USER' | 'VIEWER';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  canEdit: boolean;
  canViewCompensation: boolean;
  canDelete: boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('HR_ADMIN');

  const canEdit = role === 'HR_ADMIN' || role === 'HR_MANAGER';
  const canViewCompensation = role === 'HR_ADMIN' || role === 'HR_MANAGER';
  const canDelete = role === 'HR_ADMIN';

  return (
    <RoleContext.Provider value={{ role, setRole, canEdit, canViewCompensation, canDelete }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
