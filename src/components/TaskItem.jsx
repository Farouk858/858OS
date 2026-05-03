import { useState, useRef } from 'react'
import { Check, Trash2, RefreshCw } from 'lucide-react'
import { VenturePill, PriorityPill } from './ui/Pill'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((d - today) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff < 0) return `${Math.abs(diff)}d overdue`
  if (diff < 7) return `${diff}d`
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function isOverdue(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

export default function TaskItem({ task, onComplete, onDelete, onClick, showSwipe = false }) {
  const [swiped, setSwiped] = useState(false)
  const [completing, setCompleting] = useState(false)
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  const overdue = isOverdue(task.due_date) && task.status !== 'done'

  async function handleComplete(e) {
    e.stopPropagation()
    if (completing) return
    setCompleting(true)
    try {
      await onComplete(task)
    } finally {
      setCompleting(false)
    }
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
    if (dx > 50 && dy < 30) setSwiped(true)
    if (dx < -30) setSwiped(false)
    touchStartX.current = null
  }

  const isDone = task.status === 'done'

  return (
    <div className="relative overflow-hidden">
      {showSwipe && swiped && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onComplete(task) }}
            className="h-full px-5 bg-green/20 border-l border-green/30 text-green hover:bg-green/30 transition-colors flex items-center gap-1"
          >
            <Check size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
            className="h-full px-5 bg-red-900/20 border-l border-red-900/30 text-red-400 hover:bg-red-900/40 transition-colors flex items-center gap-1"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}

      <div
        className={`flex items-center gap-3 px-4 py-3 border-b border-border cursor-pointer hover:bg-card2 transition-all duration-200 ${swiped && showSwipe ? '-translate-x-28' : ''}`}
        style={{ borderLeft: overdue ? '2px solid #ef4444' : isDone ? '2px solid transparent' : '2px solid transparent' }}
        onClick={() => { if (!swiped) onClick?.(task) }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handleComplete}
          disabled={completing || isDone}
          className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all duration-150 ${
            isDone
              ? 'bg-green border-green text-black'
              : 'border-border hover:border-green bg-transparent text-transparent hover:text-green/50'
          }`}
        >
          <Check size={11} strokeWidth={3} />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-dm truncate ${isDone ? 'line-through text-grey' : 'text-white'}`}>
              {task.title}
            </span>
            {task.is_recurring && <RefreshCw size={11} className="text-grey flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {task.venture && <VenturePill venture={task.venture} />}
            {task.priority && task.priority !== 'normal' && <PriorityPill priority={task.priority} />}
          </div>
        </div>

        {task.due_date && (
          <span
            className={`text-xs font-mono-space flex-shrink-0 ${
              overdue ? 'text-red-400' : isDone ? 'text-grey' : 'text-grey'
            }`}
          >
            {formatDate(task.due_date)}
          </span>
        )}
      </div>
    </div>
  )
}
