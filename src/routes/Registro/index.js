import { Button, Form, Input, Card, Flex } from "antd";
import serviceUser from "../../services/user";
import useUser from "../../hooks/useUser";

export default function Registro() {

    const { setToken } = useUser();

    const submit = (values) => {
        serviceUser
        .create(values)
        .then(res => {
            setToken(res.data.token)
        })
        .catch(err => {
            console.log(err);
        })
        console.log(values)
    }
    return (
        <Flex gap="middle" justify="center" align="center" vertical style={{height:'100vh'}}>
        <Card title="Registrarse" style={{ width: 600}}>
            <Form
                name="basic"
    
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={submit}
                onFinishFailed={() => {}}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item style={{marginBottom:0}}>
                    <Form.Item
                        label="Nombre"
                        name="nombre"
                        rules={[
                            {
                            required: true,
                            message: 'Ingresa tu nombre',
                            },
                        ]}
                        style={{width:'45%', display:'inline-block', marginRight:'20px'}}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Apellido"
                        name="apellido"
                        rules={[
                            {
                            required: true,
                            message: 'Ingresa tu apellido',
                            },
                        ]}
                        style={{width:'45%', display:'inline-block'}}
                    >
                        <Input />
                    </Form.Item>
                </Form.Item>
                <Form.Item
                    label="Nombre de usuario"
                    name="usuario"
                    rules={[
                        {
                        required: true,
                        message: 'Ingresa un nombre de usuario',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Correo"
                    name="correo"
                    rules={[
                        {
                        required: true,
                        message: 'Ingresa tu correo',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Ingresa una contraseña',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Registrarse</Button>
                </Form.Item>
            </Form>
        </Card>
    </Flex>
    )
}