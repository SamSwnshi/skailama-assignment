import dotenv from "dotenv"
import cors from 'cors'
import express from "express"

dotenv.config()

const port = process.env.PORT

const app = express()

// app.use()

app.listen(port,()=>{
    console.log(`Server is Running on Port: ${port}`)
})