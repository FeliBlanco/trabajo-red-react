import { useEffect } from "react"
import useUser from "../../hooks/useUser"

export default function Logout() {

    const { userLogout } = useUser()

    useEffect(() => {
        userLogout()
    }, [])
    
    return (
        <div>Saliendo...</div>
    )
}