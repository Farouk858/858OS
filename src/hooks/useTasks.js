import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function addDays(dateStr, days) {
  const d = new Date(dateStr)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

function addWeeks(dateStr, weeks) {
  return addDays(dateStr, weeks * 7)
}

function addMonths(dateStr, months) {
  const d = new Date(dateStr)
  d.setMonth(d.getMonth() + months)
  return d.toISOString().split('T')[0]
}

function nextRecurringDate(dueDate, frequency) {
  if (!dueDate) return new Date().toISOString().split('T')[0]
  if (frequency === 'daily') return addDays(dueDate, 1)
  if (frequency === 'weekly') return addWeeks(dueDate, 1)
  if (frequency === 'monthly') return addMonths(dueDate, 1)
  return dueDate
}

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setTasks(data || [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function addTask(taskData) {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...taskData, user_id: user.id }])
      .select()
      .single()

    if (error) throw error
    setTasks(prev => [data, ...prev])
    return data
  }

  async function updateTask(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    setTasks(prev => prev.map(t => (t.id === id ? data : t)))
    return data
  }

  async function deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) throw error
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  async function completeTask(task) {
    await updateTask(task.id, { status: 'done' })

    if (task.is_recurring && task.recur_frequency) {
      const nextDue = nextRecurringDate(task.due_date, task.recur_frequency)
      await addTask({
        title: task.title,
        description: task.description,
        venture: task.venture,
        priority: task.priority,
        status: 'todo',
        due_date: nextDue,
        is_recurring: true,
        recur_frequency: task.recur_frequency,
      })
    }
  }

  return { tasks, loading, error, fetchTasks, addTask, updateTask, deleteTask, completeTask }
}
