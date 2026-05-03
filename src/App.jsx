import { useState } from 'react'
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import {
  Crosshair, CheckSquare, Terminal, BookOpen, FileText, LogOut,
} from 'lucide-react'
import { useAuth } from './context/AuthContext'
import Login from './screens/Login'
import Focus from './screens/Focus'
import Tasks from './screens/Tasks'
import Command from './screens/Command'
import Strategy from './screens/Strategy'
import Notes from './screens/Notes'

const NAV_ITEMS = [
  { path: '/', label: 'Focus', Icon: Crosshair, exact: true },
  { path: '/tasks', label: 'Tasks', Icon: CheckSquare },
  { path: '/command', label: 'Command', Icon: Terminal },
  { path: '/strategy', label: 'Strategy', Icon: BookOpen },
  { path: '/notes', label: 'Notes', Icon: FileText },
]

function Wordmark() {
  return <div className="studio858-wordmark">studio858</div>
}

function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-black border-t border-border">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ path, label, Icon, exact }) => {
          const isActive = exact
            ? location.pathname === path
            : location.pathname === path || location.pathname.startsWith(path + '/')
          return (
            <NavLink
              key={path}
              to={path}
              className="flex-1 flex flex-col items-center justify-center gap-1 transition-colors"
              style={{ color: isActive ? '#00FF41' : '#555' }}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span className="font-mono-space text-[9px] tracking-wider">{label.toUpperCase()}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

function Sidebar({ onSignOut }) {
  const location = useLocation()

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-60 bg-black border-r border-border z-30">
      <div className="px-5 py-6 border-b border-border">
        <h1 className="font-bebas text-3xl tracking-wider text-white">858 OS</h1>
        <p className="font-mono-space text-xs mt-0.5" style={{ color: '#333' }}>Operating System</p>
      </div>

      <nav className="flex-1 py-4 px-2">
        {NAV_ITEMS.map(({ path, label, Icon, exact }) => {
          const isActive = exact
            ? location.pathname === path
            : location.pathname === path || location.pathname.startsWith(path + '/')
          return (
            <NavLink
              key={path}
              to={path}
              className="flex items-center gap-3 px-3 py-2.5 rounded mb-0.5 transition-all duration-150 group"
              style={
                isActive
                  ? { backgroundColor: 'rgba(0,255,65,0.08)', color: '#00FF41' }
                  : { color: '#555' }
              }
            >
              <Icon
                size={16}
                strokeWidth={isActive ? 2 : 1.5}
                style={{ color: isActive ? '#00FF41' : '#555' }}
              />
              <span className={`font-mono-space text-xs tracking-wider ${isActive ? 'text-green' : 'text-grey group-hover:text-white'}`}>
                {label.toUpperCase()}
              </span>
              {isActive && (
                <span className="ml-auto w-1 h-1 rounded-full bg-green" />
              )}
            </NavLink>
          )
        })}
      </nav>

      <div className="px-2 py-4 border-t border-border">
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded w-full text-grey hover:text-white transition-colors"
        >
          <LogOut size={16} strokeWidth={1.5} />
          <span className="font-mono-space text-xs tracking-wider">SIGN OUT</span>
        </button>
      </div>
    </aside>
  )
}

function AuthedApp() {
  const { signOut } = useAuth()
  const [ventureFilter, setVentureFilter] = useState('all')

  async function handleSignOut() {
    try {
      await signOut()
    } catch (e) {
      console.error('Sign out failed:', e)
    }
  }

  return (
    <div className="h-full flex">
      <Sidebar onSignOut={handleSignOut} />

      <main className="flex-1 md:ml-60 flex flex-col h-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Focus />} />
          <Route path="/tasks" element={<Tasks initialVentureFilter={ventureFilter} />} />
          <Route path="/command" element={<Command onVentureFilter={setVentureFilter} />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNav />
      <Wordmark />
    </div>
  )
}

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="font-bebas text-4xl text-white tracking-wider">858 OS</p>
          <p className="font-mono-space text-xs text-grey mt-2 tracking-widest">LOADING...</p>
        </div>
      </div>
    )
  }

  if (!user) return <Login />

  return <AuthedApp />
}
