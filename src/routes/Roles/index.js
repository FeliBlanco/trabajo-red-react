import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined} from '@ant-design/icons'
import { Space, Table, Button, Flex } from 'antd';
import MenuComponent from "../../components/Menu";
import useUser from '../../hooks/useUser';

const { Column } = Table;


export default function Roles() {

    const { getToken } = useUser();

    const [getRoles, setRoles] = useState(null);

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/rol`,
            method:'GET'
        })
        .then(res => {
            console.log(res.data)
            setRoles(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const eliminarRol = rolid => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/rol/${rolid}`,
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken}`
            }
        })
        .then(res => {
            const { code } = res.data;
            if(code === 1) {
                setRoles(i => i.filter(j => j.id !== rolid))
            } else if(code === 0) {
                alert("No existe ese rol");
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <MenuComponent>
             <Flex justify='flex-end' style={{margin:'20px 0'}}>
                <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={() => window.location.href = "/roles/nuevo"}>Agregar</Button>
            </Flex>
            <Table dataSource={getRoles != null ? getRoles.map((value, index) => ({...value, key: index})) : []}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Nombre" dataIndex="nombre" key="nombre" />
                <Column title="Color" dataIndex="color" key="color" />
                <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                    <a href={`/rol/${_.id}`}>Editar</a>
                    <a onClick={() => eliminarRol(_.id) }>Eliminar</a>
                    </Space>
                )}
                />
            </Table>
        </MenuComponent>
    )
}