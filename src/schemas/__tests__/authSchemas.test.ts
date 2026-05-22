import { loginSchema, registerStep1Schema, registerStep2Schema } from '../authSchemas';

// ─── loginSchema ──────────────────────────────────────────────────────────────

describe('loginSchema', () => {
  it('falla con email vacío', () => {
    expect(loginSchema.safeParse({ email: '', password: '1234' }).success).toBe(false);
  });
  it('falla con email sin @', () => {
    expect(loginSchema.safeParse({ email: 'sinArroba', password: '1234' }).success).toBe(false);
  });
  it('acepta credencial demo coach@coach', () => {
    expect(loginSchema.safeParse({ email: 'coach@coach', password: '1234' }).success).toBe(true);
  });
  it('acepta credencial demo athlete@athlete', () => {
    expect(loginSchema.safeParse({ email: 'athlete@athlete', password: '1234' }).success).toBe(true);
  });
  it('falla con password vacía', () => {
    expect(loginSchema.safeParse({ email: 'coach@coach', password: '' }).success).toBe(false);
  });
});

// ─── registerStep1Schema ─────────────────────────────────────────────────────

const validStep1 = {
  firstName: 'Carlos',
  lastName: 'García',
  birthDate: '01/01/1990',
  email: 'carlos@coach.com',
  password: '123456',
  confirmPassword: '123456',
};

describe('registerStep1Schema', () => {
  it('pasa con datos válidos', () => {
    expect(registerStep1Schema.safeParse(validStep1).success).toBe(true);
  });
  it('falla sin firstName', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, firstName: '' }).success).toBe(false);
  });
  it('falla sin lastName', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, lastName: '' }).success).toBe(false);
  });
  it('falla con fecha en formato incorrecto', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, birthDate: '1990-01-01' }).success).toBe(false);
  });
  it('acepta fecha en formato DD/MM/AAAA', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, birthDate: '15/06/1992' }).success).toBe(true);
  });
  it('falla con email sin @', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, email: 'invalido' }).success).toBe(false);
  });
  it('falla con password menor a 6 caracteres', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, password: '123', confirmPassword: '123' }).success).toBe(false);
  });
  it('falla si passwords no coinciden', () => {
    expect(registerStep1Schema.safeParse({ ...validStep1, confirmPassword: 'diferente' }).success).toBe(false);
  });
  it('el error de passwords no coinciden apunta a confirmPassword', () => {
    const result = registerStep1Schema.safeParse({ ...validStep1, confirmPassword: 'diferente' });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path[0]);
      expect(paths).toContain('confirmPassword');
    }
  });
});

// ─── registerStep2Schema ─────────────────────────────────────────────────────

const validStep2 = {
  businessName: 'Carlos Mendoza Coaching',
  city: 'Buenos Aires',
  sports: ['Running'],
};

describe('registerStep2Schema', () => {
  it('pasa con campos requeridos', () => {
    expect(registerStep2Schema.safeParse(validStep2).success).toBe(true);
  });
  it('pasa con todos los campos opcionales completos', () => {
    expect(
      registerStep2Schema.safeParse({
        ...validStep2,
        avatarUri: 'file://avatar.jpg',
        logoUri: 'file://logo.jpg',
        phrase: 'Transformá tu vida',
        yearsOfExperience: '5',
        sports: ['Running', 'Ciclismo'],
        socialLinks: { instagram: '@coach', strava: 'link' },
      }).success
    ).toBe(true);
  });
  it('falla sin businessName', () => {
    expect(registerStep2Schema.safeParse({ ...validStep2, businessName: '' }).success).toBe(false);
  });
  it('falla sin city', () => {
    expect(registerStep2Schema.safeParse({ ...validStep2, city: '' }).success).toBe(false);
  });
  it('falla con sports vacío', () => {
    expect(registerStep2Schema.safeParse({ ...validStep2, sports: [] }).success).toBe(false);
  });
  it('acepta sports con múltiples valores', () => {
    expect(
      registerStep2Schema.safeParse({ ...validStep2, sports: ['Running', 'Yoga', 'Boxeo'] }).success
    ).toBe(true);
  });
  it('acepta sin campos opcionales', () => {
    expect(registerStep2Schema.safeParse({ businessName: 'Test', city: 'BA', sports: ['Running'] }).success).toBe(true);
  });
});
