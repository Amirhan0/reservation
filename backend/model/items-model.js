// models/items-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');  // Убедись, что путь правильный

const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Item;
