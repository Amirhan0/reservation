import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">О нас</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Наша компания</h2>
        <p className="text-gray-600 mb-4">
          Мы — команда профессионалов, которая помогает вам найти идеальные
          отели для вашего отдыха. Наша цель — предоставить вам лучшие
          предложения по бронированию отелей по всему миру.
        </p>
        <p className="text-gray-600">
          Мы стремимся обеспечить комфортный опыт бронирования, предоставить
          доступ к широкому выбору отелей и гарантировать простоту
          использования нашей платформы.
        </p>
      </div>
    </div>
  );
};

export default About;
