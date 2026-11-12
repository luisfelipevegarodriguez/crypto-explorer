import { getBlock } from '@/lib/blocks'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  context: { params: Promise<{ height: string }> }
) {
  const { height } = await context.params
  const result = await getBlock(height)

  if (!result.block) {
    return Response.json(
      { demo: result.demo, message: result.message, data: { item: null } },
      { status: 404 }
    )
  }

  return Response.json({
    demo: result.demo,
    message: result.message,
    data: { item: result.block },
  })
}
