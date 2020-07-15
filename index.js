const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app=express();
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`The Server has started on port: ${PORT}`))


mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err) throw err;
    console.log("Connected to MongoDB Atlas")
})

//routes
app.use('/users', require('./routes/userRoutes'))
app.use('/characters', require('./routes/characterRoutes'))