export default function Card({ children, className = '', accent = false, onClick }) {
  const base = accent
    ? 'bg-card2 rounded border border-dashed border-green/30'
    : 'bg-card1 rounded border border-border'

  return (
    <div
      className={`${base} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
