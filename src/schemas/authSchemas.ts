import { z } from 'zod';

// Custom email validator — accepts demo credentials like coach@coach
const emailValidator = z
  .string()
  .min(1, 'Email requerido')
  .refine((val) => /^[^\s@]+@[^\s@]+$/.test(val), 'Email inválido');

export const loginSchema = z.object({
  email: emailValidator,
  password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;
