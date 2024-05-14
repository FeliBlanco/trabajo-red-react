import { createContext, useState, useEffect } from 'react';
import serviceUser from '../services/user';



export const UserContext = createContext();

function UserContextProvider({children}) {

    const [getUserData, setUserData] = useState(null);
    const [getToken, setToken] = useState(null);
    const [isLogged, setLogged] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const user_data_cache = await localStorage.getItem('userdata');
                if(user_data_cache) {
                    try {
                        const user_data = JSON.parse(user_data_cache);
                        setUserData(user_data)
                        setLogged(true);
                    }
                    catch(err){}
                }
                const token = await localStorage.getItem('token');
                if(token) setToken(token)
                else setLogged(false)
            }
            catch(err) {
                setLogged(false)
            }
        })()
    }, [])


    useEffect(() => {
        if(getToken) {
            setLogged(true)
            localStorage.setItem('token', getToken);
            serviceUser
            .getData(getToken)
            .then(res => {
                setUserData(res.data);
                localStorage.setItem('userdata', JSON.stringify(res.data))
            })
            .catch(err => {
                if(err.code === "401") {
                    userLogout()
                }
                setLogged(false)
            })
        }
    }, [getToken])

    useEffect(() => {
        if(getUserData?.deshabilitado === 1) {
            alert("Se cerró tu sesión")
            userLogout()
        }
    }, [getUserData])

    const tieneRol = (id) => {
        return getUserData?.roles?.filter(i => i.id === id).length > 0;
    }

    const userLogout = () => {
        setToken(null);
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userdata');
    }

    const userPermisos = {
        puedeCambiarRoles: () => tieneRol(1) || tieneRol(3) || tieneRol(2),
        puedeEditarUsuarios: () => tieneRol(1) || tieneRol(3) || tieneRol(2),
        puedeEditarRoles: () => tieneRol(1)
    }
    return (
        <UserContext.Provider value={{userPermisos, tieneRol, userLogout, isLogged, getToken, setToken, getUserData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;