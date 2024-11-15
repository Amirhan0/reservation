import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/hotels">Hotel Booking</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/hotels" className="hover:text-gray-300">
            Главная
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            О нас
          </Link>
          <Link to="/contacts" className="hover:text-gray-300">
            Контакты
          </Link>
          <Link to="/dashboard" className="hover:text-gray-300">
            Профиль
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
