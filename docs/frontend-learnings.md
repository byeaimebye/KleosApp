# Frontend Learnings — Kleos App

> Documento vivo. Actualizar con cada descubrimiento técnico relevante.
> Última actualización: 2026-05-21

---

## Expo Router v6

### Ambigüedad de rutas con grupos
**Problema**: `app/index.tsx`, `app/(coach)/index.tsx` y `app/(athlete)/index.tsx` mapean todos a la URL `/` porque los grupos son transparentes en la URL.
**Síntoma**: `router.replace('/')` desde `/(coach)` navega a `/(athlete)` (primer match alfabético).
**Solución**: Cada grupo debe tener un path inequívoco. El login vive en `/(auth)` y se navega explícitamente con `/(auth)`, `/(coach)`, `/(athlete)`.
```
/(auth)    → app/(auth)/index.tsx    ✅ único
/(coach)   → app/(coach)/index.tsx   ✅ único
/(athlete) → app/(athlete)/index.tsx ✅ único
/          → app/index.tsx           → solo redirige a /(auth)
```

### Anti-patrón: `<Redirect>` dentro de un screen montado
**Problema**: `<Redirect href="/">` renderizado en un screen que React Navigation mantiene montado durante transición genera un loop infinito de `router.replace`.
**Síntoma**: `Maximum update depth exceeded` en el call stack con `expo-router/build/link/Redirect.js`.
**Solución**: Nunca poner `<Redirect>` reactivo en screens. Preferir navegación imperativa en el handler.

### Anti-patrón: `useEffect` con `segments` en deps para auth gate
**Problema**: `useEffect([isAuthenticated, role, segments])` con `router.replace` dentro genera loops porque la navegación cambia `segments`, que re-dispara el efecto.
**Síntoma**: `Maximum update depth exceeded` desde `_layout.tsx`.
**Solución**: El auth gate por `useEffect` en el layout es frágil. Preferir navegación imperativa post-login/logout en el handler del screen.

### Patrón correcto de logout
```tsx
const handleLogout = () => {
  logout();              // 1. limpiar estado
  router.replace('/(auth)'); // 2. navegar a login con path inequívoco
};
```

### Entry point Expo Router v6
```ts
// index.ts
import 'expo-router/entry';
```
```json
// app.json
{
  "expo": {
    "scheme": "kleos",
    "plugins": ["expo-router"]
  }
}
```

### `useSegments()` devuelve grupos con paréntesis
`app/(coach)/index.tsx` → `segments[0] === '(coach)'` (con paréntesis).

---

## NativeWind v4

### `className` no funciona en todos los componentes RN
`KeyboardAvoidingView`, `ScrollView.contentContainerStyle` y algunos componentes de terceros no soportan `className` en NativeWind v4.
**Solución**: Usar `style={{ ... }}` con `colors` de `constants/colors.ts` para estos casos.

### Clases dinámicas en runtime no funcionan
```tsx
// ❌ NativeWind v4 no procesa clases calculadas en runtime
className={`border ${condition ? 'border-success' : 'border-border'}`}

// ✅ Usar style con ternario
style={{ borderColor: condition ? colors.success : colors.border }}
```

### Valores arbitrarios requieren escaneo correcto
`text-[52px]`, `tracking-[10px]`, `bg-[rgba(...)]` funcionan SI el archivo está en los paths del `content` de `tailwind.config.js`.
```js
content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}']
```

---

## Metro + tsconfig paths (Expo SDK 54)

Expo SDK 54 lee automáticamente `tsconfig.json` `paths` en Metro sin necesidad de `babel-plugin-module-resolver`.
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```
`@/constants/colors` → `src/constants/colors.ts` ✅ sin configuración extra en metro.config.js.

---

## Zod v4

### `.email()` rechaza credenciales sin TLD
`z.string().email()` en Zod v4 rechaza `coach@coach` porque no tiene TLD.
**Solución**: Usar validador custom que solo verifica presencia de `@`:
```ts
z.string().min(1, 'Email requerido').refine(
  (val) => /^[^\s@]+@[^\s@]+$/.test(val),
  'Email inválido'
)
```

---

## Arquitectura de estilos

### Separación de responsabilidades
| Archivo | Responsabilidad |
|---|---|
| `constants/colors.ts` | Tokens de color — fuente única |
| `constants/theme.ts` | Tipografía, radios, sombras compartidos |
| `components/ui/*.tsx` | Cada componente tiene su propio `StyleSheet` |
| Screens | CERO `StyleSheet.create`. Solo composición + `style` con tokens |

### Componentes UI creados
- `Card.tsx` — contenedor frosted glass `rgba(15,23,42,0.6)`
- `Input.tsx` — con `leftElement` / `rightElement` para íconos
- `Button.tsx` — variantes: `primary`, `secondary`, `gradient` (LinearGradient)
- `SocialButton.tsx` — Apple/Google style
- `Divider.tsx` — separador con texto

### `StyleSheet` en screens: anti-patrón
Un screen no debe definir su propio `StyleSheet`. Los estilos específicos del screen se manejan con:
1. `style={{ ... }}` inline con referencias a `colors` o `theme`
2. Componentes del UI kit que encapsulan sus propios estilos

---

## Zustand

### `login()` debe retornar el role
Para navegar post-login sin leer del store (que puede estar stale en el mismo ciclo de render):
```ts
// authStore.ts
login: async (email, password): Promise<UserRole> => {
  // ...
  set({ ... });
  return testUser.role; // retornar directamente
}

// LoginScreen.tsx
const role = await login(email, password);
router.replace(role === 'coach' ? '/(coach)' : '/(athlete)');
```

---

## react-hook-form + Zod v4

### `zodResolver` compatible con Zod v4
`@hookform/resolvers/zod` es compatible. El `setError('root', { message })` funciona para errores globales del formulario.

---

## expo-linear-gradient

Instalado como dependencia. Usar para botones CTA:
```tsx
import { LinearGradient } from 'expo-linear-gradient';
<LinearGradient colors={[colors.gradientFrom, colors.gradientTo]} ... />
```
Requiere `overflow: 'hidden'` en el wrapper para respetar `borderRadius`.

---

## i18n

La inicialización de i18next debe importarse como side-effect en `app/_layout.tsx`:
```tsx
import '@/i18n'; // inicializa i18next antes de cualquier screen
```
Los textos visibles al usuario SIEMPRE via `t('key')`, nunca hardcodeados.

---

## Patrones a evitar (anti-patterns)

1. `<Redirect>` reactivo en screens → loops
2. `useEffect` con `router.replace` dependiendo de `segments` → loops
3. `router.replace('/')` cuando existen múltiples grupos con index → ambigüedad
4. `StyleSheet.create` en screens → viola separación de responsabilidades
5. Tokens de color hardcodeados en componentes → usar `colors.ts`
6. Clases NativeWind dinámicas → usar `style` con ternarios
7. `className` en `KeyboardAvoidingView` → usar `style`
