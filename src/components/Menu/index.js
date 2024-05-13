import './index.css'
import { createElement } from 'react'
import { UserOutlined, PoweroffOutlined, BorderlessTableOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Flex, Typography } from 'antd';
import useUser from '../../hooks/useUser';
const { Header, Content, Sider } = Layout;



export default function MenuComponent({children}) {

  const { tieneRol, getUserData, userPermisos } = useUser();
  const items = [
    {
        icon: HomeOutlined,
        label: 'Inicio',
        ruta:'/'
    },
    userPermisos.puedeEditarUsuarios() &&
    {
        icon: UserOutlined,
        label: 'Usuarios',
        ruta: 'usuarios'
    },
    tieneRol(1) && 
    {
        icon: BorderlessTableOutlined ,
        label: 'Roles',
        ruta: 'roles'
    },
    {
        icon: PoweroffOutlined,
        label: 'Cerrar sesión',
        ruta: 'logout'
    }
].filter(Boolean)

const getPathDefault = () => {
    const path = window.location.pathname.split('/')[1];
    const index = items.findIndex(i => i.ruta.replace('/', '') === path)
    console.log(path)
    if(index !== -1) {
        return `${index}`;
    }
    return "-1"
}

    return (
        <Layout style={{height:'100vh'}}>
      <Sider
      width={250}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <Flex vertical justify='center' align='center' style={{margin:'20px 0'}}>
            <div className="menu-user-icon">

            </div>
            <Typography.Title level={4} style={{color:'#fff', marginTop:'10px'}}>{getUserData?.nombre}</Typography.Title>
            <Typography.Title level={5} keyboard theme='dark' style={{color:'#fff', marginTop:0}}>{getUserData?.roles[0]?.nombre}</Typography.Title>
        </Flex>
        <div className="demo-logo-vertical" />
        <Menu onClick={({item, key}) => window.location.href = `/${items[key].ruta.replace('/', '')}`} theme="dark" mode="inline" defaultSelectedKeys={[getPathDefault()]} items={items.map((value, index) => ({...value, key: index, icon: createElement(value.icon)}))} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#4f95b0',
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              background: '#ededed',
              borderRadius: 8,
            }}
          >
            {children}
          </div>
        </Content>
       
      </Layout>
    </Layout>
    )
}