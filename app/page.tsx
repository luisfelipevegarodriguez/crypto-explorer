import Link from 'next/link'

export default function Home() {
  const featured = [840000, 850000, 860000]
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">⛓ Crypto Explorer</h1>
      <p className="text-gray-400 mb-8">Bitcoin Mainnet · Powered by Crypto APIs</p>
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
