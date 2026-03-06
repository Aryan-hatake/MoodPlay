import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/UI/pages/Login'
import Register from './features/auth/UI/pages/Register'
import Button from './features/auth/UI/components/Button'



export const router = createBrowserRouter([
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <>

            <h1>Home</h1>
            <Button value={"logout"}/>
        </>
    },
])

