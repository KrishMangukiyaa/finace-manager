const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const app = express()
const user = require('./routes/user')
const budget = require('./routes/transactions')
const note = require('./routes/note')
const aiChat = require('./routes/ai')

require('dotenv').config()

const PORT = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads')); 


app.use('/user', user);
app.use('/budget', budget);
app.use('/note', note);
app.use("/ai", aiChat);



const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Server start on port:', PORT)
    })
}

server()