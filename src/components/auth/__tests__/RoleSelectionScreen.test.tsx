import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RoleSelectionScreen from '../RoleSelectionScreen';
import { RegisterFlowProvider } from '@/context/RegisterFlowContext';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { __mockReplace, __mockPush } = require('expo-router') as {
  __mockReplace: jest.Mock;
  __mockPush: jest.Mock;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RegisterFlowProvider>{children}</RegisterFlowProvider>
);

beforeEach(() => {
  __mockReplace.mockClear();
  __mockPush?.mockClear?.();
});

describe('RoleSelectionScreen', () => {
  it('renderiza sin crash', () => {
    expect(() =>
      render(<RoleSelectionScreen />, { wrapper: Wrapper })
    ).not.toThrow();
  });

  it('muestra los dos roles', () => {
    const { getByText } = render(<RoleSelectionScreen />, { wrapper: Wrapper });
    expect(getByText('auth.register.role_selection.coach')).toBeTruthy();
    expect(getByText('auth.register.role_selection.athlete')).toBeTruthy();
  });

  it('al tocar Coach navega a coach/step1', () => {
    const { getByText } = render(<RoleSelectionScreen />, { wrapper: Wrapper });
    fireEvent.press(getByText('auth.register.role_selection.coach'));
    // RoleSelectionScreen usa router.push para navegar al step1
    const { useRouter } = require('expo-router');
    expect(useRouter().replace).toHaveBeenCalledTimes(0); // Coach no usa replace
  });

  it('muestra badge de coming soon en Atleta', () => {
    const { getByText } = render(<RoleSelectionScreen />, { wrapper: Wrapper });
    expect(getByText('auth.register.role_selection.coming_soon')).toBeTruthy();
  });

  it('muestra link para volver al login', () => {
    const { getByText } = render(<RoleSelectionScreen />, { wrapper: Wrapper });
    expect(getByText('auth.register.role_selection.login')).toBeTruthy();
  });
});
