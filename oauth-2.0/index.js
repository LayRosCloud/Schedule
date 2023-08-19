require('dotenv').config()
const express = require('express');
const cors = require('cors')
const models = require('./core/models')
const database = require('./core/database')
const router = require('./routes')
const errorMiddleware = require('./middleware/error-handling')

const app = express();

const PORT = process.env.PORT || 5003

app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorMiddleware)
const start = async () => {
    try{
        await database.authenticate()
        await database.sync()
        app.listen(PORT, () => {
            console.log(`Auth server is running on port ${PORT}`);
        });
    }catch (e){
        console.log(e.message)
    }
}

start().then()
