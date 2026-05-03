const ventureStyles = {
  studio858: { bg: 'rgba(0,255,65,0.1)', color: '#00FF41', label: 'Studio858' },
  artclub: { bg: 'rgba(90,171,245,0.1)', color: '#5aabf5', label: 'Art Club' },
  f8: { bg: 'rgba(239,159,39,0.1)', color: '#EF9F27', label: 'F8' },
  personal: { bg: 'rgba(168,139,250,0.1)', color: '#a88bfa', label: 'Personal' },
  admin: { bg: 'rgba(136,136,136,0.1)', color: '#888888', label: 'Admin' },
}

const priorityStyles = {
  urgent: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', label: 'Urgent' },
  high: { bg: 'rgba(239,159,39,0.15)', color: '#EF9F27', label: 'High' },
  normal: { bg: 'rgba(136,136,136,0.1)', color: '#888888', label: 'Normal' },
  low: { bg: 'rgba(136,136,136,0.07)', color: '#555', label: 'Low' },
}

const statusStyles = {
  done: { bg: 'rgba(0,255,65,0.1)', color: '#00FF41', label: 'Done' },
  inprogress: { bg: 'rgba(239,159,39,0.15)', color: '#EF9F27', label: 'In Progress' },
  todo: { bg: 'rgba(136,136,136,0.1)', color: '#888888', label: 'Todo' },
}

export function VenturePill({ venture, className = '' }) {
  const style = ventureStyles[venture]
  if (!style) return null
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono-space tracking-wider ${className}`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}

export function PriorityPill({ priority, className = '' }) {
  const style = priorityStyles[priority]
  if (!style) return null
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono-space tracking-wider ${className}`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}

export function StatusPill({ status, className = '' }) {
  const style = statusStyles[status]
  if (!style) return null
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono-space tracking-wider ${className}`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  )
}

export function ventureColor(venture) {
  return ventureStyles[venture]?.color || '#888888'
}

export function ventureLabel(venture) {
  return ventureStyles[venture]?.label || venture
}
