import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Train from './pages/Train.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Train />
    </StrictMode>,
)
