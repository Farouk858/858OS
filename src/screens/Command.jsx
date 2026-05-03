import { useMemo } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useNavigate } from 'react-router-dom'

const VENTURES = [
  {
    key: 'studio858',
    name: 'Studio858',
    color: '#00FF41',
    description: 'Creative Agency',
  },
  {
    key: 'artclub',
    name: '858 Art Club',
    color: '#5aabf5',
    description: 'Community Events',
  },
  {
    key: 'f8',
    name: 'F8',
    color: '#EF9F27',
    description: 'Streetwear Brand',
  },
]

function getWeekEnd() {
  const d = new Date()
  d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
}

export default function Command({ onVentureFilter }) {
  const { tasks, loading } = useTasks()
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]
  const weekEnd = getWeekEnd()

  const stats = useMemo(() => {
    return VENTURES.reduce((acc, v) => {
      const ventureTasks = tasks.filter(t => t.venture === v.key)
      const open = ventureTasks.filter(t => t.status !== 'done').length
      const total = ventureTasks.length
      const done = ventureTasks.filter(t => t.status === 'done').length
      const dueThisWeek = ventureTasks.filter(
        t => t.status !== 'done' && t.due_date && t.due_date >= today && t.due_date <= weekEnd
      ).length
      acc[v.key] = { open, total, done, dueThisWeek }
      return acc
    }, {})
  }, [tasks, today, weekEnd])

  function handleVentureClick(ventureKey) {
    if (onVentureFilter) onVentureFilter(ventureKey)
    navigate('/tasks')
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto pb-6">
      <div className="px-4 pt-5 pb-4">
        <h1 className="font-bebas text-4xl text-white tracking-wider">Command</h1>
        <p className="font-mono-space text-xs text-grey mt-1">Overview & Revenue</p>
      </div>

      <div className="px-4 space-y-3 mb-8">
        {VENTURES.map(v => {
          const s = stats[v.key] || { open: 0, total: 0, done: 0, dueThisWeek: 0 }
          const progress = s.total > 0 ? (s.done / s.total) * 100 : 0

          return (
            <div
              key={v.key}
              onClick={() => handleVentureClick(v.key)}
              className="bg-card1 border border-border rounded p-4 cursor-pointer hover:border-opacity-60 transition-all duration-200"
              style={{ borderColor: v.color + '30' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2
                    className="font-bebas text-2xl tracking-wider"
                    style={{ color: v.color }}
                  >
                    {v.name}
                  </h2>
                  <p className="font-mono-space text-xs text-grey mt-0.5">{v.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-bebas text-3xl" style={{ color: v.color }}>{s.open}</span>
                  <p className="font-mono-space text-xs text-grey">open</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <p className="font-mono-space text-xs text-grey">THIS WEEK</p>
                  <p className="font-bebas text-xl text-white mt-0.5">{s.dueThisWeek}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono-space text-xs text-grey">TOTAL</p>
                  <p className="font-bebas text-xl text-white mt-0.5">{s.total}</p>
                </div>
                <div className="text-center">
                  <p className="font-mono-space text-xs text-grey">DONE</p>
                  <p className="font-bebas text-xl text-white mt-0.5">{s.done}</p>
                </div>
              </div>

              <div className="h-1 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, backgroundColor: v.color }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="px-4">
        <h2 className="font-mono-space text-xs text-grey tracking-widest mb-3">REVENUE TARGETS</h2>

        <div className="space-y-3">
          <div className="bg-card1 border border-border rounded p-4" style={{ borderColor: 'rgba(0,255,65,0.15)' }}>
            <h3 className="font-bebas text-lg tracking-wider mb-2" style={{ color: '#00FF41' }}>Studio858</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-space text-xs text-grey">TARGET</span>
                <span className="font-dm text-sm text-white">£9k/mo retainer by month 9</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono-space text-xs text-grey">UPFRONT</span>
                <span className="font-dm text-sm text-white">50% ~ non-negotiable</span>
              </div>
            </div>
          </div>

          <div className="bg-card1 border border-border rounded p-4" style={{ borderColor: 'rgba(90,171,245,0.15)' }}>
            <h3 className="font-bebas text-lg tracking-wider mb-2" style={{ color: '#5aabf5' }}>858 Art Club</h3>
            <div className="space-y-1.5">
              {[
                ['Q1', '£2.5k'],
                ['Q2', '£6k'],
                ['Q3', '£9k'],
                ['Q4', '£10.5k'],
                ['ANNUAL', '£28k+'],
              ].map(([q, val]) => (
                <div key={q} className="flex items-center justify-between">
                  <span className="font-mono-space text-xs text-grey">{q}</span>
                  <span className={`font-dm text-sm ${q === 'ANNUAL' ? 'font-semibold' : ''} text-white`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card1 border border-border rounded p-4" style={{ borderColor: 'rgba(239,159,39,0.15)' }}>
            <h3 className="font-bebas text-lg tracking-wider mb-2" style={{ color: '#EF9F27' }}>F8</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-mono-space text-xs text-grey">STATUS</span>
                <span className="font-dm text-sm text-white">Drop 1 in progress</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono-space text-xs text-grey">PRICE</span>
                <span className="font-dm text-sm text-white">Tee £45–65</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono-space text-xs text-grey">TARGET</span>
                <span className="font-dm text-sm text-white">50+ units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
