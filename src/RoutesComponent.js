import { BrowserRouter, Routes, Route, Navigate, Switch, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

import Home from './routes/Home';
import Login from './routes/Login';
import Registro from './routes/Registro';
import Usuarios from './routes/Usuarios';
import Roles from './routes/Roles';
import AgregarUsuario from './routes/AgregarUsuario';


import useUser from './hooks/useUser';
import Logout from './routes/Logout';
import Usuario from './routes/Usuario';
import AgregarRol from './routes/AgregarRol';



const ProtectedRoutes = () => {
    const { isLogged } = useUser();
    return isLogged === false ? <Navigate to="/login" replace/> : <Outlet />
}

const ProtectedRoutesUnlogged = () => {
    const { isLogged } = useUser();
    return isLogged === true ? <Navigate to="/" replace/> : <Outlet />
}

const Router = createBrowserRouter([

    {
        element: <ProtectedRoutesUnlogged />,
        children: [
            {
                path:'/login',
                element: <Login />
            },
            {
                path:'/registro',
                element: <Registro />
            }       
        ]
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path:'/',
                element: <Home />
            },
            {
                path:'/roles',
                element: <Roles />
            },
            {
                path: '/roles/nuevo',
                element: <AgregarRol />
            },
            {
                path: '/usuarios/nuevo',
                element: <AgregarUsuario />
            },
            {
                path: '/usuarios',
                element: <Usuarios />
            },
            {
                path: '/usuarios/:id',
                element: <Usuario />
            },
            {
                path: '/logout',
                element: <Logout />
            }
        ]
    }
])

const RoutesComponent = () => {
    return (
        <RouterProvider router={Router}></RouterProvider>
    )
}

export default RoutesComponent;