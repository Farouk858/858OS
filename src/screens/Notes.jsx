import { useState, useEffect, useRef } from 'react'
import { Plus, Trash2, X } from 'lucide-react'
import { useNotes } from '../hooks/useNotes'
import { VenturePill } from '../components/ui/Pill'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

const VENTURES = [
  { value: '', label: 'No venture' },
  { value: 'studio858', label: 'Studio858' },
  { value: 'artclub', label: 'Art Club' },
  { value: 'f8', label: 'F8' },
  { value: 'personal', label: 'Personal' },
  { value: 'admin', label: 'Admin' },
]

const inputClass = 'w-full bg-card2 border border-border rounded px-3 py-2 text-sm text-white focus:border-green/50 outline-none font-dm'
const labelClass = 'block text-xs font-mono-space text-grey mb-1 tracking-wider'

function NoteCard({ note, onClick, onDelete }) {
  const [holding, setHolding] = useState(false)
  const [hovered, setHovered] = useState(false)
  const holdTimer = useRef(null)

  function handleTouchStart() {
    holdTimer.current = setTimeout(() => {
      if (confirm('Delete this note?')) onDelete(note.id)
    }, 600)
  }

  function handleTouchEnd() {
    clearTimeout(holdTimer.current)
  }

  const dateStr = new Date(note.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  return (
    <div
      className="bg-card1 border border-border rounded p-4 cursor-pointer hover:border-opacity-60 transition-all duration-200 relative group"
      onClick={() => onClick(note)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {hovered && (
        <button
          onClick={e => { e.stopPropagation(); if (confirm('Delete this note?')) onDelete(note.id) }}
          className="absolute top-3 right-3 p-1 text-grey hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={14} />
        </button>
      )}

      <h3 className="font-dm font-medium text-sm text-white mb-1.5 pr-6 line-clamp-2">{note.title}</h3>
      {note.body && (
        <p className="font-dm text-xs text-grey line-clamp-3 leading-relaxed mb-3">{note.body}</p>
      )}
      <div className="flex items-center justify-between mt-auto">
        {note.venture ? <VenturePill venture={note.venture} /> : <span />}
        <span className="font-mono-space text-xs text-grey ml-auto">{dateStr}</span>
      </div>
    </div>
  )
}

function NoteModal({ isOpen, onClose, onSave, note }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [venture, setVenture] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setBody(note.body || '')
      setVenture(note.venture || '')
    } else {
      setTitle('')
      setBody('')
      setVenture('')
    }
    setError('')
  }, [note, isOpen])

  async function handleSave() {
    if (!title.trim()) { setError('Title is required'); return }
    setSaving(true)
    setError('')
    try {
      await onSave({ title: title.trim(), body: body.trim() || null, venture: venture || null })
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={note ? 'Edit Note' : 'New Note'}>
      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>TITLE *</label>
          <input
            className={inputClass}
            placeholder="Note title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          <label className={labelClass}>BODY</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={6}
            placeholder="Note content..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>VENTURE</label>
          <select className={inputClass} value={venture} onChange={e => setVenture(e.target.value)}>
            {VENTURES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
        {error && <p className="text-red-400 text-xs font-mono-space">{error}</p>}
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </div>
      </div>
    </Modal>
  )
}

export default function Notes() {
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes()
  const [modalOpen, setModalOpen] = useState(false)
  const [editNote, setEditNote] = useState(null)

  function openAdd() {
    setEditNote(null)
    setModalOpen(true)
  }

  function openEdit(note) {
    setEditNote(note)
    setModalOpen(true)
  }

  async function handleSave(payload) {
    if (editNote) {
      await updateNote(editNote.id, payload)
    } else {
      await addNote(payload)
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-bebas text-4xl text-white tracking-wider">Notes</h1>
        </div>

        <div className="px-4">
          {loading && (
            <div className="py-8 text-center font-mono-space text-xs text-grey">Loading...</div>
          )}
          {!loading && notes.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-mono-space text-xs text-grey">No notes yet</p>
              <p className="font-mono-space text-xs mt-1" style={{ color: '#333' }}>Tap + to add one</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onClick={openEdit}
                onDelete={deleteNote}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={openAdd}
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 w-12 h-12 rounded-full bg-green text-black flex items-center justify-center shadow-lg shadow-green/20 hover:bg-green/90 transition-all z-20"
      >
        <Plus size={22} />
      </button>

      <NoteModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditNote(null) }}
        onSave={handleSave}
        note={editNote}
      />
    </div>
  )
}
