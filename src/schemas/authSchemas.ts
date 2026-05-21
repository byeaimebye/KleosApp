import { z } from 'zod';

// ─── Shared validators ────────────────────────────────────────────────────────

const emailValidator = z
  .string()
  .min(1, 'Email requerido')
  .refine((val) => /^[^\s@]+@[^\s@]+$/.test(val), 'Email inválido');

// ─── Login ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailValidator,
  password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Register Step 1 ─────────────────────────────────────────────────────────

export const registerStep1Schema = z
  .object({
    firstName: z.string().min(1, 'Nombre requerido'),
    lastName: z.string().min(1, 'Apellido requerido'),
    birthDate: z
      .string()
      .min(1, 'Fecha requerida')
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato: DD/MM/AAAA'),
    email: emailValidator,
    password: z.string().min(6, 'Mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Repetí la contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterStep1Input = z.infer<typeof registerStep1Schema>;
