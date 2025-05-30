import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'

const app = express()

// Middlewares
app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
  crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 8080

// Test route
app.get("/", (request, response) => {
  response.json({
    message: "Server is running on " + PORT
  })
})

// API routes
app.use('/api/user', userRouter)

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT)
  })
})
