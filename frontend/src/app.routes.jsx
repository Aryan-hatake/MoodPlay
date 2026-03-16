import { createBrowserRouter } from 'react-router-dom'
import Login from './features/auth/UI/pages/Login'
import Register from './features/auth/UI/pages/Register'
import Button from './features/auth/UI/components/Button'
import ProtectedRoute from './features/auth/components/ProtectedRoute'
import FaceDetection from './features/FaceExpression/pages/FaceDetection'



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
        element: <ProtectedRoute>
            <FaceDetection />
        </ProtectedRoute>
    },
])

