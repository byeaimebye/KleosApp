# STORY-1.2.1 — Registro Coach: Role Selection + Step 1 (Frontend)

## Estado
`DONE`

## Flujo implementado
```
Login → "Crear cuenta" → Role Selection → [Coach] → Step 1: Datos básicos → Step 2 (placeholder)
```

## Archivos creados / modificados

| Archivo | Tipo |
|---|---|
| `src/i18n/locales/es.json` | Modificado — claves `auth.register.*` |
| `src/schemas/authSchemas.ts` | Modificado — `registerStep1Schema` + `confirmPassword` |
| `src/context/RegisterFlowContext.tsx` | Nuevo — contexto multi-step |
| `src/components/auth/RoleCard.tsx` | Nuevo — card de selección de rol |
| `src/components/auth/RoleSelectionScreen.tsx` | Nuevo — pantalla selección de rol |
| `src/components/auth/RegisterStep1Screen.tsx` | Nuevo — formulario Step 1 |
| `app/(auth)/register/_layout.tsx` | Nuevo — RegisterFlowProvider + Stack |
| `app/(auth)/register/index.tsx` | Modificado — renderiza RoleSelectionScreen |
| `app/(auth)/register/coach/step1.tsx` | Nuevo — renderiza RegisterStep1Screen |
| `app/(auth)/register/coach/step2.tsx` | Nuevo — placeholder |
| `CLAUDE.md` | Modificado — estructura de rutas actualizada |

## Pantalla 1 — Role Selection
- Dos cards: Coach (habilitado) y Atleta (deshabilitado, badge "Próximamente")
- Tap Coach → navega a `/(auth)/register/coach/step1`
- Atleta → deshabilitado (opacity 0.4)
- Link "¿Ya tenés cuenta? Iniciá sesión" → `/(auth)`

## Pantalla 2 — Coach Step 1
- Progress bar: 5 segmentos, el primero activo (Paso 1 de 5)
- Campos: Nombre + Apellido (fila), Fecha de nacimiento, Email, Contraseña, Confirmar contraseña
- Validaciones: campos requeridos, formato fecha DD/MM/AAAA, email válido, min 6 chars, passwords iguales
- "Siguiente" → guarda en RegisterFlowContext y navega a step2 (placeholder)

## Estado multi-step
`RegisterFlowContext` — React Context scoped al layout de registro:
```ts
{ role, step1Data, setRole, setStep1Data }
```

## Pasos de testing manual
1. Login → tap "Crear cuenta" → pantalla Role Selection
2. Ver Coach habilitado + Atleta deshabilitado con badge
3. Tap Atleta → no hace nada
4. Tap Coach → navega a Step 1
5. Tap ← → vuelve a Role Selection
6. En Step 1: submit vacío → errores en todos los campos
7. Fecha sin formato DD/MM/AAAA → error "Formato: DD/MM/AAAA"
8. Passwords que no coinciden → error "Las contraseñas no coinciden"
9. Formulario válido → "Siguiente" navega al placeholder Step 2
10. Step 2 → "Volver" regresa a Step 1
