import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import AppRoutes from './src/routes/index.js'

dotenv.config()
const PORT = process.env.PORT
const app = express()
// Middlewares
app.use(express.json())
app.use(cors())
// for parse the data

app.use('/', AppRoutes)

app.listen(PORT, () => console.log(`App is listening on tht port ${PORT}`))