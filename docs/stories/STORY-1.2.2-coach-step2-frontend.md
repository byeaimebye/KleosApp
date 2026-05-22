# STORY-1.2.2 — Coach Step 2: Perfil Profesional (Frontend)

## Estado
`DONE`

## Archivos creados / modificados

| Archivo | Tipo |
|---|---|
| `src/data/mock/sports.ts` | Nuevo — lista de deportes predefinidos |
| `src/i18n/locales/es.json` | Modificado — claves `auth.register.step2.*` |
| `src/schemas/authSchemas.ts` | Modificado — `registerStep2Schema` |
| `src/context/RegisterFlowContext.tsx` | Modificado — agrega `step2Data` + `setStep2Data` |
| `src/components/ui/SportChip.tsx` | Nuevo — chip multi-selección reutilizable |
| `src/components/ui/AvatarUpload.tsx` | Nuevo — upload de imagen circular (expo-image-picker) |
| `src/components/auth/RegisterStep2Screen.tsx` | Nuevo — pantalla Step 2 |
| `app/(auth)/register/coach/step2.tsx` | Modificado — reemplaza placeholder |
| `app/(auth)/register/coach/step3.tsx` | Nuevo — placeholder Step 3 |
| `package.json` | Modificado — agrega `expo-image-picker@~17.0.11` |

## UI implementada
- Progress bar: Paso 2 de 5 (2 segmentos activos)
- Avatar de perfil + Logo del negocio (upload circular, galería)
- Nombre o marca (requerido)
- Frase o subtítulo (opcional)
- Años de experiencia (opcional) + Ciudad (requerida) — en fila
- Multi-selección de deportes con `SportChip` (mínimo 1 requerido)
- Instagram + Strava (estructura extensible `Record<string,string>`)
- Botón "Siguiente →" navega a step3 (placeholder)

## Estado multi-step
`RegisterFlowContext` — `step2Data` guardado antes de navegar a step3.

## Pasos de testing manual
1. Step 1 completo → "Siguiente" llega a Step 2
2. Progress bar muestra 2 segmentos activos de 5
3. Tap en avatar/logo → pide permiso de galería → abre selector de imagen
4. Imagen seleccionada → se muestra en el círculo
5. Submit sin nombre → error "Nombre o marca requerido"
6. Submit sin ciudad → error "Ciudad requerida"
7. Submit sin deportes → error "Seleccioná al menos un deporte"
8. Tap en chips → alternan seleccionado/deseleccionado (lima/oscuro)
9. Formulario válido → "Siguiente" navega a Step 3 placeholder
10. Step 3 → "← Volver" regresa a Step 2
