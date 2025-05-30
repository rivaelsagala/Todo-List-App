import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Index from './Index.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Index />
    {/* <App /> */}
  </StrictMode>,
)
