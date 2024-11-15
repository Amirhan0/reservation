import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';

const Users: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Замените URL на ваш
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      message.error('Не удалось загрузить данные пользователей');
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers(); // Обновляем список после удаления
      message.success('Пользователь успешно удален');
    } catch (error) {
      message.error('Не удалось удалить пользователя');
    }
  };

  return (
    <Table
      dataSource={users}
      columns={[
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
          title: 'Actions',
          key: 'actions',
          render: (_text, record) => (
            <Button onClick={() => deleteUser(record.id)} danger>
              Удалить
            </Button>
          ),
        },
      ]}
      rowKey="id"
    />
  );
};

export default Users;
