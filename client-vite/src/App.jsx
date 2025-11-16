import { useEffect, useState } from 'react'
import Background3D from './components/Background3D'
import NoteEditor from './components/NoteEditor'
import Auth from './components/Auth'
import LandingPage from './components/LandingPage'
import CSSBubbles from './components/CSSBubbles'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import './index.css'

function AppContent() {
  const { isDark } = useTheme()
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'auth', 'notepad'

  useEffect(() => {
    document.body.className = isDark ? 'dark' : 'light'
    
    // Check for saved user
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setCurrentView('notepad')
    }
  }, [isDark])

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentView('notepad')
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setCurrentView('landing')
  }

  const handleAuthRequired = () => {
    setCurrentView('auth')
  }

  const handleGetStarted = () => {
    setCurrentView('auth')
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'auth':
        return <Auth onLogin={handleLogin} />
      case 'notepad':
        return <NoteEditor user={user} onLogout={handleLogout} onAuthRequired={handleAuthRequired} />
      default:
        return <LandingPage onGetStarted={handleGetStarted} />
    }
  }

  return (
    <div className="App">
      <CSSBubbles />
      <Background3D />
      {renderCurrentView()}
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App