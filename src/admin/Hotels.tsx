// admin/Hotels.tsx
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import HotelForm from './HotelForm';

interface Hotel {
  id: number;
  name: string;
  location: string;
  price: string;
}

const initialHotels: Hotel[] = [
  { id: 1, name: 'Hotel Sunshine', location: 'New York, USA', price: '$200 / night' },
  { id: 2, name: 'Mountain View Resort', location: 'Aspen, USA', price: '$350 / night' },
];

const Hotels: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentHotel, setCurrentHotel] = useState<Hotel | null>(null);

  const handleAdd = () => {
    setCurrentHotel(null); // Reset current hotel
    setIsModalVisible(true);
  };

  const handleEdit = (hotel: Hotel) => {
    setCurrentHotel(hotel);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setHotels(hotels.filter(hotel => hotel.id !== id));
  };

  const handleFormSubmit = (hotel: Hotel) => {
    if (currentHotel) {
      // Edit existing hotel
      setHotels(hotels.map(h => (h.id === currentHotel.id ? { ...hotel, id: currentHotel.id } : h)));
    } else {
      // Add new hotel
      const newId = hotels.length ? Math.max(...hotels.map(h => h.id)) + 1 : 1;
      setHotels([...hotels, { ...hotel, id: newId }]);
    }
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Hotel
      </Button>
      <Table
        dataSource={hotels}
        columns={[
          { title: 'Name', dataIndex: 'name', key: 'name' },
          { title: 'Location', dataIndex: 'location', key: 'location' },
          { title: 'Price', dataIndex: 'price', key: 'price' },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record: Hotel) => (
              <span>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
              </span>
            ),
          },
        ]}
        rowKey="id"
      />
      <Modal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <HotelForm
          hotel={currentHotel}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default Hotels;
