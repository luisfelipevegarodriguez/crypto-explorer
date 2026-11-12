import type { Metadata } from 'next'
import Link from 'next/link'
import { getBlock, type BlockItem } from '@/lib/blocks'

function formatTimestamp(timestamp: BlockItem['timestamp']): string {
  if (typeof timestamp === 'number' && Number.isFinite(timestamp)) {
    const ms = timestamp < 1e12 ? timestamp * 1000 : timestamp
    return new Date(ms).toLocaleString()
  }
  if (typeof timestamp === 'string' && timestamp.length > 0) {
    if (/^\d+$/.test(timestamp)) return formatTimestamp(Number(timestamp))
    const parsed = new Date(timestamp)
    if (!Number.isNaN(parsed.getTime())) return parsed.toLocaleString()
  }
  return 'Unknown'
}

function formatDifficulty(difficulty: BlockItem['difficulty']): string {
  return typeof difficulty === 'number' ? difficulty.toLocaleString() : difficulty
}

type PageProps = {
  params: Promise<{ height: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { height } = await params
  return {
    title: `Block #${height}`,
    description: `Bitcoin block ${height} in the mini block explorer.`,
  }
}

export default async function BlockPage({ params }: PageProps) {
  const { height } = await params
  const { demo, block, message } = await getBlock(height)

  if (!block) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <Link href="/" className="text-orange-400 hover:underline text-sm">← Home</Link>
        <h1 className="text-3xl font-bold mt-4 mb-4">Block #{height}</h1>
        <p className="text-amber-200">{message ?? 'Block not found.'}</p>
      </main>
    )
  }

  const rows: [string, string | number][] = [
    ['Hash', block.hash],
    ['Timestamp', formatTimestamp(block.timestamp)],
    ['Transactions', block.transactionsCount.toLocaleString()],
    ['Size (bytes)', block.size.toLocaleString()],
    ['Difficulty', formatDifficulty(block.difficulty)],
    ['Mined in', block.minedInSeconds == null ? '—' : `${block.minedInSeconds}s`],
  ]

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-orange-400 hover:underline text-sm">← Home</Link>
      <h1 className="text-3xl font-bold mt-4 mb-4">Block #{block.height}</h1>
      {demo && message && (
        <p className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-amber-50">
          {message}
        </p>
      )}
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
