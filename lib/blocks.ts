export interface BlockItem {
  height: number
  hash: string
  /** Unix seconds, unix milliseconds, or an ISO-8601 string. */
  timestamp: string | number
  transactionsCount: number
  size: number
  difficulty: string | number
  /** Present on EVM block payloads. Bitcoin UTXO blocks omit it. */
  minedInSeconds?: number
}

export interface BlockLookup {
  demo: boolean
  block: BlockItem | null
  message?: string
}

const PLACEHOLDER_KEYS = new Set(['your_api_key_here'])

export function isDemoMode(): boolean {
  const key = process.env.CRYPTOAPIS_API_KEY?.trim() ?? ''
  return key.length === 0 || PLACEHOLDER_KEYS.has(key)
}

function sampleBlock(height: number): BlockItem {
  return {
    height,
    hash: `demo-sample-${height}`,
    timestamp: '2024-04-20T12:00:00.000Z',
    transactionsCount: 2100,
    size: 1_248_000,
    difficulty: 'sample',
    minedInSeconds: 600,
  }
}

function demoLookup(height: number): BlockLookup {
  return {
    demo: true,
    block: sampleBlock(height),
    message:
      'Demo mode. CRYPTOAPIS_API_KEY is not set, so this is sample data rather than a live Bitcoin block. Add the key locally or on the Vercel project to load mainnet data.',
  }
}

export async function getBlock(heightParam: string): Promise<BlockLookup> {
  if (!/^\d+$/.test(heightParam)) {
    return {
      demo: isDemoMode(),
      block: null,
      message: 'Block height must be a whole number.',
    }
  }

  const height = Number(heightParam)
  if (!Number.isSafeInteger(height)) {
    return {
      demo: isDemoMode(),
      block: null,
      message: 'That block height is too large to look up.',
    }
  }

  if (isDemoMode()) return demoLookup(height)

  const apiKey = process.env.CRYPTOAPIS_API_KEY?.trim() ?? ''
  const url = `https://rest.cryptoapis.io/v2/blockchain-data/bitcoin/mainnet/blocks/height/${height}`

  try {
    const res = await fetch(url, {
      headers: { 'X-API-Key': apiKey, Accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(12_000),
    })

    let payload: unknown = null
    try {
      payload = await res.json()
    } catch {
      payload = null
    }

    const item = (payload as { data?: { item?: Partial<BlockItem> } } | null)?.data?.item
    if (!res.ok || !item || typeof item.hash !== 'string') {
      return {
        demo: false,
        block: null,
        message: `Crypto APIs could not return block ${height} (HTTP ${res.status}).`,
      }
    }

    return {
      demo: false,
      block: {
        height: typeof item.height === 'number' ? item.height : height,
        hash: item.hash,
        timestamp: item.timestamp ?? '',
        transactionsCount: item.transactionsCount ?? 0,
        size: item.size ?? 0,
        difficulty: item.difficulty ?? '—',
        minedInSeconds: item.minedInSeconds,
      },
    }
  } catch {
    return {
      demo: false,
      block: null,
      message: 'Crypto APIs could not be reached. The page is still up; try again in a moment.',
    }
  }
}
