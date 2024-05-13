import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom'
import MenuComponent from "../../components/Menu";
import serviceUser from '../../services/user';
import useUser from '../../hooks/useUser';
import axios from 'axios';

export default function Usuario() {
    const { getToken } = useUser()

    const { id } = useParams();

    const [getData, setData] = useState(null);
    const [getRoles, setRoles] = useState(null);

    const refRol = useRef()

    useEffect(() => {
        if(getToken == null) return;
        (async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/rol`, {headers: {'Authorization': `Bearer ${getToken}`}})
                console.log("ROLESS")
                setRoles(response.data)
            }
            catch(err) {
                console.log(err)
            }
        })()
    }, [getToken])

    useEffect(() => {
        if(getToken === null) return;
        serviceUser
        .getUserByUser(id, getToken)
        .then(res => {
            if(res.data.code === 1) {
                setData(res.data.userdata)
            }
        })
        .catch(err => {

        })
    }, [getToken, id])
    

    const asignarRol = async () => {
        try {
            const rolid = refRol.current.value;
            //const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/rol`, {data:{userid: getData.id, rolid}, headers: {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImlhdCI6MTcxNTU2Mjc3MiwiZXhwIjoxNzE1NTY2MzcyfQ.uKo6O_Y3IaD4ryg4yj43V5F84NdnuM7MgeEiZBmRwBA`}})
            axios({
                url:`${process.env.REACT_APP_API_URL}/user/rol`,
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${getToken}`
                },
                data: {
                    userid: getData.id,
                    rolid
                }
            }).then(res => {
                const code = res.data.code;
                if(code == 1) {
                    setData(i => ({...i, roles: res.data.roles}))
                    alert("AGREGADO!")
                } else if(code == 2) {
                    alert("Ese usuario ya tiene ese rol")
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        catch(err) {
            if(err.err_msg) {
                alert(err.err_msg)
            }
        }
    }

    const quitarRol = async rol => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/user/${getData.id}/rol/${rol}`, {headers: {'Authorization': `Bearer ${getToken}`}})
            alert("ELIMINADO")
            setData(i => ({...i, roles: res.data.roles}))
        }
        catch(err) {
            console.log(err)
        }
    }
    return (
        <MenuComponent>
            <div>
                <span>{getData?.nombre} {getData?.apellido}</span>
            </div>
            <div>
                <span>Roles</span>
                <ul>
                    {getData?.roles?.map((value, index) => {
                        return (
                            <li key={`lista-roles-${index}`}>
                                <div>
                                    <span>{value.nombre}</span>
                                    <button style={{marginLeft:'20px'}} onClick={() => quitarRol(value.id)}>Quitar</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <span>Dar rol</span>
                <select defaultValue={-1} ref={refRol}>
                    <option disabled value={-1}>Seleccionar rol</option>
                    {
                        getRoles !== null && getRoles.map((value, index) => <option key={`${index}-d-`} value={value.id}>{value.nombre}</option>)
                    }
                </select>
                <button onClick={() => asignarRol()}>Asignar</button>
            </div>
            <div>
                {
                    getData?.deshabilitado === 1 ?
                    <button>Habilitar</button>
                    :
                    <button>Deshabilitar</button>
                }
            </div>
        </MenuComponent>
    )
}