import dotenv from "dotenv"
import cors from 'cors'
import express from "express"
import connect from "./db/config.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const port = process.env.PORT

const app = express()

app.use('/api',authRoutes)

app.listen(port,()=>{
    connect()
    console.log(`Server is Running on Port: ${port}`)
})