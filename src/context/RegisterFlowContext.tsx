import { createContext, useContext, useState } from 'react';
import type { RegisterStep1Input } from '@/schemas/authSchemas';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RegisterRole = 'coach' | 'athlete';

interface RegisterFlowContextValue {
  role: RegisterRole | null;
  step1Data: RegisterStep1Input | null;
  setRole: (role: RegisterRole) => void;
  setStep1Data: (data: RegisterStep1Input) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RegisterFlowContext = createContext<RegisterFlowContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RegisterFlowProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<RegisterRole | null>(null);
  const [step1Data, setStep1Data] = useState<RegisterStep1Input | null>(null);

  return (
    <RegisterFlowContext.Provider value={{ role, setRole, step1Data, setStep1Data }}>
      {children}
    </RegisterFlowContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRegisterFlow() {
  const ctx = useContext(RegisterFlowContext);
  if (!ctx) throw new Error('useRegisterFlow must be used inside RegisterFlowProvider');
  return ctx;
}
