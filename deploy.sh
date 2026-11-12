#!/bin/bash
set -euo pipefail

# Dedicated Hobby project. crypto-explorer.vercel.app belongs to another account.
PROJECT_SLUG="luisfelipevegarodriguez-block-explorer"

echo "📦 Instalando dependencias..."
npm install

if [ -z "${CRYPTOAPIS_API_KEY:-}" ] || [ "${CRYPTOAPIS_API_KEY}" = "your_api_key_here" ]; then
  echo "ℹ️  Sin CRYPTOAPIS_API_KEY real: build en modo demo (no falla)."
  unset CRYPTOAPIS_API_KEY
else
  echo "🔑 CRYPTOAPIS_API_KEY presente."
fi

echo "🏗️  Build de producción..."
npm run build

echo "🚀 Deploy a Vercel project: ${PROJECT_SLUG}"
DEPLOY_ARGS=(--prod --yes --project "$PROJECT_SLUG")
if [ -n "${CRYPTOAPIS_API_KEY:-}" ]; then
  DEPLOY_ARGS+=(-e "CRYPTOAPIS_API_KEY=${CRYPTOAPIS_API_KEY}")
fi

npx vercel "${DEPLOY_ARGS[@]}"

echo "✅ Deploy completado: https://${PROJECT_SLUG}.vercel.app"
