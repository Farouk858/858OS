import { useState, useMemo } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import QuickAdd from '../components/QuickAdd'
import TaskItem from '../components/TaskItem'
import TaskModal from '../components/TaskModal'

const VENTURES = [
  { value: 'all', label: 'All' },
  { value: 'studio858', label: 'Studio858' },
  { value: 'artclub', label: 'Art Club' },
  { value: 'f8', label: 'F8' },
  { value: 'personal', label: 'Personal' },
  { value: 'admin', label: 'Admin' },
]

const PRIORITY_ORDER = { urgent: 0, high: 1, normal: 2, low: 3 }

const ventureAccent = {
  studio858: '#00FF41',
  artclub: '#5aabf5',
  f8: '#EF9F27',
  personal: '#a88bfa',
  admin: '#888888',
  all: '#00FF41',
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function formatToday() {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }).toUpperCase()
}

export default function Focus() {
  const { tasks, loading, addTask, updateTask, deleteTask, completeTask } = useTasks()
  const [ventureFilter, setVentureFilter] = useState('all')
  const [editTask, setEditTask] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [doneExpanded, setDoneExpanded] = useState(false)

  const today = todayStr()

  const dueTasks = useMemo(() => {
    return tasks
      .filter(t => t.due_date <= today && t.status !== 'done')
      .filter(t => ventureFilter === 'all' || t.venture === ventureFilter)
      .sort((a, b) => {
        const pa = PRIORITY_ORDER[a.priority] ?? 2
        const pb = PRIORITY_ORDER[b.priority] ?? 2
        if (pa !== pb) return pa - pb
        return (a.due_date || '').localeCompare(b.due_date || '')
      })
  }, [tasks, ventureFilter, today])

  const doneTasks = useMemo(() => {
    return tasks
      .filter(t => t.status === 'done' && t.due_date === today)
      .filter(t => ventureFilter === 'all' || t.venture === ventureFilter)
  }, [tasks, ventureFilter, today])

  async function handleQuickAdd(data) {
    await addTask(data)
  }

  function openEdit(task) {
    setEditTask(task)
    setModalOpen(true)
  }

  async function handleModalSave(payload) {
    if (editTask) {
      await updateTask(editTask.id, payload)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-4 pt-5 pb-4">
          <p className="font-mono-space text-xs text-grey tracking-widest">{formatToday()}</p>
          <h1 className="font-bebas text-4xl text-white mt-1 tracking-wider">Focus</h1>
        </div>

        <div className="px-4 mb-4">
          <QuickAdd onAdd={handleQuickAdd} />
        </div>

        <div className="px-4 mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {VENTURES.map(v => (
            <button
              key={v.value}
              onClick={() => setVentureFilter(v.value)}
              className="flex-shrink-0 font-mono-space text-xs px-3 py-1.5 rounded border transition-all duration-150"
              style={
                ventureFilter === v.value
                  ? { backgroundColor: ventureAccent[v.value] + '20', borderColor: ventureAccent[v.value], color: ventureAccent[v.value] }
                  : { backgroundColor: 'transparent', borderColor: '#1e1e1e', color: '#888' }
              }
            >
              {v.label}
            </button>
          ))}
        </div>

        <div className="bg-card1 border-y border-border">
          {loading && (
            <div className="px-4 py-8 text-center font-mono-space text-xs text-grey">Loading...</div>
          )}
          {!loading && dueTasks.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="font-mono-space text-xs text-grey">No tasks due today</p>
              <p className="font-mono-space text-xs mt-1" style={{ color: '#333' }}>Clear.</p>
            </div>
          )}
          {dueTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
              onClick={openEdit}
            />
          ))}
        </div>

        {doneTasks.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setDoneExpanded(!doneExpanded)}
              className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-card1 transition-colors"
            >
              {doneExpanded ? <ChevronDown size={14} className="text-grey" /> : <ChevronRight size={14} className="text-grey" />}
              <span className="font-mono-space text-xs text-grey tracking-wider">DONE TODAY ({doneTasks.length})</span>
            </button>
            {doneExpanded && (
              <div className="bg-card1 border-y border-border">
                {doneTasks.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={completeTask}
                    onDelete={deleteTask}
                    onClick={openEdit}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null) }}
        onSave={handleModalSave}
        onDelete={deleteTask}
        initialTask={editTask}
      />
    </div>
  )
}
