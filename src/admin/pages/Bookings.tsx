import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Select } from 'antd';
import axios from 'axios';

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      message.error('Не удалось загрузить бронирования');
    }
  };

  const updateBooking = async (values: any) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${currentBooking.id}`, values);
      fetchBookings();
      message.success('Бронирование успешно обновлено');
      setIsModalVisible(false);
      setIsEditing(false);
      form.resetFields();
    } catch (error) {
      message.error('Не удалось обновить бронирование');
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
      message.success('Бронирование успешно удалено');
    } catch (error) {
      message.error('Не удалось удалить бронирование');
    }
  };

  const showModal = (booking?: any) => {
    if (booking) {
      setIsEditing(true);
      setCurrentBooking(booking);
      form.setFieldsValue({ 
        status: booking.status 
      });
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
        updateBooking(values); 
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
      <Table
        dataSource={bookings}
        columns={[
          { title: 'Айди клиента', dataIndex: 'user_id', key: 'user_id' },
          { title: 'Дата бронирования', dataIndex: 'start_date', key: 'start_date', render: (date: string) => new Date(date).toLocaleDateString() },
          { title: 'Конец бронирования', dataIndex: 'end_date', key: 'end_date', render: (date: string) => new Date(date).toLocaleDateString() },
          { title: 'Статус', dataIndex: 'status', key: 'status' },
          { title: 'Отель', dataIndex: 'item_id', key: 'item_id' },
          {
            title: 'Действия',
            key: 'actions',
            render: (_text, record) => (
              <>
                <Button onClick={() => showModal(record)} style={{ marginRight: '8px' }}>
                  Редактировать
                </Button>
                <Button onClick={() => deleteBooking(record.id)} danger>
                  Удалить
                </Button>
              </>
            ),
          },
        ]}
        rowKey="id"
      />
      <Modal
        title={isEditing ? 'Редактирование бронирования' : 'Добавление бронирования'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="status" label="Статус" rules={[{ required: true, message: 'Статус обязательен' }]}>
            <Select placeholder="Выберите статус">
              <Select.Option value="pending">Ожидает</Select.Option>
              <Select.Option value="confirmed">Подтверждено</Select.Option>
              <Select.Option value="cancelled">Отменено</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Bookings;
