import { createContext, useContext, useState } from 'react';
import type { RegisterStep1Input, RegisterStep2Input } from '@/schemas/authSchemas';

// ─── Types ────────────────────────────────────────────────────────────────────

export type RegisterRole = 'coach' | 'athlete';

interface RegisterFlowContextValue {
  role: RegisterRole | null;
  step1Data: RegisterStep1Input | null;
  step2Data: RegisterStep2Input | null;
  setRole: (role: RegisterRole) => void;
  setStep1Data: (data: RegisterStep1Input) => void;
  setStep2Data: (data: RegisterStep2Input) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const RegisterFlowContext = createContext<RegisterFlowContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function RegisterFlowProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<RegisterRole | null>(null);
  const [step1Data, setStep1Data] = useState<RegisterStep1Input | null>(null);
  const [step2Data, setStep2Data] = useState<RegisterStep2Input | null>(null);

  return (
    <RegisterFlowContext.Provider
      value={{ role, setRole, step1Data, setStep1Data, step2Data, setStep2Data }}
    >
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
