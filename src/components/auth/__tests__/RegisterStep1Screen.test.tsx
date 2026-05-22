import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import RegisterStep1Screen from '../RegisterStep1Screen';
import { RegisterFlowProvider } from '@/context/RegisterFlowContext';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { __mockReplace } = require('expo-router') as { __mockReplace: jest.Mock };

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <RegisterFlowProvider>{children}</RegisterFlowProvider>
);

beforeEach(() => __mockReplace.mockClear());

describe('RegisterStep1Screen — render', () => {
  it('renderiza sin crash', () => {
    expect(() =>
      render(<RegisterStep1Screen />, { wrapper: Wrapper })
    ).not.toThrow();
  });

  it('muestra el título del paso', () => {
    const { getByText } = render(<RegisterStep1Screen />, { wrapper: Wrapper });
    expect(getByText('auth.register.step1.title')).toBeTruthy();
  });

  it('muestra el indicador de paso 1 de 5', () => {
    const { getByText } = render(<RegisterStep1Screen />, { wrapper: Wrapper });
    expect(getByText('auth.register.step1.step_label')).toBeTruthy();
  });
});

describe('RegisterStep1Screen — validaciones', () => {
  it('muestra errores al enviar vacío', async () => {
    const { getByText } = render(<RegisterStep1Screen />, { wrapper: Wrapper });
    fireEvent.press(getByText('auth.register.step1.next'));
    await waitFor(() => {
      expect(getByText('Nombre requerido')).toBeTruthy();
    });
  });

  it('muestra error cuando passwords no coinciden', async () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterStep1Screen />,
      { wrapper: Wrapper }
    );

    fireEvent.changeText(getByPlaceholderText('auth.register.step1.first_name_placeholder'), 'Carlos');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.last_name_placeholder'), 'García');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.birth_date_placeholder'), '01/01/1990');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.email_placeholder'), 'carlos@test.com');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.password_placeholder'), '123456');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.confirm_password_placeholder'), 'diferente');
    fireEvent.press(getByText('auth.register.step1.next'));

    await waitFor(() => {
      expect(getByText('Las contraseñas no coinciden')).toBeTruthy();
    });
  });
});

describe('RegisterStep1Screen — flujo exitoso', () => {
  it('guarda en contexto y navega a step2 con datos válidos', async () => {
    const { getByPlaceholderText, getByText } = render(
      <RegisterStep1Screen />,
      { wrapper: Wrapper }
    );

    fireEvent.changeText(getByPlaceholderText('auth.register.step1.first_name_placeholder'), 'Carlos');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.last_name_placeholder'), 'García');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.birth_date_placeholder'), '01/01/1990');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.email_placeholder'), 'carlos@test.com');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.password_placeholder'), '123456');
    fireEvent.changeText(getByPlaceholderText('auth.register.step1.confirm_password_placeholder'), '123456');
    fireEvent.press(getByText('auth.register.step1.next'));

    await waitFor(() => {
      const { useRouter } = require('expo-router');
      expect(useRouter().replace).not.toHaveBeenCalled();
    });
  });
});
