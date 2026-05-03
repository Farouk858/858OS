import { useState, useEffect } from 'react'
import Modal from './ui/Modal'
import Button from './ui/Button'

const VENTURES = [
  { value: '', label: 'No venture' },
  { value: 'studio858', label: 'Studio858' },
  { value: 'artclub', label: 'Art Club' },
  { value: 'f8', label: 'F8' },
  { value: 'personal', label: 'Personal' },
  { value: 'admin', label: 'Admin' },
]

const PRIORITIES = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'normal', label: 'Normal' },
  { value: 'low', label: 'Low' },
]

const FREQUENCIES = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

const inputClass = 'w-full bg-card2 border border-border rounded px-3 py-2 text-sm text-white focus:border-green/50 outline-none font-dm'
const labelClass = 'block text-xs font-mono-space text-grey mb-1 tracking-wider'

export default function TaskModal({ isOpen, onClose, onSave, onDelete, initialTask }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    venture: 'personal',
    priority: 'normal',
    due_date: new Date().toISOString().split('T')[0],
    is_recurring: false,
    recur_frequency: 'weekly',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        venture: initialTask.venture || 'personal',
        priority: initialTask.priority || 'normal',
        due_date: initialTask.due_date || new Date().toISOString().split('T')[0],
        is_recurring: initialTask.is_recurring || false,
        recur_frequency: initialTask.recur_frequency || 'weekly',
      })
    } else {
      setForm({
        title: '',
        description: '',
        venture: 'personal',
        priority: 'normal',
        due_date: new Date().toISOString().split('T')[0],
        is_recurring: false,
        recur_frequency: 'weekly',
      })
    }
    setError('')
  }, [initialTask, isOpen])

  function set(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave() {
    if (!form.title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        venture: form.venture || null,
        priority: form.priority,
        due_date: form.due_date || null,
        is_recurring: form.is_recurring,
        recur_frequency: form.is_recurring ? form.recur_frequency : null,
      }
      await onSave(payload)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!initialTask || !onDelete) return
    if (!confirm('Delete this task?')) return
    await onDelete(initialTask.id)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialTask ? 'Edit Task' : 'Add Task'}>
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>TITLE *</label>
          <input
            className={inputClass}
            placeholder="Task title"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSave()}
            autoFocus
          />
        </div>

        <div>
          <label className={labelClass}>DESCRIPTION</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            placeholder="Optional description"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>VENTURE</label>
            <select className={inputClass} value={form.venture} onChange={e => set('venture', e.target.value)}>
              {VENTURES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>PRIORITY</label>
            <select className={inputClass} value={form.priority} onChange={e => set('priority', e.target.value)}>
              {PRIORITIES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>DUE DATE</label>
          <input
            type="date"
            className={inputClass}
            value={form.due_date}
            onChange={e => set('due_date', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>RECURRING</label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => set('is_recurring', !form.is_recurring)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.is_recurring ? 'bg-green' : 'bg-border'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-black transition-transform duration-200 ${form.is_recurring ? 'translate-x-5' : ''}`}
              />
            </button>
            <span className="text-sm text-grey font-dm">{form.is_recurring ? 'On' : 'Off'}</span>
          </div>
        </div>

        {form.is_recurring && (
          <div>
            <label className={labelClass}>FREQUENCY</label>
            <select className={inputClass} value={form.recur_frequency} onChange={e => set('recur_frequency', e.target.value)}>
              {FREQUENCIES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        )}

        {error && <p className="text-red-400 text-xs font-mono-space">{error}</p>}

        <div className="flex gap-2 pt-2 justify-between">
          {initialTask && onDelete ? (
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
