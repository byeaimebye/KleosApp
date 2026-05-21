import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';
import { useAuthStore } from '@/store/authStore';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { __mockReplace } = require('expo-router') as { __mockReplace: jest.Mock };

beforeEach(() => {
  useAuthStore.setState({ user: null, role: null, isAuthenticated: false });
  __mockReplace.mockClear();
});

// ─── Render ──────────────────────────────────────────────────────────────────
describe('LoginScreen — render', () => {
  it('renderiza sin crash', () => {
    expect(() => render(<LoginScreen />)).not.toThrow();
  });

  it('muestra el campo de email', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('auth.login.email_placeholder')).toBeTruthy();
  });

  it('muestra el campo de contraseña', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    expect(getByPlaceholderText('auth.login.password_placeholder')).toBeTruthy();
  });
});

// ─── Validación ──────────────────────────────────────────────────────────────
describe('LoginScreen — validación', () => {
  it('muestra error al enviar con email vacío', async () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('auth.login.submit'));
    await waitFor(() => {
      expect(getByText('Email requerido')).toBeTruthy();
    });
  });
});

// ─── Login exitoso ───────────────────────────────────────────────────────────
describe('LoginScreen — login exitoso', () => {
  it('autentica al store y asigna role coach', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('auth.login.email_placeholder'), 'coach@coach');
    fireEvent.changeText(getByPlaceholderText('auth.login.password_placeholder'), '1234');
    fireEvent.press(getByText('auth.login.submit'));

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.role).toBe('coach');
      expect(state.user?.name).toBe('Tomás Johansson');
    });
  });

  it('navega a /(athlete) al loguearse como atleta', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('auth.login.email_placeholder'), 'athlete@athlete');
    fireEvent.changeText(getByPlaceholderText('auth.login.password_placeholder'), '1234');
    fireEvent.press(getByText('auth.login.submit'));

    await waitFor(() => {
      expect(__mockReplace).toHaveBeenCalledWith('/(athlete)');
    });
  });
});

// ─── Credenciales incorrectas ────────────────────────────────────────────────
describe('LoginScreen — credenciales incorrectas', () => {
  it('muestra error con credenciales inválidas', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('auth.login.email_placeholder'), 'wrong@user');
    fireEvent.changeText(getByPlaceholderText('auth.login.password_placeholder'), '0000');
    fireEvent.press(getByText('auth.login.submit'));

    await waitFor(() => {
      expect(getByText('auth.login.error')).toBeTruthy();
    });
  });
});
