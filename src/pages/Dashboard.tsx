import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log('User logged out');
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate('/'); 
    } else {
      console.log('Добро пожаловать в профиль');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-2xl w-full p-6 bg-gray-100 shadow-md rounded-md text-black">
        <h1 className="text-3xl font-bold mb-4">Личный кабинет</h1>
        {isAuthenticated ? (
          <>
            <p className="mb-6">Добро пожаловать!</p>
            <div className="space-y-4">
              <div className="p-4 bg-white shadow-sm rounded-md">
                <h2 className="text-xl font-semibold">Ваши бронирования</h2>
                <p className="text-gray-700">Здесь будет список ваших бронирований...</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                Выйти
              </button>
            </div>
          </>
        ) : (
          <p className="mb-6 text-gray-600">Пожалуйста, войдите, чтобы увидеть ваши данные.</p>
        )}
        {!isAuthenticated && (
            <button
          onClick={handleProfileClick}
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Перейти в профиль
        </button>
        )}
      
      </div>
    </div>
  );
};

export default Dashboard;
