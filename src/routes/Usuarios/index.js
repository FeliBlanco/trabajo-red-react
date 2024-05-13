import { Space, Table, Tag, Button, Flex, Input } from 'antd';
import MenuComponent from '../../components/Menu';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import axios from 'axios';

const { Column } = Table;

export default function Usuarios() {

    const [getUsers, setUsers] = useState(null);
    const [getBuscador, setBuscador] = useState('')

    useEffect(() => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/user?query=${getBuscador}`,
            method:'GET'
        })
        .then(res => {
            console.log(res.data)
            setUsers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [getBuscador])
    return (
        <MenuComponent>
            <Flex justify='flex-end' style={{margin:'20px 0'}}>
                <Button type="primary" shape="round" icon={<UserAddOutlined />} onClick={() => window.location.href = "/usuarios/nuevo"}>Agregar</Button>
            </Flex>
            <Flex justify='flex-end' style={{margin:'20px 0'}}>
                <div>
                    <Input addonBefore={<SearchOutlined />} placeholder="Buscar..." value={getBuscador} onChange={(e) => setBuscador(e.target.value)} />
                </div>
            </Flex>
            <Table dataSource={getUsers != null ? getUsers.map((value, index) => ({...value, key: index})) : []}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Nombre" dataIndex="nombre" key="nombre" />
                <Column title="Correo" dataIndex="correo" key="correo" />
                <Column
                title="Roles"
                dataIndex="roles"
                key="roles"
                render={(roles) => roles?.map((rol) => <Tag color={rol.color} key={rol}>{rol.nombre.toUpperCase()}</Tag>)}
                />
                <Column
                title="Action"
                key="action"
                render={(_, record) => (
                    <Space size="middle">
                    <a href={`/usuarios/${_.usuario}`}>Editar</a>
                    <a>Eliminar</a>
                    </Space>
                )}
                />
            </Table>
        </MenuComponent>
    )
}