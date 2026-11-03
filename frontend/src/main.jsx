import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './style.css'
import AuthSession from './auth/AuthSession.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthSession>
      <App />
    </AuthSession>
    
  </StrictMode>,
)
