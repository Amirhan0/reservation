import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

const AdminNavbar: React.FC = () => {
  return (
    <Sider width={200} style={{ minHeight: '100vh', background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/admin/users">пользователи</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
        <Link to="/admin/bookings">Бронирования</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />}>
        <Link to="/admin/items">Отели</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AdminNavbar;
