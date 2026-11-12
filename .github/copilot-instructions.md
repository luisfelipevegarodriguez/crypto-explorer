# Copilot

Instrucciones de repositorio para GitHub Copilot. El mismo contrato está en `AGENTS.md` (raíz), para Cursor y otros asistentes. La interfaz y los mensajes al usuario están en inglés; estas instrucciones están en español.

## Stack

- Next.js 15.5.29 (App Router) y React 19.0
- TypeScript 5, `strict`, `noEmit`. Alias `@/*` → raíz del repo (`tsconfig.json`)
- Tailwind CSS 3.4 (`tailwind.config.ts`, `postcss.config.js`, `app/globals.css`) y Autoprefixer 10
- ESLint 8.57 con `eslint-config-next` 15.5.29. `.eslintrc.json` extiende `next/core-web-vitals` y `next/typescript`
- npm 10 y `package-lock.json` (lockfileVersion 3). El gestor de paquetes es npm
- Node verificado: v22.23.4 (npm 10.9.9). Next 15.5.29 admite `^18.18.0 || ^19.8.0 || >=20.0.0`. CI usa Node 22
- Datos en runtime: Crypto APIs, Bitcoin mainnet, solo desde `lib/blocks.ts`. Sin clave real, la app queda en modo demo y el build sigue pasando
- Deploy del proyecto Hobby `luisfelipevegarodriguez-block-explorer` (`https://luisfelipevegarodriguez-block-explorer.vercel.app`) con `./deploy.sh` o `npm run deploy`

## Comandos

Desde la raíz, con el lockfile del repo:

```bash
npm install
npm run lint
npm run build
```

`npm run lint` es `next lint`. `npm run build` es `next build` y pasa sin `CRYPTOAPIS_API_KEY`. `npm run dev` arranca el servidor local. `npm run start` sirve el build. No hay script de tests.

CI (`.github/workflows/ci.yml`) usa `npm ci` en Node 22, con caché de npm, y luego `npm run lint` y `npm run build`.

## Estructura

```
app/layout.tsx                  metadata y layout raíz
app/page.tsx                    home con bloques destacados
app/globals.css                 directivas de Tailwind
app/block/[height]/page.tsx     detalle de un bloque
app/api/block/[height]/route.ts JSON del mismo lookup
lib/blocks.ts                   tipos, modo demo y fetch
.env.example                    placeholder, nunca una clave real
deploy.sh                       install, build y deploy al proyecto Hobby
```

Rutas: `/`, `/block/[height]`, `/api/block/[height]`. No hay `vercel.json`: la plataforma usa su región única por defecto.

## Convenciones

- App Router y componentes de servidor. En Next.js 15, `params` llega como `Promise`.
- Las páginas y la ruta que leen bloques exportan `dynamic = 'force-dynamic'`.
- La red vive en `getBlock()` (`lib/blocks.ts`): header `X-API-Key`, `cache: 'no-store'`, `AbortSignal.timeout(12_000)`. La UI no llama a Crypto APIs.
- `isDemoMode()` es verdadero si `CRYPTOAPIS_API_KEY` falta, está vacía o vale `your_api_key_here`. En demo no hay fetch: se sirven bloques de muestra y el build queda en verde.
- Copy de la interfaz en inglés. Estilos con utilidades Tailwind (fondo `bg-gray-950`, acento naranja), sin librerías de componentes.
- Estilo existente: indentación de 2 espacios, comillas simples, sin punto y coma, tipos explícitos en los bordes (`BlockItem`, `BlockLookup`).
- Imports internos con el alias `@/`.
- Un PR de tooling deja `app/` y `lib/` como están.

## Reglas

- Vercel Hobby gratuito. Un proyecto: `luisfelipevegarodriguez-block-explorer`. `crypto-explorer.vercel.app` es de otra cuenta.
- Una sola región. El plan Hobby no admite otra. No añadas `vercel.json` con varias `regions`.
- Sin servicios de pago: ni bases de datos, ni KV, Blob, colas, observabilidad de pago, Marketplace ni otras APIs de pago. Crypto APIs es opcional y solo por variable de entorno.
- CI en el runner gratuito `ubuntu-latest`, un job, sin runners de pago.
- Los secretos no se commitean. `.env`, `.env.local` y `.vercel` están en `.gitignore`. `.env.example` se queda en `CRYPTOAPIS_API_KEY=your_api_key_here`. La clave real va en `.env.local` o en las variables del proyecto de Vercel.
- PRs pequeños y verificados: un tema por PR. Antes de abrirla, `npm install`, `npm run lint` y `npm run build` tienen que pasar, este último también sin clave. Completa `.github/pull_request_template.md`.
- Historial publicado se avanza con commits nuevos, sin force-push.
- `npm run deploy` y `./deploy.sh` solo cuando quien mantiene el repo lo pide.
