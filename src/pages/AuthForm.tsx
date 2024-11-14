import React, { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormData>({ email: '', password: '', confirmPassword: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', formData);
    } else {
      console.log('Registering with:', formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-sm p-6 bg-gray-100 shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Авторизация' : 'Регистрация'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Подтверждение пароля</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-600"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition"
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? 'Регистрация' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
