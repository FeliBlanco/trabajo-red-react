import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './routes/Home';
import Login from './routes/Login';
import Registro from './routes/Registro';
import Usuarios from './routes/Usuarios';
import Roles from './routes/Roles';
import AgregarUsuario from './routes/AgregarUsuario';


import useUser from './hooks/useUser';
import Logout from './routes/Logout';
import Usuario from './routes/Usuario';



const RoutesComponent = () => {

    const { isLogged, userPermisos } = useUser();

    const OnlyLogged = ({path, Component, enabled}) => {
        if(isLogged === false) return <Routes><Route path={path} element={<Navigate to="/login"/>}></Route></Routes>
        if(enabled === true && isLogged === true) return <Routes><Route path={path} element={<Navigate to="/"/>}></Route></Routes>
        return <Routes><Route path={path} Component={Component}/></Routes>
    }

    const OnlyUnlogged = ({path, Component}) => {
        if(isLogged === true) return <Routes><Route path={path} element={<Navigate to="/"/>}></Route></Routes>
        return <Routes><Route path={path} Component={Component}/></Routes>
    }
    

    console.log("puede editar usuaris:",userPermisos.puedeEditarUsuarios())
    return (
    <BrowserRouter>
        <OnlyLogged path='/' Component={Home}/>
        <OnlyLogged path="/login" Component={Login}/>
        <OnlyLogged path="/roles" Component={Roles} enabled={!userPermisos.puedeEditarRoles()}/>

        <OnlyLogged path="/usuarios/nuevo" Component={AgregarUsuario} enabled={!userPermisos.puedeEditarUsuarios()}/>
        <OnlyLogged path="/usuarios/:id" Component={Usuario} enabled={!userPermisos.puedeEditarUsuarios()}/>
        <OnlyLogged path="/usuarios" Component={Usuarios} enabled={!userPermisos.puedeEditarUsuarios()}/>
        <OnlyLogged path="/logout" Component={Logout}/>

        <OnlyUnlogged path="/login" Component={Login}/>
        <OnlyUnlogged path="/registro" Component={Registro}/>
        <Routes>
            <Route path="*" element={<div></div>}/>
        </Routes>
    </BrowserRouter>
    )
}

export default RoutesComponent;