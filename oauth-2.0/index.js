require('dotenv').config()
const express = require('express');
const cors = require('cors')
const models = require('./core/models')
const database = require('./core/database')

const app = express();

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

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
