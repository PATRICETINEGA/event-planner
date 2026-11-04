import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, date, location, description } = body
  if (!title || !date) return NextResponse.json({ error: 'Title and date required' }, { status: 400 })

  const event = await prisma.event.create({
    data: { title, date, location, description, ownerId: (session.user as any).id },
  })
  return NextResponse.json(event)
}
