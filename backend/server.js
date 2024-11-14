const express = require('express')
const cors = require('cors')
const app = express()

const usersRoutes = require('./routes/users-routes.js')
const bookingRoutes = require('./routes/booking-routes')
const itemsRoutes = require('./routes/items-routes.js')

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.use('/api', usersRoutes)
app.use('/api', bookingRoutes)
app.use('/api', itemsRoutes)


app.listen(PORT, () => {
    console.log('server')
})