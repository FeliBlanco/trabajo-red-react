import { useContext } from "react";

import { UserContext } from "../contexts/userContext";
function useUser() {
    const { userPermisos, tieneRol, userLogout, getToken, setToken, isLogged, getUserData, setUserData } = useContext(UserContext);

    return {
        getToken,
        setToken,
        isLogged,
        getUserData,
        setUserData,
        userLogout,
        tieneRol,
        userPermisos
    }
}

export default useUser;