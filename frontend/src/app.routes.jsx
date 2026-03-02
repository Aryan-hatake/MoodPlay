import {createBrowserRouter} from 'react-router-dom'


export const router = createBrowserRouter([
    {
        path:'/register',
        element:<h1>Register</h1>
    },
    {
        path:'/login',
        element:<h1>login</h1>
    },
    {
        path:'/',
        element:<h1>Home</h1>
    },
])

