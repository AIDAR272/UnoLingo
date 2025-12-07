import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Translate from './pages/Translate.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Translate />
    </StrictMode>,
)
