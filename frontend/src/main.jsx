import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './style.css'
import AuthSession from './auth/AuthSession.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux"
import {store, persistor} from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthSession>
          <App />
        </AuthSession>
      </PersistGate>
    </Provider>


  </StrictMode>,
)
