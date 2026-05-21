import { loginSchema } from '../authSchemas';

describe('loginSchema', () => {
  describe('email', () => {
    it('falla con email vacío', () => {
      const result = loginSchema.safeParse({ email: '', password: '1234' });
      expect(result.success).toBe(false);
    });

    it('falla con email sin @', () => {
      const result = loginSchema.safeParse({ email: 'sinArroba', password: '1234' });
      expect(result.success).toBe(false);
    });

    it('acepta credencial demo coach@coach', () => {
      const result = loginSchema.safeParse({ email: 'coach@coach', password: '1234' });
      expect(result.success).toBe(true);
    });

    it('acepta credencial demo athlete@athlete', () => {
      const result = loginSchema.safeParse({ email: 'athlete@athlete', password: '1234' });
      expect(result.success).toBe(true);
    });

    it('acepta email estándar con TLD', () => {
      const result = loginSchema.safeParse({ email: 'user@example.com', password: '1234' });
      expect(result.success).toBe(true);
    });
  });

  describe('password', () => {
    it('falla con password vacía', () => {
      const result = loginSchema.safeParse({ email: 'coach@coach', password: '' });
      expect(result.success).toBe(false);
    });

    it('acepta password de un solo caracter', () => {
      const result = loginSchema.safeParse({ email: 'coach@coach', password: 'x' });
      expect(result.success).toBe(true);
    });
  });

  describe('schema completo', () => {
    it('retorna los datos correctos con inputs válidos', () => {
      const result = loginSchema.safeParse({ email: 'coach@coach', password: '1234' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('coach@coach');
        expect(result.data.password).toBe('1234');
      }
    });
  });
});
