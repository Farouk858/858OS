export default function StrategyTab({ children, label }) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  )
}

export function StrategySection({ title, children }) {
  return (
    <div className="bg-card1 border border-border rounded p-4">
      <h3 className="font-mono-space text-xs text-grey tracking-widest mb-3 uppercase">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

export function StrategyRule({ number, text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="font-mono-space text-xs text-green flex-shrink-0 w-5">{number}.</span>
      <span className="text-sm font-dm text-white leading-relaxed">{text}</span>
    </div>
  )
}

export function StrategyItem({ label, value }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <span className="font-mono-space text-xs text-grey flex-shrink-0 w-28">{label}</span>
      <span className="text-sm font-dm text-white">{value}</span>
    </div>
  )
}
