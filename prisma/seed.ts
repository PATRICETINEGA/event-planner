import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('demo123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'demo@events.app' },
    update: {},
    create: { email: 'demo@events.app', password },
  })

  await prisma.event.upsert({
    where: { id: 'seed-event' },
    update: {},
    create: { id: 'seed-event', title: 'Team Meeting', date: '2026-11-10', location: 'Office', ownerId: user.id },
  })

  console.log('Seed done')
}

main().finally(() => prisma.$disconnect())
