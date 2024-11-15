import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

interface Hotel {
  id?: number;
  name: string;
  location: string;
  price: string;
}

interface HotelFormProps {
  hotel?: Hotel | null;
  onSubmit: (hotel: Hotel) => void;
  onCancel: () => void;
}

const HotelForm: React.FC<HotelFormProps> = ({ hotel, onSubmit, onCancel }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<Hotel>({ name: '', location: '', price: '' });

  useEffect(() => {
    if (hotel) {
      setFormData(hotel);
      form.setFieldsValue(hotel);
    } else {
      form.resetFields();
    }
  }, [hotel, form]);

  const handleFinish = (values: Hotel) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={formData}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter the name' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Location" name="location" rules={[{ required: true, message: 'Please enter the location' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
        <Button style={{ marginLeft: '8px' }} onClick={onCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HotelForm;
