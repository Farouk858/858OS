import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ background: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ maxWidth: '480px', width: '100%' }}>
            <p style={{ fontFamily: '"Bebas Neue", cursive', fontSize: '32px', color: '#ffffff', letterSpacing: '0.1em', marginBottom: '16px' }}>858 OS</p>
            <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', borderRadius: '4px', padding: '20px' }}>
              <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#EF9F27', letterSpacing: '0.1em', marginBottom: '8px' }}>STARTUP ERROR</p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#ffffff', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{this.state.error.message}</p>
            </div>
            <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '11px', color: '#333', marginTop: '16px' }}>Check Vercel → Settings → Environment Variables</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
