const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Успешное подключение к базе');

        const User = require('../model/users-model');
        const Item = require('../model/items-model');
        const Booking = require('../model/booking-model');
        User.hasMany(Booking, { foreignKey: 'user_id' });
        Item.hasMany(Booking, { foreignKey: 'item_id' });

        sequelize.sync({ alter: true })  
            .then(() => console.log('Модели синхронизированы с базой данных'))
            .catch((err) => console.log('Ошибка синхронизации моделей с базой данных:', err));
    })
    .catch((err) => console.log('Ошибка подключения к базе:', err));

module.exports = sequelize;
