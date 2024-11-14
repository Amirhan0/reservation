const { DataTypes } = require("sequelize");
const sequelize = require('../utils/database')
const User = require('../model/users-model')
const Item = require('../model/items-model')

const Booking = sequelize.define('Booking', {
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
});

Booking.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Booking.belongsTo(Item, {
    foreignKey: 'item_id',
    onDelete: 'SET NULL'
});

module.exports = Booking;
