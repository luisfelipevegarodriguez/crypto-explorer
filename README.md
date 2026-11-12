# Bitcoin Block Explorer

Mini Bitcoin block explorer · Next.js 15 · Tailwind CSS · [Crypto APIs](https://cryptoapis.io)

## Setup

```bash
npm install
cp .env.example .env.local
# Optional: add a real key in .env.local. Without one, the app runs in demo mode.
npm run dev
```

If `CRYPTOAPIS_API_KEY` is missing or still the example placeholder, pages render sample blocks and do not call Crypto APIs. `npm run build` succeeds either way.

## Deploy

Production deploys target the dedicated Vercel project `luisfelipevegarodriguez-block-explorer` (`https://luisfelipevegarodriguez-block-explorer.vercel.app`). They do not use `crypto-explorer.vercel.app`, which belongs to another account.

```bash
# Live data
CRYPTOAPIS_API_KEY=tu_key ./deploy.sh

# Demo deploy (no key)
./deploy.sh
```

Create the project once on the Hobby account if it does not exist yet:

```bash
npx vercel project add luisfelipevegarodriguez-block-explorer
```

## Routes

- `/` — Home with featured blocks
- `/block/[height]` — Block detail (sample data in demo mode)
- `/api/block/[height]` — JSON for the same lookup
