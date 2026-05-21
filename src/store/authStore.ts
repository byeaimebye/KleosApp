import { create } from 'zustand';

export type UserRole = 'coach' | 'athlete';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<UserRole>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Mock authentication - in real app, call backend
    const testUsers: Record<string, { password: string; role: UserRole; name: string }> = {
      'coach@coach': { password: '1234', role: 'coach', name: 'Tomás Johansson' },
      'athlete@athlete': { password: '1234', role: 'athlete', name: 'María García' },
    };

    const testUser = testUsers[email];
    if (!testUser || testUser.password !== password) {
      throw new Error('Invalid credentials');
    }

    set({
      user: { id: '1', email, name: testUser.name, role: testUser.role },
      role: testUser.role,
      isAuthenticated: true,
    });

    return testUser.role;
  },

  logout: () => {
    set({
      user: null,
      role: null,
      isAuthenticated: false,
    });
  },
}));
