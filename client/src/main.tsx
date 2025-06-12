import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './ThemeContext.tsx'
import { CurrencyProvider } from './CurrencyContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrencyProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CurrencyProvider>
  </StrictMode>,
)
