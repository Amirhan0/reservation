const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

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
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Item;
