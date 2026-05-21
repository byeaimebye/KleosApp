import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email requerido'),
  password: z.string().min(3, 'Contraseña requerida'),
});

export type LoginInput = z.infer<typeof loginSchema>;
