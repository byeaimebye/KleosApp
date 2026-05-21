import { act } from '@testing-library/react-native';
import { useAuthStore } from '../authStore';

// Resetear el store antes de cada test
beforeEach(() => {
  useAuthStore.setState({
    user: null,
    role: null,
    isAuthenticated: false,
  });
});

describe('authStore — login', () => {
  it('autentica correctamente como coach', async () => {
    let role: string | undefined;
    await act(async () => {
      role = await useAuthStore.getState().login('coach@coach', '1234');
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.role).toBe('coach');
    expect(state.user?.name).toBe('Tomás Johansson');
    expect(role).toBe('coach');
  });

  it('autentica correctamente como atleta', async () => {
    let role: string | undefined;
    await act(async () => {
      role = await useAuthStore.getState().login('athlete@athlete', '1234');
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.role).toBe('athlete');
    expect(state.user?.name).toBe('María García');
    expect(role).toBe('athlete');
  });

  it('lanza error con credenciales incorrectas', async () => {
    await expect(
      useAuthStore.getState().login('wrong@user', '0000')
    ).rejects.toThrow('Invalid credentials');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('lanza error con password incorrecta', async () => {
    await expect(
      useAuthStore.getState().login('coach@coach', 'wrongpass')
    ).rejects.toThrow('Invalid credentials');
  });
});

describe('authStore — logout', () => {
  it('limpia el estado correctamente', async () => {
    // Login primero
    await act(async () => {
      await useAuthStore.getState().login('coach@coach', '1234');
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    // Logout
    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.role).toBeNull();
  });
});
