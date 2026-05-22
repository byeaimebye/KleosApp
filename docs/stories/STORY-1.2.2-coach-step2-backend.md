# STORY-1.2.2 — Coach Step 2: Perfil Profesional (Backend — Pendiente)

## Estado
`PENDIENTE — No implementar hasta definir stack backend`

## Endpoint propuesto
```
PUT /auth/register/coach/step2
Authorization: Bearer <registrationToken>
Content-Type: multipart/form-data
```

### Request
```
avatarImage: File (opcional)
logoImage: File (opcional)
businessName: string (requerido)
phrase: string (opcional)
yearsOfExperience: number (opcional)
city: string (requerido)
sports: string[] (mínimo 1)
socialLinks.instagram: string (opcional)
socialLinks.strava: string (opcional)
```

### Response 200
```json
{
  "nextStep": "/register/coach/step3"
}
```

## Consideraciones
- Usar `registrationToken` JWT del step1 para identificar la sesión de registro
- Imágenes: subir a S3/Cloudinary, guardar URLs en DB
- `sports` validar contra lista predefinida en backend
- Rate limiting en uploads de imagen
- Máx tamaño de imagen: 5MB

## Cambios frontend al integrar
- `AvatarUpload` → enviar como `FormData` multipart
- `RegisterStep2Screen` → llamar endpoint antes de navegar a step3
- Manejar errores de upload (tamaño, formato)
