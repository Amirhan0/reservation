require('dotenv').config()

const User = require('../model/users-model')
const bcrypt = require('bcrypt')

const generateToken = require('../utils/generateToken.js')

const registerUser = async (req,res) => {
    const {username, email, password} = req.body


    try {
        const existingUser = await User.findOne({ where: { email }})
        if (existingUser) {
            return res.status(400).json({message: 'Пользователь с таким email существует!'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = generateToken(newUser)
        res.status(201).json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Ошибка на сервере при регистрации'})
    }
}

const loginUser = async (req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'})
        }
        
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message: 'Неверный пароль'})
        }

        const token = generateToken(user)

        res.json({token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Ошибка при входе на сервере"})
    }
}


const getAllUsers = async (req,res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        
        res.status(500).json({message: 'Ошибка при выводе пользователей'})
    }
}

const deleteUsers = async (req,res) => {
    const {id} = req.params

    try {
        const user = await User.findByPk(id)
        if (!user) {
            return res.status(404).json({message: 'Пользователь не найден'})
        }
        await user.destroy()
        res.json({ message: "Пользователь удален" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Ошибка при удаление пользователя'})
    }
}

module.exports = {registerUser, loginUser, getAllUsers, deleteUsers}