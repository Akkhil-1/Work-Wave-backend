const express = require('express')
const app = express()
const port = 3001
const dbConnect = require('../Backend/middlewares/db')
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')
const businessRouter = require('./routes/businessRouter')

app.use(express.json())

dbConnect()

app.use('/user' , userRouter)
app.use('/admin' , adminRouter)
app.use('/business' , businessRouter)

app.listen(port , ()=>{
    console.log(`Running on port ${port}`);
})