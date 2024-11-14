const Booking = require('../model/booking-model')
const User = require('../model/users-model')
const Item = require('../model/items-model')

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Item, attributes: ['name', 'description'] }
            ]
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении бронирований", error });
    }
};

const createBooking = async (req, res) => {
    const { user_id, item_id, date } = req.body;
    try {
        const booking = await Booking.create({ user_id, item_id, date });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Ошибка при создании бронирования", error });
    }
};

const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id, {
            include: [
                { model: User, attributes: ['username', 'email'] },
                { model: Item, attributes: ['name', 'description'] }
            ]
        });
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: "Бронирование не найдено" });
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка при получении бронирования", error });
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByPk(id);
        if (booking) {
            await booking.destroy();
            res.json({ message: "Бронирование удалено" });
        } else {
            res.status(404).json({ message: "Бронирование не найдено" });
        }
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении бронирования", error });
    }
};

module.exports = {
    deleteBooking,
    getAllBookings,
    createBooking,
    getBookingById
}
