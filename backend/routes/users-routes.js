const express = require('express')
const router = express.Router()

const {registerUser, loginUser, getAllUsers, deleteUsers} = require('../controller/users-controller')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUsers)

module.exports = router