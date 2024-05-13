import axios from "axios";
import MenuComponent from "../../components/Menu";
import { Button, Form, Input } from 'antd';
import useUser from "../../hooks/useUser";


export default function AgregarRol() {

    const { getToken } = useUser()

    const submit = (values) => {
        axios({
            url: `${process.env.REACT_APP_API_URL}/rol`,
            method: 'POST',
            data: {
                nombre: values.nombre,
                color: values.color
            },
            headers: {
                'Authorization': `Bearer ${getToken}`
            }
        })
        .then(res => {
            const { code } = res.data;

            if(code === 1) {
                document.location.href = "/roles"
            } else if(code === 0) {
                alert("Ya hay un rol con ese nombre")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <MenuComponent>
            <Form
                layout={'vertical'}
                style={{width:'330px'}}
                onFinish={submit}
            >
                <Form.Item label="Nombre" name="nombre" required rules={[{required:true, message: 'Ingresa un nombre'}]}>
                    <Input placeholder="Ej: Administrador" />
                </Form.Item>
                <Form.Item label="Color" name="color" required rules={[{required:true, message: 'Ingresa un color'}]}>
                    <Input placeholder="Ej: red o #fff" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Agregar</Button>
                </Form.Item>
            </Form>
        </MenuComponent>
    )
}