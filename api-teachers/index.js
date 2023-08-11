require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const models = require('./core/models');
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./core/database');
const router = require('./routes');
const events = require('events')
const errorHandling = require('./middleware/error-handling')
const emitter = new events.EventEmitter()

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use(fileUpload({}));
app.use(process.env.URL_START_POINT, router);
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(errorHandling);

app.get('/1', ((req, res) => {
    emitter.emit('newMessage', {message: 'text'})
    res.status(200)
}))

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, ()=> console.log(`server listen on port ${PORT}`));
    } catch (e){
        console.log(e);
    }
}


start();