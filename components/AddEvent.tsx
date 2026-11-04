'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function AddEvent() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const r = useRouter()
  async function submit(e: any) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/events', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title, date, location, description }) })
    setTitle(''); setDate(''); setLocation(''); setDescription(''); setLoading(false); r.refresh()
  }
  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-4 space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Event title" className="w-full border p-2 rounded text-sm" required />
      <input value={date} onChange={e=>setDate(e.target.value)} type="date" className="w-full border p-2 rounded text-sm" required />
      <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location" className="w-full border p-2 rounded text-sm" />
      <input value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded text-sm" />
      <button type="submit" disabled={loading} className="bg-cyan-600 text-white px-4 py-1 rounded text-sm disabled:opacity-50">Add</button>
    </form>
  )
}
