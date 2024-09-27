require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()


app.use(express.json())
const connectDB = require('./db/connnect')
const authRoute = require('./routes/authRoutes')
const sudokuRoute = require('./routes/sudokuRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')


// routes
app.use('/api/auth', authRoute)
app.use('/sudoku', authMiddleware ,sudokuRoute)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = 3000;
const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('DB connected...')
        app.listen(PORT, ()=>{
            console.log(`listening on port ${PORT}...`)
        })
    } catch (e){
        console.log(`errorik ${e}`)
    }
}
start();