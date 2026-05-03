import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function QuickAdd({ onAdd }) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const title = value.trim()
    if (!title || loading) return
    setLoading(true)
    try {
      await onAdd({
        title,
        venture: 'personal',
        priority: 'normal',
        status: 'todo',
        due_date: new Date().toISOString().split('T')[0],
      })
      setValue('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-card1 border border-border rounded px-3 py-2">
      <Plus size={16} className="text-grey flex-shrink-0" />
      <input
        className="flex-1 bg-transparent border-none outline-none text-sm text-white font-dm placeholder-[#444]"
        placeholder="Quick add task ~ press Enter"
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={loading}
      />
      {value.trim() && (
        <button
          type="submit"
          disabled={loading}
          className="text-xs font-mono-space text-green hover:text-black hover:bg-green px-2 py-0.5 border border-green rounded transition-all"
        >
          Add
        </button>
      )}
    </form>
  )
}
