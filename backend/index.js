const express = require('express');
require('dotenv').config()
const userRouter = require('./routes/user.routes');
const app = express();

app.use(express.json())
app.use('/user',userRouter)

app.listen(3000,() => {
    console.log('Listening on port 3000')
})