# STORY-1.2.1 — Registro Coach: Step 1 (Backend — Pendiente)

## Estado
`PENDIENTE — No implementar hasta definir stack backend`

## Endpoint propuesto
```
POST /auth/register/step1
```

### Request
```json
{
  "role": "coach",
  "firstName": "string",
  "lastName": "string",
  "birthDate": "DD/MM/AAAA",
  "email": "string",
  "password": "string"
}
```

### Response 201
```json
{
  "registrationToken": "string (JWT temporal)",
  "userId": "string",
  "nextStep": "/register/coach/step2"
}
```

### Response 409
```json
{ "error": "EMAIL_ALREADY_EXISTS" }
```

## Consideraciones
- El registro es multi-step → usar un `registrationToken` JWT temporal que expira en 1h
- El token se pasa en cada step siguiente para mantener la sesión de registro
- El usuario no queda activo hasta completar todos los steps
- Password hasheado con bcrypt (≥ 10 rounds)
- Validar formato de fecha en backend también

## Cambios frontend al integrar
- `RegisterStep1Screen`: llamar al endpoint antes de navegar al step2
- Guardar `registrationToken` para usarlo en steps siguientes
- Manejar error `EMAIL_ALREADY_EXISTS` con mensaje en el campo email
