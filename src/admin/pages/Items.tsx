import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';

const Items: React.FC = () => {
  const [items, setItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchItems();
  }, []); 
  
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      console.log(response.data)
      setItems(response.data);
    } catch (error) {
      message.error('Не удалось загрузить данные');
    }
  };

  const addItem = async (values: any) => {
    try {
      await axios.post('http://localhost:5000/api/items', values);
      fetchItems();
      message.success('Элемент успешно добавлен');
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Не удалось добавить элемент');
    }
  };

  const updateItem = async (values: any) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${currentItem.id}`, values);
      fetchItems();
      message.success('Элемент успешно обновлен');
      setIsModalVisible(false);
      setIsEditing(false);
      form.resetFields();
    } catch (error) {
      message.error('Не удалось обновить элемент');
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
      message.success('Элемент успешно удален');
    } catch (error) {
      message.error('Не удалось удалить элемент');
    }
  };

  const showModal = (item?: any) => {
    if (item) {
      setIsEditing(true);
      setCurrentItem(item);
      form.setFieldsValue(item);
    } else {
      setIsEditing(false);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        isEditing ? updateItem(values) : addItem(values);
      })
      .catch((info) => {
        console.log('Ошибка при отправке формы:', info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
    form.resetFields();
  };

  return (
      <>
      <Button type="primary" onClick={() => showModal()} style={{ marginBottom: '16px' }}>
      Добавить элемент
    </Button><Table
        dataSource={items}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Description', dataIndex: 'description', key: 'description' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_text, record) => (
              <>
                <Button onClick={() => showModal(record)} style={{ marginRight: '8px' }}>
                  Редактировать
                </Button>
                <Button onClick={() => deleteItem(record.id)} danger>
                  Удалить
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id" /><Modal
          title={isEditing ? 'Редактирование элемента' : 'Добавление элемента'}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Название" rules={[{ required: true, message: 'Введите название' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
          <Form.Item
    name="image"
    label="URL изображения"
    rules={[{ required: true, message: 'Введите URL изображения' }]}
>
    <Input placeholder="Введите URL изображения" />
</Form.Item>
        </Form>

      </Modal></>
  );
};

export default Items;
