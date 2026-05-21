# CLAUDE.md — Kleos App

## Visión General

**Kleos** es una app móvil para entrenadores personales (coaches) y sus atletas.
Digitaliza la relación coach-atleta: planificación de entrenamientos, seguimiento de rendimiento, pagos y comunicación.

Dos roles: **Coach** y **Atleta**. Vistas completamente separadas.

---

## Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Framework | Expo (SDK 52+) + React Native |
| Lenguaje | TypeScript (strict) |
| Estilos | NativeWind v4 + Tailwind CSS v3 |
| Navegación | Expo Router v4 (file-based) |
| Estado global | Zustand |
| Formularios | react-hook-form + zod |
| i18n | i18next + react-i18next + expo-localization |
| Íconos | @expo/vector-icons (Ionicons) |
| Imágenes | expo-image-picker |
| Fechas | date-fns (locale es/en) |
| Backend | **Sin implementar** — mock data por ahora |

---

## Estructura de Carpetas

```
app/                          → rutas Expo Router (solo layouts y screens)
  _layout.tsx                 → root layout + auth gate
  index.tsx                   → Login
  (auth)/
    _layout.tsx
    register/
      _layout.tsx             → RegisterFlowProvider (contexto multi-step) + Stack
      index.tsx               → Role Selection (Coach ✅ | Atleta 🔒 próximamente)
      coach/
        step1.tsx             → datos básicos (nombre, apellido, fecha, email, password)
        step2.tsx             → perfil profesional
        step3.tsx             → selección de suscripción
        step4.tsx             → crear planes para atletas
        step5.tsx             → código de vinculación
      athlete/
        step1.tsx             → datos básicos (pendiente)
        step2.tsx             → perfil físico y deportivo
        step3.tsx             → vincular con coach
  (coach)/
    _layout.tsx               → tab navigator coach (5 tabs)
    index.tsx                 → Inicio
    athletes/
      _layout.tsx
      index.tsx               → lista de atletas
      [id]/
        index.tsx             → perfil del atleta
        chat.tsx
        payments.tsx
        plan.tsx
        metrics.tsx
    community/
      index.tsx
    calendar/
      index.tsx
    planning/
      _layout.tsx
      index.tsx               → biblioteca de planes
      editor.tsx              → WorkoutPlanner
      exercises.tsx           → biblioteca de ejercicios
  (athlete)/
    _layout.tsx               → tab navigator atleta (5 tabs)
    index.tsx                 → Inicio
    trainer/
      index.tsx               → perfil del coach
      chat.tsx
    community/
      index.tsx
    calendar/
      index.tsx
    plan/
      index.tsx

src/
  components/
    ui/                       → componentes base reutilizables
      Button.tsx
      Input.tsx
      Card.tsx
      Avatar.tsx
      Badge.tsx
      StepIndicator.tsx
      ...
    auth/                     → componentes exclusivos del flujo auth
    coach/                    → componentes exclusivos de la vista coach
    athlete/                  → componentes exclusivos de la vista atleta
    shared/                   → componentes compartidos entre roles
  store/
    authStore.ts              → sesión, rol, user
    coachStore.ts
    athleteStore.ts
  i18n/
    index.ts                  → configuración i18next
    locales/
      es.json                 → español (idioma base)
      en.json                 → inglés
  data/
    mock/
      users.ts                → usuarios demo (coach + atleta)
      sports.ts               → lista de deportes
      plans.ts
      exercises.ts
  hooks/
    useAuth.ts
  schemas/
    authSchemas.ts            → zod schemas para login y registro
    profileSchemas.ts
  types/
    index.ts                  → tipos globales (User, Coach, Athlete, etc.)
  constants/
    colors.ts                 → tokens de color (espejo de tailwind.config)
    sports.ts                 → lista de deportes predefinidos
```

---

## Diseño — Tokens de Color

Definidos en `tailwind.config.js` y espejados en `src/constants/colors.ts`.

```ts
// src/constants/colors.ts
export const colors = {
  background:  '#1a3a45',   // fondo global
  primary:     '#c4ff0e',   // acento lima
  card:        'rgba(15,23,42,0.6)',
  foreground:  '#ffffff',   // texto principal
  muted:       '#9ca3af',   // texto secundario
  border:      '#1e3a4a',
  link:        '#38bdf8',
  success:     '#65a30d',
  warning:     '#fb923c',
  danger:      '#ef4444',
  // zonas de entrenamiento
  zone1:       '#22d3ee',
  zone2:       '#4ade80',
  zone3:       '#c4ff0e',
  zone4:       '#fb923c',
  zone5:       '#ef4444',
}
```

### Colores de tipos de bloque
| Tipo | Clase Tailwind |
|---|---|
| Cardio | `text-red-400` |
| Halterofilia | `text-blue-400` |
| Flexibilidad | `text-green-400` |
| Deporte específico | `text-purple-400` |
| Recuperación | `text-yellow-400` |
| Otro | `text-gray-400` |

---

## Internacionalización (i18n)

- Idiomas: **Español** (base) e **Inglés**
- Se detecta automáticamente desde el dispositivo via `expo-localization`
- Los archivos de traducción van en `src/i18n/locales/es.json` y `en.json`
- Las claves usan `dot.notation` agrupadas por sección:

```json
{
  "auth": {
    "login": {
      "title": "Iniciar sesión",
      "email": "Correo electrónico",
      "password": "Contraseña",
      "submit": "Iniciar sesión",
      "no_account": "¿No tienes cuenta? Regístrate"
    }
  }
}
```

---

## Navegación — Convenciones Expo Router

- Las rutas con `(grupo)` son grupos de layout, no aparecen en la URL
- El auth gate vive en `app/_layout.tsx` — redirige según `authStore`
- Los tabs de Coach y Atleta son grupos separados: `(coach)` y `(athlete)`
- Las sub-vistas de atleta dentro del coach usan rutas dinámicas: `athletes/[id]/`

---

## Estado Global — Zustand

```ts
// src/store/authStore.ts
interface AuthStore {
  user: User | null
  role: 'coach' | 'athlete' | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}
```

---

## Formularios

- Todos los formularios usan **react-hook-form** + **zod**
- Los schemas de validación viven en `src/schemas/`
- Los formularios multi-paso mantienen estado en el layout del grupo `(auth)/register/`

---

## Mock Data

- Vive en `src/data/mock/`
- Credenciales de demo:
  - Coach: `coach@coach` / `1234` → Tomás Johansson
  - Atleta: `athlete@athlete` / `1234` → María García
- No hay llamadas HTTP por ahora — todo se resuelve localmente

---

## Convenciones de Código

- **Componentes**: PascalCase (`Button.tsx`, `StepIndicator.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuth.ts`)
- **Stores**: camelCase con sufijo `Store` (`authStore.ts`)
- **Schemas Zod**: camelCase con sufijo `Schema` (`loginSchema`)
- **Tipos**: PascalCase en `src/types/index.ts`
- **Strings visibles al usuario**: SIEMPRE via i18n, nunca hardcodeados
- **Estilos**: SIEMPRE con clases NativeWind (`className`), sin `StyleSheet` salvo casos excepcionales

---

## Fase Actual — Autenticación

Pantallas en desarrollo:

1. **Login** (`app/index.tsx`)
2. **Registro Coach** — 5 pasos (`app/(auth)/register/`)
3. **Registro Atleta** — 3 pasos (`app/(auth)/register/`)

Una vez completa la auth, se pasa a las vistas principales de Coach y Atleta.

---

## Modelo de Negocio (Referencia)

Planes de suscripción Kleos → Coach:

| Plan | Atletas | Precio |
|---|---|---|
| Free | 1–3 | Gratis |
| Starter | 4–20 | $29/mes |
| Pro | 21–70 | $79/mes |
| Max | 71–100 | $149/mes |
| Enterprise | 100+ | Negociado |

El coach también crea sus propios planes para sus atletas (nombre, precio, frecuencia, sesiones, deporte).

---

## Workflow de Desarrollo — OBLIGATORIO

Antes de desarrollar o modificar CUALQUIER cosa, seguir este orden estrictamente.

### Fases requeridas

#### 1. Proposal
Analizar el pedido y presentar:
- Objetivo de la tarea
- Scope de trabajo
- Archivos potencialmente impactados
- Riesgos o concerns arquitectónicos
- Dependencias
- Oportunidades de reutilización
- Si la tarea excede el scope original
- Preguntas o blockers

**No escribir código. No crear archivos. No implementar.**

#### 2. Design
Presentar:
- Enfoque técnico
- Impacto en navegación
- Estructura de componentes
- Enfoque de state management
- Componentes reutilizables a aprovechar
- Cambios arquitectónicos mínimos necesarios
- Estrategia de carpetas/archivos
- Estrategia de API/mock si aplica
- Separación de responsabilidades

**Mantener la solución mínima. No overengineering. No implementar.**

#### 3. Tasks
Breakdown detallado de tareas:
- Incrementales y bien scopeadas
- Con archivos impactados
- Separando responsabilidades frontend/backend
- Identificando lógica reutilizable/compartida

**Todavía no implementar.**

#### 4. STOP → Pedir aprobación
Después de Proposal + Design + Tasks, **detenerse y pedir aprobación** antes de:
- generar código
- crear archivos
- refactorizar
- migrar arquitectura
- modificar implementaciones existentes

---

### Reglas de seguridad arquitectónica

NO hacer sin aprobación explícita:
- Refactorizar arquitectura no relacionada con la tarea
- Migrar routing/navegación automáticamente
- Introducir nuevos patrones
- Reestructurar carpetas innecesariamente
- Reemplazar librerías automáticamente
- Expandir el scope original silenciosamente

Si la implementación requiere migración de router, auth, providers, state management o arquitectura → **STOP y pedir aprobación primero**.

---

### Control de scope

Si la tarea crece más de lo scopeado originalmente:
- STOP
- Explicar por qué
- Proponer dividir en stories/tasks adicionales

No continuar expandiendo la implementación automáticamente.

---

### Knowledge base

Mantener `/docs/frontend-learnings.md` actualizado con cada descubrimiento técnico:
- Comportamientos de Expo Router
- Limitaciones de NativeWind
- Decisiones de navegación
- Anti-patrones encontrados
- Soluciones a bugs recurrentes
- Convenciones del proyecto

---

### Gestión de stories

Por cada feature/story crear:
- Story frontend en `/docs/stories/`
- Story backend (pendiente) en `/docs/stories/`

### Git workflow

Por cada tarea:
1. Crear rama nueva
2. Implementar
3. Antes del commit: pasos de testing manual
4. Solo después de validación: commit + push
