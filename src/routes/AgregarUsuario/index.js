import MenuComponent from "../../components/Menu";
import { Button, Form, Input, Space } from 'antd';

export default function AgregarUsuario() {
    return (
        <MenuComponent>
<Form
      layout={'vertical'}
      style={{width:'330px'}}
    >
        <Space>
            <Form.Item label="Nombre">
                <Input />
            </Form.Item>
            <Form.Item label="Apellido">
                <Input />
            </Form.Item>
        </Space>
      <Form.Item label="Nombre">
        <Input placeholder="Ej: Raulinho" />
      </Form.Item>
      <Form.Item label="Correo">
        <Input placeholder="Ej: Raulinho@microsoft.com" />
      </Form.Item>
      <Form.Item label="Contraseña">
        <Input placeholder="Ej: raul123" type="password"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
        </MenuComponent>
    )
}