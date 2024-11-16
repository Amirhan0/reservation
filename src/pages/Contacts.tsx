import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
        <p className="text-gray-700">
          Если у вас есть вопросы, вы можете связаться с нами по следующим каналам:
        </p>
        <ul className="mt-4 space-y-2 text-gray-700">
          <li>
            📧 <strong>Email:</strong> pomosh@mail.com
          </li>
          <li>
            📞 <strong>Телефон:</strong> +7 (123) 456-78-90
          </li>
          <li>
            🏢 <strong>Адрес:</strong> г. Алматы, ул. Суюнбая, 12
          </li>
        </ul>
        <p className="mt-6 text-gray-500">
          Мы рады помочь вам с понедельника по пятницу с 9:00 до 18:00.
        </p>
      </div>
    </div>
  );
};

export default Contact;
