import { NextRequest } from 'next/server'

export async function GET(
  _req: NextRequest,
  { params }: { params: { height: string } }
) {
  const { height } = params
  const apiKey = process.env.CRYPTOAPIS_API_KEY!

  const res = await fetch(
    `https://rest.cryptoapis.io/v2/blockchain-data/bitcoin/mainnet/blocks/height/${height}`,
    { headers: { 'X-API-Key': apiKey, Accept: 'application/json' } }
  )

  const data = await res.json()
  return Response.json(data, { status: res.status })
}
