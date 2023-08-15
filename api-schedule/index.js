require('dotenv').config();
const express = require('express')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const database = require('./core/database')
const router = require('./routes')
const models = require('./core/models')
const errorMiddleware = require('./middleware/error-middleware')
const client = require('./core/database/redis')
const subscribe = require('./subscribe')
const cacheData = require('./subscribe/cacheData')

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.json())

app.use('/api', router)

app.use(errorMiddleware)
async function start(){
    try{
        await client.connect();

        await database.authenticate()
        await database.sync()

        app.listen(PORT, () => console.log(`\nSERVER LISTEN ON ${PORT}\nIP: ${process.env.DEV_LOCALHOST}`))
        await cacheData()
        await subscribe()
    }catch (e){
        console.error(`\nERROR: ${e.message}`)
    }
}


start().then()