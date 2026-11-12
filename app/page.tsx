import Link from 'next/link'
import { isDemoMode } from '@/lib/blocks'

export const dynamic = 'force-dynamic'

export default function Home() {
  const featured = [840000, 850000, 860000]
  const demo = isDemoMode()

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Bitcoin Block Explorer</h1>
      <p className="text-gray-400 mb-6">
        Bitcoin mainnet
        {demo ? ' · Sample data until a Crypto APIs key is set' : ' · Powered by Crypto APIs'}
      </p>
      {demo && (
        <div className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-50">
          <p className="font-semibold mb-1">Demo mode</p>
          <p className="text-amber-100/90">
            No <span className="font-mono">CRYPTOAPIS_API_KEY</span> is configured, so these
            blocks are labeled samples and nothing calls Crypto APIs. Add a key in{' '}
            <span className="font-mono">.env.local</span> or on the Vercel project for live
            mainnet data.
          </p>
        </div>
      )}
      <div className="flex gap-3 flex-wrap">
        {featured.map(h => (
          <Link key={h} href={`/block/${h}`}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg font-mono text-sm transition">
            Block #{h}
          </Link>
        ))}
      </div>
    </main>
  )
}
