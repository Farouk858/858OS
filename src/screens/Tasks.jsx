import { useState, useMemo } from 'react'
import { Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
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

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'Todo' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
]

const SORTS = [
  { value: 'due', label: 'Due Date' },
  { value: 'priority', label: 'Priority' },
  { value: 'created', label: 'Created' },
]

const PRIORITY_ORDER = { urgent: 0, high: 1, normal: 2, low: 3 }

const ventureAccent = {
  studio858: '#00FF41', artclub: '#5aabf5', f8: '#EF9F27',
  personal: '#a88bfa', admin: '#888888', all: '#00FF41',
}

export default function Tasks({ initialVentureFilter }) {
  const { tasks, loading, addTask, updateTask, deleteTask, completeTask } = useTasks()
  const [ventureFilter, setVentureFilter] = useState(initialVentureFilter || 'all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sort, setSort] = useState('due')
  const [editTask, setEditTask] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [addingNew, setAddingNew] = useState(false)
  const [doneExpanded, setDoneExpanded] = useState(false)

  const activeTasks = useMemo(() => {
    let list = tasks.filter(t => t.status !== 'done')
    if (ventureFilter !== 'all') list = list.filter(t => t.venture === ventureFilter)
    if (statusFilter !== 'all') list = list.filter(t => t.status === statusFilter)
    list = [...list].sort((a, b) => {
      if (sort === 'priority') {
        const pa = PRIORITY_ORDER[a.priority] ?? 2
        const pb = PRIORITY_ORDER[b.priority] ?? 2
        return pa - pb
      }
      if (sort === 'due') {
        if (!a.due_date && !b.due_date) return 0
        if (!a.due_date) return 1
        if (!b.due_date) return -1
        return a.due_date.localeCompare(b.due_date)
      }
      return b.created_at.localeCompare(a.created_at)
    })
    return list
  }, [tasks, ventureFilter, statusFilter, sort])

  const doneTasks = useMemo(() => {
    let list = tasks.filter(t => t.status === 'done')
    if (ventureFilter !== 'all') list = list.filter(t => t.venture === ventureFilter)
    return list
  }, [tasks, ventureFilter])

  function openEdit(task) {
    setEditTask(task)
    setAddingNew(false)
    setModalOpen(true)
  }

  function openAdd() {
    setEditTask(null)
    setAddingNew(true)
    setModalOpen(true)
  }

  async function handleModalSave(payload) {
    if (addingNew) {
      await addTask({ ...payload, status: 'todo' })
    } else {
      await updateTask(editTask.id, payload)
    }
  }

  return (
    <div className="flex flex-col h-full relative">
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 pt-5 pb-4">
          <h1 className="font-bebas text-4xl text-white tracking-wider">Tasks</h1>
        </div>

        <div className="px-4 mb-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
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

        <div className="px-4 mb-4 flex items-center gap-3 justify-between">
          <div className="flex gap-2">
            {STATUSES.filter(s => s.value !== 'done').map(s => (
              <button
                key={s.value}
                onClick={() => setStatusFilter(s.value)}
                className={`font-mono-space text-xs px-3 py-1 rounded border transition-all duration-150 ${
                  statusFilter === s.value
                    ? 'border-grey text-white bg-grey/10'
                    : 'border-border text-grey'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {SORTS.map(s => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`font-mono-space text-xs px-2 py-1 rounded transition-all duration-150 ${
                  sort === s.value ? 'text-green' : 'text-grey'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card1 border-y border-border">
          {loading && (
            <div className="px-4 py-8 text-center font-mono-space text-xs text-grey">Loading...</div>
          )}
          {!loading && activeTasks.length === 0 && (
            <div className="px-4 py-8 text-center font-mono-space text-xs text-grey">No tasks</div>
          )}
          {activeTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
              onClick={openEdit}
              showSwipe
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
              <span className="font-mono-space text-xs text-grey tracking-wider">DONE ({doneTasks.length})</span>
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
                    showSwipe
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={openAdd}
        className="fixed bottom-20 right-5 md:bottom-6 md:right-6 w-12 h-12 rounded-full bg-green text-black flex items-center justify-center shadow-lg shadow-green/20 hover:bg-green/90 transition-all z-20"
      >
        <Plus size={22} />
      </button>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null) }}
        onSave={handleModalSave}
        onDelete={!addingNew ? deleteTask : null}
        initialTask={editTask}
      />
    </div>
  )
}
