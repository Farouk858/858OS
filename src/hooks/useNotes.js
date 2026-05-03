import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export function useNotes() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotes = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setNotes(data || [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  async function addNote(noteData) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ ...noteData, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    setNotes(prev => [data, ...prev])
    return data
  }

  async function updateNote(id, updates) {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    setNotes(prev => prev.map(n => (n.id === id ? data : n)))
    return data
  }

  async function deleteNote(id) {
    const { error } = await supabase.from('notes').delete().eq('id', id)
    if (error) throw error
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  return { notes, loading, error, fetchNotes, addNote, updateNote, deleteNote }
}
