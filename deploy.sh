#!/bin/bash
set -e

echo "📦 Instalando dependencias..."
npm install

echo "🔑 Verificando API Key..."
[ -z "$CRYPTOAPIS_API_KEY" ] && echo "❌ Falta CRYPTOAPIS_API_KEY en .env.local" && exit 1

echo "🏗️  Build de producción..."
npm run build

echo "🚀 Deploy a Vercel..."
npx vercel --prod \
  -e CRYPTOAPIS_API_KEY="$CRYPTOAPIS_API_KEY" \
  --yes

echo "✅ Deploy completado"
