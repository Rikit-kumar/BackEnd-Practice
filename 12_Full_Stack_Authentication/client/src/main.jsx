import { createRoot } from 'react-dom/client'
import './index.css'
import AuthRoutes from './routes/AuthRoutes.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <div>
      <AuthRoutes />
      <ToastContainer autoClose={1000}/>
    </div>
    

)
