import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
interface Hotel {
  id: number;
  name: string;
  location: string;
  price: string;
  image: string;
}

const MainScreen: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;


  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
    .then((response) => {
      console.log('Данные с сервера:', response.data)
      setHotels(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true); 
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setDateRange([null, null]); 
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      alert('Пожалуйста войдите в аккаунт для бронирование')
      return
    }

    const decoded: {userId: string} = jwtDecode(token)
    const user_id = decoded.userId

    if (selectedHotel && startDate && endDate) {
      try {
        const response = await axios.post('http://localhost:5000/api/bookings', {
          user_id,
          item_id: selectedHotel.id,
          start_date: startDate,
          end_date: endDate,
        });
        console.log(response.data)
        alert('Бронирование успешно создано!');
        handleModalClose(); 
      } catch (error) {
        alert('Ошибка при создании бронирования. Попробуйте еще раз.');
      }
  };
}

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Отели для бронирования</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleHotelSelect(hotel)}
          >
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
              <p className="text-gray-600">{hotel.location}</p>
              <p className="text-lg font-bold mt-2">{hotel.price}$</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Бронирование для {selectedHotel.name}</h2>
            <div className="mb-4">
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700">
                Выберите даты
              </label>
              <DatePicker
                selected={startDate}
                onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                className="mt-1 block w-full border border-gray-300 rounded-md"
              />
            </div>

            {startDate && endDate && (
              <div className="mb-4 text-lg font-semibold">
                <p>Продолжительность: {(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)} дней</p>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition mb-2"
            >
              Забронировать
            </button>
            <button
              onClick={handleModalClose}
              className="w-full py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
