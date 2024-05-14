import { Button, Checkbox, Form, Input, Card, Flex } from "antd";
import useUser from "../../hooks/useUser";
import serviceUser from "../../services/user";

export default function Login() {

    const { setToken } = useUser();

    const submit = (values) => {
        serviceUser
        .login(values.username, values.password)
        .then(res => {
            const { code } = res.data;
            if(code === 1) {
                setToken(res.data.token)
            } if(code === 2) {
                alert("No puedes ingresar en este momento")   
            }else {
                alert("No hay ninguna cuenta con esos datos!")
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <Flex gap="middle" justify="center" align="center" vertical style={{height:'100vh'}}>
            <Card title="Iniciar sesión" style={{ width: 600}}>
                <Form
                    onFinish={submit}
                    name="basic"
        
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinishFailed={() => {}}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Usuario"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Ingresa tu usuario',
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
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
  
                    >
                        <Checkbox>Recordarme</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Iniciar sesión</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    )
}
