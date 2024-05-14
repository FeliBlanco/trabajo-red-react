
import axios from 'axios';
import MenuComponent from '../../components/Menu';
import { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser';


export default function Home() {

    const { getToken } = useUser()

    const [getData, setData] = useState(null)

    useEffect(() => {
        if(getToken == null || getData !== null) return;
        (async() => {
            try {
                console.log(getToken)
                const response = await axios.get("http://localhost:3001/estadisticas", {headers: {"Authorization": `Bearer ${getToken}`}})  
                console.log("DATA")
                setData(response.data)
                console.log(response.data)
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [getToken])
    return (
        <MenuComponent>
           <div>
                <span>Cantidad de usuarios: {getData?.users}</span>
           </div>
           <div>
                <span>Cantidad de grupos: {getData?.groups}</span>
           </div>
        </MenuComponent>
    )
}