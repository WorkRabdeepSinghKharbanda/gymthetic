import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { getTheme } from './lib/storage'
import { maybeShowReminder } from './lib/reminders'

document.documentElement.classList.toggle('dark', getTheme() === 'dark')
maybeShowReminder()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // offline support is a bonus, not a requirement — ignore registration failures
    })
  })
}

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Prerendered pages ship real markup inside #root (see scripts/prerender.mjs) — hydrate it
// rather than discarding and re-rendering. shell.html (the SPA fallback for every
// non-prerendered route) ships an empty #root, so it still gets a normal client render.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
