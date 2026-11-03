import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoutes from './routes/AppRoutes.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <div>
        <AppRoutes />
        <ToastContainer autoClose={1000}/>
    </div>
)
