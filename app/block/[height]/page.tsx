interface BlockItem {
  height: number
  hash: string
  timestamp: string
  transactionsCount: number
  size: number
  difficulty: string
  minedInSeconds: number
}

export default async function BlockPage({ params }: { params: { height: string } }) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/block/${params.height}`, { cache: 'no-store' })
  const json = await res.json()
  const block: BlockItem = json?.data?.item

  if (!block) return <p className="p-8 text-red-400">Block not found or API error.</p>

  const rows: [string, string | number][] = [
    ['Hash', block.hash],
    ['Timestamp', new Date(block.timestamp).toLocaleString()],
    ['Transactions', block.transactionsCount],
    ['Size (bytes)', block.size?.toLocaleString()],
    ['Difficulty', block.difficulty],
    ['Mined in', `${block.minedInSeconds}s`],
  ]

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <a href="/" className="text-orange-400 hover:underline text-sm">← Home</a>
      <h1 className="text-3xl font-bold mt-4 mb-8">Block #{block.height}</h1>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rows.map(([label, value]) => (
          <div key={label} className="bg-gray-900 p-4 rounded-xl">
            <dt className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</dt>
            <dd className="font-mono text-sm break-all">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
  )
}
