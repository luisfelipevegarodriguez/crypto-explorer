# ⛓ Crypto Explorer

Mini Bitcoin Block Explorer · Next.js 15 · Tailwind CSS · [Crypto APIs](https://cryptoapis.io)

## Setup

```bash
npm install
cp .env.example .env.local
# Añade tu key en .env.local
npm run dev
```

## Deploy

```bash
CRYPTOAPIS_API_KEY=tu_key ./deploy.sh
```

## Rutas

- `/` — Home con bloques destacados
- `/block/[height]` — Detalle de bloque
- `/api/block/[height]` — API JSON
