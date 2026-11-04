import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import AddEvent from '@/components/AddEvent'
export default async function Dash() {
  const s = await getSession()
  if (!s) redirect('/login')
  const uid = (s.user as any).id
  const events = await prisma.event.findMany({ where: { ownerId: uid }, orderBy: { date: 'asc' } })
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/api/auth/signout" className="text-sm text-red-600">Sign out</Link>
      </div>
      <AddEvent />
      <div className="space-y-2">
        {events.map((e: any) => (
          <div key={e.id} className="bg-white p-4 rounded shadow text-sm">
            <p className="font-medium">{e.title}</p>
            <p className="text-gray-600">{e.date} {e.location && `· ${e.location}`}</p>
            {e.description && <p className="text-xs text-gray-400 mt-1">{e.description}</p>}
          </div>
        ))}
        {events.length === 0 && <p className="text-gray-500">No events yet</p>}
      </div>
    </div>
  )
}
