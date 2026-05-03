export default function Button({ children, onClick, type = 'button', variant = 'primary', className = '', disabled = false }) {
  const base = 'font-mono-space text-xs tracking-wider transition-all duration-150 px-4 py-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-black text-green border border-green hover:bg-green hover:text-black',
    ghost: 'bg-transparent text-grey border border-border hover:border-grey hover:text-white',
    danger: 'bg-black text-red-400 border border-red-900 hover:bg-red-900 hover:text-white',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  )
}
