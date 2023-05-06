require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const path = require('path');
const errorHandling = require('./middleware/errorHandlingMiddleWare');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

app.use(process.env.MAIN_URI, router);

app.use(errorHandling);

function start(){//
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}!`));
}

start();

