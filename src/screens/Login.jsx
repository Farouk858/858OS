import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password) return
    setLoading(true)
    setError('')
    try {
      await signIn(email.trim(), password)
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="font-bebas text-6xl tracking-wider text-white mb-1">858 OS</h1>
          <p className="font-mono-space text-xs text-grey tracking-widest">OPERATING SYSTEM</p>
        </div>

        <div className="bg-card1 border border-border rounded p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-mono-space text-xs text-grey tracking-widest mb-1.5">EMAIL</label>
              <input
                type="email"
                className="w-full bg-black border border-border rounded px-3 py-2.5 text-sm text-white focus:border-green/50 outline-none font-dm"
                placeholder="you@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
            </div>

            <div>
              <label className="block font-mono-space text-xs text-grey tracking-widest mb-1.5">PASSWORD</label>
              <input
                type="password"
                className="w-full bg-black border border-border rounded px-3 py-2.5 text-sm text-white focus:border-green/50 outline-none font-dm"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs font-mono-space border border-red-900/30 bg-red-900/10 rounded px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 font-mono-space text-xs tracking-widest bg-black text-green border border-green hover:bg-green hover:text-black transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed rounded mt-1"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono-space text-xs" style={{ color: '#333' }}>studio858</p>
        </div>
      </div>
    </div>
  )
}
