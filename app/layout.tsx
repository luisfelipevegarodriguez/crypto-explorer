import './globals.css'
import type { Metadata } from 'next'

const description =
  'Mini Bitcoin mainnet block explorer. Live blocks come from Crypto APIs; without an API key the app shows sample data so the build still succeeds.'

function metadataBaseUrl(): URL {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (production) return new URL(`https://${production}`)
  const deployment = process.env.VERCEL_URL
  if (deployment) return new URL(`https://${deployment}`)
  return new URL('http://localhost:3000')
}

export const metadata: Metadata = {
  metadataBase: metadataBaseUrl(),
  title: {
    default: 'Bitcoin Block Explorer',
    template: '%s · Bitcoin Block Explorer',
  },
  description,
  applicationName: 'Bitcoin Block Explorer',
  keywords: ['Bitcoin', 'block explorer', 'blockchain', 'Crypto APIs'],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Bitcoin Block Explorer',
    description,
    type: 'website',
    siteName: 'Bitcoin Block Explorer',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Bitcoin Block Explorer',
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  )
}
