import {createBrowserRouter, RouterProvider} from 'react-router'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'

const AuthRoutes = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />
        },

        {
            path: "/login",
            element: <LoginPage />
        },

        {
            path: "/register",
            element: <RegisterPage />
        },

        {
            path: "/home",
            element: <HomePage />
        }
    ])


  return <RouterProvider router={router}/>
}

export default AuthRoutes